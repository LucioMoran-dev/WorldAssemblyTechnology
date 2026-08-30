"use client";

import Link from "next/link";

import { useMyAddresses } from "@/hooks";

function AddressBook() {
  const { data: addresses, isLoading } = useMyAddresses();

  const defaultAddress = addresses?.find((addr) => addr.isDefault);

  return (
    <>
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Libreta de Direcciones
          </h2>
          <Link
            href="/dashboard/addresses"
            className="text-sm text-blue-600 hover:underline"
          >
            Administrar Direcciones
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Dirección de Facturación Predeterminada */}
          <div className="rounded-lg border border-border p-6">
            <h3 className="mb-4 font-semibold text-foreground">
              Direcciones de Facturacion Predeterminada
            </h3>
            {isLoading ? (
              <div className="mb-4 h-20 animate-pulse rounded bg-muted" />
            ) : defaultAddress ? (
              <div className="mb-4 text-muted-foreground">
                <p className="font-medium">{defaultAddress.label}</p>
                <p className="text-sm">{defaultAddress.street}</p>
                <p className="text-sm">
                  {defaultAddress.city}, {defaultAddress.province}
                </p>
                <p className="text-sm">
                  {defaultAddress.postalCode}, {defaultAddress.country}
                </p>
              </div>
            ) : (
              <p className="mb-4 text-muted-foreground">
                No has establecido una direccion de facturacion predeterminada.
              </p>
            )}
            <Link
              href="/dashboard/addresses"
              className="text-sm text-blue-600 hover:underline"
            >
              Editar Direccion
            </Link>
          </div>

          {/* Dirección de Envío Predeterminada */}
          <div className="rounded-lg border border-border p-6">
            <h3 className="mb-4 font-semibold text-foreground">
              Direcciones de Envio Predeterminada
            </h3>
            {isLoading ? (
              <div className="mb-4 h-20 animate-pulse rounded bg-muted" />
            ) : defaultAddress ? (
              <div className="mb-4 text-muted-foreground">
                <p className="font-medium">{defaultAddress.label}</p>
                <p className="text-sm">{defaultAddress.street}</p>
                <p className="text-sm">
                  {defaultAddress.city}, {defaultAddress.province}
                </p>
                <p className="text-sm">
                  {defaultAddress.postalCode}, {defaultAddress.country}
                </p>
              </div>
            ) : (
              <p className="mb-4 text-muted-foreground">
                No has establecido una direccion de envio predeterminada.
              </p>
            )}
            <Link
              href="/dashboard/addresses"
              className="text-sm text-blue-600 hover:underline"
            >
              Editar Direccion
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddressBook;
