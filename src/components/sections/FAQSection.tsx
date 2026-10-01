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
    <section id="faq" className="bg-[#09090b] py-[80px] lg:py-[140px] border-b border-white/10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative mx-auto w-full max-w-[1100px]">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="flex items-center">
                <span
                  className="block flex-shrink-0"
                  style={{ width: 12, height: 12, background: "#2563eb" }}
                  aria-hidden="true"
                />
              </span>
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-white/70">
                FAQS
              </span>
            </div>
          </div>

          <Reveal delay={90}>
            <h2 className="font-serif section-h2 font-normal text-white tracking-[-0.02em] mb-0 text-center mx-auto max-w-[1000px] [text-wrap:balance]">
              Questions worth answering <br className="hidden md:block" /> before you apply
            </h2>
          </Reveal>

          <div className="mt-12 md:mt-14 border-t border-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div key={faq.question} className="border-b border-white/10">
                  <div className="relative py-5 md:py-6 px-4 md:px-6 -mx-4 md:-mx-6 bg-[##1a1a1f ] hover:bg-[##1a1a1f] transition-colors duration-300 motion-reduce:transition-none">
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between text-left gap-5 cursor-pointer group focus:outline-none"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="font-serif text-[22px] leading-[1.15] md:text-[30px] md:leading-[38px] font-normal tracking-[-0.01em] min-w-0 [text-wrap:balance] text-white transition-colors duration-300 motion-reduce:transition-none">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-4 h-4 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : "rotate-0"
                          }`}
                        fill="none"
                        viewBox="0 0 16 16"
                        stroke="#2563EB"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3.5 6l4.5 4.5L12.5 6" />
                      </svg>
                    </button>

                    <div
                      id={answerId}
                      role="region"
                      aria-hidden={!isOpen}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-sans text-[16px] md:text-[17px] leading-[1.6] font-normal max-w-[700px] mt-4 md:mt-5 text-white/70 transition-colors duration-300 motion-reduce:transition-none">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
