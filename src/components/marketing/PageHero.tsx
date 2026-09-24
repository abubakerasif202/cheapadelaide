import { Badge } from "@/components/core";
import { Breadcrumbs, type Crumb } from "@/components/common/Breadcrumbs";

export interface PageHeroProps {
  crumbs?: Crumb[];
  eyebrow?: string;
  eyebrowIcon?: string;
  eyebrowStyle?: "rule" | "pill";
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  meta?: React.ReactNode;
}

export function PageHero({
  crumbs,
  eyebrow,
  eyebrowIcon,
  eyebrowStyle = "rule",
  title,
  description,
  actions,
  aside,
  meta,
}: PageHeroProps) {
  return (
    <section className="ca-pagehero">
      <div className="ca-container">
        {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}
        <div className={"ca-pagehero__grid" + (aside ? " ca-pagehero__grid--aside" : "")}>
          <div className="ca-pagehero__copy">
            {meta ? (
              meta
            ) : eyebrow ? (
              eyebrowStyle === "pill" ? (
                <Badge icon={eyebrowIcon}>{eyebrow}</Badge>
              ) : (
                <span className="ca-eyebrow ca-eyebrow--rule">{eyebrow}</span>
              )
            ) : null}
            <h1 className="ca-h1">{title}</h1>
            {description ? (
              <p className="ca-lead" style={{ maxWidth: 680 }}>
                {description}
              </p>
            ) : null}
            {actions ? <div className="ca-pagehero__actions">{actions}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
