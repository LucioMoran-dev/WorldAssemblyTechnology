"use client"

import { ShoppingCart, Package, Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <div className="text-sm text-gray-600">Última actualización: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Ventas Totales</h3>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$52,340</p>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            +12.5% este mes
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Órdenes</h3>
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">142</p>
          <p className="text-sm text-blue-600 mt-2">28 pendientes</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Productos</h3>
            <Package className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">856</p>
          <p className="text-sm text-orange-600 mt-2 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            12 sin stock
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Usuarios</h3>
            <Users className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">1,234</p>
          <p className="text-sm text-green-600 mt-2">+24 esta semana</p>
        </div>
      </div>

      {/* Órdenes Recientes */}
      <section className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Órdenes Recientes</h2>
          <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
            Ver Todas
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="pb-3 text-sm font-semibold text-gray-700">Orden #</th>
                <th className="pb-3 text-sm font-semibold text-gray-700">Cliente</th>
                <th className="pb-3 text-sm font-semibold text-gray-700">Fecha</th>
                <th className="pb-3 text-sm font-semibold text-gray-700">Total</th>
                <th className="pb-3 text-sm font-semibold text-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#12345", customer: "Juan Pérez", date: "15/12/2025", total: "$1,299.00", status: "Completada" },
                { id: "#12346", customer: "María García", date: "15/12/2025", total: "$899.00", status: "Pendiente" },
                {
                  id: "#12347",
                  customer: "Carlos López",
                  date: "14/12/2025",
                  total: "$1,499.00",
                  status: "En Proceso",
                },
                { id: "#12348", customer: "Ana Martínez", date: "14/12/2025", total: "$699.00", status: "Completada" },
                {
                  id: "#12349",
                  customer: "Luis Rodríguez",
                  date: "13/12/2025",
                  total: "$2,199.00",
                  status: "Pendiente",
                },
              ].map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-4 text-sm text-blue-600 font-medium">{order.id}</td>
                  <td className="py-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="py-4 text-sm text-gray-900 font-medium">{order.total}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Completada"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Productos con Bajo Stock */}
      <section className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Productos con Bajo Stock</h2>
          <Link href="/admin/products" className="text-sm text-blue-600 hover:underline">
            Ver Inventario
          </Link>
        </div>

        <div className="space-y-4">
          {[
            { name: "MSI MEG Trident X", sku: "SKU-001", stock: 3, category: "Desktop PCs" },
            { name: "ASUS ROG Strix Monitor", sku: "SKU-045", stock: 5, category: "Monitores" },
            { name: "Logitech Gaming Mouse", sku: "SKU-123", stock: 8, category: "Accesorios" },
            { name: "Corsair RGB Keyboard", sku: "SKU-234", stock: 4, category: "Accesorios" },
          ].map((product) => (
            <div
              key={product.sku}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">
                  {product.sku} • {product.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-orange-600">{product.stock} unidades</p>
                <Link href="/admin/products" className="text-xs text-blue-600 hover:underline">
                  Reabastecer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accesos Rápidos */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Accesos Rápidos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/admin/products"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <Package className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Agregar Producto</h3>
            <p className="text-sm text-gray-600">Crear un nuevo producto en el catálogo</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <ShoppingCart className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Ver Órdenes</h3>
            <p className="text-sm text-gray-600">Gestionar todas las órdenes de clientes</p>
          </Link>

          <Link
            href="/admin/users"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <Users className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Administrar Usuarios</h3>
            <p className="text-sm text-gray-600">Ver y gestionar cuentas de usuarios</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
