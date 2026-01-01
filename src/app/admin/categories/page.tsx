"use client";

import { Plus, Search, Edit, Trash2, FolderTree } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const categories = [
    {
      id: "1",
      name: "Laptops",
      description: "Computadoras portátiles gaming y profesionales",
      productCount: 145,
    },
    {
      id: "2",
      name: "Desktop PCs",
      description: "Computadoras de escritorio de alta gama",
      productCount: 87,
    },
    {
      id: "3",
      name: "Componentes",
      description: "Tarjetas gráficas, RAM, procesadores",
      productCount: 234,
    },
    {
      id: "4",
      name: "Periféricos",
      description: "Teclados, ratones, audífonos gaming",
      productCount: 178,
    },
    {
      id: "5",
      name: "Monitores",
      description: "Pantallas gaming y profesionales",
      productCount: 92,
    },
    {
      id: "6",
      name: "Almacenamiento",
      description: "SSDs, HDDs, NVMe",
      productCount: 67,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de Categorías
        </h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Crear Categoría
        </Button>
      </div>

      {/* Barra de Búsqueda */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid de Categorías */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-blue-50 p-3">
                <FolderTree className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              {category.name}
            </h3>
            <p className="mb-4 text-sm text-gray-600">{category.description}</p>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {category.productCount}
                </span>{" "}
                productos
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Crear Categoría (simulado) */}
      {isCreateModalOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-white p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Crear Nueva Categoría
            </h2>
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ej: Laptops"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Descripción de la categoría..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Crear Categoría
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
