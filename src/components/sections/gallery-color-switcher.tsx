"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryColorSwitcherProps = {
  images: string[];
};

const SWIPE_THRESHOLD = 50;

export function GalleryColorSwitcher({ images }: GalleryColorSwitcherProps) {
  const [active, setActive] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    pointerStartX.current = e.clientX;
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return;
    const delta = e.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (delta < -SWIPE_THRESHOLD) {
      // swipe left → next image
      setActive((prev) => (prev + 1) % images.length);
    } else if (delta > SWIPE_THRESHOLD) {
      // swipe right → previous image
      setActive((prev) => (prev - 1 + images.length) % images.length);
    }
  }

  function handlePointerCancel() {
    pointerStartX.current = null;
  }

  return (
    <div>
      <div
        className="relative aspect-square w-full cursor-grab overflow-hidden rounded-[2.5rem] border border-border bg-surface select-none active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {images.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(${(index - active) * 100}%)` }}
          >
            <Image
              src={src}
              alt={`SmartWatch gallery photo ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-contain"
              draggable={false}
            />
          </div>
        ))}
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
