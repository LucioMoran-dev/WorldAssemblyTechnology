import { MessageSquareWarning } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

function MyReviews() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-8 text-center">
      <MessageSquareWarning className="mx-auto mb-4 h-10 w-10 text-amber-700" />
      <h3 className="mb-2 text-lg font-semibold text-amber-900">
        Mis resenas aun no disponibles
      </h3>
      <p className="mx-auto mb-6 max-w-2xl text-sm text-amber-900">
        La guia del backend no expone un endpoint dedicado para listar resenas del usuario autenticado.
        Actualmente solo existen endpoints por producto (publico) y listado global para admin. Esta vista queda
        en fallback explicito hasta que el backend agregue un endpoint &quot;my-reviews&quot;.
      </p>
      <Button asChild>
        <Link href="/dashboard/orders">Ir a mis ordenes</Link>
      </Button>
    </div>
  );
}

export default MyReviews;
