"use client";

import React from "react";

export function StillDecidingCTA() {
  return (
    <section className="relative bg-[#000000] px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 overflow-hidden">
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

        {/* Subtext */}
        <p className="font-sans text-[15px] sm:text-[17px] font-normal leading-[1.6] text-white/55 max-w-[520px] mt-5 sm:mt-6 [text-wrap:balance]">
          Questions before you apply? Reach out directly.
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
          {/* Primary — solid white, black text */}
          <a
            href="mailto:contact@hotpremiumcustomers.com"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 sm:px-8 py-3.5 font-sans text-[14px] sm:text-[15px] font-semibold text-black transition-colors duration-200 hover:bg-white/90"
          >
            <span>Talk to us</span>
            <svg
              className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          {/* Secondary — transparent, hairline border */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-7 sm:px-8 py-3.5 font-sans text-[14px] sm:text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/5"
          >
            Apply for partnership
          </a>
        </div>
      </div>

      {/* Gold ribbon — centred below the buttons, both edges faded into #000 so
          it dissolves into the black section and the footer below it. */}
      <div className="relative z-10 mx-auto mt-14 sm:mt-20 w-full max-w-5xl">
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
