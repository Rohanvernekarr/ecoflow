import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCheckoutStore((state) => state.updateQuantity);
  const removeItem = useCheckoutStore((state) => state.removeItem);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 px-2 hover:bg-slate-50 border-b border-slate-100 last:border-0 rounded-2xl transition-all duration-300 group">
      <div className="relative w-24 h-24 sm:w-20 sm:h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
        <Image
          src={item.image}
          alt={item.product_name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors">
          {item.product_name}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="font-bold text-slate-900 text-lg">₹{item.product_price}</span>
          {item.original_price && item.original_price > item.product_price && (
            <>
              <span className="text-slate-400 line-through text-sm font-medium">₹{item.original_price}</span>
              <span className="text-brand-600 font-bold text-xs bg-brand-50 px-2 py-0.5 rounded-full">
                Save ₹{item.original_price - item.product_price}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-end gap-3 text-slate-800 w-full sm:w-auto mt-4 sm:mt-0 px-4 sm:px-0">
        <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shrink-0 shadow-sm">
          <button
            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-2 hover:bg-slate-50 hover:text-brand-600 disabled:opacity-40 transition-colors active:bg-slate-100"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="w-10 text-center font-bold text-sm text-slate-700">
            {item.quantity}
          </span>
          
          <button
            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
            className="p-2 hover:bg-slate-50 hover:text-brand-600 transition-colors active:bg-slate-100"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => removeItem(item.product_id)}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full text-sm flex items-center gap-1 transition-all opacity-100 sm:opacity-50 group-hover:opacity-100 focus:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
          <span className="sr-only">Remove</span>
        </button>
      </div>
    </div>
  );
}
