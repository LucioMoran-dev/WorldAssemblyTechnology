export function TestimonialSection() {
  return (
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
          Mi primer pedido llegó hoy en perfectas condiciones. Desde el momento
          en que envié una pregunta sobre el artículo hasta realizar la compra,
          el envío y ahora la entrega, su empresa, Tecs, se mantuvo en contacto.
          Un servicio excelente. Espero comprar en su sitio en el futuro y lo
          recomendaría ampliamente.
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
  );
}
