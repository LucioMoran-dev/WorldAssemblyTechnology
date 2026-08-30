"use client";

import { Loader2, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Pagination } from "@/components/filters/pagination";
import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteReview, useMyReviews } from "@/hooks";

const PAGE_SIZE = 10;

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-orange-400 text-orange-400"
              : "text-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Mis reseñas (GET /review/my-reviews).
 * Antes era un placeholder porque el back no exponía el endpoint; ahora
 * lista las reseñas propias con paginado y permite borrarlas
 * (DELETE /review/:id acepta al dueño de la reseña).
 */
function MyReviews() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyReviews({ page, limit: PAGE_SIZE });
  const deleteReview = useDeleteReview();

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const reviews = data?.items ?? [];

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteReview.mutateAsync(deleteTarget);
      setDeleteTarget(null);
    } catch {
      // el hook ya muestra el toast; dejamos el diálogo abierto
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <Star className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground">Todavía no escribiste reseñas.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Podés reseñar los productos que compraste desde su página.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/orders">Ver mis pedidos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-lg border border-border bg-card p-6"
        >
          <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
            <div>
              {review.product?.name ? (
                <Link
                  href={`/products/${review.product.id}`}
                  className="font-semibold text-foreground hover:text-blue-600"
                >
                  {review.product.name}
                </Link>
              ) : (
                <p className="font-semibold text-foreground">Producto</p>
              )}
              <p className="text-xs text-muted-foreground">
                {formatDate(review.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={Number(review.rating)} />
              <button
                onClick={() => setDeleteTarget(review.id)}
                disabled={deleteReview.isPending}
                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                title="Eliminar mi reseña"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{review.message}</p>
        </div>
      ))}

      <Pagination
        page={page}
        pages={data?.pages ?? 1}
        total={data?.total ?? 0}
        itemsShown={reviews.length}
        onPageChange={setPage}
        itemLabel="reseñas"
        isLoading={isLoading}
        variant="catalog"
      />

      <ActionDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="¿Eliminar tu reseña?"
        description="Se borrará de forma permanente y dejará de verse en el producto."
        confirmLabel="Eliminar"
        variant="destructive"
        isPending={deleteReview.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default MyReviews;
