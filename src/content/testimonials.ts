export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I stopped noticing it was on my wrist within a day, which is exactly the point.",
    name: "Mai Tran",
    role: "Product designer",
  },
  {
    quote: "The battery actually lasts a week. I've stopped carrying the charger on trips.",
    name: "David Oyelaran",
    role: "Marathon runner",
  },
  {
    quote: "Sleep tracking finally feels accurate instead of just decorative.",
    name: "Hannah Kim",
    role: "Software engineer",
  },
  {
    quote: "Swam with it for two months straight. Not a scratch, not a single sync issue.",
    name: "Carlos Medina",
    role: "Triathlon coach",
  },
  {
    quote: "The always-on display is the first one I've used that's readable in full sun.",
    name: "Aoi Sato",
    role: "Cyclist",
  },
  {
    quote: "Setup took two minutes. Everything since has just worked.",
    name: "Priya Nair",
    role: "Product manager",
  },
];
