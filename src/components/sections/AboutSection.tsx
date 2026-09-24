"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { Reveal } from "@/components/Reveal";

interface AboutSectionProps {
  /** Customizable eyebrow, defaults to "ABOUT US" */
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
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isBrand?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.26em] sm:mr-[0.3em] last:mr-0 tracking-normal ${isBrand ? "font-normal text-white" : "font-normal text-neutral-200"
        }`}
    >
      {children}
    </motion.span>
  );
}

export function AboutSection({
  eyebrow = "ABOUT US",
  brandName = "",
  statement = "Lead vendors get paid whether you win or not. We don't. Hot Premium Customers is an equity growth partner. We fund the ad spend, sales team, and technology, and we only earn when your revenue grows.",
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Extended scroll runway tracking the full section for a slower, deliberate reveal
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.72", "end 0.28"],
  });

  const brandWords = brandName.trim().split(/\s+/).filter(Boolean);
  const statementWords = statement.trim().split(/\s+/).filter(Boolean);

  const allWords = [
    ...brandWords.map((word) => ({ word, isBrand: true })),
    ...statementWords.map((word) => ({ word, isBrand: false })),
  ];

  const total = allWords.length;
  // Progressively illuminate words across the middle 82% of the scroll runway
  const startBound = 0.08;
  const endBound = 0.90;
  const step = (endBound - startBound) / total;

  return (
    <section ref={sectionRef} id="about" className="relative bg-black text-white py-[80px] lg:py-[140px] overflow-hidden">
      {/* Background subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(255, 255, 255, 0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <Reveal delay={0}>

          <div className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-3 sm:mb-3">
            <div className="inline-flex items-center gap-2.5 border border-ink/20 px-2 py-2 mb-3">
              <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
              <span className="font-sans text-[12px] font-semibold tracking-[0.12em] uppercase text-white">
                About us
              </span>
            </div>
          </div>
        </Reveal>

        {/* Main Statement Headline with Clean Single-Layer Scroll Reveal */}
        <div className="w-full flex flex-col items-center">
          <h2 className="font-serif text-[clamp(30px,3.6vw,50px)] text-white tracking-[-0.01em] leading-[1.15] max-w-[980px] mx-auto mb-0 text-center">
            {allWords.map((item, i) => {
              const start = startBound + i * step;
              const end = Math.min(0.98, start + 0.14);

              return (
                <Word
                  key={`${item.word}-${i}`}
                  progress={scrollYProgress}
                  range={[start, end]}
                  isBrand={item.isBrand}
                >
                  {item.word}
                </Word>
              );
            })}
          </h2>
          <a href="#how-it-works" className="inline-flex items-center gap-1.5 text-[#2563EB] font-sans text-[16px] font-medium hover:underline mt-[40px]">
            <span>See how it works</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
