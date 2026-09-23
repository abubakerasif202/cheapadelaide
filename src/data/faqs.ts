export interface FAQItem {
  id: string;
  category: "general" | "pricing" | "services" | "preparation";
  question: string;
  answer: string;
}

export const generalFaqs: FAQItem[] = [
  {
    id: "request-quote",
    category: "general",
    question: "How do I request a moving quote?",
    answer:
      "You can submit our online quote form anytime at /get-a-quote with your pickup and delivery suburbs, property type, and move date. Alternatively, call our team directly on 0491 704 136 between 7:00 am and 8:00 pm, 7 days a week.",
  },
  {
    id: "info-needed",
    category: "general",
    question: "What information should I provide for an accurate quote?",
    answer:
      "To give you an accurate scope, please share: your pickup and drop-off suburbs, estimated move date, property types (e.g. 2-bed house vs 3rd-floor apartment), major furniture pieces, and any access details such as stairs, steep driveways, or elevator bookings.",
  },
  {
    id: "house-moves",
    category: "services",
    question: "Do you handle complete house removals?",
    answer:
      "Yes. We handle residential moves ranging from 1-bedroom units and townhouses up to 4+ bedroom family homes across Greater Adelaide and regional South Australia.",
  },
  {
    id: "apartment-moves",
    category: "services",
    question: "Do you handle apartment moves with stairs or lifts?",
    answer:
      "Yes. Our movers regularly manage apartment relocations involving lift bookings, basement parking constraints, and walk-up stairs across Adelaide CBD and suburban complexes.",
  },
  {
    id: "office-moves",
    category: "services",
    question: "Do you handle commercial and office moves?",
    answer:
      "Yes. We relocate offices, retail stores, and commercial workspaces across Adelaide, handling desks, task chairs, IT equipment cartons, meeting tables, and storage units with minimal operational disruption.",
  },
  {
    id: "packing-assistance",
    category: "services",
    question: "Can I request packing assistance for our move?",
    answer:
      "Yes. We offer professional packing and unpacking support. Our team can pack your entire home or focus specifically on high-fragility areas like kitchen glassware, ceramics, and ornaments.",
  },
  {
    id: "interstate-moves",
    category: "services",
    question: "Do you handle interstate moves and backloading?",
    answer:
      "Yes. We coordinate interstate removals connecting Adelaide with major destinations including Melbourne, Sydney, Brisbane, Canberra, and regional centres, offering both direct vehicle allocations and budget-friendly backloading.",
  },
  {
    id: "preparation",
    category: "preparation",
    question: "How should I prepare before moving day?",
    answer:
      "To ensure a fast, efficient move: have all loose items packed into sealed boxes before the truck arrives, disassemble non-standard flat-pack items if possible, empty desk and dresser drawers, and ensure clear parking for the truck outside your property.",
  },
  {
    id: "cost-factors",
    category: "pricing",
    question: "What affects the total cost of a move?",
    answer:
      "Starting rates begin from $79 per 30 minutes ($158/hr) for 2 movers and a truck. Total cost depends on move size, inventory volume, property access (stairs, long walks, elevator waits), travel distance between addresses, and any additional packing or backloading requested.",
  },
  {
    id: "two-vs-three",
    category: "pricing",
    question: "How do I choose between two and three movers?",
    answer:
      "2 Movers + Truck (from $79 / 30 min) is best for 1-2 bedroom apartments and lighter loads. 3 Movers + Truck (from $99 / 30 min) is recommended for 3+ bedroom houses or jobs with stairs, as the third mover keeps the loading flow constant and frequently reduces the overall billable time.",
  },
];
