export const newProducts = [
  {
    id: "1",
    name: "MSI Katana 15 Gaming Laptop - RTX 4070, Intel i7-13620H",
    price: 1299.0,
    originalPrice: 1499.0,
    rating: 5,
    reviews: 12,
    image: "/msi-laptop.jpg",
    inStock: true,
  },
  {
    id: "2",
    name: "MSI Cyborg 15 Gaming Laptop - RTX 4060, Intel i5-12450H",
    price: 899.0,
    originalPrice: 1099.0,
    rating: 4,
    reviews: 8,
    image: "/gaming-laptop.png",
    inStock: true,
  },
  {
    id: "3",
    name: "MSI MAG Infinite S3 Gaming Desktop - RTX 4060 Ti",
    price: 1599.0,
    originalPrice: 1799.0,
    rating: 5,
    reviews: 15,
    image: "/desktop-pc.jpg",
    inStock: true,
  },
  {
    id: "4",
    name: "MSI Thin GF63 Gaming Laptop - RTX 4050, Intel i5-12450H",
    price: 799.0,
    originalPrice: 999.0,
    rating: 4,
    reviews: 6,
    image: "/gaming-laptop-red.jpg",
    inStock: true,
  },
  {
    id: "5",
    name: "MSI Aegis RS Gaming Desktop - RTX 4070, Intel i7-13700F",
    price: 1899.0,
    originalPrice: 2199.0,
    rating: 5,
    reviews: 10,
    image: "/desktop-tower.jpg",
    inStock: true,
  },
];

export const customBuilds = [
  {
    id: "6",
    name: "Custom Gaming PC - RTX 4080, AMD Ryzen 9 7900X",
    price: 2499.0,
    rating: 5,
    reviews: 20,
    image: "/custom-gaming-pc.jpg",
    badge: "CUSTOM BUILD",
    inStock: true,
  },
  {
    id: "7",
    name: "Charlie 12 Custom Build - RTX 4070 Ti, Intel i7-13700K",
    price: 2199.0,
    rating: 5,
    reviews: 14,
    image: "/gaming-pc-orange.jpg",
    badge: "CHARLIE 12",
    inStock: true,
  },
  {
    id: "8",
    name: "Bravo 15 Custom Build - RTX 4060 Ti, AMD Ryzen 7 7700X",
    price: 1799.0,
    rating: 4,
    reviews: 11,
    image: "/gaming-pc-red.jpg",
    badge: "BRAVO 15",
    inStock: true,
  },
  {
    id: "9",
    name: "Alpha 12 Custom Build - RTX 4090, Intel i9-13900K",
    price: 3499.0,
    rating: 5,
    reviews: 25,
    image: "/gaming-pc-purple.jpg",
    badge: "ALPHA 12",
    inStock: true,
  },
];

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

export const categories = [
  {
    name: "Everyday Use Notebooks",
    href: "/category/everyday-notebooks",
    hasSubmenu: true,
  },
  {
    name: "MSI Workstation Series",
    href: "/category/workstation",
    hasSubmenu: true,
  },
  {
    name: "MSI Prestige Series",
    href: "/category/prestige",
    hasSubmenu: false,
  },
  {
    name: "Gaming Notebooks",
    href: "/category/gaming",
    hasSubmenu: false,
  },
  {
    name: "Tablets And Pads",
    href: "/category/tablets",
    hasSubmenu: false,
  },
  {
    name: "Netbooks",
    href: "/category/netbooks",
    hasSubmenu: false,
  },
  {
    name: "Infinity Gaming Notebooks",
    href: "/category/infinity-gaming",
    hasSubmenu: false,
  },
];

export const customer = [
  { number: "15K+", label: "Clientes Satisfechos" },
  { number: "98%", label: "Tasa de Satisfacción" },
  { number: "24/7", label: "Soporte Técnico" },
  { number: "500+", label: "Productos Disponibles" },
];

