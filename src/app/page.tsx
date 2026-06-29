import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="flex min-h-[60vh] items-center justify-center border-t border-border">
        <p className="text-muted-foreground">More sections coming soon.</p>
      </div>
    </main>
  );
}
