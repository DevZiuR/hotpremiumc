"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { CropMarkFrame } from "@/components/ui/CropMarkFrame";
import GlobalCoverageMap from "@/components/GlobalCoverageMap";

export function GlobalCoverage() {
  return (
    <section id="global-coverage" className="relative bg-white py-[80px] lg:py-[140px] border-b border-gray-200/80 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="absolute -inset-y-5 sm:-inset-y-8 inset-x-0 sm:inset-x-2 md:inset-x-6 pointer-events-none">
          <CropMarkFrame />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-16 items-center">
          <div className="flex flex-col justify-center lg:col-span-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <span className="flex items-center">
                  <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2563eb" }} aria-hidden="true" />
                </span>
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-black">
                  GLOBAL COVERAGE
                </span>
              </div>

              <h2 className="font-serif text-[clamp(38px,5vw,68px)] font-normal text-black tracking-[-0.025em] leading-[1.05] mb-4 sm:mb-5">
                High-intent demand across the markets you serve.
              </h2>

              <p className="font-sans text-[17px] text-gray-500 leading-[1.6] max-w-[62ch] font-normal">
                North America, the UK, Western Europe, the Nordics, Australia and New Zealand. We build campaigns around the markets you&apos;re licensed to serve, with demand delivered in real time.
              </p>
            </Reveal>
          </div>

          <div className="relative w-full lg:col-span-7 flex items-center justify-center lg:justify-end">
            <Reveal delay={150} className="w-full">
              <GlobalCoverageMap />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
