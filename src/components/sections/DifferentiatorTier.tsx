import React from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function DifferentiatorTier() {
  return (
    <section className="bg-navy text-paper py-16 md:py-24 border-b border-line/20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeading
          eyebrow="The Differentiator"
          title="We Put Capital at Risk Before Yours"
          description="Traditional agencies charge $10k/mo retainers and gamble with your ad budget. We invest our own money, build your infrastructure, and only participate in the upside."
          theme="dark"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {/* Block 1: 100% Ad Spend & Acquisition Funding */}
          <Reveal delay={100}>
            <div className="h-full border border-white/15 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 border border-white/20 bg-white/10 flex items-center justify-center text-white mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-white text-h3 font-semibold mb-3">
                  100% Media Spend &amp; Acquisition Funded
                </h3>
                <p className="font-sans text-body text-slate/90 leading-relaxed mb-6 font-normal">
                  You never write a check for media buying, campaign creative, or audience testing. We fund the entire front-end acquisition engine directly out of our own pocket.
                </p>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6">
                <span className="font-sans text-small text-white/80 font-medium">
                  Result: Zero downside risk for your balance sheet.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Block 2: Full Sales Force & Operational Infrastructure */}
          <Reveal delay={200}>
            <div className="h-full border border-white/15 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 border border-white/20 bg-white/10 flex items-center justify-center text-white mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-serif text-white text-h3 font-semibold mb-3">
                  Dedicated Sales Infrastructure &amp; Labor
                </h3>
                <p className="font-sans text-body text-slate/90 leading-relaxed mb-6 font-normal">
                  Generating volume is only half the battle. We install trained setters, closers, and operational staffing under your brand, held to our performance numbers.
                </p>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6">
                <span className="font-sans text-small text-white/80 font-medium">
                  Result: Your team stays focused on product execution.
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <Button variant="outline" href="#contact" className="!border-white/30 !bg-white/10 !text-white hover:!bg-white hover:!text-navy">
              Explore Portfolio Requirements
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
