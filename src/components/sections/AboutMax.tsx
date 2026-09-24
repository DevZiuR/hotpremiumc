"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { CropMarkFrame } from "@/components/ui/CropMarkFrame";

export function AboutMax() {
  return (
    <section id="about-founder" className="relative bg-white py-[80px] lg:py-[140px] border-b border-gray-200/80 overflow-hidden font-sans">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Crop-mark corner registration brackets */}
        <div className="absolute -inset-y-5 sm:-inset-y-8 inset-x-0 sm:inset-x-2 md:inset-x-6 pointer-events-none">
          <CropMarkFrame />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-20 items-center">

          {/* ── Eyebrow + Heading (always first on mobile, hidden on desktop — content col handles it) ── */}
          <div className="lg:hidden">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-black">
                  FOUNDER
                </span>
              </div>
              <h2 className="font-serif text-[clamp(38px,5vw,68px)] font-normal text-black tracking-[-0.025em] leading-[1.05] mb-0">
                Built from scaling real businesses
              </h2>
            </Reveal>
          </div>

          {/* ── Founder Photo Card (below heading on mobile, left col on desktop) ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:order-1">
            <Reveal delay={100} className="w-full max-w-[320px] sm:max-w-[420px]">
              <div className="relative w-full aspect-square rounded-2xl lg:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xl group">
                <Image
                  src="/media/max-pfp.jpg"
                  alt="Max — Founder of Hot Premium Customers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Glassmorphism Founder Badge */}
                <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                  <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white shadow-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                      <span className="text-xs sm:text-[13px] font-semibold tracking-tight uppercase">Max Av</span>
                    </div>
                    <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-300">
                      Founder
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Full content (desktop shows heading here too; mobile heading already above) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:order-2">
            <Reveal>
              {/* Eyebrow + Heading — desktop only */}
              <div className="hidden lg:block">
                <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
                  <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-widest text-black">
                    FOUNDER
                  </span>
                </div>

                <h2 className="font-serif text-[clamp(38px,5vw,68px)] font-normal text-black tracking-[-0.025em] leading-[1.05] mb-4 sm:mb-6">
                  Built from scaling real businesses
                </h2>
              </div>

              {/* Body Copy */}
              <div className="space-y-3.5 sm:space-y-4 font-sans text-[17px] text-gray-600 leading-[1.6] max-w-[62ch] font-normal mt-4 lg:mt-0">
                <p>
                  I built Hot Premium Customers from years of scaling businesses through paid media, customer acquisition, and sales infrastructure.
                </p>
                <p>
                  Before this, I built an ecommerce business and two agencies, helping companies scale to $52M/year, $50M in ten months, and seven figures in their first year.
                </p>
                <p>
                  Now, we put that same growth infrastructure behind businesses we partner with.
                </p>
              </div>

              {/* Track Record Stat Highlights */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-gray-100">
                <div className="p-3 sm:p-0 rounded-lg bg-gray-50/70 sm:bg-transparent flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="font-serif text-2xl sm:text-3xl text-black font-normal tracking-tight">$52M/yr</div>
                  <div className="font-sans text-xs text-gray-500 mt-0.5">Coaching Company</div>
                </div>
                <div className="p-3 sm:p-0 rounded-lg bg-gray-50/70 sm:bg-transparent flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="font-serif text-2xl sm:text-3xl text-black font-normal tracking-tight">$50M</div>
                  <div className="font-sans text-xs text-gray-500 mt-0.5">In 10 Months (Medical)</div>
                </div>
                <div className="p-3 sm:p-0 rounded-lg bg-gray-50/70 sm:bg-transparent flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="font-serif text-2xl sm:text-3xl text-black font-normal tracking-tight">7-Figure</div>
                  <div className="font-sans text-xs text-gray-500 mt-0.5">Apparel First Year</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6 sm:pt-8">
                <Button variant="sharp-primary" href="#contact" className="!bg-[#2563EB] w-full sm:w-auto text-center justify-center">
                  Apply for Partnership
                </Button>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

// Re-export for backward compatibility
export { AboutMax as LocalMarkets };
