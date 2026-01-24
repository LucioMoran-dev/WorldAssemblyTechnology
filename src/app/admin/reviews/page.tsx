"use client";

import { Search, Eye, EyeOff, Trash2, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  useAllReviews,
  useDeleteReview,
  useToggleReviewVisibility,
} from "@/hooks";

// Helper para formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function AdminReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [page, setPage] = useState(1);

  const { data: reviewsData, isLoading } = useAllReviews({
    page,
    limit: 10,
    rating: filterRating ? parseInt(filterRating) : undefined,
    userName: searchTerm || undefined,
  });
  const deleteReview = useDeleteReview();
  const toggleVisibility = useToggleReviewVisibility();

  const reviews = reviewsData?.items ?? [];
  const totalPages = reviewsData?.pages ?? 1;
  const total = reviewsData?.total ?? 0;

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar esta reseña?")) {
      await deleteReview.mutateAsync(id);
    }
  };

  const handleToggleVisibility = async (id: string) => {
    await toggleVisibility.mutateAsync(id);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Reseñas</h1>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por usuario..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <select
            value={filterRating}
            onChange={(e) => {
              setFilterRating(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Todas las Calificaciones</option>
            <option value="5">5 Estrellas</option>
            <option value="4">4 Estrellas</option>
            <option value="3">3 Estrellas</option>
            <option value="2">2 Estrellas</option>
            <option value="1">1 Estrella</option>
          </select>
        </div>
      </div>

      {/* Tabla de Reviews */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Calificación
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Mensaje
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Visible
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="h-12 animate-pulse rounded bg-gray-200" />
                    </td>
                  </tr>
                ))
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <tr
                    key={review.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {review.user?.name ?? "Usuario desconocido"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {review.user?.email ?? "-"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {review.product?.id ? (
                        <Link
                          href={`/products/${review.product.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {review.product.name}
                        </Link>
                      ) : (
                        <span className="text-gray-500">
                          {review.product?.name ?? "Producto eliminado"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">{renderStars(review.rating)}</td>
                    <td className="px-6 py-4">
                      <p className="line-clamp-2 max-w-xs text-sm text-gray-600">
                        {review.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(review.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          review.isVisible
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {review.isVisible ? "Visible" : "Oculta"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleVisibility(review.id)}
                          disabled={toggleVisibility.isPending}
                          className={`rounded-lg p-2 transition-colors disabled:opacity-50 ${
                            review.isVisible
                              ? "text-orange-600 hover:bg-orange-50"
                              : "text-green-600 hover:bg-green-50"
                          }`}
                          title={
                            review.isVisible ? "Ocultar reseña" : "Mostrar reseña"
                          }
                        >
                          {review.isVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
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
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-600">
                    No se encontraron reseñas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-600">
            Mostrando {reviews.length} de {total} reseñas
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages || isLoading}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
