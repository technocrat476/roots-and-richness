import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Filter, Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { products, categories } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import PageSEO from '@/components/SEO/PageSEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { dispatch } = useCart();

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return b.featured ? 1 : -1;
      }
    });

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products' }
  ];

  // Enhanced structured data
  const productsPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Premium Wood-Pressed Oils & Natural Wellness Products",
    "description": "Shop authentic wood-pressed oils, tribal-sourced coffee, and natural wellness products. 100% chemical-free, traditionally processed, directly from Indian farms. Free shipping on orders over ₹500. COD available.",
    "url": "https://rootsandrichness.in/products",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        ...(item.href && { "item": `https://rootsandrichness.in${item.href}` })
      }))
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredProducts.length,
      "itemListElement": filteredProducts.map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.name,
        "description": product.shortDescription,
        "image": product.images[0],
        "url": `https://rootsandrichness.in/products/${product.slug}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "INR",
          "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        },
        "brand": {
          "@type": "Brand",
          "name": "Roots and Richness"
        }
      }))
    }
  };

  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO 
        title="Buy Premium Wood-Pressed Oils Online | Natural Wellness Products - Roots and Richness"
        description="Shop authentic wood-pressed oils, tribal-sourced coffee, and natural wellness products. 100% chemical-free, traditionally processed, directly from Indian farms. Free shipping on orders over ₹500. COD available."
        keywords="buy wood-pressed oils online, cold-pressed oils India, pure groundnut oil, mustard oil online, organic oils, tribal coffee, natural wellness products, chemical-free oils, traditional oil pressing"
        canonicalUrl="https://rootsandrichness.in/products"
        structuredData={productsPageStructuredData}
      />

      {/* Breadcrumb */}
      <div className="bg-neutral-light py-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Enhanced SEO-optimized Header */}
      <section className="bg-neutral-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-secondary">
              Premium Wood-Pressed Oils & Natural Wellness Products
            </h1>
            <p className="text-lg text-neutral-medium max-w-4xl mx-auto leading-relaxed">
              Discover our complete range of authentic wood-pressed oils, tribal-sourced coffee, and traditional wellness products. 
              Each item is crafted using ancient methods and sourced directly from farmers and tribal communities across India. 
              <span className="font-medium text-secondary"> 100% chemical-free, traditionally processed, with guaranteed purity.</span>
            </p>
            
            {/* Enhanced trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">100% Chemical-Free</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Free Shipping ₹500+</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">Farm Direct Sourcing</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-medium">COD Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Search and Filter Section */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium" size={20} />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border-2 border-neutral-light focus:border-primary rounded-lg"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Filter size={20} className="text-neutral-medium" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "btn-primary" : ""}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-neutral-light rounded-lg focus:border-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>

              <div className="flex border border-neutral-light rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Results counter */}
          <div className="text-sm text-neutral-medium">
            Showing {filteredProducts.length} of {products.length} products
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        </div>

        {/* Enhanced Products Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className={`group hover:shadow-xl transition-all duration-300 animate-fade-in ${
                viewMode === 'list' ? 'flex flex-row' : ''
              }`} 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'rounded-t-lg'
              }`}>
                <img
                  src={product.images[0]}
                  alt={`Buy ${product.name} online - Premium wood-pressed ${product.category} from Roots and Richness, sourced directly from Indian farms`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading={index < 8 ? 'eager' : 'lazy'}
                />
                {product.originalPrice && (
                  <Badge className="absolute top-3 left-3 bg-accent text-white">
                    Save ₹{product.originalPrice - product.price}
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="absolute top-3 right-3 bg-primary text-white">
                    Bestseller
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>

              <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-playfair font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2 text-lg">
                      {product.name}
                    </h3>
                    <p className="text-sm text-neutral-medium mt-1 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-x-1">
                      <span className="text-xl font-bold text-secondary">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-neutral-medium line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="text-primary fill-current" size={14} />
                      <span className="text-xs text-neutral-medium">4.8 (24)</span>
                    </div>
                  </div>

                  {/* Enhanced conversion-focused benefits */}
                  <div className="text-xs text-neutral-medium space-y-1">
                    <div>✓ Free shipping • ✓ 100% Natural • ✓ 7-day return</div>
                    <div className="text-primary font-medium">COD Available • Wood-Pressed</div>
                  </div>

                  <div className="flex space-x-2">
                    <Link to={`/products/${product.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      size="sm"
                      className="btn-primary"
                    >
                      <ShoppingCart size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-playfair font-semibold text-secondary mb-2">
              No products found
            </h3>
            <p className="text-neutral-medium mb-6">
              {searchQuery 
                ? `No products match "${searchQuery}". Try adjusting your search or filters.`
                : 'Try selecting a different category or check back later for new products.'
              }
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Enhanced SEO Content Section */}
        <section className="mt-20 py-16 bg-neutral-light rounded-2xl">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-playfair font-bold text-secondary mb-8 text-center">
              Why Choose Wood-Pressed Oils from Roots & Richness?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-playfair font-semibold text-secondary">
                  Traditional Wood-Pressing: The Ancient Art of Oil Extraction
                </h3>
                <div className="prose prose-lg max-w-none text-neutral-medium">
                  <p>
                    Our wood-pressed oils are extracted using traditional wooden presses (kolhus) that rotate slowly 
                    at room temperature. This ancient method, practiced for centuries in Indian villages, preserves 
                    essential nutrients, vitamins, and natural flavors that are often destroyed in commercial high-heat processing.
                  </p>
                  <p>
                    Unlike refined oils that undergo chemical treatment, our wood-pressed oils retain their natural 
                    color, aroma, and nutritional profile. Each drop carries the authentic taste and wellness benefits 
                    that our ancestors knew and trusted.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-playfair font-semibold text-secondary">
                  Direct from Source: Supporting Indian Farmers & Tribal Communities
                </h3>
                <div className="prose prose-lg max-w-none text-neutral-medium">
                  <p>
                    Every product at Roots & Richness comes directly from small-scale farmers and tribal communities 
                    across India. From mustard farms in Rajasthan to groundnut fields in Gujarat, and coffee 
                    plantations in Araku Valley, we build lasting partnerships that ensure fair prices and 
                    sustainable livelihoods.
                  </p>
                  <p>
                    When you choose our products, you're not just getting premium quality – you're supporting 
                    traditional farming practices, preserving indigenous knowledge, and contributing to rural prosperity.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-playfair font-semibold text-secondary mb-6 text-center">
                Our Complete Product Range
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    category: "Wood-Pressed Oils",
                    items: ["Mustard Oil", "Groundnut Oil", "Sesame Oil", "Coconut Oil"],
                    description: "Cold-pressed at room temperature for maximum nutrition retention"
                  },
                  {
                    category: "Natural Sweeteners", 
                    items: ["Raw Forest Honey", "Organic Jaggery", "Palm Sugar"],
                    description: "Unprocessed sweeteners from trusted sources"
                  },
                  {
                    category: "Tribal Coffee",
                    items: ["Araku Arabica", "Single Origin", "Fair Trade"],
                    description: "Ethically sourced from tribal farmers in Eastern Ghats"
                  },
                  {
                    category: "Wellness Products",
                    items: ["Herbal Teas", "Traditional Spices", "Ayurvedic Oils"],
                    description: "Time-tested wellness solutions from nature"
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-playfair font-semibold text-secondary mb-3">{category.category}</h4>
                    <ul className="space-y-1 mb-3">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-neutral-medium">• {item}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-neutral-medium italic">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
