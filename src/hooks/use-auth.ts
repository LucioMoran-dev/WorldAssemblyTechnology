"use client";

import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

import type { IJWTPayload, IUser } from "@/types";
import { authLogger } from "@/utils/logger";

interface AuthStore {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (token: string | null, user: IUser) => void;
  logout: () => void;
  updateUser: (user: IUser) => void;
  initialize: () => void;
}

function setClientCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
}

function clearClientCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = jwtDecode<IJWTPayload>(token);
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: (token, user) => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("accessToken", token);
      setClientCookie("token", token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      clearClientCookie("token");
    }

    localStorage.setItem("user", JSON.stringify(user));
    setClientCookie("frontend_user_role", user.role);

    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    clearClientCookie("token");
    clearClientCookie("frontend_user_role");
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  updateUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setClientCookie("frontend_user_role", user.role);
    set({ user });
  },

  initialize: () => {
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken");
      const userStr = localStorage.getItem("user");

      if (!userStr) {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      const user = JSON.parse(userStr) as IUser;

      if (token) {
        if (isTokenExpired(token)) {
          authLogger.warn("Token expired in initialize()");
          localStorage.removeItem("token");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          clearClientCookie("token");
          clearClientCookie("frontend_user_role");
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return;
        }

        setClientCookie("token", token);
        setClientCookie("frontend_user_role", user.role);
        set({ token, user, isAuthenticated: true, isLoading: false });
        return;
      }

      // Cookie session mode (OAuth): no bearer token in localStorage.
      setClientCookie("frontend_user_role", user.role);
      set({ token: null, user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      authLogger.error("Error initializing auth", error);
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      clearClientCookie("token");
      clearClientCookie("frontend_user_role");
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
