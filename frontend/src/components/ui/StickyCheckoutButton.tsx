
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const StickyCheckoutButton = () => {
  const navigate = useNavigate();
  const { state } = useCart();

  // Don't show if cart is empty
  if (state.items.length === 0) {
    return null;
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Use finalTotal (which includes coupon discount) and add tax
  const total = Math.round(state.finalTotal * 1.18); // Including 18% tax

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-in-bottom">
      <div className="container mx-auto max-w-md">
        <Button
          onClick={handleCheckout}
          className="w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          style={{
            backgroundColor: '#D4A441',
            color: '#1D3B2A',
            padding: '12px 16px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
          size="lg"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <ShoppingCart size={20} />
              <span>Go to Checkout</span>
            </div>
            <span className="font-bold">₹{total.toLocaleString()}</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default StickyCheckoutButton;
