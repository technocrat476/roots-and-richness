import React, { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { apiClient } from "@/services/api";
import { Plus, Edit, Trash2, Package, AlertTriangle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category: string;
  benefits: string;
  howToUse: string;
  ingredients: string;
  lowStockThreshold: number;
  isActive: boolean;
  originalPrice: number;
  isFeatured: boolean;
  rating: number;
  numReviews: number;
}
const initialFormData = {
  name: "",
  slug: "",
  price: "",
  originalPrice: "",
  stock: "",
  category: "",
  images: [],
  benefits: [],
  howToUse: [],
  ingredients: [],
  lowStockThreshold: '',
  isActive: "true",
  isFeatured: "true",
  rating: "",
  numReviews: "",
  variants: [] as Array<{ size: string; price: any; originalPrice: any; stock: any }>,
   
};
const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statsLoading, setStatsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Helper fetch wrapper that attaches token if present
  const apiFetch = async (path: string, options: RequestInit = {}) => {
    const url = path.startsWith('/api') ? path : `/api${path}`;
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
      'Content-Type': 'application/json'
    };

    const token = localStorage.getItem('admin_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, { ...options, headers });
    const text = await res.text();
    // try to parse JSON safely
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      throw new Error(`Invalid JSON response: ${text}`);
    }

    if (!res.ok) {
      // backend usually returns { success: false, message: '...' }
      const msg = data?.message || data?.error || `${res.status} ${res.statusText}`;
      throw new Error(msg);
    }
    return data;
  };

  // fetch product list from backend
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getProducts();
      // backend returns { success: true, products: [...] }
      const rawProducts = data.products ?? data.productsList ?? [];
      const mapped: Product[] = (rawProducts as any[]).map((p) => ({
        id: p._id ?? p.id ?? String(Date.now()),
        name: p.name,
        slug: p.slug ?? '',
        price: p.price ?? 0,
        imageUrl: (p.images && p.images[0] && p.images[0].url) || p.image || '',
        stock: p.stock ?? p.countInStock ?? 0,
        category: p.category ?? '',
        benefits: p.benefits ?? '',
        howToUse: p.howToUse ?? '',
        ingredients: p.ingredients ?? '',
        lowStockThreshold: (p.lowStockThreshold ? Number(p.lowStockThreshold) : 10),
        isActive: p.isActive ?? true,
        originalPrice: p.originalPrice ?? 0,
        isFeatured: p.isFeatured ?? true,
        rating: p.rating,
        numReviews: p.numReviews ?? 0,
        variants: p.variants ?? [],
      }));
      setProducts(mapped);
    } catch (err: any) {
      console.error('fetchProducts error', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingProduct(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };
const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug ?? '',
      price: String(product.price),
      imageUrl: product.imageUrl ?? '',
      stock: String(product.stock),
      category: product.category,
      benefits: product.benefits,
      howToUse: product.howToUse,
      ingredients: product.ingredients,
      lowStockThreshold: String(product.lowStockThreshold ?? 10),
      isActive: product.isActive ? 'true' : 'false',
      originalPrice: String(product.originalPrice),
      isFeatured: product.isFeatured ? 'true' : 'false',
      rating: String(product.rating),
      numReviews: String(product.numReviews),
      variants: product.variants?.length ? product.variants : [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setStatsLoading(true);
    try {
      await apiClient.deleteProduct(id);
      // refresh list
      await fetchProducts();
    } catch (err: any) {
      console.error('Delete error', err);
      setError(err.message || 'Failed to delete product');
    } finally {
      setStatsLoading(false);
    }
  };

  const updateStockLocal = (id: string, newStock: number) => {
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, newStock) } : p));
  };

  const handleStockChange = async (product: Product, newStock: number) => {
    // optimistic update
    updateStockLocal(product.id, newStock);
    try {
      await apiClient.updateProduct(product.id, { stock: newStock });
      // optionally re-fetch product to get canonical server data:
      // await fetchProducts();
    } catch (err: any) {
      console.error('updateStock error', err);
      setError(err.message || 'Failed to update stock');
      // revert by re-fetch
      await fetchProducts();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
const benefits =
  Array.isArray(formData.benefits)
    ? formData.benefits.map(b => b.trim())
    : (formData.benefits || "")
        .split(",")
        .map(b => b.trim())
        .filter(Boolean);
const howToUse =
  Array.isArray(formData.howToUse)
    ? formData.howToUse.map(b => b.trim())
    : (formData.howToUse || "")
        .split(",")
        .map(b => b.trim())
        .filter(Boolean);
    // Build payload in shape backend expects (minimal required fields)
    const payload: any = {
      name: formData.name,
      slug: formData.slug,
      price: Number(formData.price || 0),
      images: formData.imageUrl
  	? formData.imageUrl.split(",").map((url) => ({
      	url: url.trim(),
      	alt: ''
    	}))
  	: [],
      //images: formData.imageUrl ? [{ url: formData.imageUrl, alt: '' }] : [],
      stock: Number(formData.stock || 0),
      category: formData.category || 'Uncategorized',
      benefits,
      howToUse,
      ingredients: formData.ingredients,
      isActive: formData.isActive,
      originalPrice: Number(formData.originalPrice || 0),
      isFeatured: formData.isFeatured,
      rating: Number(formData.rating),
      numReviews: Number(formData.numReviews),
      variants: (formData.variants || []).map((v) => ({
        size: v.size,
        price: Number(v.price || 0),
        originalPrice: Number(v.originalPrice || 0),
        stock: Number(v.stock || 0),
      })),
    };

    try {
      if (editingProduct) {
        await apiClient.updateProduct(editingProduct.id, payload);
      } else {
        // create
        await apiClient.createProduct(payload);
      }
        console.log("FormData before submit:", formData);
      // refresh
      await fetchProducts();
      setFormData(initialFormData);
      setShowForm(false);
      resetForm();
    } catch (err: any) {
      console.error('submit error', err);
      setError(err.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { status: 'Out of Stock', color: 'destructive' };
    if (product.stock <= product.lowStockThreshold) return { status: 'Low Stock', color: 'secondary' };
    return { status: 'In Stock', color: 'default' };
  };

 //const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0);
 //const outOfStockProducts = products.filter(p => p.stock === 0); 

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-playfair font-bold">Product Management</h2>
        <Button onClick={openAddForm} className="btn-primary">
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Inventory Alerts */}
      {(() => {
        const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0);
        const outOfStockProducts = products.filter(p => p.stock === 0);
        if (lowStockProducts.length === 0 && outOfStockProducts.length === 0) return null;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outOfStockProducts.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-red-800 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    Out of Stock ({outOfStockProducts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {outOfStockProducts.map((product) => (
                      <div key={product.id} className="text-sm text-red-700">
                        {product.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          {lowStockProducts.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-yellow-800 flex items-center">
                  <Package size={16} className="mr-2" />
                  Low Stock ({lowStockProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="text-sm text-yellow-700 flex justify-between">
                      <span>{product.name}</span>
                      <span>{product.stock} left</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        );
      })()}

      {/* Product Form - keep existing form but add new fields */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                 <div>
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lowStockThreshold">Low Stock Alert</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({...formData, lowStockThreshold: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="string"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="numReviews">Number of Reviews</Label>
                  <Input
                    id="numReviews"
                    type="number"
                    value={formData.numReviews}
                    onChange={(e) => setFormData({...formData, numReviews: e.target.value})}
                    required
                  />
                </div>

                {/* === Product Variants Section === */}
                <div className="col-span-2 space-y-4">
                  <label className="block font-medium">Variants</label>

                  {(formData.variants || []).map((variant, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Size (e.g. 500ml)"
                        value={variant.size}
                        onChange={(e) =>
                          setFormData((prev) => {
                            const newVariants = [...(prev.variants || [])];
                            newVariants[index] = { ...newVariants[index], size: e.target.value };
                            return { ...prev, variants: newVariants };
                          })
                        }
                        className="border rounded p-2 w-1/4"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={variant.price}
                        onChange={(e) =>
                          setFormData((prev) => {
                            const newVariants = [...(prev.variants || [])];
                            newVariants[index] = { ...newVariants[index], price: e.target.value };
                            return { ...prev, variants: newVariants };
                          })
                        }
                        className="border rounded p-2 w-1/4"
                      />
                      <input
                        type="number"
                        placeholder="Original Price"
                        value={variant.originalPrice}
                        onChange={(e) =>
                          setFormData((prev) => {
                            const newVariants = [...(prev.variants || [])];
                            newVariants[index] = { ...newVariants[index], originalPrice: e.target.value };
                            return { ...prev, variants: newVariants };
                          })
                        }
                        className="border rounded p-2 w-1/4"
                      />
                      <input
                        type="number"
                        placeholder="Stock"
                        value={variant.stock}
                        onChange={(e) =>
                          setFormData((prev) => {
                            const newVariants = [...(prev.variants || [])];
                            newVariants[index] = { ...newVariants[index], stock: e.target.value };
                            return { ...prev, variants: newVariants };
                          })
                        }
                        className="border rounded p-2 w-1/4"
                      />
                      <Button size="sm" variant="destructive" 
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            variants: (prev.variants || []).filter((_, i) => i !== index),
                          }))
                        }>
                      <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}

  <button
    type="button"
    className="btn-primary"
    onClick={() =>
      setFormData((prev) => ({
        ...prev,
        variants: [
          ...(prev.variants || []),
          { size: "", price: 0, originalPrice: 0, stock: 0 },
        ],
      }))
    }
  >
    Add Variant
  </button>
</div>

                <div>
                  <Label htmlFor="isActive">Status</Label>
                  <select
                    id="isActive"
                    value={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
               <div className="col-span-2">
                 <Label htmlFor="isFeatured">Featured</Label>
                  <select
                    id="isFeatured"
                    value={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>
                <div>
                  <Label htmlFor="benefits">Benefits</Label>
                  <Input
                    id="benefits"
                    value={formData.benefits}
                    onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="howToUse">How to Use</Label>
                  <Input
                    id="category"
                    value={formData.howToUse}
                    onChange={(e) => setFormData({...formData, howToUse: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Input
                    id="ingredients"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                    required
                  />
                </div>
              <div className="flex space-x-2">
                <Button type="submit" className="btn-primary">
                  {editingProduct ? 'Update' : 'Add'} Product
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setFormData(initialFormData);
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stock Actions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{product.stock}</span>
                          <Badge variant={stockStatus.color}>
                            {stockStatus.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.isActive ? 'default' : 'secondary'}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStockChange(product, product.stock - 1)}
                            disabled={product.stock === 0 || statsLoading}
                          >
                            -
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStockChange(product, product.stock + 1)}
                            disabled={statsLoading}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            <Edit size={14} />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default ProductManager;
