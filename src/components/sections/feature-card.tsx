import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { Feature } from "@/content/features";

type FeatureCardProps = {
  feature: Feature;
  delay?: number;
};

export function FeatureCard({ feature, delay = 0 }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <Reveal
      delay={delay}
      className={cn("h-full", feature.featured && "lg:col-span-2 lg:row-span-2")}
    >
      <Card
        className={cn(
          "flex h-full flex-col justify-start gap-4 transition-colors hover:border-accent/40",
          feature.featured && "p-8",
        )}
      >
        <Icon className={cn("text-accent", feature.featured ? "h-9 w-9" : "h-7 w-7")} />
        <h3 className="text-lg font-semibold tracking-tight">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </Card>
    </Reveal>
  );
}
