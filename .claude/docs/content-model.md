# Content model

All copy and structured data for the landing page lives in `src/content/*.ts` as typed arrays. Sections import the array they need and `.map()` over it — they never contain hardcoded copy for repeated items (a single hero headline is fine inline; a list of 6 features is not). To change what's on the page, edit these files; you should rarely need to touch a section component itself.

## `features.ts` → `FEATURES: Feature[]`

```ts
type Feature = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>; // one of src/components/ui/icons.tsx
  featured?: boolean; // true = the large 2x2 bento cell, only one item should set this
};
```

Consumed by `feature-card.tsx` inside `features-bento-section.tsx`. The bento grid is 3 columns on `lg:` and uses `grid-flow-dense`; with 1 featured + 5 regular items it packs into an exact 3x3 grid with no gaps. If you change the item count, recheck the grid math (see `architecture.md`) or it will leave a ragged last row.

## `specs.ts` → `SPECS: SpecRow[]`

```ts
type SpecRow = { label: string; value: string };
```

Rendered as a label/value list in `specs-section.tsx`, two columns on `sm:` and up, one column (label above value) on mobile.

## `testimonials.ts` → `TESTIMONIALS: Testimonial[]`

```ts
type Testimonial = { quote: string; name: string; role: string };
```

`testimonials-section.tsx` duplicates this array (`[...TESTIMONIALS, ...TESTIMONIALS]`) to drive a seamless CSS marquee loop (`animate-marquee` in `globals.css`, `translateX(-50%)`). If you add/remove items, the loop still works — the duplication trick doesn't depend on the count.

## `pricing.ts` → `PRICING_PLANS: PricingPlan[]`

```ts
type PricingPlan = {
  name: string;
  price: string;       // pre-formatted, e.g. "$299" — not a number
  description: string;
  features: string[];
  highlighted?: boolean; // true = "Most popular" badge + accent border, exactly one item
};
```

`src/lib/jsonld.ts` parses `price` back out of this array with a regex (`/[^0-9.]/g`) to compute the `AggregateOffer` `lowPrice`/`highPrice` in the Product JSON-LD. If you reformat `price` to something the regex can't parse as a number, the JSON-LD will break silently (it won't throw, it'll just emit `NaN`) — check `seo-performance.md` and re-render the page to confirm the JSON-LD script tag still has real numbers after changing this file.

## `faq.ts` → `FAQS: FaqItem[]`

```ts
type FaqItem = { question: string; answer: string };
```

Rendered by `faq-accordion.tsx`, single-open accordion, first item open by default (`useState<number | null>(0)`).
