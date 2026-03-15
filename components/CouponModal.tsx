"use client";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { X, Ticket } from "lucide-react";
import { useState } from "react";

const COUPONS = [
  { code: "SHIPFREE2025", desc: "FREE Shipping", discount: 50 },
  { code: "ECOYAAN5", desc: "5% OFF upto ₹100", discount: 50 },
];

export function CouponModal({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const { applyCoupon, appliedCoupon } = useCheckoutStore();

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center text-gray-800 bg-black/50 p-4">
      <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">Apply Coupon</h3>
          <X className="w-5 h-5 cursor-pointer text-gray-400" onClick={onClose} />
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <input 
              value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter Code" className="flex-1 border p-2 rounded-lg outline-none focus:border-green-600"
            />
            <button onClick={() => { applyCoupon(code, 20); onClose(); }} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">Apply</button>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Major Offers</p>
            {COUPONS.map((c) => (
              <div key={c.code} className="flex justify-between items-center p-3 border rounded-lg hover:border-green-500 transition-colors">
                <div>
                  <p className="font-bold text-sm italic">{c.code}</p>
                  <p className="text-xs text-green-600 font-medium">{c.desc}</p>
                </div>
                <button 
                  onClick={() => { applyCoupon(c.code, c.discount); onClose(); }}
                  className="text-xs font-black text-green-600 hover:underline"
                >
                  {appliedCoupon === c.code ? "APPLIED" : "APPLY"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
