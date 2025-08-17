import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { processPayment, PaymentProvider } from '@/services/payments';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import UPIPayment from '@/components/payment/UPIPayment';
import CouponInput from '@/components/ui/CouponInput';
import { useToast } from '@/hooks/use-toast';
import { CouponValidationResult } from '@/services/coupons';

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider | 'upi' | 'cod'>('upi');
  const [showUPIPayment, setShowUPIPayment] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCouponApplied = (result: CouponValidationResult) => {
    dispatch({ type: 'APPLY_COUPON', payload: result });
  };

  const validateForm = () => {
    const requiredFields = ['email', 'firstName', 'lastName', 'phone', 'address', 'city', 'state', 'pincode'];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData].trim()) {
        toast({
          title: "Missing Information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive",
        });
        return false;
      }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const calculateTotals = () => {
    const subtotal = state.finalTotal; // Use finalTotal which includes coupon discount
    const tax = Math.round(subtotal * 0.18);
    const codCharges = paymentProvider === 'cod' ? 50 : 0;
    const total = subtotal + tax + codCharges;
    return { subtotal, tax, codCharges, total };
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    if (paymentProvider === 'upi') {
      setShowUPIPayment(true);
      return;
    }
    
    setIsProcessing(true);

    try {
      const { subtotal, tax, total } = calculateTotals();

      const customerData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      };

      if (paymentProvider === 'cod') {
        await processPayment(
          'cod',
          { total, items: state.items, customerInfo: formData },
          customerData,
          (response) => {
            const orderData = {
              orderId: response.orderId,
              paymentId: 'COD',
              paymentProvider: 'cod',
              orderItems: state.items,
              subtotal: subtotal,
              tax: tax,
              codCharges: 50,
              total: response.total,
              customerInfo: formData,
              appliedCoupon: state.appliedCoupon,
              discountAmount: state.discountAmount
            };
            console.log(orderData);

            dispatch({ type: 'CLEAR_CART' });
            navigate('/order-confirmation', { state: { orderData } });

            toast({
              title: "Order Placed Successfully!",
              description: "Your order will be delivered within 3-5 business days.",
            });
fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Optional: include auth token if your backend requires it
    // 'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(orderData)
})
  .then(res => res.json())
  .then(data => {
    console.log("Order saved:", data);
  })
  .catch(err => {
    console.error("Failed to save order:", err);
  });
          },
          (error) => {
            console.error('COD order error:', error);
            toast({
              title: "Order Failed",
              description: "There was an issue placing your order. Please try again.",
              variant: "destructive",
            });
          }
        );
      } else if (paymentProvider === 'razorpay') {
        const paymentData = {
          amount: total * 100, // Razorpay expects amount in paise
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            customerName: customerData.name,
            customerEmail: formData.email,
            itemCount: state.itemCount
          }
        };

        await processPayment(
          'razorpay',
          paymentData,
          customerData,
          (response) => {
            const orderData = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              paymentProvider: 'razorpay',
              items: state.items,
              subtotal: subtotal,
              tax: tax,
              total: total,
              customerInfo: formData,
              appliedCoupon: state.appliedCoupon,
              discountAmount: state.discountAmount
            };

            dispatch({ type: 'CLEAR_CART' });
            navigate('/order-confirmation', { state: { orderData } });

            toast({
              title: "Payment Successful!",
              description: "Your order has been placed successfully.",
            });
          },
          (error) => {
            console.error('Razorpay payment error:', error);
            toast({
              title: "Payment Failed",
              description: "There was an issue processing your payment. Please try again.",
              variant: "destructive",
            });
          }
        );
      } else if (paymentProvider === 'phonepe') {
        const merchantTransactionId = `TXN_${Date.now()}`;
        const phonePeData = {
          amount: total * 100, // PhonePe expects amount in paise
          merchantTransactionId,
          merchantUserId: formData.email,
          redirectUrl: `${window.location.origin}/order-confirmation`,
          redirectMode: 'POST',
          callbackUrl: `${window.location.origin}/api/payments/phonepe/callback`,
          mobileNumber: formData.phone,
          paymentInstrument: {
            type: 'PAY_PAGE'
          }
        };

        await processPayment(
          'phonepe',
          phonePeData,
          customerData,
          (response) => {
            // PhonePe will redirect, so we store order data in localStorage
            const orderData = {
              orderId: merchantTransactionId,
              paymentProvider: 'phonepe',
              items: state.items,
              subtotal: subtotal,
              tax: tax,
              total: total,
              customerInfo: formData,
              appliedCoupon: state.appliedCoupon,
              discountAmount: state.discountAmount
            };
            localStorage.setItem('pendingOrder', JSON.stringify(orderData));
          },
          (error) => {
            console.error('PhonePe payment error:', error);
            toast({
              title: "Payment Failed",
              description: "There was an issue processing your payment. Please try again.",
              variant: "destructive",
            });
          }
        );
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Payment Error",
        description: "Unable to process payment. Please check your details and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUPISuccess = (paymentData: any) => {
    const { subtotal, tax, total } = calculateTotals();
    
    const orderData = {
      orderId: paymentData.transactionId,
      paymentId: paymentData.upiRefId,
      paymentProvider: 'upi',
      items: state.items,
      subtotal: subtotal,
      tax: tax,
      total: total,
      customerInfo: formData,
      appliedCoupon: state.appliedCoupon,
      discountAmount: state.discountAmount
    };

    dispatch({ type: 'CLEAR_CART' });
    navigate('/order-confirmation', { state: { orderData } });

    toast({
      title: "Payment Successful!",
      description: `Payment completed via UPI. Ref ID: ${paymentData.upiRefId}`,
    });
  };

  const handleUPIError = (error: string) => {
    setShowUPIPayment(false);
    toast({
      title: "UPI Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  const handleUPICancel = () => {
    setShowUPIPayment(false);
  };

  const { subtotal, tax, codCharges, total } = calculateTotals();

  if (showUPIPayment) {
    return (
      <div className="min-h-screen bg-neutral-light flex items-center justify-center p-4">
        <UPIPayment
          amount={total}
          onSuccess={handleUPISuccess}
          onError={handleUPIError}
          onCancel={handleUPICancel}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/cart">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Back to Cart
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-playfair font-bold text-secondary">Checkout</h1>
            <p className="text-neutral-medium">Complete your order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentMethodSelector
                  selectedMethod={paymentProvider}
                  onMethodChange={(method) => setPaymentProvider(method as PaymentProvider | 'upi' | 'cod')}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Input */}
            <CouponInput 
              cartTotal={state.total}
              onCouponApplied={handleCouponApplied}
              appliedCoupon={state.appliedCoupon}
            />

            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="font-playfair">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-neutral-light rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-neutral-medium">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Subtotal ({state.itemCount} items)</span>
                    <span>₹{state.total.toLocaleString()}</span>
                  </div>
                  
                  {state.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount ({state.appliedCoupon?.coupon?.code})</span>
                      <span>-₹{state.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Shipping</span>
                    <span className="text-accent">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Tax (18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  {codCharges > 0 && (
                    <div className="flex justify-between">
                      <span className="text-neutral-medium">COD Charges</span>
                      <span>₹{codCharges}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <div className="text-right">
                      <span>₹{total.toLocaleString()}</span>
                      {state.discountAmount > 0 && (
                        <div className="text-sm text-green-600 font-normal">
                          You saved ₹{state.discountAmount}!
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || state.items.length === 0}
                  className="btn-primary w-full"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : 
                   paymentProvider === 'upi' ? `Pay ₹${total.toLocaleString()} with UPI` :
                   paymentProvider === 'cod' ? `Place Order - ₹${total.toLocaleString()}` :
                   `Pay ₹${total.toLocaleString()}`}
                </Button>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-neutral-light space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="text-primary" size={16} />
                    <span className="text-neutral-medium">Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="text-primary" size={16} />
                    <span className="text-neutral-medium">Free delivery in 3-5 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
