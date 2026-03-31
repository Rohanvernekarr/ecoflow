"use client";

import { ShoppingCart, User, Search, MapPin, Bell, Leaf, Menu, X, ChevronRight, Globe, Heart, Sprout, Store } from "lucide-react";
import Link from "next/link";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Shop", href: "/", icon: <Sprout className="w-4 h-4" /> },
  { name: "Our Story", href: "#", icon: <Globe className="w-4 h-4" /> },
  { name: "Sellers", href: "#", icon: <Store className="w-4 h-4" /> },
  { name: "Impact", href: "#", icon: <Heart className="w-4 h-4" /> },
];

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
            isScrolled ? "scale-[0.98] shadow-premium bg-white/80" : "scale-100 shadow-soft bg-white/60"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex flex-col -gap-1">
               <span className="text-xl font-bold tracking-tight text-brand-900 leading-none hidden sm:block">
                 EcoYaan
               </span>
               <span className="text-[9px] font-bold text-brand-600 uppercase tracking-widest hidden sm:block">
                 Flow
               </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 px-4">
             {NAV_LINKS.map((link) => (
               <Link 
                 key={link.name} 
                 href={link.href}
                 className="group flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-brand-900 transition-all relative py-1"
               >
                 {link.name}
                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full group-hover:left-0" />
               </Link>
             ))}
          </div>

          {/* Search Bar - Restored */}
          <div className="hidden md:flex flex-1 max-w-sm mx-4">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2 bg-brand-50/40 border border-brand-100/50 text-slate-800 rounded-2xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:bg-white transition-all text-sm"
                placeholder="Search eco products..."
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-brand-50 transition-colors cursor-pointer group">
              <MapPin className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden xl:block">Bengaluru</span>
            </div>

            <div className="w-px h-6 bg-brand-100/50 mx-1 hidden sm:block" />

            <button className="p-2.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all relative group">
              <Search className="md:hidden w-5 h-5" />
              <Bell className="hidden md:block w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-500 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform" />
            </button>

            <Link href="/" className="relative group p-2.5 bg-brand-50 hover:bg-brand-100 rounded-full transition-all duration-500">
              <ShoppingCart className="w-5 h-5 text-brand-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="hidden sm:flex items-center gap-2 pl-2 pr-4 py-2 bg-slate-900 hover:bg-black text-white rounded-full transition-all shadow-xl active:scale-95 group">
               <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4" />
               </div>
               <span className="text-xs font-bold">Profile</span>
            </button>
            
            <button 
              className="p-2.5 lg:hidden text-brand-900 bg-brand-50 hover:bg-brand-100 rounded-2xl transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 bg-brand-950/20 backdrop-blur-3xl z-40 p-6 flex flex-col pointer-events-auto sm:hidden animate-fade-in">
            <div className="mt-28 space-y-4">
               <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.3em] pl-4 mb-6">Discovery</p>
               {NAV_LINKS.map((link, idx) => (
                 <Link 
                   key={link.name} 
                   href={link.href}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="flex items-center justify-between p-5 bg-white/40 border border-white/20 rounded-[2rem] group transition-all animate-fade-in-up"
                   style={{ animationDelay: `${idx * 0.1}s` }}
                 >
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-brand-700 shadow-sm">
                         {link.icon}
                      </div>
                      <span className="text-lg font-bold text-brand-950">{link.name}</span>
                   </div>
                   <ChevronRight className="w-5 h-5 text-brand-300 group-hover:translate-x-1 transition-transform" />
                 </Link>
               ))}
            </div>

            <div className="mt-auto pb-12 flex flex-col gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center gap-2 p-5 bg-brand-900 text-white rounded-3xl font-bold active:scale-95 transition-transform">
                     <User className="w-5 h-5" />
                     <span className="text-[10px] uppercase tracking-widest">Account</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 p-5 bg-white text-brand-900 rounded-3xl font-bold shadow-soft active:scale-95 transition-transform">
                     <Bell className="w-5 h-5" />
                     <span className="text-[10px] uppercase tracking-widest">Alerts</span>
                  </button>
                </div>
                
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 bg-brand-50 text-brand-900 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border border-brand-100 hover:bg-brand-100 transition-colors"
                >
                   <X className="w-4 h-4" />
                   Close Concept Menu
                </button>
            </div>
        </div>
      )}
    </nav>
  );
}
