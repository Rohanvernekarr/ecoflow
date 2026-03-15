"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShippingAddress } from "@/types";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";


//Zod
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
    formState: { errors, isValid },
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
    
    if (onSuccess) {
      onSuccess(addressToSave);
    }

    if (onCancel) {
      onCancel();
    } else {
      router.push("/checkout"); 
    }
  };


  return (
    <div className="glass rounded-[2rem] shadow-sm p-6 md:p-10 text-slate-800 animate-fade-in-up">
      <div className="flex justify-between items-start mb-8 md:mb-10 pb-4 md:pb-6 border-b border-slate-200/50">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2 md:gap-3">
            <div className="bg-brand-100/50 p-2 md:p-2.5 rounded-xl">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-brand-600" />
            </div>
            {initialData ? "Edit Address" : "New Address"}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1.5 md:mt-2">Please provide your precise delivery details for a smooth drop-off.</p>
        </div>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="p-2 bg-slate-100/50 hover:bg-slate-200 rounded-full transition-colors group"
          >
            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 uppercase tracking-widest px-2 group-active:scale-95 transition-all">Cancel</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <input
              {...register("fullName")}
              type="text"
              id="fullName"
              className={`peer w-full px-4 pt-6 pb-2 bg-white/60 border-2 rounded-2xl outline-none transition-all font-semibold text-slate-800 placeholder-transparent focus:bg-white ${
                errors.fullName ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 hover:border-slate-300"
              }`}
              placeholder="e.g. John Doe"
            />
            <label 
              htmlFor="fullName"
              className="absolute left-4 top-2 text-[10px] font-black uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:text-[10px] peer-focus:top-2 peer-focus:uppercase peer-focus:tracking-widest transition-all peer-focus:text-brand-600"
            >
              Full Name
            </label>
            {errors.fullName && <p className="text-[10px] text-red-500 font-bold uppercase ml-4 mt-1.5 absolute -bottom-5">{errors.fullName.message}</p>}
          </div>

          <div className="relative group">
            <input
              {...register("phoneNumber")}
              type="tel"
              id="phoneNumber"
              className={`peer w-full px-4 pt-6 pb-2 bg-white/60 border-2 rounded-2xl outline-none transition-all font-semibold text-slate-800 placeholder-transparent focus:bg-white ${
                errors.phoneNumber ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 hover:border-slate-300"
              }`}
              placeholder="10-digit number"
              maxLength={10}
            />
             <label 
              htmlFor="phoneNumber"
              className="absolute left-4 top-2 text-[10px] font-black uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:text-[10px] peer-focus:top-2 peer-focus:uppercase peer-focus:tracking-widest transition-all peer-focus:text-brand-600"
            >
              Phone Number
            </label>
            {errors.phoneNumber && <p className="text-[10px] text-red-500 font-bold uppercase ml-4 mt-1.5 absolute -bottom-5">{errors.phoneNumber.message}</p>}
          </div>
        </div>

        <div className="relative group">
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`peer w-full px-4 pt-6 pb-2 bg-white/60 border-2 rounded-2xl outline-none transition-all font-semibold text-slate-800 placeholder-transparent focus:bg-white ${
              errors.email ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 hover:border-slate-300"
            }`}
            placeholder="john@example.com"
          />
           <label 
              htmlFor="email"
              className="absolute left-4 top-2 text-[10px] font-black uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:text-[10px] peer-focus:top-2 peer-focus:uppercase peer-focus:tracking-widest transition-all peer-focus:text-brand-600"
            >
            Email Address
          </label>
          {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase ml-4 mt-1.5 absolute -bottom-5">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group">
            <input
              {...register("pinCode")}
              type="text"
              id="pinCode"
              className={`peer w-full px-4 pt-6 pb-2 bg-white/60 border-2 rounded-2xl outline-none transition-all font-semibold text-slate-800 placeholder-transparent focus:bg-white ${
                errors.pinCode ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 hover:border-slate-300"
              }`}
              placeholder="6 digits"
            />
            <label 
              htmlFor="pinCode"
              className="absolute left-4 top-2 text-[10px] font-black uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:text-[10px] peer-focus:top-2 peer-focus:uppercase peer-focus:tracking-widest transition-all peer-focus:text-brand-600"
            >
              PIN Code
            </label>
            {errors.pinCode && <p className="text-[10px] text-red-500 font-bold uppercase ml-4 mt-1.5 absolute -bottom-5">{errors.pinCode.message}</p>}
          </div>

          <div className="relative group">
            <input
              {...register("city")}
              type="text"
              id="city"
              className={`peer w-full px-4 pt-6 pb-2 bg-white/60 border-2 rounded-2xl outline-none transition-all font-semibold text-slate-800 placeholder-transparent focus:bg-white ${
                errors.city ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 hover:border-slate-300"
              }`}
              placeholder="City name"
            />
             <label 
              htmlFor="city"
              className="absolute left-4 top-2 text-[10px] font-black uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:text-[10px] peer-focus:top-2 peer-focus:uppercase peer-focus:tracking-widest transition-all peer-focus:text-brand-600"
            >
              City
            </label>
          </div>

          <div className="relative group">
            <input
              {...register("state")}
              type="text"
              id="state"
              className={`peer w-full px-4 pt-6 pb-2 bg-white/60 border-2 rounded-2xl outline-none transition-all font-semibold text-slate-800 placeholder-transparent focus:bg-white ${
                errors.state ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 hover:border-slate-300"
              }`}
              placeholder="State"
            />
             <label 
              htmlFor="state"
              className="absolute left-4 top-2 text-[10px] font-black uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:text-[10px] peer-focus:top-2 peer-focus:uppercase peer-focus:tracking-widest transition-all peer-focus:text-brand-600"
            >
              State
            </label>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4 pt-2">
          <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-2">
            Address Type
          </label>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {["Home", "Work", "Other"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setValue("addressType", type as any, { shouldValidate: true })}
                className={`px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all border-2 ${
                  selectedType === type 
                    ? "bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-200 scale-[1.02]" 
                    : "bg-white border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50/50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 md:pt-8 flex gap-4 border-t border-slate-200/50">
          <button
            type="submit"
            disabled={!isValid}
            className="w-full relative group overflow-hidden bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white font-bold py-4 md:py-5 rounded-xl md:rounded-2xl shadow-lg transition-all active:scale-[0.98] focus:ring-4 focus:ring-slate-900/20"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0" />
            <div className="absolute inset-0 w-full h-full from-white/20 to-transparent bg-gradient-to-b opacity-0 group-hover:opacity-100" />
            <span className="relative flex items-center justify-center gap-2 uppercase tracking-widest text-xs md:text-sm">
              {initialData ? "Save Changes" : "Save & Deliver Here"}
            </span>
          </button>
        </div>
      </form>
    </div>

  );
}
