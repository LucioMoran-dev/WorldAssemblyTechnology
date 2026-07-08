"use client";

import { useMemo } from "react";

import { VARIANT_TYPE_LABELS } from "@/seeds";
import type { IProductVariant } from "@/types";

interface VariantSelectorProps {
  variants: IProductVariant[];
  /** Selección actual: type → id de la variante elegida */
  selected: Record<string, string>;
  onSelect: (type: string, variantId: string) => void;
}

/**
 * Formatea el modificador de precio de una opción:
 * +$80 si suma, -$20 si resta, nada si es 0.
 */
function formatModifier(priceModifier: number): string | null {
  if (priceModifier > 0) return `+$${priceModifier}`;
  if (priceModifier < 0) return `-$${Math.abs(priceModifier)}`;
  return null;
}

/**
 * Selector de variantes de la página pública de producto.
 *
 * Agrupa las variantes por `type` (el back las manda mezcladas, ordenadas por
 * sortOrder global) y pinta un grupo de botones por tipo. Las opciones sin
 * stock o no disponibles se muestran deshabilitadas — no se ocultan — según
 * la recomendación del back (docs/frontend-variants-guide.md §6.5).
 */
export function VariantSelector({
  variants,
  selected,
  onSelect,
}: VariantSelectorProps) {
  // Agrupar por tipo y ordenar cada grupo por sortOrder
  const groups = useMemo(() => {
    const byType = new Map<string, IProductVariant[]>();
    for (const variant of variants) {
      const list = byType.get(variant.type) ?? [];
      list.push(variant);
      byType.set(variant.type, list);
    }
    for (const list of byType.values()) {
      list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }
    return Array.from(byType.entries());
  }, [variants]);

  if (groups.length === 0) return null;

  return (
    <div className="space-y-4">
      {groups.map(([type, options]) => (
        <div key={type}>
          <p className="mb-2 text-sm font-medium text-gray-700">
            {VARIANT_TYPE_LABELS[type] ?? type}
            {!selected[type] && (
              <span className="ml-2 text-xs font-normal text-orange-600">
                (elegí una opción)
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => {
              const isSelected = selected[type] === option.id;
              const isDisabled = !option.isAvailable || option.stock === 0;
              const modifier = formatModifier(option.priceModifier);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelect(type, option.id)}
                  disabled={isDisabled}
                  title={isDisabled ? "Sin stock" : undefined}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : isDisabled
                        ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400 line-through"
                        : "border-gray-300 bg-white text-gray-700 hover:border-blue-600"
                  }`}
                >
                  {option.name}
                  {modifier && (
                    <span
                      className={`ml-1.5 text-xs ${isSelected ? "text-blue-600" : "text-gray-500"}`}
                    >
                      {modifier}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
