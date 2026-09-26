import React from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { OrganicParticles } from "@/components/OrganicParticles";


export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-[110px] lg:py-[180px] overflow-hidden bg-black !text-white">
      {/* Background diagonal line accents — hidden */}

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60 hidden"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 0 L540 560" stroke="#DAD5C8" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M1440 0 L900 560" stroke="#DAD5C8" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Symmetrical organic particle figures — hidden */}
      <div className="hidden pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <OrganicParticles />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <Reveal delay={0} duration={600} immediate>
          <div
            className="inline-flex items-center gap-2.5 mb-[40px] rounded-full border px-[14px] py-[8px]"
            style={{ background: 'rgba(11,15,20,0.03)', borderColor: 'rgba(11,15,20,0.12)' }}
          >
            <span
              className="block flex-shrink-0"
              style={{ width: 12, height: 12, background: "#2457D6" }}
              aria-hidden="true"
            />
            <span className="font-sans text-[12px] font-semibold tracking-[0.12em] uppercase text-gray">
              Equity partnerships
            </span>
          </div>
        </Reveal>

        {/* H1 */}
        <Reveal delay={80} duration={650} immediate>
          <h1 className="font-serif text-[48px] sm:text-[clamp(48px,8vw,108px)] font-normal !text-white max-w-4xl mb-7 sm:mb-8 tracking-[-0.03em] leading-[0.98]">
            <span className="font-normal text-white opacity-100">We Fund Your Growth.</span>{" "}
            <br />
            <span className="font-normal text-white opacity-100">You Keep the Business.</span>
          </h1>
        </Reveal>

        {/* Supporting copy */}
        <Reveal delay={180} duration={600} immediate>
          <p
            className="font-sans text-[16px] sm:text-[18px] text-[#9CA3AF] mx-auto mb-11 leading-[1.5] font-normal tracking-[-0.01em] px-1 sm:px-0"
            style={{ maxWidth: "52ch" }}
          >
            We put our ad budget, sales team, and technology behind operators with a proven offer. No retainer. No management fee. We only earn when your revenue grows.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={280} duration={600} immediate className="w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
            {/* Primary — filled blue */}
            <Button
              variant="sharp-primary"
              href="#contact"
              className="!bg-[#2563EB] !border-[#2563EB] !text-white hover:!bg-[#1d4ed8] hover:!border-[#1d4ed8] w-full sm:w-auto text-center justify-center h-[46px] !rounded-[12px] !py-0 px-8 transition-all duration-300"
            >
              Apply for Partnership
            </Button>
            {/* Secondary — low-contrast ghost so it doesn't compete */}
            <Button
              variant="sharp-outline"
              href="#verticals"
              className="w-full sm:w-auto text-center justify-center h-[46px] !rounded-[12px] !py-0 px-8 !bg-transparent !border-[1px] !border-white/15 !text-white/45 hover:!bg-transparent hover:!text-white/65 hover:!border-white/25 transition-all duration-300"
            >
              Industries we work with
            </Button>
          </div>
        </Reveal>

        {/* Founder track record row — extra separation */}
        <Reveal delay={400} duration={600} immediate className="w-full">
          <div className="w-full max-w-3xl mx-auto mt-16 sm:mt-24 pt-8 border-t border-gray-200/70">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-white text-center mb-6">
              Founder track record
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center">
                <div className="font-serif text-[22px] sm:text-[30px] font-semibold text-white tracking-tight leading-none">$50M/yr</div>
                <div className="font-sans text-[13px] text-[#3A3F47] mt-1.5 leading-[1.4]">Coaching business (current run-rate)</div>
              </div>
              <div className="text-center border-x border-gray-200/70 px-2">
                <div className="font-serif text-[22px] sm:text-[30px] font-semibold text-white tracking-tight leading-none">$53M in 10 months</div>
                <div className="font-sans text-[13px] text-white/50 mt-1.5 leading-[1.4]">Medical ecommerce brand (separate venture)</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-[22px] sm:text-[30px] font-semibold text-white tracking-tight leading-none">8-figure</div>
                <div className="font-sans text-[13px] text-white/50 mt-1.5 leading-[1.4]">Ecommerce brand</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
