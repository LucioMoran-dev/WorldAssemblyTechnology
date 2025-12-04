"use client";

import { Search, ShoppingCart, User, X, Menu } from "lucide-react";
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
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 items-center justify-center rounded-xl bg-blue-600 px-6">
                <span className="text-xl font-bold text-white">WAT</span>
              </div>
              <span className="mr-8 hidden text-xl font-bold text-gray-900 md:inline">
                WorldAssemblyTech
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 lg:flex">
              <Link
                href="/catalog/laptops"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Laptops
              </Link>
              <Link
                href="/catalog/desktop-pcs"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                PCs de Escritorio
              </Link>
              <Link
                href="/catalog/networking"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Dispositivos de Red
              </Link>
              <Link
                href="/catalog/printers"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Impresoras y Escáneres
              </Link>
              <Link
                href="/catalog/pc-parts"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Partes de PC
              </Link>
              <Link
                href="/catalog/products"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Todos los demás productos
              </Link>
              <Link
                href="/catalog/repairs"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Reparaciones
              </Link>
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Nuestras Ofertas
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
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
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
                href="/catalog/laptops"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Laptops
              </Link>
              <Link
                href="/catalog/desktop-pcs"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                PCs de Escritorio
              </Link>
              <Link
                href="/catalog/networking"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Dispositivos de Red
              </Link>
              <Link
                href="/catalog/printers"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Impresoras y Escáneres
              </Link>
              <Link
                href="/catalog/pc-parts"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Partes de PC
              </Link>
              <Link
                href="/catalog/products"
                className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Todos los demás productos
              </Link>
              <Link
                href="/catalog/repairs"
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
