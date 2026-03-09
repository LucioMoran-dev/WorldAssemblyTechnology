import { CheckCircle2, Clock, Shield, Wrench } from "lucide-react";

export function HeroSectionRepair() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-card/20 backdrop-blur-sm">
              <Wrench className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold md:text-5xl">
              Servicio de Reparaciones
            </h1>
          </div>
          <p className="mb-6 text-xl text-blue-100">
            Expertos certificados para reparar tu equipo tecnolÃ³gico.
            DiagnÃ³stico gratuito y garantÃ­a de 90 dÃ­as.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-300" />
              <span>TÃ©cnicos Certificados</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-300" />
              <span>ReparaciÃ³n RÃ¡pida</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-300" />
              <span>GarantÃ­a 90 DÃ­as</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

