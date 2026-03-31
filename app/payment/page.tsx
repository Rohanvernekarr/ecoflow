import { PaymentPageContent } from "@/components/PaymentPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment | EcoYaan",
  description: "Securely pay for your eco-friendly choices.",
};

export default function Payment() {
  return (
    <div className="py-12 md:py-20 animate-fade-in relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <PaymentPageContent />
      </div>
    </div>
  );
}
