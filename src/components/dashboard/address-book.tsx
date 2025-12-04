import Link from "next/link";

function AddressBook() {
  return (
    <>
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
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
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 font-semibold text-gray-900">
              Dirección de Facturación Predeterminada
            </h3>
            <p className="mb-4 text-gray-600">
              No has establecido una dirección de facturación predeterminada.
            </p>
            <Link
              href="/dashboard/addresses"
              className="text-sm text-blue-600 hover:underline"
            >
              Editar Dirección
            </Link>
          </div>

          {/* Dirección de Envío Predeterminada */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 font-semibold text-gray-900">
              Dirección de Envío Predeterminada
            </h3>
            <p className="mb-4 text-gray-600">
              No has establecido una dirección de envío predeterminada.
            </p>
            <Link
              href="/dashboard/addresses"
              className="text-sm text-blue-600 hover:underline"
            >
              Editar Dirección
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddressBook;
