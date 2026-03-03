import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";

import QueryProvider from "@/providers/query-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title:
    "WorldAssemblyTech - Hardware de Computadora Premium y Productos para Gaming",
  description:
    "Compra las últimas laptops, desktops, monitores gaming y componentes de PC de marcas top como MSI, ASUS y más.",
  icons: {
    icon: "/WorldAsseblyTechnologyFavicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
