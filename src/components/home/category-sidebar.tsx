"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Everyday Use Notebooks",
    href: "/category/everyday-notebooks",
    hasSubmenu: true,
  },
  {
    name: "MSI Workstation Series",
    href: "/category/workstation",
    hasSubmenu: true,
  },
  {
    name: "MSI Prestige Series",
    href: "/category/prestige",
    hasSubmenu: false,
  },
  {
    name: "Gaming Notebooks",
    href: "/category/gaming",
    hasSubmenu: false,
  },
  {
    name: "Tablets And Pads",
    href: "/category/tablets",
    hasSubmenu: false,
  },
  {
    name: "Netbooks",
    href: "/category/netbooks",
    hasSubmenu: false,
  },
  {
    name: "Infinity Gaming Notebooks",
    href: "/category/infinity-gaming",
    hasSubmenu: false,
  },
];

export function CategorySidebar() {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="bg-primary text-white px-4 py-3">
        <h2 className="font-bold text-lg">Laptops</h2>
      </div>
      <nav className="divide-y divide-border">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex items-center justify-between px-4 py-3 hover:bg-surface transition-colors group"
          >
            <span className="text-sm font-medium text-foreground group-hover:text-primary">
              {category.name}
            </span>
            {category.hasSubmenu && (
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
