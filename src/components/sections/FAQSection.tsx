"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";

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
  // First item open by default matching the reference screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f4f5f7] py-16 sm:py-24 md:py-36 lg:py-48 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 border-x border-dashed border-gray-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20 items-start">
          {/* ── Left Column: Sticky Title & Support Callout ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              {/* Eyebrow with blue accent mark */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <span className="flex items-center">
                  <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2563eb" }} aria-hidden="true" />
                </span>
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-black">
                  FAQS
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-black tracking-tight sm:tracking-normal leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6">
                Questions worth answering before you apply
              </h2>

              {/* Support Contact Box */}
              <div className="pt-2">
                <h3 className="font-sans text-[15px] sm:text-[16px] font-semibold text-black mb-1">
                  Still deciding if this is the right fit?
                </h3>
                <p className="font-sans text-sm text-neutral-500 mb-5 sm:mb-7 leading-normal max-w-sm ">
                  Our partnership team can walk you through specifics before you apply.
                </p>
                <Button
                  variant="sharp-primary"
                  href="#contact"
                  showPixelArrow
                  className="!px-6 !py-3 !text-xs tracking-wider uppercase font-semibold w-full sm:w-auto text-center justify-center"
                >
                  CONTACT US
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Accordion List ── */}
          <div className="lg:col-span-7">
            <div className="space-y-2 sm:space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <Reveal key={faq.question} delay={index * 80}>
                    <div
                      className={`rounded-xl border px-4 py-4 sm:px-8 sm:py-6 transition-all duration-200 ${isOpen
                        ? "bg-[#0B0F19] border-neutral-700 shadow-md"
                        : "bg-[#0B0F19] border-white/10 hover:bg-[#101726] hover:border-white/20"
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between text-left gap-4 sm:gap-6 cursor-pointer group focus:outline-none"
                        aria-expanded={isOpen}
                      >
                        <span className="font-sans text-[15px] sm:text-[17.5px] font-medium text-white group-hover:text-neutral-200 transition-colors leading-snug">
                          {faq.question}
                        </span>
                        <span className="text-[#F5A623] shrink-0 p-0.5">
                          {isOpen ? (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4"
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
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="font-sans text-sm sm:text-[15px] text-neutral-300 leading-relaxed font-normal mt-3 sm:mt-4 pr-2 sm:pr-10">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
