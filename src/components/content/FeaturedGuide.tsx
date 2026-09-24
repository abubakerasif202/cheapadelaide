import Link from "next/link";
import { Icon, Badge, Button } from "@/components/core";

export interface FeaturedGuideProps {
  label?: string;
  title: string;
  summary: string;
  readTime?: string;
  updated?: string;
  rateNote?: string;
  href?: string;
  artSrc?: string;
}

export function FeaturedGuide({
  label = "Featured Master Guide",
  title,
  summary,
  readTime,
  updated = "Updated Sept 2026",
  rateNote = "2 Movers from $79 / 30 min",
  href = "#",
  artSrc,
}: FeaturedGuideProps) {
  return (
    <article className="ca-feature ca-on-dark">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {artSrc ? <img className="ca-feature__art" src={artSrc} alt="" /> : null}
      <div className="ca-feature__copy">
        <Badge variant="solid" icon="sparkles">
          {label}
        </Badge>
        <h2 className="ca-h1" style={{ fontSize: "clamp(1.5rem,1.2rem + 1.6vw,2.25rem)" }}>
          <Link href={href} style={{ color: "inherit" }}>
            {title}
          </Link>
        </h2>
        <p className="ca-lead" style={{ color: "var(--slate-200)" }}>
          {summary}
        </p>
        <div className="ca-feature__meta">
          {readTime ? (
            <span>
              <Icon name="clock" size={16} />
              {readTime}
            </span>
          ) : null}
          {updated ? (
            <span>
              <Icon name="calendar" size={16} />
              {updated}
            </span>
          ) : null}
          {rateNote ? (
            <Badge variant="inverse" quiet style={{ fontFamily: "var(--font-mono)", color: "#fff", fontWeight: 500 }}>
              {rateNote}
            </Badge>
          ) : null}
        </div>
        <Button href={href} trailingIcon="arrow-right" className="mt-2">
          Read Complete Guide
        </Button>
      </div>
    </article>
  );
}
