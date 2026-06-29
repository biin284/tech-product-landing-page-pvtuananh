import type { ComponentType, SVGProps } from "react";
import {
  ActivityIcon,
  BatteryIcon,
  DisplayIcon,
  ShieldIcon,
  SignalIcon,
  WaterDropIcon,
} from "@/components/ui/icons";

export type Feature = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  featured?: boolean;
};

export const FEATURES: Feature[] = [
  {
    title: "Health tracking that doesn't guess",
    description:
      "Continuous heart rate, blood oxygen, and sleep-stage tracking from clinical-grade sensors, distilled into a daily readiness score.",
    icon: ActivityIcon,
    featured: true,
  },
  {
    title: "A week on one charge",
    description:
      "Up to 7 days of typical use, or 2 full days with the always-on display switched on.",
    icon: BatteryIcon,
  },
  {
    title: "Always-on display",
    description: "1,000 nits of brightness keeps the time legible in direct sunlight.",
    icon: DisplayIcon,
  },
  {
    title: "Swim-ready, 50m water resistant",
    description: "Rated for pool and open-water swims, not just rain.",
    icon: WaterDropIcon,
  },
  {
    title: "Seamless connectivity",
    description: "Bluetooth 5.3 and Wi-Fi keep calls, messages, and music in sync.",
    icon: SignalIcon,
  },
  {
    title: "Built to last",
    description: "Sapphire crystal glass and a titanium case shrug off daily wear.",
    icon: ShieldIcon,
  },
];
