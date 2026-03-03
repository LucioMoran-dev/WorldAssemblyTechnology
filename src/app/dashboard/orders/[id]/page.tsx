"use client";

import { AlertTriangle, CreditCard, Loader2, Package, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCancelOrder, useCreatePreference, useOrder } from "@/hooks";
import { OrderStatus } from "@/types";

function formatMoney(value: number): string {
  return `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function DashboardOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;

  const { data: order, isLoading } = useOrder(orderId);
  const cancelOrder = useCancelOrder();
  const createPreference = useCreatePreference();

  const [cancellationReason, setCancellationReason] = useState("");

  const canPay = order?.status === OrderStatus.PENDING;
  const canCancel =
    order?.status === OrderStatus.PENDING || order?.status === OrderStatus.PAID;

  const handlePayNow = async () => {
    if (!order) return;

    try {
      const preference = await createPreference.mutateAsync({ orderId: order.id });
      const checkoutUrl = preference.initPoint || preference.sandboxInitPoint;
      if (!checkoutUrl) {
        toast.error("No se pudo iniciar el pago");
        return;
      }
      window.location.href = checkoutUrl;
    } catch {
      // handled by hook
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;

    try {
      await cancelOrder.mutateAsync({
        orderId: order.id,
        reason: cancellationReason.trim() || undefined,
      });
    } catch {
      // handled by hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
        No se encontro la orden solicitada.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-3">
          <Package className="h-6 w-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Orden {order.orderNumber || `#${order.id.slice(0, 8)}`}
          </h1>
        </div>

        <div className="grid gap-4 text-sm md:grid-cols-3">
          <div>
            <p className="text-gray-500">Estado</p>
            <p className="font-semibold text-gray-900">{order.status}</p>
          </div>
          <div>
            <p className="text-gray-500">Fecha</p>
            <p className="font-semibold text-gray-900">
              {new Date(order.createdAt).toLocaleString("es-AR")}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total</p>
            <p className="font-semibold text-gray-900">
              {formatMoney(order.orderDetail.total)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Items</h2>
        <div className="space-y-3">
          {order.orderDetail.items.map((item) => (
            <div key={item.id} className="rounded-md border border-gray-100 p-3">
              <p className="font-medium text-gray-900">{item.productSnapshot.name}</p>
              <p className="text-sm text-gray-600">
                Cantidad: {item.quantity} - Unitario: {formatMoney(item.unitPrice)} - Subtotal: {" "}
                {formatMoney(item.subtotal)}
              </p>
              {item.discountAmount ? (
                <p className="text-xs text-green-700">
                  Descuento: -{formatMoney(item.discountAmount)} ({item.discountSource})
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Acciones</h2>

        <div className="flex flex-wrap gap-3">
          {canPay ? (
            <Button onClick={handlePayNow} disabled={createPreference.isPending}>
              {createPreference.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="mr-2 h-4 w-4" />
              )}
              Pagar ahora
            </Button>
          ) : null}
        </div>

        {canCancel ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="mb-3 flex items-start gap-2 text-amber-900">
              <AlertTriangle className="mt-0.5 h-4 w-4" />
              <p className="text-sm">
                Puedes cancelar esta orden. Si agregas una razon, sera enviada al backend.
              </p>
            </div>

            <Textarea
              value={cancellationReason}
              onChange={(event) => setCancellationReason(event.target.value)}
              placeholder="Razon de cancelacion (opcional)"
              className="mb-3 bg-white"
            />

            <Button
              variant="destructive"
              onClick={handleCancelOrder}
              disabled={cancelOrder.isPending}
            >
              {cancelOrder.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              Cancelar orden
            </Button>
          </div>
        ) : null}

        {order.cancellationReason ? (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            Razon de cancelacion: {order.cancellationReason}
          </div>
        ) : null}
      </div>
    </div>
  );
}
