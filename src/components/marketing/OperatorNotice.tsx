import { business } from "@/config/business";
import { IconTile, Button } from "@/components/core";

export interface OperatorNoticeProps {
  title?: string;
  text?: string;
  action?: { label: string; href: string } | null;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export function OperatorNotice({
  title = "Operated by a Local Removals Business",
  text = business.operatorNotice,
  action = { label: "Learn More About Us", href: "/about" },
  headingLevel = 3,
}: OperatorNoticeProps) {
  const Heading = `h${Math.min(6, Math.max(2, headingLevel))}` as React.ElementType;
  return (
    <div className="ca-notice">
      <div className="ca-notice__main">
        <IconTile name="shield-check" tone="navy" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Heading className="ca-h4" style={{ fontSize: 16 }}>
            {title}
          </Heading>
          <p className="ca-small" style={{ color: "var(--text-muted)" }}>
            {text}
          </p>
        </div>
      </div>
      {action ? (
        <Button variant="outline" size="sm" href={action.href} trailingIcon="arrow-right" className="shrink-0">
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}
