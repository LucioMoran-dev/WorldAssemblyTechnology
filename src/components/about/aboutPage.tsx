import { DeliverySection } from "@/components/about/deliverySection";
import { FeaturesSectionAbout } from "@/components/about/FeaturesSectionAbout";
import { HeroSectionAbout } from "@/components/about/heroSection";
import { QualitySection } from "@/components/about/qualitySection";
import { SafeHandsSection } from "@/components/about/safeHandsSection";
import { TestimonialSection } from "@/components/about/testimonialSection";
import { WorldSection } from "@/components/about/worldSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Title */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-4xl font-bold">Nosotros</h1>
      </div>

      {/* Hero Section */}
      <HeroSectionAbout />

      {/* World Section */}
      <WorldSection />

      {/* Safe Hands Section */}
      <SafeHandsSection />

      {/* Quality Section */}
      <QualitySection />

      {/* Delivery Section */}
      <DeliverySection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Features Section */}
      <FeaturesSectionAbout />
    </div>
  );
}
