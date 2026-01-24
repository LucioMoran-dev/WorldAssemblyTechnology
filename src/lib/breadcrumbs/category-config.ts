export const categoryConfig = {
  laptops: { title: "Laptops", breadcrumb: "Laptops" },
  "desktop-pcs": {
    title: "PCs de Escritorio",
    breadcrumb: "PCs de Escritorio",
  },
  networking: {
    title: "Dispositivos de Red",
    breadcrumb: "Dispositivos de Red",
  },
  printers: {
    title: "Impresoras y Escáneres",
    breadcrumb: "Impresoras y Escáneres",
  },
  "pc-parts": { title: "Partes de PC", breadcrumb: "Partes de PC" },
  products: {
    title: "Todos los demás productos",
    breadcrumb: "Todos los demás productos",
  },
  repairs: { title: "Reparaciones", breadcrumb: "Reparaciones" },
  "all-products": {
    title: "Todos los Productos",
    breadcrumb: "Todos los Productos",
  },
  "new-products": { title: "Nuevos Productos", breadcrumb: "Nuevos Productos" },
  "custom-builds": { title: "Personalizados", breadcrumb: "Personalizados" },
  "msi-laptops": { title: "Laptops MSI", breadcrumb: "Laptops MSI" },
  desktops: { title: "Escritorios", breadcrumb: "Escritorios" },
  monitors: { title: "Monitores Gaming", breadcrumb: "Monitores Gaming" },
} as const;

type CategoryKey = keyof typeof categoryConfig;

export function formatBrandName(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function resolveCategoryConfig(slug: string) {
  const key = slug.toLowerCase() as CategoryKey;

  return (
    categoryConfig[key] ?? {
      title: `Productos de Marca: ${formatBrandName(slug)}`,
      breadcrumb: formatBrandName(slug),
    }
  );
}
