"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Ribbon scroll behaviour: trails the page slightly (positive Y) and fades
     out as the hero leaves. Under reduced motion both resolve to rest. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const ribbonParallaxY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const ribbonScrollOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0]);

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
    <section
      ref={sectionRef}
      /* Subtracting the announcement bar keeps the whole hero — ribbon included —
         inside the first screen. */
      className="relative h-[calc(100svh-var(--announce-h,0px))] min-h-[660px] w-full overflow-hidden bg-black"
    >
      {/* Main Hero Content — centered in the band between nav and ribbon on mobile,
          then reverting to the desktop flow below the nav at md and up. */}
      <div className="relative z-10 mx-auto flex h-[56%] w-full max-w-6xl flex-col items-center justify-center px-4 pt-[96px] text-center sm:px-6 md:h-auto md:px-10 md:pt-[190px] md:justify-start">

          {/* 2. H1 Headline */}
          <h1
            aria-label="We Fund Your Growth. You Keep the Business."
            className="font-serif text-[clamp(40px,11.5vw,56px)] md:text-[clamp(40px,min(8vw,13vh),120px)] font-medium text-white w-full mb-5 tracking-[-0.025em] leading-[1.05] md:leading-[1.02]"
          >
            <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
              <span className="block" style={getEntranceStyle(100)}>
                We Fund Your Growth.
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
            className="font-sans font-normal text-neutral-400 text-[18px] leading-[1.4] max-w-[640px] mx-auto mb-7 [text-wrap:balance]"
            style={getEntranceStyle(300)}
          >
            We put our ad budget, sales team, and technology behind operators with a proven offer. No retainer. No management fee.
          </p>

          {/* 4. CTA Button (gold pill with glass edge) */}
          <div style={getEntranceStyle(400)}>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 font-sans font-semibold text-[14px] sm:text-[15px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full cursor-pointer text-black bg-[linear-gradient(to_bottom,#D9B25A,#BD9238)] border border-[rgba(255,255,255,0.35)] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_28px_rgba(201,162,75,0.3)] hover:bg-[#E3BE68] hover:-translate-y-px active:translate-y-0 transition-all duration-200"
            >
              <span>See If You Qualify</span>
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
          </div>

      </div>

      {/* Ribbon — absolute layer anchored to the hero bottom, full viewport width.
          Three nested elements so each animation owns its own property:
          outer = clip + mask, motion = entrance + scroll parallax, inner = idle
          drift, img = slow brightness pulse. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-[40%] w-full select-none overflow-hidden md:h-[34%]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 50%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 50%)",
        }}
      >
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.6 : 1.2,
            delay: shouldReduceMotion ? 0 : 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={
            shouldReduceMotion
              ? { opacity: 1 }
              : { y: ribbonParallaxY, opacity: ribbonScrollOpacity }
          }
          className="h-full w-full will-change-transform"
        >
          <div className={shouldReduceMotion ? "h-full w-full" : "h-full w-full animate-ribbon-drift will-change-transform"}>
            <img
              src="/media/hero-ribbon.png"
              alt=""
              className={`h-full w-full scale-[1.06] object-cover object-[50%_82%] ${
                shouldReduceMotion ? "opacity-90" : "animate-ribbon-pulse opacity-90"
              } will-change-transform`}
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
