"use client";

import { CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useMyPayments } from "@/hooks";

function formatMoney(value: number): string {
  return `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const paymentStatusLabels: Record<string, string> = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
  in_process: "En proceso",
  cancelled: "Cancelado",
};

function Billing() {
  const { data: paymentsData, isLoading } = useMyPayments();
  const payments = paymentsData?.items ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Facturacion y pagos
      </h1>

      {payments.length === 0 ? (
        <div className="rounded-lg border border-border p-12 text-center">
          <CreditCard className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No tienes pagos registrados
          </h3>
          <p className="mb-6 text-muted-foreground">
            Tus pagos se mostraran aqui cuando completes una compra.
          </p>
          <Button asChild>
            <Link href="/">Explorar productos</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr className="text-left text-muted-foreground">
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Orden</th>
                  <th className="px-4 py-3">Metodo</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Monto</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border">
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(payment.createdAt).toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-3">
                      {payment.orderId ? (
                        <Link
                          href={`/dashboard/orders/${payment.orderId}`}
                          className="text-blue-600 hover:underline"
                        >
                          {payment.orderId}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {payment.paymentTypeId || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {paymentStatusLabels[payment.status] || payment.status}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {formatMoney(payment.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;
