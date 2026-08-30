"use client";

import { Plus, Edit, Trash2, FolderTree } from "lucide-react";
import { useState, Suspense } from "react";

import { FiltersPanel } from "@/components/filters/filters-panel";
import { Pagination } from "@/components/filters/pagination";
import { SearchInput } from "@/components/filters/search-input";
import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useFilters,
} from "@/hooks";
import type { ICreateCategoryDto, IUpdateCategoryDto } from "@/types";

function AdminCategoriesContent() {
  const {
    filters,
    page,
    limit,
    setFilter,
    setPage,
    clearAllFilters,
    activeFilterCount,
  } = useFilters({
    defaults: { category: "" },
    defaultLimit: 12,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
    description?: string;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [formData, setFormData] = useState<ICreateCategoryDto>({
    name: "",
    description: "",
  });

  const { data: categoriesData, isLoading } = useCategories({
    page,
    limit,
    category: filters.category || undefined,
  });

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const categories = categoriesData?.items ?? [];

  const resetForm = () => setFormData({ name: "", description: "" });

  const closeFormDialog = () => {
    setIsCreateModalOpen(false);
    setEditingCategory(null);
    resetForm();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    await createCategory.mutateAsync(formData);
    closeFormDialog();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !formData.name.trim()) return;
    await updateCategory.mutateAsync({
      id: editingCategory.id,
      data: formData as IUpdateCategoryDto,
    });
    closeFormDialog();
  };

  const handleDelete = (id: string, name: string) =>
    setDeleteTarget({ id, name });

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteCategory.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  const isFormDialogOpen = isCreateModalOpen || Boolean(editingCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Gestión de Categorias
        </h1>
        <Button
          onClick={() => {
            resetForm();
            setEditingCategory(null);
            setIsCreateModalOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Crear Categoria
        </Button>
      </div>

      <FiltersPanel
        activeCount={activeFilterCount}
        onClearAll={clearAllFilters}
      >
        <SearchInput
          value={filters.category ?? ""}
          onChange={(v) => setFilter("category", v)}
          placeholder="Buscar categorias..."
          className="min-w-50 flex-1"
        />
      </FiltersPanel>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : categories.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <FolderTree className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsCreateModalOpen(false);
                        setEditingCategory(category);
                        setFormData({
                          name: category.category_name || category.name,
                          description: category.description,
                        });
                      }}
                      className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                      title="Editar categoria"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          category.id,
                          category.category_name || category.name
                        )
                      }
                      disabled={deleteCategory.isPending}
                      className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                      title="Eliminar categoria"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {category.category_name || category.name || "Sin nombre"}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {category.description || "Sin descripcion"}
                </p>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {category.products?.length || 0}
                    </span>{" "}
                    productos
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            page={page}
            pages={categoriesData?.pages ?? 1}
            total={categoriesData?.total ?? 0}
            itemsShown={categories.length}
            onPageChange={setPage}
            itemLabel="categorias"
            isLoading={isLoading}
          />
        </>
      ) : (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <FolderTree className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No hay categorias
          </h3>
          <p className="mb-6 text-muted-foreground">
            Crea tu primera categoria para organizar tus productos
          </p>
        </div>
      )}

      <Dialog
        open={isFormDialogOpen}
        onOpenChange={(open) => {
          if (!open) closeFormDialog();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Editar Categoria" : "Crear Nueva Categoria"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Actualiza el nombre y la descripcion de la categoria."
                : "Carga los datos para crear una categoria nueva."}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={editingCategory ? handleUpdate : handleCreate}
            className="space-y-4"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-muted-foreground">
                Nombre *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-border px-4 py-2 focus:ring-2 focus:ring-ring focus:outline-none"
                placeholder="Ej: Laptops"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-muted-foreground">
                Descripcion
              </label>
              <textarea
                rows={3}
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full rounded-lg border border-border px-4 py-2 focus:ring-2 focus:ring-ring focus:outline-none"
                placeholder="Descripcion de la categoria..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={closeFormDialog}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={createCategory.isPending || updateCategory.isPending}
              >
                {editingCategory ? "Actualizar" : "Crear"} Categoria
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ActionDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Eliminar categoria"
        description={
          deleteTarget
            ? `Se eliminara la categoria "${deleteTarget.name}".`
            : undefined
        }
        confirmLabel="Eliminar"
        variant="destructive"
        isPending={deleteCategory.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default function AdminCategoriesPage() {
  return (
    <Suspense
      fallback={<div className="p-6 text-muted-foreground">Cargando...</div>}
    >
      <AdminCategoriesContent />
    </Suspense>
  );
}
