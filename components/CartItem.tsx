"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import { Trash2, Plus, Minus, Tag, ShieldCheck, Leaf } from "lucide-react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { cn } from "@/lib/utils";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCheckoutStore();

  return (
    <div className="group relative flex flex-row items-center gap-3 md:gap-4 p-3 md:p-4 bg-white border border-brand-100/50 rounded-2xl md:rounded-3xl transition-all duration-500 hover:shadow-premium hover:border-brand-200/50">
      
      <div className="relative w-20 h-20 md:w-28 md:h-28 shrink-0 bg-brand-50/30 rounded-xl md:rounded-2xl overflow-hidden border border-brand-100/30">
        <Image
          src={item.image}
          alt={item.product_name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-brand-600/90 backdrop-blur-md text-[8px] md:text-[10px] font-bold text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           Premium
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-2 md:gap-4 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-0.5 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-brand-900 leading-tight tracking-tight hover:text-brand-600 transition-colors duration-300 truncate md:whitespace-normal">
              {item.product_name}
            </h3>
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-brand-50 text-[9px] md:text-[11px] font-bold text-brand-700 tracking-wide border border-brand-100/50">
                 <Leaf className="w-2.5 h-2.5" />
                 Eco-Friendly
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-50 text-[9px] md:text-[11px] font-bold text-slate-500 tracking-wide">
                In Stock
              </span>
            </div>
          </div>
          
          <div className="text-right shrink-0">
            <p className="text-base md:text-xl font-bold text-brand-950 tracking-tighter">
              ₹{item.product_price.toLocaleString("en-IN")}
            </p>
            {item.original_price && item.original_price > item.product_price && (
              <p className="text-[10px] md:text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 border border-emerald-100/50">
                - {Math.round(((item.original_price - item.product_price) / item.original_price) * 100)}%
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1 border-t border-brand-50/50">
          <div className="flex items-center gap-2">
             <div className="flex items-center p-0.5 bg-slate-50 rounded-xl border border-slate-100/50">
               <button
                 onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                 disabled={item.quantity <= 1}
                 className="p-1 md:p-1.5 text-slate-400 hover:text-brand-600 hover:bg-white rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
               >
                 <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
               </button>
                <span className="w-8 md:w-10 text-center text-xs md:text-sm font-bold text-slate-800">
                  {item.quantity}
                </span>
               <button
                 onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                 className="p-1 md:p-1.5 text-slate-400 hover:text-brand-600 hover:bg-white rounded-lg transition-all active:scale-90"
               >
                 <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
               </button>
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl cursor-default transition-colors">
               <ShieldCheck className="w-3.5 h-3.5" />
               <span className="text-[10px] font-bold tracking-wide hidden xs:block">1 Year Warranty</span>
             </div>
          </div>

          <button
            onClick={() => removeItem(item.product_id)}
            className="p-2 md:p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 active:scale-95 group/del"
          >
            <Trash2 className="w-4 h-4 md:w-5 md:h-5 group-hover/del:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
