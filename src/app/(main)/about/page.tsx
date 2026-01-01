import { Headphones, User, Tag } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Page Title */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-4xl font-bold">Nosotros</h1>
      </div>

      {/* Hero Section */}
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
                El enfoque de gestión de nuestra tienda fomenta un fuerte
                enfoque en el servicio al cliente en nuestro personal. Tenemos
                un equipo de ventas que conoce nuestros productos y puede
                ayudarte a tomar la decisión correcta para tus necesidades, una
                buena selección en interés de nuestro éxito a largo plazo.
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

      {/* Shop.com Section */}
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
                Melbourne, de propiedad australiana; operando desde 1991.
                Nuestra base de clientes abarca individuos, pequeñas empresas,
                escuelas y organizaciones gubernamentales. Proporcionamos
                soluciones completas de TI empresarial, realizadas con hardware
                de alta calidad y un servicio al cliente excepcional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Hands Section */}
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
                procesador Intel® Core™ i7 de 10ma Gen. con el máximo poder de
                cómputo para brindarte una experiencia de juego sin igual.
              </p>
              <p className="text-sm text-gray-400">
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

      {/* Quality Section */}
      <section className="bg-white py-16">
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
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
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
              <p className="leading-relaxed text-gray-600">
                Garantizamos la más alta calidad de los productos que vendemos.
                Varias décadas de operación exitosa y millones de clientes
                satisfechos nos permiten estar seguros de eso. Además, todos los
                artículos que vendemos pasan por un exhaustivo control de
                calidad, por lo que ninguna discrepancia en las características
                puede escapar al ojo de nuestros profesionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
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
                Entregamos nuestros productos en toda Australia. No importa
                dónde vivas, tu pedido será enviado a tiempo y entregado
                directamente en tu puerta o en cualquier otra ubicación que
                hayas indicado. Los paquetes se manejan con el máximo cuidado,
                por lo que los productos pedidos te llegarán sanos y salvos, tal
                como esperas que sean.
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

      {/* Testimonial Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="mb-6 text-lg leading-relaxed text-gray-700">
            Mi primer pedido llegó hoy en perfectas condiciones. Desde el
            momento en que envié una pregunta sobre el artículo hasta realizar
            la compra, el envío y ahora la entrega, su empresa, Tecs, se mantuvo
            en contacto. Un servicio excelente. Espero comprar en su sitio en el
            futuro y lo recomendaría ampliamente.
          </blockquote>
          <p className="text-foreground font-semibold">— Tama Brown</p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="bg-primary h-2 w-2 rounded-full" />
            <div className="h-2 w-2 rounded-full bg-gray-300" />
            <div className="h-2 w-2 rounded-full bg-gray-300" />
            <div className="h-2 w-2 rounded-full bg-gray-300" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Soporte de Productos</h3>
              <p className="text-gray-600">
                Hasta 3 años de garantía en el sitio
                <br />
                disponible para tu tranquilidad.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Cuenta Personal</h3>
              <p className="text-gray-600">
                Con grandes descuentos, envío gratis y<br />
                un especialista de soporte dedicado.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Tag className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Ahorros Increíbles</h3>
              <p className="text-gray-600">
                Hasta 70% de descuento en productos nuevos,
                <br />
                puedes estar seguro del mejor precio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
