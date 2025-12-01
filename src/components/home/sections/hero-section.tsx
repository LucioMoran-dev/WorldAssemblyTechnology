import { HeroBanner } from "../hero-banner";

export function HeroSection() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <HeroBanner />
      </div>
    </section>
  );
}
