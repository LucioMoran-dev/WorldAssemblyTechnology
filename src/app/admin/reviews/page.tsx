"use client";

import { Search, Eye, Trash2, Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function AdminReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("");

  const reviews = [
    {
      id: "1",
      user: { name: "Juan Pérez", email: "juan@example.com" },
      product: { id: "p1", name: "MSI MEG Trident X" },
      rating: 5,
      message:
        "Excelente producto, superó mis expectativas. La calidad es increíble y el rendimiento es brutal.",
      isVisible: true,
      createdAt: "2025-01-15T10:30:00Z",
    },
    {
      id: "2",
      user: { name: "María García", email: "maria@example.com" },
      product: { id: "p2", name: "ASUS ROG Strix G15" },
      rating: 4,
      message: "Muy buena laptop, aunque el ventilador hace un poco de ruido.",
      isVisible: true,
      createdAt: "2025-01-14T15:20:00Z",
    },
    {
      id: "3",
      user: { name: "Carlos López", email: "carlos@example.com" },
      product: { id: "p1", name: "MSI MEG Trident X" },
      rating: 3,
      message: "Buen producto pero el precio es muy alto.",
      isVisible: false,
      createdAt: "2025-01-13T09:15:00Z",
    },
  ];

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
              placeholder="Buscar por usuario o producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
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
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.user.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {review.user.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {review.product.name}
                  </td>
                  <td className="px-6 py-4">{renderStars(review.rating)}</td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 max-w-xs text-sm text-gray-600">
                      {review.message}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString("es-AR")}
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
                      <button className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-600">Mostrando 1-3 de 128 reseñas</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
