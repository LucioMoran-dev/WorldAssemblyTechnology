"use client";

import { Headphones, User, Tag } from "lucide-react";
import Link from "next/link";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-gray-900">Mi Panel</span>
          </div>
        </div>
      </div>

      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Mi Panel</h1>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <DashboardSidebar />

            <div className="space-y-8">
              {/* Información de Cuenta */}
              <section>
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Información de Cuenta
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Información de Contacto */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h3 className="mb-4 font-semibold text-gray-900">
                      Información de Contacto
                    </h3>
                    <p className="mb-1 text-gray-700">Alex Driver</p>
                    <p className="mb-4 text-gray-600">
                      ExampleAddress@gmail.com
                    </p>
                    <div className="flex gap-4 text-sm">
                      <Link
                        href="/dashboard/edit"
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <Link
                        href="/dashboard/change-password"
                        className="text-blue-600 hover:underline"
                      >
                        Cambiar Contraseña
                      </Link>
                    </div>
                  </div>

                  {/* Boletines */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h3 className="mb-4 font-semibold text-gray-900">
                      Boletines
                    </h3>
                    <p className="mb-4 text-gray-600">
                      No estás suscrito a nuestro boletín.
                    </p>
                    <Link
                      href="/dashboard/newsletter"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              </section>

              {/* Libreta de Direcciones */}
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Libreta de Direcciones
                  </h2>
                  <Link
                    href="/dashboard/addresses"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Administrar Direcciones
                  </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Dirección de Facturación Predeterminada */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h3 className="mb-4 font-semibold text-gray-900">
                      Dirección de Facturación Predeterminada
                    </h3>
                    <p className="mb-4 text-gray-600">
                      No has establecido una dirección de facturación
                      predeterminada.
                    </p>
                    <Link
                      href="/dashboard/addresses/billing"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Editar Dirección
                    </Link>
                  </div>

                  {/* Dirección de Envío Predeterminada */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h3 className="mb-4 font-semibold text-gray-900">
                      Dirección de Envío Predeterminada
                    </h3>
                    <p className="mb-4 text-gray-600">
                      No has establecido una dirección de envío predeterminada.
                    </p>
                    <Link
                      href="/dashboard/addresses/shipping"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Editar Dirección
                    </Link>
                  </div>
                </div>
              </section>

              {/* Comparar Productos */}
              <section className="rounded-lg border border-gray-200 p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Comparar Productos
                </h2>
                <p className="text-gray-600">
                  No tienes productos para comparar.
                </p>
              </section>

              {/* Mi Lista de Deseos */}
              <section className="rounded-lg border border-gray-200 p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Mi Lista de Deseos
                </h2>
                <p className="text-gray-600">
                  No tienes productos en tu lista de deseos.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Soporte de Producto */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">
                Soporte de Producto
              </h3>
              <p className="text-sm text-gray-600">
                Hasta 3 años de garantía en sitio disponible para tu
                tranquilidad.
              </p>
            </div>

            {/* Cuenta Personal */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">Cuenta Personal</h3>
              <p className="text-sm text-gray-600">
                Con grandes descuentos, envío gratis y un especialista de
                soporte dedicado.
              </p>
            </div>

            {/* Ahorros Increíbles */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <Tag className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">
                Ahorros Increíbles
              </h3>
              <p className="text-sm text-gray-600">
                Hasta 70% de descuento en productos nuevos, puedes estar seguro
                del mejor precio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
