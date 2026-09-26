"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import DotField from "@/components/DotField";

interface AboutSectionProps {
  /** Customizable eyebrow, defaults to "THE MODEL" */
  eyebrow?: string;
  /** Customizable company / brand name */
  brandName?: string;
  /** Customizable statement text */
  statement?: string;
}

function Word({
  children,
  progress,
  range,
  isBrand = false,
  forceFullOpacity = false,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isBrand?: boolean;
  forceFullOpacity?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [3, 0]);

  return (
    <motion.span
      style={{
        opacity: forceFullOpacity ? 1 : opacity,
        y: forceFullOpacity ? 0 : y,
      }}
      className={`inline-block mr-[0.26em] sm:mr-[0.3em] last:mr-0 tracking-normal ${isBrand ? "font-normal text-white" : "font-normal text-[#E8EAEE]"
        }`}
    >
      {children}
    </motion.span>
  );
}

export function AboutSection({
  eyebrow = "THE MODEL",
  brandName = "",
  statement = "Lead vendors get paid whether you win or not. We don't. Hot Premium Customers is an equity growth partner. We fund the ad spend, sales team, and technology, and we only earn when your revenue grows.",
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isImmediatelyInView, setIsImmediatelyInView] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  // Scroll runway configured so all lines reach full opacity by the time the section is centered
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "center 0.50"],
  });

  // Once the scroll runway completes, latch to full opacity permanently.
  // Without this, a section that was never in view on mount (or a page loaded
  // mid-scroll) can be left stranded at the low end of the word opacity range.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.94) {
      setHasRevealed(true);
    }
  });

  useEffect(() => {
    // Immediately on load: if the section is already in view or centered, ensure full opacity
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // Section is already centered or in active view
    if (rect.top <= vh * 0.55 && rect.bottom >= vh * 0.15) {
      setIsImmediatelyInView(true);
    }
    // Page loaded with this section already scrolled past: the runway has completed
    if (rect.bottom <= vh * 0.5) {
      setHasRevealed(true);
    }
  }, []);

  const brandWords = brandName.trim().split(/\s+/).filter(Boolean);
  const statementWords = statement.trim().split(/\s+/).filter(Boolean);

  const allWords = [
    ...brandWords.map((word) => ({ word, isBrand: true })),
    ...statementWords.map((word) => ({ word, isBrand: false })),
  ];

  const total = allWords.length;
  // Progressively illuminate all words so the last word finishes by scrollYProgress = 0.94 (fully centered in viewport)
  const startBound = 0.04;
  const endBound = 0.82;
  const step = (endBound - startBound) / total;

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-[#0B0E12] text-[#E8EAEE] py-[72px] md:py-[96px]">
      {/* *
      <DotField
        baseOpacity={0.09}
        maskImage="radial-gradient(ellipse 65% 55% at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.04) 40%, rgba(0, 0, 0, 0.7) 75%, #000 95%)"
      />
      /}
      {/* Background subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(255, 255, 255, 0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] max-w-5xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col items-center text-center">
        {/* Main Statement Headline with Clean Single-Layer Scroll Reveal */}
        <h2 className="font-serif text-[clamp(30px,3.6vw,50px)] text-[#E8EAEE] tracking-[-0.01em] leading-[1.35] max-w-[980px] mx-auto mb-0 text-center">
          {allWords.map((item, i) => {
            const start = startBound + i * step;
            const end = Math.min(0.94, start + 0.12);

            return (
              <Word
                key={`${item.word}-${i}`}
                progress={scrollYProgress}
                range={[start, end]}
                isBrand={item.isBrand}
                forceFullOpacity={isImmediatelyInView || hasRevealed}
              >
                {item.word}
              </Word>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
