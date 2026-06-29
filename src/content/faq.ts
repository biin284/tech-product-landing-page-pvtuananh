export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    question: "How long does the battery actually last?",
    answer:
      "Up to 7 days with typical use, or around 2 days with the always-on display switched on and continuous workout tracking.",
  },
  {
    question: "Is it compatible with iPhone and Android?",
    answer:
      "Yes. SmartWatch pairs with iOS 15+ and Android 9+ over Bluetooth, with full functionality on both platforms.",
  },
  {
    question: "Can I swim or shower with it?",
    answer:
      "It's rated 5ATM (50 meters), so pool swims, showers, and rain are all fine. We wouldn't recommend high-pressure water sports or diving.",
  },
  {
    question: "Do I need a separate cellular plan?",
    answer:
      "Only if you choose the Titanium or Pro build and want calls and messages without your phone nearby. The Aluminum build works over GPS and Bluetooth alone.",
  },
  {
    question: "What's the warranty?",
    answer:
      "Every SmartWatch ships with a 1-year limited warranty covering manufacturing defects, plus 90 days of free support.",
  },
  {
    question: "Where is my health data stored?",
    answer:
      "On your device and in the companion app under your account, encrypted in transit and at rest. You can export or delete it at any time.",
  },
];
