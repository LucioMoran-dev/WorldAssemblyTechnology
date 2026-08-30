import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCategories() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-1/3" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-6">
            <Skeleton className="mb-4 h-12 w-12 rounded-lg" />
            <Skeleton className="mb-2 h-6 w-2/3" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
