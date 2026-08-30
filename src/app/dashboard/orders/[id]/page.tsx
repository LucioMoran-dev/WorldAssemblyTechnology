"use client";

import {
  AlertTriangle,
  CreditCard,
  Loader2,
  Package,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useCancelOrder,
  useCreatePreference,
  useCreateRefund,
  useOrder,
} from "@/hooks";
import {
  OrderStatus,
  REFUND_DESCRIPTION_MAX,
  REFUND_DESCRIPTION_MIN,
  REFUND_REASON_MAX,
  REFUND_REASON_MIN,
} from "@/types";

function formatMoney(value: number): string {
  return `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// Estados en los que el back acepta una solicitud de reembolso
// (REFUNDABLE_STATUSES). Antes de "processing" el camino es cancelar.
const REFUNDABLE_STATUSES: OrderStatus[] = [
  OrderStatus.PAID,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
];

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none";

export default function DashboardOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;

  const { data: order, isLoading } = useOrder(orderId);
  const cancelOrder = useCancelOrder();
  const createPreference = useCreatePreference();
  const createRefund = useCreateRefund();

  const [cancellationReason, setCancellationReason] = useState("");
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [refundDescription, setRefundDescription] = useState("");

  const canPay = order?.status === OrderStatus.PENDING;
  const canCancel =
    order?.status === OrderStatus.PENDING || order?.status === OrderStatus.PAID;
  const canRefund = order ? REFUNDABLE_STATUSES.includes(order.status) : false;

  // El back exige cancellationReason con mínimo 5 caracteres (CancelOrderDto)
  const trimmedReason = cancellationReason.trim();
  const isReasonTooShort = trimmedReason.length < 5;

  // Longitudes que valida el back en CreateRefundDto
  const trimmedRefundReason = refundReason.trim();
  const trimmedRefundDescription = refundDescription.trim();
  const isRefundInvalid =
    trimmedRefundReason.length < REFUND_REASON_MIN ||
    trimmedRefundDescription.length < REFUND_DESCRIPTION_MIN;

  const handlePayNow = async () => {
    if (!order) return;

    try {
      const preference = await createPreference.mutateAsync({
        orderId: order.id,
      });
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
    if (!order || isReasonTooShort) return;

    try {
      await cancelOrder.mutateAsync({
        orderId: order.id,
        cancellationReason: trimmedReason,
      });
    } catch {
      // handled by hook
    }
  };

  const handleRequestRefund = async () => {
    if (!order || isRefundInvalid) return;

    try {
      await createRefund.mutateAsync({
        orderId: order.id,
        reason: trimmedRefundReason,
        description: trimmedRefundDescription,
      });
      setIsRefundOpen(false);
      setRefundReason("");
      setRefundDescription("");
    } catch {
      // handled by hook: deja el diálogo abierto para reintentar
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

      {/* Datos de envío: el back los carga recién al pasar la orden a
          "shipped", por eso solo se muestran si existe el tracking. */}
      {order.trackingNumber && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Truck className="h-5 w-5 text-blue-600" />
            Seguimiento del envío
          </h2>
          <dl className="grid gap-3 text-sm md:grid-cols-2">
            <div>
              <dt className="text-gray-500">Nro de seguimiento</dt>
              <dd className="font-mono font-semibold text-gray-900">
                {order.trackingNumber}
              </dd>
            </div>
            {order.carrier && (
              <div>
                <dt className="text-gray-500">Transportista</dt>
                <dd className="font-semibold text-gray-900">{order.carrier}</dd>
              </div>
            )}
            {order.estimatedDelivery && (
              <div>
                <dt className="text-gray-500">Entrega estimada</dt>
                <dd className="font-semibold text-gray-900">
                  {order.estimatedDelivery}
                </dd>
              </div>
            )}
          </dl>
          {order.trackingUrl && (
            <a
              href={order.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              Seguir mi envío →
            </a>
          )}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Items</h2>
        <div className="space-y-3">
          {order.orderDetail.items.map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-gray-100 p-3"
            >
              <p className="font-medium text-gray-900">
                {item.productSnapshot.name}
              </p>
              <p className="text-sm text-gray-600">
                Cantidad: {item.quantity} - Unitario:{" "}
                {formatMoney(item.unitPrice)} - Subtotal:{" "}
                {formatMoney(item.subtotal)}
              </p>
              {item.discountAmount ? (
                <p className="text-xs text-green-700">
                  Descuento: -{formatMoney(item.discountAmount)} (
                  {item.discountSource})
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
            <Button
              onClick={handlePayNow}
              disabled={createPreference.isPending}
            >
              {createPreference.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="mr-2 h-4 w-4" />
              )}
              Pagar ahora
            </Button>
          ) : null}

          {/* Reembolso: es el camino cuando la orden ya no se puede cancelar
              (processing/shipped/delivered) y también desde "paid". */}
          {canRefund ? (
            <Button
              variant="outline"
              onClick={() => setIsRefundOpen(true)}
              className="bg-transparent"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Solicitar reembolso
            </Button>
          ) : null}
        </div>

        {canCancel ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="mb-3 flex items-start gap-2 text-amber-900">
              <AlertTriangle className="mt-0.5 h-4 w-4" />
              <p className="text-sm">
                Podés cancelar esta orden mientras esté pendiente o pagada. Se
                restaura el stock y te llega un email de confirmación.
              </p>
            </div>

            <Textarea
              value={cancellationReason}
              onChange={(event) => setCancellationReason(event.target.value)}
              placeholder="Motivo de la cancelación (obligatorio, mínimo 5 caracteres)"
              className="mb-1 bg-white"
            />
            {isReasonTooShort && trimmedReason.length > 0 && (
              <p className="mb-3 text-xs text-amber-800">
                El motivo debe tener al menos 5 caracteres.
              </p>
            )}

            <Button
              variant="destructive"
              onClick={handleCancelOrder}
              disabled={cancelOrder.isPending || isReasonTooShort}
              className="mt-2"
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

      {/* Diálogo de solicitud de reembolso. Los mínimos (5 / 10 chars) son
          los que valida el back en CreateRefundDto. */}
      <ActionDialog
        open={isRefundOpen}
        onOpenChange={(open) => !open && setIsRefundOpen(false)}
        title="Solicitar reembolso"
        description="Contanos qué pasó. Vamos a revisar tu solicitud y te avisamos por email."
        confirmLabel="Enviar solicitud"
        isPending={createRefund.isPending}
        confirmDisabled={isRefundInvalid}
        onConfirm={handleRequestRefund}
      >
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">
              Motivo ({REFUND_REASON_MIN}-{REFUND_REASON_MAX} caracteres)
            </label>
            <input
              className={inputClass}
              value={refundReason}
              onChange={(e) =>
                setRefundReason(e.target.value.slice(0, REFUND_REASON_MAX))
              }
              placeholder="Ej: Producto defectuoso"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">
              Descripción ({REFUND_DESCRIPTION_MIN}-{REFUND_DESCRIPTION_MAX}{" "}
              caracteres)
            </label>
            <Textarea
              value={refundDescription}
              onChange={(e) =>
                setRefundDescription(
                  e.target.value.slice(0, REFUND_DESCRIPTION_MAX)
                )
              }
              placeholder="Contanos con detalle qué pasó con tu pedido."
              className="min-h-24"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {trimmedRefundDescription.length}/{REFUND_DESCRIPTION_MAX}
            </p>
          </div>
        </div>
      </ActionDialog>
    </div>
  );
}
