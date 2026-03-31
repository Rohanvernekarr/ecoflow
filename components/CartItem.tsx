"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { CartItem as CartItemType } from "@/types";
import { cn } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCheckoutStore((state) => state.updateQuantity);
  const removeItem = useCheckoutStore((state) => state.removeItem);

  return (
    <div className="group relative flex flex-row items-center gap-3 p-3 md:p-5 bg-white border border-slate-100 rounded-3xl md:rounded-[2rem] transition-all duration-500 hover:shadow-premium hover:border-brand-200/50">
      
      <div className="relative w-20 h-20 md:w-36 md:h-36 shrink-0 bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden border border-slate-100/50">
        <Image
          src={item.image}
          alt={item.product_name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 gap-2 md:gap-4 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-0.5 md:space-y-1 min-w-0">
            <h3 className="text-[16px] md:text-[22px] text-slate-900 leading-tight group-hover:text-brand-600 transition-colors duration-300 truncate md:whitespace-normal">
              {item.product_name}
            </h3>
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 text-[12px] md:text-[12px] font-semibold text-slate-500 tracking-wide whitespace-nowrap">
                Eco
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-brand-50 text-[12px] md:text-[12px] font-semibold text-brand-600 tracking-wide border border-brand-100/50 whitespace-nowrap">
                In Stock
              </span>
            </div>
          </div>
          
          <div className="text-right shrink-0">
            <p className="text-[18px] md:text-xl font-bold text-slate-900 tracking-tighter">
              ₹{item.product_price.toLocaleString("en-IN")}
            </p>
            {item.original_price && item.original_price > item.product_price && (
              <p className="text-[12px] md:text-[11px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-full mt-0.5 border border-brand-100/50">
                - {Math.round(((item.original_price - item.product_price) / item.original_price) * 100)}%
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 md:pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="flex items-center p-0.5 bg-slate-100/80 rounded-lg md:rounded-xl border border-slate-200/30">
               <button
                 onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                 disabled={item.quantity <= 1}
                 className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-md md:rounded-lg bg-white shadow-sm hover:text-brand-600 disabled:opacity-30 transition-all active:scale-90"
               >
                 <Minus className="w-3 h-3 md:w-3.5 md:h-3.5" />
               </button>
               <span className="w-6 md:w-8 text-center text-xs md:text-sm font-bold text-slate-800">
                 {item.quantity}
               </span>
               <button
                 onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                 className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-md md:rounded-lg bg-white shadow-sm hover:text-brand-600 transition-all active:scale-90"
               >
                 <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" />
               </button>
             </div>

             <button className="p-1.5 md:p-2.5 text-slate-300 hover:text-pink-500 hover:bg-pink-50 rounded-lg md:rounded-xl transition-all active:scale-90 opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-300">
               <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
             </button>
          </div>

          <button
            onClick={() => removeItem(item.product_id)}
            className="flex items-center gap-1.5 md:gap-2 px-2 py-1 md:px-3 md:py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg md:rounded-xl transition-all active:scale-95 group/remove"
          >
            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover/remove:-rotate-12" />
            <span className="text-[9px] md:text-[10px] font-bold hidden sm:block">Remove</span>
          </button>
        </div>
      </div>

    </div>
  );
}
