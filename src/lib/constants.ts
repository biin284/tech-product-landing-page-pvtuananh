export const SITE_NAME = "SmartWatch";

export const SITE_TAGLINE = "Your day, perfectly tracked.";

export const SITE_DESCRIPTION =
  "SmartWatch — a premium smartwatch built for all-day health tracking, week-long battery life, and a display that never sleeps.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Specs", href: "#specs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
] as const;
