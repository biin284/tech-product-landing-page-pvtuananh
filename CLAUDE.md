@AGENTS.md

# CLAUDE.md

This file is an index. It tells you what this project is and where to look — it does not contain implementation detail. Follow the links in section 6 for that.

## 1. Project overview

SmartWatch is a single-page marketing landing page for a fictional smartwatch product. It showcases a premium-minimalist dark-mode design across a hero, features bento grid, specs sheet, photo gallery, testimonials marquee, pricing tiers, FAQ, and a contact form that posts to a third-party form backend (Web3Forms) — there is no custom server or database.

## 2. Technologies used

- Next.js 16.2.9 (App Router, Turbopack, static generation)
- React 19.2.4 / TypeScript 5
- Tailwind CSS v4 (CSS-first config — no `tailwind.config.ts`; tokens live in `src/app/globals.css` under `@theme`)
- Geist / Geist Mono via `next/font/google` (self-hosted)
- `next/og` `ImageResponse` for the generated favicon (`src/app/icon.tsx`) and OG image (`src/app/opengraph-image.tsx`)
- Web3Forms for the contact form (client-side POST, no backend)
- ESLint 9 (`eslint-config-next`)
- Deploy target: Vercel, production branch `main`

## 3. Development commands

```bash
npm install
npm run dev      # dev server, http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

Copy `.env.local.example` to `.env.local` before running the contact form locally — see `.claude/docs/seo-performance.md` for what each variable feeds.

## 4. Summary of core logic

The only non-trivial logic in this codebase is the **asset-fallback resolver** in `src/lib/has-asset.ts`. There is no real product photography in this repo — `findPublicAsset()` checks `public/images/product/` for a file matching a base name plus a list of extensions and returns its URL, or `null` if none exist. `findPublicAssetSequence()` does the same for numbered files (`gallery-1`, `gallery-2`, ...). Sections call these at render time and branch on the result: a real `next/image` if found, a labeled placeholder block if not.

Full detail: [`.claude/docs/asset-fallback.md`](.claude/docs/asset-fallback.md).

## 5. Key constraints

- **No animation library.** Scroll-reveal is a hand-written `IntersectionObserver` hook (`src/components/ui/reveal.tsx`) + CSS `@keyframes`. Don't add Framer Motion or similar — it was deliberately excluded to protect the performance budget (current Lighthouse: Performance 96, Accessibility 100, Best Practices 100, SEO 100, mobile/simulated throttling, against `next build && next start`).
- **Tailwind v4 is CSS-first.** Theme tokens (`--color-*`, `--font-*`) live in `src/app/globals.css` under `@theme`. Don't create a `tailwind.config.ts`.
- **Server Components by default.** Only 6 files have `"use client"`: `site-header.tsx`, `mobile-nav-sheet.tsx`, `gallery-color-switcher.tsx`, `faq-accordion.tsx`, `contact-form.tsx`, `reveal.tsx`. Don't mark a section/layout component client unless it genuinely needs browser state — push interactivity into a small leaf component instead.
- **Content lives in `src/content/*.ts`** as typed arrays (features, specs, testimonials, pricing, faq), not inline in JSX.
- **One accent color.** `--color-accent` is the only brand color — don't introduce a second.
- **Contact form has no backend.** It POSTs directly to Web3Forms from the client. Don't add an API route or server action for it.
- **Git workflow:** feature branch → PR into `develop`. Only merge `develop` → `main` when intentionally deploying — `main` is the Vercel production branch.
- **Never hardcode a path under `public/images/product/`.** Always resolve product images through `findPublicAsset`/`findPublicAssetSequence`.

## 6. Supplementary documents

- [`.claude/docs/architecture.md`](.claude/docs/architecture.md) — folder layout, section composition order in `src/app/page.tsx`, Server/Client split rationale
- [`.claude/docs/content-model.md`](.claude/docs/content-model.md) — the typed `content/*.ts` data pattern and how sections consume it
- [`.claude/docs/asset-fallback.md`](.claude/docs/asset-fallback.md) — `has-asset.ts` mechanics in full
- [`.claude/docs/seo-performance.md`](.claude/docs/seo-performance.md) — metadata/JSON-LD/sitemap/robots setup and the performance rules behind the Lighthouse scores
