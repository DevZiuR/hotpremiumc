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
    <section className="relative w-full bg-white overflow-hidden pt-16 md:pt-[72px] border-b border-black/[0.08]">
      {/* Centered architectural grid container with vertical guide borders */}
      <div className="relative max-w-7xl mx-auto border-x border-black/[0.08] min-h-[calc(100vh-72px)] flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-12 py-14 sm:py-20 md:py-28 overflow-hidden">

        {/* Framing: Sweeping precision spline with technical node */}
        <div
          className="absolute -bottom-4 -left-6 sm:left-0 md:left-2 lg:left-4 w-[280px] sm:w-[380px] md:w-[460px] lg:w-[500px] pointer-events-none z-10 select-none hidden sm:block"
          style={getEntranceStyle(250)}
        >
          <div className="relative">
            <svg
              viewBox="0 0 500 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto overflow-visible"
            >
              {/* Secondary subtle dashed guideline (increased 33% from 1.5 to 2) */}
              <path
                d="M 10 330 C 35 235, 105 190, 150 265 C 190 325, 110 365, 75 305 C 45 230, 120 145, 230 230 C 290 280, 365 295, 425 240"
                stroke="rgba(0,0,0,0.12)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              {/* Main architectural precision spline (increased 40% from 2.5 to 3.5) */}
              <path
                d="M 10 330 C 35 235, 105 190, 150 265 C 190 325, 110 365, 75 305 C 45 230, 120 145, 230 230 C 290 280, 365 295, 425 240"
                stroke="#0A0A0A"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Terminal precision reticle node (stroke increased 35% from 2 to 2.7) */}
              <circle cx="425" cy="240" r="14" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.7" />
              <circle cx="425" cy="240" r="5" fill="#2563EB" />
            </svg>
          </div>
        </div>

        {/* Top-Right Framing: Sweeping precision spline tucked safely in the top-right margin */}
        <div
          className="absolute top-2 sm:top-4 md:top-6 right-0 sm:right-2 md:right-4 lg:right-6 w-[200px] sm:w-[250px] md:w-[290px] lg:w-[330px] pointer-events-none z-10 select-none hidden sm:block"
          style={getEntranceStyle(250)}
        >
          <div className="relative">
            <svg
              viewBox="0 0 340 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto overflow-visible"
            >
              {/* Secondary subtle dashed guideline (increased 33% from 1.5 to 2) */}
              <path
                d="M 330 20 C 280 15, 230 50, 220 100 C 210 150, 260 170, 285 135 C 300 110, 280 70, 220 80 C 180 90, 160 140, 170 180"
                stroke="rgba(0,0,0,0.12)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              {/* Main architectural precision spline (increased 40% from 2.5 to 3.5) */}
              <path
                d="M 330 20 C 280 15, 230 50, 220 100 C 210 150, 260 170, 285 135 C 300 110, 280 70, 220 80 C 180 90, 160 140, 170 180"
                stroke="#0A0A0A"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Terminal precision reticle node (stroke increased 35% from 2 to 2.7) */}
              <circle cx="170" cy="180" r="11" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.7" />
              <circle cx="170" cy="180" r="4" fill="#2563EB" />
            </svg>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-20 flex flex-col items-center text-center w-full max-w-6xl mx-auto">

          {/* 1. Pill badge */}
          <div style={getEntranceStyle(0)}>
            <div
              className="inline-flex items-center gap-2 mb-4 sm:mb-6 md:mb-8 rounded-full border px-3.5 py-1.5 bg-neutral-100/70 border-neutral-200/80 shadow-xs"
            >
              <span
                className="block flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[#2563EB]"
                aria-hidden="true"
              />
              <span className="font-sans text-[12px] sm:text-[12.5px] font-semibold tracking-[0.12em] uppercase text-neutral-800">
                Equity partnerships
              </span>
            </div>
          </div>

          {/* 2. H1 Headline */}
          <h1
            aria-label="We Fund Your Growth. You Keep the Business."
            className="font-serif text-[clamp(46px,11.5vw,54px)] sm:text-[8.5vw] md:text-[clamp(54px,7.8vw,92px)] lg:text-[clamp(62px,7.8vw,112px)] font-normal text-[#000000] w-full mb-4 sm:mb-6 md:mb-8 tracking-[-0.025em] leading-[1.05] sm:leading-[1.03] sm:whitespace-nowrap"
          >
            <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
              <span className="block" style={getEntranceStyle(100)}>
                We Fund Your{" "}
                <span className="inline-block align-baseline mx-[0.06em] px-[0.24em] py-[0.02em] rounded-[0.22em] bg-[#2563EB] text-white transition-[background-color,color,transform] duration-200 ease-out hover:bg-[#1D4ED8] hover:scale-[1.02] cursor-pointer select-none font-normal shadow-xs">
                  Growth
                </span>
                .
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
            className="font-sans font-normal text-[#666666] text-[18px] sm:text-[18px] md:text-[20px] leading-[1.4] max-w-[720px] mx-auto mb-8 sm:mb-10 md:mb-12 [text-wrap:balance]"
            style={getEntranceStyle(300)}
          >
            We put our ad budget, sales team, and technology behind operators with a proven offer. No retainer. No management fee.
          </p>

          {/* 4. CTA Button (sleek dark pill with ambient shadow) */}
          <div style={getEntranceStyle(400)}>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center bg-[#18181b] hover:bg-black text-white font-sans font-medium text-[15.5px] sm:text-[17px] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-[0_14px_32px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_42px_rgba(0,0,0,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              <span>Apply for Partnership</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
