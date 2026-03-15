import { useCheckoutStore } from "@/store/useCheckoutStore";
import { Ticket, X, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { CouponModal } from "./CouponModal";
import { usePathname } from "next/navigation";

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
  const isCheckoutPage = pathname === "/checkout";
  
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
      <div className=" shadow-sm rounded-3xl md:rounded-[2rem] p-5 md:p-6 lg:p-8 sticky top-24 z-100 text-slate-800 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2">
          Order Summary
        </h2>
        
        <div className="mb-4 md:mb-6 space-y-2 md:space-y-3">
          {cartItems.map((item) => (
            <div key={item.product_id} className="flex justify-between text-xs md:text-sm text-slate-500 font-medium">
              <span className="truncate pr-4 text-slate-600">{item.product_name}</span>
              <span className="shrink-0 font-bold text-slate-700">× {item.quantity}</span>
            </div>
          ))}
        </div>

        {isCheckoutPage && (
          <div className="mb-8 p-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-200 to-brand-100 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity blur-sm" />
            <div className="relative p-4 bg-white/80 backdrop-blur-md rounded-xl border border-white">
              {appliedCoupon ? (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="bg-brand-100 p-1.5 rounded-md">
                      <Ticket className="w-4 h-4 text-brand-600" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Applied Coupon</span>
                      <span className="font-bold text-brand-600 uppercase">{appliedCoupon}</span>
                    </div>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors flex items-center justify-center"
                    aria-label="Remove coupon"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowCouponModal(true)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-1.5 rounded-md group-hover:bg-brand-50 transition-colors">
                      <Ticket className="w-4 h-4 text-slate-500 group-hover:text-brand-500 transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 group-hover:text-brand-600 transition-colors">Apply Promo Code</span>
                  </div>
                  <span className="text-xs font-bold text-brand-600 py-1 px-3 rounded-full bg-brand-50 group-hover:bg-brand-100 transition-colors">Add</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3 md:space-y-4 text-slate-600 mb-6 md:mb-8 text-sm md:text-base">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-800">₹{subtotal}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-slate-800">{shippingFee === 0 ? <span className="text-brand-600 uppercase text-[10px] md:text-xs tracking-wider">Free</span> : `₹${shippingFee}`}</span>
          </div>

          {discountApplied > 0 && (
            <div className="flex justify-between text-sm text-brand-600 bg-brand-50/50 p-2 -mx-2 rounded-lg">
              <span>Savings</span>
              <span className="font-semibold">-₹{discountApplied}</span>
            </div>
          )}

          {couponDiscount > 0 && (
            <div className="flex justify-between text-sm text-emerald-600 bg-emerald-50/50 p-2 -mx-2 rounded-lg">
              <span className="font-bold flex items-center gap-1.5"><Ticket className="w-3.5 h-3.5" /> Coupon Discount</span>
              <span className="font-bold">-₹{couponDiscount}</span>
            </div>
          )}

          <div className="border-t border-slate-200/60 pt-4 md:pt-6 mt-4 md:mt-6 flex justify-between items-end">
            <div>
              <span className="block text-xs md:text-sm font-medium text-slate-500 mb-0.5 md:mb-1">Total Amount</span>
              <p className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest font-bold">Incl. of all taxes</p>
            </div>
            <span className="font-black text-2xl md:text-3xl text-slate-900 tracking-tight">₹{grandTotal}</span>
          </div>
        </div>

        {buttonLabel && onAction && (
          <div className="space-y-3 md:space-y-4">
            <button
              onClick={onAction}
              disabled={isActionDisabled || subtotal === 0}
              className="w-full relative group overflow-hidden bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] focus:ring-4 focus:ring-slate-900/20"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 w-full h-full from-white/20 to-transparent bg-gradient-to-b opacity-0 group-hover:opacity-100" />
              <span className="relative flex items-center justify-center gap-2 uppercase tracking-widest text-xs md:text-sm">
                {buttonLabel}
              </span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-brand-500" />
              Secure encrypted checkout
            </div>
          </div>
        )}
      </div>

      {showCouponModal && (
        <CouponModal onClose={() => setShowCouponModal(false)} />
      )}
    </>
  );
}
