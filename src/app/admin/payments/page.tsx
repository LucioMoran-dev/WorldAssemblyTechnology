"use client";

import { CreditCard, RefreshCw } from "lucide-react";
import { Suspense } from "react";

import { Pagination } from "@/components/filters/pagination";
import { EnumSelectFilter } from "@/components/filters/enum-select-filter";
import { FiltersPanel } from "@/components/filters/filters-panel";
import { Button } from "@/components/ui/button";
import { useAllPayments, useFilters } from "@/hooks";
import { PaymentStatus } from "@/types";

function formatMoney(value: number): string {
  return `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const statusOptions = [
  { value: PaymentStatus.PENDING, label: "Pendiente" },
  { value: PaymentStatus.APPROVED, label: "Aprobado" },
  { value: PaymentStatus.REJECTED, label: "Rechazado" },
  { value: PaymentStatus.IN_PROCESS, label: "En proceso" },
  { value: PaymentStatus.CANCELLED, label: "Cancelado" },
];

function AdminPaymentsContent() {
  const { filters, page, limit, setFilter, setPage, clearAllFilters, activeFilterCount } = useFilters({
    defaults: { status: "" },
    defaultLimit: 20,
  });

  const { data, isLoading, refetch, isRefetching } = useAllPayments({
    page,
    limit,
    status: (filters.status as PaymentStatus) || undefined,
  });

  const payments = data?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gestión de pagos</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
          Refrescar
        </Button>
      </div>

      <FiltersPanel activeCount={activeFilterCount} onClearAll={clearAllFilters}>
        <EnumSelectFilter
          value={filters.status ?? ""}
          onChange={(v) => setFilter("status", v)}
          options={statusOptions}
          placeholder="Todos los estados"
        />
      </FiltersPanel>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-left text-muted-foreground">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Orden</th>
                <th className="px-4 py-3">Metodo</th>
                <th className="px-4 py-3">Monto</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="h-10 animate-pulse rounded bg-muted" />
                    </td>
                  </tr>
                ))
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No hay pagos para este filtro.
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-xs">{payment.id}</td>
                    <td className="px-4 py-3">
                      {payment.orderId ? (
                        <a href={`/dashboard/orders/${payment.orderId}`} className="text-blue-600 hover:underline">
                          {payment.orderId}
                        </a>
                      ) : "-"}
                    </td>
                    <td className="px-4 py-3">{payment.paymentTypeId || "-"}</td>
                    <td className="px-4 py-3 font-semibold">{formatMoney(Number(payment.amount || 0))}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded px-2 py-1 text-xs font-medium ${
                        payment.status === PaymentStatus.APPROVED ? "bg-green-100 text-green-700" :
                        payment.status === PaymentStatus.REJECTED ? "bg-red-100 text-red-700" :
                        payment.status === PaymentStatus.CANCELLED ? "bg-red-100 text-red-700" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {statusOptions.find((o) => o.value === payment.status)?.label ?? payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {payment.createdAt ? new Date(payment.createdAt).toLocaleString("es-AR") : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pages={data?.pages ?? 1}
          total={data?.total ?? 0}
          itemsShown={payments.length}
          onPageChange={setPage}
          itemLabel="pagos"
          isLoading={isLoading}
        />
      </div>

      <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span>Total registros: {data?.total ?? 0}</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminPaymentsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-muted-foreground">Cargando...</div>}>
      <AdminPaymentsContent />
    </Suspense>
  );
}
