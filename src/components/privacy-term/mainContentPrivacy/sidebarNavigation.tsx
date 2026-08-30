import Link from "next/link";

export function SidebarNavigation() {
  return (
    <div className="lg:sticky lg:top-4 lg:self-start">
      <div className="space-y-4 rounded-lg bg-muted/50 p-6">
        <h3 className="font-bold text-foreground">
          Definiciones e Interpretación
        </h3>
        <nav className="space-y-2 text-sm">
          <Link
            href="#general"
            className="block text-muted-foreground hover:text-foreground"
          >
            General
          </Link>
          <Link
            href="#quotations"
            className="block text-muted-foreground hover:text-foreground"
          >
            Cotizaciones
          </Link>
          <Link
            href="#prices"
            className="block text-muted-foreground hover:text-foreground"
          >
            Precios / Tasas
          </Link>
          <Link
            href="#credit-accounts"
            className="block text-muted-foreground hover:text-foreground"
          >
            Términos de Pago
          </Link>
          <Link
            href="#credit-accounts"
            className="block text-muted-foreground hover:text-foreground"
          >
            Cuentas de Crédito
          </Link>
          <Link
            href="#change-ownership"
            className="block text-muted-foreground hover:text-foreground"
          >
            Cambio de Propiedad
          </Link>
          <Link
            href="#information"
            className="block text-muted-foreground hover:text-foreground"
          >
            Información sobre los Productos Suministrados
          </Link>
          <Link
            href="#delivery"
            className="block text-muted-foreground hover:text-foreground"
          >
            Entrega
          </Link>
        </nav>
      </div>
    </div>
  );
}
