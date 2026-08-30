import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSettings() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-1/3" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-6">
          <Skeleton className="mb-4 h-6 w-1/4" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
