import { Search, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="space-y-4">
          <div className="relative flex justify-center">
            <h1 className="text-[150px] font-black text-gray-100 leading-none select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-white rounded-3xl shadow-2xl border border-gray-50">
                <Search className="w-16 h-16 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Page Not Found</h2>
            <p className="text-gray-500 font-medium max-w-[280px] mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-xl shadow-gray-200 active:scale-95 uppercase tracking-widest text-xs"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
