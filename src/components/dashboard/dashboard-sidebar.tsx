"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { menuItems } from "@/seeds";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <nav className="flex flex-col">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-6 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-4 border-blue-600 bg-blue-50 text-blue-600"
                  : "border-l-4 border-transparent text-gray-700 hover:bg-gray-50",
                index !== 0 && "border-t border-gray-100"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
