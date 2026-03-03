export function FeatureSectionPrivacy() {
  return (
    <div className="bg-muted/30 mt-16 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div className="space-y-4">
            <div className="bg-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-foreground font-bold">Soporte de Productos</h3>
            <p className="text-muted-foreground text-sm">
              Hasta 3 años de garantía en el sitio disponible para tu
              tranquilidad.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-foreground font-bold">Cuenta Personal</h3>
            <p className="text-muted-foreground text-sm">
              Con grandes descuentos, envío gratuito y un especialista de
              soporte dedicado.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="text-foreground font-bold">Ahorros Increíbles</h3>
            <p className="text-muted-foreground text-sm">
              Hasta 70% de descuento en nuevos productos, puedes estar seguro
              del mejor precio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
