import { SuccessPageContent } from "@/components/SuccessPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Successful | EcoYaan",
  description: "Your sustainable order has been placed successfully.",
};

export default function Success() {
  return (
    <div className="animate-fade-in mt-14">
      <SuccessPageContent />
    </div>
  );
}
