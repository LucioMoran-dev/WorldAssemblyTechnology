"use client";

import { Search, ShoppingCart, User, X, Menu, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback, memo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useCartSummary, useWishlistSummary } from "@/hooks";
import { authService } from "@/services";

import { MiniCart } from "../../cart/miniCartHome/mini-cart";

const Header = memo(function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { data: cartSummary } = useCartSummary();
  const { data: wishlistSummary } = useWishlistSummary();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

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
                href="/products/catalog/repairs"
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
                <Link href="/dashboard/wishlist">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 hover:bg-gray-100"
                  >
                    <Heart className="h-5 w-5" />
                    {wishlistSummary && wishlistSummary.itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                        {wishlistSummary.itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
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

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="border-t border-gray-200 py-4">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar en toda la tienda..."
                  className="h-12 border-gray-300 pr-4 pl-10"
                />
              </div>
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
    </>
  );
});

export default Header;
