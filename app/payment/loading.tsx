import { OrderSummarySkeleton, Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-pulse-slow">
           <div className="h-4 w-32 bg-slate-200/60 rounded mb-4" />
           <div className="h-10 w-48 bg-slate-200/60 rounded-lg" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:px-4 animate-fade-in">
          <div className="lg:col-span-8 space-y-10">
            <div className="glass rounded-[2rem] shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-slate-200/60 rounded-lg animate-pulse-slow" />
                <div className="h-7 w-32 bg-slate-200/60 rounded-lg animate-pulse-slow" />
              </div>
              <Skeleton className="h-28 w-full rounded-2xl" />
            </div>
            <div className="glass rounded-[2rem] shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-slate-200/60 rounded-lg animate-pulse-slow" />
                <div className="h-7 w-48 bg-slate-200/60 rounded-lg animate-pulse-slow" />
              </div>
              <div className="space-y-4">
                 <Skeleton className="h-20 w-full rounded-2xl" />
                 <Skeleton className="h-20 w-full rounded-2xl" />
                 <Skeleton className="h-20 w-full rounded-2xl" />
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
