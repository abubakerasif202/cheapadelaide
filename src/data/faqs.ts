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
      "Yes, you can include apartment details such as lift access, stairs, parking and building requirements in your quote request.",
  },
  {
    id: "office-moves",
    category: "services",
    question: "Do you handle commercial and office moves?",
    answer:
      "Office and commercial removals are listed services. Include the locations, items, access conditions and preferred timing in your enquiry.",
  },
  {
    id: "packing-assistance",
    category: "services",
    question: "Can I request packing assistance for our move?",
    answer:
      "Packing and unpacking are listed as additional service options. Include the areas and items you have in mind in your request so availability can be discussed.",
  },
  {
    id: "interstate-moves",
    category: "services",
    question: "Do you handle interstate moves and backloading?",
    answer:
      "Interstate removals and backloading are listed services. Share your pickup and destination details to discuss route availability.",
  },
  {
    id: "preparation",
    category: "preparation",
    question: "How should I prepare before moving day?",
    answer:
      "If possible, list the larger items, note any stairs or lift access, and check what parking is available at both addresses. You can include these details in your quote request.",
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
      "Starting rates are $79 / 30 min for 2 Movers + Truck and $99 / 30 min for 3 Movers + Truck. Share your inventory, access and travel details if you would like help considering a team size.",
  },
];
