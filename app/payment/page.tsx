import { PaymentPageContent } from "@/components/PaymentPageContent";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment | EcoYaan",
  description: "Securely pay for your eco-friendly choices.",
};

export default function Payment() {
  return (
    <div className="min-h-screen py-8 md:py-12 animate-fade-in bg-gray-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:px-4">
          <Link 
            href="/checkout" 
            className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-brand-600 mb-4 transition-colors uppercase tracking-widest group"
          >
            <div className="p-1 px-2 rounded-lg bg-white/50 border border-slate-200 group-hover:bg-brand-50 group-hover:border-brand-200 transition-all mr-3 flex items-center">
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-brand-600 transition-colors" />
            </div>
            Back to Shipping
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Secure Payment</h1>
        </div>
        
        <PaymentPageContent />
      </div>
    </div>
  );
}
