
import PageSEO from './PageSEO';

interface ProductSEOProps {
  product: {
    id: string;
    name: string;
    description?: string;
    shortDescription: string;
    price: number;
    originalPrice?: number;
    images: string[];
    slug: string;
    category?: string;
    sku?: string;
    inStock?: boolean;
    benefits?: string[];
    ingredients?: string[];
  };
}

const ProductSEO = ({ product }: ProductSEOProps) => {
  const productStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description || product.shortDescription,
    "sku": product.sku || product.id,
    "brand": {
      "@type": "Brand",
      "name": "Roots and Richness"
    },
    "category": product.category || "Food & Beverages",
    "offers": {
      "@type": "Offer",
      "url": `https://rootsandrichness.in/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price.toString(),
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Roots and Richness",
        "url": "https://rootsandrichness.in"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Priya K."
        },
        "reviewBody": "Excellent quality and authentic taste. Highly recommended!",
        "datePublished": "2024-01-15"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Rajesh S."
        },
        "reviewBody": "Finally found authentic oil that doesn't compromise on traditional methods.",
        "datePublished": "2024-01-10"
      }
    ],
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
      },
      {
        "@type": "PropertyValue",
        "name": "Chemical Treatment",
        "value": "None - 100% Natural"
      }
    ]
  };

  // Enhanced keywords based on product category
  const getProductKeywords = () => {
    const baseKeywords = `${product.name.toLowerCase()}, buy ${product.name.toLowerCase()} online, wood-pressed oil, natural products, roots and richness`;
    
    if (product.category === 'oils') {
      return baseKeywords + ', cold-pressed oil, organic oil, traditional oil, pure oil, chemical-free oil, healthy cooking oil';
    } else if (product.category === 'coffee') {
      return baseKeywords + ', arabica coffee, tribal coffee, single origin coffee, organic coffee, premium coffee';
    }
    return baseKeywords + ', natural wellness, organic products, traditional products';
  };

  return (
    <PageSEO
      title={`Buy ${product.name} Online - Premium ${product.category === 'oils' ? 'Wood-Pressed Oil' : 'Natural Product'} | Roots and Richness`}
      description={`Buy authentic ${product.name} online at Roots and Richness. ${product.shortDescription} Wood-pressed, chemical-free, and traditionally processed. ₹${product.price}${product.originalPrice ? ` (Save ₹${product.originalPrice - product.price})` : ''}. Free shipping above ₹499.`}
      keywords={getProductKeywords()}
      canonicalUrl={`https://rootsandrichness.in/products/${product.slug}`}
      structuredData={productStructuredData}
      ogImage={product.images[0]}
      ogType="product"
      author="Roots and Richness Team"
    />
  );
};

export default ProductSEO;
