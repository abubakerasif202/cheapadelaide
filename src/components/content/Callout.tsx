import { Icon } from "@/components/core";

const ICONS: Record<string, string> = { tip: "check-circle-2", warning: "alert-triangle", info: "info", danger: "alert-circle" };

export interface CalloutProps {
  type?: "tip" | "warning" | "info" | "danger";
  title: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  return (
    <div className={`ca-callout ca-callout--${type}`} role={type === "warning" || type === "danger" ? "note" : undefined}>
      <div className="ca-callout__title">
        <Icon name={ICONS[type]} size={16} />
        {title}
      </div>
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  );
}
