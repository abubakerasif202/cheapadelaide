import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbSchema } from "@/config/seo";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const schemaItems = [
    { name: "Home", item: "/" },
    ...crumbs.map((c) => ({ name: c.name, item: c.href })),
  ];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(schemaItems)),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-xs font-medium text-slate-500 py-3"
      >
        <Link
          href="/"
          className="flex items-center gap-1 transition hover:text-[#FF6A00]"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>

        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <div key={crumb.href} className="flex items-center space-x-2">
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              {isLast ? (
                <span className="font-semibold text-[#0B2D5B]" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="transition hover:text-[#FF6A00]"
                >
                  {crumb.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
