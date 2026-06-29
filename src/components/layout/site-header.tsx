"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="#" className="text-sm font-semibold tracking-tight">
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href="#contact" size="sm" className="hidden md:inline-flex">
          Get SmartWatch
        </Button>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-full bg-foreground transition-transform duration-200",
                open && "top-1/2 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 h-px w-full bg-foreground transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px w-full bg-foreground transition-transform duration-200",
                open && "bottom-1/2 -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <MobileNavSheet open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
