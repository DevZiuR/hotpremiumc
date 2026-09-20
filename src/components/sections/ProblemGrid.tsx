import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CropMarkFrame } from "@/components/ui/CropMarkFrame";

export function ProblemGrid() {
  return (
    <section className="bg-[#09090b] text-white border-t border-b border-white/[0.07] pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-36 overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 text-center mt-4 sm:mt-8 mb-12 sm:mb-16 md:mb-20">
        <Reveal>
          <div className="flex flex-col items-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Proven Model
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] text-white my-2 mb-3">
              Why the Best Operators Partner With Us
            </h2>
          </div>
        </Reveal>
      </div>

      {/* Editorial panel: four vertical columns with two supporting pillars each */}
      <div className="w-full bg-[#09090b] px-3 sm:px-6">
        <div className="relative max-w-7xl xl:max-w-[1380px] mx-auto">
          {/* Crop-mark corner registration brackets covering all boxes */}
          <div className="absolute -inset-y-4 sm:-inset-y-6 inset-x-0 sm:-inset-x-2 md:-inset-x-4 pointer-events-none">
            <CropMarkFrame variant="dark" />
          </div>

          <div className="space-y-6 sm:space-y-7 lg:space-y-8">
            {/* ── ROW 1 (Pillars 1 to 4) ── */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#111113] p-1.5 sm:p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2">
                {/* Box 1: Lead Column (Equity Partnership) */}
                <Reveal delay={0} className="h-full">
                  <div className="relative group overflow-hidden min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:z-10 h-full">
                    {/* Top-left: Outline Icon */}
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-300/80 bg-black backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-200 ease-out group-hover:border-[#F5A623]/40">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[36px]" />

                    <div className="relative z-10">
                      <p className="font-sans text-white text-[15px] sm:text-[16px] font-normal leading-[1.45] text-left drop-shadow-sm">
                        Equity partnership where our capital is at risk before yours
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Box 2: Easy-to-Sell Products Only */}
                <Reveal delay={90} className="h-full">
                  <div className="relative group overflow-hidden min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#111113] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:z-10 h-full">
                    {/* Top-left: Bullseye / Target Icon */}
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-700/80 bg-neutral-900/80 group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="12" cy="12" r="1" fill="currentColor" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[36px]" />

                    <div className="relative z-10">
                      <p className="font-sans text-white text-[15px] sm:text-[16px] font-normal leading-[1.45] text-left drop-shadow-sm">
                        Easy-to-sell products with proven demand and strong unit economics
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Box 3: Our Ad Spend, Our Risk */}
                <Reveal delay={180} className="h-full">
                  <div className="relative group overflow-hidden min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:z-10 h-full">
                    {/* Top-left: Lightning / Zap Icon */}
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-300/80 bg-black backdrop-blur-sm group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[36px]" />

                    <div className="relative z-10">
                      <p className="font-sans text-white text-[15px] sm:text-[16px] font-normal leading-[1.45] text-left drop-shadow-sm">
                        We fund 100% of media spend, creative, and customer acquisition
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Box 4: Exclusive Demand */}
                <Reveal delay={270} className="h-full">
                  <div className="relative group overflow-hidden min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#111113] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:z-10 h-full">
                    {/* Top-left: Lock / Shield Icon */}
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-700/80 bg-neutral-900/80 group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[36px]" />

                    <div className="relative z-10">
                      <p className="font-sans text-white text-[15px] sm:text-[16px] font-normal leading-[1.45] text-left drop-shadow-sm">
                        100% exclusive territory demand that is never shared or resold
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* ── ROW 2 (Pillars 5 to 8) ── */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#111113] p-1.5 sm:p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2">
                {/* Box 5: Sales Force and Labor Included */}
                <Reveal delay={0} className="h-full">
                  <div className="relative group overflow-hidden min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#2563EB] md:bg-[#111113] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 md:hover:shadow-black/50 hover:z-10 h-full">
                    {/* Top-left: Sales Force / People Icon */}
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-300/80 md:border-neutral-700/80 bg-black md:bg-neutral-900/80 backdrop-blur-sm group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[36px]" />

                    <div className="relative z-10">
                      <p className="font-sans text-white text-[15px] sm:text-[16px] font-normal leading-[1.45] text-left drop-shadow-sm">
                        Dedicated sales closers, trained setters, and operational labor
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Box 6: First-World Coverage */}
                <Reveal delay={90} className="h-full">
                  <div className="relative group overflow-hidden min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#111113] md:bg-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 md:hover:shadow-black/20 hover:z-10 h-full">
                    {/* Top-left: Location Pin / Globe Icon */}
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-700/80 md:border-neutral-300/80 bg-neutral-900/80 md:bg-black md:backdrop-blur-sm group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out">
                        <svg className="w-5 h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[36px]" />

                    <div className="relative z-10">
                      <p className="font-sans text-white text-[15px] sm:text-[16px] font-normal leading-[1.45] text-left drop-shadow-sm">
                        Tier-1 global scale across US, Canada, UK, Europe, & ANZ
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Box 7: TCPA Compliant Infrastructure */}
                <Reveal delay={180} className="h-full">
                  <div className="relative group overflow-hidden min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#2563EB] md:bg-[#111113] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 md:hover:shadow-black/50 hover:z-10 h-full">
                    {/* Top-left: Document / Shield Check Icon */}
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-300/80 md:border-neutral-700/80 bg-black md:bg-neutral-900/80 backdrop-blur-sm group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[36px]" />

                    <div className="relative z-10">
                      <p className="font-sans text-white text-[15px] sm:text-[16px] font-normal leading-[1.45] text-left drop-shadow-sm">
                        Centralized tech infrastructure with audit-ready TCPA compliance
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={270} className="h-full">
                  <div className="relative group overflow-hidden min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#111113] md:bg-[#2563EB] rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 md:hover:shadow-black/20 hover:z-10 h-full">
                    {/* Top-left: Handshake / Hand / Alignment Icon */}
                    <div className="relative z-10">
                      <div className="w-10 h-10 border border-neutral-700/80 md:border-neutral-300/80 bg-neutral-900/80 md:bg-black md:backdrop-blur-sm group-hover:border-[#F5A623]/40 flex items-center justify-center text-white transition-colors duration-200 ease-out">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-colors duration-200 ease-out group-hover:text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11l-3-3a2.121 2.121 0 00-3 0L10.5 10.5 8 8a2.121 2.121 0 00-3 0l-1 1a2.121 2.121 0 000 3l4.5 4.5a2.121 2.121 0 003 0l7-7a2.121 2.121 0 000-3z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5l3 3" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[36px]" />

                    <div className="relative z-10">
                      <p className="font-sans text-white text-[15px] sm:text-[16px] font-normal leading-[1.45] text-left drop-shadow-sm">
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