export const addresses = [
  {
    id: 1,
    type: "Facturación",
    name: "Alex Driver",
    street: "1234 Street Address",
    city: "City Address",
    state: "State",
    zip: "1234",
    country: "País",
    phone: "(00) 1234 5678",
    isDefault: true,
  },
];

export const orders = [
  {
    id: "#000123",
    date: "15 Enero 2024",
    status: "Entregado",
    total: "$1,497.00",
    items: 3,
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: "#000122",
    date: "10 Enero 2024",
    status: "En Tránsito",
    total: "$499.00",
    items: 1,
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "#000121",
    date: "5 Enero 2024",
    status: "Procesando",
    total: "$998.00",
    items: 2,
    statusColor: "bg-yellow-100 text-yellow-700",
  },
];

export const menuItems = [
  { label: "Panel de Cuenta", href: "/dashboard" },
  { label: "Información de Cuenta", href: "/dashboard/account-info" },
  { label: "Libreta de Direcciones", href: "/dashboard/addresses" },
  { label: "Mis Pedidos", href: "/dashboard/orders" },
  { label: "Mis Productos Descargables", href: "/dashboard/downloads" },
  { label: "Métodos de Pago Guardados", href: "/dashboard/payment-methods" },
  { label: "Acuerdos de Facturación", href: "/dashboard/billing" },
  { label: "Mi Lista de Deseos", href: "/dashboard/wishlist" },
  { label: "Mis Reseñas de Productos", href: "/dashboard/reviews" },
  { label: "Suscripciones al Boletín", href: "/dashboard/newsletter" },
];

export const relatedProducts = [
  {
    id: "2",
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    price: 499.0,
    originalPrice: 599.0,
    rating: 4,
    reviews: 28,
    image: "/msi-laptop.jpg",
    badge: "INTEL i7",
    inStock: true,
  },
  {
    id: "3",
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    price: 499.0,
    rating: 5,
    reviews: 35,
    image: "/msi-desktop-tower.jpg",
    badge: "BRAVO 15",
    inStock: true,
  },
  {
    id: "4",
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    price: 499.0,
    rating: 4,
    reviews: 19,
    image: "/msi-monitor.jpg",
    badge: "ALPHA 15",
    inStock: true,
  },
  {
    id: "5",
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    price: 499.0,
    rating: 4,
    reviews: 22,
    image: "/msi-gaming-pc.jpg",
    badge: "DELTA 15",
    inStock: true,
  },
];

export const cartItems = [
  {
    id: "1",
    name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty",
    price: 4349.0,
    image: "/msi-desktop-front.jpg",
  },
  {
    id: "2",
    name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty",
    price: 4349.0,
    image: "/msi-laptop.jpg",
  },
];

export const cartItemsCheckout = [
  {
    id: "1",
    name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER...",
    price: 3799.0,
    quantity: 1,
    image: "/msi-desktop-front.jpg",
  },
  {
    id: "2",
    name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER...",
    price: 3799.0,
    quantity: 1,
    image: "/msi-laptop.jpg",
  },
];

export const cartItemsMiniCart = [
  {
    id: "1",
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-in-On...",
    quantity: 1,
    image: "/msi-desktop-front.jpg",
  },
  {
    id: "2",
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-in-On...",
    quantity: 1,
    image: "/msi-laptop.jpg",
  },
];

export const laptopTabs = [
  "MSI GS Series",
  "MSI GT Series",
  "MSI GL Series",
  "MSI GE Series",
];

export const desktopTabs = [
  "MSI Infinite Series",
  "MSI Trident",
  "MSI GL Series",
  "MSI Nightblade",
];

export const features = [
  {
    icon: (
      <svg
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Soporte de Producto",
    description:
      "Hasta 3 años de garantía en sitio disponible para tu tranquilidad.",
  },
  {
    icon: (
      <svg
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    title: "Cuenta Personal",
    description:
      "Con grandes descuentos, envío gratis y un especialista de soporte dedicado.",
  },
  {
    icon: (
      <svg
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Ahorros Increíbles",
    description:
      "Hasta 70% de descuento en productos nuevos, garantizamos el mejor precio.",
  },
];
