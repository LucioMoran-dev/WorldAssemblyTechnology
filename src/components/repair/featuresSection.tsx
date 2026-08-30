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
              Soporte Técnico Experto
            </h3>
            <p className="text-sm text-muted-foreground">
              Técnicos certificados con años de experiencia en reparación de
              equipos.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">
              Reparación Rápida
            </h3>
            <p className="text-sm text-muted-foreground">
              La mayoría de reparaciones se completan en 2-3 días hábiles.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">
              Garantía Extendida
            </h3>
            <p className="text-sm text-muted-foreground">
              90 días de garantía en todas las reparaciones realizadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
