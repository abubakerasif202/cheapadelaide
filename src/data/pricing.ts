import { business } from "@/config/business";

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
    name: business.pricing.twoMovers.name,
    popular: false,
    ratePerHalfHour: business.pricing.twoMovers.thirtyMinutes,
    hourlyReference: business.pricing.twoMovers.hourlyReference,
    suitability: "A two-person team with a truck.",
    ctaText: "Get Quote for 2 Movers",
  },
  {
    id: "three-movers",
    name: business.pricing.threeMovers.name,
    popular: true,
    ratePerHalfHour: business.pricing.threeMovers.thirtyMinutes,
    hourlyReference: business.pricing.threeMovers.hourlyReference,
    suitability: "A three-person team with a truck.",
    ctaText: "Get Quote for 3 Movers",
  },
];

export const priceDisclaimer = business.pricing.disclaimer;

export const quoteFactors = [
  { title: "Move size and inventory", description: "The size and contents of the move help determine the team and time needed." },
  { title: "Property access", description: "Stairs, lifts, hallways, parking and distance from the truck can affect access." },
  { title: "Travel", description: "The route between pickup and delivery is part of the move details." },
  { title: "Additional services", description: "Any additional services requested form part of the quote discussion." },
  { title: "Team size", description: "Choose a team size or ask for guidance based on your move details." },
];

// Truck preferences are separate from the published crew packages.
export const truckOptions = [
  { id: "small", name: "Small Truck", description: "For smaller moving enquiries, apartments, units and compact loads.", benefits: ["Share your furniture list", "Tell us about stairs and lifts", "Ask us to assess truck access"] },
  { id: "big", name: "Big Truck", description: "For larger moving enquiries, family relocations and substantial inventories.", benefits: ["Share your full inventory", "Flag heavy or oversized items", "Plan loading and parking access"] },
] as const;
export type TruckPreference = "small" | "big" | "unsure";
export const truckQuoteNotice = "Truck capacity, crew, availability and applicable rate are confirmed in your quote. Minimum booking, travel and call-out charges must also be confirmed before booking.";
