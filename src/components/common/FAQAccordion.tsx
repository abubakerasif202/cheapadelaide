"use client";

import { useState } from "react";
import { Icon } from "@/components/core";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="ca-faq">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article key={item.id} className="ca-faq__item" data-open={isOpen}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="ca-faq__q"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-question-${item.id}`}
            >
              <span>{item.question}</span>
              <span className="ca-faq__chev" aria-hidden="true">
                <Icon name="chevron-down" size={16} />
              </span>
            </button>

            <div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className="ca-faq__panel"
            >
              <div>
                <p className="ca-faq__a">{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
