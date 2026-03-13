"use client";

import Link from "next/link";

import { useAuth } from "@/hooks";

function AccountInformation() {
  const { user } = useAuth();

  return (
    <>
      <section>
        <h2 className="text-foreground mb-6 text-xl font-bold">
          Informacion de tu cuenta
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Información de Contacto */}
          <div className="border-border rounded-lg border p-6">
            <h3 className="text-foreground mb-4 font-semibold">
              Informacion de Contacto
            </h3>
            <p className="text-muted-foreground mb-1">
              {user?.name || "Usuario"}
            </p>
            <p className="text-muted-foreground mb-4">
              {user?.email || "correo@ejemplo.com"}
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                href="/dashboard/account-info"
                className="text-blue-600 hover:underline"
              >
                Editar
              </Link>
              <Link
                href="/dashboard/account-info"
                className="text-blue-600 hover:underline"
              >
                Cambiar Contraseña
              </Link>
            </div>
          </div>

          {/* Boletines */}
          <div className="border-border rounded-lg border p-6">
            <h3 className="text-foreground mb-4 font-semibold">Boletines</h3>
            <p className="text-muted-foreground mb-4">
              Quieres suscribirte a nuetro boletin?
            </p>
            <Link
              href="/dashboard/newsletter"
              className="text-sm text-blue-600 hover:underline"
            >
              suscribirte
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AccountInformation;
