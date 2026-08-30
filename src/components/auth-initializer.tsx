"use client";

import { useEffect, useRef } from "react";

import { useAuth } from "@/hooks";
import { authLogger } from "@/utils/logger";

export function AuthInitializer() {
  const isLoading = useAuth((state) => state.isLoading);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    authLogger.info("AuthInitializer: Executing initialize()");
    const { initialize } = useAuth.getState();
    initialize();

    setTimeout(() => {
      authLogger.info("AuthInitializer: State after initialize", {
        isLoading: useAuth.getState().isLoading,
        isAuthenticated: useAuth.getState().isAuthenticated,
        hasToken: !!useAuth.getState().token,
        hasUser: !!useAuth.getState().user,
      });
    }, 0);
  }, []);

  useEffect(() => {
    authLogger.info("AuthInitializer: State changed", {
      isLoading,
      isAuthenticated,
    });
  }, [isLoading, isAuthenticated]);

  return null;
}
