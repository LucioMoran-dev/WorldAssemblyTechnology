import { Mail } from "lucide-react";

function GeneralBulletin() {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
        <Mail className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h2 className="mb-2 text-xl font-bold text-foreground">
          Boletin General
        </h2>
        <p className="text-muted-foreground">
          Recibe las ultimas noticias, ofertas especiales y actualizaciones de
          productos directamente en tu correo electronico.
        </p>
      </div>
    </div>
  );
}

export default GeneralBulletin;
