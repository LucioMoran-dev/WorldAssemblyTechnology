import Link from "next/link";

import { Button } from "@/components/ui/button";

const categories = [
  { href: "/products/catalog/laptops", label: "Laptops" },
  { href: "/products/catalog/desktop-pcs", label: "PCs" },
  { href: "/products/catalog/networking", label: "Redes" },
  { href: "/products/catalog/printers", label: "Impresoras" },
  { href: "/products/catalog/pc-parts", label: "Componentes" },
  { href: "/products/catalog/products", label: "Más" },
  { href: "/repairs", label: "Reparaciones" },
];

const categoryLinkClass =
  "group relative rounded-full px-1.5 py-0.5 text-[11px] font-medium whitespace-nowrap text-muted-foreground transition-all duration-200 ease-out hover:text-foreground focus-visible:text-foreground focus-visible:outline-none after:absolute after:left-1.5 after:right-1.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-blue-400 after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 lg:px-2 lg:text-xs xl:px-3 xl:text-sm";

function OffersButton() {
  return (
    <Button
      variant="default"
      size="sm"
      className="ml-1 px-2.5 text-[11px] whitespace-nowrap lg:px-2 lg:text-xs xl:px-4 xl:text-sm"
    >
      Ofertas
    </Button>
  );
}

export function NavHeaderCategorias() {
  return (
    <nav className="hidden flex-1 items-center justify-end gap-0.5 rounded-full border border-border bg-card/90 px-1 py-1 shadow-lg lg:mr-1 lg:flex xl:gap-2 xl:px-3">
      {categories.map((category) => (
        <Link
          key={category.href}
          href={category.href}
          className={categoryLinkClass}
        >
          {category.label}
        </Link>
      ))}
      <Link href="/products/catalog/products?discounted=true&featured=true">
        <OffersButton />
      </Link>
    </nav>
  );
}

export function NavHeaderCategoriasMobile() {
  return (
    <div className="border-t border-border py-3 lg:hidden">
      <nav className="max-h-[65vh] overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-lg">
        <div className="flex flex-col gap-1">
          {categories.map((category) => (
            <Link
              key={`mobile-${category.href}`}
              href={category.href}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted/70 hover:text-foreground focus-visible:bg-muted/70 focus-visible:text-foreground focus-visible:outline-none"
            >
              {category.label}
            </Link>
          ))}
        </div>
        <Link href="/products/catalog/products?discounted=true&featured=true" className="mt-2 block">
          <Button
            variant="default"
            size="sm"
            className="h-10 w-full text-sm font-semibold"
          >
            Ofertas
          </Button>
        </Link>
      </nav>
    </div>
  );
}
