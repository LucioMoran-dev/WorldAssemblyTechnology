"use client";

import { CheckCircle2, Clock, Home, Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { useOrderPaymentConfirmation } from "@/hooks";

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}

function extractOrderId(externalReference: string | null): string {
  if (!externalReference) return "";
  return externalReference.startsWith("order-")
    ? externalReference.slice("order-".length)
    : externalReference;
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");
  const orderId = extractOrderId(externalReference);

  const { order, isPaid, isConfirmed, isWaiting, hasTimedOut } =
    useOrderPaymentConfirmation(orderId);

  const cannotVerify = !orderId;

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg bg-card p-8 text-center shadow-lg">
        {/* Estado 1: esperando la confirmación del webhook */}
        {isWaiting && !cannotVerify && (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              Confirmando tu pago…
            </h1>
            <p className="mb-6 text-muted-foreground">
              Ya recibimos tu pago y lo estamos verificando. Esto puede tardar
              unos segundos, no cierres esta página.
            </p>
          </>
        )}

        {/* Estado 2: confirmado por el back */}
        {(isConfirmed || cannotVerify) && (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              {isPaid || cannotVerify ? "¡Pago confirmado!" : "Pago procesado"}
            </h1>
            <p className="mb-6 text-muted-foreground">
              Tu compra fue registrada correctamente. Recibirás un email con los
              detalles de tu pedido.
            </p>
          </>
        )}

        {/* Estado 3: se agotó la espera sin confirmación */}
        {hasTimedOut && (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              Tu pago está en proceso
            </h1>
            <p className="mb-6 text-muted-foreground">
              La confirmación está demorando más de lo normal. No te preocupes:
              apenas se acredite te llega un email. Podés seguir el estado desde
              &quot;Mis pedidos&quot;.
            </p>
          </>
        )}

        {(paymentId || order) && (
          <div className="mb-6 rounded-md border border-border bg-muted/40 p-4 text-left text-sm">
            {order?.orderNumber && (
              <p className="text-muted-foreground">
                <span className="font-medium">Orden:</span> #{order.orderNumber}
              </p>
            )}
            {paymentId && (
              <p className="text-muted-foreground">
                <span className="font-medium">ID de pago:</span> {paymentId}
              </p>
            )}
            {order?.orderDetail?.total !== undefined && (
              <p className="text-muted-foreground">
                <span className="font-medium">Total:</span> $
                {Number(order.orderDetail.total).toFixed(2)}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link
              href={
                orderId ? `/dashboard/orders/${orderId}` : "/dashboard/orders"
              }
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Ver mi pedido
            </Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
