"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import DotField from "@/components/DotField";

interface AboutSectionProps {
  /** First part (white text) */
  primaryText?: string;
  /** Second part (muted gray text) */
  continuationText?: string;
  /** Legacy prop for backward compatibility */
  statement?: string;
}

// Circular "no/stop" icon (thin stroke, no fill)
function IconStop() {
  return (
    <svg
      className="inline-block w-[0.8em] h-[0.8em] ml-1.5 -mt-0.5 align-middle shrink-0"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="7.5" />
      <line x1="4.7" y1="4.7" x2="15.3" y2="15.3" />
    </svg>
  );
}

// Upward-trending arrow icon (thin stroke, no fill)
function IconTrendingUp() {
  return (
    <svg
      className="inline-block w-[0.8em] h-[0.8em] ml-1.5 -mt-0.5 align-middle shrink-0"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 14 8.5 8.5 12 12 17 6" />
      <polyline points="12 6 17 6 17 11" />
    </svg>
  );
}

const pillClassName =
  "inline-flex items-center align-middle mx-1 sm:mx-1.5 my-0.5 px-[12px] py-[4px] rounded-[10px] bg-white text-[#2563EB] shadow-sm transition-[background-color,color,transform] duration-[250ms] ease-out hover:bg-white/15 hover:text-white hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 cursor-pointer select-none";

export function AboutSection({
  primaryText,
  continuationText,
  statement,
}: AboutSectionProps) {
  const defaultPrimary =
    "Lead vendors get paid whether you win or not. We don't. Hot Premium Customers is an equity growth partner.";
  const defaultContinuation =
    "We fund the ad spend, sales team, and technology, and we only earn when your revenue grows.";

  let resolvedPrimary = primaryText;
  let resolvedContinuation = continuationText;

  if (!resolvedPrimary && !resolvedContinuation) {
    if (statement && statement !== `${defaultPrimary} ${defaultContinuation}`) {
      const splitTarget = "Hot Premium Customers is an equity growth partner.";
      if (statement.includes(splitTarget)) {
        const parts = statement.split(splitTarget);
        resolvedPrimary = `${parts[0]}${splitTarget}`.trim();
        resolvedContinuation = parts[1]?.trim() || "";
      } else {
        const sentences = statement.match(/[^.!?]+[.!?]+/g) || [statement];
        const half = Math.ceil(sentences.length / 2);
        resolvedPrimary = sentences.slice(0, half).join(" ").trim();
        resolvedContinuation = sentences.slice(half).join(" ").trim();
      }
    } else {
      resolvedPrimary = defaultPrimary;
      resolvedContinuation = defaultContinuation;
    }
  }

  const renderPrimary = () => {
    const text = resolvedPrimary || defaultPrimary;
    const phrase = "We don't";
    if (text.includes(phrase)) {
      const parts = text.split(phrase);
      return (
        <>
          {parts[0]}
          <span className={pillClassName}>
            <span>{phrase}</span>
            <IconStop />
          </span>
          {parts.slice(1).join(phrase)}
        </>
      );
    }
    return text;
  };

  const renderContinuation = () => {
    const text = resolvedContinuation || defaultContinuation;
    const phrase = "only earn when your revenue grows";
    if (text.includes(phrase)) {
      const parts = text.split(phrase);
      return (
        <>
          {parts[0]}
          <span className={pillClassName}>
            <span>{phrase}</span>
            <IconTrendingUp />
          </span>
          {parts.slice(1).join(phrase)}
        </>
      );
    }
    return text;
  };

  return (
    <section
      id="about"
      className="bg-black py-6 sm:py-10 md:py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] bg-[#2563EB] text-white py-16 sm:py-20 md:py-24 px-6 sm:px-12 lg:px-16 text-center shadow-2xl">
            {/* Top-left window decorative dots */}
            <div
              className="absolute top-5 left-6 sm:top-6 sm:left-8 flex items-center gap-1.5 opacity-30 select-none pointer-events-none"
              aria-hidden="true"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>

            {/* Faint DotField canvas background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <DotField
                baseOpacity={0.12}
                size={1.4}
                spacing={26}
                maskImage="radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)"
              />
            </div>

            {/* Left decorative element: Orbit-ring / wireframe globe motif */}
            <svg
              aria-hidden="true"
              className="absolute -left-12 -bottom-16 sm:-bottom-12 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] pointer-events-none opacity-15 text-white"
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

            {/* Right decorative element: Frequency waveform / soundwave motif */}
            <svg
              aria-hidden="true"
              className="absolute -right-4 sm:right-6 bottom-0 w-[180px] sm:w-[260px] h-[85%] pointer-events-none opacity-15 text-white"
              viewBox="0 0 200 360"
              fill="none"
              stroke="currentColor"
            >
              {Array.from({ length: 34 }).map((_, i) => {
                const y = 330 - i * 9.2;
                const progress = i / 34;
                const spread = Math.sin(Math.pow(1 - progress, 0.72) * Math.PI);
                const width = 14 + spread * 165;
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

            {/* Centered Content */}
            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
              <h2 className="font-sans text-[clamp(32px,7.5vw,42px)] md:text-[clamp(40px,3.8vw,54px)] font-medium leading-[1.24] tracking-[-0.025em] max-w-[960px] mx-auto text-center [text-wrap:balance]">
                <span className="text-white">
                  {renderPrimary()}
                </span>{" "}
                <span className="text-white">
                  {renderContinuation()}
                </span>
              </h2>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
