import { Headphones, Tag, User } from "lucide-react";

export function FeaturesSectionAbout() {
  return (
    <section className="bg-card py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Headphones className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Soporte de Productos</h3>
            <p className="text-muted-foreground">
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
            <p className="text-muted-foreground">
              Con grandes descuentos, envío gratis y<br />
              un especialista de soporte dedicado.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Tag className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Ahorros Increíbles</h3>
            <p className="text-muted-foreground">
              Hasta 70% de descuento en productos nuevos,
              <br />
              puedes estar seguro del mejor precio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

