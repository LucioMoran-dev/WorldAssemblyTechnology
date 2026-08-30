import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";

import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
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
    <html
      lang="es"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
