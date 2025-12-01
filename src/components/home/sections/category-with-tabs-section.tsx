import type { IProduct } from "@/types";

import { CategoryCard } from "../category-card";
import { ProductSectionWithTabs } from "../product-section-with-tabs";

interface CategoryWithTabsSectionProps {
  categoryImage: string;
  categoryAlt: string;
  categoryTitle: string;
  tabs: string[];
  defaultTab: string;
  products: IProduct[];
  bgColor?: "white" | "gray";
}

export function CategoryWithTabsSection({
  categoryImage,
  categoryAlt,
  categoryTitle,
  tabs,
  defaultTab,
  products,
  bgColor = "white",
}: CategoryWithTabsSectionProps) {
  const bgClass = bgColor === "gray" ? "bg-gray-50" : "bg-white";

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
            products={products}
            defaultTab={defaultTab}
          />
        </div>
      </div>
    </section>
  );
}
