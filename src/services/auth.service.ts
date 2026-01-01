import { apiClient } from '@/lib/api';
import {
  AuthResponse,
  User,
  SignupDto,
  SigninDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@/types';

/**
 * Servicio de autenticación
 * Endpoints del módulo /auth
 */
export const authService = {
  /**
   * POST /auth/signup - Registro de usuario nuevo
   * Público | Rate Limit: 3/min
   */
  signup: async (data: SignupDto): Promise<User> => {
    const response = await apiClient.post<User>('/auth/signup', data);
    return response.data;
  },

  /**
   * POST /auth/signin/user - Login de usuario
   * Público | Rate Limit: 5/min
   */
  signin: async (credentials: SigninDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signin/user', credentials);
    return response.data;
  },

  /**
   * GET /auth/google - Iniciar autenticación con Google
   * Público | Sin Rate Limit
   * Redirige automáticamente a Google OAuth
   */
  googleLogin: (): void => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    window.location.href = `${API_BASE_URL}/auth/google`;
  },

  /**
   * POST /users/forgot-password - Solicitar reset de contraseña
   * Público | Rate Limit: 60/min
   */
  forgotPassword: async (data: ForgotPasswordDto): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/users/forgot-password', data);
    return response.data;
  },

  /**
   * POST /users/reset-password - Resetear contraseña con token
   * Público | Rate Limit: 60/min
   */
  resetPassword: async (data: ResetPasswordDto): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/users/reset-password', data);
    return response.data;
  },

  /**
   * Logout local (limpia token y user del localStorage)
   */
  logout: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },
};
