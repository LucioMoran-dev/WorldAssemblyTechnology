"use client";

import {
  BadgePercent,
  CreditCard,
  FolderTree,
  LayoutDashboard,
  Mail,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Panel Principal", href: "/admin", icon: LayoutDashboard },
  { label: "Gestion de Productos", href: "/admin/products", icon: Package },
  { label: "Gestion de Ordenes", href: "/admin/orders", icon: ShoppingCart },
  { label: "Gestion de Usuarios", href: "/admin/users", icon: Users },
  { label: "Gestion de Categorias", href: "/admin/categories", icon: FolderTree },
  { label: "Gestion de Descuentos", href: "/admin/discounts", icon: BadgePercent },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Reparaciones", href: "/admin/repairs", icon: Wrench },
  { label: "Pagos", href: "/admin/payments", icon: CreditCard },
  { label: "Configuracion", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="overflow-hidden rounded-lg border border-border bg-card">
      <nav className="flex flex-col">
        {menuItems.map((item, index) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-4 border-blue-600 bg-blue-50 text-blue-600"
                  : "border-l-4 border-transparent text-muted-foreground hover:bg-muted/40",
                index !== 0 && "border-t border-border"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

