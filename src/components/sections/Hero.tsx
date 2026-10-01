"use client";

import React, { useState, useEffect } from "react";

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const getEntranceStyle = (delayMs: number): React.CSSProperties => {
    return {
      opacity: isMounted ? 1 : 0,
      transform: isMounted ? "translateY(0px)" : "translateY(16px)",
      transitionProperty: "opacity, transform",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delayMs}ms`,
      willChange: "opacity, transform",
    };
  };

  return (
    <section className="relative w-full bg-black overflow-hidden pt-16 md:pt-[72px] pb-16 sm:pb-20 md:pb-24 lg:pb-28 border-b border-white/10">
      {/* Centered architectural grid container with vertical guide borders */}
      <div className="relative max-w-7xl mx-auto border-x border-white/10 min-h-[calc(100vh-72px)] flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-12 pt-14 sm:pt-20 md:pt-20 lg:pt-20 pb-[calc(clamp(110px,_20vh,_220px)_+_26px)] sm:pb-[calc(clamp(115px,_20vh,_230px)_+_24px)] md:pb-[calc(clamp(120px,_20vh,_260px)_+_22px)] lg:pb-[calc(clamp(120px,_20vh,_260px)_+_20px)] xl:pb-[calc(clamp(120px,_20vh,_260px)_+_20px)] overflow-hidden">

        {/* Main Hero Content */}
        <div className="relative z-20 flex flex-col items-center text-center w-full max-w-6xl mx-auto">

          {/* 1. Pill badge */}
          <div style={getEntranceStyle(0)}>
            <div
              className="inline-flex items-center gap-2 mb-4 sm:mb-6 md:mb-8 rounded-full border px-3.5 py-1.5 bg-white/[0.06] border-white/15 shadow-xs"
            >
              <span
                className="block flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[#2563EB] shadow-xs"
                aria-hidden="true"
              />
              <span className="font-sans text-[12px] sm:text-[12.5px] font-semibold tracking-[0.12em] uppercase text-neutral-200">
                Equity partnerships
              </span>
            </div>
          </div>

          {/* 2. H1 Headline */}
          <h1
            aria-label="We Fund Your Growth. You Keep the Business."
            className="font-serif text-[clamp(50px,12.9vw,58px)] sm:text-[9.05vw] md:text-[clamp(54px,7.8vw,92px)] lg:text-[clamp(62px,7.8vw,112px)] font-medium text-white w-full mb-4 sm:mb-6 md:mb-8 tracking-[-0.025em] leading-[1.02] sm:leading-[1.025] sm:whitespace-nowrap"
          >
            <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
              <span className="block" style={getEntranceStyle(100)}>
                We Fund Your Growth.
              </span>
            </span>
            <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
              <span className="block" style={getEntranceStyle(200)}>
                You Keep the Business.
              </span>
            </span>
          </h1>

          {/* 3. Subheading */}
          <p
            className="font-sans font-normal text-neutral-400 text-[18px] sm:text-[18px] md:text-[20px] leading-[1.4] max-w-[720px] mx-auto mb-8 sm:mb-10 md:mb-12 [text-wrap:balance]"
            style={getEntranceStyle(300)}
          >
            We put our ad budget, sales team, and technology behind operators with a proven offer. No retainer. No management fee.
          </p>

          {/* 4. CTA Button (sleek dark pill with ambient shadow) */}
          <div style={getEntranceStyle(400)}>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 bg-[#18181b] hover:bg-black text-white font-sans font-medium text-[15.5px] sm:text-[17px] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-[0_14px_32px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_42px_rgba(0,0,0,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              <span>Apply for Partnership</span>
              <svg
                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>

      </div>

      {/* Bottom hero visual: ribbon band floating a small gap below the CTA,
          fully visible above the fold. Bottom padding above reserves exactly
          band height + lift + text gap. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 pointer-events-none select-none"
        style={getEntranceStyle(500)}
      >
        <div className="relative w-full">
          <img
            src="/media/hero-ribbon.png"
            alt=""
            className="w-full h-[clamp(110px,20vh,220px)] sm:h-[clamp(115px,20vh,230px)] md:h-[clamp(120px,20vh,260px)] lg:h-[clamp(120px,20vh,260px)] xl:h-[clamp(120px,20vh,260px)] object-cover object-[50%_50%]"
            draggable={false}
          />
          {/* Dark gradient fade over the top of the image blending into the black above */}
          <div className="absolute inset-x-0 top-0 h-[32%] bg-gradient-to-b from-black via-black/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
