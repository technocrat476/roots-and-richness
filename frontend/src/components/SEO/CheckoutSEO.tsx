
import { Helmet } from 'react-helmet-async';

interface CheckoutSEOProps {
  step?: 'checkout' | 'payment' | 'confirmation';
  orderTotal?: number;
}

const CheckoutSEO: React.FC<CheckoutSEOProps> = ({ step = 'checkout', orderTotal }) => {
  const getTitle = () => {
    switch (step) {
      case 'payment':
        return 'Secure Payment - UPI, PhonePe, Cards | Roots and Richness';
      case 'confirmation':
        return 'Order Confirmation | Roots and Richness';
      default:
        return 'Secure Checkout - Natural Wood-Pressed Oils | Roots and Richness';
    }
  };

  const getDescription = () => {
    switch (step) {
      case 'payment':
        return 'Complete your payment securely with UPI, PhonePe, Google Pay, Cards, or Cash on Delivery. Fast, secure, and encrypted transactions.';
      case 'confirmation':
        return 'Your order has been placed successfully. Track your natural wood-pressed oils and wellness products delivery.';
      default:
        return 'Secure checkout for premium natural wood-pressed oils and wellness products. Multiple payment options including UPI, PhonePe, and COD.';
    }
  };

  return (
    <Helmet>
      <title>{getTitle()}</title>
      <meta name="description" content={getDescription()} />
      
      {/* Prevent indexing of checkout pages */}
      <meta name="robots" content="noindex, nofollow" />
      
      {/* Security headers for payment pages */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      
      {/* Structured data for checkout process */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CheckoutPage",
          "name": "Roots and Richness Checkout",
          "description": getDescription(),
          "provider": {
            "@type": "Organization",
            "name": "Roots and Richness",
            "url": "https://rootsandrichness.com"
          },
          "paymentAccepted": [
            "UPI",
            "PhonePe", 
            "Google Pay",
            "Credit Card",
            "Debit Card",
            "Cash on Delivery"
          ],
          ...(orderTotal && {
            "totalPrice": orderTotal,
            "priceCurrency": "INR"
          })
        })}
      </script>
    </Helmet>
  );
};

export default CheckoutSEO;
