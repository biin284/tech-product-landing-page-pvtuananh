import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRICING_PLANS } from "@/content/pricing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Choose your build"
          description="Every version ships with the same health platform. Pick the case that fits how you move."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 100} className="h-full">
              <Card
                className={cn(
                  "flex h-full flex-col gap-6",
                  plan.highlighted && "border-accent/60 bg-surface-elevated",
                )}
              >
                {plan.highlighted ? (
                  <Badge className="self-start border-accent/40 text-accent">
                    Most popular
                  </Badge>
                ) : null}
                <div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <p className="font-mono text-4xl font-semibold">{plan.price}</p>
                <ul className="flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href="#contact"
                  variant={plan.highlighted ? "primary" : "secondary"}
                >
                  Get {plan.name}
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
