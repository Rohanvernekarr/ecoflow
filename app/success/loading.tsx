import { SuccessSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <SuccessSkeleton />
    </div>
  );
}
