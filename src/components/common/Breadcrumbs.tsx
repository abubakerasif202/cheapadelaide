import Link from "next/link";
import { Icon } from "@/components/core";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="ca-crumbs">
          <li>
            <Link href="/">
              <Icon name="home" size={14} />
              <span>Home</span>
            </Link>
          </li>
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <li key={`${crumb.href}-${idx}`}>
                <Icon name="chevron-right" size={14} className="ca-icon--sep" />
                {isLast ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href}>{crumb.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
