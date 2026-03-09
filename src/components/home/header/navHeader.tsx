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
  "group relative rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap text-slate-200 transition-all duration-200 ease-out hover:text-white focus-visible:text-white focus-visible:outline-none after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-blue-400 after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100";

function OffersButton() {
  return (
    <Button
      variant="default"
      size="sm"
      className="ml-1 bg-gradient-to-r from-blue-600 to-blue-700 px-3 text-sm whitespace-nowrap text-white shadow-md ring-1 ring-blue-300/30 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:ring-blue-300/50 xl:px-5"
    >
      Ofertas
    </Button>
  );
}

export function NavHeaderCategorias() {
  return (
    <nav className="hidden flex-1 items-center justify-end gap-1 rounded-2xl border border-slate-700/80 bg-[#23262d] px-2 py-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.28)] lg:mr-2 lg:flex xl:gap-2 xl:px-3">
      {categories.map((category) => (
        <Link
          key={category.href}
          href={category.href}
          className={categoryLinkClass}
        >
          {category.label}
        </Link>
      ))}
      <Link href="/products/catalog/products">
        <OffersButton />
      </Link>
    </nav>
  );
}

export function NavHeaderCategoriasMobile() {
  return (
    <div className="border-t border-border py-3 lg:hidden">
      <nav className="max-h-[65vh] overflow-y-auto rounded-2xl border border-slate-700/80 bg-[#23262d] p-2 shadow-[0_8px_24px_rgba(15,23,42,0.28)]">
        <div className="flex flex-col gap-1">
          {categories.map((category) => (
            <Link
              key={`mobile-${category.href}`}
              href={category.href}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition-colors duration-200 hover:bg-slate-800/70 hover:text-white focus-visible:bg-slate-800/70 focus-visible:text-white focus-visible:outline-none"
            >
              {category.label}
            </Link>
          ))}
        </div>
        <Link href="/products/catalog/products" className="mt-2 block">
          <Button
            variant="default"
            size="sm"
            className="h-10 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-sm font-semibold text-white shadow-md ring-1 ring-blue-300/30 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:ring-blue-300/50"
          >
            Ofertas
          </Button>
        </Link>
      </nav>
    </div>
  );
}
