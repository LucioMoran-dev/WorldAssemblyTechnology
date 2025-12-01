import type { IProduct } from "@/types";

import { CategoryCard } from "../category-card";
import { ProductCard } from "../product-card";

interface CategoryProductsSectionProps {
  categoryImage: string;
  categoryAlt: string;
  categoryTitle: string;
  products: IProduct[];
  bgColor?: "white" | "gray";
}

export function CategoryProductsSection({
  categoryImage,
  categoryAlt,
  categoryTitle,
  products,
  bgColor = "white",
}: CategoryProductsSectionProps) {
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
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
