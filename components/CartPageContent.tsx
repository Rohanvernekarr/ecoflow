"use client";

import { useEffect, useState } from "react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { fetchCartData } from "@/lib/api";
import { CartItem } from "@/components/CartItem";
import { OrderSummary } from "@/components/OrderSummary";
import { StickyFooter } from "@/components/StickyFooter";
import { useRouter } from "next/navigation";
import { CartItemSkeleton, OrderSummarySkeleton } from "./Skeleton";
import { ShoppingBag, Leaf, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
        setTimeout(() => setLoading(false), 600);
      }
    };

    loadCart();
  }, [hasHydrated, cartItems.length, setCartData]);

  if (!hasHydrated || loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:px-4">
        <div className="lg:col-span-8 space-y-8">
          <div className="bento-card p-8">
            <div className="h-8 w-40 bg-slate-100 rounded-xl mb-10 animate-pulse" />
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 bg-slate-50 rounded-[2rem] animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="bento-card p-8 h-[400px] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:px-4 pb-44 animate-fade-in">
        <div className="lg:col-span-8">
          {cartItems.length === 0 ? (
            <div className="bento-card overflow-visible">
              <div className="relative p-8 md:p-16 flex flex-col items-center text-center">
                 {/* Decorative elements */}
                 <div className="absolute top-10 left-10 w-20 h-20 bg-brand-50 rounded-full blur-3xl opacity-60" />
                 <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-60" />
                 
                 <div className="relative mb-8">
                   <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-slate-200 rotate-3">
                     <ShoppingBag className="w-10 h-10 text-white" />
                   </div>
                   <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-bounce">
                     <Sparkles className="w-4 h-4 text-white" />
                   </div>
                 </div>

                 <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter">Your cart looks light.</h2>
                 <p className="text-slate-500 font-bold max-w-sm mb-10 text-sm md:text-base uppercase tracking-widest leading-relaxed">
                   Time to start your sustainability journey with products that matter.
                 </p>
                 
                 <button 
                   onClick={() => router.push("/")} 
                   className="group flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-slate-200 active:scale-95"
                 >
                   <span>Explore Collection</span>
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
               <div className="flex items-center justify-between px-4 sm:px-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Eco Cart</h2>
                  </div>
                  <div className="px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                       {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>
               </div>

               <div className="space-y-4">
                 {cartItems.map((item) => (
                   <CartItem key={item.product_id} item={item} />
                 ))}
               </div>

               <div className="bento-card bg-brand-900 p-6 md:p-8 text-white relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                       <Leaf className="w-6 h-6 text-brand-500" />
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-lg font-black text-brand-800 tracking-tight">Eco-Delivery Guaranteed</h3>
                       <p className="text-brand-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                         Every order is shipped in 100% plastic-free, carbon-neutral packaging.
                       </p>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28">
            <OrderSummary />
          </div>
        </div>
      </div>

      {cartItems.length > 0 && (
        <StickyFooter 
          backLabel="Back"
          backHref="/"
          nextLabel="Checkout Now"
          onNext={() => router.push("/checkout")}
        />
      )}
    </div>
  );
}
