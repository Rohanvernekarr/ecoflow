import { CartPageContent } from "@/components/CartPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eco Cart | Shop Sustainably",
  description: "Review and manage your eco-conscious selections before checkout.",
};

export default function Home() {
  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartPageContent />
      </div>
    </div>
  );
}
