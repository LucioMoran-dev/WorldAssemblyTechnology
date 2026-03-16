import { CheckCircle2, Shield } from "lucide-react";

export function SidebarInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Info */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 font-bold text-foreground">
          Información de Contacto
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="mb-1 text-muted-foreground">Teléfono</p>
            <p className="font-medium text-foreground">(00) 1234 5678</p>
          </div>
          <div>
            <p className="mb-1 text-muted-foreground">Email</p>
            <p className="font-medium text-foreground">
              reparaciones@techstore.com
            </p>
          </div>
          <div>
            <p className="mb-1 text-muted-foreground">Horario</p>
            <p className="font-medium text-foreground">
              Lun-Jue: 9:00 AM - 5:30 PM
            </p>
            <p className="font-medium text-foreground">Vie: 9:00 AM - 6:00 PM</p>
            <p className="font-medium text-foreground">Sáb: 11:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-4 font-bold text-foreground">
          Servicios que Ofrecemos
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <span>Reparación de laptops y notebooks</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <span>Mantenimiento de PCs de escritorio</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <span>Reemplazo de pantallas y teclados</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <span>Recuperación de datos</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <span>Limpieza y optimización</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <span>Instalación de software</span>
          </li>
        </ul>
      </div>

      {/* Warranty */}
      <div className="rounded-xl bg-gray-900 p-6 text-white">
        <Shield className="mb-3 h-10 w-10 text-blue-400" />
        <h3 className="mb-2 font-bold">Garantía de 90 Días</h3>
        <p className="text-sm text-gray-300">
          Todas nuestras reparaciones incluyen garantía de 90 días en mano de
          obra y repuestos.
        </p>
      </div>
    </div>
  );
}
