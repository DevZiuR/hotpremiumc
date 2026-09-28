"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { VisualReveal } from "@/components/VisualReveal";
import GlobalCoverageMap from "@/components/GlobalCoverageMap";

export function GlobalCoverage() {
  return (
    <section id="global-coverage" className="relative bg-[#09090b] py-[80px] lg:py-[140px] border-b border-white/10 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-16 items-center">
          <div className="flex flex-col justify-center lg:col-span-5">
            {/* Heading: SplitHeading line reveal */}
            <SplitHeading
              as="h2"
              delay={0}
              lines={["High-intent demand across", "the markets you serve."]}
              className="font-serif section-h2 font-normal text-white tracking-[-0.025em] mb-4 sm:mb-5"
            />

            {/* Supporting copy: 180ms */}
            <Reveal delay={180}>
              <p className="font-sans text-[17px] text-white/65 leading-[1.6] max-w-[62ch] font-normal">
                North America, the UK, Western Europe, the Nordics, Australia and New Zealand. We build campaigns around the markets you&apos;re licensed to serve, with demand delivered in real time.
              </p>
            </Reveal>
          </div>

          {/* Map Visual: 270ms VisualReveal with clip-path + scale settling */}
          <div className="relative w-full lg:col-span-7 flex items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,rgba(37,99,235,0.05)_38%,transparent_68%)]"
            />
            <VisualReveal delay={270} className="relative z-10 w-full max-w-[600px]">
              <GlobalCoverageMap />
            </VisualReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
