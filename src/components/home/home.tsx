import {
  newProducts,
  customBuilds,
  customer,
  laptopTabs,
  desktopTabs,
  features,
} from "@/seeds";

import { BrandShowcase } from "./brand-showcase";
import { CustomerStats } from "./customer-stats";
import { FeaturesGrid } from "./features-grid";
import Footer from "./footer";
import Header from "./header";
import { CategoryProductsSection } from "./sections/category-products-section";
import { CategoryWithTabsSection } from "./sections/category-with-tabs-section";
import { HeroSection } from "./sections/hero-section";
import { NewProductsSection } from "./sections/new-products-section";
import { Testimonial } from "./testimonial";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Banner */}
        <HeroSection />

        {/* New Products Section */}
        <NewProductsSection products={newProducts} />

        {/* Custom Builds Section */}
        <CategoryProductsSection
          categoryImage="/custom-pc-build-icon.jpg"
          categoryAlt="Custom Builds"
          categoryTitle="Custom Builds"
          products={customBuilds}
          bgColor="white"
        />

        {/* MSI Laptops Section with Tabs */}
        <CategoryWithTabsSection
          categoryImage="/msi-dragon-logo-red.jpg"
          categoryAlt="MSI Laptops"
          categoryTitle="MSI Laptops"
          tabs={laptopTabs}
          defaultTab="MSI GS Series"
          products={newProducts}
          bgColor="gray"
        />

        {/* Desktops Section with Tabs */}
        <CategoryWithTabsSection
          categoryImage="/desktop-tower.jpg"
          categoryAlt="Desktops"
          categoryTitle="Desktops"
          tabs={desktopTabs}
          defaultTab="MSI Infinite Series"
          products={newProducts}
          bgColor="white"
        />

        {/* Gaming Monitors Section */}
        <CategoryProductsSection
          categoryImage="/msi-logo-white.jpg"
          categoryAlt="Gaming Monitors"
          categoryTitle="Gaming Monitors"
          products={newProducts}
          bgColor="gray"
        />

        {/* Brand Showcase */}
        <BrandShowcase />

        {/* Customer Stats */}
        <CustomerStats stats={customer} />

        {/* Testimonial */}
        <Testimonial
          quote="Mi primera orden llegó hoy en perfectas condiciones. Desde que envié una pregunta sobre el producto hasta realizar la compra, el envío y ahora la entrega, TechStore se mantuvo en contacto. Un servicio excepcional. Espero comprar nuevamente y lo recomiendo ampliamente."
          author="— Tama Brown"
          activeSlide={0}
          totalSlides={3}
        />

        {/* Features Grid */}
        <FeaturesGrid features={features} />
      </main>

      <Footer />
    </div>
  );
}
