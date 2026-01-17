"use client";

import Link from "next/link";

import { useAuth } from "@/hooks";

function AccountInformation() {
  const { user } = useAuth();

  return (
    <>
      <section>
        <h2 className="mb-6 text-xl font-bold text-gray-900">
          Información de Cuenta
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Información de Contacto */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 font-semibold text-gray-900">
              Información de Contacto
            </h3>
            <p className="mb-1 text-gray-700">{user?.name || "Usuario"}</p>
            <p className="mb-4 text-gray-600">{user?.email || "correo@ejemplo.com"}</p>
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
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 font-semibold text-gray-900">Boletines</h3>
            <p className="mb-4 text-gray-600">
              No estás suscrito a nuestro boletín.
            </p>
            <Link
              href="/dashboard/newsletter"
              className="text-sm text-blue-600 hover:underline"
            >
              Editar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AccountInformation;
