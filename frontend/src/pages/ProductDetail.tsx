import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageSEO from '@/components/SEO/PageSEO'; 
import { ShoppingCart, Heart, Truck, Shield, Star, ArrowLeft } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { Separator} from '@/components/ui/separator';
import apiClient from '@/services/api';
import products from '@/pages/products';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import StickyCheckoutButton from '@/components/ui/StickyCheckoutButton';
import variant from '@/components/admin/ProductManager';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetail = () => {
  const { slug } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const navigate = useNavigate();
  const selectedVariant =
    product && product.variants
      ? product.variants.find((v) => v.size === selectedSize) || product.variants[0]
      : null;

  useEffect(() => {
    if (!slug) return; // avoid call if slug is undefined

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Slug from useParams:", slug, slug.length);
        // Fetch single product
        const productRes = await apiClient.getProduct(slug);
        console.log("Full API response:", productRes);
        const productData =
        productRes?.product || productRes?.data?.product || null;
        if (!productData) {
          throw new Error("Product not found");
        }
        setProduct(productData);
        // Fetch all products
        const listRes = await apiClient.getProducts();
        console.log("Raw response from getProducts =>", listRes);
        const allProducts = Array.isArray(listRes?.products) ? listRes.products : [];
console.log("All products =>", allProducts);
console.log("Current product =>", productData);
        // Filter related
        const related = allProducts
          .filter(
            (p: any) =>
              p.category === productData.category &&
              p.slug !== productData.slug
          )
          .slice(0, 4);
console.log("Related products =>", related);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-playfair font-bold text-secondary">Product Not Found</h1>
          <Link to="/products">
            <Button className="btn-primary">
              <ArrowLeft size={16} className="mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product?.sizes?.length) {
      alert("Please select a size");
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, size: selectedSize, quantity },
    });
  };

  /* const relatedProducts = products.filter(p => 
    p.category === product.category && p.slug !== product.slug
  ).slice(0, 4); */

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.name }
  ];

  // Enhanced product structured data
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Roots and Richness"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "INR",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Roots and Richness"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "48"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Processing Method",
        "value": "Wood-Pressed"
      },
      {
        "@type": "PropertyValue", 
        "name": "Source",
        "value": "Direct from Indian Farms"
      }
    ]
  };

  // Enhanced meta description based on product type
  const getMetaDescription = () => {
    const baseDesc = `Buy authentic ${product.name} online at Roots and Richness. `;
    if (product.category === 'oils') {
      return baseDesc + `Wood-pressed, chemical-free, and traditionally processed. Rich in nutrients with high smoke point. Perfect for cooking and oil pulling. Free shipping on orders over ₹500.`;
    } else if (product.category === 'coffee') {
      return baseDesc + `Single-origin Arabica coffee from tribal farmers in Araku Valley. Bold flavor, ethically sourced, and sustainably grown at 3000+ feet elevation.`;
    }
    return baseDesc + `${product.description.substring(0, 100)}... Natural, pure, and directly sourced from Indian farms.`;
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO 
        title={`Buy ${product.name} Online | Pure Wood-Pressed ${product.category === 'oils' ? 'Oil' : 'Products'} - Roots and Richness`}
        description={getMetaDescription()}
        keywords={`${product.name}, buy ${product.name} online, wood-pressed oil, cold-pressed oil, natural oil, organic oil, pure ${product.category}, traditional processing`}
        canonicalUrl={`https://rootsandrichness.in/products/${product.slug}`}
        ogType="product"
        structuredData={productStructuredData}
      />

      {/* Breadcrumb */}
      <div className="bg-neutral-light py-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Product Images */}
<div className="space-y-4">
  {product.images && product.images.length > 0 && (
    <>
      {/* Main Image Carousel */}
      <div className="relative aspect-square bg-neutral-light rounded-lg overflow-hidden">
  <Swiper
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    spaceBetween={10}
    slidesPerView={1}
    initialSlide={selectedImage}
    onSwiper={(swiper) => (swiperRef.current = swiper)}    // capture instance
    onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)} // keep in sync when swiping
    className="h-full"
  >
    {product.images?.map((image, index) => {
      const src = typeof image === "string" ? image : image.url;
      const alt = typeof image === "string" ? `${product.name} - image ${index + 1}` : (image.alt || `${product.name} - image ${index + 1}`);
      return (
        <SwiperSlide key={index}>
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </SwiperSlide>
      );
    })}
  </Swiper>

        {product.originalPrice && (
          <Badge className="absolute top-4 left-4 bg-accent text-white">
            Save ₹{selectedVariant.originalPrice - selectedVariant.price}
          </Badge>
        )}

        {product?.isFeatured && (
          <Badge className="absolute top-3 right-3 bg-primary text-white">
            Bestseller
          </Badge>
        )}
      </div>

      {/* Thumbnail Images */}
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => {
      const src = typeof image === "string" ? image : image.url;
      return (
            <div
              key={index}
              onClick={() => {
            setSelectedImage(index);
            swiperRef.current?.slideTo(index); // <-- move main swiper
          }}
              className={`aspect-square border rounded-lg flex-shrink-0 overflow-hidden cursor-pointer 
                ${selectedImage === index ? "border-black ring-2 ring-black" : "border-gray-200"}`}
            >
              <img
                src={src}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                loading="lazy"
              />
            </div>
      );
    })}
        </div>
      )}
    </>
  )}
