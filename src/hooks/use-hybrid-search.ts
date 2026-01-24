"use client";

import { useState, useCallback, useRef, useEffect } from "react";

import type { IAutocompleteResult, IHybridSearchStreamPayload } from "@/types";
import { logger } from "@/utils/logger";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const searchLogger = logger.createContextLogger("HybridSearch");

interface UseHybridSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

interface UseHybridSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  localResults: IAutocompleteResult[];
  aiResults: IAutocompleteResult[];
  isLoadingLocal: boolean;
  isLoadingAi: boolean;
  error: string | null;
  clear: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

/**
 * Hook unificado para búsqueda híbrida
 * Usa SSE (Server-Sent Events) como método principal
 * Endpoint: GET /products/search/hybrid?q={texto}
 *
 * Flujo:
 * 1. Usuario escribe → resultados locales llegan primero (~50ms)
 * 2. Resultados de IA llegan después (~1-3s) sin bloquear
 */
export function useHybridSearch(
  options: UseHybridSearchOptions = {}
): UseHybridSearchReturn {
  // Debounce de 500ms para evitar múltiples requests al webhook de IA
  const { debounceMs = 500, minQueryLength = 2 } = options;

  const [query, setQueryState] = useState("");
  const [localResults, setLocalResults] = useState<IAutocompleteResult[]>([]);
  const [aiResults, setAiResults] = useState<IAutocompleteResult[]>([]);
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const search = useCallback((searchQuery: string) => {
    // Cerrar conexión anterior
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    if (searchQuery.length < minQueryLength) {
      setLocalResults([]);
      setAiResults([]);
      setIsOpen(false);
      setError(null);
      return;
    }

    setIsLoadingLocal(true);
    setIsLoadingAi(true);
    setError(null);
    setIsOpen(true);

    if (!API_URL) {
      searchLogger.error("NEXT_PUBLIC_API_URL no está configurada");
      setError("Error de configuración: API URL no definida");
      setIsLoadingLocal(false);
      setIsLoadingAi(false);
      return;
    }

    const url = `${API_URL}/products/search/hybrid?q=${encodeURIComponent(searchQuery)}`;
    searchLogger.debug("Iniciando búsqueda SSE", { query: searchQuery, url });

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const payload: IHybridSearchStreamPayload = JSON.parse(event.data);

        if (payload.source === "local") {
          searchLogger.debug("Resultados locales recibidos", {
            count: payload.results.length,
          });
          setLocalResults(payload.results);
          setIsLoadingLocal(false);
        }

        if (payload.source === "ai") {
          searchLogger.debug("Resultados de IA recibidos", {
            count: payload.results.length,
          });
          setAiResults(payload.results);
          setIsLoadingAi(false);
          eventSource.close();
        }
      } catch (e) {
        searchLogger.error("Error parseando respuesta SSE", e);
      }
    };

    eventSource.onerror = (e) => {
      const errorMessage = `SSE Error - URL: ${url}, ReadyState: ${eventSource.readyState}`;
      searchLogger.error(errorMessage, {
        readyState: eventSource.readyState,
        url,
        event: e,
      });

      // Mensaje amigable para el usuario
      const userMessage =
        eventSource.readyState === EventSource.CONNECTING
          ? "No se pudo conectar al servidor de búsqueda"
          : "Se perdió la conexión con el servidor";

      setError(userMessage);
      setIsLoadingLocal(false);
      setIsLoadingAi(false);
      eventSource.close();
    };
  }, [minQueryLength]);

  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryState(newQuery);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        search(newQuery);
      }, debounceMs);
    },
    [debounceMs, search]
  );

  const clear = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setQueryState("");
    setLocalResults([]);
    setAiResults([]);
    setError(null);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (eventSourceRef.current) eventSourceRef.current.close();
    };
  }, []);

  return {
    query,
    setQuery,
    localResults,
    aiResults,
    isLoadingLocal,
    isLoadingAi,
    error,
    clear,
    isOpen,
    setIsOpen,
  };
}
