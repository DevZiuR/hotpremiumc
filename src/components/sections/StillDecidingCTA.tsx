"use client";

import React from "react";

export function StillDecidingCTA() {
  return (
    <section className="relative bg-[#000000] px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Soft gold glow behind the text block. Ellipse stops well inside the
          box and ends on `transparent`, so no edge is ever visible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[min(1100px,130%)] -translate-x-1/2 -translate-y-[18%] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,162,75,0.12)_0%,rgba(201,162,75,0.05)_45%,transparent_72%)]"
      />

      {/* Centered content block */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Eyebrow */}
        <p className="font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60 mb-5 sm:mb-6">
          Still deciding?
        </p>

        {/* Headline — plain white serif, single colour, sentence case */}
        <h2 className="font-serif text-[clamp(34px,5vw,60px)] font-normal text-white tracking-[-0.02em] leading-[1.12] [text-wrap:balance]">
          Stop funding your own growth.
        </h2>

        {/* Primary — gold pill, matching the hero CTA */}
        <div className="mt-8 sm:mt-10 flex w-full flex-col items-center justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(to_bottom,#D9B25A,#BD9238)] border border-[rgba(255,255,255,0.35)] px-6 sm:px-7 py-3 sm:py-3.5 font-sans text-[14px] sm:text-[15px] font-semibold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_28px_rgba(201,162,75,0.3)] transition-all duration-200 hover:bg-[#E3BE68] hover:-translate-y-px active:translate-y-0"
          >
            <span>Apply for partnership</span>
            <svg
              className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Direct-contact fallback */}
          <a
            href="mailto:contact@hotpremiumcustomers.com"
            className="mt-5 text-[13px] font-sans text-white/55 underline decoration-transparent underline-offset-[4px] transition-colors duration-200 hover:text-[#C9A24B] hover:decoration-[#C9A24B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A24B]"
          >
            Questions first? Reach out directly
          </a>
        </div>
      </div>

      {/* Gold ribbon — centred below the content, both edges faded into #000 so
          it dissolves into the black section and the footer below it. The
          mt-14 / sm:mt-16 gap keeps well over 48px of clear black above the
          ribbon's visible crest; the section's bottom padding gives the full
          ribbon room to land. */}
      <div className="relative z-10 mx-auto mt-14 sm:mt-16 w-full max-w-5xl">
        <div className="relative">
          <img
            src="/media/hero-ribbon.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            data-lenis-parallax="0.85"
            className="w-full h-[110px] sm:h-[150px] lg:h-[180px] object-cover object-center will-change-transform"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#000000] via-[#000000]/55 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#000000] via-[#000000]/55 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#000000] via-[#000000]/55 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#000000] via-[#000000]/55 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
