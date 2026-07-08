"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  getVisibleSpecFilters,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  PROCESSOR_OPTIONS,
  VRAM_OPTIONS,
  SCREEN_SIZE_OPTIONS,
  RESOLUTION_OPTIONS,
  REFRESH_RATE_OPTIONS,
  CONNECTIVITY_OPTIONS,
  CONDITION_OPTIONS,
  SWITCH_OPTIONS,
} from "@/seeds";

import { BooleanToggleFilter } from "./boolean-toggle-filter";
import { BrandFilter } from "./brand-filter";
import { CategoryFilter } from "./category-filter";
import { ColorFilter } from "./color-filter";
import { FilterSection } from "./filter-section";
import { PriceRangeCheckboxFilter } from "./price-range-checkbox-filter";
import { SpecSelectFilter } from "./spec-select-filter";

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
  categorySlug?: string;
}

function SidebarContent({
  filters,
  setFilter,
  setFilters,
  clearAllFilters,
  activeFilterCount,
  showCategories = true,
  showBrands = true,
  categorySlug,
}: FiltersSidebarProps) {
  const visibleSpecs = useMemo(
    () => new Set(getVisibleSpecFilters(categorySlug)),
    [categorySlug]
  );

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

      {/* Categoría — filtra por nombre (?category_name=), no por UUID */}
      {showCategories && (
        <FilterSection title="Categoría">
          <CategoryFilter
            value={filters.category_name ?? ""}
            onChange={(v) => setFilter("category_name", v)}
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

      {/* Disponibilidad */}
      <FilterSection title="Disponibilidad">
        <div className="space-y-3">
          <BooleanToggleFilter
            label="En Stock"
            value={filters.inStock ?? ""}
            onChange={(v) => setFilter("inStock", v)}
          />
          <BooleanToggleFilter
            label="Con Descuento"
            value={filters.discounted ?? ""}
            onChange={(v) => setFilter("discounted", v)}
          />
          <BooleanToggleFilter
            label="Destacados"
            value={filters.featured ?? ""}
            onChange={(v) => setFilter("featured", v)}
          />
        </div>
      </FilterSection>

      {/* ─── Filtros de especificaciones (condicionales por categoría) ─── */}

      {visibleSpecs.has("processor") && (
        <FilterSection title="Procesador" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.processor ?? ""}
            onChange={(v) => setFilter("processor", v)}
            options={PROCESSOR_OPTIONS}
          />
        </FilterSection>
      )}

      {visibleSpecs.has("ram") && (
        <FilterSection title="RAM" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.ram ?? ""}
            onChange={(v) => setFilter("ram", v)}
            options={RAM_OPTIONS}
          />
        </FilterSection>
      )}

      {visibleSpecs.has("storage") && (
        <FilterSection title="Almacenamiento" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.storage ?? ""}
            onChange={(v) => setFilter("storage", v)}
            options={STORAGE_OPTIONS}
          />
        </FilterSection>
      )}

      {visibleSpecs.has("vram") && (
        <FilterSection title="VRAM" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.vram ?? ""}
            onChange={(v) => setFilter("vram", v)}
            options={VRAM_OPTIONS}
          />
        </FilterSection>
      )}

      {visibleSpecs.has("screen_size") && (
        <FilterSection title="Tamaño de Pantalla" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.screen_size ?? ""}
            onChange={(v) => setFilter("screen_size", v)}
            options={SCREEN_SIZE_OPTIONS}
          />
        </FilterSection>
      )}

      {visibleSpecs.has("resolution") && (
        <FilterSection title="Resolución" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.resolution ?? ""}
            onChange={(v) => setFilter("resolution", v)}
            options={RESOLUTION_OPTIONS}
          />
        </FilterSection>
      )}

      {visibleSpecs.has("refresh_rate") && (
        <FilterSection title="Tasa de Refresco" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.refresh_rate ?? ""}
            onChange={(v) => setFilter("refresh_rate", v)}
            options={REFRESH_RATE_OPTIONS}
          />
        </FilterSection>
      )}

      {visibleSpecs.has("connectivity") && (
        <FilterSection title="Conectividad" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.connectivity ?? ""}
            onChange={(v) => setFilter("connectivity", v)}
            options={CONNECTIVITY_OPTIONS}
          />
        </FilterSection>
      )}

      {visibleSpecs.has("switch") && (
        <FilterSection title="Switch (teclados)" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.switch ?? ""}
            onChange={(v) => setFilter("switch", v)}
            options={SWITCH_OPTIONS}
          />
        </FilterSection>
      )}

      {visibleSpecs.has("condition") && (
        <FilterSection title="Condición" defaultOpen={false}>
          <SpecSelectFilter
            value={filters.condition ?? ""}
            onChange={(v) => setFilter("condition", v)}
            options={CONDITION_OPTIONS}
          />
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
      <aside className="hidden shrink-0 lg:block lg:w-64">
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
