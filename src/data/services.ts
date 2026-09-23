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
      "Reliable and affordable house removalists in Adelaide. Professional 2 and 3 mover teams with fully equipped trucks for residential moves across SA.",
    shortDescription:
      "Complete home moving services across Adelaide. Professional loading, protective blankets, and experienced local movers.",
    heroHeadline: "House Removals Across Adelaide",
    heroSubheadline:
      "From compact townhouses to full family residences, our local Adelaide removalists provide organised, careful moving services with transparent starting rates.",
    startingRate: "From $79 / 30 min ($158/hr)",
    overview: [
      "Moving house doesn't need to be stressful or overpriced. Cheap Adelaide Removalist delivers practical, organised residential relocations tailored to the size and timeline of your household.",
      "Our moving crews come equipped with heavy-duty furniture blankets, tie-down straps, upright trolleys, and hydraulic ramps to ensure your furniture and household items arrive safely at your new address.",
      "Whether you are moving within the same suburb or across Greater Adelaide, we help coordinate arrival windows, truck sizing, and mover numbers so your moving day runs on schedule.",
    ],
    whatItCovers: [
      "Full inventory loading, transport, and room-by-room unloading",
      "Protective furniture wrapping with thick moving blankets and straps",
      "Disassembly and reassembly of standard beds and tables if requested",
      "Placement of heavy furniture into designated rooms upon delivery",
      "Careful handling of whitegoods, electronics, and boxed goods",
    ],
    whoItSuits: [
      "Families relocating to a new residential home in Greater Adelaide",
      "Tenants completing an end-of-lease move on a scheduled date",
      "Homeowners downsizing, upsizing, or moving between settlements",
      "Anyone wanting a fully equipped truck with 2 or 3 experienced movers",
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
        description: "Our uniformed team arrives with a clean truck, blankets, trolleys, and toolsets.",
      },
      {
        step: "3",
        title: "Secure Loading",
        description: "Items are packed systematically, strapped securely, and protected against transit shifting.",
      },
      {
        step: "4",
        title: "Placement at New Home",
        description: "We unload items directly into your designated rooms, leaving pathways clear.",
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
          "A 2-bedroom house generally takes 3 to 5 hours, while a 3 to 4-bedroom home typically requires 5 to 8 hours depending on volume, packing readiness, and travel distance between properties.",
      },
      {
        question: "Should I book 2 movers or 3 movers for my house move?",
        answer:
          "2 movers and a truck suit 1-2 bedroom homes and townhouses. For 3+ bedroom houses or properties with stairs, 3 movers are often faster and more cost-effective overall by speeding up load and unload times.",
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
      "Specialist apartment removals in Adelaide CBD and suburbs. Lift bookings, tight corridor navigation, and basement height clearance management.",
    shortDescription:
      "Navigating lifts, stairs, tight hallways, and loading dock bookings across Adelaide CBD and metro apartment buildings.",
    heroHeadline: "Efficient Apartment Moves in Adelaide",
    heroSubheadline:
      "Experienced apartment removalists who understand lift reservations, building protocols, narrow stairwells, and multi-level logistical challenges.",
    startingRate: "From $79 / 30 min ($158/hr)",
    overview: [
      "Moving in or out of an apartment building requires specific planning that standard house moves don't encounter: lift bookings, shared foyer rules, narrow door frames, and loading dock height limits.",
      "Cheap Adelaide Removalist manages apartment relocations with precision. We verify vehicle clearances and lift times in advance to prevent delays or building compliance issues.",
      "Our movers are skilled at manoeuvring bulky lounges, mattresses, and dining sets through tight staircases and fire corridors without marking walls or causing damage.",
    ],
    whatItCovers: [
      "Coordination with your building manager's lift booking window",
      "Protective padding for building lifts and internal corridors",
      "Tight corner and stairwell navigation for bulky furniture pieces",
      "Truck parking and loading dock compliance in Adelaide CBD and metro",
      "Careful room-by-room delivery in multi-storey residential towers",
    ],
    whoItSuits: [
      "Residents moving into or out of Adelaide CBD high-rises and suburban walk-ups",
      "Apartment dwellers with strict 2-hour or 3-hour lift booking slots",
      "Tenants in properties without elevator access needing stair carry support",
      "Young professionals, couples, and students transitioning between rentals",
    ],
    processSteps: [
      {
        step: "1",
        title: "Building Review",
        description: "We check lift booking times, basement height limits, and parking conditions.",
      },
      {
        step: "2",
        title: "Prepared Loading",
        description: "Items are staged and trolley-loaded quickly to maximise elevator booking time.",
      },
      {
        step: "3",
        title: "Secure Transit",
        description: "Smooth transit through Adelaide traffic with well-secured contents.",
      },
      {
        step: "4",
        title: "Elevator Unload",
        description: "Timely unloading straight into your apartment, adhering to building rules.",
      },
    ],
    accessConsiderations: [
      "Clear height of basement parking or designated loading bays (e.g. 2.8m vs 3.5m+)",
      "Lift dimension constraints and whether protective lift covers are supplied by building management",
      "Number of flights if moving via stairs in walk-up complexes",
      "Proximity of loading bay to lift foyer and security swipe protocols",
    ],
    faqs: [
      {
        question: "Can your removal trucks fit into underground apartment carparks?",
        answer:
          "Most standard removal trucks exceed 3.0m in height and cannot enter underground basements. We check your height limits and plan loading bay or street parking logistics accordingly.",
      },
      {
        question: "What happens if our building has no elevator?",
        answer:
          "We regularly handle walk-up moves across Adelaide. Please notify us of the floor level and stair flight count so we can allocate appropriate mover numbers and equipment.",
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
      "Affordable Adelaide furniture removalists for single items, lounges, dining tables, beds, and full suites. Blanket wrapped with expert care.",
    shortDescription:
      "Safe, blanket-wrapped furniture transport for single items, bedroom suites, lounges, and delicate household pieces.",
    heroHeadline: "Careful Furniture Removals Adelaide",
    heroSubheadline:
      "From heavy solid timber suites to delicate lounge sets, our experienced movers protect every item with thick blankets, ties, and professional lifting technique.",
    startingRate: "From $79 / 30 min ($158/hr)",
    overview: [
      "Furniture is often both valuable and awkward to carry. Dropping a wardrobe or scratching a polished dining table is the last thing you want on moving day.",
      "Cheap Adelaide Removalist treats every furniture item with respect. We wrap pieces in heavy-duty moving blankets, strap them securely in the truck, and carry them using two-person balance methods.",
      "Whether you're moving a single heavy piece acquired from Marketplace, a 6-piece bedroom suite, or a complete living room, we deliver dependable local service.",
    ],
    whatItCovers: [
      "Thick furniture blankets and webbing straps for all items in transit",
      "Disassembly and reassembly of bed frames and modular lounges",
      "Upright dolly and flatbed trolley transport to minimise drag and lift fatigue",
      "Protection for polished wood, glass inserts, and fabric upholstery",
      "Accurate positioning inside your designated room at the drop-off location",
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
        title: "Blanket Protection",
        description: "Items are padded with quilted blankets and secured before lifting.",
      },
      {
        step: "3",
        title: "Locked Transit",
        description: "Furniture is strapped flush against internal truck rails to prevent movement.",
      },
      {
        step: "4",
        title: "Careful Placement",
        description: "Delivered into place, unwrapped, and positioned where you need it.",
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
          "We handle both full house loads and small furniture transfers. Our 30-minute incremental rates from $79 allow flexible scheduling for smaller moves.",
      },
      {
        question: "Can your movers take apart our bed frames and dining tables?",
        answer:
          "Yes, our team carries basic hand tools for disassembling and reassembling standard bed frames, dining table legs, and desk modules upon request.",
      },
      {
        question: "How do you protect upholstered couches during transit?",
        answer:
          "We wrap sofas and armchairs in thick removalist blankets and use stretch film when needed to keep fabric clean and shielded from scuffs.",
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
      "Reliable commercial office relocations across Adelaide. Desks, computers, filing systems, and meeting rooms moved with minimal business downtime.",
    shortDescription:
      "Keep business downtime to a minimum with structured office moving for workstations, IT equipment, files, and furniture.",
    heroHeadline: "Adelaide Office Relocations",
    heroSubheadline:
      "Organised, punctual office moves designed to get your team settled and operational quickly, with transparent hourly rates and careful asset protection.",
    startingRate: "From $99 / 30 min ($198/hr)",
    overview: [
      "When an office moves, downtime means lost productivity and revenue. Cheap Adelaide Removalist provides disciplined office relocations planned around your operational schedule.",
      "We handle executive desks, multi-person workstations, ergonomic chairs, monitor setups, archive cartons, and boardroom tables.",
      "Our team collaborates with your office manager to follow room labelling systems, ensuring boxes and desks are placed precisely where employees expect them at the new premises.",
    ],
    whatItCovers: [
      "Transport of workstations, task chairs, and boardroom furniture",
      "Careful handling of boxed office technology, monitors, and peripherals",
      "Systematic crate and carton placement according to office floor plans",
      "After-hours or weekend moves by prior arrangement to prevent business pause",
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
        title: "Dedicated Transit",
        description: "Direct transport across Adelaide between commercial sites.",
      },
      {
        step: "4",
        title: "Floorplan Placement",
        description: "Equipment and furniture are delivered to the exact office cubicle or suite.",
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
          "Yes, we operate 7 days a week from 7:00 am to 8:00 pm, making weekend moves straightforward so your staff can resume work on Monday morning.",
      },
      {
        question: "How should our employees prepare their desks?",
        answer:
          "We recommend employees pack personal effects, desktop paperwork, and labelled IT cords into numbered archive boxes before the movers arrive.",
      },
      {
        question: "Do you provide tax invoices for business accounting?",
        answer:
          "Yes, a clear, itemised tax invoice is issued upon completion of every commercial and residential booking.",
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
      "Affordable commercial moving services in Adelaide. Retail shops, storerooms, display fixtures, and light industrial transport handled professionally.",
    shortDescription:
      "Moving retail spaces, hospitality stock, shop displays, and commercial equipment throughout Greater Adelaide.",
    heroHeadline: "Adelaide Commercial Removals",
    heroSubheadline:
      "Practical transport solutions for retail fit-outs, commercial inventory, hospitality equipment, and trade businesses across South Australia.",
    startingRate: "From $99 / 30 min ($198/hr)",
    overview: [
      "Commercial moves present unique operational challenges, from heavy display cabinets and shelving units to bulk inventory and point-of-sale fixtures.",
      "Cheap Adelaide Removalist brings the heavy-duty equipment, enclosed trucks, and experienced workforce required to execute commercial relocations efficiently.",
      "We work around your trading schedule so your commercial property lease handover and opening dates stay firmly on target.",
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
        description: "Fixtures and inventory are packed or prepared for heavy-duty trolley transit.",
      },
      {
        step: "3",
        title: "Enclosed Transit",
        description: "Items are secured against internal truck tie-rails for road safety.",
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
          "Yes, we use thick furniture blankets, corner protectors, and specialised glass handling techniques. Please let us know measurements when booking.",
      },
      {
        question: "Do you operate outside standard retail trading hours?",
        answer:
          "We operate 7 days a week from 7:00 am to 8:00 pm, allowing before-hours or evening moves to suit shopping centre access regulations.",
      },
      {
        question: "Can we book a 3-man crew for heavy commercial jobs?",
        answer:
          "Yes, for commercial moves involving heavier display units and high inventory volumes, our 3 Movers + Truck option is strongly recommended.",
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
      "Professional packing and unpacking services in Adelaide. Quality boxes, bubble wrap, paper wrapping, and systematic room-by-room boxing.",
    shortDescription:
      "Save hours of preparation with our organised packing service. Quality packing paper, bubble wrap, and systematic labelling.",
    heroHeadline: "Packing & Unpacking in Adelaide",
    heroSubheadline:
      "Take the most exhausting part of moving off your to-do list. Our trained packing helpers pack your breakables, kitchenware, and rooms systematically.",
    startingRate: "From $79 / 30 min ($158/hr)",
    overview: [
      "Packing a house can easily consume dozens of hours of evening and weekend time. If items aren't packed securely, breakages happen on moving day.",
      "Cheap Adelaide Removalist offers dedicated packing and unpacking support. We bring systematic packing techniques, ensuring fragile glassware, crockery, artwork, and books are packed securely into sturdy cartons.",
      "You can book packing assistance for your entire residence, or simply for the most difficult areas like the kitchen and delicate display cabinets.",
    ],
    whatItCovers: [
      "Kitchen packing: glassware, crockery, cookware, and pantry items",
      "Protective paper wrapping and bubble protection for fragile items",
      "Systematic room-by-room box labelling with contents and destination",
      "Wardrobe and linen packing for quick re-hanging at the new address",
      "Unpacking services to benchtop or shelf level if requested",
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
        description: "We determine box counts, paper, bubble wrap, and tape requirements.",
      },
      {
        step: "2",
        title: "Fragile Wrap",
        description: "Glassware, ceramics, and ornaments are wrapped individually in butchers paper.",
      },
      {
        step: "3",
        title: "Labelled Boxing",
        description: "Boxes are clearly marked by room (e.g. 'Kitchen - Fragile Glasses').",
      },
      {
        step: "4",
        title: "Ready for Transit",
        description: "Boxes are neatly stacked and ready for fast truck loading on moving day.",
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
          "Yes! In fact, for larger 3-4 bedroom homes, we often recommend booking a packing crew the day before moving day so everything is boxed and ready for immediate loading.",
      },
      {
        question: "Do you pack fragile kitchen glassware and ceramics?",
        answer:
          "Yes, kitchenware is the most common reason clients hire our packing service. We wrap each item carefully with butcher's paper and cushion the bottom and top of boxes.",
      },
      {
        question: "Can we book just 2 or 3 hours of packing help for difficult rooms?",
        answer:
          "Yes, you can book packing support in flexible 30-minute increments to target just the kitchen, shed, or study.",
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
      "Reliable interstate removals from Adelaide to Melbourne, Sydney, Brisbane, Canberra, and regional centres. Direct and shared options available.",
    shortDescription:
      "Scheduled long-distance moves connecting Adelaide with Melbourne, Sydney, Brisbane, Canberra, and interstate hubs.",
    heroHeadline: "Interstate Removals From Adelaide",
    heroSubheadline:
      "Moving interstate requires clear schedules, dependable trucks, and experienced road transport. Get straightforward long-haul moving options from Adelaide.",
    startingRate: "Custom Quote Based on Route & Volume",
    overview: [
      "Relocating across state borders is a significant logistical undertaking. Cheap Adelaide Removalist coordinates long-distance relocations connecting Adelaide with all major Australian east-coast and regional centres.",
      "We offer both direct dedicated vehicle moves (where your belongings travel on an exclusive truck) and shared backloading options for more affordable transit.",
      "Our drivers are experienced with interstate highway travel, adhering to strict rest and safety standards so your inventory arrives on time and in good condition.",
    ],
    whatItCovers: [
      "Door-to-door transport from Adelaide to interstate destinations",
      "Direct truck allocations or shared backload volume options",
      "Inventory itemisation and secure truck tie-down for long highway transit",
      "Protective heavy-duty blanketing on all furniture pieces",
      "Scheduled pickup dates and agreed delivery windows",
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
        description: "You receive a clear itinerary and rate based on your volume and date requirements.",
      },
      {
        step: "3",
        title: "Adelaide Loading",
        description: "Items are packed tightly for interstate highway transit and strapped to internal rails.",
      },
      {
        step: "4",
        title: "Interstate Delivery",
        description: "Arrival at your interstate destination with room-by-room unloading.",
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
          "Our most frequent interstate routes include Adelaide to Melbourne, Adelaide to Sydney, Adelaide to Brisbane, Adelaide to Canberra, and regional Victoria and NSW routes.",
      },
      {
        question: "How long does interstate delivery usually take?",
        answer:
          "Adelaide to Melbourne typically takes 1 to 2 days for direct moves. Adelaide to Sydney usually takes 2 to 3 days, and Brisbane 3 to 4 days, depending on route conditions and scheduling.",
      },
      {
        question: "What is the difference between direct interstate and backloading?",
        answer:
          "A direct move reserves the whole truck exclusively for your items on your exact dates. Backloading utilizes remaining space on a truck already travelling the route, which costs less but requires some schedule flexibility.",
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
      "Cost-effective backloading removals to and from Adelaide. Fill spare truck space on scheduled runs for substantial interstate savings.",
    shortDescription:
      "Save on interstate and regional removals by booking unused space on scheduled trucks returning to or departing Adelaide.",
    heroHeadline: "Affordable Backloading Adelaide",
    heroSubheadline:
      "Utilise available truck space on scheduled runs to or from Adelaide. The smart, affordable option for flexible movers looking to save money.",
    startingRate: "Discounted Shared Space Rates",
    overview: [
      "Backloading is one of the best ways to keep interstate moving costs affordable. Instead of paying for a dedicated truck, you pay only for the exact cubic space your goods occupy on a vehicle already travelling your route.",
      "Cheap Adelaide Removalist manages backload consignments with the same high standards of care as full dedicated moves: furniture is blanket-wrapped, inventory is tagged, and space is secured.",
      "If you have a degree of date flexibility on pickup or delivery, backloading provides substantial cost savings without compromising on the safety of your belongings.",
    ],
    whatItCovers: [
      "Cubic space allocation on scheduled interstate and regional trucks",
      "Full furniture blanket wrapping and securing by experienced movers",
      "Tagged and itemised inventory tracking to keep your items separate from other loads",
      "Significant cost reductions compared to hiring a private dedicated vehicle",
      "Available for single pieces, partial loads, or 1-2 room consolidations",
    ],
    whoItSuits: [
      "Budget-conscious movers with some flexibility around delivery dates",
      "People moving a few rooms of furniture or partial household loads interstate",
      "Individuals sending items to family members in Melbourne, Sydney, or regional SA",
      "Anyone who wants professional removalist handling at wholesale transport rates",
    ],
    processSteps: [
      {
        step: "1",
        title: "Space Booking",
        description: "Tell us what items you have and your approximate date window.",
      },
      {
        step: "2",
        title: "Route Matching",
        description: "We match your cargo with an upcoming truck heading along your route.",
      },
      {
        step: "3",
        title: "Inventory Loading",
        description: "Items are blanket-wrapped, labelled, and packed securely into allocated space.",
      },
      {
        step: "4",
        title: "En-Route Delivery",
        description: "Delivered to your destination within the scheduled delivery window.",
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
        question: "How does backloading save so much money?",
        answer:
          "Removal trucks frequently return from interstate runs empty or half-full. Backloading monetises this empty space, allowing us to pass major savings on to customers.",
      },
      {
        question: "Will my furniture get mixed up with other people's belongings?",
        answer:
          "No. All items are separated, itemised, and secured within their own designated section of the truck. Different consignments are never jumbled together.",
      },
      {
        question: "Can I backload just a couch and a bed?",
        answer:
          "Yes! Backloading is particularly ideal for small partial loads, single furniture pieces, or student moves where booking a private truck is uneconomical.",
      },
    ],
    relatedServices: ["interstate-removals", "furniture-removals", "house-removals"],
  },
];
