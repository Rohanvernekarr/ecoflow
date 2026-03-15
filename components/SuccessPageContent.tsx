"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SuccessSkeleton } from "./Skeleton";

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
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <SuccessSkeleton />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8 md:py-16 px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <div className="max-w-2xl w-full glass p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200/50 animate-fade-in-up relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-200/20 rounded-full blur-3xl -mx-10 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -mx-10 -mb-10 pointer-events-none" />

        <div className="text-center space-y-6 relative z-10">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-400 rounded-full blur-xl opacity-30 animate-pulse-slow" />
              <div className="rounded-full bg-gradient-to-tr from-brand-100 to-white shadow-sm p-4 relative border border-brand-200/50">
                <CheckCircle className="w-16 h-16 text-brand-600 animate-in zoom-in duration-500 delay-100" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-3">Order Successful!</h1>
            <p className="text-slate-500 font-semibold text-lg max-w-sm mx-auto">
              Thank you, <span className="text-slate-800">{lastOrder.shippingAddress.fullName}</span>. Your eco-friendly products are being processed.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200/50 mt-10 pt-10 relative z-10">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-brand-500 rounded-full inline-block"></span>
            Order Overview
          </h2>
          <div className="space-y-4">
            {lastOrder.cartItems.map((item) => (
              <div key={item.product_id} className="flex items-center gap-5 py-4 border-b border-slate-100 last:border-0 hover:bg-white/40 transition-colors p-2 -mx-2 rounded-xl cursor-default">
                <div className="relative w-16 h-16 bg-slate-100 rounded-xl overflow-hidden shrink-0 shadow-sm border border-slate-200/30">
                  <Image src={item.image} alt={item.product_name} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 text-slate-800">
                  <p className="font-bold tracking-tight text-slate-900 line-clamp-1">{item.product_name}</p>
                  <p className="text-xs font-semibold text-slate-500 tracking-wide mt-1 uppercase">Qty: {item.quantity}</p>
                </div>
                <div className="font-black text-slate-900 text-lg">
                  ₹{item.product_price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-100 to-slate-50/50 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row justify-between gap-8 border border-slate-200/50 mt-8 relative z-10 shadow-sm">
          <div className="flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              Shipping To
            </p>
            <p className="font-bold text-slate-900 text-lg mb-1">{lastOrder.shippingAddress.fullName}</p>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {lastOrder.shippingAddress.city}, {lastOrder.shippingAddress.state} {lastOrder.shippingAddress.pinCode}
            </p>
          </div>
          <div className="md:text-right border-t md:border-t-0 md:border-l border-slate-200/60 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Amount Paid</p>
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500 tracking-tighter">₹{lastOrder.grandTotal}</p>
          </div>
        </div>

        <div className="pt-10 text-center relative z-10">
          <Link
            href="/"
            className="inline-flex justify-center items-center px-12 py-5 border border-transparent font-bold rounded-2xl text-white bg-slate-900 hover:bg-black transition-all shadow-xl shadow-slate-200 uppercase tracking-[0.2em] text-xs active:scale-95 group overflow-hidden relative"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
