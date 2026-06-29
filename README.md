# SmartWatch — Product Landing Page

Premium, minimalist marketing landing page for a fictional smartwatch ("SmartWatch"), built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Geist / Geist Mono via `next/font/google` (self-hosted, no external requests)
- **External data connectivity:** contact form submitted to [Web3Forms](https://web3forms.com)
- **Deployment:** Vercel (production branch: `main`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — free access key from [web3forms.com](https://web3forms.com) (no signup required), used by the contact form.
- `NEXT_PUBLIC_SITE_URL` — public URL of the deployment, used for metadata/sitemap/robots/JSON-LD.

## Product images

This project ships without real product photography. Drop your own images into `public/images/product/`:

| File | Used in | Recommended size | Required? |
|---|---|---|---|
| `hero.png` / `.jpg` | Hero section (LCP image) | ≥1600×1600 | Yes |
| `gallery-1.png`, `gallery-2.png`, ... | Gallery (angles / color variants) | ≥1200×1200 | No — add ≥2 to enable the variant switcher |

The Open Graph/social share image and the favicon are generated from code (`src/app/opengraph-image.tsx`, `src/app/icon.tsx`) — no static asset needed there.

## Scripts

- `npm run dev` — start the dev server
- `npm run lint` — run ESLint
- `npm run build` — production build
- `npm run start` — serve the production build

## Git workflow

Feature branches are cut per section/concern and merged into `develop` via PR; `develop` is merged into `main` (the Vercel production branch) when ready to ship.

## Deploying to Vercel

1. **Create the Vercel project.** Go to [vercel.com/new](https://vercel.com/new), import this GitHub repo (`biin284/tech-product-landing-page-pvtuananh`), and accept the auto-detected Next.js settings (no build command changes needed).
2. **Set the production branch.** In the new project's Settings → Git, set **Production Branch** to `main` (Vercel defaults to whatever branch you imported from — make sure it's `main`, not `develop`). Pushes to `develop` and any PR branch will still get their own Preview Deployment URL automatically; only `main` deploys to the production domain.
3. **Get a Web3Forms access key.** Go to [web3forms.com](https://web3forms.com), enter the email that should receive contact-form submissions — no account/password needed, the key arrives by email immediately.
4. **Add environment variables.** In Settings → Environment Variables, add for **both Production and Preview**:
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = the key from step 3
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://smartwatch-landing.vercel.app`, or a custom domain) — used for canonical metadata, sitemap.xml, robots.txt, and the JSON-LD block
5. **Merge `develop` into `main`** (open a PR `develop` → `main` and merge it, or merge directly) once everything above is in place. This triggers the first production deployment.
6. **Verify production**, in order:
   - Open the production URL and click through every nav link, the mobile menu, the gallery (if you've added photos), the FAQ accordion, and the pricing CTAs.
   - Submit the contact form for real and confirm the notification email from Web3Forms arrives.
   - Run [PageSpeed Insights](https://pagespeed.web.dev/) against the production URL (mobile) and confirm the Performance score — it should land in the same range as the local Lighthouse run (Performance 96, Accessibility 100, Best Practices 100, SEO 100 against `next build && next start`).
   - Visit `/sitemap.xml` and `/robots.txt` on the production domain and confirm they reference the real domain, not `localhost`.
   - Paste the production URL into a social-share debugger (e.g. Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/) or Twitter/X's card validator) to confirm the generated OG image renders.
7. **(Optional) restrict the Web3Forms key to your domain** from the Web3Forms dashboard once the production domain is final, to cut down on spam from other origins.
