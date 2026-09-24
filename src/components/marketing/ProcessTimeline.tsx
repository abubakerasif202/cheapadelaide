import { Icon, IconTile } from "@/components/core";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon?: string;
}

const DEFAULT_STEPS: ProcessStep[] = [
  { step: "01", title: "Request a Fast Quote", description: "Submit your move details online or call our dispatch desk directly to get started.", icon: "file-text" },
  { step: "02", title: "Scope Inventory & Access", description: "Share your suburb locations, furniture list, and access notes (lifts, stairs, driveways).", icon: "phone-call" },
  { step: "03", title: "Confirm Crew & Timing", description: "Choose 2 Movers ($79/30 min) or 3 Movers ($99/30 min) and lock in your scheduled arrival window.", icon: "calendar-check" },
  { step: "04", title: "Punctual Moving Day", description: "Our crew blanket-wraps, secures, and transports your belongings to your new address.", icon: "truck" },
];

export interface ProcessTimelineProps {
  steps?: ProcessStep[];
}

export function ProcessTimeline({ steps = DEFAULT_STEPS }: ProcessTimelineProps) {
  return (
    <ol className="ca-grid ca-grid--4" style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {steps.map((s, i) => (
        <li key={s.step} className="ca-card ca-card--interactive ca-group">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="ca-step__num">{s.step}</span>
            {s.icon ? <IconTile name={s.icon} size="sm" hoverFill /> : null}
          </div>
          <h3 className="ca-h4" style={{ marginTop: 20 }}>
            {s.title}
          </h3>
          <p className="ca-small" style={{ marginTop: 8 }}>
            {s.description}
          </p>
          <div className="ca-card__foot ca-step__foot" style={{ marginTop: 24 }}>
            <span>
              Phase {i + 1} of {steps.length}
            </span>
            {i < steps.length - 1 ? (
              <Icon name="arrow-right" size={14} className="ca-card__arrow" style={{ color: "var(--slate-400)" }} />
            ) : (
              <span style={{ color: "var(--orange-700)" }}>Complete</span>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
