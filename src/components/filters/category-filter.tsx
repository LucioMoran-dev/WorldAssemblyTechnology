"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useCategories } from "@/hooks";

interface CategoryFilterProps {
  value: string;
  onChange: (categoryId: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const { data: categoriesData, isLoading } = useCategories({ limit: 100 });
  const categories = categoriesData?.items ?? [];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-5 animate-pulse rounded bg-gray-100" />
        ))}
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
      {categories.map((cat) => {
        const name = cat.category_name ?? cat.name ?? "Sin categoría";
        const count = cat.products?.length;
        const isChecked = value === cat.id;

        return (
          <label
            key={cat.id}
            className="flex cursor-pointer items-center justify-between gap-2 text-sm hover:text-gray-900"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => onChange(isChecked ? "" : cat.id)}
                className="h-4 w-4"
              />
              <span className="text-gray-700">{name}</span>
            </div>
            {count !== undefined && count > 0 && (
              <span className="text-xs text-gray-400">{count}</span>
            )}
          </label>
        );
      })}
    </div>
  );
}
