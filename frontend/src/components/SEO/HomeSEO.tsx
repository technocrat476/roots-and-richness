
import PageSEO from './PageSEO';
import { organizationData, websiteData } from '@/utils/structuredData';

const HomeSEO = () => {
  const homepageStructuredData = [
    organizationData,
    websiteData,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Pure Wood-Pressed Oils, Handpicked from Indian Farms | Roots and Richness",
      "description": "Cold-pressed, chemical-free oils and natural wellness products directly from Indian farms. Buy authentic wood-pressed mustard oil, groundnut oil, and tribal coffee online.",
      "url": "https://rootsandrichness.in/",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Featured Products",
        "numberOfItems": 6,
        "itemListElement": [
          {
            "@type": "Product",
            "position": 1,
            "name": "Wood-Pressed Mustard Oil",
            "url": "https://rootsandrichness.in/products/wood-pressed-mustard-oil"
          },
          {
            "@type": "Product", 
            "position": 2,
            "name": "Cold-Pressed Groundnut Oil",
            "url": "https://rootsandrichness.in/products/cold-pressed-groundnut-oil"
          },
          {
            "@type": "Product",
            "position": 3,
            "name": "Araku Arabica Coffee",
            "url": "https://rootsandrichness.in/products/araku-arabica-coffee"
          }
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rootsandrichness.in/"
          }
        ]
      }
    }
  ];

  return (
    <PageSEO
      title="Pure Wood-Pressed Oils, Handpicked from Indian Farms | Roots and Richness"
      description="Cold-pressed, chemical-free oils and natural wellness products directly from Indian farms. Buy authentic wood-pressed mustard oil, groundnut oil, and tribal coffee online. Free shipping on orders over ₹499."
      keywords="wood-pressed oils, cold-pressed oils, pure oils online, mustard oil, groundnut oil, tribal coffee, natural wellness products, buy oils online India, chemical-free oils, traditional oil pressing"
      canonicalUrl="https://rootsandrichness.in/"
      ogImage="https://rootsandrichness.in/og-homepage.jpg"
      structuredData={homepageStructuredData}
    />
  );
};

export default HomeSEO;
