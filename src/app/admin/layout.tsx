"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminGuard } from "@/components/guards/admin-guard";
import Footer from "@/components/home/footer/footer";
import Header from "@/components/home/header/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const routeNames: Record<string, string> = {
    "/admin": "Panel de Administración",
    "/admin/products": "Gestión de Productos",
    "/admin/orders": "Gestión de Órdenes",
    "/admin/users": "Gestión de Usuarios",
    "/admin/categories": "Gestión de Categorías",
    "/admin/reviews": "Gestión de Reseñas",
    "/admin/settings": "Configuración",
  };

  // Generar breadcrumb basado en la ruta
  const getBreadcrumb = () => {
    const breadcrumbs = [{ name: "Inicio", href: "/" }];

    if (pathname.startsWith("/admin")) {
      breadcrumbs.push({ name: "Panel de Administración", href: "/admin" });

      // Si no es la página principal del admin, agregar la página específica
      if (pathname !== "/admin") {
        const pageName = routeNames[pathname] || "Página";
        breadcrumbs.push({ name: pageName, href: pathname });
      }
    }

    return breadcrumbs;
  };

  return (
    <AdminGuard>
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
              <AdminSidebar />
              <div>{children}</div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AdminGuard>
  );
}
