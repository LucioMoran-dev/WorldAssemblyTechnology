"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Panel de Cuenta", href: "/dashboard" },
  { label: "Información de Cuenta", href: "/dashboard/account-info" },
  { label: "Libreta de Direcciones", href: "/dashboard/addresses" },
  { label: "Mis Pedidos", href: "/dashboard/orders" },
  { label: "Mis Productos Descargables", href: "/dashboard/downloads" },
  { label: "Métodos de Pago Guardados", href: "/dashboard/payment-methods" },
  { label: "Acuerdos de Facturación", href: "/dashboard/billing" },
  { label: "Mi Lista de Deseos", href: "/dashboard/wishlist" },
  { label: "Mis Reseñas de Productos", href: "/dashboard/reviews" },
  { label: "Suscripciones al Boletín", href: "/dashboard/newsletter" },
];

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
