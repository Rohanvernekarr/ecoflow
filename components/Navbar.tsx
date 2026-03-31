"use client";

import { ShoppingCart, User, Search, MapPin, Bell, Leaf, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useCheckoutStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-6 md:py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        <div 
          className={cn(
            "relative glass rounded-[2rem] px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 transition-all duration-700",
            isScrolled ? "scale-[0.98] shadow-premium" : "scale-100 shadow-soft"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-900 hidden sm:block">
              EcoYaan
            </span>
          </Link>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2.5 bg-brand-50/30 border border-brand-100/50 text-slate-800 rounded-2xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:bg-white transition-all text-sm"
                placeholder="Search premium eco-products..."
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
            
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/50 transition-colors cursor-pointer group">
              <MapPin className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
              <span className="text-xs font-semibold text-slate-500 hidden xl:block">Bengaluru</span>
            </div>

            <div className="w-px h-6 bg-brand-100/50 mx-1 hidden sm:block" />

            <button className="p-2.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all relative group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-500 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform" />
            </button>

            <Link href="/cart" className="relative group p-2.5 bg-brand-50 hover:bg-brand-100 rounded-full transition-all duration-500">
              <ShoppingCart className="w-5 h-5 text-brand-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="hidden sm:flex items-center gap-2 pl-2 pr-4 py-2 bg-slate-900 hover:bg-black text-white rounded-full transition-all shadow-lg active:scale-95 group">
               <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4" />
               </div>
               <span className="text-xs font-bold">Account</span>
            </button>
            
            <button 
              className="p-2 sm:hidden text-brand-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Placeholder - Elegant Reveal */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] bg-white/80 backdrop-blur-2xl z-40 p-6 flex flex-col gap-4 animate-fade-in sm:hidden pointer-events-auto">
            {/* List links here */}
        </div>
      )}
    </nav>
  );
}
