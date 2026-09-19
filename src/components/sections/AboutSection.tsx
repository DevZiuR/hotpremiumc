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
  brandName = "Hot Premium Customers",
  statement = " is an equity growth partner, not a lead vendor. We fund the ad spend, sales team, and technology behind operators who are past proof of concept and ready to scale, and we only earn when your revenue grows.",
}: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const brandWords = brandName.trim().split(/\s+/).filter(Boolean);
  const statementWords = statement.trim().split(/\s+/).filter(Boolean);

  const allWords = [
    ...brandWords.map((word) => ({ word, isBrand: true })),
    ...statementWords.map((word) => ({ word, isBrand: false })),
  ];

  const total = allWords.length;
  const step = 0.75 / total;

  return (
    <section className="relative bg-black text-white py-16 sm:py-24 md:py-32 overflow-hidden">
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
              <span className="font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-white">
                About us
              </span>
            </div>
          </div>
        </Reveal>

        {/* Main Statement Headline with Clean Single-Layer Scroll Reveal */}
        <div ref={containerRef} className="w-full">
          <h2 className="font-serif text-xl sm:text-2xl md:text-[36px] lg:text-[42px] text-white tracking-tight leading-[1.34] md:leading-[1.3] max-w-4xl mx-auto mb-0">
            {allWords.map((item, i) => {
              const start = i * step;
              const end = Math.min(1, start + 0.25);

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
        </div>
      </div>
    </section>
  );
}
