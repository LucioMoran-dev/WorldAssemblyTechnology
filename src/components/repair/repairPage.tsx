import { FeaturesSection } from "@/components/repair/featuresSection";
import { MainFormSection } from "@/components/repair/form/mainFormSection";
import { HeroSectionRepair } from "@/components/repair/heroSectionRepair";

export default function RepairsPage() {
  return (
    <>
      <main className="min-h-screen bg-muted/40">
        {/* Hero Section */}
        <HeroSectionRepair />

        {/* Main Form Section */}
        <MainFormSection />

        {/* Features Section */}
        <FeaturesSection />
      </main>
    </>
  );
}

