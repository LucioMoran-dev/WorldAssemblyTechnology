"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useIsAdmin } from "@/hooks";
import { cn } from "@/lib/utils";
import { dashboardMenuItems } from "@/seeds";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isAdmin } = useIsAdmin();

  const menuItems = isAdmin
    ? dashboardMenuItems.filter(
        (item) => item.href === "/dashboard/account-info"
      )
    : dashboardMenuItems;

  return (
    <aside className="overflow-hidden rounded-lg border border-border bg-card">
      <nav className="flex flex-col">
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-2 border-l-4 border-transparent px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Panel Admin
          </Link>
        )}
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
                  : "border-l-4 border-transparent text-muted-foreground hover:bg-muted/40",
                // Con el link "Volver al Panel Admin" arriba, el primer item
                // también necesita separador
                (index !== 0 || isAdmin) && "border-t border-border"
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
