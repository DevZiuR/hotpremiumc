"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { CropMarkFrame } from "@/components/ui/CropMarkFrame";

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
    <section className="bg-[#f4f5f7] py-[80px] lg:py-[140px] border-b border-gray-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Crop-mark corner registration brackets — matches GlobalCoverage & AboutMax */}
        <div className="absolute -inset-y-5 sm:-inset-y-8 inset-x-0 sm:inset-x-4 lg:inset-x-8 pointer-events-none">
          <CropMarkFrame />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20 items-start relative">
          {/* ── Left Column: Sticky Title & Support Callout ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] lg:self-start">
            <Reveal>
              {/* Eyebrow with blue accent mark */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <span className="flex items-center">
                  <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2563eb" }} aria-hidden="true" />
                </span>
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-black">
                  FAQS
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-[clamp(38px,5vw,68px)] font-normal text-black tracking-[-0.025em] leading-[1.05] mb-4 sm:mb-6 [text-wrap:balance]">
                Questions worth answering before you apply
              </h2>

              <div className="mt-8">
                <h3 className="font-serif text-[28px] font-medium text-black leading-[1.3]">Not sure you qualify?</h3>
                <p className="font-sans text-[17px] text-[#6B7280] leading-[1.6] mt-2">Apply and we&apos;ll tell you.</p>
                <div className="mt-5">
                  <Button href="#contact" variant="sharp-primary" className="!bg-[#2563EB] !border-[#2563EB] !text-white hover:!bg-[#1d4ed8] hover:!border-[#1d4ed8] h-[44px] !rounded-[12px] !py-0 px-6 inline-flex items-center gap-2">
                    Apply for partnership <span aria-hidden="true">→</span>
                  </Button>
                </div>
              </div>
              {/* this is the div that should be added after the FAQTitle*/}
              {/* Support Contact Box 
              {/*
                <div className="pt-2">
                <h3 className="font-sans text-[15px] sm:text-[22px] font-semibold text-black mb-1">
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
              */}
            </Reveal>
          </div>

          {/* ── Right Column: Accordion List ── */}
          <div className="lg:col-span-7 relative">
            {/* Vertical divider — desktop only, matches the structured column feel */}
            <div className="hidden lg:block absolute -left-8 xl:-left-10 top-0 bottom-0 w-px bg-[#12151B]/10" aria-hidden="true" />
            <div className="space-y-2 sm:space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <Reveal key={faq.question} delay={index * 80}>
                    <div
                      className={`rounded-xl border px-4 py-4 sm:px-8 sm:py-6 transition-all duration-200 ${isOpen
                        ? "bg-[#060810] border-neutral-700 shadow-md"
                        : "bg-[#060810] border-white/10 hover:bg-[#0a0c14] hover:border-white/20"
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between text-left gap-4 sm:gap-6 cursor-pointer group focus:outline-none"
                        aria-expanded={isOpen}
                      >
                        <span className="font-sans text-[17px] font-medium text-white group-hover:text-neutral-200 transition-colors leading-[1.6] max-w-[62ch]">
                          {faq.question}
                        </span>
                        <span className={`text-[#3B82F6] shrink-0 p-0.5 transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}>
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

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="font-sans text-[17px] text-neutral-300 leading-[1.6] max-w-[62ch] font-normal mt-3 sm:mt-4 pr-2 sm:pr-10">
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
