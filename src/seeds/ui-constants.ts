import { Cpu, HardDrive, Laptop, Monitor, Package } from "lucide-react";

export const features = [
  {
    icon: "🚚",
    title: "Envío Gratis",
    description: "En pedidos superiores a $50",
  },
  {
    icon: "💳",
    title: "Pago Seguro",
    description: "Protección garantizada",
  },
  {
    icon: "🔄",
    title: "Devolución en 30 Días",
    description: "Garantía de devolución de dinero",
  },
  {
    icon: "🎧",
    title: "Soporte 24/7",
    description: "Atención al cliente dedicada",
  },
];

// Marcas para el showcase
export const brands = [
  { name: "ROCCAT", logo: "/roccat-logo.jpg" },
  { name: "MSI", logo: "/msi-logo.png" },
  { name: "Razer", logo: "/razer-logo.jpg" },
  { name: "Thermaltake", logo: "/thermaltake-logo.jpg" },
  { name: "ADATA", logo: "/adata-logo.jpg" },
  { name: "HP", logo: "/generic-tech-logo.png" },
  { name: "GIGABYTE", logo: "/gigabyte-logo.jpg" },
  { name: "Intel", logo: "/intel-logo.png" },
  { name: "Dell", logo: "/pngwing.com.png" },
  { name: "ASUS", logo: "/pngAsus.com.png" },
  { name: "AMD", logo: "/pngAmd.com.png" },
  { name: "Acer", logo: "/pngAcer.com.png" },
  { name: "Nvidia", logo: "/pngNvidia.com.png" },
  { name: "Logitech", logo: "/pngLogitech.com.png" },
  { name: "AOC", logo: "/AOC-logo.png" },
  { name: "Akko", logo: "/akko-logo.png" },
  { name: "Anne Pro", logo: "/ANNEPRO-logo.png" },
  { name: "Apple", logo: "/apple-logo.png" },
  { name: "BenQ", logo: "/benq-logo.png" },
  { name: "Brother", logo: "/brother-logo.png" },
  { name: "Canon", logo: "/canon-logo.png" },
  { name: "Corsair", logo: "/corsair-logo.png" },
  { name: "CyberPowerPC", logo: "/CyberPowerPC-logo.png" },
  { name: "Ducky", logo: "/Ducky-logo.png" },
  { name: "Elgato", logo: "/Elgato-logo.png" },
  { name: "Endgame Gear", logo: "/EndgameGear-logo.png" },
  { name: "Epson", logo: "/Epson-logo.png" },
  { name: "G.Skill", logo: "/G.Skill-logo.png" },
  { name: "Huawei", logo: "/Huawei-logo.png" },
  { name: "HyperX", logo: "/HyperX-logo.png" },
  { name: "iBUYPOWER", logo: "/iBUYPOWER-logo.png" },
  { name: "Keychron", logo: "/Keychron-logo.png" },
  { name: "LG", logo: "/LG-logo.png" },
  { name: "Lenovo", logo: "/Lenovo-logo.png" },
  { name: "Lian Li", logo: "/LianLi-logo.png" },
  { name: "Maingear", logo: "/Maingear-logo.png" },
  { name: "Microsoft", logo: "/Microsoft-logo.png" },
  { name: "NZXT BLD", logo: "/NZXTBLD-logo.png" },
  { name: "Netgear", logo: "/Netgear-logo.png" },
  { name: "Noctua", logo: "/Noctua-logo.png" },
  { name: "Origin PC", logo: "/OriginPC-logo.png" },
  { name: "Samsung", logo: "/Samsung-logo.png" },
  { name: "Seagate", logo: "/Seagate-logo.png" },
  { name: "Seasonic", logo: "/Seasonic-logo.png" },
  { name: "SteelSeries", logo: "/SteelSeries-logo.png" },
  { name: "TP-Link", logo: "/TP-Link-logo.png" },
  { name: "Ubiquiti", logo: "/Ubiquiti-logo.png" },
  { name: "ViewSonic", logo: "/ViewSonic-logo.png" },
  { name: "Western Digital", logo: "/WesternDigital-logo.png" },
  { name: "Wooting", logo: "/Wooting-logo.png" },
  { name: "Xiaomi", logo: "/Xiaomi-logo.png" },
  { name: "Zowie", logo: "/Zowie-logo.png" },
];

// Menu items del dashboard
export const dashboardMenuItems = [
  { label: "Panel Principal", href: "/dashboard" },
  { label: "Información de la Cuenta", href: "/dashboard/account-info" },
  { label: "Mis Pedidos", href: "/dashboard/orders" },
  { label: "Mis Direcciones", href: "/dashboard/addresses" },
  { label: "Lista de Deseos", href: "/dashboard/wishlist" },
  { label: "Acuerdos de Facturación", href: "/dashboard/billing" },
  { label: "Suscripciones al Boletín", href: "/dashboard/newsletter" },
];

