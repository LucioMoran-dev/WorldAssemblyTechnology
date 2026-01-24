"use client";

import type React from "react";

import { Breadcrumb } from "@/components/breadcrumbs/breadcrumb";
import Footer from "@/components/home/footer/footer";
import Header from "@/components/home/header/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <Breadcrumb area="main" />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
