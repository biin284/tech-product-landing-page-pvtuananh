import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GalleryColorSwitcher } from "@/components/sections/gallery-color-switcher";
import { findPublicAssetSequence } from "@/lib/has-asset";

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

export function GallerySection() {
  const galleryImages = findPublicAssetSequence(
    "images/product/gallery",
    IMAGE_EXTENSIONS,
    6,
  );

  return (
    <section id="gallery" className="py-24 lg:py-32">
      <Container className="flex flex-col items-center">
        <SectionHeading
          eyebrow="Gallery"
          title="Every angle, considered"
          description="Drop your own product photos into public/images/product/ to replace these placeholders."
        />

        <Reveal className="mt-16 w-full max-w-xl">
          {galleryImages.length >= 2 ? (
            <GalleryColorSwitcher images={galleryImages} />
          ) : galleryImages.length === 1 ? (
            <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-border bg-surface">
              <Image
                src={galleryImages[0]}
                alt="SmartWatch product photo"
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-[2.5rem] border border-dashed border-border bg-gradient-to-br from-surface-elevated to-surface px-6 text-center text-sm text-muted-foreground">
              <span>Gallery placeholder</span>
              <span className="text-xs">
                Add public/images/product/gallery-1.png, gallery-2.png, ...
              </span>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
