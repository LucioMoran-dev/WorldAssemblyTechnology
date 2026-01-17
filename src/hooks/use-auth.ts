'use client';

import { create } from 'zustand';
import { User } from '@/types';
import { authLogger } from '@/utils/logger';

/**
 * Store de autenticación con Zustand
 * Maneja el estado del usuario autenticado y el token JWT
 */
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  initialize: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  /**
   * Login: Guarda token y user en localStorage y actualiza el estado
   */
  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  /**
   * Logout: Limpia localStorage y resetea el estado
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  /**
   * Update User: Actualiza solo los datos del usuario
   */
  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  /**
   * Initialize: Carga token y user desde localStorage al iniciar la app
   */
  initialize: () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        const user = JSON.parse(userStr) as User;
        set({ token, user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      authLogger.error('Error initializing auth', error);
      set({ isLoading: false });
    }
  },
}));
