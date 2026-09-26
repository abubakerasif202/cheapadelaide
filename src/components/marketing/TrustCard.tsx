import Link from "next/link";
import { IconTile } from "@/components/core";

export interface TrustCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export function TrustCard({ icon, title, description, href }: TrustCardProps) {
  const body = (
    <>
      <IconTile name={icon} />
      <p className="ca-h4" style={{ marginTop: 16, fontWeight: 700 }}>
        {title}
      </p>
      <p className="ca-small" style={{ marginTop: 6, overflowWrap: "anywhere" }}>
        {description}
      </p>
    </>
  );
  return href ? (
    <Link href={href} className="ca-card ca-card--interactive ca-card--compact">
      {body}
    </Link>
  ) : (
    <div className="ca-card ca-card--compact">{body}</div>
  );
}
