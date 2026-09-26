import React from "react";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";

interface OperatorBenefit {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

const OPERATOR_BENEFITS: OperatorBenefit[] = [
  {
    id: "capital-at-risk",
    title: "Capital at risk",
    description: "Our capital is at risk before yours.",
    icon: ({ className = "w-6 h-6" }) => (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    id: "fully-funded",
    title: "Fully funded",
    description: "We fund 100% of media, creative, and acquisition.",
    icon: ({ className = "w-6 h-6" }) => (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "exclusive-territory",
    title: "Exclusive territory",
    description: "Territory demand is never shared or resold.",
    icon: ({ className = "w-6 h-6" }) => (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <rect
          x="5"
          y="11"
          width="14"
          height="10"
          rx="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 11V7a4 4 0 118 0v4"
        />
      </svg>
    ),
  },
  {
    id: "elite-sales-team",
    title: "Elite sales team",
    description: "Closers, setters, and ops labor, dedicated to you.",
    icon: ({ className = "w-6 h-6" }) => (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: "audit-ready-tech",
    title: "Audit-ready tech",
    description: "Centralized tech with audit-ready TCPA compliance.",
    icon: ({ className = "w-6 h-6" }) => (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: "zero-retainers",
    title: "Zero retainers",
    description: "No management fees. 100% performance aligned.",
    icon: ({ className = "w-6 h-6" }) => (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 11l-3-3a2.121 2.121 0 00-3 0L10.5 10.5 8 8a2.121 2.121 0 00-3 0l-1 1a2.121 2.121 0 000 3l4.5 4.5a2.121 2.121 0 003 0l7-7a2.121 2.121 0 000-3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 10.5l3 3"
        />
      </svg>
    ),
  },
];

export function ProblemGrid() {
  return (
    <section
      id="why-operators-partner"
      className="relative bg-black text-white border-t border-b border-white/[0.07] py-[90px] sm:py-[120px] lg:py-[140px] overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">

        {/* Editorial left-aligned header with 0ms / 90ms choreography */}
        <div className="mb-14 sm:mb-18 lg:mb-20 max-w-3xl">
          {/* Eyebrow: 0ms */}
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
              <span className="font-sans text-[12px] font-semibold tracking-[0.12em] uppercase text-neutral-400">
                The Partnership Model
              </span>
            </div>
          </Reveal>

          {/* Major editorial heading: 90ms SplitHeading line reveal */}
          <SplitHeading
            as="h2"
            delay={90}
            lines={["Why the best operators", "partner with us."]}
            className="font-sans text-[32px] sm:text-[42px] lg:text-[60px] font-medium tracking-[-0.025em] leading-[1.12] text-white"
          />
        </div>

        {/* 3-Column spacious layout starting at 270ms with 80ms stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 sm:gap-x-16 lg:gap-x-20 gap-y-12 sm:gap-y-16 lg:gap-y-20">
          {OPERATOR_BENEFITS.map((item, index) => (
            <Reveal key={item.id} delay={270 + Math.min(index * 80, 640)}>
              <div className="group relative flex flex-col items-start text-left">
                {/* Minimalist Icon Badge Container */}
                <div className="w-[68px] h-[68px] sm:w-[72px] sm:h-[72px] rounded-[14px] border border-white/[0.08] bg-[#131316] flex items-center justify-center transition-all duration-200 ease-out group-hover:border-[#2563EB]/40 group-hover:bg-[#161724]">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-200 transition-colors duration-200 group-hover:text-white" />
                </div>

                {/* Typography-driven bold title + inline muted description */}
                <p className="mt-6 sm:mt-8 font-sans text-[15px] sm:text-[15.5px] leading-[1.65] text-neutral-400">
                  <strong className="font-semibold text-white tracking-[-0.01em]">
                    {item.title}.{" "}
                  </strong>
                  <span>{item.description}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 sm:mt-16">
          <Reveal delay={270 + 480}>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-[15px] sm:text-[16px] text-neutral-400 hover:text-white transition-colors duration-200 group font-sans"
            >
              <span>Talk to us</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
