"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { generateFAQSchema } from "@/config/seo";

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
    <div className="w-full max-w-4xl mx-auto">
      {/* Schema generation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(items)),
        }}
      />

      <div className="space-y-3">
        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <article
              key={item.id}
              className={`scroll-reveal rounded-2xl border transition-colors duration-200 ${
                isOpen
                  ? "border-[#FF6A00]/40 bg-orange-50/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-question-${item.id}`}
              >
                <span className="text-base font-bold text-[#0B2D5B] pr-4">
                  {item.question}
                </span>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform ${
                    isOpen
                      ? "rotate-180 bg-[#FF6A00] text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              <div
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
