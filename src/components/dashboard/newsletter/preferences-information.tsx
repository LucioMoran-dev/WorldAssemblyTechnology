import Link from "next/link";

import { Button } from "@/components/ui/button";

function PreferencesInformation() {
  return (
    <>
      <div className="flex gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Guardar Preferencias
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Cancelar</Link>
        </Button>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Puedes cancelar tu suscripción en cualquier momento. Respetamos tu
        privacidad y nunca compartiremos tu información con terceros.
      </p>
    </>
  );
}

export default PreferencesInformation;
