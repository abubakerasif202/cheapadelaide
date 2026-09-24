import { Icon } from "@/components/core";

export interface AnswerCapsuleProps {
  label?: string;
  question: string;
  answer: string;
  takeaways?: string[];
}

export function AnswerCapsule({ label = "Quick Answer", question, answer, takeaways = [] }: AnswerCapsuleProps) {
  return (
    <aside className="ca-answer" aria-label="Quick answer">
      <div className="ca-answer__label ca-eyebrow">
        <Icon name="sparkles" size={16} style={{ color: "var(--orange-500)" }} />
        {label}
      </div>
      <h2 className="ca-h3" style={{ fontSize: 20 }}>
        {question}
      </h2>
      <p className="ca-answer__text">{answer}</p>
      {takeaways.length ? (
        <div className="ca-answer__take">
          <span className="ca-eyebrow" style={{ color: "var(--slate-700)" }}>
            Key Takeaways
          </span>
          <ul className="ca-checklist">
            {takeaways.map((t) => (
              <li key={t}>
                <Icon name="check-circle-2" size={16} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
