"use client";

import { memo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscribe } from "@/hooks";

export const FooterNewsletter = memo(function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const subscribeMutation = useNewsletterSubscribe();

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) return;
    subscribeMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setEmail("");
        },
      }
    );
  };

  return (
    <div className="border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-2xl font-bold text-white">Suscribete al newsletter</h3>
            <p className="text-muted-foreground">Recibe novedades, promos y lanzamientos.</p>
          </div>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Tu correo"
              className="bg-card text-foreground"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSubscribe()}
            />
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSubscribe}
              disabled={subscribeMutation.isPending}
            >
              {subscribeMutation.isPending ? "..." : "Suscribirme"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

