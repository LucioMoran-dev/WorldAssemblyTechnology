/**
 * Constantes de UI estáticas que NO vienen de la base de datos
 * Solo para elementos de interfaz como features, brands, testimonios, etc.
 */

// Features del footer
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
];

// Menu items del dashboard
export const dashboardMenuItems = [
  { label: "Panel Principal", href: "/dashboard" },
  { label: "Información de la Cuenta", href: "/dashboard/account-info" },
  { label: "Mis Pedidos", href: "/dashboard/orders" },
  { label: "Mis Direcciones", href: "/dashboard/addresses" },
  { label: "Lista de Deseos", href: "/dashboard/wishlist" },
  { label: "Métodos de Pago Guardados", href: "/dashboard/payment-methods" },
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
