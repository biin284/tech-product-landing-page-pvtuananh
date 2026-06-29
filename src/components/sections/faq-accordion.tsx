"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/content/faq";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const open = index === openIndex;

        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="font-medium">{item.question}</span>
              <span
                aria-hidden
                className={cn(
                  "shrink-0 text-xl text-muted-foreground transition-transform duration-200",
                  open && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <p className="min-h-0 pb-6 text-sm text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
