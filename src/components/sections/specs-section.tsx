import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SPECS } from "@/content/specs";

export function SpecsSection() {
  return (
    <section id="specs" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Specs"
          align="left"
          title="The numbers behind the experience"
          description="Every detail, measured."
        />

        <Reveal>
          <dl className="mt-16 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-4 border-b border-border py-4"
              >
                <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                <dd className="text-right font-mono text-sm font-medium">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
