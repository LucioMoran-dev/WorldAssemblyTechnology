import {
  features,
  testimonials,
  laptopTabs,
  desktopTabs,
  customerStats,
} from "@/seeds";

import { BrandShowcase } from "./brand-showcase";
import { CustomerStats } from "./customer-stats";
import { FeaturesGrid } from "./features-grid";
import Footer from "./footer/footer";
import Header from "./header/header";
import { CategoryProductsSection } from "./sections/category-products-section";
import { CategoryWithTabsSection } from "./sections/category-with-tabs-section";
import { HeroSection } from "./sections/hero-section";
import { NewProductsSection } from "./sections/new-products-section";
import { Testimonial } from "./testimonial";

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Banner */}
        <HeroSection />

        {/* New Products Section */}
        <NewProductsSection />

        {/* Custom Builds Section */}
        <CategoryProductsSection
          categoryImage="/custom-pc-build-icon.jpg"
          categoryAlt="Custom Builds"
          categoryTitle="Custom Builds"
          categoryQuery="Custom Builds"
          bgColor="white"
          limit={10}
        />

        {/* MSI Laptops Section with Tabs */}
        <CategoryWithTabsSection
          categoryImage="/msi-dragon-logo-red.jpg"
          categoryAlt="Laptops"
          categoryTitle="Laptops"
          categoryQuery="Laptops"
          tabs={laptopTabs}
          defaultTab="Laptops"
          bgColor="gray"
          limit={10}
        />

        {/* Desktops Section with Tabs */}
        <CategoryWithTabsSection
          categoryImage="/desktop-tower.jpg"
          categoryAlt="Desktops"
          categoryTitle="Desktops"
          categoryQuery="Desktop-pcs"
          tabs={desktopTabs}
          defaultTab="Desktops"
          bgColor="white"
          limit={10}
        />

        {/* Gaming Monitors Section */}
        <CategoryProductsSection
          categoryImage="/gaming-screen.webp"
          categoryAlt="Monitors"
          categoryTitle="Monitors"
          categoryQuery="Monitors"
          bgColor="gray"
          limit={10}
        />

        {/* Brand Showcase */}
        <BrandShowcase />

        {/* Customer Stats */}
        <CustomerStats stats={customerStats} />

        {/* Testimonial */}
        {testimonials[0] && (
          <Testimonial
            quote={testimonials[0].quote}
            author={testimonials[0].author}
            activeSlide={0}
            totalSlides={testimonials.length}
          />
        )}

        {/* Features Grid */}
        <FeaturesGrid features={features} />
      </main>

      <Footer />
    </div>
  );
}
