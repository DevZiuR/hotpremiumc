"use client";

import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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
const IO_THRESHOLD = 0.2;

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

  useEffect(() => {
    if (typeof window === "undefined") return;
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

  // Reduced motion: skip clip-path and scale entirely
  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden will-change-[clip-path,opacity] ${className}`}
      style={{
        clipPath: isVisible ? "inset(0% 0% 0% 0%)" : insetFrom,
        opacity: isVisible ? 1 : 0.4,
        transition: `clip-path ${duration}ms ${EASING}, opacity ${duration}ms ${EASING}`,
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        ...style,
      }}
    >
      <div
        className={`will-change-transform ${innerClassName}`}
        style={{
          transform: isVisible ? "scale(1)" : `scale(${scaleFrom})`,
          transition: `transform ${duration}ms ${EASING}`,
          transitionDelay: isVisible ? `${delay}ms` : "0ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}
