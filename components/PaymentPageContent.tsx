"use client";

import { OrderSummary } from "@/components/OrderSummary";
import { StickyFooter } from "@/components/StickyFooter";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, CreditCard, Smartphone, Banknote, Shield, Check, MapPin, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderSummarySkeleton, Skeleton } from "./Skeleton";
import { cn } from "@/lib/utils";

export function PaymentPageContent() {
  const router = useRouter();
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const shippingAddress = useCheckoutStore((state) => state.shippingAddress);
  const placeOrder = useCheckoutStore((state) => state.placeOrder);
  const selectedMethod = useCheckoutStore((state) => state.selectedPaymentMethod);
  const setSelectedMethod = useCheckoutStore((state) => state.setSelectedPaymentMethod);
  const hasHydrated = useCheckoutStore((state) => state.hasHydrated);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!hasHydrated || isProcessing) return;

    if (cartItems.length === 0) {
      router.push("/");
    } else if (!shippingAddress) {
      router.push("/checkout");
    }
  }, [hasHydrated, cartItems.length, shippingAddress, router, isProcessing]);

  if (!hasHydrated || !shippingAddress || cartItems.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:px-4">
        <div className="lg:col-span-8 space-y-8">
          <div className="bento-card p-8">
            <div className="h-8 w-40 bg-slate-100 rounded-xl mb-6 animate-pulse" />
            <Skeleton className="h-28 w-full rounded-3xl" />
          </div>
          <div className="bento-card p-8">
            <div className="space-y-4">
               <Skeleton className="h-20 w-full rounded-2xl" />
               <Skeleton className="h-20 w-full rounded-2xl" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <OrderSummarySkeleton />
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      placeOrder();
      router.push("/success");
    }, 2500); 
  };

  const paymentMethods = [
    { id: "upi", name: "Digital UPI", icon: Smartphone, description: "GPay, PhonePe, Paytm" },
    { id: "card", name: "Card Payment", icon: CreditCard, description: "Visa, Mastercard, Amex" },
    { id: "cod", name: "Cash on delivery", icon: Banknote, description: "Pay when you receive" },
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 md:px-4 pb-44 animate-fade-in">
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
          
          <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4 md:mb-6 px-4 sm:px-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-50 text-brand-600 rounded-lg md:rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Review & ship</h2>
              </div>
              <div className="px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                <span className="text-[12px] md:text-xs font-bold text-slate-500 leading-none">Identity verified</span>
              </div>
            </div>

            <div className="bento-card bg-slate-900 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-brand-500/20 transition-colors duration-700" />
               <div className="p-4 md:p-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div>
                        <p className="text-[14px] md:text-xs font-bold text-brand-600 mb-1.5 md:mb-3">Destination</p>
                        <h3 className="text-lg md:text-xl tracking-tight mb-1 text-black">{shippingAddress.fullName}</h3>
                        <p className="text-sm font-semibold text-slate-600 leading-relaxed tracking-wide">
                            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.pinCode}
                        </p>
                    </div>
                    <div className="flex flex-col justify-end md:items-end">
                        <div className="flex items-center gap-2.5 bg-white/5 p-2 rounded-xl border border-white/10 w-fit">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4 text-black" />
                            </div>
                            <span className="text-sm font-bold tracking-wide text-black">{shippingAddress.phoneNumber}</span>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
          </section>

          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4 md:mb-6 px-4 sm:px-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 text-slate-600 rounded-lg md:rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Payment method</h2>
              </div>
            </div>
            
            <div className="flex flex-col md:grid md:grid-cols-3 gap-2.5 md:gap-4 px-4 sm:px-0">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "group p-3 md:p-6 bento-card cursor-pointer transition-all duration-500 flex flex-row md:flex-col gap-4 md:gap-6 items-center md:items-start",
                    selectedMethod === method.id 
                      ? "border-brand-500 bg-brand-50/10 ring-4 ring-brand-500/5 shadow-xl" 
                      : "hover:border-brand-200"
                  )}
                >
                  <div className="flex justify-between items-start md:w-full shrink-0">
                    <div className={cn(
                        "w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all bg-slate-50",
                        selectedMethod === method.id ? "bg-brand-500 text-white" : "text-slate-400"
                      )}>
                      <method.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className={cn(
                        "w-5 h-5 rounded-full border-2 transition-all items-center justify-center hidden md:flex",
                        selectedMethod === method.id ? "border-brand-500 bg-brand-500" : "border-slate-200"
                      )}>
                        {selectedMethod === method.id && <Check className="w-3 h-3 text-white stroke-[4]" />}
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-slate-900 tracking-tight text-base md:text-sm mb-0.5">
                      {method.name}
                    </p>
                    <p className="text-xs md:text-[10px] font-semibold text-slate-400 leading-tight truncate max-w-[180px] md:max-w-none">
                      {method.description}
                    </p>
                  </div>
                  
                  <div className={cn(
                      "w-5 h-5 rounded-full border-2 transition-all flex md:hidden items-center justify-center shrink-0",
                      selectedMethod === method.id ? "border-brand-500 bg-brand-500" : "border-slate-200"
                    )}>
                      {selectedMethod === method.id && <Check className="w-3 h-3 text-white stroke-[4]" />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
             <div className="bento-card p-3 md:p-6 bg-slate-50/50 flex flex-row items-center gap-4 md:gap-6 border-dashed mx-4 sm:mx-0">
                <div className="w-9 h-9 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm text-slate-400 shrink-0">
                   <Lock className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="flex-1 text-left">
                   <h4 className="text-sm md:text-sm font-bold text-slate-900 tracking-tight">Security guaranteed</h4>
                   <p className="text-[12px] md:text-xs font-semibold text-slate-400 mt-0.5">
                     Your payment data is fully encrypted.
                   </p>
                </div>
                <div className="hidden sm:flex items-center gap-2.5 md:gap-3">
                   < Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-600" />
                   <span className="text-[10px] md:text-xs font-bold text-brand-700">Secure checkout</span>
                </div>
             </div>
          </section>
        </div>

        <div className="lg:col-span-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="md:sticky md:top-28">
            <OrderSummary />
          </div>
        </div>
      </div>

      <StickyFooter 
        backLabel="Shipping address"
        backHref="/checkout"
        nextLabel={isProcessing ? "Processing..." : (selectedMethod === 'cod' ? "Place order" : "Pay now")}
        onNext={handlePayment}
        isProcessing={isProcessing}
      />
    </div>
  );
}
