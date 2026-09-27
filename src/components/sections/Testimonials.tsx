"use client";

import React from "react";
import { SplitHeading } from "@/components/SplitHeading";
import DotField from "@/components/DotField";

// Company logo mark for Apex Logistics (clean monochrome SVG emblem)
function LogoApex() {
  return (
    <div className="flex items-center gap-2 text-white" aria-label="Apex Logistics mark">
      <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 32 32" strokeWidth="1.5">
        <polygon points="16 4 28 24 4 24" stroke="currentColor" strokeLinejoin="round" />
        <polygon points="16 11 23 23 9 23" fill="currentColor" fillOpacity="0.3" />
        <circle cx="16" cy="19" r="2" fill="currentColor" />
      </svg>
      <span className="font-sans text-[12px] font-semibold tracking-[0.06em] uppercase text-white">
        Apex Logistics
      </span>
    </div>
  );
}

const FEATURED_TESTIMONIAL = {
  quote:
    "“No upfront retainer, no management fee — they put their own capital behind us. That total alignment changed our growth trajectory completely.”",
  author: "Devon Price",
  title: "Operations Lead",
  company: "Apex Logistics",
  image: "/media/headshots/headshot-1.jpg",
  bgColor: "#2563EB",
};

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-[#09090b] text-white py-[60px] lg:py-[100px] overflow-hidden"
      aria-label="Client Testimonial"
    >
      {/* Header Container (Eyebrow removed, clean editorial heading) */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-8 sm:mb-12 text-center relative z-10">
        <SplitHeading
          as="h2"
          delay={0}
          lines={["They took the deal.", "Here's what happened."]}
          className="font-serif text-[clamp(38px,4.5vw,54px)] font-normal text-white tracking-[-0.025em] leading-[1.08] text-center mx-auto max-w-4xl"
        />
      </div>

      {/* Spotlight Card Container */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean borderless card with smooth rounded corners */}
          <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-[330px] sm:min-h-[360px] lg:min-h-[375px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)]">
            {/* ── LEFT COLUMN: Portrait Photo (~40% width, full height) ── */}
            <div className="relative w-full h-[230px] sm:h-[285px] lg:h-full lg:min-h-[375px] overflow-hidden bg-neutral-950">
              <img
                src={FEATURED_TESTIMONIAL.image}
                alt={`${FEATURED_TESTIMONIAL.author} - ${FEATURED_TESTIMONIAL.title}`}
                className="w-full h-full object-cover object-top select-none"
              />

              {/* Subtle edge blend on mobile and desktop */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/10 to-transparent lg:hidden" />
              <div className="hidden lg:block absolute inset-y-0 right-0 w-12 pointer-events-none bg-gradient-to-l from-black/40 to-transparent" />
            </div>

            {/* ── RIGHT COLUMN: Solid #2563EB Blue Background with Geist Typography & Decorative Elements ── */}
            <div
              className="relative p-6 sm:p-8 lg:p-9 xl:p-10 flex flex-col justify-between overflow-hidden select-none"
              style={{ backgroundColor: FEATURED_TESTIMONIAL.bgColor }}
            >
              {/* Faint DotField canvas background */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <DotField
                  baseOpacity={0.12}
                  size={1.4}
                  spacing={26}
                  maskImage="radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)"
                />
              </div>

              {/* Faint Orbit-Ring / Wireframe motif */}
              <svg
                aria-hidden="true"
                className="absolute -left-11 -bottom-11 w-[230px] h-[230px] sm:w-[290px] sm:h-[290px] pointer-events-none opacity-15 text-white"
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

              {/* Faint Frequency Waveform motif */}
              <svg
                aria-hidden="true"
                className="absolute -right-3 bottom-0 w-[124px] sm:w-[170px] h-[75%] pointer-events-none opacity-15 text-white"
                viewBox="0 0 200 360"
                fill="none"
                stroke="currentColor"
              >
                {Array.from({ length: 30 }).map((_, i) => {
                  const y = 330 - i * 10;
                  const progress = i / 30;
                  const spread = Math.sin(Math.pow(1 - progress, 0.72) * Math.PI);
                  const width = 12 + spread * 150;
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

              {/* Top: Decorative Quote Mark & Large Quote in Geist */}
              <div className="relative z-10">
                {/* Decorative Quote Mark Icon */}
                <div className="mb-3 sm:mb-4 text-white" aria-hidden="true">
                  <svg
                    className="w-6 h-5 sm:w-7 sm:h-[22px] text-white fill-current opacity-95"
                    viewBox="0 0 40 32"
                  >
                    <path d="M0 19.2C0 8.6 7.2 0 17.6 0v6.4c-5.8 0-9.6 4.2-9.6 10.4h9.6V32H0V19.2zm22.4 0C22.4 8.6 29.6 0 40 0v6.4c-5.8 0-9.6 4.2-9.6 10.4H40V32H22.4V19.2z" />
                  </svg>
                </div>

                {/* Prominent Large Quote in Geist Sans */}
                <blockquote className="m-0 p-0 border-none">
                  <p
                    style={{ fontFamily: "var(--font-geist)" }}
                    className="text-[20px] sm:text-[25px] md:text-[28px] lg:text-[31px] text-white font-medium leading-[1.2] tracking-[-0.025em] max-w-[460px]"
                  >
                    {FEATURED_TESTIMONIAL.quote}
                  </p>
                </blockquote>
              </div>

              {/* Bottom: Name, Company Name, and Logo Mark */}
              <div className="mt-6 sm:mt-8 lg:mt-9 relative z-10">
                {/* Author & Role Block */}
                <div className="mb-3 sm:mb-3.5">
                  <div className="font-sans font-semibold text-white text-[15px] sm:text-[16px] tracking-tight">
                    {FEATURED_TESTIMONIAL.author}
                  </div>
                  <div className="font-sans text-[13px] sm:text-[14px] font-normal mt-0.5 text-white/80">
                    {FEATURED_TESTIMONIAL.title}, {FEATURED_TESTIMONIAL.company}
                  </div>
                </div>

                {/* Logo Mark Row */}
                <div className="pt-3 border-t border-white/20 flex items-center">
                  <LogoApex />
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
