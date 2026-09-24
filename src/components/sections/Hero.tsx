import React from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { OrganicParticles } from "@/components/OrganicParticles";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-[80px] lg:py-[140px] overflow-hidden bg-white text-black">
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
          <div className="inline-flex items-center gap-2.5 mb-[28px] rounded-full border px-[14px] py-[8px]" style={{ background: 'rgba(11,15,20,0.03)', borderColor: 'rgba(11,15,20,0.12)' }}>
            <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
            <span className="font-sans text-[12px] font-semibold tracking-[0.12em] uppercase text-[#3A3F47]">
              Equity partnerships
            </span>
          </div>
        </Reveal>

        <Reveal delay={100} immediate>
          <h1 className="font-serif text-[48px] sm:text-[clamp(48px,8vw,108px)] font-normal text-black max-w-4xl mb-6 sm:mb-6 tracking-[-0.03em] leading-[0.98]">
            <span className="italic">We Fund Your Growth.</span> <br />
            You Keep the Business.
          </h1>
        </Reveal>

        <Reveal delay={200} immediate>
          <p className="font-sans text-[16px] sm:text-[20px] text-[#3A3F47] max-w-[62ch] mx-auto mb-10 leading-[1.6] font-normal tracking-[-0.01em] px-1 sm:px-0 line-clamp-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            We put our ad budget, sales team, and technology behind operators with a proven offer. No retainer. No management fee. We only earn when your revenue grows.
          </p>
        </Reveal>

        <Reveal delay={300} immediate className="w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
            <Button variant="sharp-primary" href="#contact" className="!bg-[#2563EB] !border-[#2563EB] !text-white hover:!bg-[#1d4ed8] hover:!border-[#1d4ed8] w-full sm:w-auto text-center justify-center h-[44px] !rounded-[12px] !py-0 px-7">
              Apply for Partnership
            </Button>
            <Button variant="sharp-outline" href="#verticals" className="w-full sm:w-auto text-center justify-center h-[44px] !rounded-[12px] !py-0 px-7 !bg-transparent !border-[1px] !border-[rgba(11,15,20,0.25)] !text-[#0B0F14] hover:!bg-black hover:!text-white hover:!border-black">
              Industries we work with
            </Button>
          </div>
        </Reveal>

        <Reveal delay={400} immediate className="w-full">
          <div className="w-full max-w-3xl mx-auto mt-10 sm:mt-14 pt-8 border-t border-gray-200/70">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3A3F47] text-center mb-6">
              Founder track record
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center">
                <div className="font-serif text-[22px] sm:text-[30px] font-semibold text-black tracking-tight leading-none">$50M/yr</div>
                <div className="font-sans text-[13px] text-[#3A3F47] mt-1.5 leading-[1.4]">Coaching business</div>
              </div>
              <div className="text-center border-x border-gray-200/70 px-2">
                <div className="font-serif text-[22px] sm:text-[30px] font-semibold text-black tracking-tight leading-none">$53M in 10 months</div>
                <div className="font-sans text-[13px] text-[#3A3F47] mt-1.5 leading-[1.4]">Medical ecommerce brand</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-[22px] sm:text-[30px] font-semibold text-black tracking-tight leading-none">8-figure</div>
                <div className="font-sans text-[13px] text-[#3A3F47] mt-1.5 leading-[1.4]">Ecommerce brand<br className="hidden sm:block" /> built from zero</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
