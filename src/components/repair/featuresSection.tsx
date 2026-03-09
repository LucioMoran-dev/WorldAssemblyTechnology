import { Clock, Shield, Wrench } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="bg-muted py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Wrench className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">
              Soporte TÃ©cnico Experto
            </h3>
            <p className="text-sm text-muted-foreground">
              TÃ©cnicos certificados con aÃ±os de experiencia en reparaciÃ³n de
              equipos.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">ReparaciÃ³n RÃ¡pida</h3>
            <p className="text-sm text-muted-foreground">
              La mayorÃ­a de reparaciones se completan en 2-3 dÃ­as hÃ¡biles.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">GarantÃ­a Extendida</h3>
            <p className="text-sm text-muted-foreground">
              90 dÃ­as de garantÃ­a en todas las reparaciones realizadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

