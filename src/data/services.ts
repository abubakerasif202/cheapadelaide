export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  shortDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  overview: string[];
  whatItCovers: string[];
  whoItSuits: string[];
  processSteps: { step: string; title: string; description: string }[];
  accessConsiderations: string[];
  startingRate: string;
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
}

export const services: ServiceItem[] = [
  {
    id: "house-removals",
    slug: "house-removals",
    title: "House Removals",
    seoTitle: "House Removalists Adelaide | Cheap Adelaide Removalist",
    metaDescription:
      "House removal services in Adelaide with a choice of 2 Movers + Truck or 3 Movers + Truck starting rates.",
    shortDescription:
      "House moving services across Adelaide. Share your inventory, access and route details to discuss a quote.",
    heroHeadline: "House Removals Across Adelaide",
    heroSubheadline:
      "From compact townhouses to full family residences, our local Adelaide removalists provide organised, careful moving services with transparent starting rates.",
    startingRate: "From $79 / 30 min ($158/hr)",
    overview: [
      "Moving house doesn't need to be stressful or overpriced. Cheap Adelaide Removalist delivers practical, organised residential relocations tailored to the size and timeline of your household.",
      "Include your furniture, boxes, appliances and other larger items when describing the move so its scope can be discussed.",
      "For moves around Adelaide, share your pickup and delivery suburbs, preferred date, team size and any access requirements.",
    ],
    whatItCovers: [
      "Full inventory loading, transport, and room-by-room unloading",
      "Loading, transport and unloading of the items discussed for your move",
      "Household furniture, appliances and boxed items as outlined in your inventory",
      "Pickup and delivery locations and access details supplied with your enquiry",
    ],
    whoItSuits: [
      "Families relocating to a new residential home in Greater Adelaide",
      "Tenants completing an end-of-lease move on a scheduled date",
      "Homeowners downsizing, upsizing, or moving between settlements",
      "Anyone comparing a 2-mover or 3-mover team with a truck",
    ],
    processSteps: [
      {
        step: "1",
        title: "Quote & Assessment",
        description: "Submit your inventory and access details to receive a clear starting estimate.",
      },
      {
        step: "2",
        title: "Moving Day Arrival",
        description: "Confirm the agreed details for the move and its access requirements.",
      },
      {
        step: "3",
        title: "Secure Loading",
        description: "The movers load the items included in the agreed move scope.",
      },
      {
        step: "4",
        title: "Placement at New Home",
        description: "The movers unload at the delivery address as discussed.",
      },
    ],
    accessConsiderations: [
      "Driveway width and clearance for a medium or large removal truck",
      "Distance from the front door to the truck parking spot",
      "Any steep gradients, narrow gates, or exterior stairs",
      "Council parking permits or restrictions along your street if applicable",
    ],
    faqs: [
      {
        question: "How long does a typical Adelaide house move take?",
        answer:
          "Move duration depends on inventory, access, travel and any additional services. Share these details when requesting a quote.",
      },
      {
        question: "Should I book 2 movers or 3 movers for my house move?",
        answer:
          "Starting rates are $79 / 30 min for 2 Movers + Truck and $99 / 30 min for 3 Movers + Truck. The suitable option depends on your move details.",
      },
      {
        question: "Do I need to empty chest of drawers and wardrobes?",
        answer:
          "Yes, we recommend removing clothing and heavier items from drawers to prevent structural strain on the furniture during lifting and transit.",
      },
    ],
    relatedServices: ["apartment-removals", "furniture-removals", "packing-unpacking"],
  },
  {
    id: "apartment-removals",
    slug: "apartment-removals",
    title: "Apartment Removals",
    seoTitle: "Apartment Removalists Adelaide | Cheap Adelaide Removalist",
    metaDescription:
      "Apartment removal services in Adelaide. Share lift, stair, parking and loading-area details when requesting a moving quote.",
    shortDescription:
      "Navigating lifts, stairs, tight hallways, and loading dock bookings across Adelaide CBD and metro apartment buildings.",
    heroHeadline: "Efficient Apartment Moves in Adelaide",
    heroSubheadline:
      "Apartment moves can involve lift reservations, building rules, narrow stairwells and other access requirements. Share these details when requesting a quote.",
    startingRate: "From $79 / 30 min ($158/hr)",
    overview: [
      "Moving in or out of an apartment building requires specific planning that standard house moves don't encounter: lift bookings, shared foyer rules, narrow door frames, and loading dock height limits.",
      "When requesting an apartment move, include lift bookings, floor level, parking, loading bay rules and other building requirements.",
      "List larger furniture and any tight corridors, stairs or lift restrictions so access can be discussed before the move.",
    ],
    whatItCovers: [
      "Lift booking and building access requirements supplied by the customer",
      "Floor level, stair or lift information at pickup and delivery",
      "Parking, loading bay and vehicle-height restrictions",
      "Access routes for larger furniture and household items",
    ],
    whoItSuits: [
      "Residents moving into or out of Adelaide CBD high-rises and suburban walk-ups",
      "Apartment residents with building lift or loading-area booking requirements",
      "Tenants in properties without elevator access needing stair carry support",
      "Young professionals, couples, and students transitioning between rentals",
    ],
    processSteps: [
      {
        step: "1",
        title: "Share Access Details",
        description: "Tell us about lift bookings, basement limits, stairs and parking.",
      },
      {
        step: "2",
        title: "Prepared Loading",
        description: "Plan the move around the access conditions and booking details you provide.",
      },
      {
        step: "3",
        title: "Secure Transit",
        description: "The agreed items are transported between the two addresses.",
      },
      {
        step: "4",
        title: "Elevator Unload",
        description: "Unloading arrangements are discussed as part of the move scope.",
      },
    ],
    accessConsiderations: [
      "Any stated height restrictions for basement parking or designated loading bays",
      "Lift dimension constraints and whether protective lift covers are supplied by building management",
      "Number of flights if moving via stairs in walk-up complexes",
      "Proximity of loading bay to lift foyer and security swipe protocols",
    ],
    faqs: [
      {
        question: "Can your removal trucks fit into underground apartment carparks?",
        answer:
          "Vehicle access depends on height limits and site conditions. Include any basement or loading-bay restrictions in your enquiry.",
      },
      {
        question: "What happens if our building has no elevator?",
        answer:
          "Include the floor level and number of stair flights so the access requirements can be discussed.",
      },
      {
        question: "Do you help with lift curtain setup?",
        answer:
          "Most building managers require residents to arrange lift protective curtains and keys before arrival. We work within whatever setup your building rules prescribe.",
      },
    ],
    relatedServices: ["house-removals", "furniture-removals", "packing-unpacking"],
  },
  {
    id: "furniture-removals",
    slug: "furniture-removals",
    title: "Furniture Removals",
    seoTitle: "Furniture Removalists Adelaide | Cheap Adelaide Removalist",
    metaDescription:
      "Furniture removals in Adelaide for single items, lounges, dining tables, beds, and household furniture.",
    shortDescription:
      "Furniture transport for single items, bedroom suites, lounges, and other household pieces.",
    heroHeadline: "Careful Furniture Removals Adelaide",
    heroSubheadline:
      "Describe the size, weight, quantity and access needs of the furniture when requesting a quote.",
    startingRate: "From $79 / 30 min ($158/hr)",
    overview: [
      "Furniture is often both valuable and awkward to carry. Dropping a wardrobe or scratching a polished dining table is the last thing you want on moving day.",
      "Share pickup and delivery suburbs, item details and access conditions so the scope can be discussed.",
      "Include the number, size and approximate weight of furniture items in your enquiry.",
    ],
    whatItCovers: [
      "Pickup and delivery of the furniture items included in your agreed move scope",
      "Item dimensions, weight and disassembly requirements to be discussed in advance",
      "Property access information for both locations",
    ],
    whoItSuits: [
      "People buying or selling secondhand furniture across Adelaide",
      "Residents relocating specific high-value furniture sets",
      "Downsizers moving sentimental or antique pieces to family",
      "Anyone unable to lift heavy items due to injury, age, or physical constraint",
    ],
    processSteps: [
      {
        step: "1",
        title: "Item Verification",
        description: "You confirm dimensions, weight, and any disassembly requirements.",
      },
      {
        step: "2",
        title: "Confirm Requirements",
        description: "Discuss item handling and any special requirements before the move.",
      },
      {
        step: "3",
        title: "Transport",
        description: "The agreed items are transported between the two addresses.",
      },
      {
        step: "4",
        title: "Careful Placement",
        description: "Discuss delivery and placement requirements when confirming your move.",
      },
    ],
    accessConsiderations: [
      "Doorway widths and stairwell turning points for oversized lounges or king beds",
      "Fragile items such as glass-top dining tables or display cabinets",
      "Floor protection needs for delicate timber or freshly laid carpet",
      "Level pathways between entrance doors and the removal vehicle",
    ],
    faqs: [
      {
        question: "Do you move single furniture items or only full houses?",
        answer:
          "Furniture removals are listed as a service. Include the items and locations in your request; starting rates are shown on the pricing page.",
      },
      {
        question: "Can your movers take apart our bed frames and dining tables?",
        answer:
          "Include any disassembly requirements in your enquiry so they can be discussed before the move.",
      },
      {
        question: "How do you protect upholstered couches during transit?",
        answer:
          "Tell us about upholstery and any specific handling requirements when describing your items.",
      },
    ],
    relatedServices: ["house-removals", "apartment-removals", "packing-unpacking"],
  },
  {
    id: "office-removals",
    slug: "office-removals",
    title: "Office Removals",
    seoTitle: "Office Removalists Adelaide | Cheap Adelaide Removalist",
    metaDescription:
      "Office removal services in Adelaide for desks, workstations, equipment, files and meeting-room furniture.",
    shortDescription:
      "Office moves scoped around your inventory, access requirements and preferred timing.",
    heroHeadline: "Adelaide Office Relocations",
    heroSubheadline:
      "Office moves for workstations, files, meeting tables, and other office furniture.",
    startingRate: "From $99 / 30 min ($198/hr)",
    overview: [
      "Office moves can involve equipment, files, furniture, access restrictions and timing requirements. Share these details so the move scope can be discussed.",
      "Office moves can include desks, workstations, chairs, equipment, cartons, and meeting room furniture described in the enquiry.",
      "Share your item list, pickup and delivery locations, building access conditions, and any placement requirements.",
    ],
    whatItCovers: [
      "Transport of workstations, task chairs, and boardroom furniture",
      "Careful handling of boxed office technology, monitors, and peripherals",
      "Systematic crate and carton placement according to office floor plans",
      "Preferred dates and timing to be discussed when requesting a quote",
      "Disassembly of modular desking systems and conference furniture",
    ],
    whoItSuits: [
      "Small-to-medium businesses moving to new commercial offices in Adelaide",
      "Professional practices (legal, accounting, medical consulting) changing locations",
      "Branch offices upgrading or downsizing existing leased floor space",
      "Companies reconfiguring office floors or relocating between business parks",
    ],
    processSteps: [
      {
        step: "1",
        title: "Inventory & Planning",
        description: "We review desk counts, equipment types, and building access constraints.",
      },
      {
        step: "2",
        title: "Labelled Loading",
        description: "Workstations and team boxes are loaded systematically according to designated zones.",
      },
      {
        step: "3",
        title: "Transport",
        description: "The agreed items are transported between the commercial addresses.",
      },
      {
        step: "4",
        title: "Floorplan Placement",
        description: "Discuss delivery and placement requirements when confirming your move.",
      },
    ],
    accessConsiderations: [
      "Commercial building loading dock hours and dock master permissions",
      "Goods lift reservation windows during business hours vs weekends",
      "Door security access cards and clearance for removal personnel",
      "Protection of commercial carpet tiles and glass foyer partitions",
    ],
    faqs: [
      {
        question: "Can our office move take place on a weekend?",
        answer:
          "Our listed contact hours are 7:00 am–8:00 pm daily. Include your preferred moving date and time when making an enquiry.",
      },
      {
        question: "How should our employees prepare their desks?",
        answer:
          "We recommend employees pack personal effects, desktop paperwork, and labelled IT cords into numbered archive boxes before the movers arrive.",
      },
      {
        question: "Do you provide tax invoices for business accounting?",
        answer:
          "Contact us to discuss documentation for your move.",
      },
    ],
    relatedServices: ["commercial-removals", "packing-unpacking", "furniture-removals"],
  },
  {
    id: "commercial-removals",
    slug: "commercial-removals",
    title: "Commercial Removals",
    seoTitle: "Commercial Removalists Adelaide | Cheap Adelaide Removalist",
    metaDescription:
      "Commercial removal services in Adelaide for retail displays, stock, shelving and workplace equipment included in the agreed move scope.",
    shortDescription:
      "Moving retail spaces, hospitality stock, shop displays, and commercial equipment throughout Greater Adelaide.",
    heroHeadline: "Adelaide Commercial Removals",
    heroSubheadline:
      "Practical transport solutions for retail fit-outs, commercial inventory, hospitality equipment, and trade businesses across South Australia.",
    startingRate: "From $99 / 30 min ($198/hr)",
    overview: [
      "Commercial moves present unique operational challenges, from heavy display cabinets and shelving units to bulk inventory and point-of-sale fixtures.",
      "Commercial moves can include retail displays, shelving, stock, hospitality furniture and other items described in your enquiry.",
      "Include your preferred timing and any site access or trading-hour requirements when requesting a quote.",
    ],
    whatItCovers: [
      "Transport of shop displays, counter fixtures, and retail shelving",
      "Carton transport for inventory batches, apparel, and stock transfers",
      "Relocation of commercial kitchen non-plumbed fixtures and dining furniture",
      "Staged logistics for multi-phase store or facility transitions",
      "Careful securing of fragile retail displays and point-of-sale assets",
    ],
    whoItSuits: [
      "Retail shops opening or shifting premises in shopping strips or centres",
      "Cafes, restaurants, and hospitality venues moving dining and dry stock",
      "Showrooms, design studios, and training facilities relocating spaces",
      "Commercial enterprises moving stock between storage and store locations",
    ],
    processSteps: [
      {
        step: "1",
        title: "Scope Assessment",
        description: "We determine the cubic volume, heavy fixture list, and schedule parameters.",
      },
      {
        step: "2",
        title: "Site Preparation",
        description: "Discuss how fixtures and inventory will be prepared for transport.",
      },
      {
        step: "3",
        title: "Enclosed Transit",
        description: "The agreed items are transported between the commercial addresses.",
      },
      {
        step: "4",
        title: "Positioning & Setup",
        description: "Items are unloaded to the new commercial premises ready for fit-out or trade.",
      },
    ],
    accessConsiderations: [
      "Shopping centre service tunnels, height limits, and after-hours delivery rules",
      "Kerbside loading zones and parking bay reservations with local councils",
      "Heavy load paths: ramps, thresholds, and doorway clearances",
      "Power disconnection of electronic units prior to removalist arrival",
    ],
    faqs: [
      {
        question: "Can you move heavy display cases and glass fixtures?",
        answer:
          "Include dimensions, weight and access details for glass fixtures or other bulky items in your enquiry.",
      },
      {
        question: "Do you operate outside standard retail trading hours?",
        answer:
          "Our listed contact hours are 7:00 am–8:00 pm daily. Include any site access hours in your enquiry.",
      },
      {
        question: "Can we book a 3-man crew for heavy commercial jobs?",
        answer:
          "Both 2 Movers + Truck and 3 Movers + Truck starting rates are listed. Share your inventory and access details to discuss team size.",
      },
    ],
    relatedServices: ["office-removals", "furniture-removals", "interstate-removals"],
  },
  {
    id: "packing-unpacking",
    slug: "packing-unpacking",
    title: "Packing & Unpacking",
    seoTitle: "Packing & Unpacking Services Adelaide | Cheap Adelaide Removalist",
    metaDescription:
      "Packing and unpacking services in Adelaide. Share the items, rooms and packing materials required when requesting a quote.",
    shortDescription:
      "Packing and unpacking assistance for household moves in Adelaide.",
    heroHeadline: "Packing & Unpacking in Adelaide",
    heroSubheadline:
      "Include the rooms and items you would like help with when requesting a packing or unpacking quote.",
    startingRate: "From $79 / 30 min ($158/hr)",
    overview: [
      "Packing scope varies from a few rooms or items to a larger household. Share what you would like packed or unpacked so the requirements can be discussed.",
      "List fragile items and any material requirements in your enquiry. Confirm what supplies and services are available before booking.",
      "Include the preferred rooms or areas in your request to discuss whether the service can be arranged.",
    ],
    whatItCovers: [
      "Packing or unpacking items and rooms discussed before booking",
      "Fragile or bulky items identified in your inventory",
      "Any packing materials or other requirements to be confirmed in advance",
    ],
    whoItSuits: [
      "Busy professionals and working parents who lack time to pack a home",
      "Seniors who want physical relief from repetitive bending and lifting",
      "Homeowners facing tight settlement deadlines with lots of loose items",
      "Anyone who wants peace of mind that breakables are professionally wrapped",
    ],
    processSteps: [
      {
        step: "1",
        title: "Materials Check",
        description: "Discuss the rooms, items and supplies relevant to your request.",
      },
      {
        step: "2",
        title: "Fragile Wrap",
        description: "Confirm the handling requirements for fragile items.",
      },
      {
        step: "3",
        title: "Labelled Boxing",
        description: "Agree how packed items will be identified and organised.",
      },
      {
        step: "4",
        title: "Ready for Transit",
        description: "Discuss whether packing will be arranged alongside a removal booking.",
      },
    ],
    accessConsiderations: [
      "Clear kitchen benchtops and table surfaces to facilitate paper wrapping",
      "Separation of essential items you need on moving night (medication, toiletries)",
      "Timing: packing can be done the day prior or the morning of the move",
      "Disposal or recycling of boxes after unpacking is completed",
    ],
    faqs: [
      {
        question: "Can packing be done the day before our move?",
        answer:
          "Include your preferred date and timing in the quote request so availability can be discussed.",
      },
      {
        question: "Do you pack fragile kitchen glassware and ceramics?",
        answer:
          "Include the kitchen items and any material requirements in your enquiry so the packing scope can be discussed.",
      },
      {
        question: "Can we book just 2 or 3 hours of packing help for difficult rooms?",
        answer:
          "Include the rooms or items and preferred duration in your request to discuss availability.",
      },
    ],
    relatedServices: ["house-removals", "apartment-removals", "furniture-removals"],
  },
  {
    id: "interstate-removals",
    slug: "interstate-removals",
    title: "Interstate Removals",
    seoTitle: "Interstate Removalists Adelaide | Cheap Adelaide Removalist",
    metaDescription:
      "Interstate removal enquiries from Adelaide. Share your destination, inventory and dates to confirm route availability and moving options.",
    shortDescription:
      "Interstate moving enquiries for Adelaide and destinations including Melbourne, Sydney, Brisbane and Canberra.",
    heroHeadline: "Interstate Removals From Adelaide",
    heroSubheadline:
      "Share your pickup and destination addresses, inventory, preferred date and any access details to discuss an interstate move.",
    startingRate: "Custom Quote Based on Route & Volume",
    overview: [
      "Interstate moves depend on route, inventory, dates and access. Include those details in your enquiry to discuss available arrangements.",
      "Direct removals and backloading are listed as options. Ask which option may be available for your route and timing.",
      "Delivery timing and arrangements should be confirmed when a quote is prepared.",
    ],
    whatItCovers: [
      "Pickup and delivery between the addresses included in the agreed scope",
      "Direct removal or backloading enquiries, subject to route availability",
      "Inventory, access, preferred timing and delivery requirements to be confirmed",
    ],
    whoItSuits: [
      "Families moving interstate for career opportunities or lifestyle changes",
      "People relocating to Melbourne, Sydney, Brisbane, or regional Victoria/NSW",
      "Students moving to eastern state universities with room loads",
      "Anyone seeking transparent communication on interstate transit times",
    ],
    processSteps: [
      {
        step: "1",
        title: "Route & Volume Review",
        description: "We calculate cubic metres and determine pickup and delivery postcodes.",
      },
      {
        step: "2",
        title: "Fixed Scope Estimate",
        description: "Discuss available arrangements and pricing based on your move details.",
      },
      {
        step: "3",
        title: "Adelaide Loading",
        description: "The agreed items are loaded for transport to the destination.",
      },
      {
        step: "4",
        title: "Interstate Delivery",
        description: "Delivery arrangements are confirmed as part of the quote.",
      },
    ],
    accessConsiderations: [
      "Long-distance truck access at both the Adelaide pickup and interstate delivery address",
      "Delivery window flexibility if choosing shared space vs dedicated vehicle",
      "Any ferry, toll, or permit requirements on the specific interstate route",
      "Arranging clear property access keys if you are travelling separately to the delivery address",
    ],
    faqs: [
      {
        question: "Which interstate routes do you cover from Adelaide?",
        answer:
          "Interstate routes listed include Melbourne, Sydney, Brisbane and Canberra. Contact us with your origin and destination to discuss availability.",
      },
      {
        question: "How long does interstate delivery usually take?",
        answer:
          "Delivery timing depends on the route and arrangements. Confirm an estimated timeframe when discussing your quote.",
      },
      {
        question: "What is the difference between direct interstate and backloading?",
        answer:
          "Ask us to explain the available options for your route, including whether backloading is available and what timing flexibility it needs.",
      },
    ],
    relatedServices: ["backloading", "house-removals", "packing-unpacking"],
  },
  {
    id: "backloading",
    slug: "backloading",
    title: "Backloading",
    seoTitle: "Backloading Removals Adelaide | Cheap Adelaide Removalist",
    metaDescription:
      "Backloading enquiries for moves to or from Adelaide. Availability depends on your route and timing.",
    shortDescription:
      "Ask about backloading options for your route and preferred dates.",
    heroHeadline: "Affordable Backloading Adelaide",
    heroSubheadline:
      "Backloading may be an option for some routes. Include your inventory and timing flexibility in your enquiry.",
    startingRate: "Ask for route-specific pricing",
    overview: [
      "Backloading availability depends on the route, inventory and timing. Share these details to discuss whether an option is available.",
      "Ask how your items, pickup and delivery arrangements would be handled before confirming a booking.",
      "If your dates are flexible, mention the date range in your enquiry. Pricing and availability are confirmed for each move.",
    ],
    whatItCovers: [
      "Route and timing availability to be confirmed before booking",
      "Inventory and loading requirements for the agreed move scope",
      "Pickup and delivery arrangements to be confirmed in advance",
    ],
    whoItSuits: [
      "Budget-conscious movers with some flexibility around delivery dates",
      "People moving a few rooms of furniture or partial household loads interstate",
      "Individuals sending items to family members in Melbourne, Sydney, or regional SA",
      "People comparing backloading with other move options",
    ],
    processSteps: [
      {
        step: "1",
        title: "Space Booking",
        description: "Tell us what items you have and your approximate date window.",
      },
      {
        step: "2",
        title: "Check Availability",
        description: "Discuss whether backloading is available for the route and date range.",
      },
      {
        step: "3",
        title: "Inventory Loading",
        description: "Confirm the arrangements for your items before the move.",
      },
      {
        step: "4",
        title: "En-Route Delivery",
        description: "Confirm delivery timing and arrangements when accepting a quote.",
      },
    ],
    accessConsiderations: [
      "Flexibility of 1 to 3 days around pickup and drop-off windows",
      "Accurate inventory listing so the allocated cubic space matches your load exactly",
      "Clear communication of contact numbers for receiving goods at destination",
      "Truck access requirements along highway corridors and residential streets",
    ],
    faqs: [
      {
        question: "How does backloading work?",
        answer:
          "Backloading uses available space on a vehicle travelling a compatible route. Ask whether it is available and request the price for your move.",
      },
      {
        question: "Will my furniture get mixed up with other people's belongings?",
        answer:
          "Ask how items are separated and handled for any backloading option offered for your route.",
      },
      {
        question: "Can I backload just a couch and a bed?",
        answer:
          "Include the items, route and timing in your request so we can discuss whether backloading is an option.",
      },
    ],
    relatedServices: ["interstate-removals", "furniture-removals", "house-removals"],
  },
];
