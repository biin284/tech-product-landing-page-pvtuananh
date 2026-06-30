import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { PRICING_PLANS } from "@/content/pricing";

export function productJsonLd() {
  const prices = PRICING_PLANS.map((plan) => Number(plan.price.replace(/[^0-9.]/g, "")));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    brand: { "@type": "Brand", name: SITE_NAME },
    image: `${SITE_URL}/opengraph-image`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: PRICING_PLANS.length,
      availability: "https://schema.org/InStock",
      url: SITE_URL,
    },
  };
}
