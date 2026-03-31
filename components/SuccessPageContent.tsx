"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import { CheckCircle2, ShoppingBag, ArrowRight, Sparkles, Truck, ShieldCheck, Heart, MapPin, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function SuccessPageContent() {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const lastOrder = useCheckoutStore((state) => state.lastOrder);
  const hasHydrated = useCheckoutStore((state) => state.hasHydrated);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (hasHydrated && !lastOrder) {
       router.push("/");
    }
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, [lastOrder, hasHydrated, router]);

  if (!hasHydrated || !lastOrder) return null;

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-12 md:py-20 px-4">
      {showConfetti && <Confetti width={width} height={height} opacity={0.6} colors={['#10b981', '#059669', '#34d399', '#f0fdf4']} />}
      
      <div className="max-w-4xl w-full space-y-8 md:space-y-12 animate-fade-in">
        
        <div className="text-center space-y-4 md:space-y-6 animate-fade-in-up">
          <div className="relative inline-block">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-100">
              <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-emerald-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-brand-500" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-7xl font-bold text-brand-950 tracking-tighter">
              Order Confirmed!
            </h1>
            <p className="text-sm md:text-xl text-slate-500 font-medium tracking-tight">
              Thank you for choosing a more sustainable future.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
             <div className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-widest shadow-lg">
               ID: #ECO-{Math.random().toString(36).substr(2, 9).toUpperCase()}
             </div>
             <div className="flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-xs md:text-sm font-bold border border-brand-100">
               <ShieldCheck className="w-4 h-4" />
               Verified
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          <div className="bento-card animate-fade-in-up border-brand-100 shadow-premium" style={{ animationDelay: '0.1s' }}>
             <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                <div className="flex items-center justify-between border-b border-brand-50 pb-4">
                   <h3 className="text-xl font-bold text-brand-950 tracking-tight">Order Contents</h3>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{lastOrder.cartItems.length} Items</span>
                </div>
                
                <div className="max-h-[200px] overflow-y-auto pr-2 space-y-4 hide-scrollbar">
                  {lastOrder.cartItems.map((item) => (
                    <div key={item.product_id} className="flex gap-4 group">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-50 rounded-xl relative overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm md:text-base font-bold text-brand-950 truncate tracking-tight">{item.product_name}</p>
                        <p className="text-xs font-semibold text-slate-400 mt-0.5">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-brand-900 text-sm md:text-base">₹{(item.product_price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-brand-100 space-y-3">
                   <div className="flex justify-between text-sm font-semibold text-slate-500">
                     <span>Subtotal</span>
                     <span className="text-brand-950">₹{lastOrder.subtotal.toLocaleString("en-IN")}</span>
                   </div>
                   <div className="flex justify-between text-sm font-semibold text-emerald-600">
                     <span>Shipping</span>
                     <span className="uppercase tracking-widest font-bold">Free Delivery</span>
                   </div>
                   <div className="flex justify-between pt-3 border-t-2 border-brand-900">
                     <span className="text-base font-bold text-brand-950">Grand Total</span>
                     <span className="text-2xl font-bold text-brand-900 tracking-tighter">₹{lastOrder.grandTotal.toLocaleString("en-IN")}</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             
             <div className="bento-card bg-brand-900 border-none shadow-premium flex-1">
                <div className="p-6 md:p-8 flex flex-col">
                   <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-brand-600" />
                      <p className="text-[10px] md:text-xs font-bold text-brand-600 uppercase tracking-widest">Delivering To</p>
                   </div>
                   <div className="space-y-4">
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white">{lastOrder.shippingAddress.fullName}</h4>
                        <p className="text-sm md:text-base font-semibold text-brand-500 mt-1">
                          {lastOrder.shippingAddress.city}, {lastOrder.shippingAddress.state} {lastOrder.shippingAddress.pinCode}
                        </p>
                      </div>
                      <div className="flex items-center gap-2.5 p-2.5 bg-white/5 rounded-xl border border-white/10 w-fit backdrop-blur-md">
                        <Truck className="w-4 h-4 text-brand-300" />
                        <span className="text-xs font-bold tracking-wide">Ships in 2-3 Business Days</span>
                      </div>

                      {/* Tracker */}
                      <div className="pt-8 mt-6 border-t border-white/5 space-y-4">
                         <div className="flex gap-2">
                           {[
                             { label: 'Placed', active: true },
                             { label: 'Shipping', active: false },
                             { label: 'Arriving', active: false }
                           ].map((step, idx) => (
                             <div key={idx} className="flex-1 space-y-3">
                               <div className={cn(
                                 "h-1 md:h-1.5 rounded-full transition-all duration-1000",
                                 step.active ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]" : "bg-white/10"
                               )} />
                               <div className="flex flex-col">
                                 <span className={cn(
                                   "text-[9px] md:text-[12px] font-bold uppercase tracking-widest",
                                   step.active ? "text-emerald-400" : "text-brand-500"
                                 )}>
                                   {step.label}
                                 </span>
                                 {step.active && (
                                   <span className="text-[8px] md:text-[14px] font-semibold text-emerald-500/60 mt-0.5 animate-pulse">Confirmed</span>
                                 )}
                               </div>
                             </div>
                           ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bento-card shadow-soft p-6 md:p-8 bg-white border-brand-50/50">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-50 rounded-xl shadow-sm flex items-center justify-center">
                         <Heart className="w-5 h-5 text-brand-600" />
                      </div>
                      <p className="text-sm md:text-base font-bold text-brand-950 tracking-tight">Support our mission?</p>
                   </div>
                   <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
                     Your order helps us plant 5 new trees in local eco-zones. Check your email for more details!
                   </p>
                </div>
             </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
           <Link 
             href="/" 
             className="w-full md:w-auto px-10 py-5 bg-brand-900 hover:bg-black text-white rounded-full font-bold transition-all shadow-xl shadow-brand-100 active:scale-95 flex items-center justify-center gap-3 group"
           >
             Continue Sustainable Journey
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
           </Link>
           <button className="w-full md:w-auto px-10 py-5 bg-white border border-brand-100 hover:bg-brand-50 text-brand-900 rounded-full font-bold transition-all active:scale-95 flex items-center justify-center gap-3">
             <ShoppingBag className="w-5 h-5" />
             Download Eco-Invoice
           </button>
        </div>
      </div>
    </div>
  );
}
