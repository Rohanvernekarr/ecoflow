"use client";

import { AddressForm } from "@/components/AddressForm";
import { OrderSummary } from "@/components/OrderSummary";
import { CartItem } from "@/components/CartItem";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, MapPin, Plus, Smartphone, Check, X ,Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShippingAddress } from "@/types";
import { AddressSkeleton, CartItemSkeleton, OrderSummarySkeleton } from "./Skeleton";

export function CheckoutPageContent() {
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const savedAddresses = useCheckoutStore((state) => state.savedAddresses);
  const selectedAddressId = useCheckoutStore((state) => state.selectedAddressId);
  const setSelectedAddressId = useCheckoutStore((state) => state.setSelectedAddressId);
  const setShippingAddress = useCheckoutStore((state) => state.setShippingAddress);
  const hasHydrated = useCheckoutStore((state) => state.hasHydrated);
  const removeSavedAddress = useCheckoutStore((state) => state.removeSavedAddress);
  const router = useRouter();
  
  const [showNewForm, setShowNewForm] = useState(savedAddresses.length === 0);
  const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

    if (cartItems.length === 0) {
      router.push("/");
    }
    
    if (savedAddresses.length > 0) {
      setShowNewForm(false);
      if (!selectedAddressId) {
        setSelectedAddressId(savedAddresses[0].id || "");
      }
    }
  }, [hasHydrated, cartItems.length, savedAddresses, router, selectedAddressId, setSelectedAddressId]);

  if (!hasHydrated) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:px-4 animate-fade-in">
        <div className="lg:col-span-8 space-y-10">
          <div className="glass rounded-[2rem] shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-200/50 rounded-lg animate-pulse-slow" />
              <div className="h-8 w-48 bg-slate-200/50 rounded animate-pulse-slow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AddressSkeleton />
              <AddressSkeleton />
            </div>
          </div>
          <div className="glass rounded-[2rem] shadow-sm p-8">
             <div className="h-8 w-40 bg-slate-200/50 rounded mb-6 animate-pulse-slow" />
             <div className="space-y-6">
               <CartItemSkeleton />
               <CartItemSkeleton />
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:px-4">
      <div className="lg:col-span-8 space-y-10">
        <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {showNewForm ? (
            <AddressForm 
              initialData={editingAddress || undefined}
              onSuccess={(newAddress) => {
                if (newAddress.id) {
                  setSelectedAddressId(newAddress.id);
                }
              }}
              onCancel={() => {
                setShowNewForm(false);
                setEditingAddress(null);
              }} 
            />
          ) : (
            <div className="glass rounded-[2rem] shadow-sm p-6 md:p-10 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-100 text-brand-600 rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    Delivery Address
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    setShowNewForm(true);
                  }}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-200 active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" /> Add New
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedAddresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddressId(address.id!)}
                    className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      selectedAddressId === address.id
                        ? "border-brand-500 bg-brand-50/50 ring-4 ring-brand-50/50 shadow-md shadow-brand-100/50 transform scale-[1.02]"
                        : "border-slate-200/60 hover:border-brand-300 bg-white/60 hover:bg-white/90 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-5">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest transition-colors ${
                           selectedAddressId === address.id ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-500"
                        }`}>
                          {address.addressType || "Home"}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => handleEditAddress(e, address)}
                            className={`p-1.5 rounded-lg border transition-all shadow-sm ${selectedAddressId === address.id ? 'bg-white/80 border-brand-200 text-brand-600 hover:bg-brand-50' : 'bg-white border-slate-200 text-slate-400 hover:text-brand-600 hover:border-brand-200 opacity-0 group-hover:opacity-100'}`}
                          >
                          <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={(e) => handleDeleteAddress(e, address.id!)}
                            className={`p-1.5 rounded-lg border transition-all shadow-sm ${selectedAddressId === address.id ? 'bg-white/80 border-red-200 text-red-500 hover:bg-red-50' : 'bg-white border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 opacity-0 group-hover:opacity-100'}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="font-bold text-slate-800 text-lg tracking-tight mb-1">{address.fullName}</p>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                        {address.city}, {address.state} {address.pinCode}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-200/60">
                         <div className="flex items-center gap-2 text-slate-500">
                           <Smartphone className="w-4 h-4" />
                           <span className="text-xs font-bold">{address.phoneNumber}</span>
                         </div>
                         {selectedAddressId === address.id && (
                           <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center shadow-sm">
                             <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                           </div>
                         )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="glass rounded-[2rem] shadow-sm p-6 md:p-10 transition-all hover:shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/50 text-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Order Review
              </h2>
            </div>
            <span className="text-sm font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</span>
          </div>
          <div className="flex flex-col gap-2">
            {cartItems.map((item) => (
              <CartItem key={item.product_id} item={item} />
            ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-4">
        <OrderSummary 
          buttonLabel="Proceed to Payment"
          onAction={handleProceedToPayment}
          isActionDisabled={!selectedAddressId || showNewForm}
        />
      </div>
    </div>
  );
}
