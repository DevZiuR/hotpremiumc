"use client";

import React from "react";
import { SplitHeading } from "@/components/SplitHeading";
import { Reveal } from "@/components/Reveal";

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
        strokeWidth={1.5}
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
        strokeWidth={1.5}
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
        strokeWidth={1.5}
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
        strokeWidth={1.5}
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
        strokeWidth={1.5}
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
        strokeWidth={1.5}
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
      className="relative bg-[#000000] text-white border-t border-b border-white/[0.07] py-[110px] sm:py-[150px] lg:py-[190px] overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">

        {/* Centered editorial header */}
        <div className="mb-24 flex flex-col items-center text-center">
          {/* Major editorial heading: SplitHeading line reveal */}
          <SplitHeading
            as="h2"
            delay={0}
            lines={["Why the best operators", "partner with us."]}
            className="font-serif section-h2 font-medium tracking-[-0.025em] text-white text-center"
          />
        </div>

        {/* 3x2 grid: vertical dividers between columns only, no outer border */}
        <div className="mx-auto w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-3 lg:gap-y-16">
          {OPERATOR_BENEFITS.map((item, index) => (
            <Reveal
              key={item.id}
              delay={120 + index * 70}
              className={[
                "px-8",
                // Mobile: horizontal divider between stacked items
                index > 0
                  ? "mt-10 border-t border-[rgba(255,255,255,0.08)] pt-10 lg:mt-0 lg:border-t-0 lg:pt-0"
                  : "",
                // Desktop: vertical dividers between columns (middle column only)
                index === 1 || index === 4
                  ? "lg:border-x lg:border-[rgba(255,255,255,0.08)]"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex h-full flex-col items-start text-left">
                {/* Icon tile */}
                <div className="w-11 h-11 rounded-[10px] bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[rgba(255,255,255,0.75)]" />
                </div>

                <h3 className="mt-14 font-sans text-[24px] font-normal leading-[1.2] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.5] text-[rgba(255,255,255,0.6)] max-w-[240px]">
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
