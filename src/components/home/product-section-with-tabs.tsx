"use client";

import { useState, useCallback } from "react";

import { ProductCard } from "./product-card";

import type { IProduct } from "@/types";

interface ProductSectionWithTabsProps {
  tabs: string[];
  products: IProduct[];
  defaultTab?: string;
}

export function ProductSectionWithTabs({
  tabs,
  products,
  defaultTab,
}: ProductSectionWithTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <div>
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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
