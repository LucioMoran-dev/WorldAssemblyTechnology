"use client";

import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

import { useOrder, usePaymentsByOrder } from "@/hooks";
import { OrderStatus } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

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

const formatDateTime = (dateString: string) =>
  new Date(dateString).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const money = (value: number | undefined) =>
  `$${Number(value ?? 0).toFixed(2)}`;

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Icon className="h-5 w-5 text-blue-600" />
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { data: order, isLoading, isError } = useOrder(id);
  const { data: payments } = usePaymentsByOrder(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 animate-pulse rounded bg-muted" />
        <div className="h-40 animate-pulse rounded-lg bg-muted" />
        <div className="h-64 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No se pudo cargar la orden.</p>
        <Link
          href="/admin/orders"
          className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a órdenes
        </Link>
      </div>
    );
  }

  const detail = order.orderDetail;
  const address = detail?.shippingAddress;

  return (
    <div className="space-y-6">
      {/* Encabezado: número, estado y volver */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/60"
            title="Volver a órdenes"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            Orden #{order.orderNumber}
          </h1>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
          >
            {translateStatus(order.status)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Creada: {formatDateTime(order.createdAt)} · Actualizada:{" "}
          {formatDateTime(order.updatedAt)}
        </p>
      </div>

      {/* Si la orden fue cancelada, el motivo es lo primero que hay que ver */}
      {order.status === OrderStatus.CANCELLED && order.cancellationReason && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <span className="font-semibold">Motivo de cancelación:</span>{" "}
          {order.cancellationReason}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Columna principal: items y totales */}
        <div className="space-y-6 lg:col-span-2">
          <SectionCard
            icon={Package}
            title={`Productos (${detail?.items?.length ?? 0})`}
          >
            <div className="divide-y divide-border">
              {detail?.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">
                      {item.productSnapshot?.name}
                    </p>
                    {/* Variantes elegidas (snapshot al momento de la compra) */}
                    {item.variantsSnapshot &&
                      item.variantsSnapshot.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {item.variantsSnapshot
                            .map((v) => `${v.type}: ${v.name}`)
                            .join(" · ")}
                        </p>
                      )}
                    {/* Descuento aplicado a este ítem, si hubo */}
                    {item.discountAmount ? (
                      <p className="text-xs text-green-600">
                        Descuento: -{money(item.discountAmount)} c/u
                        {item.discountCode ? ` (${item.discountCode})` : ""}
                      </p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-right text-sm">
                    <p className="text-muted-foreground">
                      {item.quantity} × {money(item.unitPrice)}
                    </p>
                    <p className="font-semibold text-foreground">
                      {money(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desglose de totales tal como los calcula el back (§5):
                tax = 21% del subtotal; envío escalonado (gratis ≥ $250) */}
            <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{money(detail?.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Impuestos (21%)</span>
                <span>{money(detail?.tax)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span>
                  {detail?.shipping ? money(detail.shipping) : "Gratis"}
                </span>
              </div>
              {detail?.totalDiscount ? (
                <div className="flex justify-between text-green-600">
                  <span>
                    Descuento total
                    {detail.promoCodeUsed ? ` (${detail.promoCodeUsed})` : ""}
                  </span>
                  <span>-{money(detail.totalDiscount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground">
                <span>Total</span>
                <span>{money(detail?.total)}</span>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Columna lateral: cliente, envío, tracking y pago */}
        <div className="space-y-6">
          <SectionCard icon={User} title="Cliente">
            <div className="space-y-1 text-sm">
              <p className="font-medium text-foreground">{order.user.name}</p>
              <p className="text-muted-foreground">{order.user.email}</p>
              {order.user.phone && (
                <p className="text-muted-foreground">{order.user.phone}</p>
              )}
            </div>
          </SectionCard>

          <SectionCard icon={MapPin} title="Dirección de envío">
            {address ? (
              // La dirección es un SNAPSHOT al momento de la compra: si el
              // cliente la edita después, la orden histórica no cambia
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="text-foreground">{address.street}</p>
                <p>
                  {address.city}
                  {address.province ? `, ${address.province}` : ""}{" "}
                  {address.postalCode ?? ""}
                </p>
                <p>{address.country}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Sin dirección registrada.
              </p>
            )}
          </SectionCard>

          <SectionCard icon={Truck} title="Envío / Tracking">
            {order.trackingNumber ? (
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Nro de seguimiento</dt>
                  <dd className="font-mono text-foreground">
                    {order.trackingNumber}
                  </dd>
                </div>
                {order.carrier && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Transportista</dt>
                    <dd className="text-foreground">{order.carrier}</dd>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Entrega estimada</dt>
                    <dd className="text-foreground">
                      {order.estimatedDelivery}
                    </dd>
                  </div>
                )}
                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-600 hover:underline"
                  >
                    Ver seguimiento →
                  </a>
                )}
              </dl>
            ) : (
              <p className="text-sm text-muted-foreground">
                Sin datos de envío (se cargan al pasar la orden a
                &quot;Enviada&quot; desde la lista de órdenes).
              </p>
            )}
          </SectionCard>

          <SectionCard icon={CreditCard} title="Pago">
            {payments && payments.length > 0 ? (
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div key={payment.id} className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">
                        {money(Number(payment.amount))}
                      </span>
                      {/* Estado crudo de Mercado Pago (approved, pending...) */}
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {payment.status}
                      </span>
                    </div>
                    {payment.paymentTypeId && (
                      <p className="text-xs text-muted-foreground">
                        Método: {payment.paymentTypeId}
                      </p>
                    )}
                    {payment.mercadoPagoId && (
                      <p className="font-mono text-xs text-muted-foreground">
                        MP: {payment.mercadoPagoId}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Sin pagos registrados para esta orden.
              </p>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
