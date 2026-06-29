import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/sections/feature-card";
import { FEATURES } from "@/content/features";

export function FeaturesBentoSection() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Engineered around your day"
          description="Every sensor, surface, and pixel is tuned to disappear into the background until you need it."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-flow-dense lg:auto-rows-[14rem] lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} delay={index * 75} />
          ))}
        </div>
      </Container>
    </section>
  );
}
