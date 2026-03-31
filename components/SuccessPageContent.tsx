"use client";

import { CheckCircle, Sparkles, ArrowRight, Package, Truck, Clock } from "lucide-react";
import Link from "next/link";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SuccessSkeleton } from "./Skeleton";
import { cn } from "@/lib/utils";

export function SuccessPageContent() {
  const router = useRouter();
  const lastOrder = useCheckoutStore((state) => state.lastOrder);
  const hasHydrated = useCheckoutStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && !lastOrder) {
      router.push("/");
    }
  }, [hasHydrated, lastOrder, router]);

  if (!hasHydrated || !lastOrder) {
    return (
      <div className="flex items-center justify-center py-24 px-4">
        <SuccessSkeleton />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 md:py-24 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="max-w-3xl w-full flex flex-col gap-6 md:gap-8 animate-fade-in">
        
        {/* Celebration Header */}
        <div className="bento-card overflow-visible relative group">
           <div className="absolute inset-0 bg-brand-500/5 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
           
           <div className="p-8 md:p-16 flex flex-col items-center text-center relative z-10">
              <div className="relative mb-6 md:mb-10">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-900 rounded-3xl md:rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-200 rotate-6 group-hover:rotate-0 transition-transform duration-700">
                  <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-brand-400" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 animate-bounce">
                   <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-brand-500" />
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Order placed successfully</h1>
              <p className="text-slate-500 font-medium max-w-sm mx-auto text-sm md:text-base leading-relaxed">
                Thank you, <span className="text-slate-900 underline decoration-brand-500 decoration-2 underline-offset-4">{lastOrder.shippingAddress.fullName}</span>. Your sustainable journey has begun.
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
           <div className="md:col-span-2 bento-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                 <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-slate-600" />
                 </div>
                 <h2 className="text-lg font-bold text-slate-900 tracking-tight">Order contents</h2>
              </div>

              <div className="space-y-4 md:space-y-6">
                {lastOrder.cartItems.map((item) => (
                  <div key={item.product_id} className="flex items-center gap-4 md:gap-5 group/item">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 group-hover/item:scale-105 transition-transform">
                      <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-sm tracking-tight leading-none mb-1.5">{item.product_name}</p>
                      <p className="text-[10px] md:text-xs font-semibold text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">₹{item.product_price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Quick Stats */}
           <div className="flex flex-col gap-6">
              <div className="bento-card p-6 bg-brand-50 border-brand-100 flex flex-col justify-center items-center text-center">
                 <Clock className="w-6 h-6 text-brand-600 mb-2" />
                 <p className="text-[10px] md:text-xs font-semibold text-brand-700 mb-1">Estimated delivery</p>
                 <p className="text-base md:text-lg font-bold text-brand-900 tracking-tight">3-5 business days</p>
              </div>

              <div className="bento-card p-6 flex flex-col justify-center items-center text-center">
                 <Truck className="w-6 h-6 text-slate-400 mb-2" />
                 <p className="text-[10px] md:text-xs font-semibold text-slate-400 mb-1">Shipping status</p>
                 <p className="text-base md:text-lg font-bold text-slate-900 tracking-tight">Processing</p>
              </div>
           </div>
        </div>

        <div className="bento-card bg-slate-900 p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 overflow-hidden relative">
           <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px] -ml-32 -mt-32" />
           
           <div className="relative z-10 text-center md:text-left">
              <p className="text-[10px] md:text-[16px] font-semibold text-brand-400 mb-2">Total amount paid</p>
              <h2 className="text-4xl md:text-5xl text-black tracking-tighter">₹{lastOrder.grandTotal}</h2>
           </div>

           <Link
             href="/"
             className="group relative h-14 md:h-16 px-10 md:px-12 bg-white border border-brand-400 text-black rounded-2xl flex items-center justify-center font-bold text-xs md:text-sm tracking-wide transition-all active:scale-95 overflow-hidden w-full md:w-auto"
           >
              <div className="absolute inset-0 bg-brand-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                 Continue shopping
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
           </Link>
        </div>

      </div>
    </div>
  );
}
