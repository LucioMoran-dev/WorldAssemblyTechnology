import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

function AddressesButton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-3xl font-bold">
          Libreta de Direcciones
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Nueva Direccion
        </Button>
      </div>
    </div>
  );
}

export default AddressesButton;
