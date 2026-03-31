"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import { ArrowLeft, ArrowRight, ShieldCheck, ShoppingCart, Leaf, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface StickyFooterProps {
  nextLabel: string;
  nextHref?: string;
  onNext?: () => void;
  backLabel?: string;
  backHref?: string;
  disabledNext?: boolean;
  isProcessing?: boolean;
}

export function StickyFooter({ 
  nextLabel, 
  nextHref, 
  onNext,
  backLabel = "Cart",
  backHref = "/",
  disabledNext = false,
  isProcessing = false
}: StickyFooterProps) {
  const router = useRouter();
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const couponDiscount = useCheckoutStore((state) => state.couponDiscount);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
  const grandTotal = subtotal - couponDiscount;

  const handleNext = () => {
    if (onNext) onNext();
    else if (nextHref) router.push(nextHref);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-3 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 md:px-8 md:pb-8 md:pt-8 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="relative glass rounded-2xl md:rounded-[2.5rem] p-3 md:p-6 shadow-premium border-white/40 border-2 overflow-hidden group">
          
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500/10 rounded-full blur-[60px] group-hover:bg-brand-500/20 transition-all duration-700" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-3 md:gap-12">
            
            <div className="flex items-center justify-between md:justify-start gap-4 md:gap-10 w-full md:w-auto">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                   <Lock className="w-2.5 h-2.5" />
                   Secure
                </span>
                <div className="flex items-baseline gap-1.5">
                   <h2 className="text-xl md:text-4xl font-bold text-brand-950 tracking-tighter leading-tight">
                     ₹{grandTotal.toLocaleString("en-IN")}
                   </h2>
                   {couponDiscount > 0 && (
                      <span className="text-[9px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg border border-emerald-100 leading-none">
                         -₹{couponDiscount}
                      </span>
                   )}
                </div>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-brand-50 rounded-xl border border-brand-100/50 shrink-0">
                 <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <Leaf className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                 </div>
                 <div className="flex flex-col leading-tight">
                    <span className="text-[9px] font-bold text-brand-900 uppercase tracking-widest">Eco-Saved</span>
                    <span className="text-[10px] font-bold text-slate-500 hidden xs:block">Sustainable Choice</span>
                 </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {backHref && (
                <Link 
                  href={backHref}
                  className="flex-1 md:flex-none px-4 py-3 md:py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl md:rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-soft group/back"
                >
                  <ArrowLeft className="w-4 h-4 group-hover/back:-translate-x-1 transition-transform" />
                  <span className="text-sm">{backLabel}</span>
                </Link>
              )}
              
              <button
                onClick={handleNext}
                disabled={disabledNext || isProcessing}
                className="flex-[2] md:flex-none relative px-6 md:px-12 py-3 md:py-5 bg-brand-900 hover:bg-black text-white font-bold rounded-xl md:rounded-[1.5rem] transition-all active:scale-95 shadow-xl shadow-brand-100/40 disabled:shadow-none overflow-hidden group/next"
              >
                 <div className="absolute inset-0 bg-brand-700 translate-y-full group-hover/next:translate-y-0 transition-transform duration-500 ease-out" />
                 <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                    <span className="text-[13px] md:text-base tracking-wide">
                       {isProcessing ? "Security..." : nextLabel}
                    </span>
                    {!isProcessing && <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/next:translate-x-1.5 transition-transform" />}
                 </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
