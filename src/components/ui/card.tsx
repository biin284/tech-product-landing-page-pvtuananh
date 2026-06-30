import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-6", className)}>
      {children}
    </div>
  );
}
