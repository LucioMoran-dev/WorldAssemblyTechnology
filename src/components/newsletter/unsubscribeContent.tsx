import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useNewsletterUnsubscribe } from "@/hooks";

export function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const { mutate, isPending, isSuccess } = useNewsletterUnsubscribe();

  const token = searchParams.get("token");

  const [email, setEmail] = useState("");

  const [alreadyUnsubscribed, setAlreadyUnsubscribed] = useState(false);

  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;

    hasRun.current = true;

    mutate(token, {
      onSuccess: (result) => {
        setEmail(result.email);
        setAlreadyUnsubscribed(result.alreadyUnsubscribed);
      },
    });
  }, [token, mutate]);

  if (!token) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-xl border border-red-200 bg-card p-8 text-center shadow-sm">
          <XCircle className="mx-auto mb-3 h-10 w-10 text-red-600" />

          <h1 className="mb-2 text-2xl font-bold">Token inválido</h1>

          <p className="text-muted-foreground">
            El enlace de desuscripción no es válido.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        {isPending ? (
          <>
            <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-border border-t-blue-600" />

            <h1 className="mb-2 text-2xl font-bold">Procesando solicitud</h1>

            <p className="text-muted-foreground">
              Estamos procesando tu desuscripción...
            </p>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" />

            <h1 className="mb-2 text-2xl font-bold">
              {alreadyUnsubscribed
                ? "Este email ya estaba desuscripto"
                : "Desuscripción confirmada"}
            </h1>

            <p className="text-muted-foreground">
              {email
                ? `${email} fue removido de nuestro newsletter.`
                : "Tu email fue removido del newsletter."}
            </p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto mb-3 h-10 w-10 text-red-600" />

            <h1 className="mb-2 text-2xl font-bold">No se pudo completar</h1>

            <p className="text-muted-foreground">
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
