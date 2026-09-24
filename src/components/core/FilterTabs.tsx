"use client";

export interface FilterTabOption {
  value: string;
  label: string;
}

export interface FilterTabsProps {
  options: (string | FilterTabOption)[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function FilterTabs({ options = [], value, onChange, label = "Filter" }: FilterTabsProps) {
  return (
    <div className="ca-filter" role="group" aria-label={label}>
      {options.map((option) => {
        const v = typeof option === "string" ? option : option.value;
        const l = typeof option === "string" ? option : option.label;
        return (
          <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)}>
            {l}
          </button>
        );
      })}
    </div>
  );
}
