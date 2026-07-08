"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { DateRangeFilter } from "@/components/filters/date-range-filter";
import { EnumSelectFilter } from "@/components/filters/enum-select-filter";
import { FiltersPanel } from "@/components/filters/filters-panel";
import { Pagination } from "@/components/filters/pagination";
import { SearchInput } from "@/components/filters/search-input";
import { useAllOrders, useFilters } from "@/hooks";
import { OrderStatus } from "@/types";

const getStatusColor = (status: OrderStatus) => {
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
};

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

const statusOptions = [
  { value: OrderStatus.PENDING, label: "Pendiente" },
  { value: OrderStatus.PAID, label: "Pagada" },
  { value: OrderStatus.PROCESSING, label: "En Proceso" },
  { value: OrderStatus.SHIPPED, label: "Enviada" },
  { value: OrderStatus.DELIVERED, label: "Completada" },
  { value: OrderStatus.CANCELLED, label: "Cancelada" },
];

function AdminOrdersContent() {
  const { filters, page, limit, setFilter, setPage, clearAllFilters, activeFilterCount } = useFilters({
    defaults: { status: "", orderNumber: "", userEmail: "", startDate: "", endDate: "" },
    defaultLimit: 10,
  });

  const { data: ordersData, isLoading } = useAllOrders({
    page,
    limit,
    status: (filters.status as OrderStatus) || undefined,
    orderNumber: filters.orderNumber || undefined,
    userEmail: filters.userEmail || undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
  });

  const orders = ordersData?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gestión de Ordenes</h1>
      </div>

      <FiltersPanel activeCount={activeFilterCount} onClearAll={clearAllFilters}>
        <SearchInput
          value={filters.orderNumber ?? ""}
          onChange={(v) => setFilter("orderNumber", v)}
          placeholder="Buscar por nro de orden..."
          className="min-w-[200px] flex-1"
        />
        <SearchInput
          value={filters.userEmail ?? ""}
          onChange={(v) => setFilter("userEmail", v)}
          placeholder="Buscar por email..."
          className="min-w-[200px] flex-1"
        />
        <EnumSelectFilter
          value={filters.status ?? ""}
          onChange={(v) => setFilter("status", v)}
          options={statusOptions}
          placeholder="Todos los Estados"
        />
        <DateRangeFilter
          startDate={filters.startDate ?? ""}
          endDate={filters.endDate ?? ""}
          onStartChange={(v) => setFilter("startDate", v)}
          onEndChange={(v) => setFilter("endDate", v)}
        />
      </FiltersPanel>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Orden #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="h-12 animate-pulse rounded bg-muted" />
                    </td>
                  </tr>
                ))
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/40">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">#{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.user.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.user.email}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      ${order.orderDetail?.total?.toFixed(2) ?? "0.00"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                        {translateStatus(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/orders/${order.id}`} className="inline-block rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    No se encontraron ordenes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pages={ordersData?.pages ?? 1}
          total={ordersData?.total ?? 0}
          itemsShown={orders.length}
          onPageChange={setPage}
          itemLabel="ordenes"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<div className="p-6 text-muted-foreground">Cargando...</div>}>
      <AdminOrdersContent />
    </Suspense>
  );
}
