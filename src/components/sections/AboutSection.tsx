"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";

interface AboutSectionProps {
  /** First part (white text) */
  primaryText?: string;
  /** Second part (muted gray text) */
  continuationText?: string;
  /** Legacy prop for backward compatibility */
  statement?: string;
}

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

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black text-[#E8EAEE] py-[80px] sm:py-[100px] md:py-[130px]"
    >
      {/* Background subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255, 255, 255, 0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] max-w-5xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col items-center text-center">
        <Reveal>
          <h2 className="font-sans text-[clamp(28px,3.8vw,52px)] font-medium leading-[1.18] tracking-[-0.025em] max-w-[960px] mx-auto text-center [text-wrap:balance]">
            <span className="text-white">
              {resolvedPrimary}
            </span>{" "}
            <span className="text-white/40">
              {resolvedContinuation}
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
