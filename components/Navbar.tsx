"use client";

import Link from "next/link";
import { Leaf, MapPin, Search, ShoppingCart, User, Bell } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { cartItems, hasHydrated } = useCheckoutStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={cn(
            "flex items-center justify-between h-14 md:h-16 px-4 md:px-6 rounded-2xl md:rounded-full transition-all duration-500 border border-white/40 shadow-premium glass",
            isScrolled ? "scale-[0.98] shadow-xl" : "scale-100 shadow-lg"
          )}
        >
          
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-500">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
              EcoYaan
            </span>
          </Link>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-brand-300 text-slate-800 rounded-full leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:bg-white transition-all text-sm"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
            
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/50 transition-colors cursor-pointer group">
              <MapPin className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
              <span className="text-xs font-semibold text-slate-500 hidden xl:block">Bengaluru</span>
            </div>

            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

            <button className="p-2.5 text-slate-500 hover:text-slate-900 transition-all rounded-full hover:bg-white/80 relative group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-500 rounded-full border-2 border-white ring-2 ring-brand-500/20" />
            </button>
            
            <button className="p-2.5 text-slate-500 hover:text-slate-900 transition-all rounded-full hover:bg-white/80 hidden md:block">
              <User className="w-5 h-5" />
            </button>

            <Link 
              href="/" 
              className="relative p-2.5 bg-slate-900 text-white rounded-full hover:bg-black transition-all hover:scale-110 active:scale-95 shadow-md shadow-slate-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {hasHydrated && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center px-1.5 rounded-full border-2 border-white animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
