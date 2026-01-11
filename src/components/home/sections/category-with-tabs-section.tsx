"use client";

import { useProducts } from "@/hooks";
import { mapProductToCardProps } from "@/lib/mappers";

import { CategoryCard } from "../category-card";
import { ProductSectionWithTabs } from "../product-section-with-tabs";

interface CategoryWithTabsSectionProps {
  categoryImage: string;
  categoryAlt: string;
  categoryTitle: string;
  tabs: string[];
  defaultTab: string;
  bgColor?: "white" | "gray";
  limit?: number;
}

export function CategoryWithTabsSection({
  categoryImage,
  categoryAlt,
  categoryTitle,
  tabs,
  defaultTab,
  bgColor = "white",
  limit = 10,
}: CategoryWithTabsSectionProps) {
  const { data, isLoading } = useProducts({ limit });

  const bgClass = bgColor === "gray" ? "bg-gray-50" : "bg-white";

  if (isLoading) {
    return (
      <section className={`border-b border-gray-200 ${bgClass} py-12`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <div className="h-64 animate-pulse rounded bg-gray-200" />
            <div className="space-y-4">
              <div className="flex gap-2">
                {tabs.map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-32 animate-pulse rounded bg-gray-200"
                  />
                ))}
              </div>
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
  const mappedProducts = products.map((product) =>
    mapProductToCardProps(product)
  );

  return (
    <section className={`border-b border-gray-200 ${bgClass} py-12`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <CategoryCard
            imageSrc={categoryImage}
            imageAlt={categoryAlt}
            title={categoryTitle}
          />
          <ProductSectionWithTabs
            tabs={tabs}
            products={mappedProducts}
            defaultTab={defaultTab}
          />
        </div>
      </div>
    </section>
  );
}
