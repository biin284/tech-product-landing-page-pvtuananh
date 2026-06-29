export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Aluminum",
    price: "$299",
    description: "The essentials, in the lightest case.",
    features: ["GPS", "Sport band", "7-day battery", "5ATM water resistance"],
  },
  {
    name: "Titanium",
    price: "$499",
    description: "The one most people should get.",
    features: [
      "GPS + Cellular",
      "Titanium case",
      "Sapphire crystal glass",
      "7-day battery",
      "5ATM water resistance",
    ],
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$699",
    description: "Built for long days and harder use.",
    features: [
      "GPS + Cellular",
      "Rugged titanium case",
      "10-day battery",
      "10ATM water resistance",
    ],
  },
];
