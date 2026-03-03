import Link from "next/link";

export function SidebarNavigation() {
  return (
    <div className="lg:sticky lg:top-4 lg:self-start">
      <div className="bg-muted/50 space-y-4 rounded-lg p-6">
        <h3 className="text-foreground font-bold">
          Definiciones e Interpretación
        </h3>
        <nav className="space-y-2 text-sm">
          <Link
            href="#general"
            className="text-muted-foreground hover:text-foreground block"
          >
            General
          </Link>
          <Link
            href="#quotations"
            className="text-muted-foreground hover:text-foreground block"
          >
            Cotizaciones
          </Link>
          <Link
            href="#prices"
            className="text-muted-foreground hover:text-foreground block"
          >
            Precios / Tasas
          </Link>
          <Link
            href="#credit-accounts"
            className="text-muted-foreground hover:text-foreground block"
          >
            Términos de Pago
          </Link>
          <Link
            href="#credit-accounts"
            className="text-muted-foreground hover:text-foreground block"
          >
            Cuentas de Crédito
          </Link>
          <Link
            href="#change-ownership"
            className="text-muted-foreground hover:text-foreground block"
          >
            Cambio de Propiedad
          </Link>
          <Link
            href="#information"
            className="text-muted-foreground hover:text-foreground block"
          >
            Información sobre los Productos Suministrados
          </Link>
          <Link
            href="#delivery"
            className="text-muted-foreground hover:text-foreground block"
          >
            Entrega
          </Link>
        </nav>
      </div>
    </div>
  );
}
