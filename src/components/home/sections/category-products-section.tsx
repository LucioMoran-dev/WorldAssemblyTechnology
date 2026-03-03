"use client";

import { useProducts } from "@/hooks";
import { mapProductToCardProps } from "@/lib/mappers";

import { CategoryCard } from "../category-card";
import { ProductCarousel } from "../product-carousel";

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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="lg:w-60 lg:flex-shrink-0">
              <div className="h-64 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex-1 min-w-0 py-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-96 animate-pulse rounded bg-gray-200"
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
  const mappedProducts = products.map((product) =>
    mapProductToCardProps(product)
  );

  return (
    <section className={`border-b border-gray-200 ${bgClass} py-12`} style={{ overflowX: "clip", overflowY: "visible" }}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="lg:w-60 lg:flex-shrink-0" style={{ position: "relative", zIndex: 30 }}>
            <CategoryCard
              imageSrc={categoryImage}
              imageAlt={categoryAlt}
              title={categoryTitle}
            />
          </div>
          <div className="flex-1 min-w-0">
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
