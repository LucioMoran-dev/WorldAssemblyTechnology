"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { categories } from "@/seeds";

export function CategorySidebar() {
  return (
    <div className="border-border overflow-hidden rounded-lg border bg-white">
      <div className="bg-primary px-4 py-3 text-white">
        <h2 className="text-lg font-bold">Laptops</h2>
      </div>
      <nav className="divide-border divide-y">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="hover:bg-surface group flex items-center justify-between px-4 py-3 transition-colors"
          >
            <span className="text-foreground group-hover:text-primary text-sm font-medium">
              {category.name}
            </span>
            {category.hasSubmenu && (
              <ChevronRight className="text-muted-foreground group-hover:text-primary h-4 w-4" />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
