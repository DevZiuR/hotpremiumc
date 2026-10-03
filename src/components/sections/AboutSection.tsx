"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import DotField from "@/components/DotField";

interface AboutSectionProps {
  /** First part (white text) */
  primaryText?: string;
  /** Second part (muted gray text) */
  continuationText?: string;
  /** Legacy prop for backward compatibility */
  statement?: string;
}

const defaultPrimary = "Lead vendors get paid whether you win or not. We don't.";
const defaultContinuation =
  "We fund the ad spend and sales infrastructure upfront, and we only earn when your revenue grows.";

/** The closing clause resolves last and settles into gold. Matched exactly as
    it appears mid-sentence, so the search below is case-sensitive. */
const GOLD_PHRASE = "we only earn when your revenue grows.";

const DIM_WHITE = "rgba(255,255,255,0.25)";
const LIT_WHITE = "rgba(255,255,255,1)";
const DIM_GOLD = "rgba(201,162,75,0.28)";
const LIT_GOLD = "rgb(201,162,75)";

/** Spring config for the shared scroll progress — soft follow, no jitter. */
const PROGRESS_SPRING = { stiffness: 120, damping: 30, mass: 0.4 };

/** Portion of the scroll span the word reveal actually consumes. */
const REVEAL_RANGE = 0.7;

/**
 * One word of the statement. Its color is a scroll-driven MotionValue rather
 * than a discrete animation, so the sentence lights up continuously instead of
 * popping word by word.
 */
function RevealWord({
  progress,
  index,
  total,
  gold,
  reduced,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  gold: boolean;
  reduced: boolean;
  children: string;
}) {
  /* Each word owns a slice of the timeline. REVEAL_RANGE keeps every word's
     window inside the first 70% of the scroll span, so the last word lands
     while the text is still on screen rather than at the very end of the
     section's travel. The window is wider than one word's share so
     consecutive words overlap and the transition reads as a smooth sweep. */
  const span = REVEAL_RANGE * 0.78;
  const start = total <= 1 ? 0 : (index / total) * (REVEAL_RANGE - span);
  const end = start + span;

  const color = useTransform(
    progress,
    [start, end],
    [gold ? DIM_GOLD : DIM_WHITE, gold ? LIT_GOLD : LIT_WHITE]
  );

  if (reduced) {
    return <span style={{ color: gold ? LIT_GOLD : LIT_WHITE }}>{children}</span>;
  }

  return (
    <motion.span style={{ color }} className="inline-block">
      {children}
    </motion.span>
  );
}

export function AboutSection({
  primaryText,
  continuationText,
  statement,
}: AboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Copy resolution (unchanged precedence from the previous version) ────── */
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

  const fullText = `${resolvedPrimary || defaultPrimary} ${
    resolvedContinuation || defaultContinuation
  }`;

  /* Split into words and flag the closing gold phrase. A single pass tracks the
     character offset so we know which word begins the gold run. */
  const words = fullText.split(/\s+/).filter(Boolean);
  const goldStartIndex = fullText.indexOf(GOLD_PHRASE);

  let goldFrom = Number.POSITIVE_INFINITY;
  if (goldStartIndex !== -1) {
    let offset = 0;
    for (let i = 0; i < words.length; i += 1) {
      if (offset >= goldStartIndex) {
        goldFrom = i;
        break;
      }
      offset += words[i].length + 1;
    }
  }

  /* ── Scroll progress tied to the section's natural position ────────────────
     offset ["start end", "end start"] runs 0→1 as the section travels from
     first touching the viewport bottom to leaving through the top. The reveal
     only consumes the first 70% of that range, so the sentence finishes
     lighting while the text is still around the upper-middle of the screen. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const progress = shouldReduceMotion
    ? scrollYProgress
    : useSpring(scrollYProgress, PROGRESS_SPRING);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-black px-4 py-[150px] sm:px-6 sm:py-[170px] lg:px-8"
    >
      <div className="relative mx-auto flex max-w-[1300px] flex-col items-center justify-center">
        {/* Faint DotField canvas background */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <DotField
            baseOpacity={0.12}
            size={1.4}
            spacing={26}
            maskImage="radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)"
          />
        </div>

        <h2 className="relative z-10 mx-auto max-w-[1000px] text-center font-serif text-[clamp(26px,6.4vw,32px)] font-normal leading-[1.12] tracking-[-0.02em] [text-wrap:balance] md:text-[clamp(38px,5vw,58px)]">
          {words.map((word, index) => (
            <React.Fragment key={`${word}-${index}`}>
              <RevealWord
                progress={progress}
                index={index}
                total={words.length}
                gold={index >= goldFrom}
                reduced={Boolean(shouldReduceMotion)}
              >
                {word}
              </RevealWord>
              {/* Explicit space keeps word gaps intact while each word stays an
                  independent inline-block for its own color transition. */}
              {index < words.length - 1 ? " " : null}
            </React.Fragment>
          ))}
        </h2>
      </div>
    </section>
  );
}