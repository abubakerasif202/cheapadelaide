export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

export const navigation = {
  mainNav: [
    {
      title: "Services",
      href: "/services",
      children: [
        {
          title: "House Removals",
          href: "/services/house-removals",
          description: "Full residential relocations across metropolitan Adelaide and regional SA.",
        },
        {
          title: "Apartment Removals",
          href: "/services/apartment-removals",
          description: "Expert handling of lifts, stairs, tight corridors, and basement parking.",
        },
        {
          title: "Furniture Removals",
          href: "/services/furniture-removals",
          description: "Careful blanket-wrapped transport for single pieces, sets, and full suites.",
        },
        {
          title: "Office Removals",
          href: "/services/office-removals",
          description: "Efficient workplace moves to minimise downtime for Adelaide businesses.",
        },
        {
          title: "Commercial Removals",
          href: "/services/commercial-removals",
          description: "Retail, shop, and small industrial transport across Greater Adelaide.",
        },
        {
          title: "Packing & Unpacking",
          href: "/services/packing-unpacking",
          description: "Systematic packing with protective materials for stress-free moves.",
        },
        {
          title: "Interstate Removals",
          href: "/services/interstate-removals",
          description: "Ask about Adelaide moves to interstate destinations.",
        },
        {
          title: "Backloading",
          href: "/services/backloading",
          description: "Ask about shared space for regional or interstate routes.",
        },
      ],
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Service Areas",
      href: "/service-areas",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ] as NavItem[],

  legalNav: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
} as const;
