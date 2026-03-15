"use client";

import { OrderSummary } from "@/components/OrderSummary";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Banknote, Shield } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OrderSummarySkeleton, Skeleton } from "./Skeleton";

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:px-4">
        <div className="lg:col-span-8 space-y-10">
          <div className="glass rounded-[2rem] shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-200/50 rounded-lg animate-pulse-slow" />
              <div className="h-7 w-32 bg-slate-200/50 rounded animate-pulse-slow" />
            </div>
            <Skeleton className="h-28 w-full rounded-2xl" />
          </div>
          <div className="glass rounded-[2rem] shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-slate-200/50 rounded-lg animate-pulse-slow" />
              <div className="h-7 w-48 bg-slate-200/50 rounded animate-pulse-slow" />
            </div>
            <div className="space-y-4">
               <Skeleton className="h-20 w-full rounded-2xl" />
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
    }, 1500);
  };

  const paymentMethods = [
    { id: "upi", name: "UPI (Google Pay, PhonePe, etc.)", icon: Smartphone, description: "Pay directly from your bank account" },
    { id: "card", name: "Credit / Debit / ATM Card", icon: CreditCard, description: "All major cards supported" },
    { id: "cod", name: "Cash on Delivery", icon: Banknote, description: "Pay when you receive the order" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:px-4 animate-fade-in ">
      <div className="lg:col-span-8 space-y-10">
        
        <section className="glass rounded-[2rem] shadow-sm p-6 md:p-10 transition-all hover:shadow-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200/50">
            <div className="p-2 bg-brand-100/50 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-brand-600" />
            </div>
            <h2 className="text-2xl tracking-tight text-slate-900 font-bold">
              Shipping To
            </h2>
          </div>
          <div className="bg-slate-50/50 p-6 rounded-2xl border-2 border-slate-100">
            <p className="font-bold text-slate-800 text-lg tracking-tight mb-2">{shippingAddress.fullName}</p>
            <div className="text-slate-500 space-y-1.5 font-medium leading-relaxed">
              <p>{shippingAddress.email} • {shippingAddress.phoneNumber}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.pinCode}</p>
            </div>
          </div>
        </section>

        <section className="glass rounded-[2rem] shadow-sm p-6 md:p-10 transition-all hover:shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200/50">
            <div className="p-2 bg-slate-100 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-slate-700" />
            </div>
            <h2 className="text-2xl tracking-tight font-bold text-slate-900">
              Payment Method
            </h2>
          </div>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div 
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`group p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  selectedMethod === method.id 
                    ? "border-brand-500 bg-brand-50/50 shadow-md ring-4 ring-brand-50/50 transform scale-[1.02]" 
                    : "border-slate-200/60 hover:border-brand-300 bg-white/60 hover:bg-white/90 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${selectedMethod === method.id ? 'bg-white shadow-sm' : 'bg-slate-100 group-hover:bg-brand-50'}`}>
                    <method.icon className={`w-6 h-6 transition-colors ${selectedMethod === method.id ? "text-brand-600" : "text-slate-500 group-hover:text-brand-500"}`} />
                  </div>
                  <div>
                    <p className={`font-bold text-lg tracking-tight transition-colors ${selectedMethod === method.id ? "text-brand-900" : "text-slate-800"}`}>
                      {method.name}
                    </p>
                    <p className="text-sm text-slate-500 font-medium">{method.description}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === method.id ? "border-brand-600 shadow-sm shadow-brand-200" : "border-slate-300 group-hover:border-brand-400"
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-3 h-3 rounded-full bg-brand-600 animate-in zoom-in duration-200"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <div className="lg:col-span-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <OrderSummary 
          buttonLabel={isProcessing ? "Processing..." : (selectedMethod === 'cod' ? "Confirm Order" : "Pay Securely")} 
          onAction={handlePayment}
          isActionDisabled={isProcessing}
        />
      </div>
    </div>
  );
}
