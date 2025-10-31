"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function NewsletterPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Suscripciones al Boletín
      </h1>

      <div className="max-w-2xl">
        <div className="rounded-lg border border-gray-200 p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                Boletín General
              </h2>
              <p className="text-gray-600">
                Recibe las últimas noticias, ofertas especiales y
                actualizaciones de productos directamente en tu correo
                electrónico.
              </p>
            </div>
          </div>

          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-3 font-semibold text-gray-900">
              Beneficios de suscribirte:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-600">✓</span>
                <span>Acceso anticipado a nuevos productos y lanzamientos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-600">✓</span>
                <span>Descuentos exclusivos y ofertas especiales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-600">✓</span>
                <span>Consejos y guías de expertos sobre tecnología</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-600">✓</span>
                <span>
                  Notificaciones sobre eventos y promociones especiales
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-6 flex items-center gap-3 rounded-lg bg-blue-50 p-4">
            <input
              type="checkbox"
              id="newsletter"
              checked={isSubscribed}
              onChange={(e) => setIsSubscribed(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300"
            />
            <label
              htmlFor="newsletter"
              className="cursor-pointer text-sm text-gray-700"
            >
              Sí, quiero recibir el boletín informativo y estar al tanto de las
              últimas novedades
            </label>
          </div>

          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Guardar Preferencias
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancelar</Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Puedes cancelar tu suscripción en cualquier momento. Respetamos tu
            privacidad y nunca compartiremos tu información con terceros.
          </p>
        </div>
      </div>
    </div>
  );
}
