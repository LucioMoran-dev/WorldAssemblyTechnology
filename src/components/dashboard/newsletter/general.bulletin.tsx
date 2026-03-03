import { Mail } from "lucide-react";

function GeneralBulletin() {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
        <Mail className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Boletín General
        </h2>
        <p className="text-gray-600">
          Recibe las últimas noticias, ofertas especiales y actualizaciones de
          productos directamente en tu correo electrónico.
        </p>
      </div>
    </div>
  );
}

export default GeneralBulletin;
