import { apiClient } from "@/lib/api";
import type {
  IUser,
  IPaginatedResponse,
  IUpdateUserDto,
  ChangePasswordDto,
  IChangeRoleDto,
  IUserListParams,
  Address,
  ICreateAddressDto,
  IUpdateAddressDto,
  IResetPassword,
} from "@/types";

/**
 * Servicio de usuarios
 * Endpoints del módulo /users
 */
export const userService = {
  /**
   * GET /users - Listar usuarios paginados
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  getUsers: async (
    params?: IUserListParams
  ): Promise<IPaginatedResponse<IUser>> => {
    const response = await apiClient.get<IPaginatedResponse<IUser>>("/users", {
      params,
    });
    return response.data;
  },

  /**
   * GET /users/:id - Obtener usuario por ID
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getUserById: async (id: string): Promise<IUser> => {
    const response = await apiClient.get<IUser>(`/users/${id}`);
    return response.data;
  },

  /**
   * GET /users/stats/me - Obtener mis estadísticas
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getMyStats: async (): Promise<{
    totalOrders: number;
    totalSpent: number;
    wishlistItems: number;
    reviewsGiven: number;
  }> => {
    const response = await apiClient.get<{
      totalOrders: number;
      totalSpent: number;
      wishlistItems: number;
      reviewsGiven: number;
    }>("/users/stats/me");
    return response.data;
  },

  /**
   * PUT /users/update/user - Actualizar perfil
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  updateProfile: async (data: IUpdateUserDto): Promise<IUser> => {
    const response = await apiClient.put<IUser>("/users/update/user", data);
    return response.data;
  },

  /**
   * PATCH /users/password - Cambiar contraseña
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  changePassword: async (
    data: ChangePasswordDto
  ): Promise<{ message: string }> => {
    const response = await apiClient.patch<{ message: string }>(
      "/users/password",
      data
    );
    return response.data;
  },

  /**
   * DELETE /users/:id - Eliminar usuario (Soft Delete)
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  deleteUser: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      `/users/${id}`
    );
    return response.data;
  },

  /**
   * PATCH /users/restore/:id - Restaurar usuario eliminado
   * Requiere: ADMIN | Rate Limit: 60/min
   */
  restoreUser: async (id: string): Promise<IUser> => {
    const response = await apiClient.patch<IUser>(`/users/restore/${id}`);
    return response.data;
  },

  /**
   * PATCH /users/roles/:id - Cambiar rol de usuario
   * Requiere: SUPER_ADMIN | Rate Limit: 60/min
   */
  changeUserRole: async (id: string, data: IChangeRoleDto): Promise<IUser> => {
    const response = await apiClient.patch<IUser>(`/users/roles/${id}`, data);
    return response.data;
  },

  // ===== GESTIÓN DE DIRECCIONES =====

  /**
   * GET /users/addresses/my-addresses - Obtener mis direcciones
   * Requiere: Autenticación
   */
  getMyAddresses: async (): Promise<Address[]> => {
    const response = await apiClient.get<Address[]>(
      "/users/addresses/my-addresses"
    );
    return response.data;
  },

  /**
   * POST /users/addresses - Agregar nueva dirección
   * Requiere: Autenticación
   */
  createAddress: async (data: ICreateAddressDto): Promise<Address> => {
    const response = await apiClient.post<Address>(
      "/users/addresses/add",
      data
    );
    return response.data;
  },

  /**
   * PATCH /users/addresses/:addressId - Actualizar dirección
   * Requiere: Autenticación
   */
  updateAddress: async (
    addressId: string,
    data: IUpdateAddressDto
  ): Promise<Address> => {
    const response = await apiClient.patch<Address>(
      `/users/addresses/${addressId}`,
      data
    );
    return response.data;
  },

  /**
   * DELETE /users/addresses/:addressId - Eliminar dirección
   * Requiere: Autenticación
   */
  deleteAddress: async (addressId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      `/users/addresses/${addressId}`
    );
    return response.data;
  },

  /**
   * PATCH /users/addresses/:addressId/set-default - Marcar como predeterminada
   * Requiere: Autenticación
   */
  setDefaultAddress: async (addressId: string): Promise<Address> => {
    const response = await apiClient.patch<Address>(
      `/users/addresses/${addressId}/set-default`
    );
    return response.data;
  },

  /**
   * POST /users/forgot-password - Solicitar recuperación de contraseña
   * Público - Siempre responde mensaje genérico
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      "/users/forgot-password",
      { email }
    );
    return response.data;
  },

  /**
   * POST /users/reset-password - Restablecer contraseña con token
   * Público
   */
  resetPassword: async (data: IResetPassword): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      "/users/reset-password",
      data
    );

    return response.data;
  },
};
