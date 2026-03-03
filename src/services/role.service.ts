import { apiClient } from "@/lib/api";
import type { Role } from "@/types";

/**
 * Servicio de roles
 * Endpoints del módulo /roles
 */
export const roleService = {
  /**
   * POST /roles/seed_roles - Cargar roles del sistema
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  seedRoles: async (): Promise<{ message: string; roles: Role[] }> => {
    const response = await apiClient.post<{ message: string; roles: Role[] }>(
      "/roles/seed_roles"
    );
    return response.data;
  },
};
