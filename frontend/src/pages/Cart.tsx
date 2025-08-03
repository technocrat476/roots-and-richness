
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import StickyCheckoutButton from '@/components/ui/StickyCheckoutButton';
import CouponInput from '@/components/ui/CouponInput';
import { CouponValidationResult } from '@/services/coupons';

const Cart = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleCouponApplied = (result: CouponValidationResult) => {
    dispatch({ type: 'APPLY_COUPON', payload: result });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-light">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="text-6xl">🛒</div>
            <h1 className="text-2xl font-playfair font-bold text-secondary">Your Cart is Empty</h1>
            <p className="text-neutral-medium">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="btn-primary">
                <ShoppingBag size={20} className="mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/products">
              <Button variant="outline" size="sm">
                <ArrowLeft size={16} className="mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-playfair font-bold text-secondary">Shopping Cart</h1>
              <p className="text-neutral-medium">{state.itemCount} items in your cart</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full md:w-24 h-24 bg-neutral-light rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link 
                            to={`/products/${item.slug}`}
                            className="text-lg font-playfair font-semibold text-secondary hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-neutral-medium">In Stock</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-secondary">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-sm text-neutral-medium">
                            ₹{item.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Coupon Input */}
            <CouponInput 
              cartTotal={state.total}
              onCouponApplied={handleCouponApplied}
              appliedCoupon={state.appliedCoupon}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-playfair font-bold text-secondary">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Subtotal ({state.itemCount} items)</span>
                    <span className="font-medium">₹{state.total.toLocaleString()}</span>
                  </div>
                  
                  {state.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span className="font-medium">-₹{state.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Shipping</span>
                    <span className="font-medium text-accent">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Tax</span>
                    <span className="font-medium">₹{Math.round(state.finalTotal * 0.18).toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-secondary">Total</span>
                    <div className="text-right">
                      <span className="text-secondary">₹{Math.round(state.finalTotal * 1.18).toLocaleString()}</span>
                      {state.discountAmount > 0 && (
                        <div className="text-sm text-green-600 font-normal">
                          You saved ₹{state.discountAmount}!
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/checkout" className="block">
                    <Button className="btn-primary w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <div className="text-center">
                    <Link to="/products" className="text-sm text-primary hover:underline">
                      or continue shopping
                    </Link>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-neutral-light space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span className="text-neutral-medium">Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span className="text-neutral-medium">Free shipping on orders over ₹500</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span className="text-neutral-medium">Easy 7-day returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sticky Checkout Button */}
      <StickyCheckoutButton />
    </div>
  );
};

export default Cart;
