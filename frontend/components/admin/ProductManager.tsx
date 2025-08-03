import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Package, AlertTriangle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  lowStockThreshold: number;
  isActive: boolean;
}

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([
    { 
      id: '1', 
      name: 'Groundnut Oil', 
      price: 450, 
      stock: 25, 
      category: 'oils',
      lowStockThreshold: 10,
      isActive: true
    },
    { 
      id: '2', 
      name: 'Mustard Oil', 
      price: 380, 
      stock: 5, 
      category: 'oils',
      lowStockThreshold: 10,
      isActive: true
    },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    lowStockThreshold: '10',
    isActive: 'true'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      lowStockThreshold: Number(formData.lowStockThreshold),
      isActive: formData.isActive === 'true'
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      setProducts([...products, newProduct]);
    }

    setFormData({ name: '', price: '', stock: '', category: '', lowStockThreshold: '10', isActive: 'true' });
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      lowStockThreshold: product.lowStockThreshold.toString(),
      isActive: product.isActive.toString()
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, stock: Math.max(0, newStock) } : p
    ));
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { status: 'Out of Stock', color: 'destructive' };
    if (product.stock <= product.lowStockThreshold) return { status: 'Low Stock', color: 'secondary' };
    return { status: 'In Stock', color: 'default' };
  };

  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-playfair font-bold">Product Management</h2>
        <Button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Inventory Alerts */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
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
      )}

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
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="btn-primary">
                  {editingProduct ? 'Update' : 'Add'} Product
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setFormData({ name: '', price: '', stock: '', category: '', lowStockThreshold: '10', isActive: 'true' });
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
                        <Badge variant={stockStatus.color as any}>
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
                          onClick={() => updateStock(product.id, product.stock - 1)}
                          disabled={product.stock === 0}
                        >
                          -
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStock(product.id, product.stock + 1)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManager;
