"use client";

import {
  Heart,
  Loader2,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useAuth,
  useCartSummary,
  useHybridSearch,
  useWishlistSummary,
} from "@/hooks";
import { authService } from "@/services";

import { MiniCart } from "../../cart/miniCartHome/mini-cart";
import { MiniWishlist } from "../../wishlist/miniWishlist/mini-wishlist";

type HeaderRightActionsProps = {
  logo: ReactNode;
  navigation: ReactNode;
  mobileNavigation: ReactNode;
};

export const HeaderRightActions = memo(function HeaderRightActions({
  logo,
  navigation,
  mobileNavigation,
}: HeaderRightActionsProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { data: cartSummary } = useCartSummary();
  const { data: wishlistSummary } = useWishlistSummary();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMiniWishlistOpen, setIsMiniWishlistOpen] = useState(false);

  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    localResults,
    aiResults,
    aiMessage,
    isLoadingLocal,
    isLoadingAi,
    error: searchError,
    clear: clearSearch,
    isOpen: showResults,
    setIsOpen: setShowResults,
  } = useHybridSearch({ debounceMs: 500, minQueryLength: 2 });

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowResults]);

  useEffect(() => {
    if (!isAccountMenuOpen) return;

    const handleAccountOutside = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    const handleAccountEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleAccountOutside);
    window.addEventListener("keydown", handleAccountEscape);

    return () => {
      document.removeEventListener("mousedown", handleAccountOutside);
      window.removeEventListener("keydown", handleAccountEscape);
    };
  }, [isAccountMenuOpen]);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    clearSearch();
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const formatPrice = (basePrice: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(basePrice);
  };

  const handleLogout = () => {
    void authService.logout();
    logout();
    router.push("/");
  };

  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);
  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );
  const toggleAccountMenu = useCallback(
    () => setIsAccountMenuOpen((prev) => !prev),
    []
  );
  const toggleMiniCart = useCallback(
    () => setIsMiniCartOpen((prev) => !prev),
    []
  );
  const closeMiniCart = useCallback(() => setIsMiniCartOpen(false), []);
  const toggleMiniWishlist = useCallback(
    () => setIsMiniWishlistOpen((prev) => !prev),
    []
  );
  const closeMiniWishlist = useCallback(() => setIsMiniWishlistOpen(false), []);

  return (
    <>
      <div className="flex h-16 items-center justify-between gap-2 sm:h-20 md:h-24">
        {logo}
        {navigation}

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            className="hover:bg-muted h-9 w-9"
          >
            {isSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
          <ThemeToggle />

          {!isLoading && isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted relative h-9 w-9"
              onClick={toggleMiniWishlist}
            >
              <Heart className="h-5 w-5" />

              {wishlistSummary && wishlistSummary.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {wishlistSummary.itemCount}
                </span>
              )}
            </Button>
          )}

          {!isLoading && isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted relative h-9 w-9"
              onClick={toggleMiniCart}
            >
              <ShoppingCart className="h-5 w-5" />

              {cartSummary && cartSummary.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  {cartSummary.itemCount}
                </span>
              )}
            </Button>
          )}

          <div className="relative" ref={accountMenuRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleAccountMenu}
              className="hover:bg-muted h-9 w-9"
            >
              <User className="h-5 w-5" />
            </Button>

            {isAccountMenuOpen && (
              <div className="animate-in fade-in zoom-in-95 slide-in-from-top-2 border-border bg-card absolute right-0 z-50 mt-2 w-56 rounded-lg border py-2 shadow-xl duration-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-muted-foreground hover:bg-muted block px-4 py-2 text-sm"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Mi Cuenta
                    </Link>
                    {user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? (
                      <Link
                        href="/admin"
                        className="text-muted-foreground hover:bg-muted block px-4 py-2 text-sm"
                        onClick={() => setIsAccountMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    ) : null}

                    <Link
                      href="/dashboard/wishlist"
                      className="text-muted-foreground hover:bg-muted block px-4 py-2 text-sm"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Mi Lista de Deseos ({wishlistSummary?.itemCount || 0})
                    </Link>
                    <div className="border-border my-2 border-t" />
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsAccountMenuOpen(false);
                      }}
                      className="text-muted-foreground hover:bg-muted block w-full px-4 py-2 text-left text-sm"
                    >
                      Cerrar Sesion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/singin"
                      className="text-foreground hover:bg-muted block px-4 py-2 text-sm font-medium"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Iniciar Sesion
                    </Link>
                    <Link
                      href="/auth/singup"
                      className="text-muted-foreground hover:bg-muted block px-4 py-2 text-sm"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Crear una Cuenta
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 lg:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-categories-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-categories-menu"
          onClickCapture={(event) => {
            if ((event.target as HTMLElement).closest("a")) {
              setIsMobileMenuOpen(false);
            }
          }}
        >
          {mobileNavigation}
        </div>
      )}

      {isSearchOpen && (
        <div
          ref={searchContainerRef}
          className="border-border relative border-t py-4"
        >
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2">
                {isLoadingLocal || isLoadingAi ? (
                  <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
                ) : (
                  <Search className="text-muted-foreground h-5 w-5" />
                )}
              </div>
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos con IA..."
                className="border-border h-12 pr-4 pl-10 focus:border-purple-500 focus:ring-purple-200"
                autoFocus
              />
            </div>
          </form>

          <div className="mt-2 flex min-h-[24px] items-center gap-4">
            {isLoadingLocal && (
              <p className="text-muted-foreground text-sm">Buscando...</p>
            )}

            {isLoadingAi && !isLoadingLocal && (
              <p className="flex items-center gap-2 text-sm text-purple-600">
                <Sparkles className="h-4 w-4" />
                Procesando con IA...
              </p>
            )}

            {aiResults.length > 0 && !isLoadingAi && (
              <p className="flex items-center gap-2 text-sm text-purple-600">
                <Sparkles className="h-4 w-4" />
                Resultados con IA disponibles
              </p>
            )}

            {searchError && (
              <p className="text-sm text-red-600">{searchError}</p>
            )}
          </div>

          {showResults && (localResults.length > 0 || aiResults.length > 0) && (
            <div className="border-border bg-card absolute top-full right-0 left-0 z-50 mt-2 max-h-[50vh] overflow-y-auto rounded-xl border shadow-2xl">
              {localResults.length > 0 && (
                <>
                  <div className="border-border bg-muted/40 sticky top-0 z-10 border-b px-4 py-2">
                    <p className="text-muted-foreground text-xs">
                      {localResults.length} resultado
                      {localResults.length !== 1 ? "s" : ""} encontrado
                      {localResults.length !== 1 ? "s" : ""}
                      {isLoadingAi && (
                        <span className="ml-2 text-purple-600">
                          <Sparkles className="mr-1 inline h-3 w-3" />
                          Buscando con IA...
                        </span>
                      )}
                    </p>
                  </div>

                  <ul className="divide-y divide-gray-100">
                    {localResults.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => handleProductClick(product.id)}
                          className="hover:bg-muted/40 flex w-full items-center gap-4 p-3 text-left transition-colors"
                        >
                          <div className="bg-muted relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-gray-300">
                                Sin img
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-foreground truncate text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {product.brand}{" "}
                              {product.category && `- ${product.category}`}
                            </p>
                          </div>

                          <div className="flex-shrink-0 text-right">
                            <p className="text-foreground text-sm font-semibold">
                              {formatPrice(product.basePrice)}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {aiResults.length > 0 && !isLoadingAi && (
                <>
                  <div className="sticky top-0 z-10 border-t border-purple-200 bg-purple-50 px-4 py-2">
                    <p className="flex items-center gap-2 text-xs text-purple-600">
                      <Sparkles className="h-3 w-3" />
                      {aiResults.length} recomendacion
                      {aiResults.length !== 1 ? "es" : ""} de IA
                    </p>
                    {aiMessage && (
                      <p className="mt-1 text-xs text-purple-700 italic">
                        {aiMessage}
                      </p>
                    )}
                  </div>

                  <ul className="divide-y divide-purple-100 bg-purple-50/30">
                    {aiResults.map((product) => (
                      <li key={`ai-${product.id}`}>
                        <button
                          onClick={() => handleProductClick(product.id)}
                          className="flex w-full items-center gap-4 p-3 text-left transition-colors hover:bg-purple-100"
                        >
                          <div className="bg-muted relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-gray-300">
                                Sin img
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-foreground truncate text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {product.brand}
                            </p>
                          </div>

                          <div className="flex-shrink-0 text-right">
                            <p className="text-sm font-semibold text-purple-700">
                              {formatPrice(product.basePrice)}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {showResults &&
            searchQuery.length >= 2 &&
            !isLoadingLocal &&
            localResults.length === 0 &&
            aiResults.length === 0 &&
            !searchError && (
              <div className="border-border bg-card absolute top-full right-0 left-0 z-50 mt-2 rounded-xl border p-6 text-center shadow-xl">
                <Search className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                <p className="text-foreground font-medium">
                  No se encontraron productos para &quot;{searchQuery}&quot;
                </p>
                {isLoadingAi && (
                  <p className="mt-2 flex items-center justify-center gap-2 text-sm text-purple-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Buscando con IA...
                  </p>
                )}
              </div>
            )}
        </div>
      )}

      {!isLoading && isAuthenticated && (
        <MiniCart isOpen={isMiniCartOpen} onClose={closeMiniCart} />
      )}
      {!isLoading && isAuthenticated && (
        <MiniWishlist isOpen={isMiniWishlistOpen} onClose={closeMiniWishlist} />
      )}
    </>
  );
});
