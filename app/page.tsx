import { CartPageContent } from "@/components/CartPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | EcoYaan",
  description: "Review your eco-friendly items before checkout.",
};

export default function Home() {
  return (
    <div className="min-h-screen py-6 md:py-12 bg-gray-50 animate-fade-in text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 md:mb-8 tracking-tighter md:px-4">Shopping Cart</h1>
        <CartPageContent />
      </div>
    </div>
  );
}
