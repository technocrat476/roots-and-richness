
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CouponValidationResult } from '@/services/coupons';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  appliedCoupon: CouponValidationResult | null;
  discountAmount: number;
  finalTotal: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'APPLY_COUPON'; payload: CouponValidationResult }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const calculateTotals = (items: CartItem[], appliedCoupon: CouponValidationResult | null) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const discountAmount = appliedCoupon?.success ? appliedCoupon.discount : 0;
  const finalTotal = Math.max(0, total - discountAmount);
  
  return { total, itemCount, discountAmount, finalTotal };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const totals = calculateTotals(newItems, state.appliedCoupon);
      
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(newItems, state.appliedCoupon);
      
      return {
        ...state,
        items: newItems,
        appliedCoupon: newItems.length === 0 ? null : state.appliedCoupon,
        ...totals
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const totals = calculateTotals(newItems, state.appliedCoupon);
      
      return {
        ...state,
        items: newItems,
        appliedCoupon: newItems.length === 0 ? null : state.appliedCoupon,
        ...totals
      };
    }
    
    case 'APPLY_COUPON': {
      const appliedCoupon = action.payload.success ? action.payload : null;
      const totals = calculateTotals(state.items, appliedCoupon);
      
      return {
        ...state,
        appliedCoupon: action.payload,
        ...totals
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
        appliedCoupon: null,
        discountAmount: 0,
        finalTotal: 0
      };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    appliedCoupon: null,
    discountAmount: 0,
    finalTotal: 0
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
