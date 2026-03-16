import { apiClient } from "@/lib/api";
import type { Role, IRole } from "@/types";

/**
 * Servicio de roles
 * Endpoints del módulo /roles
 */
export const roleService = {
  /**
   * GET /roles - Obtener todos los roles del sistema
   * Requiere: Autenticación (ADMIN/SUPER_ADMIN)
   */
  getRoles: async (): Promise<IRole[]> => {
    const response = await apiClient.get<IRole[]>("/roles");
    return response.data;
  },

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
