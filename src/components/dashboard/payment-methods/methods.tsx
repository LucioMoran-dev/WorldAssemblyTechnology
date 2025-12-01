import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

function Methods() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">
        Métodos de Pago Guardados
      </h1>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Plus className="mr-2 h-4 w-4" />
        Agregar Método de Pago
      </Button>
    </div>
  );
}

export default Methods;
