
import PageSEO from './PageSEO';
import { aboutPageData, organizationData } from '@/utils/structuredData';

const AboutSEO = () => {
  const aboutStructuredData = [
    organizationData,
    aboutPageData,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "About Roots and Richness - Our Story of Traditional Wellness",
      "description": "Learn about Roots and Richness - India's trusted source for wood-pressed oils and natural wellness products, sourced directly from tribal communities and small farms",
      "url": "https://rootsandrichness.in/about",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rootsandrichness.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About Us",
            "item": "https://rootsandrichness.in/about"
          }
        ]
      }
    }
  ];

  return (
    <PageSEO
      title="About Roots and Richness - Traditional Wellness from Indian Farms"
      description="Discover our journey of bringing pure, wood-pressed oils and natural wellness products from Indian farms and tribal communities to modern homes. Learn about our commitment to traditional processing methods and sustainable agriculture."
      keywords="about roots and richness, wood-pressed oils company, traditional oil processing, indian farms, tribal communities, natural wellness products, sustainable agriculture, organic oils india"
      canonicalUrl="https://rootsandrichness.in/about"
      ogImage="https://rootsandrichness.in/og-about.jpg"
      structuredData={aboutStructuredData}
      author="Roots and Richness Team"
    />
  );
};

export default AboutSEO;
