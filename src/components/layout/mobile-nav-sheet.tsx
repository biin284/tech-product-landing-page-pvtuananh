"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type MobileNavSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavSheet({ open, onClose }: MobileNavSheetProps) {
  return (
    <div
      className={cn(
        "grid overflow-hidden border-b border-border bg-background transition-[grid-template-rows] duration-300 ease-out md:hidden",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <nav className="flex min-h-0 flex-col gap-1 px-6 py-4">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
        <Button href="#contact" onClick={onClose} className="mt-2">
          Get SmartWatch
        </Button>
      </nav>
    </div>
  );
}
