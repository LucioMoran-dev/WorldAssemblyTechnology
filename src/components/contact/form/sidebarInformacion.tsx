import { Clock, Mail, MapPin, Phone } from "lucide-react";

export function SidebarInformacion() {
  return (
    <div className="space-y-6">
      {/* Tarjeta de Contacto */}
      <div className="rounded-lg bg-gray-900 p-8 text-white">
        <h3 className="mb-6 text-lg font-semibold">Informacion de Contacto</h3>

        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Direccion</p>
              <p className="text-sm text-gray-400">
                1234 Street Address City Address, 1234
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Telefono</p>
              <a
                href="tel:0012345678"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                (00) 1234 5678
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Email</p>
              <a
                href="mailto:shop@email.com"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                shop@email.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Horarios</p>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Lun - Jue: 9:00 AM - 5:30 PM</p>
                <p>Viernes: 9:00 AM - 6:00 PM</p>
                <p>Sabado: 11:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Rapido */}
      <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Preguntas Frecuentes
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Cuanto tarda la respuesta?
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Respondemos en un plazo de 24 a 48 horas habiles.
            </p>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-medium text-gray-800">
              Puedo visitar el showroom?
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Si, nuestro showroom esta abierto en los horarios indicados.
            </p>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-medium text-gray-800">
              Hacen envios a todo el pais?
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Si, realizamos envios a todas las provincias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
