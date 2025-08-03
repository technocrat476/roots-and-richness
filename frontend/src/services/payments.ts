import { processPayment as processRazorpayPayment } from './razorpay';

export interface PaymentData {
  amount: number;
  currency: string;
  receipt: string;
  notes: any;
}

export interface CustomerData {
  name: string;
  email: string;
  contact: string;
}

export interface PhonePePaymentData {
  amount: number;
  merchantTransactionId: string;
  merchantUserId: string;
  redirectUrl: string;
  redirectMode: string;
  callbackUrl: string;
  mobileNumber?: string;
  paymentInstrument: {
    type: string;
    targetApp?: string;
  };
}

export interface UPIPaymentData {
  amount: number;
  currency: string;
  merchantTransactionId: string;
  customerData: CustomerData;
  upiId?: string;
}

export interface UPIPaymentResponse {
  success: boolean;
  transactionId: string;
  upiRefId: string;
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}

export type PaymentProvider = 'razorpay' | 'phonepe' | 'upi' | 'cod';

// Initialize Razorpay SDK
export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Razorpay payment processing
export const processRazorpayPaymentDirect = async (
  paymentData: PaymentData,
  customerData: CustomerData,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  try {
    await processRazorpayPayment(paymentData, customerData, onSuccess, onError);
  } catch (error) {
    console.error('Razorpay payment error:', error);
    onError('Payment processing failed. Please try again.');
  }
};

// PhonePe payment processing (simulated for frontend-only)
export const processPhonePePayment = async (
  paymentData: PhonePePaymentData,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  try {
    // Simulate PhonePe payment flow
    const simulatedResponse = {
      success: true,
      merchantTransactionId: paymentData.merchantTransactionId,
      transactionId: `phonepe_${Date.now()}`,
      amount: paymentData.amount,
      status: 'SUCCESS'
    };
    
    // Simulate processing delay
    setTimeout(() => {
      onSuccess(simulatedResponse);
    }, 1500);
  } catch (error) {
    onError(error);
  }
};

// UPI payment processing (simulated)
export const processUPIPayment = async (
  paymentData: UPIPaymentData,
  onSuccess: (response: UPIPaymentResponse) => void,
  onError: (error: any) => void
) => {
  try {
    const transactionId = `UPI_${Date.now()}`;
    const upiRefId = `${transactionId}_REF`;
    
    // Simulate payment processing
    setTimeout(() => {
      // Simulate success/failure (90% success rate for demo)
      const success = Math.random() > 0.1;
      
      if (success) {
        onSuccess({
          success: true,
          transactionId,
          upiRefId,
          amount: paymentData.amount,
          status: 'SUCCESS'
        });
      } else {
        onError('UPI payment failed. Please try again.');
      }
    }, 2000);
    
  } catch (error) {
    onError(error);
  }
};

// Cash on Delivery processing
export const processCODPayment = async (
  orderData: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  try {
    const orderResponse = {
      success: true,
      orderId: `COD_${Date.now()}`,
      paymentMethod: 'Cash on Delivery',
      total: orderData.total,
      status: 'ORDER_PLACED'
    };
    
    onSuccess(orderResponse);
  } catch (error) {
    onError(error);
  }
};

// Unified payment processor
export const processPayment = async (
  provider: PaymentProvider,
  paymentData: any,
  customerData: CustomerData,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  console.log(`Processing payment with ${provider}:`, { paymentData, customerData });
  
  switch (provider) {
    case 'razorpay':
      return processRazorpayPaymentDirect(paymentData, customerData, onSuccess, onError);
    case 'phonepe':
      return processPhonePePayment(paymentData, onSuccess, onError);
    case 'upi':
      return processRazorpayPaymentDirect(paymentData, customerData, onSuccess, onError);
    case 'cod':
      return processCODPayment(paymentData, onSuccess, onError);
    default:
      onError('Invalid payment provider');
  }
};

// Webhook handler for payment verification (simulated)
export const handlePaymentWebhook = async (webhookData: any) => {
  try {
    console.log('Payment webhook received:', webhookData);
    
    return {
      success: true,
      orderId: webhookData.orderId,
      paymentId: webhookData.paymentId,
      status: webhookData.status
    };
  } catch (error) {
    console.error('Webhook processing error:', error);
    throw error;
  }
};
