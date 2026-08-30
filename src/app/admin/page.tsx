"use client"

import { ShoppingCart, Package, Users, DollarSign, TrendingUp, XCircle } from "lucide-react"
import Link from "next/link"

import { useAllOrders, useOrderStats } from "@/hooks"
import { OrderStatus } from "@/types"

// Helper para formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Helper para traducir estado
const translateStatus = (status: OrderStatus): string => {
  const translations = {
    [OrderStatus.PENDING]: "Pendiente",
    [OrderStatus.PAID]: "Pagada",
    [OrderStatus.PROCESSING]: "En Proceso",
    [OrderStatus.SHIPPED]: "Enviada",
    [OrderStatus.DELIVERED]: "Completada",
    [OrderStatus.CANCELLED]: "Cancelada",
  };
  return translations[status] || status;
};

// Helper para obtener el color del estado
const getStatusColor = (status: OrderStatus): string => {
  const colors = {
    [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-700",
    [OrderStatus.PAID]: "bg-blue-100 text-blue-700",
    [OrderStatus.PROCESSING]: "bg-purple-100 text-purple-700",
    [OrderStatus.SHIPPED]: "bg-indigo-100 text-indigo-700",
    [OrderStatus.DELIVERED]: "bg-green-100 text-green-700",
    [OrderStatus.CANCELLED]: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-muted text-muted-foreground";
};

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useOrderStats();
  const { data: ordersData, isLoading: ordersLoading } = useAllOrders({ limit: 5 });
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
        <div className="text-sm text-muted-foreground">Resumen general</div>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Ventas Totales</h3>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          {statsLoading ? (
            <div className="h-10 animate-pulse rounded bg-muted" />
          ) : (
            <>
              <p className="text-3xl font-bold text-foreground">
                ${stats?.revenue.total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
              </p>
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                ${stats?.revenue.monthly.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'} este mes
              </p>
            </>
          )}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Órdenes</h3>
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </div>
          {statsLoading ? (
            <div className="h-10 animate-pulse rounded bg-muted" />
          ) : (
            <>
              <p className="text-3xl font-bold text-foreground">{stats?.totalOrders || 0}</p>
              <p className="text-sm text-blue-600 mt-2">{stats?.ordersByStatus.pending || 0} pendientes</p>
            </>
          )}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tasa de Completación</h3>
            <Package className="h-5 w-5 text-purple-600" />
          </div>
          {statsLoading ? (
            <div className="h-10 animate-pulse rounded bg-muted" />
          ) : (
            <>
              <p className="text-3xl font-bold text-foreground">{stats?.completionRate || '0%'}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {stats?.ordersByStatus.delivered || 0} entregadas
              </p>
            </>
          )}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tasa de Cancelación</h3>
            <XCircle className="h-5 w-5 text-red-600" />
          </div>
          {statsLoading ? (
            <div className="h-10 animate-pulse rounded bg-muted" />
          ) : (
            <>
              <p className="text-3xl font-bold text-foreground">{stats?.cancellationRate || '0%'}</p>
              <p className="text-sm text-red-600 mt-2">{stats?.ordersByStatus.cancelled || 0} canceladas</p>
            </>
          )}
        </div>
      </div>

      {/* Órdenes Recientes */}
      <section className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Órdenes Recientes</h2>
          <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
            Ver Todas
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-sm font-semibold text-muted-foreground">Orden #</th>
                <th className="pb-3 text-sm font-semibold text-muted-foreground">Cliente</th>
                <th className="pb-3 text-sm font-semibold text-muted-foreground">Fecha</th>
                <th className="pb-3 text-sm font-semibold text-muted-foreground">Total</th>
                <th className="pb-3 text-sm font-semibold text-muted-foreground">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ordersLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td colSpan={5} className="py-4">
                      <div className="h-10 animate-pulse rounded bg-muted" />
                    </td>
                  </tr>
                ))
              ) : ordersData && ordersData.items.length > 0 ? (
                ordersData.items.map((order) => (
                  <tr key={order.id} className="border-b border-border">
                    <td className="py-4 text-sm text-blue-600 font-medium">#{order.orderNumber}</td>
                    <td className="py-4 text-sm text-foreground">{order.user.name}</td>
                    <td className="py-4 text-sm text-muted-foreground">{formatDate(order.createdAt)}</td>
                    <td className="py-4 text-sm text-foreground font-medium">
                      ${order.orderDetail?.total?.toFixed(2) ?? "0.00"}
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {translateStatus(order.status)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    No hay órdenes recientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accesos Rápidos */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-6">Accesos Rápidos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/admin/products"
            className="bg-card border border-border rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <Package className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-foreground mb-2">Agregar Producto</h3>
            <p className="text-sm text-muted-foreground">Crear un nuevo producto en el catálogo</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-card border border-border rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <ShoppingCart className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-foreground mb-2">Ver Órdenes</h3>
            <p className="text-sm text-muted-foreground">Gestionar todas las órdenes de clientes</p>
          </Link>

          <Link
            href="/admin/users"
            className="bg-card border border-border rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <Users className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-foreground mb-2">Administrar Usuarios</h3>
            <p className="text-sm text-muted-foreground">Ver y gestionar cuentas de usuarios</p>
          </Link>
        </div>
      </section>
    </div>
  )
}

