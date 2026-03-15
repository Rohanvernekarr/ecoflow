"use client";

import { useEffect, useState } from "react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { fetchCartData } from "@/lib/api";
import { CartItem } from "@/components/CartItem";
import { OrderSummary } from "@/components/OrderSummary";
import { useRouter } from "next/navigation";
import { CartItemSkeleton, OrderSummarySkeleton } from "./Skeleton";
import { ShoppingBag } from "lucide-react";

export function CartPageContent() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const setCartData = useCheckoutStore((state) => state.setCartData);
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const hasHydrated = useCheckoutStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    const loadCart = async () => {
      try {
        if (cartItems.length === 0) {
          const data = await fetchCartData();
          setCartData(data.cartItems, data.shipping_fee, data.discount_applied);
        }
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      } finally {
        setTimeout(() => setLoading(false), 300); // Artificial slight delay for smoother entry
      }
    };

    loadCart();
  }, [hasHydrated, cartItems.length, setCartData]);

  if (!hasHydrated || loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12  gap-8 animate-fade-in-up md:px-4">
        <div className="lg:col-span-8 space-y-8">
          <div className="glass rounded-3xl md:rounded-[2rem] shadow-sm p-5 md:p-8">
            <div className="h-6 md:h-8 w-32 md:w-40 bg-slate-200/50 rounded-lg mb-6 md:mb-8 animate-pulse-slow" />
            <div className="space-y-6">
              <CartItemSkeleton />
              <CartItemSkeleton />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <OrderSummarySkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up md:px-4">
      <div className="lg:col-span-8 space-y-6 md:space-y-8">
        <section className="glass rounded-3xl md:rounded-[2rem] shadow-sm p-4 md:p-10 transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-6 md:mb-8 pb-4 border-b border-slate-200/50">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-brand-100 text-brand-600 p-2 rounded-xl">
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                Your Eco Cart
              </h2>
            </div>
            <span className="text-xs md:text-sm font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-slate-300" />
              </div>
              <p className="text-lg md:text-xl font-bold text-slate-700 mb-2">Your cart is empty</p>
              <p className="text-sm md:text-base text-slate-500 max-w-sm mb-6 md:mb-8 px-4">Looks like you haven't added any eco-friendly products to your cart yet.</p>
              <button 
                onClick={() => router.push("/")} 
                className="bg-brand-600 hover:bg-brand-700 text-white text-sm md:text-base font-bold py-3 px-8 rounded-full shadow-lg shadow-brand-200 transition-all active:scale-[0.98]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {cartItems.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="lg:col-span-4">
        <OrderSummary 
          buttonLabel="Secure Checkout" 
          onAction={() => router.push("/checkout")}
          isActionDisabled={cartItems.length === 0}
        />
      </div>
    </div>
  );
}
