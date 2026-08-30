import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

export function FooterBottom() {
  return (
    <div className="border-t border-gray-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
        <div className="flex items-center gap-4">
          <Link
            href="https://facebook.com"
            aria-label="Facebook"
            className="hover:text-blue-500"
          >
            <FaFacebookF className="h-5 w-5" />
          </Link>
          <Link
            href="https://instagram.com"
            aria-label="Instagram"
            className="hover:text-pink-500"
          >
            <FaInstagram className="h-5 w-5" />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Copyright 2026 WorldAssemblyTechnology. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
