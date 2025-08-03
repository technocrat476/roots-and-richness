import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import SearchBox from '@/components/ui/SearchBox';
import PageSEO from '@/components/SEO/PageSEO';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      question: "What makes wood-pressed oils different from regular oils?",
      answer: "Wood-pressed oils are extracted using traditional wooden presses at room temperature, preserving natural nutrients, antioxidants, and flavors that are often destroyed in high-heat industrial processing. They contain no chemical solvents and retain their natural aroma and taste."
    },
    {
      question: "How long do wood-pressed oils last?",
      answer: "Our wood-pressed oils have a shelf life of 12-18 months when stored in a cool, dry place away from direct sunlight. Once opened, we recommend using within 6-8 months for optimal freshness and nutritional value."
    },
    {
      question: "Are your products organic and chemical-free?",
      answer: "Yes, all our products are 100% natural and chemical-free. Our oils are extracted without any chemical solvents, and our tribal-sourced products follow traditional, sustainable farming practices without harmful pesticides or chemicals."
    },
    {
      question: "Do you offer free shipping?",
      answer: "We offer free shipping on orders above ₹999. For orders below this amount, a nominal shipping charge of ₹50 applies. We ship across India and typically deliver within 3-7 business days."
    },
    {
      question: "What is your return and refund policy?",
      answer: "We offer a 7-day return policy for unopened products. If you're not satisfied with your purchase, you can return it within 7 days of delivery for a full refund. Please ensure the product is in its original packaging."
    },
    {
      question: "How do I know which oil is right for me?",
      answer: "Each oil has unique properties and benefits. Coconut oil is great for cooking and hair care, sesame oil is perfect for oil pulling and massage, while mustard oil is excellent for cooking and body massage. Check our product descriptions or contact us for personalized recommendations."
    },
    {
      question: "Are your products suitable for all age groups?",
      answer: "Yes, our natural wood-pressed oils are suitable for all age groups, from infants to elderly. However, we recommend consulting with a healthcare provider before introducing new oils to infants or if you have specific health conditions."
    },
    {
      question: "How should I store wood-pressed oils?",
      answer: "Store our oils in a cool, dry place away from direct sunlight. Keep the bottles tightly closed and avoid storing them near heat sources like stoves. Refrigeration is not necessary but can help extend shelf life in hot climates."
    },
    {
      question: "Do you have physical stores or only sell online?",
      answer: "Currently, we operate as a direct-to-consumer brand and sell exclusively online. This allows us to offer better prices by eliminating middlemen and ensures fresh products reach you directly from our processing units."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit cards, debit cards, UPI, net banking, and digital wallets through our secure Razorpay payment gateway. All transactions are encrypted and secure."
    }
  ];

  // Filter FAQ items based on search query
  const filteredFaqData = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItem = (faqQuestion: string) => {
    setOpenItems(prev => 
      prev.includes(faqQuestion) 
        ? prev.filter(i => i !== faqQuestion)
        : [...prev, faqQuestion]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Don't automatically clear open items - let user control expansion
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setOpenItems([]);
  };

  // JSON-LD structured data for FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title="FAQ - Frequently Asked Questions | Wood-Pressed Oils"
        description="Find answers to common questions about our wood-pressed oils, shipping, returns, and more. Search through our comprehensive FAQ to get quick answers."
        keywords="FAQ, wood-pressed oils questions, shipping policy, return policy, oil storage, organic oils"
        canonicalUrl="https://yoursite.com/faq"
        structuredData={faqJsonLd}
      />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-neutral-light py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-neutral-medium hover:text-primary">Home</Link>
            <span className="text-neutral-medium">/</span>
            <span className="text-secondary font-medium">FAQ</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-playfair font-bold text-secondary mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-medium max-w-2xl mx-auto mb-8">
            Find answers to common questions about our wood-pressed oils, shipping, and more. 
            Can't find what you're looking for? Feel free to contact us.
          </p>
          
          {/* Search Box */}
          <div className="max-w-md mx-auto">
            <SearchBox
              placeholder="Search FAQ..."
              onSearch={handleSearch}
              onClear={handleClearSearch}
              initialValue={searchQuery}
              debounceMs={300}
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search Results Info */}
            {searchQuery && (
              <div className="mb-6 text-center">
                <p className="text-neutral-medium">
                  {filteredFaqData.length > 0 
                    ? `Found ${filteredFaqData.length} result${filteredFaqData.length !== 1 ? 's' : ''} for "${searchQuery}"`
                    : `No results found for "${searchQuery}"`
                  }
                </p>
              </div>
            )}

            <div className="space-y-4">
              {filteredFaqData.map((faq, index) => (
                <Card key={faq.question} className="overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(faq.question)}
                      className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-secondary pr-4">
                        {faq.question}
                      </h3>
                      {openItems.includes(faq.question) ? (
                        <ChevronUp className="text-primary flex-shrink-0" size={20} />
                      ) : (
                        <ChevronDown className="text-primary flex-shrink-0" size={20} />
                      )}
                    </button>
                    
                    {openItems.includes(faq.question) && (
                      <div className="px-6 pb-6">
                        <p className="text-neutral-medium leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFaqData.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-neutral-medium mb-4">
                  Try searching with different keywords or browse all questions above.
                </p>
                <Button onClick={handleClearSearch} variant="outline">
                  Show All Questions
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-playfair font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our team is here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
          <Link to="/contact">
            <Button className="btn-primary">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
