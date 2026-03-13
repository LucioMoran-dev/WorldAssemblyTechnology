"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

interface FilterConfig<TFilters> {
  defaults: TFilters;
  defaultLimit?: number;
}

interface UseFiltersReturn<TFilters extends Record<string, string | undefined>> {
  filters: TFilters;
  page: number;
  limit: number;
  setFilter: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void;
  setFilters: (partial: Partial<TFilters>) => void;
  clearFilter: (key: keyof TFilters) => void;
  clearAllFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  activeFilterCount: number;
  queryParams: Record<string, string | number | undefined>;
}

/**
 * Hook generico para filtros sincronizados con URL + paginacion.
 *
 * Usa useSearchParams como fuente de verdad.
 * Cambiar cualquier filtro resetea la pagina a 1.
 */
export function useFilters<TFilters extends Record<string, string | undefined>>(
  config: FilterConfig<TFilters>
): UseFiltersReturn<TFilters> {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { defaults, defaultLimit = 10 } = config;

  // Parse filters from URL
  const filters = useMemo(() => {
    const result = {} as TFilters;
    for (const key of Object.keys(defaults)) {
      const urlValue = searchParams.get(key);
      (result as Record<string, string | undefined>)[key] = urlValue || (defaults as Record<string, string | undefined>)[key] || "";
    }
    return result;
  }, [searchParams, defaults]);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || defaultLimit;

  const buildUrl = useCallback(
    (updates: Record<string, string | number | undefined | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }

      const str = params.toString();
      return str ? `${pathname}?${str}` : pathname;
    },
    [searchParams, pathname]
  );

  const setFilter = useCallback(
    <K extends keyof TFilters>(key: K, value: TFilters[K]) => {
      const defaultVal = (defaults as Record<string, string | undefined>)[key as string];
      const newValue = value === defaultVal ? undefined : value;
      router.replace(buildUrl({ [key as string]: newValue, page: "1" }));
    },
    [router, buildUrl, defaults]
  );

  const setFilters = useCallback(
    (partial: Partial<TFilters>) => {
      const updates: Record<string, string | undefined> = { page: "1" };
      for (const [key, value] of Object.entries(partial)) {
        const defaultVal = (defaults as Record<string, string | undefined>)[key];
        updates[key] = value === defaultVal ? undefined : (value as string);
      }
      router.replace(buildUrl(updates));
    },
    [router, buildUrl, defaults]
  );

  const clearFilter = useCallback(
    (key: keyof TFilters) => {
      router.replace(buildUrl({ [key as string]: undefined, page: "1" }));
    },
    [router, buildUrl]
  );

  const clearAllFilters = useCallback(() => {
    const updates: Record<string, undefined> = { page: undefined };
    for (const key of Object.keys(defaults)) {
      updates[key] = undefined;
    }
    router.replace(buildUrl(updates));
  }, [router, buildUrl, defaults]);

  const setPage = useCallback(
    (newPage: number) => {
      router.replace(buildUrl({ page: newPage <= 1 ? undefined : String(newPage) }));
    },
    [router, buildUrl]
  );

  const setLimit = useCallback(
    (newLimit: number) => {
      router.replace(
        buildUrl({
          limit: newLimit === defaultLimit ? undefined : String(newLimit),
          page: "1",
        })
      );
    },
    [router, buildUrl, defaultLimit]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    let hasPriceFilter = false;
    for (const key of Object.keys(defaults)) {
      const val = (filters as Record<string, string | undefined>)[key];
      const def = (defaults as Record<string, string | undefined>)[key];
      if (val && val !== def) {
        // Count minPrice + maxPrice as a single "price" filter
        if (key === "minPrice" || key === "maxPrice") {
          if (!hasPriceFilter) {
            hasPriceFilter = true;
            count++;
          }
        } else {
          count++;
        }
      }
    }
    return count;
  }, [filters, defaults]);

  // Build queryParams for passing to React Query hooks
  const queryParams = useMemo(() => {
    const params: Record<string, string | number | undefined> = {
      page,
      limit,
    };
    for (const [key, value] of Object.entries(filters as Record<string, string | undefined>)) {
      if (value && value !== "") {
        params[key] = value;
      }
    }
    return params;
  }, [filters, page, limit]);

  return {
    filters,
    page,
    limit,
    setFilter,
    setFilters,
    clearFilter,
    clearAllFilters,
    setPage,
    setLimit,
    activeFilterCount,
    queryParams,
  };
}
