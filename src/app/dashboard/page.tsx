"use client"

import { Headphones, User, Tag } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Mi Panel</h1>

      {/* Información de Cuenta */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Información de Cuenta</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Información de Contacto */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Información de Contacto</h3>
            <p className="text-gray-700 mb-1">Alex Driver</p>
            <p className="text-gray-600 mb-4">ExampleAddress@gmail.com</p>
            <div className="flex gap-4 text-sm">
              <Link href="/dashboard/account-info" className="text-blue-600 hover:underline">
                Editar
              </Link>
              <Link href="/dashboard/account-info" className="text-blue-600 hover:underline">
                Cambiar Contraseña
              </Link>
            </div>
          </div>

          {/* Boletines */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Boletines</h3>
            <p className="text-gray-600 mb-4">No estás suscrito a nuestro boletín.</p>
            <Link href="/dashboard/newsletter" className="text-sm text-blue-600 hover:underline">
              Editar
            </Link>
          </div>
        </div>
      </section>

      {/* Libreta de Direcciones */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Libreta de Direcciones</h2>
          <Link href="/dashboard/addresses" className="text-sm text-blue-600 hover:underline">
            Administrar Direcciones
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Dirección de Facturación Predeterminada */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Dirección de Facturación Predeterminada</h3>
            <p className="text-gray-600 mb-4">No has establecido una dirección de facturación predeterminada.</p>
            <Link href="/dashboard/addresses" className="text-sm text-blue-600 hover:underline">
              Editar Dirección
            </Link>
          </div>

          {/* Dirección de Envío Predeterminada */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Dirección de Envío Predeterminada</h3>
            <p className="text-gray-600 mb-4">No has establecido una dirección de envío predeterminada.</p>
            <Link href="/dashboard/addresses" className="text-sm text-blue-600 hover:underline">
              Editar Dirección
            </Link>
          </div>
        </div>
      </section>

      {/* Comparar Productos */}
      <section className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Comparar Productos</h2>
        <p className="text-gray-600">No tienes productos para comparar.</p>
      </section>

      {/* Mi Lista de Deseos */}
      <section className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Mi Lista de Deseos</h2>
        <p className="text-gray-600">No tienes productos en tu lista de deseos.</p>
      </section>

      {/* Características */}
      <section className="bg-gray-50 -mx-4 px-4 py-12 mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Soporte de Producto</h3>
            <p className="text-sm text-gray-600">Hasta 3 años de garantía en sitio disponible para tu tranquilidad.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Cuenta Personal</h3>
            <p className="text-sm text-gray-600">
              Con grandes descuentos, envío gratis y un especialista de soporte dedicado.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Ahorros Increíbles</h3>
            <p className="text-sm text-gray-600">
              Hasta 70% de descuento en productos nuevos, puedes estar seguro del mejor precio.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
