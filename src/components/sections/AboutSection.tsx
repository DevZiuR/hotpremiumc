"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import DotField from "@/components/DotField";

interface AboutSectionProps {
  /** First part (white text) */
  primaryText?: string;
  /** Second part (muted gray text) */
  continuationText?: string;
  /** Legacy prop for backward compatibility */
  statement?: string;
}

/* Inline circular icon badges. Each one sits inside the serif sentence,
   sized larger than the surrounding text and bled slightly above the line
   (via negative margin) so it reads as a distinct object interrupting the
   sentence, matching the America.gov reference — white disc, accent-blue
   glyph, soft shadow for separation. The words themselves stay in the flow
   as plain text; the badge leads into them rather than boxing them. */
function IconStop() {
  return (
    <span className="inline-flex items-center justify-center w-[1.35em] h-[1.35em] rounded-full bg-[#2563EB] text-white align-middle -mt-[0.28em] mx-[0.15em] shrink-0 select-none shadow-sm">
      <svg
        className="w-[0.62em] h-[0.62em]"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <line x1="6" y1="6" x2="14" y2="14" />
        <line x1="14" y1="6" x2="6" y2="14" />
      </svg>
    </span>
  );
}

// Upward-trending arrow icon (thin stroke, no fill)
function IconTrendingUp() {
  return (
    <span className="inline-flex items-center justify-center w-[1.35em] h-[1.35em] rounded-full bg-[#2563EB] text-white align-middle -mt-[0.28em] mx-[0.15em] shrink-0 select-none shadow-sm">
      <svg
        className="w-[0.64em] h-[0.64em]"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="3 14 8.5 8.5 12 12 17 6" />
        <polyline points="12 6 17 6 17 11" />
      </svg>
    </span>
  );
}

type Segment =
  | { kind: "text"; value: string }
  | { kind: "badge"; icon: "stop" | "trend"; delay: number };

const BADGE_STAGGER = 120;

function splitOnPhrase(
  text: string,
  phrase: string,
  icon: "stop" | "trend",
  segments: Segment[],
  state: { badges: number }
) {
  if (!text.includes(phrase)) {
    if (text) segments.push({ kind: "text", value: text });
    return;
  }
  const parts = text.split(phrase);
  if (parts[0]) segments.push({ kind: "text", value: parts[0] });
  state.badges += 1;
  // Badge first, then the phrase as ordinary text — the icon leads the reader
  // into the words instead of boxing them. The leading non-breaking space glues
  // the badge to the first word so a line break can't strand the disc at the
  // end of a line; the rest of the phrase still wraps on its own spaces.
  segments.push({
    kind: "badge",
    icon,
    delay: state.badges * BADGE_STAGGER,
  });
  segments.push({ kind: "text", value: `\u00A0${phrase}` });
  const tail = parts.slice(1).join(phrase);
  if (tail) segments.push({ kind: "text", value: tail });
}

/** Spring config shared across all scroll-driven values */
const SPRING = { stiffness: 55, damping: 18, mass: 0.8 };

export function AboutSection({
  primaryText,
  continuationText,
  statement,
}: AboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const defaultPrimary =
    "Lead vendors get paid whether you win or not. We don't.";
  const defaultContinuation =
    "We're an equity growth partner. We only earn when your revenue grows.";

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

  const segments: Segment[] = [];
  {
    const state = { badges: 0 };
    splitOnPhrase(
      resolvedPrimary || defaultPrimary,
      "We don't",
      "stop",
      segments,
      state
    );
    segments.push({ kind: "text", value: " " });
    splitOnPhrase(
      resolvedContinuation || defaultContinuation,
      "only earn when your revenue grows",
      "trend",
      segments,
      state
    );
  }

  // ── Scroll tracking ────────────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * 0 = section top at viewport bottom (just entering)
   * 1 = section bottom at viewport top (just leaving)
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ── Raw motion values ──────────────────────────────────────────────────────
  // Card fades + lifts in on enter, gently fades on exit
  const rawCardOpacity  = useTransform(scrollYProgress, [0, 0.18, 0.72, 1],   [0, 1, 1, 0.55]);
  const rawCardY        = useTransform(scrollYProgress, [0, 0.22],             [56, 0]);
  const rawCardScale    = useTransform(scrollYProgress, [0, 0.22],             [0.97, 1]);

  // Globe / waveform decor removed — only card + content motion remain
  // Content lifts in just after the card
  const rawContentY     = useTransform(scrollYProgress, [0.05, 0.28],          [30, 0]);
  const rawContentOp    = useTransform(scrollYProgress, [0.05, 0.26, 0.75, 1], [0, 1, 1, 0.65]);

  // ── Springified values (smooth physics-based scroll following) ─────────────
  /* eslint-disable react-hooks/rules-of-hooks */
  const cardOpacity  = shouldReduceMotion ? rawCardOpacity  : useSpring(rawCardOpacity,  SPRING);
  const cardY        = shouldReduceMotion ? rawCardY        : useSpring(rawCardY,        SPRING);
  const cardScale    = shouldReduceMotion ? rawCardScale    : useSpring(rawCardScale,    SPRING);
  const contentY     = shouldReduceMotion ? rawContentY     : useSpring(rawContentY,     SPRING);
  const contentOp    = shouldReduceMotion ? rawContentOp    : useSpring(rawContentOp,    SPRING);
  /* eslint-enable react-hooks/rules-of-hooks */

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-black py-6 sm:py-8 md:py-10 px-4 sm:px-4 lg:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Black Callout Card ─────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
          className="relative overflow-hidden rounded-[24px] bg-black text-white py-10 sm:py-12 md:py-14 px-6 sm:px-12 lg:px-16 text-center shadow-2xl will-change-transform"
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

          {/* Centered Content */}
          <motion.div
            style={{ opacity: contentOp, y: contentY }}
            className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center will-change-transform"
          >
            {/* leading bumped 1.24 → 1.32 so the enlarged (1.35em) badges have
                room to bleed above/below the line without colliding with the
                row above or below at any breakpoint */}
            <h2 className="font-sans text-[clamp(32px,8vw,42px)] md:text-[clamp(44px,4.6vw,58px)] font-medium leading-[1.2] tracking-[0.025em] max-w-[1000px] mx-auto text-center [text-wrap:balance] uppercase">
              {segments.map((segment, index) =>
                segment.kind === "text" ? (
                  <span key={`text-${index}`} className="text-white">
                    {segment.value}
                  </span>
                ) : (
                  <motion.span
                    key={`badge-${index}`}
                    className="inline-block align-middle"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.88 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.55,
                      delay: (350 + segment.delay) / 1000,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    {segment.icon === "stop" ? <IconStop /> : <IconTrendingUp />}
                  </motion.span>
                )
              )}
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}