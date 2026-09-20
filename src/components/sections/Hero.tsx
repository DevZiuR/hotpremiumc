import React from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { OrganicParticles } from "@/components/OrganicParticles";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-14 sm:pt-20 md:pt-28 pb-16 sm:pb-24 md:pb-32 overflow-hidden bg-white text-black">
      {/* Background diagonal line accents — hidden on mobile to keep hero clean */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40 hidden sm:block"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 0 L540 560" stroke="#DAD5C8" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M1440 0 L900 560" stroke="#DAD5C8" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Symmetrical organic particle figures — hidden on mobile, visible sm+ */}
      <div className="hidden sm:block pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <OrganicParticles />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center text-center">

        <Reveal delay={0} immediate>
          <div className="inline-flex items-center gap-2 sm:gap-2.5 border border-ink/20 px-2.5 py-1.5 sm:py-2 mb-6 sm:mb-8 max-w-full bg-black">
            <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
            <span className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] sm:tracking-[0.18em] uppercase text-white/70">
              Equity Partnerships · Highly Selective
            </span>
          </div>
        </Reveal>

        <Reveal delay={100} immediate>
          <h1 className="font-serif text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black max-w-4xl mb-6 sm:mb-6 tracking-tight leading-[1.14] sm:leading-[1.12] lg:leading-[64px]">
            <span>We Run Ads For Other Companies With Our Own Money</span>
          </h1>
        </Reveal>

        <Reveal delay={200} immediate>
          <p className="font-sans text-sm sm:text-base md:text-body text-black max-w-xl mb-10 sm:mb-10 leading-relaxed font-normal px-1 sm:px-0">
            We put our ad budget, sales team, and technology behind operators who already have a
            proven, sellable offer — no retainer, no management fee. We only make money when your
            revenue grows.
          </p>
        </Reveal>

        <Reveal delay={300} immediate className="w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
            <Button variant="sharp-primary" href="#contact" className="w-full sm:w-auto text-center justify-center">
              Apply for Partnership
            </Button>
            <Button className="!bg-[#2563EB] !text-white w-full sm:w-auto text-center justify-center" variant="sharp-outline" href="#verticals">
              industries we work with
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
