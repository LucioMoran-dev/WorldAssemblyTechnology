import { apiClient } from "@/lib/api";
import type {
  User,
  PaginatedResponse,
  UpdateUserDto,
  ChangePasswordDto,
  ChangeRoleDto,
  UserListParams,
  Address,
  CreateAddressDto,
  UpdateAddressDto,
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
    params?: UserListParams
  ): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<PaginatedResponse<User>>("/users", {
      params,
    });
    return response.data;
  },

  /**
   * GET /users/:id - Obtener usuario por ID
   * Requiere: Autenticación | Rate Limit: 60/min
   */
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
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
  updateProfile: async (data: UpdateUserDto): Promise<User> => {
    const response = await apiClient.put<User>("/users/update/user", data);
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
  restoreUser: async (id: string): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/restore/${id}`);
    return response.data;
  },

  /**
   * PATCH /users/roles/:id - Cambiar rol de usuario
   * Requiere: SUPER_ADMIN | Rate Limit: 60/min
   */
  changeUserRole: async (id: string, data: ChangeRoleDto): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/roles/${id}`, data);
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
  createAddress: async (data: CreateAddressDto): Promise<Address> => {
    const response = await apiClient.post<Address>("/users/addresses", data);
    return response.data;
  },

  /**
   * PATCH /users/addresses/:addressId - Actualizar dirección
   * Requiere: Autenticación
   */
  updateAddress: async (
    addressId: string,
    data: UpdateAddressDto
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
};
