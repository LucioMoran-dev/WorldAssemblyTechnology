import { apiClient, API_BASE_URL } from "@/lib/api";
import type { IAuthResponse, ISingUpDto, ILoginDto, IUser } from "@/types";

/**
 * Servicio de autenticación
 * Endpoints del módulo /auth según guía de integración
 */
export const authService = {
  /**
   * POST /auth/singup - Registro de usuario
   * Público - No requiere autenticación
   */
  async singup(data: ISingUpDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>("/auth/singup", data);
    return response.data;
  },

  /**
   * POST /auth/singin/user - Login
   * Público - No requiere autenticación
   */
  async login(data: ILoginDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>(
      "/auth/singin/user",
      data
    );
    return response.data;
  },

  /**
   * GET /auth/google - Iniciar OAuth con Google
   * Público - Redirige a Google OAuth
   */
  initiateGoogleLogin(): void {
    window.location.href = `${API_BASE_URL}/auth/google`;
  },

  /**
   * POST /auth/exchange-code - Intercambiar código OAuth por sesión
   * Público - El backend setea cookie HttpOnly con access_token
   */
  async exchangeCode(
    code: string
  ): Promise<{ userId: string; success: boolean }> {
    const response = await apiClient.post<{ userId: string; success: boolean }>(
      "/auth/exchange-code",
      { code }
    );
    return response.data;
  },

  /**
   * POST /auth/logout - Cerrar sesión en el backend (limpia cookie)
   * Público
   */
  async logoutBackend(): Promise<{ success: boolean }> {
    const response = await apiClient.post<{ success: boolean }>("/auth/logout");
    return response.data;
  },

  /**
   * Guardar token en localStorage
   */
  saveToken(token: string): void {
    localStorage.setItem("token", token);
    localStorage.setItem("accessToken", token);
  },

  /**
   * Obtener token desde localStorage
   */
  getToken(): string | null {
    return localStorage.getItem("token") || localStorage.getItem("accessToken");
  },

  /**
   * Logout - Limpiar token y usuario localmente + llamar al backend
   */
  async logout(): Promise<void> {
    try {
      await this.logoutBackend();
    } catch {
      // Si falla el backend, igual limpiamos local
    }
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  /**
   * Verificar si está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken() || !!this.getUser();
  },

  /**
   * Guardar información del usuario en localStorage
   */
  saveUser(user: IUser): void {
    localStorage.setItem("user", JSON.stringify(user));
  },

  /**
   * Obtener información del usuario desde localStorage
   */
  getUser(): IUser | null {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};

export default authService;
