"use client";

import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, Suspense } from "react";

import { Pagination } from "@/components/filters/pagination";
import { SearchInput } from "@/components/filters/search-input";
import { EnumSelectFilter } from "@/components/filters/enum-select-filter";
import { FiltersPanel } from "@/components/filters/filters-panel";
import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import { useProducts, useDeleteProduct, useCategories, useFilters } from "@/hooks";

function AdminProductsContent() {
  const { filters, page, limit, setFilter, setPage, clearAllFilters, activeFilterCount } = useFilters({
    defaults: { name: "", categoryId: "", brand: "" },
    defaultLimit: 10,
  });

  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  // Load categories for the filter dropdown
  const { data: categoriesData } = useCategories({ limit: 100 });
  const categoryOptions = (categoriesData?.items ?? []).map((cat) => ({
    value: cat.id,
    label: cat.name || cat.category_name || cat.id,
  }));

  const { data: productsData, isLoading } = useProducts({
    page,
    limit,
    name: filters.name || undefined,
    categoryId: filters.categoryId || undefined,
    brand: filters.brand || undefined,
  });

  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: string, name: string) => setDeleteTarget({ id, name });

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteProduct.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gestión de Productos</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Agregar Producto
        </Button>
      </div>

      <FiltersPanel activeCount={activeFilterCount} onClearAll={clearAllFilters}>
        <SearchInput
          value={filters.name ?? ""}
          onChange={(v) => setFilter("name", v)}
          placeholder="Buscar productos..."
          className="min-w-[200px] flex-1"
        />
        <SearchInput
          value={filters.brand ?? ""}
          onChange={(v) => setFilter("brand", v)}
          placeholder="Filtrar por marca..."
          className="min-w-[150px]"
        />
        <EnumSelectFilter
          value={filters.categoryId ?? ""}
          onChange={(v) => setFilter("categoryId", v)}
          options={categoryOptions}
          placeholder="Todas las Categorias"
        />
      </FiltersPanel>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Producto</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Marca</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Categoria</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Precio</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="h-12 animate-pulse rounded bg-muted" />
                    </td>
                  </tr>
                ))
              ) : productsData && productsData.items.length > 0 ? (
                productsData.items.map((product) => (
                  <tr key={product.id} className="border-b border-border transition-colors hover:bg-muted/40">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-muted">
                          {product.imgUrls?.[0] ? (
                            <Image src={product.imgUrls[0]} alt={product.name} fill sizes="48px" className="object-cover" />
                          ) : (
                            <span className="text-xs text-muted-foreground">IMG</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.model || "N/A"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{product.brand}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{product.category?.name || "Sin categoria"}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">${product.basePrice.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${product.baseStock === 0 ? "text-red-600" : product.baseStock < 10 ? "text-orange-600" : "text-green-600"}`}>
                        {product.baseStock} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${product.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {product.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deleteProduct.isPending}
                          className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">No se encontraron productos</td>
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
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title="Eliminar producto"
        description={deleteTarget ? `Se desactivara el producto "${deleteTarget.name}".` : undefined}
        confirmLabel="Eliminar"
        variant="destructive"
        isPending={deleteProduct.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-muted-foreground">Cargando...</div>}>
      <AdminProductsContent />
    </Suspense>
  );
}
