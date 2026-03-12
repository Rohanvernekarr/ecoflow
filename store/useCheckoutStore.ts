import { create } from "zustand";
import { CartItem, ShippingAddress } from "@/types";

interface CheckoutState {
  cartItems: CartItem[];
  shippingFee: number;
  discountApplied: number;
  shippingAddress: ShippingAddress | null;
  setCartData: (
    items: CartItem[],
    shippingFee: number,
    discountApplied: number
  ) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeItem: (productId: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getGrandTotal: () => number;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  cartItems: [],
  shippingFee: 0,
  discountApplied: 0,
  shippingAddress: null,

  setCartData: (items, shippingFee, discountApplied) =>
    set({
      cartItems: items,
      shippingFee,
      discountApplied,
    }),

  updateQuantity: (productId, newQuantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      ),
    })),

  removeItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product_id !== productId),
    })),

  setShippingAddress: (address) =>
    set({
      shippingAddress: address,
    }),

  clearCart: () =>
    set({
      cartItems: [],
      shippingAddress: null,
    }),

  getSubtotal: () => {
    const { cartItems } = get();
    return cartItems.reduce(
      (total, item) => total + item.product_price * item.quantity,
      0
    );
  },

  getGrandTotal: () => {
    const { getSubtotal, shippingFee, discountApplied } = get();
    return getSubtotal() + shippingFee - discountApplied;
  },
}));
