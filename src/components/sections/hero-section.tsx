import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { findPublicAsset } from "@/lib/has-asset";

const HERO_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

const STATS = [
  { label: "Battery life", value: "7 days" },
  { label: "Water resistance", value: "50m" },
  { label: "Display", value: "Always-on" },
] as const;

export function HeroSection() {
  const heroImageSrc = findPublicAsset(
    "images/product/hero",
    HERO_IMAGE_EXTENSIONS,
  );

  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />

      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <Badge>New — Series X</Badge>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Your day, <span className="text-accent">perfectly</span> tracked.
          </h1>
          <p className="mt-6 max-w-lg text-base text-muted-foreground lg:text-lg">
            SmartWatch pairs a week of battery life with health tracking
            precise enough to trust, in a body light enough to forget
            you&apos;re wearing it.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#contact" size="lg">
              Get SmartWatch
            </Button>
            <Button href="#features" variant="secondary" size="lg">
              Explore features
            </Button>
          </div>
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="font-mono text-2xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square w-full animate-float">
            {heroImageSrc ? (
              <Image
                src={heroImageSrc}
                alt="SmartWatch on a wrist"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 80vw"
                className="object-contain drop-shadow-2xl"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[2.5rem] border border-dashed border-border bg-gradient-to-br from-surface-elevated to-surface px-6 text-center text-sm text-muted-foreground">
                <span>Product photo placeholder</span>
                <span className="text-xs">
                  Add public/images/product/hero.png
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
