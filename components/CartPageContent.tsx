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
          <div className="glass rounded-[2rem] shadow-sm p-6 md:p-8">
            <div className="h-8 w-40 bg-slate-200/50 rounded-lg mb-8 animate-pulse-slow" />
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
      <div className="lg:col-span-8 space-y-8">
        <section className="glass rounded-[2rem] shadow-sm p-6 md:p-10 transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="bg-brand-100 text-brand-600 p-2 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Your Eco Cart
              </h2>
            </div>
            <span className="text-sm font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-slate-300" />
              </div>
              <p className="text-xl font-bold text-slate-700 mb-2">Your cart is empty</p>
              <p className="text-slate-500 max-w-sm mb-8">Looks like you haven't added any eco-friendly products to your cart yet.</p>
              <button 
                onClick={() => router.push("/")} 
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-brand-200 transition-all active:scale-[0.98]"
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
