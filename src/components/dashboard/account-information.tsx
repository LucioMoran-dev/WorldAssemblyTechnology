"use client";

import Link from "next/link";

import { useAuth } from "@/hooks";

function AccountInformation() {
  const { user } = useAuth();

  return (
    <>
      <section>
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Informacion de tu cuenta
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Información de Contacto */}
          <div className="rounded-lg border border-border p-6">
            <h3 className="mb-4 font-semibold text-foreground">
              Informacion de Contacto
            </h3>
            <p className="mb-1 text-muted-foreground">
              {user?.name || "Usuario"}
            </p>
            <p className="mb-4 text-muted-foreground">
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
          <div className="rounded-lg border border-border p-6">
            <h3 className="mb-4 font-semibold text-foreground">Boletines</h3>
            <p className="mb-4 text-muted-foreground">
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
