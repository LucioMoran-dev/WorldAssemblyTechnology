"use client";

import { ArrowRight, CreditCard, Eye, XCircle } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

import { DateRangeFilter } from "@/components/filters/date-range-filter";
import { EnumSelectFilter } from "@/components/filters/enum-select-filter";
import { FiltersPanel } from "@/components/filters/filters-panel";
import { Pagination } from "@/components/filters/pagination";
import { SearchInput } from "@/components/filters/search-input";
import { ActionDialog } from "@/components/ui/action-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useAllOrders,
  useCancelOrder,
  useFilters,
  usePaymentsByOrder,
  useUpdateOrderStatus,
} from "@/hooks";
import { NEXT_ORDER_STATUS, OrderStatus } from "@/types";
import type { IOrder } from "@/types";

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
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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

const advanceDescriptions: Partial<Record<OrderStatus, string>> = {
  [OrderStatus.PAID]:
    "Normalmente este paso lo hace automáticamente el webhook de Mercado Pago al aprobarse el pago. Usalo solo si confirmaste el cobro por otra vía.",
  [OrderStatus.PROCESSING]:
    "Se enviará un email automático al cliente avisando que su pedido está en preparación.",
  [OrderStatus.SHIPPED]:
    "Se enviará un email automático al cliente con los datos de envío. Cargá el tracking antes de confirmar.",
  [OrderStatus.DELIVERED]:
    "Se enviará un email de entrega y un pedido de reseña por cada producto de la orden.",
};

const trackingInputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none";

const CANCELABLE_STATUSES: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PAID,
];

const emptyTracking = {
  trackingNumber: "",
  carrier: "",
  trackingUrl: "",
  estimatedDelivery: "",
};

/**
 * Dialog de solo lectura con el/los pagos de una orden (GET /payments/order/:id).
 * El status del pago es el string crudo de Mercado Pago (approved, pending,
 * rejected, refunded, ...), no nuestro enum — se muestra tal cual.
 */
