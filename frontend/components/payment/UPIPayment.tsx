
import React, { useState } from 'react';
import { QrCode, Smartphone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UPIPaymentProps {
  amount: number;
  onSuccess: (paymentData: any) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

const UPIPayment: React.FC<UPIPaymentProps> = ({ amount, onSuccess, onError, onCancel }) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [upiId, setUpiId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [transactionId, setTransactionId] = useState<string>('');

  // Simulate QR code generation (in real implementation, this would come from payment gateway)
  const generateQRCode = () => {
    setIsLoading(true);
    // Simulate API call to generate QR code
    setTimeout(() => {
      const mockQR = `upi://pay?pa=merchant@paytm&pn=Roots%20and%20Richness&am=${amount}&cu=INR&tn=Payment%20for%20Order`;
      setQrCode(mockQR);
      setUpiId(`pay${Date.now()}@paytm`);
      setIsLoading(false);
    }, 1000);
  };

  const handleUPIAppRedirect = (app: string) => {
    const upiUrl = `upi://pay?pa=merchant@paytm&pn=Roots%20and%20Richness&am=${amount}&cu=INR&tn=Payment%20for%20Order`;
    
    // Try to open UPI app
    window.location.href = upiUrl;
    
    // Start polling for payment status
    setPaymentStatus('processing');
    setTransactionId(`TXN_${Date.now()}`);
    
    // Simulate payment status polling
    setTimeout(() => {
      // In real implementation, this would be handled by webhook
      const success = Math.random() > 0.3; // 70% success rate for demo
      if (success) {
        setPaymentStatus('success');
        onSuccess({
          transactionId: transactionId,
          upiRefId: `UPI${Date.now()}`,
          amount: amount,
          method: 'UPI'
        });
      } else {
        setPaymentStatus('failed');
        onError('Payment failed or cancelled');
      }
    }, 3000);
  };

  React.useEffect(() => {
    generateQRCode();
  }, []);

  const retryPayment = () => {
    setPaymentStatus('pending');
    generateQRCode();
  };

  if (paymentStatus === 'processing') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <RefreshCw className="animate-spin" size={20} />
            <span>Processing Payment</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>Please complete the payment in your UPI app</p>
          <p className="text-sm text-neutral-medium">
            Transaction ID: {transactionId}
          </p>
          <Button variant="outline" onClick={onCancel}>
            Cancel Payment
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-destructive">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              Your payment could not be processed. Please try again or choose a different payment method.
            </AlertDescription>
          </Alert>
          <div className="flex space-x-2">
            <Button onClick={retryPayment} className="flex-1">
              Retry Payment
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Choose Different Method
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Pay with UPI</CardTitle>
        <p className="text-center text-neutral-medium">
          Amount: ₹{amount.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* UPI Apps */}
        <div>
          <h3 className="font-medium mb-3">Pay with UPI Apps</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleUPIAppRedirect('phonepe')}
              className="h-16 flex flex-col items-center space-y-1"
            >
              <Smartphone className="text-purple-600" size={24} />
              <span className="text-sm">PhonePe</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleUPIAppRedirect('gpay')}
              className="h-16 flex flex-col items-center space-y-1"
            >
              <Smartphone className="text-blue-600" size={24} />
              <span className="text-sm">Google Pay</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleUPIAppRedirect('paytm')}
              className="h-16 flex flex-col items-center space-y-1"
            >
              <Smartphone className="text-blue-500" size={24} />
              <span className="text-sm">Paytm</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleUPIAppRedirect('bhim')}
              className="h-16 flex flex-col items-center space-y-1"
            >
              <Smartphone className="text-orange-600" size={24} />
              <span className="text-sm">BHIM</span>
            </Button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="text-center">
          <h3 className="font-medium mb-3">Or Scan QR Code</h3>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <RefreshCw className="animate-spin" size={32} />
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-neutral-light inline-block">
              <QrCode size={120} className="mx-auto mb-2" />
              <p className="text-xs text-neutral-medium">
                Scan with any UPI app
              </p>
            </div>
          )}
        </div>

        {/* UPI ID */}
        {upiId && (
          <div className="text-center">
            <p className="text-sm text-neutral-medium mb-1">UPI ID:</p>
            <code className="bg-neutral-light px-2 py-1 rounded text-sm">
              {upiId}
            </code>
          </div>
        )}

        {/* Cancel Button */}
        <Button variant="outline" onClick={onCancel} className="w-full">
          Choose Different Payment Method
        </Button>
      </CardContent>
    </Card>
  );
};

export default UPIPayment;
