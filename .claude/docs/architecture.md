# Architecture

## Folder layout

```
src/
├── app/
│   ├── layout.tsx        Root layout: fonts, <head> metadata, JSON-LD script, SiteHeader/SiteFooter
│   ├── page.tsx          The only route. Composes all sections in order (see below).
│   ├── globals.css       Tailwind v4 import + @theme tokens + custom keyframes (float, marquee)
│   ├── sitemap.ts        MetadataRoute.Sitemap — see seo-performance.md
│   ├── robots.ts         MetadataRoute.Robots — see seo-performance.md
│   ├── icon.tsx           Generated favicon (next/og ImageResponse)
│   └── opengraph-image.tsx  Generated OG/Twitter share image (next/og ImageResponse)
├── components/
│   ├── layout/           site-header.tsx, mobile-nav-sheet.tsx, site-footer.tsx
│   ├── sections/         one file (or a shell + a leaf) per landing-page section
│   └── ui/                Button, Container, SectionHeading, Card, Badge, Reveal, icons.tsx
├── content/              Typed data arrays consumed by sections — see content-model.md
└── lib/                  constants.ts, utils.ts (cn helper), has-asset.ts, jsonld.ts
```

There is exactly one route (`/`). This is a single-page site; there is no router complexity to reason about.

## Section composition order

`src/app/page.tsx` renders sections in this fixed order, each wrapped only in a `<section id="...">`:

1. `HeroSection` (no `id` — it's the page top)
2. `FeaturesBentoSection` (`#features`)
3. `SpecsSection` (`#specs`)
4. `GallerySection` (`#gallery`)
5. `TestimonialsSection` (no anchor — not in nav)
6. `PricingSection` (`#pricing`)
7. `FaqSection` (`#faq`)
8. `ContactSection` (`#contact`)

The `id`s are the anchor targets for `NAV_ITEMS` in `src/lib/constants.ts` and for in-page CTAs (e.g. every "Get SmartWatch" button links to `#contact`). If you rename or remove a section's `id`, update `NAV_ITEMS` and any hardcoded `href="#..."` in Button usages in the same change.

`SiteHeader` and `SiteFooter` are not part of `page.tsx` — they're mounted once in `src/app/layout.tsx` so they persist across the (single) route.

## Server vs. Client split

Every component is a Server Component by default and renders to static HTML at build time (`next build` produces a fully static `/` route — confirm this still holds after any change by checking the build output says `○ (Static)` for `/`).

Exactly 6 files are Client Components (`"use client"`), each a small leaf, never a whole section:

| File | Why it's client |
|---|---|
| `components/layout/site-header.tsx` | mobile menu open/close state |
| `components/layout/mobile-nav-sheet.tsx` | rendered by site-header, shares its state |
| `components/sections/gallery-color-switcher.tsx` | active-photo index state |
| `components/sections/faq-accordion.tsx` | open-question index state |
| `components/sections/contact-form.tsx` | form submission state + `fetch` to Web3Forms |
| `components/ui/reveal.tsx` | `IntersectionObserver` for scroll-reveal |

Every section "shell" (e.g. `features-bento-section.tsx`, `gallery-section.tsx`) stays a Server Component and imports the client leaf it needs, rather than being client itself. When adding a new interactive section, follow this pattern — write the static markup as a Server Component, isolate only the stateful part into a new client leaf file.

## Design tokens

Colors and fonts are CSS custom properties defined once in `src/app/globals.css` under `@theme`, which Tailwind v4 turns directly into utility classes (`--color-accent` → `bg-accent`, `text-accent`, `border-accent`, etc.). There is no `tailwind.config.ts` — don't add one, edit `globals.css` instead.
