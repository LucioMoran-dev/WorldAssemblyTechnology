"use client";

import { Database, Shield, Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSeedCategories, useSeedProducts } from "@/hooks";

export default function AdminSettingsPage() {
  const { mutate: seedCategories, isPending: isSeedingCategory } =
    useSeedCategories();
  const { mutate: seedProducts, isPending: isSeedingProducts } =
    useSeedProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Configuración del Sistema
        </h1>
      </div>

      {/* Seeders - Solo SUPER_ADMIN */}
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-purple-50 p-2">
            <Database className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Seeders (SUPER_ADMIN)
            </h2>
            <p className="text-sm text-gray-600">
              Precargar datos de prueba en la base de datos
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => seedCategories()}
            disabled={isSeedingCategory}
          >
            <Database
              className={`h-4 w-4 ${isSeedingCategory ? "animate-pulse text-purple-600" : ""}`}
            />
            {isSeedingCategory ? "Cargando..." : "Seed Categorías"}
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => seedProducts()}
            disabled={isSeedingProducts}
          >
            <Database
              className={`h-4 w-4 ${isSeedingProducts ? "animate-pulse text-purple-600" : ""}`}
            />
            {isSeedingProducts ? "Cargando..." : "Seed Productos"}
          </Button>
        </div>
      </section>

      {/* Configuración General - Solo lectura (sin endpoint backend) */}
      <section className="rounded-lg border border-gray-200 bg-white p-6 opacity-60">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Configuración General
            </h2>
            <p className="text-sm text-gray-600">
              Próximamente — Ajustes generales del sistema
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nombre de la Tienda
            </label>
            <input
              type="text"
              defaultValue="TechStore Pro"
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email de Contacto
            </label>
            <input
              type="email"
              defaultValue="shop@email.com"
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Notificaciones - Solo lectura (sin endpoint backend) */}
      <section className="rounded-lg border border-gray-200 bg-white p-6 opacity-60">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-green-50 p-2">
            <Bell className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Notificaciones</h2>
            <p className="text-sm text-gray-600">
              Próximamente — Configurar alertas del sistema
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              disabled
              className="h-4 w-4 rounded text-blue-600"
            />
            <span className="text-sm text-gray-500">
              Notificar nuevas órdenes
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              disabled
              className="h-4 w-4 rounded text-blue-600"
            />
            <span className="text-sm text-gray-500">
              Notificar productos con bajo stock
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              disabled
              className="h-4 w-4 rounded text-blue-600"
            />
            <span className="text-sm text-gray-500">
              Notificar nuevas reseñas
            </span>
          </label>
        </div>
      </section>
    </div>
  );
}
