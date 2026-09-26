/**
 * Reveal.tsx — Site-wide canonical scroll-entrance animation system.
 *
 * Spec:
 *   - Base transition: opacity 0→1, translateY 24px→0
 *   - Duration: 650ms
 *   - Easing: cubic-bezier(.22, 1, .36, 1)  (custom spring-ish ease-out)
 *   - Trigger: IntersectionObserver, threshold 0.25, fires once
 *   - prefers-reduced-motion: skip transform/opacity, show final state immediately
 *
 * Do NOT change these values per-usage — the goal is site-wide consistency.
 * The only knobs callers should use are `delay` (for stagger) and `immediate`
 * (for above-the-fold content that should never wait for scroll).
 */
"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

// Canonical animation constants — single source of truth for the whole site.
const DURATION_MS = 650;
const TRANSLATE_Y_PX = 24;
const EASING = "cubic-bezier(.22, 1, .36, 1)";
const IO_THRESHOLD = 0.25;

interface RevealProps {
  children: ReactNode;
  /** Delay in ms before the animation starts once the element is in view */
  delay?: number;
  /**
   * If true, the element animates in immediately on mount.
   * Use ONLY for above-the-fold hero content that should never wait for scroll.
   */
  immediate?: boolean;
  /** Additional className to pass to the wrapper div */
  className?: string;
  /** Inline styles to pass to the wrapper div */
  style?: CSSProperties;
  /**
   * @deprecated duration is standardized to 650ms site-wide.
   * This prop is accepted for backwards-compatibility but has no effect.
   */
  duration?: number;
}

export function Reveal({
  children,
  delay = 0,
  immediate = false,
  className = "",
  style,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  duration: _ignoredDuration,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // Immediately visible (above the fold): show final state right away.
    if (immediate) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: IO_THRESHOLD }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  // prefers-reduced-motion: skip all entrance transforms, show final state immediately.
  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : `translateY(${TRANSLATE_Y_PX}px)`,
        transition: `opacity ${DURATION_MS}ms ${EASING}, transform ${DURATION_MS}ms ${EASING}`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * SectionReveal — wraps an entire section's children list and applies
 * staggered Reveal animations with 90ms increments automatically.
 * Use for eyebrow → heading → subcopy sequences.
 */
interface SectionRevealProps {
  children: ReactNode[];
  /** Base delay before the first child animates (default 0) */
  baseDelay?: number;
  /** Per-child stagger increment in ms (default 90) */
  stagger?: number;
  className?: string;
}

export function SectionReveal({
  children,
  baseDelay = 0,
  stagger = 90,
  className = "",
}: SectionRevealProps) {
  return (
    <>
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <Reveal key={i} delay={baseDelay + i * stagger} className={className}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
