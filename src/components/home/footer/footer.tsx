"use client";

import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { memo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscribe } from "@/hooks";

const Footer = memo(function Footer() {
  const [email, setEmail] = useState("");
  const subscribeMutation = useNewsletterSubscribe();

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) return;
    subscribeMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setEmail("");
        },
      }
    );
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white">Suscribete al newsletter</h3>
              <p className="text-gray-400">Recibe novedades, promos y lanzamientos.</p>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Tu correo"
                className="bg-white text-gray-900"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleSubscribe()}
              />
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleSubscribe}
                disabled={subscribeMutation.isPending}
              >
                {subscribeMutation.isPending ? "..." : "Suscribirme"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 font-bold text-white">Informacion</h4>
            <ul className="space-y-2 text-sm text-gray-400">
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
                  Privacidad y terminos
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
            <h4 className="mb-4 font-bold text-white">Catalogo</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products/catalog/laptops" className="hover:text-white">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/products/catalog/desktop-pcs" className="hover:text-white">
                  PCs de escritorio
                </Link>
              </li>
              <li>
                <Link href="/products/catalog/pc-parts" className="hover:text-white">
                  Componentes
                </Link>
              </li>
              <li>
                <Link href="/products/catalog/products" className="hover:text-white">
                  Ver todos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Mi cuenta</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/auth/signin" className="hover:text-white">
                  Iniciar sesion
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-white">
                  Crear cuenta
                </Link>
              </li>
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
            <ul className="space-y-2 text-sm text-gray-400">
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
                  shop@email.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <div className="flex items-center gap-4">
            <Link href="https://facebook.com" className="hover:text-blue-500">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com" className="hover:text-pink-500">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            Copyright 2026 WorldAssemblyTechnology. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
