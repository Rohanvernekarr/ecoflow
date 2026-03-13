"use client";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <Skeleton className="w-20 h-20 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex flex-col items-end gap-3">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function OrderSummarySkeleton() {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 space-y-6">
      <Skeleton className="h-7 w-1/2" />
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/5" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100 flex justify-between">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
      </div>
      <Skeleton className="h-14 w-full rounded-lg" />
    </div>
  );
}

export function AddressSkeleton() {
  return (
    <div className="p-6 border-2 border-gray-100 rounded-2xl space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-12" />
      </div>
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
      <div className="pt-4 border-t border-gray-100 flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
}
