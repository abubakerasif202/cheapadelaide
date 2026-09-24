import { Badge } from "./Badge";
import { Button } from "./Button";

export interface SectionHeaderAction {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: string;
  eyebrowStyle?: "rule" | "pill";
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: SectionHeaderAction | React.ReactNode;
  align?: "split" | "center";
  as?: "h1" | "h2" | "h3";
  flush?: boolean;
  divider?: boolean;
  className?: string;
}

function isSectionHeaderAction(action: SectionHeaderProps["action"]): action is SectionHeaderAction {
  return !!action && typeof action === "object" && "label" in action;
}

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  eyebrowStyle = "rule",
  title,
  description,
  action,
  align = "split",
  as = "h2",
  flush = false,
  divider = true,
  className = "",
}: SectionHeaderProps) {
  const Heading = as;
  const cls = [
    "ca-sechead",
    align === "center" ? "ca-sechead--center" : "ca-sechead--split",
    flush && "ca-sechead--flush",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const style = divider ? undefined : { borderBottom: 0, paddingBottom: 0 };

  return (
    <header className={cls} style={style}>
      <div className="ca-sechead__text">
        {eyebrow ? (
          eyebrowStyle === "pill" ? (
            <Badge icon={eyebrowIcon}>{eyebrow}</Badge>
          ) : (
            <span className="ca-eyebrow ca-eyebrow--rule">{eyebrow}</span>
          )
        ) : null}
        <Heading className="ca-h2">{title}</Heading>
        {description ? <p className="ca-body">{description}</p> : null}
      </div>
      {isSectionHeaderAction(action) ? (
        action.href ? (
          <Button variant="link" href={action.href} trailingIcon="arrow-right">
            {action.label}
          </Button>
        ) : (
          <Button variant="link" onClick={action.onClick} trailingIcon="arrow-right">
            {action.label}
          </Button>
        )
      ) : (
        action
      )}
    </header>
  );
}
