import { Headphones, Tag, User } from "lucide-react";

function Characteristics() {
  return (
    <>
      <section className="-mx-4 mt-12 bg-muted/40 px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Headphones className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">
              Soporte de Producto
            </h3>
            <p className="text-sm text-muted-foreground">
              Hasta 3 años de garantia este es un sitio disponible para tu
              tranquilidad.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <User className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">Cuenta Personal</h3>
            <p className="text-sm text-muted-foreground">
              Con grandes descuentos, envios gratis y un especialista de soporte
              dedicado.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Tag className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">
              Ahorros Increbles
            </h3>
            <p className="text-sm text-muted-foreground">
              Hasta 70% de descuento en productos nuevos, puedes estar seguro
              del mejor precio.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Characteristics;
