"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShippingAddress } from "@/types";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { MapPin, X, User, Phone, Home, Globe, Hash, Briefcase, Plus, Check } from "lucide-react";
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
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="text-[10px] md:text-xs font-semibold text-slate-500 ml-1">
        {label}
      </label>
      <div className="relative group/input">
        {children}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 animate-fade-in">
             <span className="text-[9px] font-bold text-red-500 hidden md:block">{error}</span>
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bento-card animate-fade-in-up shadow-sm">
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div className="space-y-0.5">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {initialData ? "Edit address" : "New address"}
            </h2>
            <p className="text-[10px] md:text-xs text-slate-500 font-medium">
              Enter the delivery details below
            </p>
          </div>
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-all active:scale-95 group"
            >
              <X className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
          
          <div className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <InputWrapper label="Full name" error={errors.fullName?.message}>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within/input:text-brand-600 transition-colors" />
                  <input
                    {...register("fullName")}
                    className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-slate-50/50 border border-slate-100 rounded-xl outline-none transition-all font-semibold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 placeholder:text-slate-300 text-sm"
                    placeholder="E.g. John Doe"
                  />
                </div>
              </InputWrapper>

              <InputWrapper label="Phone number" error={errors.phoneNumber?.message}>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within/input:text-brand-600 transition-colors" />
                  <input
                    {...register("phoneNumber")}
                    maxLength={10}
                    className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-slate-50/50 border border-slate-100 rounded-xl outline-none transition-all font-semibold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 placeholder:text-slate-300 text-sm"
                    placeholder="10-digit mobile"
                  />
                </div>
              </InputWrapper>
            </div>

            <InputWrapper label="Email address" error={errors.email?.message}>
              <input
                {...register("email")}
                className="w-full px-4 py-2.5 md:py-3 bg-slate-50/50 border border-slate-100 rounded-xl outline-none transition-all font-semibold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 placeholder:text-slate-300 text-sm"
                placeholder="john@example.com"
              />
            </InputWrapper>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              <InputWrapper label="PIN code" error={errors.pinCode?.message}>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within/input:text-brand-600 transition-colors" />
                  <input
                    {...register("pinCode")}
                    className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-slate-50/50 border border-slate-100 rounded-xl outline-none transition-all font-semibold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 placeholder:text-slate-300 text-sm"
                    placeholder="6-digit code"
                  />
                </div>
              </InputWrapper>

              <InputWrapper label="City" error={errors.city?.message}>
                <input
                  {...register("city")}
                  className="w-full px-4 py-2.5 md:py-3 bg-slate-50/50 border border-slate-100 rounded-xl outline-none transition-all font-semibold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 placeholder:text-slate-300 text-sm"
                  placeholder="E.g. Bengaluru"
                />
              </InputWrapper>

              <InputWrapper label="State" error={errors.state?.message}>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within/input:text-brand-600 transition-colors" />
                  <input
                    {...register("state")}
                    className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-slate-50/50 border border-slate-100 rounded-xl outline-none transition-all font-semibold text-slate-800 focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 placeholder:text-slate-300 text-sm"
                    placeholder="E.g. Karnataka"
                  />
                </div>
              </InputWrapper>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] md:text-xs font-semibold text-slate-500 ml-1 block">
              Address type
            </label>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
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
                    "flex items-center justify-center gap-2 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 border-2",
                    selectedType === type 
                      ? "bg-slate-900 border-slate-900 text-white shadow-md scale-95" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <Icon className={cn("w-4 h-4 md:w-5 md:h-5", selectedType === type ? "text-brand-400" : "text-slate-300")} />
                  <span className="text-[10px] md:text-xs font-bold">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="group w-full relative h-11 md:h-13 bg-slate-900 hover:bg-black  text-white font-bold rounded-xl transition-all active:scale-[0.98] text-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {initialData ? "Update address" : "Save address"}
                <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
