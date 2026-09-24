import { useId } from "react";

interface BaseFieldProps {
  label: string;
  required?: boolean;
  optionalNote?: string;
  hint?: string;
  error?: string;
  id?: string;
  className?: string;
}

type TextFieldProps = BaseFieldProps &
  (
    | ({ multiline: true } & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">)
    | ({ multiline?: false } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "className">)
  );

export function TextField({ label, required = false, optionalNote, hint, error, multiline = false, id, className = "", ...rest }: TextFieldProps) {
  const auto = useId();
  const fieldId = id || `f${auto.replace(/:/g, "")}`;
  const describedBy = hint || error ? `${fieldId}-d` : undefined;

  return (
    <div className={`ca-field ${className}`.trim()}>
      <label htmlFor={fieldId} className="ca-label">
        {label}
        {required ? <span className="ca-req"> *</span> : null}
        {optionalNote ? <span className="ca-opt"> ({optionalNote})</span> : null}
      </label>
      {multiline ? (
        <textarea
          id={fieldId}
          className="ca-input"
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          rows={3}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          className="ca-input"
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error ? (
        <span id={`${fieldId}-d`} className="ca-error">
          {error}
        </span>
      ) : hint ? (
        <span id={`${fieldId}-d`} className="ca-hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
