import Image from "next/image";

export function SafeHandsSection() {
  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">
                Ahora Estás en Manos
                <br />
                Seguras
              </h2>
            </div>
            <p className="mb-4 text-gray-300">
              Experimenta un aumento del 60% en el rendimiento informático
              respecto a la generación anterior. Las laptops MSI equipan el
              procesador IntelÂ® Coreâ„¢ i7 de 10ma Gen. con el máximo poder de
              cómputo para brindarte una experiencia de juego sin igual.
            </p>
            <p className="text-sm text-muted-foreground">
              *Rendimiento comparado con i7-9700. Las especificaciones varían
              según el modelo.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/gaming-pc-with-rgb-lighting-and-yellow-green-accen.jpg"
              alt="PC Gaming"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

