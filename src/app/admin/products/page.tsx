"use client";

import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useProducts, useDeleteProduct } from "@/hooks";

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data: productsData, isLoading } = useProducts({
    page,
    limit: 10,
    name: searchTerm || undefined,
  });

  const deleteProduct = useDeleteProduct();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto "${name}"?`)) {
      await deleteProduct.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de Productos
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Agregar Producto
        </Button>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Todas las Categorías</option>
            <option value="laptops">Laptops</option>
            <option value="desktops">Desktop PCs</option>
            <option value="components">Componentes</option>
          </select>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Estado
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
              ) : productsData && productsData.items.length > 0 ? (
                productsData.items
                  .filter((product) =>
                    categoryFilter
                      ? product.category?.name
                          ?.toLowerCase()
                          .includes(categoryFilter.toLowerCase())
                      : true
                  )
                  .map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-200">
                            {product.imgUrls?.[0] ? (
                              <Image
                                src={product.imgUrls[0]}
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-xs text-gray-500">IMG</span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {product.model || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.brand}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.category?.name || "Sin categoría"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        ${product.basePrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-medium ${
                            product.baseStock === 0
                              ? "text-red-600"
                              : product.baseStock < 10
                                ? "text-orange-600"
                                : "text-green-600"
                          }`}
                        >
                          {product.baseStock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            product.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(product.id, product.name)
                            }
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
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-600"
                  >
                    No se encontraron productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-600">
            Mostrando {productsData?.items.length || 0} de{" "}
            {productsData?.total || 0} productos
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
              disabled={
                !productsData || page >= productsData.pages || isLoading
              }
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
