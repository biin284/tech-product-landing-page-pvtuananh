import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <Container className="mx-auto max-w-xl">
        <SectionHeading
          eyebrow="Get in touch"
          title="Have a question before you buy?"
          description="Send us a message and we'll get back to you within 1-2 business days."
        />
        <Reveal className="mt-12">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