function PaymentDialog({
  order,
  onClose,
}: {
  order: IOrder | null;
  onClose: () => void;
}) {
  const { data: payments, isLoading } = usePaymentsByOrder(order?.id ?? "");

  return (
    <Dialog open={Boolean(order)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pago de la orden #{order?.orderNumber}</DialogTitle>
          <DialogDescription>
            Información del pago registrada por Mercado Pago.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-2">
            <div className="h-10 animate-pulse rounded bg-muted" />
            <div className="h-10 animate-pulse rounded bg-muted" />
          </div>
        ) : payments && payments.length > 0 ? (
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-lg border border-border p-3 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    ${Number(payment.amount).toFixed(2)}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {payment.status}
                  </span>
                </div>
                <dl className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {payment.mercadoPagoId && (
                    <div className="flex justify-between">
                      <dt>ID Mercado Pago</dt>
                      <dd className="font-mono">{payment.mercadoPagoId}</dd>
                    </div>
                  )}
                  {payment.paymentTypeId && (
                    <div className="flex justify-between">
                      <dt>Método</dt>
                      <dd>{payment.paymentTypeId}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt>Fecha</dt>
                    <dd>{formatDate(payment.createdAt)}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No hay pagos registrados para esta orden.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AdminOrdersContent() {
  const {
    filters,
    page,
    limit,
    setFilter,
    setPage,
    clearAllFilters,
    activeFilterCount,
  } = useFilters({
    defaults: {
      status: "",
      orderNumber: "",
      userEmail: "",
      startDate: "",
      endDate: "",
    },
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

  const updateStatus = useUpdateOrderStatus();
  const cancelOrder = useCancelOrder();

  // Orden a la que se le quiere avanzar el estado (abre el diálogo de
  // confirmación) — mismo patrón "target" que usa admin/products.
  const [advanceTarget, setAdvanceTarget] = useState<IOrder | null>(null);
  const [tracking, setTracking] = useState(emptyTracking);
  // Orden cuyo pago se está consultando (abre el dialog de pago)
  const [paymentTarget, setPaymentTarget] = useState<IOrder | null>(null);
  // Orden que se va a cancelar + motivo (el back exige mínimo 5 chars)
  const [cancelTarget, setCancelTarget] = useState<IOrder | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const trimmedCancelReason = cancelReason.trim();
  const isCancelReasonTooShort = trimmedCancelReason.length < 5;

  const closeCancelDialog = () => {
    setCancelTarget(null);
    setCancelReason("");
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget || isCancelReasonTooShort) return;
    try {
      await cancelOrder.mutateAsync({
        orderId: cancelTarget.id,
        cancellationReason: trimmedCancelReason,
      });
      closeCancelDialog();
    } catch {
      // el hook ya muestra el toast; dejamos el diálogo abierto para reintentar
    }
  };

  // Próximo estado según la máquina de estados del back (lineal, un paso
  // a la vez). undefined = estado final (delivered/cancelled), sin acción.
  const nextStatus = advanceTarget
    ? NEXT_ORDER_STATUS[advanceTarget.status]
    : undefined;
  const goingToShipped = nextStatus === OrderStatus.SHIPPED;

  const closeAdvanceDialog = () => {
    setAdvanceTarget(null);
    setTracking(emptyTracking);
  };

  const handleConfirmAdvance = async () => {
    if (!advanceTarget || !nextStatus) return;
    try {
      await updateStatus.mutateAsync({
        id: advanceTarget.id,
        data: {
          status: nextStatus,
          // El tracking solo tiene sentido al pasar a "shipped"; el service
          // descarta los campos vacíos
          ...(goingToShipped ? tracking : {}),
        },
      });
      closeAdvanceDialog();
    } catch {
      // el hook ya muestra el toast de error; dejamos el diálogo abierto
      // para corregir y reintentar
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Gestión de Ordenes
        </h1>
      </div>

      <FiltersPanel
        activeCount={activeFilterCount}
        onClearAll={clearAllFilters}
      >
        <SearchInput
          value={filters.orderNumber ?? ""}
          onChange={(v) => setFilter("orderNumber", v)}
          placeholder="Buscar por nro de orden..."
          className="min-w-50 flex-1"
        />
        <SearchInput
          value={filters.userEmail ?? ""}
          onChange={(v) => setFilter("userEmail", v)}
          placeholder="Buscar por email..."
          className="min-w-50 flex-1"
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Orden #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  Acciones
                </th>
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
                orders.map((order) => {
                  const next = NEXT_ORDER_STATUS[order.status];
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-border hover:bg-muted/40"
                    >
                      {/* whitespace-nowrap: el nro de orden no debe partirse
                          en varias líneas (#ORD-2026-04-0002 quedaba en 4) */}
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-blue-600">
                        #{order.orderNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {order.user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {order.user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        ${order.orderDetail?.total?.toFixed(2) ?? "0.00"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {translateStatus(order.status)}
                        </span>
                        {/* El tracking solo existe si la orden pasó a "shipped" */}
                        {order.trackingNumber && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {order.carrier ? `${order.carrier} · ` : ""}
                            {order.trackingNumber}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {/* Detalle ADMIN propio (antes llevaba a la vista
                              de cliente /dashboard/orders/[id]) */}
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="inline-block rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                            title="Ver detalle"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setPaymentTarget(order)}
                            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                            title="Ver pago"
                          >
                            <CreditCard className="h-4 w-4" />
                          </button>
                          {/* Avanzar estado: solo si la máquina de estados lo
                              permite (delivered y cancelled son finales) */}
                          {next && (
                            <button
                              onClick={() => setAdvanceTarget(order)}
                              className="inline-flex items-center gap-1 rounded-lg border border-blue-200 px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50"
                              title={`Pasar a ${translateStatus(next)}`}
                            >
                              {translateStatus(next)}
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                          {/* Cancelar: el back solo lo permite en pending o
                              paid (después el camino es el reembolso) */}
                          {CANCELABLE_STATUSES.includes(order.status) && (
                            <button
                              onClick={() => setCancelTarget(order)}
                              className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                              title="Cancelar orden"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
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

      {/* Diálogo de confirmación para avanzar el estado. Cuando el paso es
          a "shipped", incluye el formulario de tracking (el back lo escribe
          en la orden y lo manda en el mail de envío). */}
      <ActionDialog
        open={Boolean(advanceTarget)}
        onOpenChange={(open) => !open && closeAdvanceDialog()}
        title={
          nextStatus
            ? `Pasar la orden #${advanceTarget?.orderNumber} a "${translateStatus(nextStatus)}"`
            : ""
        }
        description={nextStatus ? advanceDescriptions[nextStatus] : undefined}
        confirmLabel={
          nextStatus ? `Pasar a ${translateStatus(nextStatus)}` : "Confirmar"
        }
        isPending={updateStatus.isPending}
        onConfirm={handleConfirmAdvance}
      >
        {goingToShipped && (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Nro de seguimiento
              </label>
              <input
                className={trackingInputClass}
                value={tracking.trackingNumber}
                onChange={(e) =>
                  setTracking((t) => ({ ...t, trackingNumber: e.target.value }))
                }
                placeholder="Ej: AR123456789"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Transportista
              </label>
              <input
                className={trackingInputClass}
                value={tracking.carrier}
                onChange={(e) =>
                  setTracking((t) => ({ ...t, carrier: e.target.value }))
                }
                placeholder="Ej: Correo Argentino, Andreani..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                URL de seguimiento (opcional)
              </label>
              <input
                className={trackingInputClass}
                value={tracking.trackingUrl}
                onChange={(e) =>
                  setTracking((t) => ({ ...t, trackingUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Entrega estimada (texto libre, opcional)
              </label>
              <input
                className={trackingInputClass}
                value={tracking.estimatedDelivery}
                onChange={(e) =>
                  setTracking((t) => ({
                    ...t,
                    estimatedDelivery: e.target.value,
                  }))
                }
                placeholder="Ej: 3 a 5 días hábiles"
              />
            </div>
          </div>
        )}
      </ActionDialog>

      {/* Cancelación admin. Efectos que avisamos porque son irreversibles:
          restaura stock y dispara emails al cliente. */}
      <ActionDialog
        open={Boolean(cancelTarget)}
        onOpenChange={(open) => !open && closeCancelDialog()}
        title={`Cancelar la orden #${cancelTarget?.orderNumber ?? ""}`}
        description={
          cancelTarget?.status === OrderStatus.PAID
            ? "Se restaura el stock y se le envía al cliente el email de cancelación y el de reembolso en proceso. La devolución del dinero se gestiona manualmente."
            : "Se restaura el stock y se le envía al cliente un email de cancelación."
        }
        confirmLabel="Cancelar orden"
        variant="destructive"
        isPending={cancelOrder.isPending}
        confirmDisabled={isCancelReasonTooShort}
        onConfirm={handleConfirmCancel}
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Motivo de la cancelación (obligatorio, mínimo 5 caracteres)
          </label>
          <input
            className={trackingInputClass}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Ej: Sin stock disponible del proveedor"
          />
        </div>
      </ActionDialog>

      <PaymentDialog
        order={paymentTarget}
        onClose={() => setPaymentTarget(null)}
      />
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense
      fallback={<div className="p-6 text-muted-foreground">Cargando...</div>}
    >
      <AdminOrdersContent />
    </Suspense>
  );
}
