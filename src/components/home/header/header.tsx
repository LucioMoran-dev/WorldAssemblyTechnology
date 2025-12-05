"use client";

import { Search, ShoppingCart, User, X, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, memo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MiniCart } from "../../cart/miniCartHome/mini-cart";

const Header = memo(function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

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
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-1 sm:px-4">
          <div className="flex h-24 items-center justify-between gap-2 md:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 -ml-1 sm:-ml-2 md:ml-0">
              <div className="relative h-16 w-40 sm:h-16 sm:w-48 md:h-18 md:w-56 lg:h-18 lg:w-64 xl:w-72 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/WorldAsseblyTechnology.png"
                  alt="World Assembly Technology"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, (max-width: 1280px) 256px, 288px"
                />
              </div>
              <span className="hidden xl:inline text-lg xl:text-xl font-extrabold text-gray-900">
                WorldAssemblyTech
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-3 xl:gap-5 lg:flex flex-1 justify-end">
              <Link
                href="/products/catalog/laptops"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                Laptops
              </Link>
              <Link
                href="/products/catalog/desktop-pcs"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                PCs
              </Link>
              <Link
                href="/products/catalog/networking"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                Redes
              </Link>
              <Link
                href="/products/catalog/printers"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                Impresoras
              </Link>
              <Link
                href="/products/catalog/pc-parts"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                Componentes
              </Link>
              <Link
                href="/products/catalog/products"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                Más
              </Link>
              <Link
                href="/products/catalog/repairs"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                Reparaciones
              </Link>
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all whitespace-nowrap text-sm px-5"
              >
                🔥 Ofertas
              </Button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="hover:bg-gray-100"
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100"
                onClick={toggleMiniCart}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  2
                </span>
              </Button>

              {/* Account Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleAccountMenu}
                  className="hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </Button>

                {/* Account Dropdown */}
                {isAccountMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Cuenta
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Lista de Deseos (0)
                    </Link>
                    <Link
                      href="/compare"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Comparar (0)
                    </Link>
                    <div className="my-2 border-t border-gray-200" />
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Crear una Cuenta
                    </Link>
                    <Link
                      href="/signin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Iniciar Sesión
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
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
