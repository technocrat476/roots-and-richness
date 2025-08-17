
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, Tag, Loader2 } from 'lucide-react';
import { validateCoupon, type CouponValidationResult } from '@/services/coupons';

interface CouponInputProps {
  cartTotal: number;
  onCouponApplied: (result: CouponValidationResult) => void;
  appliedCoupon?: CouponValidationResult;
}

const CouponInput = ({ cartTotal, onCouponApplied, appliedCoupon }: CouponInputProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await validateCoupon(couponCode.trim(), cartTotal);
      onCouponApplied(result);
      if (result.success) {
        setCouponCode('');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      onCouponApplied({
        success: false,
        discount: 0,
        message: 'Failed to apply coupon. Please try again.'
      });
    }
    setIsLoading(false);
  };

  const handleRemoveCoupon = () => {
    onCouponApplied({
      success: false,
      discount: 0,
      message: ''
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Tag size={20} className="text-primary" />
          <h3 className="font-semibold text-secondary">Have a Coupon?</h3>
        </div>
        
        {!appliedCoupon?.success ? (
          <div className="flex space-x-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                'Apply'
              )}
            </Button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Check size={16} className="text-green-600" />
                <span className="text-green-800 font-medium">
                  {appliedCoupon.message}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveCoupon}
                className="text-green-700 hover:text-green-900"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        )}
        
        {appliedCoupon && !appliedCoupon.success && appliedCoupon.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <X size={16} className="text-red-600" />
              <span className="text-red-800 text-sm">
                {appliedCoupon.message}
              </span>
            </div>
          </div>
        )}
        
        <div className="text-xs text-neutral-medium">
          <p>Popular codes: <span className="font-mono">FLAT100</span>, <span className="font-mono">FIRST10</span>, <span className="font-mono">FREESHIP</span></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CouponInput;
