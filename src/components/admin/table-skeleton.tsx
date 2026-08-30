import { Skeleton } from "@/components/ui/skeleton";

export function AdminTableSkeleton({
  rows = 6,
  columns = 5,
  withStats = false,
}: {
  rows?: number;
  columns?: number;
  withStats?: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Encabezado: titulo + boton de accion */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {withStats ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-6"
            >
              <Skeleton className="mb-3 h-4 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      ) : null}

      {/* Tarjeta con la tabla */}
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {/* Fila de encabezado, con el mismo fondo que la tabla real */}
        <div className="flex gap-4 border-b border-border bg-muted/40 px-4 py-3">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>

        {Array.from({ length: rows }).map((_, r) => (
          <div
            key={r}
            className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-b-0"
          >
            {Array.from({ length: columns }).map((_, c) => (
              <Skeleton
                key={c}
                className={c === 0 ? "h-5 flex-[1.5]" : "h-4 flex-1"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
