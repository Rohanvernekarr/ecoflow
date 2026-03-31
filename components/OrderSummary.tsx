"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import { ShoppingCart, Ticket, ArrowRight, ShieldCheck, CreditCard, HelpCircle, Leaf, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { CouponModal } from "@/components/CouponModal";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function OrderSummary() {
  const router = useRouter();
  const pathname = usePathname();
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon);
  const couponDiscount = useCheckoutStore((state) => state.couponDiscount);
  const removeCoupon = useCheckoutStore((state) => state.removeCoupon);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
  const shippingFee = 0; 
  const grandTotal = subtotal + shippingFee - couponDiscount;
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const isCheckoutPage = pathname === "/checkout" || pathname === "/payment";

  if (cartItems.length === 0) return null;

  return (
    <div className="bento-card sticky top-28 animate-fade-in-up shadow-premium">
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-6 md:gap-8">
          
          <div className="flex items-center justify-between group/summary">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-brand-800 text-white rounded-xl flex items-center justify-center shadow-lg group-hover/summary:rotate-12 transition-transform duration-500">
                  <ShoppingCart className="w-5 h-5" />
               </div>
               <h2 className="text-xl font-bold text-brand-950 tracking-tight">Order Summary</h2>
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-5">
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex justify-between items-start gap-4 group/item">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] md:text-sm font-bold text-slate-800 truncate tracking-tight group-hover/item:text-brand-700 transition-colors">{item.product_name}</p>
                  <p className="text-[11px] md:text-xs font-semibold text-slate-400 mt-1">Qty: {item.quantity}</p>
                </div>
                <span className="shrink-0 font-bold text-slate-900 text-sm md:text-base tracking-tighter">
                  ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-brand-50 pt-6 mb-4">
            {isCheckoutPage && (
              <div className="mb-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100 group transition-all animate-scale-in">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
                        <Ticket className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active Coupon</p>
                        <p className="text-sm font-bold text-emerald-800">{appliedCoupon}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <button 
                        onClick={() => setIsCouponModalOpen(true)}
                        className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 transition-colors uppercase tracking-widest px-2 py-1 hover:bg-emerald-100 rounded-lg"
                      >
                        Change
                      </button>
                      <button 
                        onClick={() => removeCoupon()}
                        className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest px-2 py-1 hover:bg-red-50 rounded-lg flex items-center gap-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsCouponModalOpen(true)}
                    className="w-full p-4 border-2 border-dashed border-brand-200 rounded-2xl flex items-center justify-between hover:border-brand-500 hover:bg-brand-50 transition-all transition-duration-500 group"
                  >
                    <div className="flex items-center gap-3">
                      <Ticket className="w-5 h-5 text-brand-400 group-hover:text-brand-600 group-hover:rotate-12 transition-all" />
                      <span className="text-sm font-bold text-brand-700">Apply promo code</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                  </button>
                )}
              </div>
            )}

            <div className="flex justify-between items-center text-[13px] md:text-sm font-semibold text-slate-500">
              <span>Subtotal</span>
              <span className="text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            
            <div className="flex justify-between items-center text-[13px] md:text-sm font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                Delivery 
                <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
              </span>
              <span className={cn(shippingFee === 0 ? "text-emerald-600" : "text-brand-950")}>
                {shippingFee === 0 ? "Free Shipping" : `₹${shippingFee}`}
              </span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex justify-between items-center text-sm font-bold text-emerald-600 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/30">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Code Discount
                </span>
                <span>- ₹{couponDiscount.toLocaleString("en-IN")}</span>
              </div>
            )}
          </div>

          <div className="pt-6 mt-4 border-t-2 border-brand-900 flex justify-between items-center">
            <div className="space-y-1">
              <span className="block text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Amount</span>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-50 rounded-lg">
                 <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                 <span className="text-[10px] md:text-[11px] font-bold text-brand-700 whitespace-nowrap">Secure Payment</span>
              </div>
            </div>
            <div className="text-right">
                <span className="block text-[10px] font-bold text-slate-400 mb-0.5">Incl. of all taxes</span>
                <span className="font-bold text-2xl md:text-4xl text-brand-950 tracking-tighter">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-slate-300">
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                Carbon Neutral Delivery
             </div>
          </div>
        </div>
      </div>

      {isCouponModalOpen && (
        <CouponModal onClose={() => setIsCouponModalOpen(false)} />
      )}
    </div>
  );
}
