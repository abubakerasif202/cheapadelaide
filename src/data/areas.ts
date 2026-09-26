export interface RegionArea {
  id: string;
  name: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  description: string;
  keyHubs: string[];
  serviceNotes: string;
  movingConsiderations: string[];
  suitedFor: string[];
  faqs: { question: string; answer: string }[];
}

export const adelaideRegions: RegionArea[] = [
  {
    id: "adelaide-cbd-inner",
    name: "Adelaide CBD & Inner Metro",
    slug: "adelaide-cbd-inner-metro",
    seoTitle: "Removalists Adelaide CBD & Inner Metro | Cheap Adelaide Removalist",
    metaDescription:
      "Removalist enquiries for Adelaide CBD, North Adelaide, Norwood, Parkside, Mile End and Prospect. Share your building access details to discuss a quote.",
    description:
      "Apartment towers, historic cottages, and commercial offices throughout the city centre and surrounding inner-ring precincts.",
    keyHubs: ["Adelaide CBD", "North Adelaide", "Norwood", "Parkside", "Mile End", "Prospect"],
    serviceNotes: "Share any building access, loading dock or parking requirements when you enquire.",
    movingConsiderations: [
      "Many inner-city buildings have shared lifts, so a booking window or lift key may need to be arranged with building management beforehand.",
      "On-street parking near the CBD and North Adelaide can be metered or permit-only; note any loading zones near your address.",
      "Older cottages in Norwood and Prospect sometimes have narrow hallways or verandah steps that affect how larger furniture is carried.",
      "Commercial tenancies around the CBD fringe may require after-hours access or a dock booking, which is worth confirming in advance.",
    ],
    suitedFor: [
      "Apartment residents in the CBD or North Adelaide arranging a lift booking",
      "Cottage and terrace-house movers in Norwood, Parkside or Prospect",
      "Small offices and studios relocating within the inner-ring precincts",
    ],
    faqs: [
      {
        question: "Do you handle apartment moves in the Adelaide CBD?",
        answer:
          "Yes, apartment removals are a listed service. Share your building's lift booking process, floor level and loading dock rules so access can be discussed.",
      },
      {
        question: "Is street parking an issue for a move in North Adelaide or Norwood?",
        answer:
          "It can be, depending on the street. Note any timed parking, loading zones or permit requirements near your address when you enquire.",
      },
    ],
  },
  {
    id: "northern-suburbs",
    name: "Northern Suburbs & Playford",
    slug: "northern-suburbs-playford",
    seoTitle: "Removalists Northern Adelaide Suburbs | Cheap Adelaide Removalist",
    metaDescription:
      "Removalist enquiries for Elizabeth Vale, Salisbury, Mawson Lakes, Golden Grove, Munno Para and Gawler in Adelaide's north.",
    description:
      "Residential areas and industrial locations across northern Adelaide.",
    keyHubs: ["Elizabeth Vale", "Salisbury", "Mawson Lakes", "Golden Grove", "Munno Para", "Gawler"],
    serviceNotes: "Send your pickup and delivery suburbs to discuss availability for this area.",
    movingConsiderations: [
      "Our operating base is at Elizabeth Vale, so moves starting or finishing in this area are a familiar route for our crews.",
      "Salisbury and Munno Para include a mix of established homes and newer estates, with driveway widths that vary block to block.",
      "Golden Grove and Mawson Lakes have many two-storey homes; let us know about internal stairs when describing furniture.",
      "Gawler moves may involve a longer travel distance, which is factored into the time-based rate rather than a separate surcharge.",
    ],
    suitedFor: [
      "House removals within the northern suburbs and Playford council area",
      "Moves to or from our Elizabeth Vale operating base",
      "Growing families relocating between newer estates in Golden Grove or Mawson Lakes",
    ],
    faqs: [
      {
        question: "Is Elizabeth Vale within your normal service area?",
        answer:
          "Yes, Elizabeth Vale is our operating base, so moves in and around the northern suburbs are a regular route for us.",
      },
      {
        question: "Do you charge extra for moves further out, like Gawler?",
        answer:
          "Longer distances add to the time-based rate through travel. Share your pickup and delivery suburbs so this can be discussed when quoting.",
      },
    ],
  },
  {
    id: "eastern-suburbs",
    name: "Eastern Suburbs & Foothills",
    slug: "eastern-suburbs-foothills",
    seoTitle: "Removalists Eastern Adelaide & Foothills | Cheap Adelaide Removalist",
    metaDescription:
      "Removalist enquiries for Burnside, Kensington, Magill, St Peters, Unley and Glenunga in Adelaide's eastern suburbs and foothills.",
    description:
      "Established residential homes, tree-lined avenues, and multi-storey residences with varying driveway access.",
    keyHubs: ["Burnside", "Kensington", "Magill", "St Peters", "Unley", "Glenunga"],
    serviceNotes: "Include driveway, parking and access details in your enquiry.",
    movingConsiderations: [
      "Established homes in Burnside and Glenunga often have longer driveways or sloped blocks approaching the foothills.",
      "Unley and Kensington have a mix of character homes and unit developments, each with different access from the street to the front door.",
      "Tree-lined streets in this area can mean less direct kerb access for a truck; noting the nearest legal park helps with planning.",
      "St Peters and Magill properties closer to the parklands may have shared driveways worth mentioning in your enquiry.",
    ],
    suitedFor: [
      "Character home and villa moves across Unley, Kensington and St Peters",
      "Foothills properties in Burnside and Glenunga with sloped access",
      "Downsizing moves within the eastern suburbs",
    ],
    faqs: [
      {
        question: "Can your truck manage sloped driveways in Burnside or the foothills?",
        answer:
          "Access varies by property, so include driveway gradient, width and the nearest flat parking area in your enquiry so it can be assessed.",
      },
      {
        question: "Do character homes in Unley need special handling?",
        answer:
          "Older homes can have narrower doorways or hallways. Mention any tight turns or heritage features so the move can be planned around them.",
      },
    ],
  },
  {
    id: "western-suburbs-coast",
    name: "Western Suburbs & Coastal Strip",
    slug: "western-suburbs-coastal",
    seoTitle: "Removalists Western Adelaide & Coastal Suburbs | Cheap Adelaide Removalist",
    metaDescription:
      "Removalist enquiries for Glenelg, Henley Beach, Semaphore, West Lakes, Findon and Woodville along Adelaide's western coastal strip.",
    description:
      "Beachfront apartments, coastal homes, and port-side commercial spaces across the western metro.",
    keyHubs: ["Glenelg", "Henley Beach", "Semaphore", "West Lakes", "Findon", "Woodville"],
    serviceNotes: "Send your pickup and delivery suburbs to discuss availability for this area.",
    movingConsiderations: [
      "Glenelg and Henley Beach have a mix of beachfront apartments and holiday-let turnover, so lift and stair access is common to discuss.",
      "Semaphore's older housing stock can include narrow verandahs and front steps that affect furniture carrying paths.",
      "West Lakes and Findon include lakeside units where building access rules can apply, similar to CBD apartment moves.",
      "Summer weekends near the beachfront suburbs can mean heavier traffic and tighter parking, worth factoring into your preferred moving time.",
    ],
    suitedFor: [
      "Beachfront apartment moves in Glenelg and Henley Beach",
      "Coastal cottage and unit moves in Semaphore and Woodville",
      "Lakeside unit relocations around West Lakes and Findon",
    ],
    faqs: [
      {
        question: "Do you move beachfront apartments in Glenelg?",
        answer:
          "Yes. Apartment removals are a listed service — share lift bookings, floor level and any building access rules for a Glenelg or Henley Beach move.",
      },
      {
        question: "Is weekend parking difficult near the beachfront suburbs?",
        answer:
          "It can be busier in summer. Note the nearest available loading area to your address so the move can be planned around it.",
      },
    ],
  },
  {
    id: "southern-suburbs",
    name: "Southern Suburbs & Marion",
    slug: "southern-suburbs-marion",
    seoTitle: "Removalists Southern Adelaide Suburbs | Cheap Adelaide Removalist",
    metaDescription:
      "Removalist enquiries for Marion, Morphett Vale, Hallett Cove, Brighton, Blackwood and Noarlunga in Adelaide's south.",
    description:
      "Family residences, hilly terrains, and beachside suburbs extending toward the southern hills and coastline.",
    keyHubs: ["Marion", "Morphett Vale", "Hallett Cove", "Brighton", "Blackwood", "Noarlunga"],
    serviceNotes: "Include any slope, stairs or access details in your enquiry.",
    movingConsiderations: [
      "Blackwood and parts of Hallett Cove sit on hillier ground, so note any steps between the street and front door.",
      "Marion and Morphett Vale include large family homes; sharing room-by-room inventory helps with an accurate time estimate.",
      "Brighton's beachside streets can have similar parking considerations to the western coastal suburbs.",
      "Noarlunga moves cover a longer stretch of the south, so travel time is part of the overall booking window.",
    ],
    suitedFor: [
      "Family house removals across Marion and Morphett Vale",
      "Hillside property moves in Blackwood and Hallett Cove",
      "Beachside relocations around Brighton and Noarlunga",
    ],
    faqs: [
      {
        question: "Can you move a large family home in Marion or Morphett Vale?",
        answer:
          "Yes, house removals cover residences of any size. Share your inventory and access details so a starting estimate can be discussed.",
      },
      {
        question: "Do hilly streets in Blackwood affect the move?",
        answer:
          "They can affect truck parking and the carry distance to the front door. Mention any steps or slope so it can be planned for.",
      },
    ],
  },
  {
    id: "adelaide-hills-regional",
    name: "Adelaide Hills & Regional SA",
    slug: "adelaide-hills-regional-sa",
    seoTitle: "Removalists Adelaide Hills & Regional SA | Cheap Adelaide Removalist",
    metaDescription:
      "Removalist enquiries for Mount Barker, Stirling, Hahndorf, the Barossa Valley, Murray Bridge and Victor Harbor connected to Greater Adelaide.",
    description:
      "Country properties, acreage, and regional towns connected to Greater Adelaide by main freight highways.",
    keyHubs: ["Mount Barker", "Stirling", "Hahndorf", "Barossa Valley", "Murray Bridge", "Victor Harbor"],
    serviceNotes: "Contact us with your route and timing to discuss availability.",
    movingConsiderations: [
      "Hills townships like Stirling and Hahndorf often have narrow, winding approach roads, so note the truck access point closest to the property.",
      "Acreage properties can have long gravel driveways; mention the surface and length so the vehicle can be positioned correctly.",
      "Regional routes to Murray Bridge, the Barossa Valley or Victor Harbor add travel distance, which is discussed as part of the quote.",
      "Rural properties sometimes have limited mobile reception, so confirming a contact number and gate access in advance helps the day run smoothly.",
    ],
    suitedFor: [
      "Adelaide Hills township moves in Stirling, Hahndorf and Mount Barker",
      "Acreage and rural property relocations",
      "Regional moves to the Barossa Valley, Murray Bridge or Victor Harbor",
    ],
    faqs: [
      {
        question: "Do you travel to the Adelaide Hills for a move?",
        answer:
          "Yes, Hills townships and regional SA are listed as areas we can discuss. Share your route and preferred timing so availability can be confirmed.",
      },
      {
        question: "Can your truck get down a long gravel driveway?",
        answer:
          "It depends on the driveway width, length and surface. Describe the access so it can be assessed before the move is confirmed.",
      },
    ],
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
