import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TESTIMONIALS } from "@/content/testimonials";

export function TestimonialsSection() {
  const loopedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="Loved by people who actually wear it"
        />
      </Container>

      <div className="mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-6 animate-marquee">
          {loopedTestimonials.map((testimonial, index) => (
            <Card key={`${testimonial.name}-${index}`} className="w-80 shrink-0">
              <p className="text-sm text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
