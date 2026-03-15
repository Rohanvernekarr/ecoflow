import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, ShippingAddress } from "@/types";

interface CheckoutState {
  cartItems: CartItem[];
  shippingFee: number;
  discountApplied: number;
  shippingAddress: ShippingAddress | null;
  appliedCoupon: string | null;
  couponDiscount: number;
  setCartData: (
    items: CartItem[],
    shippingFee: number,
    discountApplied: number
  ) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeItem: (productId: number) => void;
  savedAddresses: ShippingAddress[];
  setShippingAddress: (address: ShippingAddress) => void;
  addSavedAddress: (address: ShippingAddress) => void;
  updateSavedAddress: (id: string, address: ShippingAddress) => void;
  removeSavedAddress: (id: string) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  placeOrder: () => void;
  clearLastOrder: () => void;
  getSubtotal: () => number;
  getGrandTotal: () => number;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  selectedAddressId: string | null;
  selectedPaymentMethod: string;
  setSelectedAddressId: (id: string | null) => void;
  setSelectedPaymentMethod: (method: string) => void;
  lastOrder: {
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    shippingFee: number;
    discountApplied: number;
    subtotal: number;
    grandTotal: number;
  } | null;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      shippingFee: 0,
      discountApplied: 0,
      shippingAddress: null,
      appliedCoupon: null,
      couponDiscount: 0,
      savedAddresses: [],
      lastOrder: null,
      hasHydrated: false,
      selectedAddressId: null,
      selectedPaymentMethod: "upi",
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setSelectedAddressId: (id) => set({ selectedAddressId: id }),
      setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

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

      addSavedAddress: (address) =>
        set((state) => ({
          savedAddresses: [...state.savedAddresses, address],
        })),

      removeSavedAddress: (id) =>
        set((state) => ({
          savedAddresses: state.savedAddresses.filter((a) => a.id !== id),
        })),

      updateSavedAddress: (id, updatedAddress) =>
        set((state) => ({
          savedAddresses: state.savedAddresses.map((a) =>
            a.id === id ? { ...updatedAddress, id } : a
          ),
        })),

      applyCoupon: (code, discount) =>
        set({
          appliedCoupon: code,
          couponDiscount: discount,
        }),

      removeCoupon: () =>
        set({
          appliedCoupon: null,
          couponDiscount: 0,
        }),

      clearCart: () =>
        set({
          cartItems: [],
          shippingAddress: null,
        }),

      placeOrder: () => {
        const state = get();
        if (!state.shippingAddress) return;
        set({
          lastOrder: {
            cartItems: [...state.cartItems],
            shippingAddress: { ...state.shippingAddress },
            paymentMethod: state.selectedPaymentMethod,
            shippingFee: state.shippingFee,
            discountApplied: state.discountApplied,
            subtotal: state.getSubtotal(),
            grandTotal: state.getGrandTotal(),
          },
          cartItems: [],
          shippingAddress: null,
        });
      },

      clearLastOrder: () => set({ lastOrder: null }),

      getSubtotal: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (total, item) => total + item.product_price * item.quantity,
          0
        );
      },

      getGrandTotal: () => {
        const { getSubtotal, shippingFee, discountApplied, couponDiscount } = get();
        return getSubtotal() + shippingFee - discountApplied - couponDiscount;
      },
    }),
    {
      name: "checkout-store",
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
