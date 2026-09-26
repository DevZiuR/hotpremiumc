import React from "react";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { VisualReveal } from "@/components/VisualReveal";
import GlobalCoverageMap from "@/components/GlobalCoverageMap";

export function GlobalCoverage() {
  return (
    <section id="global-coverage" className="relative bg-black py-[80px] lg:py-[140px] border-b border-gray-200/80 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-16 items-center">
          <div className="flex flex-col justify-center lg:col-span-5">
            {/* Eyebrow: 0ms */}
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  Global Reach
                </span>
              </div>
            </Reveal>

            {/* Heading: 90ms SplitHeading line reveal */}
            <SplitHeading
              as="h2"
              delay={90}
              lines={["High-intent demand across", "the markets you serve."]}
              className="font-serif text-[clamp(38px,5vw,60px)] font-normal text-white tracking-[-0.025em] leading-[1.05] mb-4 sm:mb-5"
            />

            {/* Supporting copy: 180ms */}
            <Reveal delay={180}>
              <p className="font-sans text-[17px] text-gray-500 leading-[1.6] max-w-[62ch] font-normal">
                North America, the UK, Western Europe, the Nordics, Australia and New Zealand. We build campaigns around the markets you&apos;re licensed to serve, with demand delivered in real time.
              </p>
            </Reveal>
          </div>

          {/* Map Visual: 270ms VisualReveal with clip-path + scale settling */}
          <div className="relative w-full lg:col-span-7 flex items-center justify-center">
            <VisualReveal delay={270} className="w-full max-w-[520px] rounded-2xl">
              <GlobalCoverageMap />
            </VisualReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
