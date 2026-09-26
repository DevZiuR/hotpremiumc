"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { OrganicParticles } from "@/components/OrganicParticles";

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    // Trigger entrance animation on page load
    const raf = requestAnimationFrame(() => setIsMounted(true));

    return () => {
      mq.removeEventListener("change", handler);
      cancelAnimationFrame(raf);
    };
  }, []);

  const getEntranceStyle = (delayMs: number): React.CSSProperties => {
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: "none",
        transition: "none",
      };
    }
    return {
      opacity: isMounted ? 1 : 0,
      transform: isMounted ? "translateY(0px)" : "translateY(16px)",
      transition: "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delayMs}ms`,
      willChange: "opacity, transform",
    };
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100dvh] md:min-h-0 py-6 sm:py-10 md:py-[110px] lg:py-[180px] overflow-hidden bg-black !text-white">
      {/* Background diagonal line accents — hidden */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60 hidden"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 0 L540 560" stroke="#DAD5C8" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M1440 0 L900 560" stroke="#DAD5C8" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Symmetrical organic particle figures — hidden */}
      <div className="hidden pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <OrganicParticles />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center text-center w-full">

        {/* 1. Pill badge (delay: 0ms) */}
        <div style={getEntranceStyle(0)}>
          <div
            className="inline-flex items-center gap-2.5 mb-3.5 sm:mb-6 md:mb-[40px] rounded-full border px-[14px] py-[8px]"
            style={{ background: "rgba(11,15,20,0.03)", borderColor: "rgba(11,15,20,0.12)" }}
          >
            <span
              className="block flex-shrink-0"
              style={{ width: 12, height: 12, background: "#2457D6" }}
              aria-hidden="true"
            />
            <span className="font-sans text-[12px] font-semibold tracking-[0.12em] uppercase text-gray">
              Equity partnerships
            </span>
          </div>
        </div>

        {/* 2 & 3. H1 with Line 1 (delay: 100ms) and Line 2 (delay: 200ms) */}
        <h1
          aria-label="We Fund Your Growth. You Keep the Business."
          className="font-serif text-[clamp(32px,9vw,64px)] md:text-[clamp(48px,8vw,108px)] font-normal !text-white max-w-4xl mb-3 sm:mb-5 md:mb-8 tracking-[-0.03em] leading-[1.02] md:leading-[0.98]"
        >
          <span className="block overflow-hidden py-[0.04em] -my-[0.04em]">
            <span className="block" style={getEntranceStyle(100)}>
              We Fund Your Growth.
            </span>
          </span>
          <span className="block overflow-hidden py-[0.04em] -my-[0.04em]">
            <span className="block" style={getEntranceStyle(200)}>
              You Keep the Business.
            </span>
          </span>
        </h1>

        {/* 4. Subtext (delay: 300ms) */}
        <p
          className="font-sans text-[14px] sm:text-[16px] md:text-[18px] text-[#9CA3AF] mx-auto mb-5 sm:mb-8 md:mb-11 leading-[1.45] sm:leading-[1.5] font-normal tracking-[-0.01em] px-1 sm:px-0 max-w-[46ch] md:max-w-[52ch]"
          style={getEntranceStyle(300)}
        >
          We put our ad budget, sales team, and technology behind operators with a proven offer. No retainer. No management fee. We only earn when your revenue grows.
        </p>

        {/* 5. Buttons (delay: 400ms) */}
        <div className="w-full md:w-auto" style={getEntranceStyle(400)}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 md:gap-3.5 w-full md:w-auto max-w-sm md:max-w-none mx-auto">
            {/* Primary — filled blue */}
            <Button
              variant="sharp-primary"
              href="#contact"
              className="!bg-[#2563EB] !border-[#2563EB] !text-white hover:!bg-[#1d4ed8] hover:!border-[#1d4ed8] w-full md:w-auto text-center justify-center h-[46px] !rounded-[12px] !py-0 px-8 transition-all duration-300"
            >
              Apply for Partnership
            </Button>
            {/* Secondary — low-contrast ghost so it doesn't compete */}
            <Button
              variant="sharp-outline"
              href="#verticals"
              className="w-full md:w-auto text-center justify-center h-[46px] !rounded-[12px] !py-0 px-8 !bg-transparent !border-[1px] !border-white/15 !text-white/45 hover:!bg-transparent hover:!text-white/65 hover:!border-white/25 transition-all duration-300"
            >
              Industries we work with
            </Button>
          </div>
        </div>

        {/* Founder track record row — extra separation */}
        <div className="w-full" style={getEntranceStyle(500)}>
          <div className="w-full max-w-3xl mx-auto mt-6 sm:mt-12 md:mt-24 pt-4 sm:pt-8 border-t border-gray-200/70">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-white text-center mb-4 sm:mb-6">
              Founder track record
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center">
                <div className="font-serif text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-white tracking-tight leading-none">$50M/yr</div>
                <div className="font-sans text-[12px] sm:text-[13px] text-[#3A3F47] mt-1.5 leading-[1.3] sm:leading-[1.4]">Coaching business (current run-rate)</div>
              </div>
              <div className="text-center border-x border-gray-200/70 px-2">
                <div className="font-serif text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-white tracking-tight leading-none">$53M in 10 months</div>
                <div className="font-sans text-[12px] sm:text-[13px] text-white/50 mt-1.5 leading-[1.3] sm:leading-[1.4]">Medical ecommerce brand (separate venture)</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-white tracking-tight leading-none">8-figure</div>
                <div className="font-sans text-[12px] sm:text-[13px] text-white/50 mt-1.5 leading-[1.3] sm:leading-[1.4]">Ecommerce brand</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
