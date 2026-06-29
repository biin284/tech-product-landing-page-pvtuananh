"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryColorSwitcherProps = {
  images: string[];
};

export function GalleryColorSwitcher({ images }: GalleryColorSwitcherProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-border bg-surface">
        <Image
          src={images[active]}
          alt={`SmartWatch gallery photo ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 560px, 90vw"
          className="object-contain"
        />
      </div>

      <div className="mt-6 flex justify-center gap-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Show photo ${index + 1}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              index === active ? "bg-accent" : "bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </div>
  );
}
