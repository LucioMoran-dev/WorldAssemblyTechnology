import Image from "next/image";

export function QualitySection() {
  return (
    <section className="bg-card py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-[400px]">
            <Image
              src="/white-gaming-pc-with-rgb-fans.jpg"
              alt="PC Gaming Blanca"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">
                La Más Alta Calidad
                <br />
                de Productos
              </h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Garantizamos la más alta calidad de los productos que vendemos.
              Varias décadas de operación exitosa y millones de clientes
              satisfechos nos permiten estar seguros de eso. Además, todos los
              artículos que vendemos pasan por un exhaustivo control de calidad,
              por lo que ninguna discrepancia en las características puede
              escapar al ojo de nuestros profesionales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
