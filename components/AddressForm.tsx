"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShippingAddress } from "@/types";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { MapPin, X, User, Phone, Home, Globe, Hash, Briefcase, Plus, Check, AtSign } from "lucide-react";
import { cn } from "@/lib/utils";

// Zod Schema
const addressSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  pinCode: z.string().min(5, "Valid PIN code is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  addressType: z.enum(["Home", "Work", "Other"]),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export function AddressForm({ 
  onCancel,
  onSuccess,
  initialData 
}: { 
  onCancel?: () => void;
  onSuccess?: (address: ShippingAddress) => void;
  initialData?: ShippingAddress;
}) {
  const router = useRouter();
  const setShippingAddress = useCheckoutStore((state) => state.setShippingAddress);
  const addSavedAddress = useCheckoutStore((state) => state.addSavedAddress);
  const updateSavedAddress = useCheckoutStore((state) => state.updateSavedAddress);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData ? {
      fullName: initialData.fullName,
      email: initialData.email,
      phoneNumber: initialData.phoneNumber,
      pinCode: initialData.pinCode,
      city: initialData.city,
      state: initialData.state,
      addressType: initialData.addressType || "Home",
    } : {
      fullName: "",
      email: "",
      phoneNumber: "",
      pinCode: "",
      city: "",
      state: "",
      addressType: "Home",
    },
    mode: "onTouched", 
  });

  const selectedType = watch("addressType");

  const onSubmit = (data: AddressFormValues) => {
    const addressToSave = { ...data, id: initialData?.id || Date.now().toString() };
    
    if (initialData?.id) {
      updateSavedAddress(initialData.id, addressToSave);
    } else {
      addSavedAddress(addressToSave);
      setShippingAddress(addressToSave);
    }
    
    if (onSuccess) onSuccess(addressToSave);
    if (onCancel) onCancel();
    else router.push("/checkout"); 
  };

  const InputWrapper = ({ label, error, children, className }: any) => (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1">
        {label}
      </label>
      <div className="relative group/input">
        {children}
        {error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 animate-fade-in">
             <span className="text-[9px] font-bold text-red-500 hidden md:block">{error}</span>
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bento-card animate-fade-in-up border-brand-100 shadow-premium">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-8 md:mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-4xl font-bold text-brand-950 tracking-tight flex items-center gap-3">
              <MapPin className="text-brand-600 w-6 h-6 md:w-8 md:h-8" />
              {initialData ? "Edit Shipping" : "New Address"}
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-medium tracking-tight">
              Where should we deliver your eco-treasures?
            </p>
          </div>
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-all active:scale-95 group border border-slate-100"
            >
              <X className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
          
          <div className="space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <InputWrapper label="Recipient Name" error={errors.fullName?.message}>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-brand-600 transition-colors" />
                  <input
                    {...register("fullName")}
                    className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-brand-50/20 border border-brand-100/50 rounded-2xl outline-none transition-all font-bold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-300 text-sm md:text-base"
                    placeholder="Full name"
                  />
                </div>
              </InputWrapper>

              <InputWrapper label="Contact Number" error={errors.phoneNumber?.message}>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-brand-600 transition-colors" />
                  <input
                    {...register("phoneNumber")}
                    maxLength={10}
                    className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-brand-50/20 border border-brand-100/50 rounded-2xl outline-none transition-all font-bold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-300 text-sm md:text-base"
                    placeholder="10-digit mobile"
                  />
                </div>
              </InputWrapper>
            </div>

            <InputWrapper label="Email for Updates" error={errors.email?.message}>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-brand-600 transition-colors" />
                <input
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-brand-50/20 border border-brand-100/50 rounded-2xl outline-none transition-all font-bold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-300 text-sm md:text-base"
                  placeholder="john@example.com"
                />
              </div>
            </InputWrapper>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              <InputWrapper label="Postal Code" error={errors.pinCode?.message}>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-brand-600 transition-colors" />
                  <input
                    {...register("pinCode")}
                    className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-brand-50/20 border border-brand-100/50 rounded-2xl outline-none transition-all font-bold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-300 text-sm md:text-base"
                    placeholder="PIN Code"
                  />
                </div>
              </InputWrapper>

              <InputWrapper label="City" error={errors.city?.message}>
                <input
                  {...register("city")}
                  className="w-full px-5 py-3.5 md:py-4 bg-brand-50/20 border border-brand-100/50 rounded-2xl outline-none transition-all font-bold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-300 text-sm md:text-base"
                  placeholder="City"
                />
              </InputWrapper>

              <InputWrapper label="State" error={errors.state?.message}>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-brand-600 transition-colors" />
                  <input
                    {...register("state")}
                    className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-brand-50/20 border border-brand-100/50 rounded-2xl outline-none transition-all font-bold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-300 text-sm md:text-base"
                    placeholder="State"
                  />
                </div>
              </InputWrapper>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 block">
              Address Classification
            </label>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                { type: "Home", icon: Home },
                { type: "Work", icon: Briefcase },
                { type: "Other", icon: Plus }
              ].map(({ type, icon: Icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setValue("addressType", type as any)}
                  className={cn(
                    "flex flex-col md:flex-row items-center justify-center gap-3 py-4 md:py-5 rounded-2xl transition-all duration-500 border-2",
                    selectedType === type 
                      ? "bg-brand-900 border-brand-900 text-white shadow-premium scale-[0.98]" 
                      : "bg-white border-brand-100 text-slate-400 hover:border-brand-200 hover:bg-brand-50"
                  )}
                >
                  <Icon className={cn("w-5 h-5", selectedType === type ? "text-brand-300" : "text-brand-200")} />
                  <span className="text-xs md:text-sm font-bold tracking-tight">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="group w-full relative h-14 md:h-16 bg-brand-800 hover:bg-brand-900 text-white font-bold rounded-[1.5rem] transition-all active:scale-[0.98] text-sm md:text-base overflow-hidden flex items-center justify-center gap-3 shadow-xl"
            > 
              <div className="absolute inset-0 bg-brand-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {initialData ? "Update Address" : "Save Delivery Securely"}
                <Check className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