</div>


        {/* Enhanced Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-secondary mb-2">
                {product.name} – Pure Goodness in Every Drop
              </h1>
              <p className="text-lg text-neutral-medium">
                {product.shortDescription}
              </p>
              
              {/* Enhanced trust indicators */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-green-700 border-green-300">
                  ✓ Wood-Pressed
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  ✓ Chemical-Free
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300">
                  ✓ Farm Direct
                </Badge>
              </div>
            </div>

{/* Rating with quarter/half/three-quarter star support */}
<div className="flex items-center space-x-4">
  <div
    className="flex items-center space-x-1"
    role="img"
    aria-label={`${product.rating} out of 5 stars`}
  >
    {[1, 2, 3, 4, 5].map((star) => {
      const diff = product.rating - (star - 1); // how much of this star should be filled?
      let fillWidth = 0;

      if (diff >= 1) {
        fillWidth = 100; // full star
      } else if (diff >= 0.75) {
        fillWidth = 75; // three-quarter
      } else if (diff >= 0.5) {
        fillWidth = 50; // half
      } else if (diff >= 0.25) {
        fillWidth = 25; // quarter
      }

      return (
        <span key={star} className="relative inline-block w-5 h-5">
          {/* Empty star base */}
          <Star size={20} className="text-gray-300" />

          {/* Filled portion */}
          {fillWidth > 0 && (
            <Star
              size={20}
              className="text-yellow-500 fill-yellow-500 absolute top-0 left-0"
              style={{ clipPath: `inset(0 ${100 - fillWidth}% 0 0)` }}
            />
          )}
        </span>
      );
    })}
  </div>

  <span className="text-sm text-neutral-medium">
    ({product.numReviews} verified reviews)
  </span>

  {product.isFeatured && (
    <Badge variant="outline" className="text-xs">Bestseller</Badge>
  )}
</div>            
            {/* Enhanced Price section */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-secondary">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.originalPrice && (
                  <span className="text-xl text-neutral-medium line-through">
                    ₹{selectedVariant.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-accent font-medium">
                  You save ₹{selectedVariant.originalPrice - selectedVariant.price} ({Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)}% off) • Limited time offer
                </p>
              )}
              <p className="text-sm text-neutral-medium">
                Inclusive of all taxes • Free shipping on orders above ₹999
              </p>
            </div>

            {/* Size Selection */}
            {Array.isArray(product.variants) && product.variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-secondary">Size:</h3>
                <div className="flex space-x-2">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant._id}
                      variant={selectedSize === variant.size ? "default" : "outline"}
                      onClick={() => setSelectedSize(variant.size)}
                      className={selectedSize === variant.size ? "btn-primary" : ""}
                      aria-pressed={selectedSize === variant.size}
                    >
                      {variant.size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-secondary">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </Button>
                <span className="px-4 py-2 border border-gray-300 rounded" aria-label={`Quantity: ${quantity}`}>{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.isActive}
                  className="btn-primary flex-1"
                  size="lg"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" aria-label="Add to wishlist">
                  <Heart size={20} />
                </Button>
              </div>
              
              {!product.isActive && (
                <p className="text-destructive text-sm">This product is currently out of stock.</p>
              )}
            </div>

            {/* Enhanced Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 bg-neutral-light rounded-lg px-4">
              <div className="text-center space-y-2">
                <Truck className="text-primary mx-auto" size={24} />
                <div className="text-xs">
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-neutral-medium">Orders over ₹500</div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Shield className="text-primary mx-auto" size={24} />
                <div className="text-xs">
                  <div className="font-medium">100% Natural</div>
                  <div className="text-neutral-medium">Lab tested purity</div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <RotateCcw className="text-primary mx-auto" size={24} />
                <div className="text-xs">
                  <div className="font-medium">Easy Returns</div>
                  <div className="text-neutral-medium">7-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Details Section */}
        <div className="mt-16 space-y-8">
          <Separator />
          
          {/* About This Product */}
          <div className="space-y-4">
            <h2 className="text-2xl font-playfair font-bold text-secondary">About This Product</h2>
            <div className="prose prose-lg max-w-none text-neutral-medium">
              <p className="leading-relaxed">{product.description}</p>
              
              {/* Origin story based on product type */}
              {product.category === 'oils' && (
                <div className="bg-neutral-light p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold text-secondary mb-3">From Farm to Your Kitchen</h3>
                  <p>
                    Our {product.name.toLowerCase()} is sourced directly from small-scale farmers who have perfected 
                    traditional oil pressing techniques passed down through generations. Using wooden churns (kolhus) 
                    that rotate slowly at room temperature, we preserve the natural nutrients, aroma, and flavor that 
                    high-heat processing destroys.
                  </p>
                </div>
              )}
              
              {product.category === 'coffee' && (
                <div className="bg-neutral-light p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold text-secondary mb-3">Tribal Excellence from Araku Valley</h3>
                  <p>
                    Grown by tribal farmers in the pristine Eastern Ghats at over 3,000 feet elevation, our Arabica 
                    coffee represents a partnership with indigenous communities who understand the art of sustainable 
                    cultivation. Every purchase supports fair trade and preserves traditional farming wisdom.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-playfair font-bold text-secondary">Why Choose Our {product.name}?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-neutral-light rounded-lg">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-neutral-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage Ideas */}
          {product.howToUse && (
            <div className="space-y-4">
              <h2 className="text-2xl font-playfair font-bold text-secondary">How to Use</h2>
              <div className="bg-neutral-light p-6 rounded-lg">
                <p className="text-neutral-medium leading-relaxed"></p>
                
                {product.category === 'oils' && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🍳</div>
                      <div className="text-sm font-medium">{product.howToUse[0]}</div>
                      <div className="text-xs text-neutral-medium">Perfect for all Indian dishes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-2">💆‍♀️</div>
                      <div className="text-sm font-medium">{product.howToUse[1]}</div>
                      <div className="text-xs text-neutral-medium">Morning wellness routine</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-2">🌿</div>
                      <div className="text-sm font-medium">Ayurvedic Use</div>
                      <div className="text-xs text-neutral-medium">Traditional wellness</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-playfair font-bold text-secondary">What Our Customers Say</h2>
            <div className="space-y-4">
              <blockquote className="bg-white border-l-4 border-primary p-6 shadow-sm">
                <p className="text-neutral-dark italic mb-3">
                  "This {product.name.toLowerCase()} tastes exactly like what my grandmother used to make at home. 
                  You can immediately tell the difference in quality and purity. Worth every rupee!"
                </p>
                <footer className="text-sm text-neutral-medium">
                  — Priya K., Mumbai • Verified Purchase
                </footer>
              </blockquote>
              
              <blockquote className="bg-white border-l-4 border-primary p-6 shadow-sm">
                <p className="text-neutral-dark italic mb-3">
                  "Finally found authentic {product.category} that doesn't compromise on traditional methods. 
                  The aroma and taste are exceptional. Highly recommend!"
                </p>
                <footer className="text-sm text-neutral-medium">
                  — Rajesh S., Delhi • Verified Purchase
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-playfair font-bold text-secondary">Ingredients</h2>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-8">
            <Separator />
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-playfair font-bold text-secondary">Related Products</h2>
              <p className="text-neutral-medium">You might also like these products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct._id} className="group hover:shadow-lg transition-shadow                 cursor-pointer"
                onClick={() => navigate(`/products/${relatedProduct.slug}`)} 
             >
                  <div className="aspect-sqaure relative overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.images[0]?.url}
                      alt={`${relatedProduct.name} - Premium natural oil from Roots and Richness`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-playfair font-semibold text-secondary mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-secondary">
                        ₹{relatedProduct.price}
                      </span>
                      <Link to={`/products/${relatedProduct.slug}`} onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="outline">View</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        </div>

        {/* FAQ Section for SEO */}
        <div className="mt-16 space-y-6">
          <Separator />
          <h2 className="text-2xl font-playfair font-bold text-secondary">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-neutral-light p-4 rounded-lg">
              <summary className="font-medium cursor-pointer">Is this oil suitable for high-heat cooking?</summary>
              <p className="mt-2 text-neutral-medium">
                Yes, our wood-pressed oils retain their natural smoke point and are perfect for traditional Indian cooking methods including deep frying.
              </p>
            </details>
            
            <details className="bg-neutral-light p-4 rounded-lg">
              <summary className="font-medium cursor-pointer">How is this different from refined oils?</summary>
              <p className="mt-2 text-neutral-medium">
                Unlike refined oils that use chemicals and high heat, our wood-pressed method preserves natural nutrients, flavor, and aroma while being completely chemical-free.
              </p>
            </details>
            
            <details className="bg-neutral-light p-4 rounded-lg">
              <summary className="font-medium cursor-pointer">What is the shelf life?</summary>
              <p className="mt-2 text-neutral-medium">
                Our oils have a shelf life of 12 months when stored in a cool, dry place away from direct sunlight. Natural settling may occur, which is normal.
              </p>
            </details>
          </div>
        </div>
      </div>

      <StickyCheckoutButton />
    </div>
  );
};

export default ProductDetail;
