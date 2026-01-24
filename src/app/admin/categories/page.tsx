"use client";

import { Plus, Search, Edit, Trash2, FolderTree } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks";
import type { ICreateCategoryDto, IUpdateCategoryDto } from "@/types";

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
    description?: string;
  } | null>(null);
  const [formData, setFormData] = useState<ICreateCategoryDto>({
    name: "",
    description: "",
  });

  const { data: categoriesData, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    await createCategory.mutateAsync(formData);
    setFormData({ name: "", description: "" });
    setIsCreateModalOpen(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !formData.name.trim()) return;

    await updateCategory.mutateAsync({
      id: editingCategory.id,
      data: formData as IUpdateCategoryDto,
    });
    setFormData({ name: "", description: "" });
    setEditingCategory(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar la categoría "${name}"?`)) {
      await deleteCategory.mutateAsync(id);
    }
  };

  const filteredCategories = categoriesData?.items.filter((cat) =>
    searchTerm
      ? cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de Categorías
        </h1>
        <Button
          onClick={() => {
            setFormData({ name: "", description: "" });
            setIsCreateModalOpen(true);
          }}
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
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      ) : filteredCategories && filteredCategories.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-blue-50 p-3">
                  <FolderTree className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setFormData({
                        name: category.name,
                        description: category.description,
                      });
                    }}
                    className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id, category.name)}
                    disabled={deleteCategory.isPending}
                    className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                {category.name}
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                {category.description || "Sin descripción"}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {category.products?.length || 0}
                  </span>{" "}
                  productos
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <FolderTree className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No hay categorías
          </h3>
          <p className="mb-6 text-gray-600">
            Crea tu primera categoría para organizar tus productos
          </p>
        </div>
      )}

      {/* Modal de Crear/Editar Categoría */}
      {(isCreateModalOpen || editingCategory) && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
          onClick={() => {
            setIsCreateModalOpen(false);
            setEditingCategory(null);
            setFormData({ name: "", description: "" });
          }}
        >
          <div
            className="w-full max-w-md rounded-lg bg-white p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              {editingCategory ? "Editar Categoría" : "Crear Nueva Categoría"}
            </h2>
            <form
              onSubmit={editingCategory ? handleUpdate : handleCreate}
              className="space-y-4"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ej: Laptops"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Descripción de la categoría..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingCategory(null);
                    setFormData({ name: "", description: "" });
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={
                    createCategory.isPending || updateCategory.isPending
                  }
                >
                  {editingCategory ? "Actualizar" : "Crear"} Categoría
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
