"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useNewsletterSubscribe } from "@/hooks";

function ReceiveNewsletter() {
  const user = useAuth((state) => state.user);

  const subscribeMutation = useNewsletterSubscribe();

  const [email, setEmail] = useState(user?.email || "");

  const handleSubscribe = () => {
    if (!email) return;
    subscribeMutation.mutate({
      email,
      name: user?.name,
    });
  };

  return (
    <div className="mb-6 space-y-4 rounded-lg bg-blue-50 p-4">
      <div>
        <p className="text-foreground mb-2 text-sm font-semibold">
          Recibir newsletter
        </p>
        <p className="text-muted-foreground text-xs">
          Suscribete con tu email. Para desuscribirte desde esta pantalla
          necesitas el token del correo de baja.
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
    </div>
  );
}

export default ReceiveNewsletter;
