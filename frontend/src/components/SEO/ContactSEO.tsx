
import PageSEO from './PageSEO';
import { contactPageData, organizationData } from '@/utils/structuredData';

const ContactSEO = () => {
  const contactStructuredData = [
    organizationData,
    contactPageData,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Contact Roots and Richness - Get in Touch",
      "description": "Contact Roots and Richness for queries about wood-pressed oils, bulk orders, or partnership opportunities. Reach us via phone, email, or visit our office.",
      "url": "https://rootsandrichness.in/contact",
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
            "name": "Contact",
            "item": "https://rootsandrichness.in/contact"
          }
        ]
      }
    }
  ];

  return (
    <PageSEO
      title="Contact Roots and Richness - Wood-Pressed Oils & Natural Products"
      description="Get in touch with Roots and Richness for questions about our wood-pressed oils, bulk orders, wholesale inquiries, or partnership opportunities. Customer support available Mon-Sat 9 AM to 6 PM."
      keywords="contact roots and richness, wood-pressed oils customer support, bulk oil orders, wholesale natural products, partnership opportunities, customer service india"
      canonicalUrl="https://rootsandrichness.in/contact"
      ogImage="https://rootsandrichness.in/og-contact.jpg"
      structuredData={contactStructuredData}
      author="Roots and Richness Team"
    />
  );
};

export default ContactSEO;
