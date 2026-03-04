"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useNewsletterUnsubscribe } from "@/hooks";

export default function NewsletterUnsubscribePage() {
  return (
    <Suspense fallback={<div className="flex min-h-[70vh] items-center justify-center">Cargando...</div>}>
      <UnsubscribeContent />
    </Suspense>
  );
}

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const unsubscribe = useNewsletterUnsubscribe();

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      return;
    }

    unsubscribe.mutate(token, {
      onSuccess: (result) => {
        setEmail(result.email);
      },
    });
  }, [searchParams, unsubscribe]);

  const token = searchParams.get("token");

  if (!token) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <XCircle className="mx-auto mb-3 h-10 w-10 text-red-600" />
          <h1 className="mb-2 text-2xl font-bold">Token invalido</h1>
          <p className="text-gray-700">
            El enlace de desuscripcion no es valido.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {unsubscribe.isPending ? (
          <>
            <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <h1 className="mb-2 text-2xl font-bold">Procesando solicitud</h1>
            <p className="text-gray-700">
              Estamos procesando tu desuscripcion...
            </p>
          </>
        ) : unsubscribe.isSuccess ? (
          <>
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" />
            <h1 className="mb-2 text-2xl font-bold">
              Desuscripcion confirmada
            </h1>
            <p className="text-gray-700">
              {email
                ? `${email} fue removido de nuestro newsletter.`
                : "Tu email fue removido del newsletter."}
            </p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto mb-3 h-10 w-10 text-red-600" />
            <h1 className="mb-2 text-2xl font-bold">No se pudo completar</h1>
            <p className="text-gray-700">
              El enlace puede estar vencido o ya fue utilizado.
            </p>
          </>
        )}

        <div className="mt-6">
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
