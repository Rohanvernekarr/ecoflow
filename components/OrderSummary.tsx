"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import { Ticket, X, ShieldCheck, Plus, ShoppingCart, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { CouponModal } from "./CouponModal";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  buttonLabel?: string;
  onAction?: () => void;
  isActionDisabled?: boolean;
}

export function OrderSummary({
  buttonLabel,
  onAction,
  isActionDisabled = false,
}: OrderSummaryProps) {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const pathname = usePathname();
  const isCheckoutPage = pathname === "/checkout" || pathname === "/payment";
  
  const getSubtotal = useCheckoutStore((state) => state.getSubtotal);
  const getGrandTotal = useCheckoutStore((state) => state.getGrandTotal);
  const shippingFee = useCheckoutStore((state) => state.shippingFee);
  const discountApplied = useCheckoutStore((state) => state.discountApplied);
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon);
  const couponDiscount = useCheckoutStore((state) => state.couponDiscount);
  const removeCoupon = useCheckoutStore((state) => state.removeCoupon);

  const cartItems = useCheckoutStore((state) => state.cartItems);
  const subtotal = getSubtotal();
  const grandTotal = getGrandTotal();

  return (
    <>
      <div className="bento-card group/summary md:sticky md:top-28 overflow-visible">
        <div className="p-4 md:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
               <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 text-white rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover/summary:scale-110 transition-transform duration-500">
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
               </div>
               <h2 className="text-[26px] md:text-xl font-bold text-slate-900 tracking-tight">Order summary</h2>
            </div>
          </div>
          
          <div className="mb-4 md:mb-6 space-y-3 md:space-y-4 max-h-[180px] md:max-h-[240px] overflow-y-auto pr-2 hide-scrollbar">
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] md:text-[14px] font-bold text-slate-900 truncate tracking-tight">{item.product_name}</p>
                  <p className="text-[12px] md:text-[13px] font-semibold text-slate-500 mt-0.5 md:mt-1">Qty: {item.quantity}</p>
                </div>
                <span className="shrink-0 font-bold text-slate-900 text-[18px] md:text-sm tracking-tighter">
                  ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 md:space-y-4 border-t border-slate-100 pt-4 md:pt-6 mb-4 md:mb-6">
            {/* Promo Section */}
            {isCheckoutPage && (
              <div className="mb-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 md:p-3 bg-brand-50 border border-brand-100 rounded-xl md:rounded-2xl animate-scale-in">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-brand-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                        <Ticket className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                      </div>
                      <div>
                        <span className="block text-[8px] md:text-[9px] text-brand-700/60 font-bold">Applied</span>
                        <span className="font-bold text-brand-700 text-[10px] md:text-xs">{appliedCoupon}</span>
                      </div>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all active:scale-90"
                    >
                      <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowCouponModal(true)}
                    className="w-full group/promo flex items-center justify-between p-2 md:p-3 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl hover:bg-white hover:border-brand-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-white border border-slate-200 rounded-lg md:rounded-xl flex items-center justify-center group-hover/promo:bg-brand-50 group-hover/promo:border-brand-100 transition-colors">
                        <Ticket className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 group-hover/promo:text-brand-600" />
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 group-hover/promo:text-brand-600 transition-colors">Apply promo</span>
                    </div>
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center shadow-sm group-hover/promo:bg-brand-500 transition-colors">
                        <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 text-slate-400 group-hover/promo:text-white" />
                    </div>
                  </button>
                )}
              </div>
            )}

            <div className="flex justify-between items-center text-[15px] md:text-[14px] font-semibold text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            
            <div className="flex justify-between items-center text-[15px] md:text-[14px] font-semibold text-slate-400">
              <span>Delivery</span>
              <span className={cn(shippingFee === 0 ? "text-brand-600" : "text-slate-900")}>
                {shippingFee === 0 ? "Complimentary" : `₹${shippingFee}`}
              </span>
            </div>

            {discountApplied > 0 && (
              <div className="flex justify-between items-center text-[9px] md:text-[11px] font-bold text-brand-600 bg-brand-50/50 p-2 md:p-2.5 rounded-lg md:rounded-xl border border-brand-100/30">
                <span className="flex items-center gap-1.5 md:gap-2">
                    <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    Savings
                </span>
                <span>-₹{discountApplied.toLocaleString("en-IN")}</span>
              </div>
            )}

            {couponDiscount > 0 && (
              <div className="flex justify-between items-center text-[13px] md:text-[13px] font-bold text-emerald-600 bg-emerald-50/50 p-2 md:p-2.5 rounded-lg md:rounded-xl border border-emerald-100/30">
                <span className="flex items-center gap-1.5 md:gap-2">
                  <Ticket className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  Code applied
                </span>
                <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
              </div>
            )}
          </div>

          <div className="pt-4 md:pt-6 mt-4 md:mt-6 border-t-2 border-slate-900 flex justify-between items-center">
            <div className="space-y-0.5 md:space-y-1">
              <span className="block text-[20px] md:text-[18px] font-bold text-slate-700">Total amount</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 rounded-md">
                 <ShieldCheck className="w-2.5 h-2.5 md:w-3 md:h-3 text-slate-500" />
                 <span className="text-[12px] md:text-[10px] font-bold text-slate-600 whitespace-nowrap">Incl. of all taxes</span>
              </div>
            </div>
            <span className="font-bold text-xl md:text-3xl text-slate-900 tracking-tighter">
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </div>

          {buttonLabel && onAction && (
            <div className="mt-4 md:mt-6">
              <button
                onClick={onAction}
                disabled={isActionDisabled || subtotal === 0}
                className="group relative w-full h-10 md:h-14 bg-slate-900 hover:bg-black disabled:bg-slate-100 text-white font-bold rounded-xl md:rounded-2xl transition-all active:scale-[0.98] text-[9px] md:text-xs overflow-hidden"
              >
                 <div className="absolute inset-0 bg-brand-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                 <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                   {buttonLabel}
                   <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                 </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showCouponModal && (
        <CouponModal onClose={() => setShowCouponModal(false)} />
      )}
    </>
  );
}
