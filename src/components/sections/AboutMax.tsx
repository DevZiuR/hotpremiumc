"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";

function useCountUp(target: number, duration: number = 1400, delay: number = 0, start: boolean = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
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
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
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
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasTriggered(true);
      return;
    }

    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
        } else {
          setHasTriggered(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stat1 = useCountUp(52, 1400, 0, hasTriggered);
  const stat2 = useCountUp(50, 1400, 100, hasTriggered);
  const stat3 = useCountUp(7, 1300, 200, hasTriggered);

  return (
    <section id="about-founder" className="relative !bg-[09090b] py-[80px] lg:py-[140px] border-b border-gray-200/80 overflow-hidden font-sans">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
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
              <h2 className="font-serif !text-[clamp(38px,5vw,59px)] font-normal text-black tracking-[-0.025em] leading-[1.05] mb-0">
                A track record, not a promise.
              </h2>
            </Reveal>
          </div>

          {/* ── Founder Photo Card (below heading on mobile, left col on desktop) ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:order-1">
            <Reveal delay={100} className="w-full max-w-[320px] sm:max-w-[520px]">
              <div className="relative w-full aspect-square rounded-2xl lg:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xl group">
                <Image
                  src="/media/max-pfp.jpg"
                  alt="Max — Founder of Hot Premium Customers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
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

                <h2 className="font-serif text-[clamp(38px,5vw,60px)] font-normal text-black tracking-[-0.025em] leading-[1.05] mb-4 sm:mb-6">
                  A track record, not a promise.
                </h2>
              </div>

              {/* Body Copy */}
              <div className="space-y-3.5 sm:space-y-4 font-sans text-[17px] text-gray-600 leading-[1.6] max-w-[62ch] font-normal mt-4 lg:mt-0">
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

              {/* Track Record Stat Highlights */}
              <div ref={statsRef} className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-gray-100">
                <div className="p-3 sm:p-0 rounded-lg bg-gray-50/70 sm:bg-transparent flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="font-serif text-[26px] sm:text-[34px] lg:text-[40px] text-black font-normal tracking-tight leading-tight mb-0.5 sm:mb-1">
                    <span>$</span>
                    <span className="tabular-nums">{hasTriggered ? stat1 : 0}</span>
                    <span>M/yr</span>
                  </div>
                  <div className="font-sans text-xs sm:text-[12.5px] text-gray-500">Coaching Company</div>
                </div>
                <div className="p-3 sm:p-0 rounded-lg bg-gray-50/70 sm:bg-transparent flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="font-serif text-[26px] sm:text-[34px] lg:text-[40px] text-black font-normal tracking-tight leading-tight mb-0.5 sm:mb-1">
                    <span>$</span>
                    <span className="tabular-nums">{hasTriggered ? stat2 : 0}</span>
                    <span>M</span>
                  </div>
                  <div className="font-sans text-xs sm:text-[12.5px] text-gray-500">In 10 Months (Medical)</div>
                </div>
                <div className="p-3 sm:p-0 rounded-lg bg-gray-50/70 sm:bg-transparent flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="font-serif text-[26px] sm:text-[34px] lg:text-[40px] text-black font-normal tracking-tight leading-tight mb-0.5 sm:mb-1">
                    <span className="tabular-nums">{hasTriggered ? stat3 : 0}</span>
                    <span>-Figure</span>
                  </div>
                  <div className="font-sans text-xs sm:text-[12.5px] text-gray-500">Apparel First Year</div>
                </div>
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
