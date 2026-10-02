"use client";

import React from "react";
import { SplitHeading } from "@/components/SplitHeading";
import { Reveal } from "@/components/Reveal";

const complianceItems = [
  {
    number: "01",
    title: "TCPA compliant",
    description: "Every lead is acquired with prior express written consent.",
  },
  {
    number: "02",
    title: "Consent documentation",
    description:
      "Consent form, timestamp, and IP address on file for every lead, available on request.",
  },
  {
    number: "03",
    title: "Data security",
    description:
      "Consumer data is encrypted at rest and in transit, and never resold.",
  },
  {
    number: "04",
    title: "Regulatory transparency",
    description:
      "Clear source disclosure and transparent funnels, built for regulated markets.",
  },
];

export function ComplianceStandards() {
  const goldText: React.CSSProperties = {
    background: "linear-gradient(to right, #F3E3B5 0%, #C9A24B 55%, #9A7B3C 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
    <section
      id="compliance"
      className="bg-[#000000] text-white py-[80px] lg:py-[140px] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* ── Header: heading left, overview bottom-aligned right on desktop ── */}
        <div className="mb-[72px] lg:grid lg:grid-cols-12 lg:gap-12 lg:items-end">
          <div className="lg:col-span-7">
            <SplitHeading
              as="h2"
              delay={0}
              lines={["Every lead,", "fully documented."]}
              className="font-serif section-h2 font-normal text-white tracking-[-0.025em] mb-4 sm:mb-5 lg:mb-0"
            />
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-[15px] sm:text-base text-white/60 leading-[1.6] font-normal max-w-[360px]">
              In high-ticket industries, compliance is non-negotiable.
            </p>
          </div>
        </div>

        {/* ── Compact single row of four items, hairline dividers, no card fills ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-white/10">
          {complianceItems.map((item, index) => (
            <Reveal key={item.number} delay={120 + index * 80} className="h-full">
              <div
                className={[
                  "group relative h-full px-0 py-6 sm:px-5 sm:py-7 lg:px-6 lg:py-8 transition-colors duration-300 ease-out hover:bg-white/[0.03] before:absolute before:left-0 before:top-0 before:h-[2px] before:w-full before:origin-left before:scale-x-0 before:bg-[#C9A24B] before:transition-transform before:duration-300 before:ease-out before:content-[''] group-hover:before:scale-x-100",
                  "border-white/10",
                  // Stacked (1-col): hairline above every item but the first
                  index > 0 ? "border-t" : "",
                  // 2-col: item 2 and 4 start a new row, so keep their top rule;
                  // items 1 and 3 need it removed once they sit side by side
                  index === 1 || index === 3 ? "sm:border-t-0" : "",
                  // 4-col single row: no top rules at all
                  index > 0 ? "lg:border-t-0" : "",
                  // Vertical rules between columns
                  index === 1 || index === 3 ? "sm:border-l" : "",
                  index > 0 ? "lg:border-l" : "",
                  // First cell of each row sits flush with the heading's left edge
                  index === 0 || index === 2 ? "sm:pl-0" : "",
                  index === 0 ? "lg:pl-0" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="font-mono text-[11px] tracking-[0.14em] mb-3" style={goldText}>
                  {item.number}
                </div>
                <h3 className="font-serif text-[24px] sm:text-[25px] lg:text-[27px] font-normal text-white leading-[1.12] tracking-[-0.02em] mb-2.5">
                  {item.title}
                </h3>
                <p className="font-sans text-[14px] lg:text-[15px] text-[#A3A3A3] leading-[1.5] font-normal">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
