export default function LoadingSettings() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 h-6 w-1/4 animate-pulse rounded bg-gray-200" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
