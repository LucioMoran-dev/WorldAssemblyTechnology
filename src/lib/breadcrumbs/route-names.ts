export type RouteMap = Record<string, string>;

export const routeNames: Record<"main" | "dashboard" | "admin", RouteMap> = {
  main: {
    "/products": "Productos",
    "/products/catalog": "Catalogo",
    "/products/catalog-brand": "Catalogo por Marca",
    "/about": "Sobre Nosotros",
    "/contact": "Contacto",
    "/cart": "Carrito de Compras",
    "/cart/checkout": "Proceso de Pago",
    "/cart/review-payment": "Revision del Pedido y Pago",
    "/help": "Ayuda",
    "/privacy-term": "Politica de Privacidad",
    "/auth": "Autenticacion",
    "/auth/singin": "Iniciar Sesion",
    "/auth/singup": "Registrarse",
    "/auth/forgot-password": "Recuperar Contrasena",
    "/auth/reset-password": "Restablecer Contrasena",
    "/orders/success": "Pago Exitoso",
    "/orders/failure": "Pago Fallido",
    "/orders/pending": "Pago Pendiente",
    "/payments/success": "Pago Exitoso",
    "/payments/failure": "Pago Fallido",
    "/payments/pending": "Pago Pendiente",
    "/newsletter/unsubscribe": "Desuscripcion",
    "/repairs": "Reparaciones",
  },

  dashboard: {
    "/dashboard": "Mi Panel",
    "/dashboard/account-info": "Informacion de Cuenta",
    "/dashboard/addresses": "Libreta de Direcciones",
    "/dashboard/orders": "Mis Pedidos",
    "/dashboard/downloads": "Mis Productos Descargables",
    "/dashboard/payment-methods": "Metodos de Pago",
    "/dashboard/billing": "Facturacion",
    "/dashboard/wishlist": "Lista de Deseos",
    "/dashboard/reviews": "Resenas",
    "/dashboard/newsletter": "Suscripciones",
  },

  admin: {
    "/admin": "Panel de Administracion",
    "/admin/products": "Gestion de Productos",
    "/admin/orders": "Gestion de Ordenes",
    "/admin/users": "Gestion de Usuarios",
    "/admin/categories": "Gestion de Categorias",
    "/admin/payments": "Gestion de Pagos",
    "/admin/discounts": "Gestion de Descuentos",
    "/admin/newsletter": "Gestion de Newsletter",
    "/admin/repairs": "Gestion de Reparaciones",
    "/admin/reviews": "Gestion de Resenas",
    "/admin/settings": "Configuracion",
  },
};

export type BreadcrumbArea = keyof typeof routeNames;
