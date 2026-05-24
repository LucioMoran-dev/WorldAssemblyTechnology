"use client";

import { create } from "zustand";

import type { ICart } from "@/types";

interface CartStore {
  cart: ICart | null;
  isLoading: boolean;

  setCart: (cart: ICart) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;

  itemCount: number;
  total: number;
}

export const useCart = create<CartStore>((set, _get) => ({
  cart: null,
  isLoading: false,
  itemCount: 0,
  total: 0,

  setCart: (cart) => {
    set({
      cart,
      itemCount: cart.itemCount,
      total: cart.total,
    });
  },

  clearCart: () => {
    set({
      cart: null,
      itemCount: 0,
      total: 0,
    });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));
