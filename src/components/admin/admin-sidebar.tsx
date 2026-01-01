"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Star,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Panel Principal", href: "/admin", icon: LayoutDashboard },
  { label: "Gestión de Productos", href: "/admin/products", icon: Package },
  { label: "Gestión de Órdenes", href: "/admin/orders", icon: ShoppingCart },
  { label: "Gestión de Usuarios", href: "/admin/users", icon: Users },
  {
    label: "Gestión de Categorías",
    href: "/admin/categories",
    icon: FolderTree,
  },
  { label: "Gestión de Reseñas", href: "/admin/reviews", icon: Star },
  { label: "Configuración", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <nav className="flex flex-col">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-4 border-blue-600 bg-blue-50 text-blue-600"
                  : "border-l-4 border-transparent text-gray-700 hover:bg-gray-50",
                index !== 0 && "border-t border-gray-100"
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
