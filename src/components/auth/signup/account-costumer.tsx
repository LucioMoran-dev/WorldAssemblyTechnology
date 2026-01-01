import Link from "next/link";

import { Button } from "@/components/ui/button";

function AccountCostumer() {
  return (
    <div className="rounded-lg bg-gray-50 p-8">
      <h2 className="mb-4 text-xl font-semibold">¿Ya Tienes Una Cuenta?</h2>
      <p className="mb-4 text-gray-600">
        Inicia sesión para acceder a tu cuenta y disfrutar estos beneficios:
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

      <Link href="/auth/singin">
        <Button
          variant="outline"
          className="w-full border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50"
        >
          Iniciar Sesión
        </Button>
      </Link>
    </div>
  );
}

export default AccountCostumer;
