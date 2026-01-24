export type RouteMap = Record<string, string>;

export const routeNames: Record<"main" | "dashboard" | "admin", RouteMap> = {
  main: {
    "/products": "Productos",
    "/products/catalog": "Catálogo",
    "/products/catalog-brand": "Catálogo por Marca",
    "/about": "Sobre Nosotros",
    "/contact": "Contacto",
    "/cart": "Carrito de Compras",
    "/cart/checkout": "Proceso de Pago",
    "/cart/review": "Revisión del Pedido y Pago",
    "/help": "Ayuda",
    "/privacy-term": "Política de Privacidad",
    "/auth": "Autenticación",
    "/auth/signin": "Iniciar Sesión",
    "/auth/signup": "Registrarse",
    "/repairs": "Reparaciones",
  },

  dashboard: {
    "/dashboard": "Mi Panel",
    "/dashboard/account-info": "Información de Cuenta",
    "/dashboard/addresses": "Libreta de Direcciones",
    "/dashboard/orders": "Mis Pedidos",
    "/dashboard/downloads": "Mis Productos Descargables",
    "/dashboard/payment-methods": "Métodos de Pago",
    "/dashboard/billing": "Facturación",
    "/dashboard/wishlist": "Lista de Deseos",
    "/dashboard/reviews": "Reseñas",
    "/dashboard/newsletter": "Suscripciones",
  },

  admin: {
    "/admin": "Panel de Administración",
    "/admin/products": "Gestión de Productos",
    "/admin/orders": "Gestión de Órdenes",
    "/admin/users": "Gestión de Usuarios",
    "/admin/categories": "Gestión de Categorías",
    "/admin/reviews": "Gestión de Reseñas",
    "/admin/settings": "Configuración",
  },
};

export type BreadcrumbArea = keyof typeof routeNames;
