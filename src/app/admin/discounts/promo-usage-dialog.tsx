"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePromoCodeUsage } from "@/hooks";

interface PromoUsageDialogProps {
  target: { id: string; code: string } | null;
  onClose: () => void;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/**
 * Historial de uso de un código promocional
 * (GET /discounts/promo-codes/:id/usage): quién lo usó, en qué orden y
 * cuánto descuento se aplicó. Solo lectura.
 */
export function PromoUsageDialog({ target, onClose }: PromoUsageDialogProps) {
  const { data: usages, isLoading } = usePromoCodeUsage(target?.id ?? "");

  return (
    <Dialog open={Boolean(target)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Historial de uso — {target?.code}</DialogTitle>
          <DialogDescription>
            Cada vez que un cliente aplicó este código en una compra.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded bg-muted" />
            ))}
          </div>
        ) : usages && usages.length > 0 ? (
          <div className="max-h-80 space-y-2 overflow-y-auto">
            {usages.map((usage) => (
              <div
                key={usage.id}
                className="rounded-lg border border-border p-3 text-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">
                      {usage.userName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Orden #{usage.orderNumber} · {formatDate(usage.usedAt)}
                    </p>
                  </div>
                  <span className="shrink-0 font-semibold text-green-600">
                    -${Number(usage.discountApplied).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Este código todavía no fue usado.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
