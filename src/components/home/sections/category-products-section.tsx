"use client";

import { useProducts } from "@/hooks";
import { mapProductToCardProps } from "@/lib/mappers";

import { CategoryCard } from "../category-card";
import { ProductCard } from "../product-card";

interface CategoryProductsSectionProps {
  categoryImage: string;
  categoryAlt: string;
  categoryTitle: string;
  categoryFilter?: string;
  bgColor?: "white" | "gray";
  limit?: number;
}

export function CategoryProductsSection({
  categoryImage,
  categoryAlt,
  categoryTitle,
  categoryFilter,
  bgColor = "white",
  limit = 10,
}: CategoryProductsSectionProps) {
  const { data, isLoading } = useProducts({
    limit,
    brand: categoryFilter,
  });

  const bgClass = bgColor === "gray" ? "bg-gray-50" : "bg-white";

  if (isLoading) {
    return (
      <section className={`border-b border-gray-200 ${bgClass} py-12`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <div className="h-64 animate-pulse rounded bg-gray-200" />
            <div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[...Array(limit)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded bg-gray-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const products = data?.items || [];

  return (
    <section className={`border-b border-gray-200 ${bgClass} py-12`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <CategoryCard
            imageSrc={categoryImage}
            imageAlt={categoryAlt}
            title={categoryTitle}
          />
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...mapProductToCardProps(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
