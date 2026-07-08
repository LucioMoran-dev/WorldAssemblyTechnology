import { VARIANT_TYPE_LABELS } from "@/seeds";
import type { IVariantSnapshot } from "@/types";

/**
 * Chips con las variantes elegidas de un ítem del carrito/checkout.
 * Usa el snapshot `selectedVariants` que devuelve el back en cada cart item
 * (docs/frontend-variants-guide.md §7).
 */
export function CartItemVariants({
  variants,
  className = "",
}: {
  variants?: IVariantSnapshot[];
  className?: string;
}) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className={`mt-1 flex flex-wrap gap-1 ${className}`}>
      {variants.map((v) => (
        <span
          key={v.id}
          className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
        >
          {VARIANT_TYPE_LABELS[v.type] ?? v.type}: {v.name}
        </span>
      ))}
    </div>
  );
}
