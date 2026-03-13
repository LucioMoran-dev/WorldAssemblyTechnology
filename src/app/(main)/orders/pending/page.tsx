"use client";

import { Clock, ShoppingBag, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";

export default function OrderPendingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      }
    >
      <OrderPendingContent />
    </Suspense>
  );
}

function OrderPendingContent() {
  const searchParams = useSearchParams();

  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg bg-card p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
          <Clock className="h-10 w-10 text-yellow-600" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Pago pendiente
        </h1>
        <p className="mb-6 text-muted-foreground">
          Tu pago está siendo procesado. Te notificaremos por email cuando se
          confirme. Esto puede demorar unos minutos.
        </p>

        {(paymentId || externalReference) && (
          <div className="mb-6 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-left text-sm">
            {paymentId && (
              <p className="text-muted-foreground">
                <span className="font-medium">ID de pago:</span> {paymentId}
              </p>
            )}
            {externalReference && (
              <p className="text-muted-foreground">
                <span className="font-medium">Referencia:</span>{" "}
                {externalReference}
              </p>
            )}
            {status && (
              <p className="text-muted-foreground">
                <span className="font-medium">Estado:</span> {status}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/dashboard/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Ver mis pedidos
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

