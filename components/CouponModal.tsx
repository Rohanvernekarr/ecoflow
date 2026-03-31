"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import { X, Ticket, Sparkles, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const COUPONS = [
  { code: "SHIPFREE2025", desc: "Free delivery for digital orders", discount: 50 },
  { code: "ECOYAAN20", desc: "20% Sustainable rebate", discount: 100 },
];

export function CouponModal({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const { applyCoupon, appliedCoupon } = useCheckoutStore();

  const handleApply = (couponCode: string, discount: number) => {
    applyCoupon(couponCode, discount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="bento-card w-full max-w-md relative z-10 animate-scale-in shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center shadow-sm">
                <Ticket className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Apply promo</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-all active:scale-90 group"
            >
              <X className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
            </button>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            <div className="flex gap-3">
              <div className="relative flex-1 group">
                <input 
                  value={code} 
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Enter code" 
                  className="w-full px-5 py-3.5 md:py-4 bg-slate-50 border border-slate-300 rounded-2xl outline-none transition-all font-bold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 placeholder:text-slate-300 text-sm tracking-wide"
                />
              </div>
              <button 
                onClick={() => handleApply(code, 20)} 
                disabled={!code}
                className="px-6 bg-slate-800 cursor-pointer hover:bg-black text-white font-bold rounded-2xl transition-all active:scale-95 text-xs md:text-sm"
              >
                Apply
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                 <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                 <p className="text-[10px] md:text-xs font-bold text-slate-600">Verified offers</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {COUPONS.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleApply(c.code, c.discount)}
                    className={cn(
                        "group/coupon flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300",
                        appliedCoupon === c.code 
                            ? "bg-brand-50 border-brand-500 shadow-lg shadow-brand-100/50" 
                            : "bg-white border-slate-50 hover:border-brand-200 hover:bg-brand-50/10"
                    )}
                  >
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                            appliedCoupon === c.code ? "bg-brand-600 text-white" : "bg-slate-50 text-slate-400 group-hover/coupon:bg-brand-100 group-hover/coupon:text-brand-600"
                        )}>
                            <Ticket className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className={cn(
                                "font-bold text-sm mb-0.5",
                                appliedCoupon === c.code ? "text-brand-700" : "text-slate-800"
                            )}>
                                {c.code}
                            </p>
                            <p className="text-[10px] md:text-xs font-semibold text-slate-500">{c.desc}</p>
                        </div>
                    </div>

                    <div className={cn(
                        "w-6 h-6 rounded-full flex items-center cursor-pointer justify-center transition-all",
                        appliedCoupon === c.code ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 group-hover/coupon:bg-brand-200"
                    )}>
                         {appliedCoupon === c.code ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-center text-[10px] font-semibold text-slate-500">
            Terms and conditions apply
          </p>
        </div>
      </div>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
