import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FAQS } from "@/content/faq";

export function FaqSection() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <Container className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-16">
          <FaqAccordion items={FAQS} />
        </div>
      </Container>
    </section>
  );
}
