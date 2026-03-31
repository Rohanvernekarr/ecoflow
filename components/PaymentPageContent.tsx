"use client";

import { OrderSummary } from "@/components/OrderSummary";
import { StickyFooter } from "@/components/StickyFooter";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, CreditCard, Smartphone, Banknote, Shield, Check, MapPin, Lock, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
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
    { id: "cod", name: "Cash on Delivery", icon: Banknote, description: "Pay when you receive" },
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:px-4 pb-44 animate-fade-in">
        <div className="lg:col-span-8 flex flex-col gap-8 md:gap-12">
          
          <section className="px-4 sm:px-0">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-100 pb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-brand-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] animate-fade-in">
                     Step 02 of 02
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-brand-950 tracking-tight flex items-center gap-4">
                    Complete Order
                  </h1>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] md:text-xs font-bold text-emerald-700 uppercase tracking-widest leading-none">Security Guaranteed</span>
                </div>
             </div>
          </section>

          <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-6 md:mb-8 px-4 sm:px-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Review Destination</h2>
              </div>
              <div className="px-3 py-1 bg-white border border-brand-100 rounded-full shadow-sm">
                <span className="text-[10px] md:text-xs font-bold text-slate-500 leading-none">Identity verified</span>
              </div>
            </div>

            <div className="bento-card bg-brand-900 text-white relative overflow-hidden group border-none">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-emerald-500/30 transition-colors duration-700" />
               <div className="p-5 md:p-7 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1">
                        <p className="text-[9px] md:text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1 md:mb-2 text-emerald-600">Shipping Destination</p>
                        <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1 text-white">{shippingAddress.fullName}</h3>
                        <p className="text-xs md:text-sm font-semibold text-brand-600 leading-relaxed tracking-wide">
                            {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.pinCode}
                        </p>
                    </div>
                    <div className="flex flex-col justify-end md:items-end">
                        <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/10 w-fit backdrop-blur-md">
                            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                                <Smartphone className="w-3.5 h-3.5 text-brand-600" />
                            </div>
                            <span className="text-xs md:text-sm font-bold tracking-wide text-brand-600">{shippingAddress.phoneNumber}</span>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
          </section>

          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-6 md:mb-8 px-4 sm:px-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center shadow-sm">
                  <CreditCard className="w-5 h-5 text-slate-500" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Payment Method</h2>
              </div>
            </div>
            
            <div className="flex flex-col md:grid md:grid-cols-3 gap-2.5 md:gap-3 px-4 sm:px-0">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "group p-2.5 md:p-3.5 bento-card cursor-pointer transition-all duration-500 flex flex-row md:flex-col gap-3 md:gap-4 items-center md:items-start",
                    selectedMethod === method.id 
                      ? "border-brand-500 bg-brand-50/20 ring-4 ring-brand-500/10 shadow-premium scale-[0.98]" 
                      : "hover:border-brand-200"
                  )}
                >
                  <div className="flex justify-between items-start md:w-full shrink-0">
                    <div className={cn(
                        "w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center transition-all",
                        selectedMethod === method.id ? "bg-brand-600 text-white shadow-lg" : "bg-brand-50/50 text-brand-300"
                      )}>
                      <method.icon className="w-4 h-4 md:w-4.5 md:h-4.5" />
                    </div>
                    <div className={cn(
                        "w-5 h-5 rounded-full border-2 transition-all items-center justify-center hidden md:flex",
                        selectedMethod === method.id ? "border-brand-500 bg-brand-500" : "border-slate-200"
                      )}>
                        {selectedMethod === method.id && <Check className="w-3 h-3 text-white stroke-[4]" />}
                    </div>
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <p className="font-bold text-brand-950 tracking-tight text-[13px] md:text-sm">
                      {method.name}
                    </p>
                    <p className="text-[10px] md:text-[11px] text-slate-400 leading-tight">
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
             <div className="bento-card p-5 md:p-8 bg-brand-50/30 flex flex-row items-center gap-4 md:gap-7 border-dashed border-brand-200/50 mx-4 sm:mx-0 group hover:bg-brand-50 transition-colors">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center shadow-soft text-brand-600 group-hover:rotate-12 transition-transform duration-500">
                   <Shield className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="flex-1 text-left">
                   <h4 className="text-sm md:text-base font-bold text-brand-950 tracking-tight">SSL Security Guaranteed</h4>
                   <p className="text-[11px] md:text-sm font-semibold text-slate-400 mt-1">
                     Your payment data is fully encrypted and never stored on our servers.
                   </p>
                </div>
                <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm">
                   <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                   <span className="text-[10px] md:text-xs font-bold text-brand-700 uppercase tracking-widest">Safe Checkout</span>
                </div>
             </div>
          </section>
        </div>

        <div className="lg:col-span-4 animate-fade-in-up relative" style={{ animationDelay: '0.4s' }}>
          <div className="md:sticky md:top-28">
            <OrderSummary />
          </div>
        </div>
      </div>

      <StickyFooter 
        backLabel="Address"
        backHref="/checkout"
        nextLabel={isProcessing ? "Finalizing Payment..." : (selectedMethod === 'cod' ? "Place Secure Order" : "Complete Secure Payment")}
        onNext={handlePayment}
        isProcessing={isProcessing}
      />
    </div>
  );
}