// Testimonios (se pueden rotar)
export const testimonials = [
  {
    quote:
      "Mi primera orden llegó hoy en perfectas condiciones. Desde que envié una pregunta sobre el producto hasta realizar la compra, el envío y ahora la entrega, TechStore se mantuvo en contacto. Un servicio excepcional. Espero comprar nuevamente y lo recomiendo ampliamente.",
    author: "— Tama Brown",
  },
  {
    quote:
      "Excelente experiencia de compra. Los productos llegaron en tiempo y forma. El soporte técnico fue muy útil para resolver mis dudas.",
    author: "— Carlos Rodríguez",
  },
  {
    quote:
      "La mejor tienda de tecnología. Precios competitivos y atención personalizada. Totalmente recomendado.",
    author: "— María González",
  },
];

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  footnote: string;
  image: string;
  imageAlt: string;
  chipTitle: string;
  chipValue: string;
  chipSubtitle: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "desktop-msi-monitor-gift",
    badge: "OFERTA EXCLUSIVA",
    title: "CONSIGUE UN MONITOR GAMING DE REGALO",
    description: "AL COMPRAR CUALQUIER DESKTOP GAMING MSI SELECCIONADO",
    primaryCtaLabel: "COMPRAR AHORA",
    primaryCtaHref: "/products/catalog/desktop-pcs",
    secondaryCtaLabel: "MAS INFORMACION",
    secondaryCtaHref: "/products/catalog/monitors",
    footnote: "*Promocion valida hasta el 31 de diciembre de 2026",
    image: "/msi-gaming-laptop-with-rgb-lighting.jpg",
    imageAlt: "Desktop gamer MSI en promocion",
    chipTitle: "Intel Core",
    chipValue: "i9",
    chipSubtitle: "13th Gen",
  },
  {
    id: "laptops-gaming-hot-deal",
    badge: "NUEVO INGRESO",
    title: "LAPTOPS GAMING CON DESCUENTOS REALES",
    description: "ENCONTRA MODELOS CON RTX Y STOCK INMEDIATO",
    primaryCtaLabel: "VER LAPTOPS",
    primaryCtaHref: "/products/catalog/laptops",
    secondaryCtaLabel: "VER OFERTAS",
    secondaryCtaHref: "/products/catalog/products",
    footnote: "*Financiacion disponible en productos seleccionados",
    image: "/gaming-laptop-red-and-black.jpg",
    imageAlt: "Laptop gaming roja con teclado RGB",
    chipTitle: "NVIDIA",
    chipValue: "RTX",
    chipSubtitle: "Serie 40",
  },
  {
    id: "custom-builds-premium",
    badge: "ARMA TU PC",
    title: "CONFIGURA TU CUSTOM BUILD A MEDIDA",
    description: "SELECCIONA COMPONENTES PREMIUM Y RECIBI ASESORIA TECNICA",
    primaryCtaLabel: "IR A CUSTOM BUILDS",
    primaryCtaHref: "/products/catalog/custom-builds",
    secondaryCtaLabel: "VER COMPONENTES",
    secondaryCtaHref: "/products/catalog/pc-parts",
    footnote: "*Soporte tecnico y armado profesional incluido",
    image: "/custom-gaming-pc-with-rgb-lights.jpg",
    imageAlt: "PC custom con iluminacion RGB",
    chipTitle: "Power",
    chipValue: "DDR5",
    chipSubtitle: "High Speed",
  },
];

// Tabs para secciones de productos
export const laptopTabs = [
  "Laptops",
  "Laptops Gaming",
  "Ultrabooks",
  "MSI Series GS,GT,GL,GE",
  "MacBooks",
];

export const desktopTabs = [
  "Desktops",
  "Gaming Desktops",
  "All-in-One PCs",
  "MSI Series",
];

// Estadísticas de clientes
export const customerStats = [
  { value: "5,000+", label: "Clientes Satisfechos" },
  { value: "10,000+", label: "Productos Vendidos" },
  { value: "99%", label: "Tasa de Satisfacción" },
  { value: "24/7", label: "Soporte Técnico" },
];

// ─── Opciones de filtros de variantes para el catálogo ───

export const RAM_OPTIONS = [
  { value: "4GB", label: "4 GB" },
  { value: "8GB", label: "8 GB" },
  { value: "16GB", label: "16 GB" },
  { value: "32GB", label: "32 GB" },
  { value: "64GB", label: "64 GB" },
];

export const STORAGE_OPTIONS = [
  { value: "128GB", label: "128 GB" },
  { value: "256GB", label: "256 GB" },
  { value: "512GB", label: "512 GB" },
  { value: "1TB", label: "1 TB" },
  { value: "2TB", label: "2 TB" },
];

