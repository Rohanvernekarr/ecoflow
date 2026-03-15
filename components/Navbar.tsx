"use client";

import Link from "next/link";
import { Leaf, MapPin, Search, ShoppingCart, User } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useEffect, useState } from "react";

export function Navbar() {
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b-0 shadow-sm transition-all animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
           
          <Link href="/" className="flex items-center gap-2 cursor-pointer group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white shadow-brand-500/30 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Leaf className="w-5 h-5 drop-shadow-sm" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-800 hidden sm:block">
              EcoYaan
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600 cursor-pointer shrink-0 transition-colors group">
            <div className="bg-brand-50 p-2 rounded-full group-hover:bg-brand-100 transition-colors">
              <MapPin className="w-4 h-4 text-brand-600" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">Deliver to</span>
              <span className="block truncate max-w-[120px] text-slate-700 group-hover:text-brand-700">Bengaluru 560001</span>
            </div>
          </div>

          <div className="flex-1 max-w-xl px-2 sm:px-4 ml-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 bg-white/50 border border-slate-200/60 text-slate-800 rounded-full leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all sm:text-sm shadow-sm"
                placeholder="Search eco-friendly products..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link href="/" className="relative p-2.5 text-slate-500 hover:text-brand-600 transition-all rounded-full hover:bg-white shadow-sm hover:shadow-md border border-transparent hover:border-slate-100">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            
            <button className="p-2.5 text-slate-500 hover:text-brand-600 transition-all rounded-full hover:bg-white shadow-sm hover:shadow-md border border-transparent hover:border-slate-100 hidden sm:block">
              <User className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
