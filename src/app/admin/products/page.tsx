"use client";

import { Plus, Edit, Trash2, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, Suspense } from "react";

import { BooleanToggleFilter } from "@/components/filters/boolean-toggle-filter";
import { ColorFilter } from "@/components/filters/color-filter";
import { EnumSelectFilter } from "@/components/filters/enum-select-filter";
import { FilterSection } from "@/components/filters/filter-section";
import { FiltersPanel } from "@/components/filters/filters-panel";
import { Pagination } from "@/components/filters/pagination";
import { PriceRangeFilter } from "@/components/filters/price-range-filter";
import { SearchInput } from "@/components/filters/search-input";
import { SpecSelectFilter } from "@/components/filters/spec-select-filter";
import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import {
  useProducts,
  useDeleteProduct,
  useReactivateProduct,
  useCategories,
  useFilters,
} from "@/hooks";
import {
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
import type { IProduct } from "@/types";

import { ProductFormDialog } from "./product-form-dialog";

function AdminProductsContent() {
  const {
    filters,
    page,
    limit,
    setFilter,
    setPage,
    clearAllFilters,
    activeFilterCount,
  } = useFilters({
    defaults: {
      name: "",
      category_name: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      color: "",
      featured: "",
      inStock: "",
      discounted: "",
      isActive: "",
      ram: "",
      storage: "",
      processor: "",
      vram: "",
      screen_size: "",
      resolution: "",
      refresh_rate: "",
      connectivity: "",
      condition: "",
      switch: "",
    },
    defaultLimit: 10,
  });

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  // Categorías para el dropdown. El value es el NOMBRE: el back filtra por
  // ?category_name= (el viejo categoryId da 400)
  const { data: categoriesData } = useCategories({ limit: 100 });
  const categoryOptions = (categoriesData?.items ?? []).map((cat) => {
    const name = cat.category_name || cat.name || cat.id;
    return { value: name, label: name };
  });

  const { data: productsData, isLoading } = useProducts({
    page,
    limit,
    name: filters.name || undefined,
    category_name: filters.category_name || undefined,
    brand: filters.brand || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    color: filters.color || undefined,
    ram: filters.ram || undefined,
    storage: filters.storage || undefined,
    processor: filters.processor || undefined,
    vram: filters.vram || undefined,
    screen_size: filters.screen_size || undefined,
    resolution: filters.resolution || undefined,
    refresh_rate: filters.refresh_rate || undefined,
    connectivity: filters.connectivity || undefined,
    condition: filters.condition || undefined,
    switch: filters.switch || undefined,
    inStock: filters.inStock === "true" ? true : undefined,
    discounted: filters.discounted === "true" ? true : undefined,
    featured: filters.featured === "true" ? true : undefined,
    isActive:
      filters.isActive === "true"
        ? true
        : filters.isActive === "false"
          ? false
          : undefined,
  });

  const deleteProduct = useDeleteProduct();
  const reactivateProduct = useReactivateProduct();

  const handleDelete = (id: string, name: string) =>
    setDeleteTarget({ id, name });

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch {
      // el hook ya muestra el toast de error; dejamos el diálogo abierto para reintentar
    }
  };

  const handleReactivate = (id: string) => {
    reactivateProduct.mutate(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-3xl font-bold">
          Gestión de Productos
        </h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setEditingProduct(null);
            setIsCreateModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Agregar Producto
        </Button>
      </div>

      <FiltersPanel
        activeCount={activeFilterCount}
        onClearAll={clearAllFilters}
      >
        <SearchInput
          value={filters.name ?? ""}
          onChange={(v) => setFilter("name", v)}
          placeholder="Buscar productos..."
          className="min-w-200px flex-1"
        />
        <SearchInput
          value={filters.brand ?? ""}
          onChange={(v) => setFilter("brand", v)}
          placeholder="Filtrar por marca..."
          className="min-w-150px"
        />
        <EnumSelectFilter
          value={filters.category_name ?? ""}
          onChange={(v) => setFilter("category_name", v)}
          options={categoryOptions}
          placeholder="Todas las Categorias"
        />
        <EnumSelectFilter
          value={filters.isActive ?? ""}
          onChange={(v) => setFilter("isActive", v)}
          options={[
            { value: "true", label: "Activos" },
            { value: "false", label: "Inactivos" },
          ]}
          placeholder="Todos los estados"
        />
        <PriceRangeFilter
          minPrice={filters.minPrice ?? ""}
          maxPrice={filters.maxPrice ?? ""}
          onMinChange={(v) => setFilter("minPrice", v)}
          onMaxChange={(v) => setFilter("maxPrice", v)}
        />
        <BooleanToggleFilter
          label="Destacados"
          value={filters.featured ?? ""}
          onChange={(v) => setFilter("featured", v)}
        />
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

        <div className="w-full">
          <FilterSection
            title="Filtros avanzados (variantes)"
            defaultOpen={false}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  Color
                </p>
                <ColorFilter
                  value={filters.color ?? ""}
                  onChange={(v) => setFilter("color", v)}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  RAM
                </p>
                <SpecSelectFilter
                  value={filters.ram ?? ""}
                  onChange={(v) => setFilter("ram", v)}
                  options={RAM_OPTIONS}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  Almacenamiento
                </p>
                <SpecSelectFilter
                  value={filters.storage ?? ""}
                  onChange={(v) => setFilter("storage", v)}
                  options={STORAGE_OPTIONS}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  Procesador
                </p>
                <SpecSelectFilter
                  value={filters.processor ?? ""}
                  onChange={(v) => setFilter("processor", v)}
                  options={PROCESSOR_OPTIONS}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  VRAM
                </p>
                <SpecSelectFilter
                  value={filters.vram ?? ""}
                  onChange={(v) => setFilter("vram", v)}
                  options={VRAM_OPTIONS}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  Tamaño de Pantalla
                </p>
                <SpecSelectFilter
                  value={filters.screen_size ?? ""}
                  onChange={(v) => setFilter("screen_size", v)}
                  options={SCREEN_SIZE_OPTIONS}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  Resolución
                </p>
                <SpecSelectFilter
                  value={filters.resolution ?? ""}
                  onChange={(v) => setFilter("resolution", v)}
                  options={RESOLUTION_OPTIONS}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  Tasa de Refresco
                </p>
                <SpecSelectFilter
                  value={filters.refresh_rate ?? ""}
                  onChange={(v) => setFilter("refresh_rate", v)}
                  options={REFRESH_RATE_OPTIONS}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  Conectividad
                </p>
                <SpecSelectFilter
                  value={filters.connectivity ?? ""}
                  onChange={(v) => setFilter("connectivity", v)}
                  options={CONNECTIVITY_OPTIONS}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  Condición
                </p>
                <SpecSelectFilter
                  value={filters.condition ?? ""}
                  onChange={(v) => setFilter("condition", v)}
                  options={CONDITION_OPTIONS}
                />
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-semibold">
                  Switch (teclados)
                </p>
                <SpecSelectFilter
                  value={filters.switch ?? ""}
                  onChange={(v) => setFilter("switch", v)}
                  options={SWITCH_OPTIONS}
                />
              </div>
            </div>
          </FilterSection>
        </div>
      </FiltersPanel>

      <div className="border-border bg-card overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-border bg-muted/40 border-b">
              <tr>
                <th className="text-muted-foreground px-6 py-3 text-left text-sm font-semibold">
                  Producto
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-sm font-semibold">
                  Marca
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-sm font-semibold">
                  Categoria
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-sm font-semibold">
                  Precio
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-sm font-semibold">
                  Stock
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-sm font-semibold">
                  Estado
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-sm font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-border border-b">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="bg-muted h-12 animate-pulse rounded" />
                    </td>
                  </tr>
                ))
              ) : productsData && productsData.items.length > 0 ? (
                productsData.items.map((product) => (
                  <tr
                    key={product.id}
                    className="border-border hover:bg-muted/40 border-b transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg">
                          {product.imgUrls?.[0] ? (
                            <Image
                              src={product.imgUrls[0]}
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-muted-foreground text-xs">
                              IMG
                            </span>
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/products/${product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary font-medium hover:underline"
                            title="Ver como lo ve el cliente (nueva pestaña)"
                          >
                            {product.name}
                          </Link>
                          <p className="text-muted-foreground text-xs">
                            {product.model || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted-foreground px-6 py-4 text-sm">
                      {product.brand}
                    </td>
                    <td className="text-muted-foreground px-6 py-4 text-sm">
                      {product.category_name ||
                        product.category?.category_name ||
                        product.category?.name ||
                        "Sin categoria"}
                    </td>
                    <td className="text-foreground px-6 py-4 text-sm font-medium">
                      ${product.basePrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {/* Stock efectivo: con variantes el stock real viene en totalStock */}
                      <span
                        className={`text-sm font-medium ${(product.totalStock ?? product.baseStock) === 0 ? "text-red-600" : (product.totalStock ?? product.baseStock) < 10 ? "text-orange-600" : "text-green-600"}`}
                      >
                        {product.totalStock ?? product.baseStock} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${product.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {product.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsCreateModalOpen(false);
                            setEditingProduct(product);
                          }}
                          className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                          title="Editar producto"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {product.isActive ? (
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            disabled={deleteProduct.isPending}
                            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                            title="Desactivar producto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReactivate(product.id)}
                            disabled={reactivateProduct.isPending}
                            className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50 disabled:opacity-50"
                            title="Reactivar producto"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-muted-foreground px-6 py-12 text-center"
                  >
                    No se encontraron productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pages={productsData?.pages ?? 1}
          total={productsData?.total ?? 0}
          itemsShown={productsData?.items.length ?? 0}
          onPageChange={setPage}
          itemLabel="productos"
          isLoading={isLoading}
        />
      </div>

      <ActionDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Desactivar producto"
        description={
          deleteTarget
            ? `Se desactivará "${deleteTarget.name}". Podés reactivarlo después desde la lista.`
            : undefined
        }
        confirmLabel="Desactivar"
        variant="destructive"
        isPending={deleteProduct.isPending}
        onConfirm={handleConfirmDelete}
      />

      <ProductFormDialog
        open={isCreateModalOpen || Boolean(editingProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false);
            setEditingProduct(null);
          }
        }}
        editingProduct={editingProduct}
        categories={categoriesData?.items ?? []}
      />
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={<div className="text-muted-foreground p-6">Cargando...</div>}
    >
      <AdminProductsContent />
    </Suspense>
  );
}
