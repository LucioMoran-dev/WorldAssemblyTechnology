import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white">
                Sign Up To Our Newsletter.
              </h3>
              <p className="text-gray-400">
                Be the first to hear about the latest offers.
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white text-gray-900"
              />
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Information */}
          <div>
            <h4 className="mb-4 font-bold text-white">Information</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Zip
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white">
                  Orders and Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* PC Parts */}
          <div>
            <h4 className="mb-4 font-bold text-white">PC Parts</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/cpus" className="hover:text-white">
                  CPUS
                </Link>
              </li>
              <li>
                <Link href="/add-on-cards" className="hover:text-white">
                  Add On Cards
                </Link>
              </li>
              <li>
                <Link href="/hard-drives" className="hover:text-white">
                  Hard Drives (Internal)
                </Link>
              </li>
              <li>
                <Link href="/graphic-cards" className="hover:text-white">
                  Graphic Cards
                </Link>
              </li>
              <li>
                <Link href="/keyboards" className="hover:text-white">
                  Keyboards / Mice
                </Link>
              </li>
            </ul>
          </div>

          {/* Desktop PCs */}
          <div>
            <h4 className="mb-4 font-bold text-white">Desktop PCs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/custom-pcs" className="hover:text-white">
                  Custom PCs
                </Link>
              </li>
              <li>
                <Link href="/servers" className="hover:text-white">
                  Servers
                </Link>
              </li>
              <li>
                <Link href="/msi-all-in-one" className="hover:text-white">
                  MSI All-In-One PCs
                </Link>
              </li>
              <li>
                <Link href="/hp-all-in-one" className="hover:text-white">
                  HP/Compaq PCs
                </Link>
              </li>
            </ul>
          </div>

          {/* Laptops */}
          <div>
            <h4 className="mb-4 font-bold text-white">Laptops</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/everyday-use" className="hover:text-white">
                  Everyday Use Notebooks
                </Link>
              </li>
              <li>
                <Link href="/msi-workstation" className="hover:text-white">
                  MSI Workstation Series
                </Link>
              </li>
              <li>
                <Link href="/msi-prestige" className="hover:text-white">
                  MSI Prestige Series
                </Link>
              </li>
              <li>
                <Link href="/tablets" className="hover:text-white">
                  Tablets and Pads
                </Link>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="mb-4 font-bold text-white">Address</h4>
            <address className="space-y-2 text-sm text-gray-400 not-italic">
              <p>Address: 1234 Street Address</p>
              <p>City Address, 1234</p>
              <p className="mt-4">
                Phones:{" "}
                <a href="tel:0012345678" className="hover:text-white">
                  (00) 1234 5678
                </a>
              </p>
              <p>Monday-Thursday: 9:00 AM - 5:30 PM</p>
              <p className="mt-4">
                E-mail:{" "}
                <a href="mailto:shop@email.com" className="hover:text-white">
                  shop@email.com
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4">
              <Link href="https://facebook.com" className="hover:text-blue-500">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-pink-500"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              Copyright © 2025 TechStore. All rights reserved.
            </p>
            <div className="flex gap-2">
              <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-700 text-xs font-semibold">
                VISA
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-700 text-xs font-semibold">
                MC
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-700 text-xs font-semibold">
                AMEX
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-700 text-xs font-semibold">
                PP
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
