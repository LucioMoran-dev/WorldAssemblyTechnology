"use client";

import { UserRole } from "@/types";

import { useAuth } from "./use-auth";

/**
 * Helper de rol para el storefront (patrón "least privilege"):
 * los admins no compran con su cuenta de admin, así que la UI
 * transaccional (carrito, wishlist, botones de compra, dashboard
 * cliente) se oculta cuando isAdmin es true.
 *
 * - isAdmin: true para ADMIN y SUPER_ADMIN (la jerarquía del back es
 *   SUPER_ADMIN ⊃ ADMIN ⊃ CLIENT — un super admin ES un admin).
 * - isSuperAdmin: solo SUPER_ADMIN, para gates internos del panel
 *   (ej: la sección de seeders en /admin/settings).
 *
 * Mientras el auth se inicializa (isLoading) devolvemos false en ambos
 * para no parpadear UI de admin a un cliente ni viceversa.
 */
export function useIsAdmin(): { isAdmin: boolean; isSuperAdmin: boolean } {
  const user = useAuth((state) => state.user);
  const isLoading = useAuth((state) => state.isLoading);

  if (isLoading || !user) {
    return { isAdmin: false, isSuperAdmin: false };
  }

  const isSuperAdmin = user.role === UserRole.SUPER_ADMIN;
  return {
    isAdmin: isSuperAdmin || user.role === UserRole.ADMIN,
    isSuperAdmin,
  };
}
