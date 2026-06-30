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
                className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                <dd className="font-mono text-sm font-medium sm:text-right">
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
