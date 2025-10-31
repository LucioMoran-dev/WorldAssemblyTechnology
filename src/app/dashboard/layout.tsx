"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const routeNames: Record<string, string> = {
    "/dashboard": "Mi Panel",
    "/dashboard/account-info": "Información de Cuenta",
    "/dashboard/addresses": "Libreta de Direcciones",
    "/dashboard/orders": "Mis Pedidos",
    "/dashboard/downloads": "Mis Productos Descargables",
    "/dashboard/payment-methods": "Métodos de Pago Guardados",
    "/dashboard/billing": "Acuerdos de Facturación",
    "/dashboard/wishlist": "Mi Lista de Deseos",
    "/dashboard/reviews": "Mis Reseñas de Productos",
    "/dashboard/newsletter": "Suscripciones al Boletín",
  };

  // Generar breadcrumb basado en la ruta
  const getBreadcrumb = () => {
    const breadcrumbs = [{ name: "Inicio", href: "/" }];

    if (pathname.startsWith("/dashboard")) {
      breadcrumbs.push({ name: "Mi Panel", href: "/dashboard" });

      // Si no es la página principal del dashboard, agregar la página específica
      if (pathname !== "/dashboard") {
        const pageName = routeNames[pathname] || "Página";
        breadcrumbs.push({ name: pageName, href: pathname });
      }
    }

    return breadcrumbs;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {getBreadcrumb().map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {index === getBreadcrumb().length - 1 ? (
                  <span className="text-gray-900">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-blue-600">
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <DashboardSidebar />
            <div>{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
