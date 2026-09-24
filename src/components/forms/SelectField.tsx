import { useId } from "react";
import { Icon } from "@/components/core";

export interface SelectFieldOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id" | "className"> {
  label: string;
  options: (string | SelectFieldOption)[];
  required?: boolean;
  hint?: string;
  id?: string;
  className?: string;
}

export function SelectField({ label, options = [], required = false, hint, id, className = "", "aria-describedby": describedBy, ...rest }: SelectFieldProps) {
  const auto = useId();
  const fieldId = id || `s${auto.replace(/:/g, "")}`;
  const hintId = `${fieldId}-hint`;

  return (
    <div className={`ca-field ${className}`.trim()}>
      <label htmlFor={fieldId} className="ca-label">
        {label}
        {required ? <span className="ca-req"> *</span> : null}
      </label>
      <div className="ca-select">
        <select id={fieldId} className="ca-input" required={required} aria-describedby={[describedBy, hint ? hintId : null].filter(Boolean).join(" ") || undefined} {...rest}>
          {options.map((option) =>
            typeof option === "string" ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
        <Icon name="chevron-down" size={16} />
      </div>
      {hint ? <span id={hintId} className="ca-hint">{hint}</span> : null}
    </div>
  );
}
