"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { useCategories } from "@/hooks";

export function CategorySidebar() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="border-border overflow-hidden rounded-lg border bg-card">
        <div className="bg-primary px-4 py-3 text-white">
          <h2 className="text-lg font-bold">Categorías</h2>
        </div>
        <div className="divide-border divide-y">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 animate-pulse bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!categories || categories.items.length === 0) {
    return null;
  }

  return (
    <div className="border-border overflow-hidden rounded-lg border bg-card">
      <div className="bg-primary px-4 py-3 text-white">
        <h2 className="text-lg font-bold">Categorías</h2>
      </div>
      <nav className="divide-border divide-y">
        {categories.items.map((category) => {
          const categoryName =
            category.category_name ?? category.name ?? "Sin categoría";
          const categorySlug = categoryName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <Link
              key={category.id}
              href={`/products/catalog/${categorySlug}`}
              className="hover:bg-surface group flex items-center justify-between px-4 py-3 transition-colors"
            >
              <span className="text-foreground group-hover:text-primary text-sm font-medium">
                {categoryName}
              </span>
              <ChevronRight className="text-muted-foreground group-hover:text-primary h-4 w-4" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

