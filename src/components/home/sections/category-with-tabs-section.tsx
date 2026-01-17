"use client";

import { useState, useCallback } from "react";

import { useProducts } from "@/hooks";
import { mapProductToCardProps } from "@/lib/mappers";

import { CategoryCard } from "../category-card";
import { ProductCarousel } from "../product-carousel";

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
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);
  const { data, isLoading } = useProducts({ limit });

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const bgClass = bgColor === "gray" ? "bg-gray-50" : "bg-white";

  if (isLoading) {
    return (
      <section className={`border-b border-gray-200 ${bgClass} py-12`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="lg:w-60 lg:flex-shrink-0">
              <div className="h-64 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex-1 min-w-0 space-y-4">
              <div className="flex gap-2 overflow-x-auto border-b border-gray-300 pb-3">
                {tabs.map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-32 animate-pulse rounded bg-gray-200"
                  />
                ))}
              </div>
              <div className="py-8">
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
            {/* Tabs */}
            <div className="mb-6 flex gap-4 overflow-x-auto border-b border-gray-300">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-gray-900 text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Product Carousel */}
            <ProductCarousel
              products={mappedProducts}
              sectionId={`category-tabs-${categoryTitle.toLowerCase().replace(/\s+/g, "-")}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
