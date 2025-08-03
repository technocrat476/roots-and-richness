
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  useEffect(() => {
    // Clear cart after successful order
    // This would typically be handled by the cart context
    console.log('Order confirmed, clearing cart');
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-neutral-light flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-playfair font-bold text-secondary">Order Not Found</h1>
          <p className="text-neutral-medium">We couldn't find your order details.</p>
          <Link to="/">
            <Button className="btn-primary">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h1 className="text-3xl font-playfair font-bold text-secondary">Order Confirmed!</h1>
          <p className="text-lg text-neutral-medium">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="text-sm text-neutral-medium">
            Order ID: <span className="font-medium text-secondary">{orderData.orderId}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair flex items-center">
                <Package className="mr-2" size={20} />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderData.items?.map((item: any) => (
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

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-medium">Subtotal</span>
                  <span>₹{orderData.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-medium">Shipping</span>
                  <span className="text-accent">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-medium">Tax (18%)</span>
                  <span>₹{orderData.tax?.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span>₹{orderData.total?.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Payment Info */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <Truck className="mr-2" size={20} />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="font-medium">
                    {orderData.customerInfo?.firstName} {orderData.customerInfo?.lastName}
                  </div>
                  <div className="text-neutral-medium">
                    {orderData.customerInfo?.address}
                  </div>
                  <div className="text-neutral-medium">
                    {orderData.customerInfo?.city}, {orderData.customerInfo?.state} {orderData.customerInfo?.pincode}
                  </div>
                  <div className="text-neutral-medium">
                    {orderData.customerInfo?.phone}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <CreditCard className="mr-2" size={20} />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Payment Method</span>
                    <span className="font-medium">Razorpay</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Payment ID</span>
                    <span className="font-medium">{orderData.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-medium">Status</span>
                    <span className="text-green-600 font-medium">Paid</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Order Processing</div>
                    <div className="text-neutral-medium">We're preparing your order for shipment</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-neutral-light rounded-full mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Shipping</div>
                    <div className="text-neutral-medium">Your order will be shipped within 3-5 business days</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-neutral-light rounded-full mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Delivery</div>
                    <div className="text-neutral-medium">Free delivery to your doorstep</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/products">
            <Button variant="outline" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/">
            <Button className="btn-primary w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
