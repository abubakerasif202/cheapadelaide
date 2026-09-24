import { Icon } from "@/components/core";

export interface ChoiceCardProps {
  type?: "radio" | "checkbox";
  name: string;
  value: string;
  label: string;
  description?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function ChoiceCard({ type = "radio", name, value, label, description, checked = false, onChange }: ChoiceCardProps) {
  return (
    <label className={`ca-choice ca-choice--${type}`} data-checked={checked}>
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} />
      <span className="ca-choice__mark" aria-hidden="true">
        {type === "checkbox" ? <Icon name="check" size={14} strokeWidth={3} /> : null}
      </span>
      <span>
        {label}
        {description ? <span className="ca-choice__desc">{description}</span> : null}
      </span>
    </label>
  );
}
