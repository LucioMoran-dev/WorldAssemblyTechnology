"use client";

import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

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
          <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Todas las Categorías</option>
            <option value="laptops">Laptops</option>
            <option value="desktops">Desktop PCs</option>
            <option value="components">Componentes</option>
          </select>
          <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Todos los Estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="out-of-stock">Sin Stock</option>
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
                  SKU
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
              {[
                {
                  name: "MSI MEG Trident X 10SD-1012AU",
                  sku: "SKU-001",
                  category: "Desktop PCs",
                  price: "$4,349.00",
                  stock: 15,
                  status: "Activo",
                },
                {
                  name: "ASUS ROG Strix G15",
                  sku: "SKU-002",
                  category: "Laptops",
                  price: "$1,299.00",
                  stock: 3,
                  status: "Activo",
                },
                {
                  name: "Corsair Vengeance RGB Pro",
                  sku: "SKU-003",
                  category: "Componentes",
                  price: "$189.00",
                  stock: 0,
                  status: "Sin Stock",
                },
                {
                  name: "Logitech G Pro X Keyboard",
                  sku: "SKU-004",
                  category: "Accesorios",
                  price: "$149.00",
                  stock: 28,
                  status: "Activo",
                },
              ].map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
                        <span className="text-xs text-gray-500">IMG</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock < 10
                            ? "text-orange-600"
                            : "text-green-600"
                      }`}
                    >
                      {product.stock} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        product.status === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                        <Edit className="h-4 w-4" />
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
          <p className="text-sm text-gray-600">
            Mostrando 1-4 de 856 productos
          </p>
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
