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
          <h2 className="text-foreground text-xl font-bold">
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
          {/* DirecciÃ³n de FacturaciÃ³n Predeterminada */}
          <div className="border-border rounded-lg border p-6">
            <h3 className="text-foreground mb-4 font-semibold">
              Direcciones de Facturacion Predeterminada
            </h3>
            {isLoading ? (
              <div className="bg-muted mb-4 h-20 animate-pulse rounded" />
            ) : defaultAddress ? (
              <div className="text-muted-foreground mb-4">
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
              <p className="text-muted-foreground mb-4">
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

          {/* DirecciÃ³n de EnvÃ­o Predeterminada */}
          <div className="border-border rounded-lg border p-6">
            <h3 className="text-foreground mb-4 font-semibold">
              Direcciones de Envio Predeterminada
            </h3>
            {isLoading ? (
              <div className="bg-muted mb-4 h-20 animate-pulse rounded" />
            ) : defaultAddress ? (
              <div className="text-muted-foreground mb-4">
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
              <p className="text-muted-foreground mb-4">
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
