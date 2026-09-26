"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { CropMarkFrame } from "@/components/ui/CropMarkFrame";

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
      className="relative bg-black text-white py-[60px] lg:py-[100px] overflow-hidden"
      aria-label="Client Testimonial"
    >
      {/* Header Container (Eyebrow removed, clean editorial heading) */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-8 sm:mb-12 text-center relative z-10">
        <SplitHeading
          as="h2"
          delay={0}
          lines={["They took the deal.", "Here's what happened."]}
          className="font-serif text-[clamp(34px,4.5vw,54px)] font-normal text-white tracking-[-0.025em] leading-[1.08] text-center mx-auto max-w-4xl"
        />
      </div>

      {/* Spotlight Card Container */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal delay={180}>
          <div className="relative">
            {/* Outer Frame with site's canonical crop marks */}
            <div className="relative p-1 sm:p-2 rounded-[20px] sm:rounded-[24px] bg-gradient-to-b from-neutral-800/80 via-neutral-900/40 to-neutral-800/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)]">
              <CropMarkFrame variant="dark" showDashedBorder={false} />

              {/* Two-Column Card Inner */}
              <div className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-[440px] sm:min-h-[480px] lg:min-h-[500px]">
                {/* ── LEFT COLUMN: Portrait Photo (~40% width, full height) ── */}
                <div className="relative w-full h-[300px] sm:h-[380px] lg:h-full lg:min-h-[500px] overflow-hidden bg-neutral-950">
                  <img
                    src={FEATURED_TESTIMONIAL.image}
                    alt={`${FEATURED_TESTIMONIAL.author} - ${FEATURED_TESTIMONIAL.title}`}
                    className="w-full h-full object-cover object-top select-none"
                  />

                  {/* Subtle edge blend on mobile and desktop */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/10 to-transparent lg:hidden" />
                  <div className="hidden lg:block absolute inset-y-0 right-0 w-12 pointer-events-none bg-gradient-to-l from-black/40 to-transparent" />
                </div>

                {/* ── RIGHT COLUMN: Solid #2563EB Blue Background with Geist Typography ── */}
                <div
                  className="relative p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between overflow-hidden border-t lg:border-t-0 lg:border-l border-neutral-800/80 select-none"
                  style={{ backgroundColor: FEATURED_TESTIMONIAL.bgColor }}
                >
                  {/* Top: Decorative Quote Mark & Large Quote in Geist */}
                  <div>
                    {/* Decorative Quote Mark Icon */}
                    <div className="mb-4 sm:mb-5 text-white" aria-hidden="true">
                      <svg
                        className="w-8 h-6 sm:w-9 sm:h-7 text-white fill-current opacity-95"
                        viewBox="0 0 40 32"
                      >
                        <path d="M0 19.2C0 8.6 7.2 0 17.6 0v6.4c-5.8 0-9.6 4.2-9.6 10.4h9.6V32H0V19.2zm22.4 0C22.4 8.6 29.6 0 40 0v6.4c-5.8 0-9.6 4.2-9.6 10.4H40V32H22.4V19.2z" />
                      </svg>
                    </div>

                    {/* Prominent Large Quote in Geist Sans */}
                    <blockquote className="m-0 p-0 border-none">
                      <p
                        style={{ fontFamily: "var(--font-geist)" }}
                        className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] text-white font-medium leading-[1.2] tracking-[-0.025em] max-w-[600px]"
                      >
                        {FEATURED_TESTIMONIAL.quote}
                      </p>
                    </blockquote>
                  </div>

                  {/* Bottom: Name, Company Name, and Logo Mark */}
                  <div className="mt-8 sm:mt-12 lg:mt-14">
                    {/* Author & Role Block */}
                    <div className="mb-4 sm:mb-5">
                      <div className="font-sans font-semibold text-white text-[17px] sm:text-[18px] tracking-tight">
                        {FEATURED_TESTIMONIAL.author}
                      </div>
                      <div className="font-sans text-[14px] sm:text-[15px] font-normal mt-0.5 text-white/80">
                        {FEATURED_TESTIMONIAL.title}, {FEATURED_TESTIMONIAL.company}
                      </div>
                    </div>

                    {/* Logo Mark Row */}
                    <div className="pt-3.5 border-t border-white/20 flex items-center">
                      <LogoApex />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
