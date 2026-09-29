"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SplitHeading } from "@/components/SplitHeading";

export interface CaseStudyItem {
  id: string;
  number: string;
  tabLabel: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  visual?: string;
  accentGlow?: string;
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "aig",
    number: "1",
    tabLabel: "AIG",
    quote:
      "“Markie and the Poetic team have the potential to redefine how companies manage complex workflows. Using sophisticated technology and process reengineering, they have achieved 99%+ quality outcomes on multi-hour processes - delivering real enterprise value.”",
    author: "Peter Zaffino",
    title: "Executive Chairman, AIG",
    company: "AIG",
    avatar: "/media/case-studies/peter-zaffino.jpg",
  },
  {
    id: "sofi",
    number: "2",
    tabLabel: "SOFI",
    quote:
      "“Partnering with the team allowed us to accelerate high-intent customer acquisition without inflating our target CAC. Their proprietary underwriting workflows and media deployment delivered 3.4x volume growth in under four months.”",
    author: "Anthony Noto",
    title: "Head of Growth & Operations, SoFi",
    company: "SOFI",
    avatar: "/media/headshots/headshot-1.jpg",
  },
  {
    id: "chime",
    number: "3",
    tabLabel: "CHIME",
    quote:
      "“Their performance-driven capital model eliminated friction across our member acquisition pipeline. We scaled to over 140,000 qualified accounts while maintaining institutional-grade compliance and stellar unit economics.”",
    author: "Sarah Holloway",
    title: "VP of Acquisition & Media, Chime",
    company: "CHIME",
    avatar: "/media/headshots/headshot-2.jpg",
  },
];

export function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const total = CASE_STUDIES.length;
  const current = CASE_STUDIES[activeIndex];

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  const handleSelect = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  // Keyboard navigation when section is in view or focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      id="case-studies"
      className="relative bg-black text-white py-12 sm:py-16 lg:py-20 overflow-hidden border-t border-b border-neutral-900 select-none"
      aria-label="Case Studies and Client Testimonials"
    >
      {/* Header Container */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 mb-8 sm:mb-10 lg:mb-12 text-center relative z-10">
        <SplitHeading
          as="h2"
          delay={0}
          lines={["They took the deal.", "Here's what happened."]}
          className="font-serif section-h2 font-normal text-white tracking-[-0.025em] text-center mx-auto max-w-4xl"
        />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── TOP BAR: Large Slide Number ── */}
        <div className="flex items-start justify-between">
          {/* Big minimalist number */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={{ opacity: 0, y: direction >= 0 ? 15 : -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction >= 0 ? -15 : 15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-bold text-6xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none"
              >
                {current.number}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── CENTER: Large Statement Quote ── */}
        <div className="my-8 sm:my-10 lg:my-12 min-h-[150px] sm:min-h-[170px] lg:min-h-[190px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={{ opacity: 0, y: direction >= 0 ? 20 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction >= 0 ? -20 : 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="m-0 p-0 border-none max-w-4xl lg:max-w-5xl"
            >
              <p className="font-sans text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-semibold text-white leading-[1.25] tracking-[-0.02em]">
                {current.quote}
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* ── BOTTOM BAR: Author & Carousel Controls (Left) + Company Tabs (Right) ── */}
        <div className="pt-4 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-4 border-t border-neutral-900/60">
          {/* Left Column: Avatar + Author Metadata + Prev/Next Buttons */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Author Block */}
            <div className="flex items-center gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-sm sm:rounded-md overflow-hidden bg-neutral-900 border border-white/10 shrink-0"
                >
                  <Image
                    src={current.avatar}
                    alt={current.author}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <span className="font-sans font-bold text-white text-base sm:text-lg tracking-tight">
                    {current.author}
                  </span>
                  <span className="font-sans text-neutral-400 text-xs sm:text-sm font-normal mt-0.5">
                    {current.title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Circular Carousel Arrow Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.14] active:scale-95 border border-white/10 hover:border-white/25 text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label="Previous case study"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.14] active:scale-95 border border-white/10 hover:border-white/25 text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label="Next case study"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Company Tabs Selector */}
          <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 pb-1">
            {CASE_STUDIES.map((study, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`relative font-sans text-sm sm:text-base tracking-[0.08em] uppercase transition-all duration-200 cursor-pointer focus:outline-none py-1 ${
                    isActive
                      ? "text-white font-bold opacity-100"
                      : "text-neutral-500 hover:text-neutral-300 font-semibold opacity-60 hover:opacity-90"
                  }`}
                >
                  <span>{study.tabLabel}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Default export alias for seamless integration
export default CaseStudiesSection;
