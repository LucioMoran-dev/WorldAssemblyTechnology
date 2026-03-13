"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

import { BrandFilter } from "./brand-filter";
import { CategoryFilter } from "./category-filter";
import { ColorFilter } from "./color-filter";
import { FilterSection } from "./filter-section";
import { PriceRangeCheckboxFilter } from "./price-range-checkbox-filter";

interface FiltersSidebarProps {
  filters: Record<string, string | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilter: (...args: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilters: (partial: any) => void;
  clearAllFilters: () => void;
  activeFilterCount: number;
  showCategories?: boolean;
  showBrands?: boolean;
}

function SidebarContent({
  filters,
  setFilter,
  setFilters,
  clearAllFilters,
  activeFilterCount,
  showCategories = true,
  showBrands = true,
}: FiltersSidebarProps) {
  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Limpiar Filtros
          </button>
        )}
      </div>

      {/* Categoría */}
      {showCategories && (
        <FilterSection title="Categoría">
          <CategoryFilter
            value={filters.categoryId ?? ""}
            onChange={(v) => setFilter("categoryId", v)}
          />
        </FilterSection>
      )}

      {/* Precio */}
      <FilterSection title="Precio">
        <PriceRangeCheckboxFilter
          minPrice={filters.minPrice ?? ""}
          maxPrice={filters.maxPrice ?? ""}
          onChange={(min, max) => setFilters({ minPrice: min, maxPrice: max })}
        />
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color">
        <ColorFilter
          value={filters.color ?? ""}
          onChange={(v) => setFilter("color", v)}
        />
      </FilterSection>

      {/* Marcas */}
      {showBrands && (
        <FilterSection title="Marcas">
          <div className="max-h-72 overflow-y-auto">
            <BrandFilter
              value={filters.brand ?? ""}
              onChange={(v) => setFilter("brand", v)}
            />
          </div>
        </FilterSection>
      )}
    </div>
  );
}

export function FiltersSidebar(props: FiltersSidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden flex-shrink-0 lg:block lg:w-64">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <SidebarContent {...props} />
        </div>
      </aside>

      {/* Mobile trigger */}
      <div className="lg:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {props.activeFilterCount > 0 && (
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
              {props.activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Panel */}
          <div className="absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-white shadow-xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto p-4">
              <SidebarContent {...props} />
            </div>
            {/* Drawer footer */}
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Aplicar Filtros ({props.activeFilterCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
