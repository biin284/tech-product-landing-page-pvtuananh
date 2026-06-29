import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesBentoSection } from "@/components/sections/features-bento-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesBentoSection />
      <div className="flex min-h-[40vh] items-center justify-center border-t border-border">
        <p className="text-muted-foreground">More sections coming soon.</p>
      </div>
    </main>
  );
}
