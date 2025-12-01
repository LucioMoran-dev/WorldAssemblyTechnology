import Link from "next/link";

import { Button } from "../../ui/button";

function NewCostumer() {
  return (
    <div className="rounded-lg bg-gray-50 p-8">
      <h2 className="mb-4 text-xl font-semibold">¿Nuevo Cliente?</h2>
      <p className="mb-4 text-gray-600">
        Crear una cuenta tiene muchos beneficios:
      </p>

      <ul className="mb-6 space-y-2 text-gray-700">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Pagar más rápido</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Guardar más de una dirección</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
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
