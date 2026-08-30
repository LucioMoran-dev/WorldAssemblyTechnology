"use client";

import { Loader2, RotateCcw } from "lucide-react";
import Link from "next/link";

import { useMyRefunds } from "@/hooks";
import { RefundStatus } from "@/types";

const getStatusColor = (status: RefundStatus) => {
  const colors = {
    [RefundStatus.PENDING]: "bg-yellow-100 text-yellow-700",
    [RefundStatus.APPROVED]: "bg-green-100 text-green-700",
    [RefundStatus.REJECTED]: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-muted text-muted-foreground";
};

const translateStatus = (status: RefundStatus): string => {
  const translations = {
    [RefundStatus.PENDING]: "En revisión",
    [RefundStatus.APPROVED]: "Aprobado",
    [RefundStatus.REJECTED]: "Rechazado",
  };
  return translations[status] || status;
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export default function DashboardRefundsPage() {
  const { data: refunds, isLoading } = useMyRefunds();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Mis Reembolsos</h1>

      {!refunds || refunds.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <RotateCcw className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">
            No tenés solicitudes de reembolso.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Podés pedir uno desde el detalle de un pedido ya pagado.
          </p>
          <Link
            href="/dashboard/orders"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Ver mis pedidos →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {refunds.map((refund) => (
            <div
              key={refund.id}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">
                    {refund.order?.orderNumber
                      ? `Orden #${refund.order.orderNumber}`
                      : "Solicitud de reembolso"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Solicitado el {formatDate(refund.createdAt)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(refund.status)}`}
                >
                  {translateStatus(refund.status)}
                </span>
              </div>

              {refund.reason && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Motivo:</span>{" "}
                  {refund.reason}
                </p>
              )}

              {/* Respuesta del staff: llega cuando aprueban o rechazan */}
              {refund.adminResponse && (
                <div className="mt-3 rounded-md border border-border bg-muted/40 p-3 text-sm">
                  <p className="mb-1 font-medium text-foreground">
                    Respuesta de nuestro equipo:
                  </p>
                  <p className="text-muted-foreground">
                    {refund.adminResponse}
                  </p>
                </div>
              )}

              {refund.status === RefundStatus.APPROVED && (
                <p className="mt-3 text-xs text-muted-foreground">
                  La devolución del dinero se procesa por fuera de la tienda y
                  puede demorar algunos días hábiles.
                </p>
              )}

              {refund.order?.id && (
                <Link
                  href={`/dashboard/orders/${refund.order.id}`}
                  className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  Ver el pedido →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
