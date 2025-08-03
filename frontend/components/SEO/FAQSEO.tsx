
import PageSEO from './PageSEO';

const FAQSEO = () => {
  const faqStructuredData = {
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
      },
      {
        "@type": "Question",
        "name": "Are your oils tested for quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our oils undergo rigorous quality testing for purity, nutritional content, and safety. We maintain strict quality standards from sourcing to packaging."
        }
      },
      {
        "@type": "Question",
        "name": "How should I store the oils?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Store oils in a cool, dry place away from direct sunlight. Keep bottles tightly closed and use within 6-12 months of opening for best quality and freshness."
        }
      }
    ]
  };

  return (
    <PageSEO
      title="Frequently Asked Questions - Wood-Pressed Oils & Natural Products | Roots and Richness"
      description="Get answers to common questions about wood-pressed oils, shipping, returns, and our natural wellness products. Learn about traditional oil processing and quality standards."
      keywords="wood-pressed oils faq, natural products questions, oil storage, shipping policy, return policy, traditional oil processing"
      canonicalUrl="https://rootsandrichness.in/faq"
      structuredData={faqStructuredData}
    />
  );
};

export default FAQSEO;
