"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks";
import { authService } from "@/services";

export function FooterLinks() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    void authService.logout();
    logout();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <h4 className="mb-4 font-bold text-white">Información</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-white">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/privacy-term" className="hover:text-white">
                Privacidad y términos
              </Link>
            </li>
            <li>
              <Link href="/dashboard/orders" className="hover:text-white">
                Pedidos y devoluciones
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-white">Catálogo</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/products/catalog/laptops"
                className="hover:text-white"
              >
                Laptops
              </Link>
            </li>
            <li>
              <Link
                href="/products/catalog/desktop-pcs"
                className="hover:text-white"
              >
                PCs de escritorio
              </Link>
            </li>
            <li>
              <Link
                href="/products/catalog/pc-parts"
                className="hover:text-white"
              >
                Componentes
              </Link>
            </li>
            <li>
              <Link
                href="/products/catalog/products"
                className="hover:text-white"
              >
                Ver todos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-white">Mi cuenta</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {!isAuthenticated ? (
              <>
                <li>
                  <Link href="/auth/signin" className="hover:text-white">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:text-white">
                    Crear cuenta
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-white"
                >
                  Cerrar Sesión
                </button>
              </li>
            )}
            <li>
              <Link href="/dashboard/wishlist" className="hover:text-white">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white">
                Carrito
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-white">Soporte</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/repairs" className="hover:text-white">
                Reparaciones
              </Link>
            </li>
            <li>
              <Link href="/newsletter/unsubscribe" className="hover:text-white">
                Baja newsletter
              </Link>
            </li>
            <li>
              <a href="tel:0012345678" className="hover:text-white">
                (+54) 123 456 7899
              </a>
            </li>
            <li>
              <a href="mailto:shop@email.com" className="hover:text-white">
                worldassemblytechnolog@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

