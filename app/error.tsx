"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-3 bg-red-50 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Something went wrong!</h1>
          <p className="text-gray-500 font-medium">
            We encountered an unexpected error. Please try again or return to the home page.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="text-sm font-bold text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
