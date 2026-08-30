"use client";

import { Eye, EyeOff, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

import { EnumSelectFilter } from "@/components/filters/enum-select-filter";
import { FiltersPanel } from "@/components/filters/filters-panel";
import { Pagination } from "@/components/filters/pagination";
import { SearchInput } from "@/components/filters/search-input";
import { ActionDialog } from "@/components/ui/action-dialog";
import {
  useAllReviews,
  useDeleteReview,
  useToggleReviewVisibility,
  useFilters,
} from "@/hooks";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ratingOptions = [
  { value: "5", label: "5 Estrellas" },
  { value: "4", label: "4 Estrellas" },
  { value: "3", label: "3 Estrellas" },
  { value: "2", label: "2 Estrellas" },
  { value: "1", label: "1 Estrella" },
];

function AdminReviewsContent() {
  const {
    filters,
    page,
    limit,
    setFilter,
    setPage,
    clearAllFilters,
    activeFilterCount,
  } = useFilters({
    defaults: { userName: "", rating: "" },
    defaultLimit: 10,
  });

  // Moderación: dos herramientas con propósitos distintos.
  // - Ocultar (PATCH /review/:id/visibility): reversible, conserva el dato.
  // - Eliminar (DELETE /review/:id): permanente. El back ahora resuelve por
  //   rol y deja que ADMIN/SUPER_ADMIN borre cualquier reseña.
  const { data: reviewsData, isLoading } = useAllReviews({
    page,
    limit,
    rating: filters.rating ? parseInt(filters.rating) : undefined,
    userName: filters.userName || undefined,
  });
  const toggleVisibility = useToggleReviewVisibility();
  const deleteReview = useDeleteReview();

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const reviews = reviewsData?.items ?? [];
  const totalPages = reviewsData?.pages ?? 1;
  const total = reviewsData?.total ?? 0;

  const handleToggleVisibility = async (id: string) => {
    await toggleVisibility.mutateAsync(id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteReview.mutateAsync(deleteTarget);
      setDeleteTarget(null);
    } catch {
      // el hook ya muestra el toast; dejamos el diálogo abierto
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Gestión de Reseñas
        </h1>
      </div>

      <FiltersPanel
        activeCount={activeFilterCount}
        onClearAll={clearAllFilters}
      >
        <SearchInput
          value={filters.userName ?? ""}
          onChange={(v) => setFilter("userName", v)}
          placeholder="Buscar por usuario..."
          className="min-w-50 flex-1"
        />
        <EnumSelectFilter
          value={filters.rating ?? ""}
          onChange={(v) => setFilter("rating", v)}
          options={ratingOptions}
          placeholder="Todas las Calificaciones"
        />
      </FiltersPanel>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Calificacion
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Mensaje
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Visible
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Acciones
                </th>
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
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <tr
                    key={review.id}
                    className="border-b border-border hover:bg-muted/40"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {review.user?.name ?? "Usuario desconocido"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {review.user?.email ?? "-"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {review.product?.id ? (
                        <Link
                          href={`/products/${review.product.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {review.product.name}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">
                          {review.product?.name ?? "Producto eliminado"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">{renderStars(review.rating)}</td>
                    <td className="px-6 py-4">
                      <p className="line-clamp-2 max-w-xs text-sm text-muted-foreground">
                        {review.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${review.isVisible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {review.isVisible ? "Visible" : "Oculta"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleVisibility(review.id)}
                          disabled={toggleVisibility.isPending}
                          className={`rounded-lg p-2 transition-colors disabled:opacity-50 ${review.isVisible ? "text-orange-600 hover:bg-orange-50" : "text-green-600 hover:bg-green-50"}`}
                          title={
                            review.isVisible
                              ? "Ocultar resena"
                              : "Mostrar resena"
                          }
                        >
                          {review.isVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(review.id)}
                          disabled={deleteReview.isPending}
                          className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                          title="Eliminar reseña"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    No se encontraron resenas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pages={totalPages}
          total={total}
          itemsShown={reviews.length}
          onPageChange={setPage}
          itemLabel="resenas"
          isLoading={isLoading}
        />
      </div>

      {/* Borrado permanente. Si la intención es solo sacarla de la vista
          pública, el toggle de visibilidad es la opción reversible. */}
      <ActionDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="¿Eliminar esta reseña?"
        description="Se borra de forma permanente. Si solo querés que deje de verse en el producto, usá el botón de ocultar."
        confirmLabel="Eliminar"
        variant="destructive"
        isPending={deleteReview.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <Suspense
      fallback={<div className="p-6 text-muted-foreground">Cargando...</div>}
    >
      <AdminReviewsContent />
    </Suspense>
  );
}
