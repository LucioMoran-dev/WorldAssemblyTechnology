"use client";

import { CreditCard, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAllPayments } from "@/hooks";
import { PaymentStatus } from "@/types";

function formatMoney(value: number): string {
  return `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function AdminPaymentsPage() {
  const [status, setStatus] = useState<PaymentStatus | "">("");

  const { data, isLoading, refetch, isRefetching } = useAllPayments({
    status: status || undefined,
  });

  const payments = useMemo(() => {
    if (Array.isArray(data)) return data;
    if (!data) return [];
    const maybeItems = (data as { items?: unknown }).items;
    return Array.isArray(maybeItems) ? maybeItems : [];
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestion de pagos</h1>

        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as PaymentStatus | "")}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Todos</option>
            <option value={PaymentStatus.PENDING}>pending</option>
            <option value={PaymentStatus.APPROVED}>approved</option>
            <option value={PaymentStatus.REJECTED}>rejected</option>
            <option value={PaymentStatus.IN_PROCESS}>in_process</option>
            <option value={PaymentStatus.CANCELLED}>cancelled</option>
          </select>

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
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr className="text-left text-gray-600">
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
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Cargando pagos...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No hay pagos para este filtro.
                  </td>
                </tr>
              ) : (
                payments.map((payment: any) => (
                  <tr key={payment.id} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-xs">{payment.id}</td>
                    <td className="px-4 py-3">
                      {payment.orderId ? (
                        <a
                          href={`/dashboard/orders/${payment.orderId}`}
                          className="text-blue-600 hover:underline"
                        >
                          {payment.orderId}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3">{payment.paymentMethod || "-"}</td>
                    <td className="px-4 py-3 font-semibold">
                      {formatMoney(Number(payment.amount || 0))}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleString("es-AR")
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span>Total registros: {payments.length}</span>
        </div>
      </div>
    </div>
  );
}
