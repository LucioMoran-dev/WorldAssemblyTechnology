"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import Footer from "@/components/home/footer/footer";
import Header from "@/components/home/header/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Configuración de nombres de rutas
  const routeNames: Record<string, string> = {
    "/products": "Productos",
    "/about": "Sobre Nosotros",
    "/contact": "Contacto",
    "/cart": "Carrito de Compras",
    "/cart/checkout": "Proceso de Pago",
    "/help": "Ayuda",
    "/terms": "Términos y Condiciones",
    "/privacy": "Política de Privacidad",
    "/auth": "Autenticación",
    "/auth/signin": "Iniciar Sesión",
    "/auth/signup": "Registrarse",
  };

  // Función para generar breadcrumbs
  const getBreadcrumbs = () => {
    const breadcrumbs = [{ name: "Inicio", href: "/" }];

    // Si estamos en la home, no mostrar breadcrumb
    if (pathname === "/" || pathname === "/(main)") {
      return [];
    }

    // Dividir la ruta en segmentos
    const segments = pathname.split("/").filter(Boolean);

    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Verificar si es una ruta de producto con ID
      if (segments[index - 1] === "product" && !isNaN(Number(segment))) {
        breadcrumbs.push({
          name: "Detalle del Producto",
          href: currentPath,
        });
      } else {
        // Usar nombre personalizado o convertir el segmento
        const name =
          routeNames[currentPath] ||
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

        breadcrumbs.push({
          name,
          href: currentPath,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const showBreadcrumb = breadcrumbs.length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Breadcrumb */}
      {showBreadcrumb && (
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight className="h-4 w-4" />}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-gray-900">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-blue-600"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
