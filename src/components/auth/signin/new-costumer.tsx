import Link from "next/link";

import { Button } from "../../ui/button";

function NewCostumer() {
  return (
    <div className="w-full rounded-lg bg-muted/40 p-8">
      <h2 className="mb-4 text-xl font-semibold">¿Nuevo Cliente?</h2>
      <p className="mb-4 text-muted-foreground">
        Crear una cuenta tiene muchos beneficios:
      </p>

      <ul className="mb-6 space-y-2 text-muted-foreground">
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
