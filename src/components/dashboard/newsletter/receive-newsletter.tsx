"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useNewsletterSubscribe, useNewsletterUnsubscribe } from "@/hooks";

function ReceiveNewsletter() {
  const user = useAuth((state) => state.user);

  const subscribeMutation = useNewsletterSubscribe();
  const unsubscribeMutation = useNewsletterUnsubscribe();

  const [email, setEmail] = useState(user?.email || "");
  const [unsubscribeToken, setUnsubscribeToken] = useState("");

  const handleSubscribe = () => {
    if (!email) return;
    subscribeMutation.mutate({
      email,
      name: user?.name,
    });
  };

  const handleUnsubscribe = () => {
    if (!unsubscribeToken.trim()) return;
    unsubscribeMutation.mutate(unsubscribeToken.trim(), {
      onSuccess: () => {
        setUnsubscribeToken("");
      },
    });
  };

  return (
    <div className="mb-6 space-y-4 rounded-lg bg-blue-50 p-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-900">Recibir newsletter</p>
        <p className="text-xs text-gray-600">
          Suscribete con tu email. Para desuscribirte desde esta pantalla necesitas el token del correo de baja.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
        />
        <Button
          type="button"
          onClick={handleSubscribe}
          disabled={subscribeMutation.isPending || !email}
        >
          {subscribeMutation.isPending ? "Suscribiendo..." : "Suscribirme"}
        </Button>
      </div>

      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <Input
          value={unsubscribeToken}
          onChange={(event) => setUnsubscribeToken(event.target.value)}
          placeholder="Token de baja"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleUnsubscribe}
          disabled={unsubscribeMutation.isPending || !unsubscribeToken.trim()}
        >
          {unsubscribeMutation.isPending ? "Procesando..." : "Desuscribirme"}
        </Button>
      </div>
    </div>
  );
}

export default ReceiveNewsletter;
