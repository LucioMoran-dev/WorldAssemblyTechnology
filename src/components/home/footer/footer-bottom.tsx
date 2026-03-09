import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function FooterBottom() {
  return (
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
        <p className="text-sm text-muted-foreground">
          Copyright 2026 WorldAssemblyTechnology. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

