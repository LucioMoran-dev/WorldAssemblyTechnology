export default function LoadingCategories() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="mb-4 h-12 w-12 animate-pulse rounded-lg bg-gray-200" />
            <div className="mb-2 h-6 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="mb-4 h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
