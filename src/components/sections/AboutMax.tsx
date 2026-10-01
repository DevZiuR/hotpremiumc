"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { VisualReveal } from "@/components/VisualReveal";
import { Button } from "@/components/ui/Button";

function useCountUp(target: number, duration: number = 1800, delay: number = 0, start: boolean = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) {
        setValue(target);
        return;
      }
    }

    if (!start) {
      setValue(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;
    let delayTimeoutId: ReturnType<typeof setTimeout>;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart: launches quickly, then settles into the final value
      // slowly enough to read as a deliberate count rather than a snap.
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(easedProgress * target);
      setValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    delayTimeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, delay, start]);

  return value;
}

export function AboutMax() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          // Once triggered, disconnect — no need to reset on scroll-out
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stat1 = useCountUp(52, 1800, 250, hasTriggered);
  const stat2 = useCountUp(50, 1800, 400, hasTriggered);
  const stat3 = useCountUp(7, 1800, 550, hasTriggered);

  return (
    <section id="about-founder" className="relative bg-[#09090b] pt-[80px] pb-[36px] lg:pt-[140px] lg:pb-[140px] overflow-hidden font-sans">
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
            <VisualReveal delay={270} className="w-full max-w-[320px] sm:max-w-[520px] rounded-2xl lg:rounded-3xl p-[7px] bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_18px_44px_-12px_rgba(0,0,0,0.85)]">
              <div className="relative w-full aspect-square rounded-xl lg:rounded-2xl overflow-hidden bg-[#111418] group">
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

            {/* Track Record Stat Highlights */}
            <Reveal delay={270}>
              <div ref={statsRef} className="mt-6 sm:mt-8 rounded-[22px] lg:rounded-[26px] bg-white/[0.035] border border-white/10 p-2.5 sm:p-3">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-[16px] lg:rounded-[20px] bg-white/[0.06] px-2.5 sm:px-5 py-4 sm:py-6 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="font-serif text-[24px] sm:text-[34px] lg:text-[40px] text-white font-normal tracking-tight leading-tight mb-1 sm:mb-2">
                      <span>$</span>
                      <span className="tabular-nums">{hasTriggered ? stat1 : 0}</span>
                      <span>M/yr</span>
                    </div>
                    <div className="font-sans text-[11px] sm:text-[12.5px] text-white/55">Coaching Company</div>
                  </div>
                  <div className="rounded-[16px] lg:rounded-[20px] bg-white/[0.06] border-l border-white/[0.12] pl-2.5 sm:pl-5 pr-2.5 sm:pr-5 py-4 sm:py-6 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="font-serif text-[24px] sm:text-[34px] lg:text-[40px] text-white font-normal tracking-tight leading-tight mb-1 sm:mb-2">
                      <span>$</span>
                      <span className="tabular-nums">{hasTriggered ? stat2 : 0}</span>
                      <span>M</span>
                    </div>
                    <div className="font-sans text-[11px] sm:text-[12.5px] text-white/55">In 10 Months (Medical)</div>
                  </div>
                  <div className="rounded-[16px] lg:rounded-[20px] bg-white/[0.06] border-l border-white/[0.12] pl-2.5 sm:pl-5 pr-2.5 sm:pr-5 py-4 sm:py-6 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="font-serif text-[24px] sm:text-[34px] lg:text-[40px] text-white font-normal tracking-tight leading-tight mb-1 sm:mb-2">
                      <span className="tabular-nums">{hasTriggered ? stat3 : 0}</span>
                      <span>-Figure</span>
                    </div>
                    <div className="font-sans text-[11px] sm:text-[12.5px] text-white/55">Apparel First Year</div>
                  </div>
                </div>
              </div>
            </Reveal>

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
