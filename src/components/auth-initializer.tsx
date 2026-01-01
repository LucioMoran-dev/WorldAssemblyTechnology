"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks";

export function AuthInitializer() {
  const { initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return null;
}
