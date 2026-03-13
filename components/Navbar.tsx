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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
           
          <Link href="/" className="flex items-center gap-2 cursor-pointer group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">
              EcoYaan
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer shrink-0">
            <MapPin className="w-4 h-4 text-gray-500" />
            <div className="leading-tight">
              <span className="block text-xs text-gray-500 font-normal">Deliver to</span>
              <span className="block truncate max-w-[120px]">Bengaluru 560001</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl px-2 sm:px-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-900 group-focus-within:text-green-600 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 text-gray-800 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none  transition-all sm:text-sm"
                placeholder="Search for eco-friendly products..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link href="/" className="relative p-2 text-gray-600 hover:text-green-600 transition-colors rounded-full hover:bg-green-50">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            
            <button className="p-2 text-gray-600 hover:text-green-600 transition-colors rounded-full hover:bg-green-50 hidden sm:block">
              <User className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
