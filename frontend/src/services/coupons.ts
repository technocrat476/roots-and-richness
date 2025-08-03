
export interface Coupon {
  id: string;
  code: string;
  type: 'flat' | 'percent';
  value: number;
  minOrderValue: number;
  expiryDate: string;
  isActive: boolean;
  description: string;
}

export interface CouponValidationResult {
  success: boolean;
  discount: number;
  message: string;
  coupon?: Coupon;
}

// Pre-defined coupons for frontend-only implementation
const AVAILABLE_COUPONS: Coupon[] = [
  {
    id: '1',
    code: 'FLAT100',
    type: 'flat',
    value: 100,
    minOrderValue: 499,
    expiryDate: '2025-06-30',
    isActive: true,
    description: '₹100 OFF on orders above ₹499'
  },
  {
    id: '2',
    code: 'FIRST10',
    type: 'percent',
    value: 10,
    minOrderValue: 299,
    expiryDate: '2025-12-31',
    isActive: true,
    description: '10% OFF on orders above ₹299'
  },
  {
    id: '3',
    code: 'FREESHIP',
    type: 'flat',
    value: 75,
    minOrderValue: 699,
    expiryDate: '2025-07-15',
    isActive: true,
    description: '₹75 OFF (Free Shipping) on orders above ₹699'
  }
];

export const validateCoupon = async (code: string, cartTotal: number): Promise<CouponValidationResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const coupon = AVAILABLE_COUPONS.find(c => c.code.toLowerCase() === code.toLowerCase());
  
  if (!coupon) {
    return {
      success: false,
      discount: 0,
      message: 'Invalid coupon code'
    };
  }
  
  if (!coupon.isActive) {
    return {
      success: false,
      discount: 0,
      message: 'This coupon is no longer active'
    };
  }
  
  const currentDate = new Date();
  const expiryDate = new Date(coupon.expiryDate);
  
  if (currentDate > expiryDate) {
    return {
      success: false,
      discount: 0,
      message: 'This offer has expired'
    };
  }
  
  if (cartTotal < coupon.minOrderValue) {
    const remainingAmount = coupon.minOrderValue - cartTotal;
    return {
      success: false,
      discount: 0,
      message: `Add ₹${remainingAmount} more to apply this offer`
    };
  }
  
  let discount = 0;
  if (coupon.type === 'flat') {
    discount = coupon.value;
  } else if (coupon.type === 'percent') {
    discount = Math.round((cartTotal * coupon.value) / 100);
  }
  
  return {
    success: true,
    discount,
    message: `${coupon.code} applied: ₹${discount} OFF`,
    coupon
  };
};

export const getAvailableCoupons = (): Coupon[] => {
  return AVAILABLE_COUPONS.filter(coupon => coupon.isActive);
};
