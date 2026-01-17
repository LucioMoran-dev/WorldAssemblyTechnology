export default function LoadingReviews() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200" />
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-16 w-16 animate-pulse rounded bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
