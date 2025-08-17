
import React from 'react';
import { CreditCard, Smartphone, Banknote, Wallet } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PaymentProvider } from '@/services/payments';

interface PaymentMethod {
  id: PaymentProvider | 'upi' | 'cod' | 'wallet';
  name: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
}

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange
}) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI / PhonePe',
      description: 'PhonePe, Google Pay, Paytm, BHIM & other UPI apps',
      icon: <Smartphone className="text-purple-600" size={20} />,
      popular: true
    },
    {
      id: 'razorpay',
      name: 'Cards & More',
      description: 'Credit/Debit Cards, Net Banking, Wallets',
      icon: <CreditCard className="text-primary" size={20} />
    },
    {
      id: 'phonepe',
      name: 'PhonePe Direct',
      description: 'Direct PhonePe payment gateway',
      icon: <Smartphone className="text-purple-600" size={20} />
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when your order arrives',
      icon: <Banknote className="text-green-600" size={20} />
    }
  ];

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
        {paymentMethods.map((method) => (
          <div key={method.id} className="relative">
            <div className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors cursor-pointer ${
              selectedMethod === method.id 
                ? 'border-primary bg-primary/5' 
                : 'border-neutral-light hover:border-primary/50'
            }`}>
              <RadioGroupItem value={method.id} id={method.id} />
              {method.icon}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Label htmlFor={method.id} className="font-medium cursor-pointer">
                    {method.name}
                  </Label>
                  {method.popular && (
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-sm text-neutral-medium mt-1">
                  {method.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>

      {/* Payment method specific information */}
      {selectedMethod === 'upi' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Smartphone className="text-blue-600 mt-0.5" size={16} />
            <div className="text-sm">
              <p className="font-medium text-blue-900">UPI Payment Benefits:</p>
              <ul className="text-blue-700 mt-1 space-y-1">
                <li>• Instant payment confirmation</li>
                <li>• No additional charges</li>
                <li>• Secure & encrypted transactions</li>
                <li>• Works with all UPI apps</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'cod' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Banknote className="text-amber-600 mt-0.5" size={16} />
            <div className="text-sm">
              <p className="font-medium text-amber-900">Cash on Delivery:</p>
              <p className="text-amber-700 mt-1">
                Pay ₹50 extra as COD charges. Please keep exact change ready.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
