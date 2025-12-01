import Link from "next/link";

import { Button } from "@/components/ui/button";

function ActionButton() {
  return (
    <div className="flex gap-4">
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
        Guardar Cambios
      </Button>
      <Button type="button" variant="outline" asChild>
        <Link href="/dashboard">Cancelar</Link>
      </Button>
    </div>
  );
}

export default ActionButton;
