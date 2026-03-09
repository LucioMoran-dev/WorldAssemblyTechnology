import Link from "next/link";

import { Button } from "../../ui/button";

function NewCostumer() {
  return (
    <div className="bg-muted/40 rounded-lg p-8">
      <h2 className="mb-4 text-xl font-semibold">¿Nuevo Cliente?</h2>
      <p className="text-muted-foreground mb-4">
        Crear una cuenta tiene muchos beneficios:
      </p>

      <ul className="text-muted-foreground mb-6 space-y-2">
        <li className="flex items-start">
          <span>Pagar más rápido</span>
        </li>
        <li className="flex items-start">
          <span>Guardar más de una dirección</span>
        </li>
        <li className="flex items-start">
          <span>Seguir pedidos y más</span>
        </li>
      </ul>

      <Link href="/auth/signup">
        <Button className="w-full bg-blue-600 px-8 hover:bg-blue-700 sm:w-auto">
          Crear Una Cuenta
        </Button>
      </Link>
    </div>
  );
}

export default NewCostumer;
