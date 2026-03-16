"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { dashboardMenuItems } from "@/seeds";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="overflow-hidden rounded-lg border border-border bg-card">
      <nav className="flex flex-col">
        {dashboardMenuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-6 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-4 border-blue-600 bg-blue-50 text-blue-600"
                  : "border-l-4 border-transparent text-muted-foreground hover:bg-muted/40",
                index !== 0 && "border-t border-border"
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

