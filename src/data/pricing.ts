export interface PricingPlan {
  id: string;
  name: string;
  popular?: boolean;
  ratePerHalfHour: number;
  hourlyReference: number;
  suitability: string;
  ctaText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "two-movers",
    name: "2 Movers + Truck",
    popular: false,
    ratePerHalfHour: 79,
    hourlyReference: 158,
    suitability: "A two-person team with a truck.",
    ctaText: "Get Quote for 2 Movers",
  },
  {
    id: "three-movers",
    name: "3 Movers + Truck",
    popular: true,
    ratePerHalfHour: 99,
    hourlyReference: 198,
    suitability: "A three-person team with a truck.",
    ctaText: "Get Quote for 3 Movers",
  },
];

export const priceDisclaimer =
  "Final pricing depends on move size, inventory, access, travel and any additional services required.";

export const quoteFactors = [
  { title: "Move size and inventory", description: "The size and contents of the move help determine the team and time needed." },
  { title: "Property access", description: "Stairs, lifts, hallways, parking and distance from the truck can affect access." },
  { title: "Travel", description: "The route between pickup and delivery is part of the move details." },
  { title: "Additional services", description: "Any additional services requested form part of the quote discussion." },
  { title: "Team size", description: "Choose a team size or ask for guidance based on your move details." },
];
