"use client";

import { ChevronLeft, ArrowRight, Check } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface StickyFooterProps {
  backLabel?: string;
  backHref?: string;
  onBack?: () => void;
  nextLabel: string;
  onNext: () => void;
  isNextDisabled?: boolean;
  showSummary?: boolean;
  isProcessing?: boolean;
}

export function StickyFooter({
  backLabel = "Return",
  backHref,
  onBack,
  nextLabel,
  onNext,
  isNextDisabled = false,
  showSummary = true,
  isProcessing = false,
}: StickyFooterProps) {
  const router = useRouter();
  const getGrandTotal = useCheckoutStore((state) => state.getGrandTotal);
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const hasHydrated = useCheckoutStore((state) => state.hasHydrated);

  if (!hasHydrated) return null;

  const total = getGrandTotal();
  const itemCount = cartItems.length;

  const handleBack = () => {
    if (onBack) onBack();
    else if (backHref) router.push(backHref);
    else router.back();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up px-2 pb-2 md:px-4 md:pb-8 pointer-events-none">
      <div className="max-w-5xl mx-auto w-full pointer-events-auto">
        <div className="relative group/footer">
          <div className="absolute inset-0 bg-brand-500/10 blur-3xl rounded-full opacity-0 group-hover/footer:opacity-100 transition-opacity duration-700" />
          
          <div className="relative bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-2 md:p-4 flex flex-row items-center justify-between gap-2 md:gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            
            {showSummary && (
              <div className="flex items-center gap-3 md:gap-6 px-2 md:px-4 py-1 md:py-0">
                <div className="flex flex-col">
                  <span className="text-[8px] md:text-[10px] font-semibold text-slate-400 mb-0.5 md:mb-1">
                    Value
                  </span>
                  <span className="text-sm md:text-2xl font-bold text-white tracking-tighter tabular-nums">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="h-6 md:h-10 w-px bg-white/10" />
                <div className="hidden sm:flex flex-col">
                  <span className="text-[10px] font-semibold text-slate-400 mb-1">
                    Holdings
                  </span>
                  <span className="text-xs font-bold text-brand-400">
                    {itemCount} {itemCount === 1 ? "unit" : "units"}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <button
                onClick={handleBack}
                className="group/back flex items-center justify-center gap-1.5 px-3 md:px-6 h-10 md:h-14 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] md:text-xs transition-all active:scale-95 border border-white/5"
              >
                <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 group-hover/back:-translate-x-1 transition-transform" />
                <span className="hidden xs:inline">{backLabel}</span>
              </button>

              <button
                onClick={onNext}
                disabled={isNextDisabled || isProcessing}
                className="group/next relative h-10 md:h-14 px-4 md:px-12 rounded-xl md:rounded-2xl bg-white text-black font-bold text-[16px] md:text-[18px] shadow-xl transition-all active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-500 translate-y-full group-hover/next:translate-y-0 transition-transform duration-500 ease-out" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 group-hover:text-white transition-colors duration-500">
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-black/10 border-t-black group-hover:border-white/30 group-hover:border-t-white rounded-full animate-spin" />
                      <span className="hidden xs:inline">Syncing...</span>
                    </div>
                  ) : (
                    <>
                      <span>{nextLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/next:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
