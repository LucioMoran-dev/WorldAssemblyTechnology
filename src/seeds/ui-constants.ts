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

// iconos y valores para el formulario de reparación
export const deviceTypes = [
  { icon: Laptop, name: "Laptop", value: "laptop" },
  { icon: Monitor, name: "Desktop PC", value: "desktop" },
  { icon: Monitor, name: "Monitor", value: "monitor" },
  { icon: HardDrive, name: "Disco Duro", value: "hard-drive" },
  { icon: Cpu, name: "Componente", value: "component" },
  { icon: Package, name: "Otro", value: "other" },
];
