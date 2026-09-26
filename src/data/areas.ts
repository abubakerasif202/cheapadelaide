export interface RegionArea {
  id: string;
  name: string;
  description: string;
  keyHubs: string[];
  serviceNotes: string;
}

export const adelaideRegions: RegionArea[] = [
  {
    id: "adelaide-cbd-inner",
    name: "Adelaide CBD & Inner Metro",
    description:
      "Apartment towers, historic cottages, and commercial offices throughout the city centre and surrounding inner-ring precincts.",
    keyHubs: ["Adelaide CBD", "North Adelaide", "Norwood", "Parkside", "Mile End", "Prospect"],
    serviceNotes: "Share any building access, loading dock or parking requirements when you enquire.",
  },
  {
    id: "northern-suburbs",
    name: "Northern Suburbs & Playford",
    description:
      "Residential areas and industrial locations across northern Adelaide.",
    keyHubs: ["Elizabeth Vale", "Salisbury", "Mawson Lakes", "Golden Grove", "Munno Para", "Gawler"],
    serviceNotes: "Send your pickup and delivery suburbs to discuss availability for this area.",
  },
  {
    id: "eastern-suburbs",
    name: "Eastern Suburbs & Foothills",
    description:
      "Established residential homes, tree-lined avenues, and multi-storey residences with varying driveway access.",
    keyHubs: ["Burnside", "Kensington", "Magill", "St Peters", "Unley", "Glenunga"],
    serviceNotes: "Include driveway, parking and access details in your enquiry.",
  },
  {
    id: "western-suburbs-coast",
    name: "Western Suburbs & Coastal Strip",
    description:
      "Beachfront apartments, coastal homes, and port-side commercial spaces across the western metro.",
    keyHubs: ["Glenelg", "Henley Beach", "Semaphore", "West Lakes", "Findon", "Woodville"],
    serviceNotes: "Send your pickup and delivery suburbs to discuss availability for this area.",
  },
  {
    id: "southern-suburbs",
    name: "Southern Suburbs & Marion",
    description:
      "Family residences, hilly terrains, and beachside suburbs extending toward the southern hills and coastline.",
    keyHubs: ["Marion", "Morphett Vale", "Hallett Cove", "Brighton", "Blackwood", "Noarlunga"],
    serviceNotes: "Include any slope, stairs or access details in your enquiry.",
  },
  {
    id: "adelaide-hills-regional",
    name: "Adelaide Hills & Regional SA",
    description:
      "Country properties, acreage, and regional towns connected to Greater Adelaide by main freight highways.",
    keyHubs: ["Mount Barker", "Stirling", "Hahndorf", "Barossa Valley", "Murray Bridge", "Victor Harbor"],
    serviceNotes: "Contact us with your route and timing to discuss availability.",
  },
];

export const interstateCorridors = [
  {
    route: "Adelaide ↔ Melbourne",
    description: "Contact us with your pickup, delivery and timing requirements to discuss availability.",
  },
  {
    route: "Adelaide ↔ Sydney",
    description: "Contact us with your pickup, delivery and timing requirements to discuss availability.",
  },
  {
    route: "Adelaide ↔ Brisbane",
    description: "Contact us with your pickup, delivery and timing requirements to discuss availability.",
  },
  {
    route: "Adelaide ↔ Canberra",
    description: "Contact us with your pickup, delivery and timing requirements to discuss availability.",
  },
];
