"use client";

import { Search, ShoppingCart, User, X, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
              href="/laptops"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Laptops
            </Link>
            <Link
              href="/desktop-pcs"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Desktop PCs
            </Link>
            <Link
              href="/networking"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Dispositivos de Red
            </Link>
            <Link
              href="/printers"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Impresoras y Scanners
            </Link>
            <Link
              href="/pc-parts"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Componentes PC
            </Link>
            <Link
              href="/accessories"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Todos los Productos
            </Link>
            <Link
              href="/repairs"
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
              onClick={() => setIsSearchOpen(!isSearchOpen)}
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
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                2
              </span>
            </Button>

            {/* Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Mi Cuenta</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">Mi Lista de Deseos (0)</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/register">Crear una Cuenta</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signin">Iniciar Sesión</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
              href="/laptops"
              className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Laptops
            </Link>
            <Link
              href="/desktop-pcs"
              className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Desktop PCs
            </Link>
            <Link
              href="/networking"
              className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Dispositivos de Red
            </Link>
            <Link
              href="/printers"
              className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Impresoras y Scanners
            </Link>
            <Link
              href="/pc-parts"
              className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Componentes PC
            </Link>
            <Link
              href="/accessories"
              className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Todos los Productos
            </Link>
            <Link
              href="/repairs"
              className="py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Reparaciones
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
