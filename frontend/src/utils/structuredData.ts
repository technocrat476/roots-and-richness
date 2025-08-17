
// Base organization data for Roots and Richness
export const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Roots and Richness",
  "url": "https://rootsandrichness.in",
  "logo": "https://rootsandrichness.in/logo.png",
  "description": "Premium natural wellness products including wood-pressed oils, tribal-sourced coffee, and traditional wellness items sourced directly from Indian farms and tribal communities.",
  "sameAs": [
    "https://www.instagram.com/rootsandrichness",
    "https://www.facebook.com/rootsandrichness"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-98765-43210",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Green Valley Road",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400001",
    "addressCountry": "IN"
  }
};

// Website data for homepage
export const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Roots and Richness",
  "url": "https://rootsandrichness.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://rootsandrichness.in/products?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Generate product structured data
export const generateProductData = (product: any) => ({
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product.name,
  "image": product.images || [],
  "description": product.description || product.shortDescription,
  "sku": product.sku || product.id,
  "brand": {
    "@type": "Brand",
    "name": "Roots and Richness"
  },
  "offers": {
    "@type": "Offer",
    "url": `https://rootsandrichness.in/products/${product.slug}`,
    "priceCurrency": "INR",
    "price": product.price.toString(),
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  ...(product.rating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50"
    }
  })
});

// About page structured data
export const aboutPageData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Roots and Richness - Our Story of Traditional Wellness",
  "description": "Learn about Roots and Richness - India's trusted source for wood-pressed oils and natural wellness products, sourced directly from tribal communities and small farms",
  "url": "https://rootsandrichness.in/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "Roots and Richness",
    "foundingDate": "2018",
    "founder": {
      "@type": "Person",
      "name": "Rajesh Kumar"
    },
    "mission": "To bring pure, traditional wellness products from Indian farms and tribal communities to modern homes"
  }
};

// Contact page structured data
export const contactPageData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Roots and Richness",
  "url": "https://rootsandrichness.in/contact",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "Roots and Richness",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Green Valley Road",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "telephone": "+91-98765-43210",
    "email": "hello@rootsandrichness.com",
    "url": "https://rootsandrichness.in/contact",
    "openingHours": "Mo-Sa 09:00-18:00"
  }
};

// FAQ page structured data
export const faqPageData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are wood-pressed oils?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wood-pressed oils are extracted using traditional wooden mills at low temperatures (below 60°C), preserving natural nutrients, flavor, and aroma. This ancient method ensures the oil retains its therapeutic properties without chemical processing."
      }
    },
    {
      "@type": "Question", 
      "name": "How are your products different from commercial oils?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our products are unrefined, chemical-free, and processed using traditional methods. We source directly from farmers and tribal communities, ensuring authenticity and supporting sustainable agriculture practices."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer free shipping?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer free shipping on orders above ₹499 across India. For orders below ₹499, a nominal shipping charge of ₹50 applies."
      }
    },
    {
      "@type": "Question",
      "name": "What is your return policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a 7-day return policy for unopened products. If you're not satisfied with your purchase, you can return it within 7 days of delivery for a full refund."
      }
    }
  ]
};

// Blog post structured data generator
export const generateBlogPostData = (post: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.image,
  "author": {
    "@type": "Person",
    "name": post.author || "Roots and Richness Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Roots and Richness",
    "logo": {
      "@type": "ImageObject",
      "url": "https://rootsandrichness.in/logo.png"
    }
  },
  "datePublished": post.publishDate,
  "dateModified": post.modifiedDate || post.publishDate,
  "url": `https://rootsandrichness.in/blog/${post.slug}`
});
