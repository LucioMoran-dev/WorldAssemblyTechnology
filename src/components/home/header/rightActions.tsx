"use client";

import {
  Heart,
  LayoutDashboard,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useAuth,
  useCartSummary,
  useHybridSearch,
  useIsAdmin,
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
  const { isAuthenticated, isLoading, logout } = useAuth();
  const { isAdmin } = useIsAdmin();
  const { data: cartSummary } = useCartSummary();
  const { data: wishlistSummary } = useWishlistSummary();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <TooltipProvider delayDuration={300}>
      <div className="flex h-16 items-center justify-between gap-1 sm:h-20 md:h-24">
        {logo}
        {navigation}

        <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                aria-label={isSearchOpen ? "Cerrar buscador" : "Buscar"}
                aria-expanded={isSearchOpen}
                className="h-9 w-9 hover:bg-muted"
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isSearchOpen ? "Cerrar buscador" : "Buscar"}
            </TooltipContent>
          </Tooltip>
          <ThemeToggle />

          {/* Corazón y carrito: solo para clientes autenticados. A los
              admins se les muestra el acceso directo al panel en su lugar. */}
          {!isLoading && isAuthenticated && !isAdmin && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:bg-muted"
                  onClick={toggleMiniWishlist}
                  aria-label={`Lista de deseos (${wishlistSummary?.itemCount || 0})`}
                >
                  <Heart className="h-5 w-5" />

                  {wishlistSummary && wishlistSummary.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                      {wishlistSummary.itemCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Lista de deseos</TooltipContent>
            </Tooltip>
          )}

          {!isLoading && isAuthenticated && !isAdmin && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:bg-muted"
                  onClick={toggleMiniCart}
                  aria-label={`Carrito (${cartSummary?.itemCount || 0})`}
                >
                  <ShoppingCart className="h-5 w-5" />

                  {cartSummary && cartSummary.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      {cartSummary.itemCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Carrito de compras</TooltipContent>
            </Tooltip>
          )}

          {!isLoading && isAdmin && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin"
                  aria-label="Panel Admin"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
                >
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Panel Admin</TooltipContent>
            </Tooltip>
          )}
          {/* Menu de cuenta sobre Radix DropdownMenu.
              Antes era un <div> con useState + useEffect que escuchaba
              mousedown en document para cerrar al click afuera y keydown para
              Escape. Eso cubria el mouse, pero no habia navegacion con flechas,
              ni foco atrapado, ni foco devuelto al boton al cerrar, ni los
              atributos aria que un lector de pantalla necesita.
              Radix aporta todo eso y cierra solo al elegir una opcion, por lo
              que ya no hacen falta los onClick de cierre en cada item. */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menu de cuenta"
                className="h-9 w-9 hover:bg-muted"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60 rounded-2xl p-2">
              {isAuthenticated ? (
                <>
                  {/* Menu por rol: el admin gestiona (panel + su perfil);
                      el cliente compra (cuenta + wishlist). El perfil del
                      admin se edita en /dashboard/account-info — esos
                      endpoints son rol-agnosticos. */}
                  {isAdmin ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="font-medium">
                          Panel Admin
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/account-info">Mi Perfil</Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Mi Cuenta</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/wishlist">
                          Mi Lista de Deseos ({wishlistSummary?.itemCount || 0})
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout}>
                    Cerrar Sesion
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signin" className="font-medium">
                      Iniciar Sesion
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup">Crear una Cuenta</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-muted lg:hidden"
            onClick={toggleMobileMenu}
            aria-label="Menu de navegacion"
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
          className="relative border-t border-border/60 py-4"
        >
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2">
                {isLoadingLocal || isLoadingAi ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                ) : (
                  <Search className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos con IA..."
                className="h-12 rounded-xl border-border/70 bg-background/80 pr-4 pl-10 focus:border-blue-600 focus:ring-blue-200"
                autoFocus
              />
            </div>
          </form>

          <div className="mt-2 flex min-h-[24px] items-center gap-4">
            {isLoadingLocal && (
              <p className="text-sm text-muted-foreground">Buscando...</p>
            )}

            {isLoadingAi && !isLoadingLocal && (
              <p className="flex items-center gap-2 text-sm text-blue-600">
                <Sparkles className="h-4 w-4" />
                Procesando con IA...
              </p>
            )}

            {aiResults.length > 0 && !isLoadingAi && (
              <p className="flex items-center gap-2 text-sm text-blue-600">
                <Sparkles className="h-4 w-4" />
                Resultados con IA disponibles
              </p>
            )}

            {searchError && (
              <p className="text-sm text-red-600">{searchError}</p>
            )}
          </div>

          {showResults && (localResults.length > 0 || aiResults.length > 0) && (
            <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-[50vh] overflow-y-auto rounded-2xl border border-border/70 bg-card/95 shadow-2xl backdrop-blur">
              {localResults.length > 0 && (
                <>
                  <div className="sticky top-0 z-10 border-b border-border/60 bg-muted/40 px-4 py-2">
                    <p className="text-xs text-muted-foreground">
                      {localResults.length} resultado
                      {localResults.length !== 1 ? "s" : ""} encontrado
                      {localResults.length !== 1 ? "s" : ""}
                      {isLoadingAi && (
                        <span className="ml-2 text-blue-600">
                          <Sparkles className="mr-1 inline h-3 w-3" />
                          Buscando con IA...
                        </span>
                      )}
                    </p>
                  </div>

                  <ul className="divide-y divide-border/60">
                    {localResults.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => handleProductClick(product.id)}
                          className="flex w-full items-center gap-4 p-3 text-left transition-colors hover:bg-muted/40"
                        >
                          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                Sin img
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {product.brand}{" "}
                              {product.category && `- ${product.category}`}
                            </p>
                          </div>

                          <div className="flex-shrink-0 text-right">
                            <p className="text-sm font-semibold text-foreground">
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
                  <div className="sticky top-0 z-10 border-t border-border/60 bg-blue-50 px-4 py-2">
                    <p className="flex items-center gap-2 text-xs text-blue-600">
                      <Sparkles className="h-3 w-3" />
                      {aiResults.length} recomendacion
                      {aiResults.length !== 1 ? "es" : ""} de IA
                    </p>
                    {aiMessage && (
                      <p className="mt-1 text-xs text-blue-600/80 italic">
                        {aiMessage}
                      </p>
                    )}
                  </div>

                  <ul className="divide-y divide-border/60 bg-blue-50/30">
                    {aiResults.map((product) => (
                      <li key={`ai-${product.id}`}>
                        <button
                          onClick={() => handleProductClick(product.id)}
                          className="flex w-full items-center gap-4 p-3 text-left transition-colors hover:bg-blue-100"
                        >
                          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                Sin img
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {product.brand}
                            </p>
                          </div>

                          <div className="flex-shrink-0 text-right">
                            <p className="text-sm font-semibold text-blue-600">
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
              <div className="absolute top-full right-0 left-0 z-50 mt-2 rounded-2xl border border-border/70 bg-card/95 p-6 text-center shadow-2xl">
                <Search className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                <p className="font-medium text-foreground">
                  No se encontraron productos para &quot;{searchQuery}&quot;
                </p>
                {isLoadingAi && (
                  <p className="mt-2 flex items-center justify-center gap-2 text-sm text-blue-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Buscando con IA...
                  </p>
                )}
              </div>
            )}
        </div>
      )}

      {!isLoading && isAuthenticated && !isAdmin && (
        <MiniCart isOpen={isMiniCartOpen} onClose={closeMiniCart} />
      )}
      {!isLoading && isAuthenticated && !isAdmin && (
        <MiniWishlist isOpen={isMiniWishlistOpen} onClose={closeMiniWishlist} />
      )}
    </TooltipProvider>
  );
});
