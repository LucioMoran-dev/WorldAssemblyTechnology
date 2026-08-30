"use client";

import { useCategories } from "@/hooks";
import { mapProductToCardProps } from "@/lib/mappers";

import { CategoryCard } from "../category-card";
import { ProductCarousel } from "../product-carousel";

interface CategoryProductsSectionProps {
  categoryImage: string;
  categoryAlt: string;
  categoryTitle: string;
  categoryQuery: string;
  bgColor?: "white" | "gray";
  limit?: number;
}

function normalizeCategoryName(value?: string) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function CategoryProductsSection({
  categoryImage,
  categoryAlt,
  categoryTitle,
  categoryQuery,
  bgColor = "white",
  limit = 10,
}: CategoryProductsSectionProps) {
  const { data, isLoading } = useCategories({
    category: categoryQuery,
    page: 1,
    limit: 50,
  });

  const bgClass = bgColor === "gray" ? "bg-muted/40" : "bg-card";
  const normalizedQuery = normalizeCategoryName(categoryQuery);
  const categories = data?.items || [];
  const matchedCategory =
    categories.find(
      (category) =>
        normalizeCategoryName(category.category_name ?? category.name) ===
        normalizedQuery
    ) ||
    categories.find((category) =>
      normalizeCategoryName(category.category_name ?? category.name).includes(
        normalizedQuery
      )
    );
  const products = (matchedCategory?.products || []).slice(0, limit);
  const categorySlug = normalizeCategoryName(
    matchedCategory?.category_name ?? matchedCategory?.name ?? categoryQuery
  );

  if (isLoading) {
    return (
      <section className={`border-b border-border ${bgClass} py-12`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="lg:w-60 lg:flex-shrink-0">
              <div className="h-64 animate-pulse rounded bg-muted" />
            </div>
            <div className="min-w-0 flex-1 py-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-96 animate-pulse rounded bg-muted"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const mappedProducts = products.map((product) =>
    mapProductToCardProps(product)
  );

  return (
    <section
      className={`border-b border-border ${bgClass} py-12`}
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div
            className="lg:w-60 lg:flex-shrink-0"
            style={{ position: "relative", zIndex: 30 }}
          >
            <CategoryCard
              imageSrc={categoryImage}
              imageAlt={categoryAlt}
              title={categoryTitle}
              href={`/products/catalog/${categorySlug}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <ProductCarousel
              products={mappedProducts}
              sectionId={`category-${categoryTitle.toLowerCase().replace(/\s+/g, "-")}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
