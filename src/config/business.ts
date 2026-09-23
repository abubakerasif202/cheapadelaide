export const business = {
  name: "Cheap Adelaide Removalist",
  shortName: "Cheap Adelaide Movers",
  tagline: "Adelaide Moves Further Together",
  positioning: "Affordable Adelaide removalists presented with a premium, trustworthy and modern brand.",
  corePrinciple: "AFFORDABLE SERVICE. PREMIUM PRESENTATION.",
  domain: "https://cheapadelaideremovalist.com.au",

  contact: {
    primaryPhone: "0491 704 136",
    primaryPhoneHref: "tel:+61491704136",
    secondaryPhone: "0493 092 539",
    secondaryPhoneHref: "tel:+61493092539",
    email: "admin@hfremovalsadelaide.com.au",
  },

  location: {
    street: "20 Prunus Ave",
    suburb: "Elizabeth Vale",
    state: "SA",
    postcode: "5112",
    country: "Australia",
    fullAddress: "20 Prunus Ave, Elizabeth Vale SA 5112, Australia",
  },

  hours: "7:00 am – 8:00 pm daily",
  hoursDetail: {
    days: "Monday – Sunday",
    times: "7:00 am – 8:00 pm",
  },

  market: "Adelaide, South Australia",
  operatorNotice: "Cheap Adelaide Removalist is operated by the same local removals operation behind HF Removals Adelaide.",

  pricing: {
    twoMovers: {
      name: "2 Movers + Truck",
      thirtyMinutes: 79,
      hourlyReference: 158,
      description: "Ideal for 1-2 bedroom apartments, small homes, and single-item or furniture transfers.",
    },
    threeMovers: {
      name: "3 Movers + Truck",
      thirtyMinutes: 99,
      hourlyReference: 198,
      description: "Recommended for 3+ bedroom family homes, large offices, and heavier multi-storey moves.",
    },
    disclaimer: "Final pricing depends on move size, inventory, access, travel and any additional services required.",
  },

  brandColors: {
    primaryNavy: "#0B2D5B",
    vividOrange: "#FF6A00",
    deepOrange: "#E63900",
    darkCharcoal: "#1A2B44",
    lightBackground: "#F7F8FA",
    neutralText: "#2E3A4A",
    white: "#FFFFFF",
  },
} as const;
