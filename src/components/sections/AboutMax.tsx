"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { VisualReveal } from "@/components/VisualReveal";

export function AboutMax() {
  const goldText: React.CSSProperties = {
    background: "linear-gradient(to right, #F3E3B5 0%, #C9A24B 55%, #9A7B3C 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
    <section id="about-founder" className="relative bg-[#000000] pt-[80px] pb-[36px] lg:pt-[140px] lg:pb-[140px] overflow-hidden font-sans">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-20 items-center">

          {/* ── Eyebrow + Heading (always first on mobile, hidden on desktop — content col handles it) ── */}
          <div className="lg:hidden">
            <SplitHeading
              as="h2"
              delay={90}
              lines={["A track record,", "not a promise."]}
              className="font-serif section-h2 font-normal text-white tracking-[-0.025em] mb-0"
            />
          </div>

          {/* ── Founder Photo Card with VisualReveal at 270ms (below heading on mobile, left col on desktop) ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:order-1">
            <VisualReveal delay={270} className="w-full max-w-[320px] sm:max-w-[520px] rounded-2xl lg:rounded-3xl border border-[rgba(255,255,255,0.08)]">
              <div className="relative w-full aspect-square rounded-2xl lg:rounded-3xl overflow-hidden bg-[#111418] group">
                <Image
                  src="/media/max-pfp.jpg"
                  alt="Max — Founder of Hot Premium Customers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </VisualReveal>
          </div>

          {/* ── Right Column: Full content (desktop shows heading here too; mobile heading already above) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:order-2">
            {/* Eyebrow + Heading — desktop only, staggered via separate Reveal wrappers */}
            <div className="hidden lg:block">
              {/* eyebrow: delay=0 */}

              {/* heading: delay=90 */}
              <SplitHeading
                as="h2"
                delay={90}
                lines={["The Founder"]}
                className="font-serif section-h2 font-normal text-white tracking-[-0.025em] mb-4 sm:mb-6"
              />
            </div>

            {/* Body Copy: delay=180 */}
            <Reveal delay={180}>
              <div className="space-y-3.5 sm:space-y-4 font-sans text-[17px] text-white/70 leading-[1.6] max-w-[62ch] font-normal mt-4 lg:mt-0">
                <p>
                  I&apos;m Max, and I built Hot Premium Customers from years of scaling businesses through paid media, customer acquisition, and sales infrastructure.
                </p>
                <p>
                  Before this, I built an ecommerce business and two agencies, helping companies scale to $52M/year, $50M in ten months, and seven figures in their first year.
                </p>
                <p>
                  Now, we put that same growth infrastructure behind businesses we partner with.
                </p>
              </div>
            </Reveal>

            {/* Track Record Stat Highlights — minimal gold-gradient row, no cards */}
            <div className="relative mt-8 sm:mt-10">
              {/* faint warm radial glow, fully fading to black */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-80px_-100px] select-none"
                style={{
                  background:
                    "radial-gradient(ellipse 85% 90% at 50% 50%, rgba(201,162,75,0.045) 0%, rgba(201,162,75,0.02) 50%, rgba(0,0,0,0) 80%)",
                }}
              />
              <div className="relative grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-8 lg:gap-12">
                <div className="text-center sm:text-left">
                  <div
                    className="font-serif font-normal tracking-tight leading-[1] text-[32px] sm:text-[44px] lg:text-[52px] tabular-nums"
                    style={goldText}
                  >
                    $52M/yr
                  </div>
                  <div className="mt-2 font-sans text-[14px] sm:text-[15px] font-normal leading-normal text-[rgba(255,255,255,0.6)]">
                    Coaching Company
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div
                    className="font-serif font-normal tracking-tight leading-[1] text-[32px] sm:text-[44px] lg:text-[52px] tabular-nums"
                    style={goldText}
                  >
                    $50M
                  </div>
                  <div className="mt-2 font-sans text-[14px] sm:text-[15px] font-normal leading-normal text-[rgba(255,255,255,0.6)]">
                    In 10 Months (Medical)
                  </div>
                </div>
                <div className="col-span-2 text-center sm:col-span-1 sm:text-left">
                  <div
                    className="font-serif font-normal tracking-tight leading-[1] text-[32px] sm:text-[44px] lg:text-[52px] tabular-nums"
                    style={goldText}
                  >
                    7-Figure
                  </div>
                  <div className="mt-2 font-sans text-[14px] sm:text-[15px] font-normal leading-normal text-[rgba(255,255,255,0.6)]">
                    Apparel First Year
                  </div>
                </div>
              </div>
            </div>

            {/* Closing CTA — transparent text link with arrow */}
            <Reveal delay={340}>
              <a
                href="https://maxavhq.com/"
                className="group mt-7 sm:mt-9 inline-flex items-center gap-2 font-sans text-[14px] sm:text-[15px] font-semibold text-white underline decoration-white/30 underline-offset-[6px] hover:decoration-white/70 transition-colors duration-200 cursor-pointer"
              >
                <span>More about me</span>
                <svg
                  className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}

// Re-export for backward compatibility
export { AboutMax as LocalMarkets };
