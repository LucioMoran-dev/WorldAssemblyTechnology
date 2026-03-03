import Image from "next/image";

export function DeliverySection() {
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
                  <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">
                Entregamos a Cualquier
                <br />
                Región
              </h2>
            </div>
            <p className="text-gray-300">
              Entregamos nuestros productos en toda Australia. No importa dónde
              vivas, tu pedido será enviado a tiempo y entregado directamente en
              tu puerta o en cualquier otra ubicación que hayas indicado. Los
              paquetes se manejan con el máximo cuidado, por lo que los
              productos pedidos te llegarán sanos y salvos, tal como esperas que
              sean.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/white-gaming-pc-case-with-tempered-glass.jpg"
              alt="Gabinete PC Gaming"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
