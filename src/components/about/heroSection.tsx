import Image from "next/image";

export function HeroSectionAbout() {
  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl leading-tight font-bold">
              Una Familia Que Sigue
              <br />
              Creciendo
            </h2>
            <p className="mb-4 text-gray-300">
              Siempre buscamos satisfacer al mercado hogareño, proporcionando
              excelentes computadoras y hardware a precios accesibles para
              clientes no corporativos, a través de nuestro gran showroom en
              Melbourne CBD y nuestra tienda online.
            </p>
            <p className="text-gray-300">
              El enfoque de gestión de nuestra tienda fomenta un fuerte enfoque
              en el servicio al cliente en nuestro personal. Tenemos un equipo
              de ventas que conoce nuestros productos y puede ayudarte a tomar
              la decisión correcta para tus necesidades, una buena selección en
              interés de nuestro éxito a largo plazo.
            </p>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image
              src="/modern-office-showroom-with-computers.jpg"
              alt="Showroom de Oficina"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
