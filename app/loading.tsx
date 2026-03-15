import { CartItemSkeleton, OrderSummarySkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 text-slate-800 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-64 bg-slate-200/50 rounded-lg mb-8 animate-pulse-slow md:mx-4" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:px-4">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass rounded-[2rem] shadow-sm p-6 md:p-8">
              <div className="h-8 w-40 bg-slate-200/50 rounded-lg mb-8 animate-pulse-slow" />
              <div className="space-y-6">
                <CartItemSkeleton />
                <CartItemSkeleton />
                <CartItemSkeleton />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <OrderSummarySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
