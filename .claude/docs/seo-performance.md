# SEO and performance

## Environment variables

Defined in `.env.local.example`, copied to `.env.local` for local dev:

- `NEXT_PUBLIC_SITE_URL` — feeds `SITE_URL` in `src/lib/constants.ts`, which is used as `metadataBase` in `layout.tsx`, the URL in `sitemap.ts`/`robots.ts`, and `url`/`image` in the JSON-LD block. Defaults to `http://localhost:3000` if unset. **Must be set to the real production URL in Vercel** or sitemap/robots/JSON-LD will all point at localhost in production.
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — read directly in `contact-form.tsx`; see the contact-form flow in `architecture.md`'s client-component table.

## Metadata (`src/app/layout.tsx`)

A single static `export const metadata: Metadata = {...}` object — there's only one route, so there's no need for `generateMetadata`. It sets `title` (with a `template` for future routes), `description`, `openGraph`, `twitter` (`summary_large_image` card), and `robots: { index: true, follow: true }`. `TITLE` is built once from `SITE_NAME` + `SITE_TAGLINE` (both in `lib/constants.ts`) and reused for `title`, `openGraph.title`, and `twitter.title` so they can't drift out of sync — change the tagline in one place.

## Generated images (no static asset files)

- `src/app/icon.tsx` — favicon, 32×32, `next/og` `ImageResponse`, a flat accent-colored square with an "S".
- `src/app/opengraph-image.tsx` — share image, 1200×630, same `ImageResponse` approach, dark background + radial accent glow + `SITE_NAME`/`SITE_TAGLINE`.

Both are Next.js file conventions: having a file at that path is what wires up the `<link rel="icon">` / `og:image` / `twitter:image` tags automatically — nothing in `layout.tsx` references them directly. If you want a real designed favicon/OG image later, replace these `.tsx` files with static `icon.png` / `opengraph-image.png` files of the same name; Next.js picks either up the same way.

## Structured data (`src/lib/jsonld.ts`)

`productJsonLd()` builds a schema.org `Product` block, injected as a raw `<script type="application/ld+json">` in `layout.tsx`. Its `offers.lowPrice`/`highPrice` are computed from `PRICING_PLANS` (see `content-model.md`) by stripping non-numeric characters from each plan's `price` string — if you ever change `price` to something the strip-regex can't reduce to a number, this silently produces `NaN` in the JSON-LD rather than throwing. Verify after any pricing content change by loading the page and checking the script tag's content is valid JSON with real numbers.

## `sitemap.ts` / `robots.ts`

Both use the Next.js `MetadataRoute` file convention (`app/sitemap.ts` → `/sitemap.xml`, `app/robots.ts` → `/robots.txt`). The sitemap has exactly one entry (the root URL) since this is a single-page site — don't add entries for in-page anchors like `#features`, only add an entry if a real second route is added.

## Performance rules

These are the reasons the production build scores Performance 96 / Accessibility 100 / Best Practices 100 / SEO 100 (Lighthouse, mobile, simulated throttling, against `next build && next start`). Don't undo them without re-running Lighthouse to check the regression:

- **No client-side animation library.** `reveal.tsx` is the only animation primitive, and it's a ~30-line `IntersectionObserver` + CSS transition, not a dependency. The testimonials marquee and hero float are pure CSS `@keyframes` (see `globals.css`) — zero JS.
- **Above-the-fold content is never wrapped in `Reveal`.** A fully transparent (`opacity: 0`) element doesn't count as a Largest Contentful Paint candidate in any browser, so wrapping immediately-visible content (the hero) in a fade-in delays LCP and makes the browser pick a worse LCP element instead. `hero-section.tsx` deliberately does not use `Reveal` for this reason. Sections below the fold (Features, Specs, Gallery, Pricing, etc.) are fine to wrap — the user has to scroll to them anyway.
- **Accent-on-button contrast.** `--color-accent-foreground` is a near-black, not white, specifically because white text on `--color-accent` only hits a 3.16:1 contrast ratio (fails WCAG AA's 4.5:1). Don't flip this back to white without re-checking contrast.
- **Minimal Client Components.** See the table in `architecture.md` — only 6 files ship client JS. Adding `"use client"` to a section component (instead of a small leaf) increases the JS bundle for that whole section's subtree.
