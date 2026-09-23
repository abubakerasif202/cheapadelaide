export interface PricingPlan {
  id: string;
  name: string;
  popular?: boolean;
  ratePerHalfHour: number;
  hourlyReference: number;
  badge?: string;
  suitability: string;
  features: string[];
  ctaText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "two-movers",
    name: "2 Movers + Truck",
    popular: false,
    ratePerHalfHour: 79,
    hourlyReference: 158,
    badge: "Most Common For 1-2 Beds",
    suitability: "Best for 1–2 bedroom apartments, small townhouses, and furniture transfers.",
    features: [
      "2 experienced Adelaide removalists",
      "Fully equipped enclosed moving truck",
      "Heavy-duty protective moving blankets & straps",
      "Trolleys, dollies & loading equipment included",
      "Standard bed & dining table disassembly/reassembly",
      "Clear, transparent 30-minute incremental billing",
    ],
    ctaText: "Get Quote for 2 Movers",
  },
  {
    id: "three-movers",
    name: "3 Movers + Truck",
    popular: true,
    ratePerHalfHour: 99,
    hourlyReference: 198,
    badge: "Fastest For 3+ Bedrooms",
    suitability: "Recommended for 3+ bedroom family homes, large offices, and multi-storey moves.",
    features: [
      "3 experienced Adelaide removalists",
      "Larger capacity enclosed moving truck",
      "Faster loading & unloading to reduce overall job hours",
      "Dedicated staging mover for continuous truck loading",
      "Ideal for properties with stairs, long walks, or heavy timber",
      "Disassembly & careful placement into designated rooms",
    ],
    ctaText: "Get Quote for 3 Movers",
  },
];

export const priceDisclaimer =
  "Final pricing depends on move size, inventory, access, travel and any additional services required.";

export const quoteFactors = [
  {
    title: "Size of the Move",
    description:
      "A 1-bedroom studio move requires far less truck space and handling time than an expansive 4-bedroom family home.",
  },
  {
    title: "Amount of Furniture & Boxes",
    description:
      "The total cubic volume of boxed inventory, bulky appliances, and furniture suites directly affects truck loading duration.",
  },
  {
    title: "Pickup Property Access",
    description:
      "Ground floor driveways allow faster trolley runs than 3 flights of stairs, narrow hallways, or 100m walks from the truck.",
  },
  {
    title: "Delivery Property Access",
    description:
      "Steep gradients, lift reservation limits, tight turns, and security gates at your drop-off destination influence job flow.",
  },
  {
    title: "Travel Distance",
    description:
      "Local moves within the same Adelaide council district require less transit time than moves across Greater Adelaide or interstate.",
  },
  {
    title: "Requested Additional Services",
    description:
      "Adding full-house packing, breakable kitchenware wrapping, or specialised backloading affects total booking scope.",
  },
  {
    title: "Required Team Size",
    description:
      "Selecting 3 movers often cuts total hours significantly on larger jobs, offering greater efficiency for big houses.",
  },
];
