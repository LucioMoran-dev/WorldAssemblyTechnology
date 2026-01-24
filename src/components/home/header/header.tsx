"use client";

import {
  Search,
  ShoppingCart,
  User,
  X,
  Menu,
  Heart,
  Loader2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback, memo, useRef, useEffect } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useAuth,
  useCartSummary,
  useWishlistSummary,
  useHybridSearch,
} from "@/hooks";
import { authService } from "@/services";

import { MiniCart } from "../../cart/miniCartHome/mini-cart";
import { MiniWishlist } from "../../wishlist/miniWishlist/mini-wishlist";

const Header = memo(function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { data: cartSummary } = useCartSummary();
  const { data: wishlistSummary } = useWishlistSummary();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMiniWishlistOpen, setIsMiniWishlistOpen] = useState(false);

  // Hybrid Search SSE (Instantánea + IA automática)
  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    localResults,
    aiResults,
    isLoadingLocal,
    isLoadingAi,
    error: searchError,
    clear: clearSearch,
    isOpen: showResults,
    setIsOpen: setShowResults,
  } = useHybridSearch({ debounceMs: 500, minQueryLength: 2 });

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Cerrar resultados al hacer click fuera
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

  // Prevenir submit del formulario (SSE maneja búsqueda automáticamente)
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleLogout = () => {
    authService.logout();
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
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto w-full max-w-7xl px-2 sm:px-4">
          <div className="flex h-16 items-center justify-between gap-2 sm:h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-2">
              <div className="relative h-12 w-32 overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-lg sm:h-14 sm:w-40 md:h-16 md:w-48">
                <Image
                  src="/WorldAsseblyTechnology.png"
                  alt="World Assembly Technology"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                />
              </div>
              <span className="hidden text-lg font-extrabold text-gray-900 xl:inline">
                WorldAssemblyTech
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden flex-1 items-center justify-end gap-2 lg:flex xl:gap-4">
              <Link
                href="/products/catalog/laptops"
                className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-blue-600"
              >
                Laptops
              </Link>
              <Link
                href="/products/catalog/desktop-pcs"
                className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-blue-600"
              >
                PCs
              </Link>
              <Link
                href="/products/catalog/networking"
                className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-blue-600"
              >
                Redes
              </Link>
              <Link
                href="/products/catalog/printers"
                className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-blue-600"
              >
                Impresoras
              </Link>
              <Link
                href="/products/catalog/pc-parts"
                className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-blue-600"
              >
                Componentes
              </Link>
              <Link
                href="/products/catalog/products"
                className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-blue-600"
              >
                Más
              </Link>
              <Link
                href="/repairs"
                className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-blue-600"
              >
                Reparaciones
              </Link>
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 text-sm whitespace-nowrap text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg xl:px-5"
              >
                🔥 Ofertas
              </Button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="h-9 w-9 hover:bg-gray-100"
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>

              {/* Wishlist */}
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:bg-gray-100"
                  onClick={toggleMiniWishlist}
                >
                  <Heart className="h-5 w-5" />
                  {wishlistSummary && wishlistSummary.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                      {wishlistSummary.itemCount}
                    </span>
                  )}
                </Button>
              ) : null}

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 hover:bg-gray-100"
                onClick={toggleMiniCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartSummary && cartSummary.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {cartSummary.itemCount}
                  </span>
                )}
              </Button>

              {/* Account Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleAccountMenu}
                  className="h-9 w-9 hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </Button>

                {/* Account Dropdown */}
                {isAccountMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
                    {isAuthenticated ? (
                      <>
                        {/* Usuario autenticado */}
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          Mi Cuenta
                        </Link>
                        {user?.role === "ADMIN" ||
                        user?.role === "SUPER_ADMIN" ? (
                          <Link
                            href="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsAccountMenuOpen(false)}
                          >
                            Admin
                          </Link>
                        ) : null}

                        <Link
                          href="/wishlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          Mi Lista de Deseos ({wishlistSummary?.itemCount || 0})
                        </Link>
                        <div className="my-2 border-t border-gray-200" />
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsAccountMenuOpen(false);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Cerrar Sesión
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Usuario no autenticado */}
                        <Link
                          href="/auth/singin"
                          className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          Iniciar Sesión
                        </Link>
                        <Link
                          href="/auth/singup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          Crear una Cuenta
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 lg:hidden"
                onClick={toggleMobileMenu}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search Bar - Búsqueda Híbrida */}
          {isSearchOpen && (
            <div
              ref={searchContainerRef}
              className="relative border-t border-gray-200 py-4"
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2">
                    {isLoadingLocal || isLoadingAi ? (
                      <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
                    ) : (
                      <Search className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar productos con IA..."
                    className="h-12 border-gray-300 pr-12 pl-10 focus:border-purple-500 focus:ring-purple-200"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Indicadores de estado */}
              <div className="mt-2 flex items-center gap-4 min-h-[24px]">
                {isLoadingLocal && (
                  <p className="text-sm text-gray-500">Buscando...</p>
                )}

                {isLoadingAi && !isLoadingLocal && (
                  <p className="text-sm text-purple-600 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Procesando con IA...
                  </p>
                )}

                {aiResults.length > 0 && !isLoadingAi && (
                  <p className="text-sm text-purple-600 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Resultados con IA disponibles
                  </p>
                )}

                {searchError && (
                  <p className="text-sm text-red-600">{searchError}</p>
                )}
              </div>

              {/* Dropdown de resultados - Contenedor con scroll */}
              {showResults && (localResults.length > 0 || aiResults.length > 0) && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl">
                  {/* Resultados locales */}
                  {localResults.length > 0 && (
                    <>
                      {/* Header con contador */}
                      <div className="sticky top-0 z-10 border-b border-gray-100 bg-gray-50 px-4 py-2">
                        <p className="text-xs text-gray-500">
                          {localResults.length} resultado
                          {localResults.length !== 1 ? "s" : ""} encontrado
                          {localResults.length !== 1 ? "s" : ""}
                          {isLoadingAi && (
                            <span className="ml-2 text-purple-600">
                              <Sparkles className="h-3 w-3 inline mr-1" />
                              Buscando con IA...
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Lista de productos locales */}
                      <ul className="divide-y divide-gray-100">
                        {localResults.map((product) => (
                          <li key={product.id}>
                            <button
                              onClick={() => handleProductClick(product.id)}
                              className="flex w-full items-center gap-4 p-3 text-left transition-colors hover:bg-gray-50"
                            >
                              {/* Imagen */}
                              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                {product.image ? (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-gray-300 text-xs">
                                    Sin img
                                  </div>
                                )}
                              </div>

                              {/* Info */}
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-gray-900 truncate">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {product.brand} {product.category && `• ${product.category}`}
                                </p>
                              </div>

                              {/* Precio */}
                              <div className="flex-shrink-0 text-right">
                                <p className="font-semibold text-gray-900">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Resultados de IA (dentro del mismo contenedor con scroll) */}
                  {aiResults.length > 0 && !isLoadingAi && (
                    <div className="border-t border-purple-200 bg-purple-50/50 p-4">
                      <h3 className="text-sm font-medium text-purple-600 mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Recomendaciones de IA ({aiResults.length})
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {aiResults.map((product) => (
                          <button
                            key={`ai-${product.id}`}
                            onClick={() => handleProductClick(product.id)}
                            className="flex items-center gap-3 p-3 bg-white border border-purple-100 rounded-lg hover:bg-purple-100 transition-colors text-left"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                                  Sin img
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate text-sm">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-600">{product.brand}</p>
                              <p className="font-semibold text-purple-700 text-sm">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sin resultados */}
              {showResults &&
                searchQuery.length >= 2 &&
                !isLoadingLocal &&
                localResults.length === 0 &&
                aiResults.length === 0 &&
                !searchError && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-xl">
                    <Search className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                    <p className="font-medium text-gray-900">
                      No se encontraron productos para &quot;{searchQuery}&quot;
                    </p>
                    {isLoadingAi && (
                      <p className="text-sm text-purple-600 mt-2 flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Buscando con IA...
                      </p>
                    )}
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white lg:hidden">
            <nav className="flex flex-col gap-2 p-4">
              <Link
                href="/products/catalog/laptops"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Laptops
              </Link>
              <Link
                href="/products/catalog/desktop-pcs"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                PCs de Escritorio
              </Link>
              <Link
                href="/products/catalog/networking"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Dispositivos de Red
              </Link>
              <Link
                href="/products/catalog/printers"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Impresoras y Escáneres
              </Link>
              <Link
                href="/products/catalog/pc-parts"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Partes de PC
              </Link>
              <Link
                href="/products/catalog/products"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Todos los demás productos
              </Link>
              <Link
                href="/products/catalog/repairs"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Reparaciones
              </Link>
            </nav>
          </div>
        )}
      </header>
      <MiniCart isOpen={isMiniCartOpen} onClose={closeMiniCart} />
      <MiniWishlist isOpen={isMiniWishlistOpen} onClose={closeMiniWishlist} />
    </>
  );
});

export default Header;
