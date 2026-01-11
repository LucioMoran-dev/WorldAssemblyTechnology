"use client";

import { create } from "zustand";

import type { Cart } from "@/types";

/**
 * Store del carrito de compras con Zustand
 * Maneja el estado del carrito y sus operaciones optimistas
 */
interface CartStore {
  cart: Cart | null;
  isLoading: boolean;

  // Actions
  setCart: (cart: Cart) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;

  // Computed
  itemCount: number;
  total: number;
}

export const useCart = create<CartStore>((set, get) => ({
  cart: null,
  isLoading: false,
  itemCount: 0,
  total: 0,

  /**
   * Set Cart: Actualiza el carrito completo
   */
  setCart: (cart) => {
    set({
      cart,
      itemCount: cart.itemCount,
      total: cart.total,
    });
  },

  /**
   * Clear Cart: Limpia el carrito
   */
  clearCart: () => {
    set({
      cart: null,
      itemCount: 0,
      total: 0,
    });
  },

  /**
   * Set Loading: Actualiza el estado de loading
   */
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));
