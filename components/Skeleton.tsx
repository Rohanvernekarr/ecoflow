"use client";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse-slow bg-slate-200/60 rounded-xl ${className}`} />
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex flex-row items-center gap-3 p-3 md:p-5 border border-slate-100 rounded-3xl md:rounded-[2rem]">
      <Skeleton className="w-20 h-20 md:w-36 md:h-36 rounded-xl md:rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2 md:space-y-4 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 md:h-6 w-3/4 rounded-md" />
            <Skeleton className="h-3 md:h-4 w-1/2 rounded-md" />
          </div>
          <Skeleton className="h-5 md:h-7 w-16 rounded-md shrink-0" />
        </div>
        <div className="pt-2 md:pt-4 border-t border-slate-50 flex justify-between items-center">
          <Skeleton className="h-8 md:h-10 w-24 rounded-xl" />
          <Skeleton className="h-8 w-8 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function OrderSummarySkeleton() {
  return (
    <div className="glass shadow-sm rounded-[2rem] p-6 lg:p-8 space-y-6">
      <Skeleton className="h-7 w-1/2 rounded-lg" />
      <div className="space-y-4 pt-4 border-t border-slate-200/50">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/5" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      </div>
      <div className="pt-6 border-t border-slate-200/50 flex justify-between">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-8 w-1/4" />
      </div>
      <Skeleton className="h-14 w-full rounded-2xl mt-4" />
    </div>
  );
}

export function AddressSkeleton() {
  return (
    <div className="p-6 border-2 border-slate-200/60 rounded-2xl space-y-4">
      <div className="flex justify-between mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-6 w-1/2 mb-2" />
      <Skeleton className="h-4 w-3/4" />
      <div className="pt-4 mt-6 border-t border-slate-200/50 flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );
}

export function SuccessSkeleton() {
  return (
    <div className="max-w-2xl w-full glass p-10 rounded-[2rem] shadow-sm space-y-8 animate-fade-in-up">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
        <Skeleton className="h-8 w-1/2 mx-auto rounded-lg" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
      <div className="space-y-6 pt-6 border-t border-slate-200/50">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>
      <Skeleton className="h-24 w-full rounded-2xl mt-6" />
      <div className="flex justify-center pt-4">
        <Skeleton className="h-12 w-48 rounded-full" />
      </div>
    </div>
  );
}
