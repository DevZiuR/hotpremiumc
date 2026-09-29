"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface VisualRevealProps {
  children: ReactNode;
  /** Delay in ms before visual reveal starts once in view (spec default: 270ms) */
  delay?: number;
  /** Animation duration in ms (spec: 700–900ms, default: 800ms) */
  duration?: number;
  /** Initial scale of the visual before settling to 1.0 (spec: 1.03–1.05, default: 1.04) */
  scaleFrom?: number;
  /** Initial clip-path inset (default: "inset(5% 0% 0% 0%)") */
  insetFrom?: string;
  /** If true, reveals immediately on mount without waiting for scroll */
  immediate?: boolean;
  /** Wrapper class name */
  className?: string;
  /** Inner content class name */
  innerClassName?: string;
  /** Inline styles for outer wrapper */
  style?: CSSProperties;
}

const EASING = "cubic-bezier(.22, 1, .36, 1)";
const IO_THRESHOLD = 0.05;

/**
 * VisualReveal — Editorial clip-path and gentle scale reveal for major images and maps.
 *
 * Spec:
 *   - clip-path reveal from a slightly inset position (e.g. inset(5% 0% 0% 0%))
 *   - image scale 1.03–1.05 → 1 (default 1.04)
 *   - 700–900ms (default 800ms)
 *   - smooth editorial easing: cubic-bezier(.22, 1, .36, 1)
 *   - Triggers once at 0.20–0.25 viewport intersection
 *   - Full prefers-reduced-motion support
 */
export function VisualReveal({
  children,
  delay = 270,
  duration = 800,
  scaleFrom = 1.04,
  insetFrom = "inset(5% 0% 0% 0%)",
  immediate = false,
  className = "",
  innerClassName = "w-full h-full",
  style,
}: VisualRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(immediate);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // useLayoutEffect: fires before first paint so reduced-motion users never see a
  // flash of hidden content, without causing an SSR/hydration mismatch.
  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (immediate) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: IO_THRESHOLD }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);


  // Under reduced motion resolve straight to the final state so the visual is
  // never left clipped or semi-transparent behind a suppressed transition.
  const showFinalState = isVisible || prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden will-change-[clip-path,opacity] ${className}`}
      style={{
        clipPath: showFinalState ? "inset(0% 0% 0% 0%)" : insetFrom,
        opacity: showFinalState ? 1 : 0.4,
        transitionProperty: prefersReducedMotion ? "none" : "clip-path, opacity",
        transitionDuration: prefersReducedMotion ? "0ms" : `${duration}ms`,
        transitionTimingFunction: EASING,
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        ...style,
      }}
    >
      <div
        className={`will-change-transform ${innerClassName}`}
        style={{
          transform: showFinalState ? "scale(1)" : `scale(${scaleFrom})`,
          transitionProperty: prefersReducedMotion ? "none" : "transform",
          transitionDuration: prefersReducedMotion ? "0ms" : `${duration}ms`,
          transitionTimingFunction: EASING,
          transitionDelay: isVisible ? `${delay}ms` : "0ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}
