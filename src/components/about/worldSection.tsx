import Image from "next/image";

export function WorldSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-[400px]">
            <Image
              src="/rgb-gaming-keyboard.png"
              alt="Teclado Gaming"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">Shop.com</h2>
            </div>
            <p className="leading-relaxed text-gray-600">
              Shop.com es un proveedor de bienes y servicios de TI con sede en
              Melbourne, de propiedad australiana; operando desde 1991. Nuestra
              base de clientes abarca individuos, pequeñas empresas, escuelas y
              organizaciones gubernamentales. Proporcionamos soluciones
              completas de TI empresarial, realizadas con hardware de alta
              calidad y un servicio al cliente excepcional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
