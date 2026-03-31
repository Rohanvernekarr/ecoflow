"use client";

import { AddressForm } from "@/components/AddressForm";
import { OrderSummary } from "@/components/OrderSummary";
import { CartItem } from "@/components/CartItem";
import { StickyFooter } from "@/components/StickyFooter";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { ShoppingBag, MapPin, Plus, Smartphone, Check, X, Edit, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ShippingAddress } from "@/types";
import { AddressSkeleton, CartItemSkeleton, OrderSummarySkeleton } from "./Skeleton";
import { cn } from "@/lib/utils";

export function CheckoutPageContent() {
  const router = useRouter();
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const savedAddresses = useCheckoutStore((state) => state.savedAddresses);
  const selectedAddressId = useCheckoutStore((state) => state.selectedAddressId);
  const setSelectedAddressId = useCheckoutStore((state) => state.setSelectedAddressId);
  const setShippingAddress = useCheckoutStore((state) => state.setShippingAddress);
  const hasHydrated = useCheckoutStore((state) => state.hasHydrated);
  const removeSavedAddress = useCheckoutStore((state) => state.removeSavedAddress);
  
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

    if (cartItems.length === 0) {
      router.push("/");
    }
    
    if (savedAddresses.length === 0) {
      setShowNewForm(true);
    } else {
      if (!selectedAddressId) {
        setSelectedAddressId(savedAddresses[0].id || "");
      }
    }
  }, [hasHydrated, cartItems.length, savedAddresses.length, router, selectedAddressId, setSelectedAddressId]);

  if (!hasHydrated) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:px-4 animate-fade-in">
        <div className="lg:col-span-8 space-y-8">
          <div className="bento-card p-8">
            <div className="h-8 w-40 bg-slate-100 rounded-xl mb-10 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AddressSkeleton />
              <AddressSkeleton />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <OrderSummarySkeleton />
        </div>
      </div>
    );
  }

  const handleProceedToPayment = () => {
    const address = savedAddresses.find((a) => a.id === selectedAddressId);
    if (address) {
      setShippingAddress(address);
      router.push("/payment");
    }
  };

  const handleDeleteAddress = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this address?")) {
      removeSavedAddress(id);
      if (selectedAddressId === id) {
        setSelectedAddressId(savedAddresses.find(a => a.id !== id)?.id || "");
      }
    }
  };

  const handleEditAddress = (e: React.MouseEvent, address: ShippingAddress) => {
    e.stopPropagation();
    setEditingAddress(address);
    setShowNewForm(true);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 md:px-4 pb-44 animate-fade-in">
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
          
          <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4 md:mb-6 px-4 sm:px-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-50 text-brand-600 rounded-lg md:rounded-xl flex items-center justify-center">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Delivery</h2>
              </div>
              
              {!showNewForm && (
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    setShowNewForm(true);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs md:text-sm rounded-xl transition-all active:scale-95 group"
                >
                  <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:rotate-90" />
                  <span>Add address</span>
                </button>
              )}
            </div>

            {showNewForm ? (
              <AddressForm 
                initialData={editingAddress || undefined}
                onSuccess={(newAddress) => {
                  if (newAddress.id) setSelectedAddressId(newAddress.id);
                  setShowNewForm(false);
                  setEditingAddress(null);
                }}
                onCancel={() => {
                  if (savedAddresses.length > 0) {
                    setShowNewForm(false);
                    setEditingAddress(null);
                  }
                }} 
              />
            ) : (
              <div className="flex flex-col gap-4 px-4 sm:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddressId(address.id!)}
                      className={cn(
                        "group relative p-3 md:p-4 bg-white border rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden",
                        selectedAddressId === address.id
                          ? "border-brand-500 ring-4 ring-brand-500/5 shadow-xl shadow-brand-500/10"
                          : "border-slate-100 hover:border-brand-200 hover:shadow-lg"
                      )}
                    >
                      {selectedAddressId === address.id && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/5 rounded-full -mr-8 -mt-8 animate-pulse" />
                      )}

                      <div className="flex items-center justify-between mb-3 md:mb-4 relative z-10">
                        <div className={cn(
                          "px-2 py-0.5 md:px-3 md:py-1 rounded-lg text-[8px] md:text-xs font-bold transition-colors shadow-sm",
                           selectedAddressId === address.id ? "bg-brand-600 text-white" : "bg-slate-50 text-slate-400 border border-slate-100"
                        )}>
                          {address.addressType || "Home"}
                        </div>
                        
                        <div className="flex gap-1.5 md:gap-2">
                          <button 
                            onClick={(e) => handleEditAddress(e, address)}
                            className="p-1 md:p-1.5 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-brand-600 hover:border-brand-200 transition-all active:scale-95"
                          >
                            <Edit className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          </button>
                          <button 
                            onClick={(e) => handleDeleteAddress(e, address.id!)}
                            className="p-1 md:p-1.5 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-200 transition-all active:scale-95"
                          >
                            <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-3 md:mb-4 relative z-10">
                        <p className="font-bold text-slate-900 text-[16px] md:text-[16px] leading-tight mb-0.5">{address.fullName}</p>
                        <p className="text-[14px] md:text-[14px] font-semibold text-slate-500 truncate">{address.email}</p>
                      </div>

                      <p className="text-[14px] md:text-[14px] text-slate-500 font-semibold leading-relaxed mb-3 md:mb-4 flex-grow tracking-tight">
                        {address.city}, {address.state} {address.pinCode}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-2.5 md:pt-3 border-t border-slate-50 relative z-10">
                         <div className="flex items-center gap-1.5 md:gap-2 text-slate-500 font-bold text-[14px] md:text-[14px]">
                           <Smartphone className="w-3 h-3 md:w-3.5 md:h-3.5" />
                           <span>{address.phoneNumber}</span>
                         </div>
                         {selectedAddressId === address.id && (
                            <div className="flex items-center gap-1.5 md:gap-2 text-brand-600 animate-in zoom-in slide-in-from-right-4 duration-500">
                               <div className="w-4 h-4 md:w-5 md:h-5 bg-brand-600 rounded-full flex items-center justify-center shadow-lg shadow-brand-200">
                                 <Check className="w-2.5 md:w-3 h-2.5 md:h-3 text-white stroke-[3]" />
                               </div>
                            </div>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4 md:mb-6 px-4 sm:px-0">
               <div className="flex items-center gap-2 md:gap-3">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 text-slate-600 rounded-lg md:rounded-xl flex items-center justify-center">
                   <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                 </div>
                 <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Review items</h2>
               </div>
               <div className="px-2 py-0.5 md:px-3 md:py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                  <span className="text-[12px] md:text-[14px] font-semibold text-slate-500">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
               </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="md:sticky md:top-28">
            <OrderSummary />
          </div>
        </div>
      </div>

      {!showNewForm && (
        <StickyFooter 
          backLabel="Back to cart"
          backHref="/"
          nextLabel="Enter payment details"
          onNext={handleProceedToPayment}
          isNextDisabled={!selectedAddressId}
        />
      )}
    </div>
  );
}
