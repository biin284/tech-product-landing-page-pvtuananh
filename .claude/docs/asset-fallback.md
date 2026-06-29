# Asset fallback resolution

This project ships with zero real product photography. `src/lib/has-asset.ts` is what lets every section render correctly either way — with placeholders before photos exist, and with real images the moment they're added, with no code changes in between.

## `findPublicAsset(baseRelativePath, extensions)`

```ts
findPublicAsset("images/product/hero", ["png", "jpg", "jpeg", "webp"])
// -> "/images/product/hero.png"  if public/images/product/hero.png exists
// -> "/images/product/hero.jpg"  else if that exists
// -> ... (checked in array order)
// -> null                        if none of the extensions exist
```

It's a synchronous `existsSync` check against `public/`, run at render time inside a Server Component (`existsSync` is a Node API — this only works because the caller is a Server Component; never call this from a `"use client"` file). Because the page is statically generated, this check runs once per build, not per request.

**Used by:** `hero-section.tsx`, checking `images/product/hero`.

## `findPublicAssetSequence(baseRelativePath, extensions, maxCount)`

```ts
findPublicAssetSequence("images/product/gallery", ["png", "jpg", "jpeg", "webp"], 6)
// -> ["/images/product/gallery-1.png", "/images/product/gallery-2.jpg"]
// (checks gallery-1, gallery-2, ... gallery-6; returns only the ones that exist, in order)
```

**Used by:** `gallery-section.tsx`, checking `images/product/gallery` up to 6 images.

## The three-way branch every caller implements

Every section using these helpers renders one of three things, and this is the pattern to copy for any new section that needs a real asset:

1. **0 results** → a `border-dashed` placeholder block with instructions (e.g. "Add public/images/product/hero.png")
2. **1 result** → the real image directly via `next/image`, no interactivity needed
3. **2+ results** (gallery only) → hand off to the `gallery-color-switcher.tsx` client component, which adds the dot-switcher UI

`gallery-section.tsx` is the reference implementation for the 3-way branch (0 / 1 / 2+) since it's the only section that needs all three. `hero-section.tsx` only needs the 0 / 1 case.

## Naming convention if you add a new image-driven section

Pick a `baseRelativePath` under `images/product/`, document the expected filename(s) in the README's "Product images" table, and reuse `findPublicAsset`/`findPublicAssetSequence` rather than writing a new file-existence check.
