import { apiClient, API_BASE_URL } from "@/lib/api";
import type { IAuthResponse, ISignupDto, ILoginDto, IUser } from "@/types";

/**
 * Servicio de autenticación
 * Endpoints del módulo /auth según guía de integración
 */
export const authService = {
  /**
   * POST /auth/signup - Registro de usuario
   * Público - No requiere autenticación
   */
  async signup(data: ISignupDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>("/auth/signup", data);
    return response.data;
  },

  /**
   * POST /auth/signin/user - Login
   * Público - No requiere autenticación
   */
  async login(data: ILoginDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>(
      "/auth/signin/user",
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
   * Guardar token en localStorage
   */
  saveToken(token: string): void {
    localStorage.setItem("token", token);
    // Mantener compatibilidad con código existente
    localStorage.setItem("accessToken", token);
  },

  /**
   * Obtener token desde localStorage
   */
  getToken(): string | null {
    return localStorage.getItem("token") || localStorage.getItem("accessToken");
  },

  /**
   * Logout - Limpiar token y usuario
   */
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  /**
   * Verificar si está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
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

// Exports adicionales para compatibilidad
export default authService;
