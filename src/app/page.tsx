import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesBentoSection } from "@/components/sections/features-bento-section";
import { SpecsSection } from "@/components/sections/specs-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesBentoSection />
      <SpecsSection />
      <GallerySection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
