"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    question: "Are you a lead vendor?",
    answer:
      "No. We are not a lead vendor or agency. We are an equity growth partner. We fund 100% of the media spend and customer acquisition out of our own pocket, install dedicated sales infrastructure, and only make money when your revenue actually grows.",
  },
  {
    question: "How does the equity partnership work?",
    answer:
      "We put our capital at risk on advertising and infrastructure before yours. In exchange, we agree on an equity or revenue-share structure based on the new enterprise growth we create together. There are no retainers, no management fees, and no upfront costs.",
  },
  {
    question: "Who do you partner with?",
    answer:
      "We partner with proven category leaders who already have an easy-to-sell product, strong unit economics, and operational capacity to scale. We only select a small number of operators per industry vertical to guarantee complete focus and exclusivity.",
  },
  {
    question: "What do you bring to the partnership?",
    answer:
      "We supply 100% of the front-end ad spend, creative production, audience testing, trained sales closers and appointment setters, centralized tech workflows, and operational labor managed by us.",
  },
  {
    question: "Are the customers you generate exclusive?",
    answer:
      "Yes, 100% exclusive. Everything we generate belongs to the partnership alone. Demand is never shared, resold, or auctioned against another buyer in your territory.",
  },
  {
    question: "Is your acquisition TCPA compliant?",
    answer:
      "Yes. Every consumer interaction follows strict prior express written consent standards, full audit logs, timestamping, and IP tracking to ensure 100% TCPA and regulatory compliance across all regulated verticals.",
  },
  {
    question: "What industries do you operate in?",
    answer:
      "We operate in 100+ high-ticket sub-verticals across legal, financial services, insurance, home services, healthcare, emerging claims, and high-value B2B sectors.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-[#f4f5f7] py-[80px] lg:py-[140px] border-b border-gray-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative mx-auto w-full max-w-[720px]">
          <Reveal>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <span className="flex items-center">
                  <span
                    className="block flex-shrink-0"
                    style={{ width: 12, height: 12, background: "#2563eb" }}
                    aria-hidden="true"
                  />
                </span>
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-black">
                  FAQS
                </span>
              </div>
            </div>

            <h2 className="font-serif text-[clamp(38px,5vw,68px)] font-normal text-black tracking-[-0.025em] leading-[1.05] mb-0 text-center mx-auto max-w-[720px] [text-wrap:balance]">
              Questions worth answering before you apply
            </h2>
          </Reveal>

          <div className="mt-10 sm:mt-12 space-y-2 sm:space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <Reveal key={faq.question} delay={index * 80}>
                  <div
                    className={`overflow-hidden rounded-xl border bg-[#09090b] transition-[background-color,border-color,box-shadow] duration-[150ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen
                      ? "border-[rgba(37,99,235,0.4)] shadow-md"
                      : "border-[rgba(255,255,255,0.10)] hover:border-white/20 hover:bg-[#171b23]"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between text-left gap-4 sm:gap-6 cursor-pointer group focus:outline-none hover:bg-transparent hover:text-white px-4 py-4 sm:px-8 sm:py-6"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="font-sans text-[17px] font-medium text-white group-hover:text-white transition-colors leading-[1.6] max-w-[62ch]">
                        {faq.question}
                      </span>
                      <span
                        className={`text-[#3B82F6] shrink-0 p-0.5 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "rotate-45" : "rotate-0"
                          }`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={answerId}
                      role="region"
                      aria-hidden={!isOpen}
                      className={`grid transition-[grid-template-rows,opacity] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-sans text-[17px] text-neutral-300 leading-[1.6] max-w-[62ch] font-normal mt-3 sm:mt-4 pr-2 sm:pr-10 pb-4 sm:pb-6 pl-4 sm:pl-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
