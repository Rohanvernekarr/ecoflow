"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import { CartItem } from "@/components/CartItem";
import { OrderSummary } from "@/components/OrderSummary";
import { StickyFooter } from "@/components/StickyFooter";
import { AddressForm } from "@/components/AddressForm";
import { useRouter } from "next/navigation";
import { MapPin, Plus, Check, ShoppingBag, Truck, ShieldCheck, Smartphone, Trash2, AlertCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function CheckoutPageContent() {
  const router = useRouter();
  const addressSectionRef = useRef<HTMLDivElement>(null);
  const [addressError, setAddressError] = useState(false);
  
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const savedAddresses = useCheckoutStore((state) => state.savedAddresses);
  const shippingAddress = useCheckoutStore((state) => state.shippingAddress);
  const setShippingAddress = useCheckoutStore((state) => state.setShippingAddress);
  const removeSavedAddress = useCheckoutStore((state) => state.removeSavedAddress);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const hasHydrated = useCheckoutStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && cartItems.length === 0) {
      router.push("/");
    }
  }, [hasHydrated, cartItems.length, router]);

  const handleRemoveAddress = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeSavedAddress(id);
    if (shippingAddress?.id === id) {
      // @ts-ignore
      setShippingAddress(null);
    }
  };

  const handleContinue = () => {
    if (!shippingAddress) {
      setAddressError(true);
      addressSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    router.push("/payment");
  };

  if (!hasHydrated || cartItems.length === 0) return null;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:px-4 pb-44 animate-fade-in">
        
        <div className="lg:col-span-8 flex flex-col gap-8 md:gap-12">
          
          {/* Header Section */}
          <section className="px-4 sm:px-0">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-100 pb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-brand-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] animate-fade-in">
                     Step 01 of 02
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-brand-950 tracking-tight flex items-center gap-4">
                    Delivery Details
                  </h1>
                </div>
                <div className="flex items-center gap-6">
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shipping to</span>
                      <span className="text-sm font-bold text-brand-700">INDIA (Premium)</span>
                   </div>
                   <div className="w-10 h-10 rounded-full border-2 border-brand-100 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-brand-600" />
                   </div>
                </div>
             </div>
          </section>

          {/* Delivery Section */}
          <section 
            ref={addressSectionRef}
            className={cn(
              "animate-fade-in-up transition-all duration-500 rounded-3xl",
              addressError && !shippingAddress ? "ring-2 ring-red-500 ring-offset-8 bg-red-50/20" : ""
            )} 
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center justify-between mb-6 md:mb-8 px-4 sm:px-0">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors",
                    addressError && !shippingAddress ? "bg-red-500 text-white" : "bg-brand-50 text-brand-600"
                  )}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Saved Addresses</h2>
                </div>
                {addressError && !shippingAddress && (
                  <div className="flex items-center gap-2 text-red-500 font-bold text-xs mt-2 animate-pulse">
                     <AlertCircle className="w-3.5 h-3.5" />
                     Please select or add a delivery address to continue
                  </div>
                )}
              </div>
              <button 
                onClick={() => { setEditingAddress(null); setShowAddressForm(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-brand-900 hover:bg-black text-white rounded-full text-xs md:text-sm font-bold transition-all shadow-lg active:scale-95 group"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                <span>Add new</span>
              </button>
            </div>

            {showAddressForm ? (
               <AddressForm 
                 onCancel={() => setShowAddressForm(false)} 
                 onSuccess={() => { setShowAddressForm(false); setEditingAddress(null); setAddressError(false); }} 
                 initialData={editingAddress}
               />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 px-4 sm:px-0">
                {savedAddresses.map((address) => (
                  <div 
                    key={address.id}
                    onClick={() => { setShippingAddress(address); setAddressError(false); }}
                    className={cn(
                      "group relative p-5 bento-card cursor-pointer transition-all duration-500 flex flex-col min-h-[160px] border",
                      shippingAddress?.id === address.id 
                        ? "border-brand-500 bg-brand-50/10 ring-4 ring-brand-500/10 shadow-xl" 
                        : "hover:border-brand-200"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors",
                        shippingAddress?.id === address.id ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-brand-100"
                      )}>
                        {address.addressType}
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center",
                        shippingAddress?.id === address.id ? "border-brand-500 bg-brand-500 scale-110" : "border-slate-200"
                      )}>
                        {shippingAddress?.id === address.id && <Check className="w-3 h-3 text-white stroke-[4]" />}
                      </div>
                    </div>

                    <div className="flex-1 space-y-1">
                      <p className="font-bold text-brand-950 text-base md:text-lg leading-tight tracking-tight">{address.fullName}</p>
                      <p className="text-[13px] md:text-sm font-semibold text-slate-500 leading-relaxed max-w-[90%]">
                        {address.city}, {address.state} {address.pinCode}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 border-t border-brand-50/50 pt-3">
                       <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs">
                         <Smartphone className="w-3.5 h-3.5 text-brand-400" />
                         <span>{address.phoneNumber}</span>
                       </div>
                       <div className="flex items-center gap-3">
                         <button 
                          onClick={(e) => { e.stopPropagation(); setEditingAddress(address); setShowAddressForm(true); }}
                          className="text-[11px] font-bold text-brand-600 hover:text-brand-800 transition-colors uppercase tracking-widest"
                         >
                          Edit
                         </button>
                         <button 
                          onClick={(e) => address.id && handleRemoveAddress(e, address.id)}
                          className="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest flex items-center gap-1"
                         >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                         </button>
                       </div>
                    </div>
                  </div>
                ))}
                
                {savedAddresses.length === 0 && !showAddressForm && (
                   <div 
                    onClick={() => setShowAddressForm(true)}
                    className="col-span-full py-12 border-2 border-dashed border-brand-100 rounded-3xl flex flex-col items-center justify-center gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-brand-500 transition-all cursor-pointer bg-white"
                   >
                      <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-400">
                         <MapPin className="w-8 h-8" />
                      </div>
                      <p className="font-bold text-slate-500">No addresses saved yet</p>
                      <button className="text-brand-600 font-bold text-sm underline underline-offset-4">Add your first address</button>
                   </div>
                )}
              </div>
            )}
          </section>

          {/* Cart Section */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-brand-50 pb-4 px-4 sm:px-0">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center shadow-sm">
                   <ShoppingBag className="w-5 h-5 text-slate-500" />
                 </div>
                 <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Order Review</h2>
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-white border border-brand-100 rounded-full shadow-sm">
                  <span className="text-[12px] md:text-sm font-bold text-brand-800">
                    {cartItems.length} {cartItems.length === 1 ? 'Eco-item' : 'Eco-items'}
                  </span>
               </div>
             </div>
             
             <div className="space-y-4 md:space-y-6 px-4 sm:px-0">
               {cartItems.map((item) => (
                 <CartItem key={item.product_id} item={item} />
               ))}
             </div>
          </section>

          <section className="animate-fade-in-up px-4 sm:px-0" style={{ animationDelay: '0.3s' }}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-brand-50/50 rounded-3xl flex items-center gap-4 border border-brand-100/50">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                        <Truck className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-brand-950">Fast Shipping</p>
                        <p className="text-xs font-semibold text-slate-500">Eco-conscious logistics</p>
                    </div>
                </div>
                <div className="p-5 bg-emerald-50/50 rounded-3xl flex items-center gap-4 border border-emerald-100/50">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-emerald-950">Secure Protection</p>
                        <p className="text-xs font-semibold text-slate-500">Fully encrypted checkout</p>
                    </div>
                </div>
             </div>
          </section>
        </div>

        <div className="lg:col-span-4 animate-fade-in-up md:sticky md:top-28" style={{ animationDelay: '0.4s' }}>
          <OrderSummary />
        </div>
      </div>

      <StickyFooter 
        nextLabel="Continue to Payment"
        onNext={handleContinue}
        disabledNext={false} 
      />
    </div>
  );
}
