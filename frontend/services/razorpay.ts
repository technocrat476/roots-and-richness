
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

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

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (paymentData: PaymentData) => {
  // For frontend-only implementation, we'll generate a mock order ID
  // In production, this should be replaced with actual API call to your backend
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id: orderId,
    amount: paymentData.amount,
    currency: paymentData.currency,
    receipt: paymentData.receipt
  };
};

export const processPayment = async (
  paymentData: PaymentData,
  customerData: CustomerData,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  try {
    const res = await initializeRazorpay();

    if (!res) {
      onError('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    // Create order (frontend simulation)
    const order = await createRazorpayOrder(paymentData);

    const options: RazorpayOptions = {
      key: 'rzp_test_9999999999', // Replace with your actual Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: 'Roots and Richness',
      description: 'Natural Wood-Pressed Oils & Wellness Products',
      order_id: order.id,
      handler: (response) => {
        console.log('Payment successful:', response);
        // For frontend-only implementation, we'll simulate a successful response
        const successResponse = {
          razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
          razorpay_order_id: order.id,
          razorpay_signature: response.razorpay_signature || 'simulated_signature'
        };
        onSuccess(successResponse);
      },
      prefill: {
        name: customerData.name,
        email: customerData.email,
        contact: customerData.contact,
      },
      theme: {
        color: '#D4A441',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment cancelled');
          onError('Payment cancelled by user');
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Razorpay initialization error:', error);
    onError('Failed to initialize payment gateway');
  }
};
