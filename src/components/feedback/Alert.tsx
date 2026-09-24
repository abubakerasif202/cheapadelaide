import { Icon } from "@/components/core";

const ICONS: Record<string, string> = { info: "info", success: "check-circle-2", warning: "alert-triangle", error: "alert-circle" };

export interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
}

export function Alert({ type = "info", title, children, onDismiss }: AlertProps) {
  const live = type === "error" ? "assertive" : "polite";
  return (
    <div className={`ca-alert ca-alert--${type}`} role={type === "error" ? "alert" : "status"} aria-live={live}>
      <Icon name={ICONS[type]} size={18} style={{ marginTop: 1 }} />
      <div className="ca-alert__body">
        {title ? <span className="ca-alert__title">{title}</span> : null}
        {children ? <span>{children}</span> : null}
      </div>
      {onDismiss ? (
        <button type="button" className="ca-alert__close" onClick={onDismiss} aria-label="Dismiss">
          <Icon name="x" size={16} />
        </button>
      ) : null}
    </div>
  );
}
