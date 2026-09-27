"use client";

import React from "react";
import DotField from "@/components/DotField";

// Upward-trending arrow icon (thin stroke, no fill)
function IconTrendingUp() {
  return (
    <svg
      className="inline-block w-[0.75em] h-[0.75em] ml-1.5 -mt-0.5 align-middle shrink-0"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 14 8.5 8.5 12 12 17 6" />
      <polyline points="12 6 17 6 17 11" />
    </svg>
  );
}

export function StillDecidingCTA() {
  return (
    <section className="bg-[#020509] pb-6 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[24px] bg-[#2563EB] text-white py-16 sm:py-20 md:py-24 px-6 sm:px-12 lg:px-16 text-center shadow-2xl">
          {/* Top-left window decorative dots */}
          <div
            className="absolute top-5 left-6 sm:top-6 sm:left-8 flex items-center gap-1.5 opacity-30 select-none pointer-events-none"
            aria-hidden="true"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>

          {/* Faint DotField canvas background */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <DotField
              baseOpacity={0.12}
              size={1.4}
              spacing={26}
              maskImage="radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)"
            />
          </div>

          {/* Left decorative element: Orbit-ring / wireframe globe motif */}
          <svg
            aria-hidden="true"
            className="absolute -left-12 -bottom-16 sm:-bottom-12 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] pointer-events-none opacity-15 text-white"
            viewBox="0 0 400 400"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="200" cy="200" r="180" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="200" cy="200" rx="180" ry="120" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="180" ry="60" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="120" ry="180" strokeWidth="1" strokeDasharray="4 4" />
            <ellipse cx="200" cy="200" rx="60" ry="180" strokeWidth="1" />
          </svg>

          {/* Right decorative element: Frequency waveform / soundwave motif */}
          <svg
            aria-hidden="true"
            className="absolute -right-4 sm:right-6 bottom-0 w-[180px] sm:w-[260px] h-[85%] pointer-events-none opacity-15 text-white"
            viewBox="0 0 200 360"
            fill="none"
            stroke="currentColor"
          >
            {Array.from({ length: 34 }).map((_, i) => {
              const y = 330 - i * 9.2;
              const progress = i / 34;
              const spread = Math.sin(Math.pow(1 - progress, 0.72) * Math.PI);
              const width = 14 + spread * 165;
              const x1 = 100 - width / 2;
              const x2 = 100 + width / 2;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  strokeWidth={i % 3 === 0 ? "1.5" : "0.8"}
                  strokeDasharray={i % 4 === 0 ? "2 2" : undefined}
                />
              );
            })}
          </svg>

          {/* Centered Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Eyebrow */}
            {/*
              <div className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-white/80 mb-3 sm:mb-4">
                Still deciding?
              </div>*/}

            {/* Two-line serif heading with highlighted 'own growth' pill */}
            <h2 className="font-serif text-[clamp(34px,5.5vw,62px)] font-normal text-white tracking-[-0.025em] leading-[1.12] mb-3 sm:mb-4 [text-wrap:balance]">
              Stop funding
              <br />
              your{" "}
              <span className="inline-flex items-center align-middle mx-1 my-0.5 px-[10px] py-[2px] sm:px-[12px] sm:py-[3px] rounded-[10px] bg-white text-[#2563EB] shadow-sm transition-[background-color,color,transform] duration-[250ms] ease-out hover:bg-white/15 hover:text-white hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 cursor-pointer select-none">
                <span>own growth</span>
                <IconTrendingUp />
              </span>
              .
            </h2>

            {/* Subcopy */}
            <p className="font-sans text-[15px] sm:text-[17px] text-white/85 font-normal tracking-[-0.01em] mb-7 sm:mb-9 max-w-lg">
              Questions before you apply? Reach out directly.
            </p>

            {/* Single centered CTA button */}
            <a
              href="mailto:contact@hotpremiumcustomers.com" /* [INSERT: mailto address, phone, or Calendly link once decided] */
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-white text-[#2563EB] font-sans text-[14px] sm:text-[15px] font-semibold shadow-md shadow-black/10 hover:bg-neutral-50 hover:shadow-lg transition-all duration-200 active:scale-[0.98] group"
            >
              <span>TALK TO US</span>
              <span
                className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px] font-bold transition-transform duration-200 group-hover:translate-x-0.5 uppercase"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
