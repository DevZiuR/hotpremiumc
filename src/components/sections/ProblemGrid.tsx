import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CropMarkFrame } from "@/components/ui/CropMarkFrame";
import GridMorph from "@/components/GridMorph";

export function ProblemGrid() {
  return (
    <section className="bg-[#09090b] text-white border-t border-b border-white/[0.07] py-[80px] lg:py-[140px] overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 text-center mt-4 sm:mt-8 mb-12 sm:mb-16 md:mb-20">
        <Reveal>
          <div className="flex flex-col items-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                Proven Model
              </span>
            </div>
            <h2 className="font-serif text-[clamp(38px,5vw,68px)] font-semibold tracking-[-0.025em] leading-[1.05] text-white my-2 mb-3">
              Why the best operators partner with us
            </h2>
          </div>
        </Reveal>
      </div>

      {/* Editorial panel: 3x2 grid */}
      <div className="w-full bg-[#09090b] px-3 sm:px-6">
        <div className="relative max-w-7xl xl:max-w-[1380px] mx-auto">
          {/* Crop-mark corner registration brackets covering all boxes */}
          <div className="absolute -inset-y-4 sm:-inset-y-6 inset-x-0 sm:-inset-x-2 md:-inset-x-4 pointer-events-none">
            <CropMarkFrame variant="dark" />
          </div>

          <div className="space-y-6 sm:space-y-7 lg:space-y-8">
            {/* ── ROW 1 ── */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#111113] p-1.5 sm:p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2">
                {/* Box 1: Equity Partnership — blue */}
                <Reveal delay={0} className="h-full">
                  <div className="relative group overflow-hidden h-[300px] p-5 sm:p-6 flex flex-col justify-between border border-white/[0.08] bg-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:z-10">
                    <GridMorph rest={[0.72, 0.3]} alpha={0.16} />
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-300/80 bg-black backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-200 ease-out group-hover:border-[#F5A623]/40">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col gap-1.5">
                      <h3 className="font-serif text-[30px] font-medium leading-[1.1] tracking-tight text-white text-left">Capital at risk</h3>
                       <p className="font-sans text-white text-[17px] font-normal leading-[1.6] max-w-[62ch] text-left">
                        Equity partnership where our capital is at risk before yours
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Box 2: Our Ad Spend — dark, blue on hover */}
                <Reveal delay={0} className="h-full">
                  <div className="relative group overflow-hidden h-[300px] p-5 sm:p-6 flex flex-col justify-between border border-white/[0.08] bg-[#111113] hover:bg-[#2563EB] hover:border-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:z-10">
                    <GridMorph rest={[0.28, 0.3]} />
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-700/80 bg-neutral-900/80 group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out group-hover:bg-black">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col gap-1.5">
                      <h3 className="font-serif text-[30px] font-medium leading-[1.1] tracking-tight text-white text-left">Fully funded</h3>
                       <p className="font-sans text-white text-[17px] font-normal leading-[1.6] max-w-[62ch] text-left">
                        We fund 100% of media spend, creative, and customer acquisition
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Box 3: Exclusive Demand — dark, blue on hover */}
                <Reveal delay={0} className="h-full">
                  <div className="relative group overflow-hidden h-[300px] p-5 sm:p-6 flex flex-col justify-between border border-white/[0.08] bg-[#111113] hover:bg-[#2563EB] hover:border-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:z-10">
                    <GridMorph rest={[0.72, 0.3]} />
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-700/80 bg-neutral-900/80 group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out group-hover:bg-black">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col gap-1.5">
                      <h3 className="font-serif text-[30px] font-medium leading-[1.1] tracking-tight text-white text-left">Exclusive territory</h3>
                       <p className="font-sans text-white text-[17px] font-normal leading-[1.6] max-w-[62ch] text-left">
                        100% exclusive territory demand that is never shared or resold
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* ── ROW 2 ── */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#111113] p-1.5 sm:p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2">
                {/* Box 4: Sales Force — dark, blue on hover */}
                <Reveal delay={0} className="h-full">
                  <div className="relative group overflow-hidden h-[300px] p-5 sm:p-6 flex flex-col justify-between border border-white/[0.08] bg-[#111113] hover:bg-[#2563EB] hover:border-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:z-10">
                    <GridMorph rest={[0.28, 0.3]} />
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-700/80 bg-neutral-900/80 group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out group-hover:bg-black">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col gap-1.5">
                      <h3 className="font-serif text-[30px] font-medium leading-[1.1] tracking-tight text-white text-left">Elite sales team</h3>
                       <p className="font-sans text-white text-[17px] font-normal leading-[1.6] max-w-[62ch] text-left">
                        Dedicated sales closers, trained setters, and operational labor
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Box 5: TCPA Compliant — dark, blue on hover */}
                <Reveal delay={0} className="h-full">
                  <div className="relative group overflow-hidden h-[300px] p-5 sm:p-6 flex flex-col justify-between border border-white/[0.08] bg-[#111113] hover:bg-[#2563EB] hover:border-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:z-10">
                    <GridMorph rest={[0.72, 0.3]} />
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-700/80 bg-neutral-900/80 group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out group-hover:bg-black">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col gap-1.5">
                      <h3 className="font-serif text-[30px] font-medium leading-[1.1] tracking-tight text-white text-left">Audit-ready tech</h3>
                       <p className="font-sans text-white text-[17px] font-normal leading-[1.6] max-w-[62ch] text-left">
                        Centralized tech infrastructure with audit-ready TCPA compliance
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Box 6: Performance Aligned — dark, blue on hover */}
                <Reveal delay={0} className="h-full">
                  <div className="relative group overflow-hidden h-[300px] p-5 sm:p-6 flex flex-col justify-between border border-white/[0.08] bg-[#111113] hover:bg-[#2563EB] hover:border-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:z-10">
                    <GridMorph rest={[0.28, 0.3]} />
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-700/80 bg-neutral-900/80 group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out group-hover:bg-black">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11l-3-3a2.121 2.121 0 00-3 0L10.5 10.5 8 8a2.121 2.121 0 00-3 0l-1 1a2.121 2.121 0 000 3l4.5 4.5a2.121 2.121 0 003 0l7-7a2.121 2.121 0 000-3z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5l3 3" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col gap-1.5">
                      <h3 className="font-serif text-[30px] font-medium leading-[1.1] tracking-tight text-white text-left">Performance aligned</h3>
                       <p className="font-sans text-white text-[17px] font-normal leading-[1.6] max-w-[62ch] text-left">
                        Zero retainers or management fees — 100% performance aligned
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
