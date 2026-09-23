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
    serviceNotes: "Regular coordination with building managers, loading docks, and city council parking.",
  },
  {
    id: "northern-suburbs",
    name: "Northern Suburbs & Playford",
    description:
      "Rapidly growing residential estates, family homes, and industrial transport corridors across northern Adelaide.",
    keyHubs: ["Elizabeth Vale", "Salisbury", "Mawson Lakes", "Golden Grove", "Munno Para", "Gawler"],
    serviceNotes: "Proximity to our 20 Prunus Ave operations base enables agile dispatch across the north.",
  },
  {
    id: "eastern-suburbs",
    name: "Eastern Suburbs & Foothills",
    description:
      "Established residential homes, tree-lined avenues, and multi-storey residences with varying driveway access.",
    keyHubs: ["Burnside", "Kensington", "Magill", "St Peters", "Unley", "Glenunga"],
    serviceNotes: "Careful navigation of steep driveways and narrow residential streets with protective equipment.",
  },
  {
    id: "western-suburbs-coast",
    name: "Western Suburbs & Coastal Strip",
    description:
      "Beachfront apartments, coastal homes, and port-side commercial spaces across the western metro.",
    keyHubs: ["Glenelg", "Henley Beach", "Semaphore", "West Lakes", "Findon", "Woodville"],
    serviceNotes: "Frequent apartment moves and single-level residential relocations across coastal strips.",
  },
  {
    id: "southern-suburbs",
    name: "Southern Suburbs & Marion",
    description:
      "Family residences, hilly terrains, and beachside suburbs extending toward the southern hills and coastline.",
    keyHubs: ["Marion", "Morphett Vale", "Hallett Cove", "Brighton", "Blackwood", "Noarlunga"],
    serviceNotes: "Experienced handling of sloped properties, multi-level homes, and split-level floorplans.",
  },
  {
    id: "adelaide-hills-regional",
    name: "Adelaide Hills & Regional SA",
    description:
      "Country properties, acreage, and regional towns connected to Greater Adelaide by main freight highways.",
    keyHubs: ["Mount Barker", "Stirling", "Hahndorf", "Barossa Valley", "Murray Bridge", "Victor Harbor"],
    serviceNotes: "Scheduled regional trips with dedicated medium and large truck configurations.",
  },
];

export const interstateCorridors = [
  {
    route: "Adelaide ↔ Melbourne",
    typicalTime: "1 – 2 Days",
    frequency: "Weekly runs",
    description: "Regular direct removals and backload capacity along the Western and Dukes Highways.",
  },
  {
    route: "Adelaide ↔ Sydney",
    typicalTime: "2 – 3 Days",
    frequency: "Scheduled runs",
    description: "Transport via Sturt and Hume Highways connecting Adelaide to Greater Sydney.",
  },
  {
    route: "Adelaide ↔ Brisbane",
    typicalTime: "3 – 4 Days",
    frequency: "Scheduled runs",
    description: "East coast corridor service for residential and business relocations.",
  },
  {
    route: "Adelaide ↔ Canberra",
    typicalTime: "2 – 3 Days",
    frequency: "On-demand runs",
    description: "Direct government, corporate, and private residential relocations to the ACT.",
  },
];
