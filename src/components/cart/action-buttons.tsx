import { Button } from "../ui/button";

function ActionButtons() {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" className="border-border bg-transparent">
        Continuar Comprando
      </Button>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="border-black bg-black text-white hover:bg-gray-800"
        >
          Limpiar Carrito
        </Button>
        <Button className="bg-black text-white hover:bg-gray-800">
          Actualizar Carrito
        </Button>
      </div>
    </div>
  );
}

export default ActionButtons;