export const PROCESSOR_OPTIONS = [
  { value: "Intel Core i3", label: "Intel Core i3" },
  { value: "Intel Core i5", label: "Intel Core i5" },
  { value: "Intel Core i7", label: "Intel Core i7" },
  { value: "Intel Core i9", label: "Intel Core i9" },
  { value: "AMD Ryzen 3", label: "AMD Ryzen 3" },
  { value: "AMD Ryzen 5", label: "AMD Ryzen 5" },
  { value: "AMD Ryzen 7", label: "AMD Ryzen 7" },
  { value: "AMD Ryzen 9", label: "AMD Ryzen 9" },
  { value: "Apple M1", label: "Apple M1" },
  { value: "Apple M2", label: "Apple M2" },
  { value: "Apple M3", label: "Apple M3" },
];

export const VRAM_OPTIONS = [
  { value: "4GB", label: "4 GB" },
  { value: "6GB", label: "6 GB" },
  { value: "8GB", label: "8 GB" },
  { value: "12GB", label: "12 GB" },
  { value: "16GB", label: "16 GB" },
  { value: "24GB", label: "24 GB" },
];

export const SCREEN_SIZE_OPTIONS = [
  { value: "13", label: '13"' },
  { value: "14", label: '14"' },
  { value: "15.6", label: '15.6"' },
  { value: "17", label: '17"' },
  { value: "24", label: '24"' },
  { value: "27", label: '27"' },
  { value: "32", label: '32"' },
  { value: "34", label: '34"' },
];

export const RESOLUTION_OPTIONS = [
  { value: "1920x1080", label: "Full HD (1080p)" },
  { value: "2560x1440", label: "QHD (1440p)" },
  { value: "3840x2160", label: "4K UHD" },
  { value: "2560x1080", label: "UltraWide FHD" },
  { value: "3440x1440", label: "UltraWide QHD" },
];

export const REFRESH_RATE_OPTIONS = [
  { value: "60Hz", label: "60 Hz" },
  { value: "75Hz", label: "75 Hz" },
  { value: "120Hz", label: "120 Hz" },
  { value: "144Hz", label: "144 Hz" },
  { value: "165Hz", label: "165 Hz" },
  { value: "240Hz", label: "240 Hz" },
  { value: "360Hz", label: "360 Hz" },
];

export const CONNECTIVITY_OPTIONS = [
  { value: "WiFi", label: "WiFi" },
  { value: "Bluetooth", label: "Bluetooth" },
  { value: "Ethernet", label: "Ethernet" },
  { value: "USB-C", label: "USB-C" },
  { value: "Thunderbolt", label: "Thunderbolt" },
  { value: "HDMI", label: "HDMI" },
  { value: "DisplayPort", label: "DisplayPort" },
];

export const CONDITION_OPTIONS = [
  { value: "new", label: "Nuevo" },
  { value: "refurbished", label: "Reacondicionado" },
  { value: "open-box", label: "Caja Abierta" },
  { value: "used", label: "Usado" },
];

// ─── Mapeo de filtros de specs por categoría ───

export const CATEGORY_SPEC_FILTERS: Record<string, string[]> = {
  laptops: ["processor", "ram", "storage", "vram", "screen_size", "resolution", "refresh_rate", "connectivity", "condition"],
  "desktop-pcs": ["processor", "ram", "storage", "vram", "connectivity", "condition"],
  monitors: ["screen_size", "resolution", "refresh_rate", "connectivity", "condition"],
  networking: ["connectivity", "condition"],
  printers: ["connectivity", "condition"],
  "pc-parts": ["processor", "ram", "storage", "vram", "condition"],
  "custom-builds": ["processor", "ram", "storage", "vram", "connectivity", "condition"],
};

export const ALL_SPEC_FILTER_KEYS = [
  "processor", "ram", "storage", "vram",
  "screen_size", "resolution", "refresh_rate",
  "connectivity", "condition",
];

export function getVisibleSpecFilters(categorySlug?: string): string[] {
  if (!categorySlug) return ALL_SPEC_FILTER_KEYS;
  return CATEGORY_SPEC_FILTERS[categorySlug.toLowerCase()] ?? ALL_SPEC_FILTER_KEYS;
}

// iconos y valores para el formulario de reparación
export const deviceTypes = [
  { icon: Laptop, name: "Laptop", value: "laptop" },
  { icon: Monitor, name: "Desktop PC", value: "desktop" },
  { icon: Monitor, name: "Monitor", value: "monitor" },
  { icon: HardDrive, name: "Disco Duro", value: "hard-drive" },
  { icon: Cpu, name: "Componente", value: "component" },
  { icon: Package, name: "Otro", value: "other" },
];
