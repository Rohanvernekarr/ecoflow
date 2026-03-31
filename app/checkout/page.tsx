import { CheckoutPageContent } from "@/components/CheckoutPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | EcoYaan",
  description: "Securely enter your shipping details for a sustainable delivery.",
};

export default function Checkout() {
  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <CheckoutPageContent />
      </div>
    </div>
  );
}
