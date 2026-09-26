"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";

interface SplitHeadingProps {
  /**
   * Lines of text to display. If provided, each entry is wrapped in an overflow:hidden
   * line container and animated individually.
   */
  lines?: string[];
  /**
   * Fallback text/children if lines are not explicitly provided.
   * If children is a string or contains <br />, it will be parsed into lines.
   */
  children?: React.ReactNode;
  /** Semantic heading level. Defaults to "h2". */
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  /** Base delay in ms before the first line starts animating (choreography default: 90ms) */
  delay?: number;
  /** Stagger between consecutive lines in ms (spec: 70–90ms, default: 80ms) */
  lineStagger?: number;
  /** Animation duration per line in ms (spec: 700–800ms, default: 750ms) */
  duration?: number;
  /**
   * If true, animates in immediately on mount without waiting for scroll.
   * Use for above-the-fold hero headings.
   */
  immediate?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const EASING = "cubic-bezier(.22, 1, .36, 1)";
const IO_THRESHOLD = 0.25;

/**
 * SplitHeading — Reusable SplitText-style line reveal for major editorial headings.
 *
 * Spec:
 *   - Each line wrapped in overflow:hidden
 *   - Text moves from translateY(100%) to 0
 *   - Opacity 0 → 1
 *   - 700–800ms (default 750ms)
 *   - 70–90ms line stagger (default 80ms)
 *   - cubic-bezier(.22, 1, .36, 1)
 *   - Trigger once via IntersectionObserver at 0.25 threshold (or immediate above the fold)
 *   - Full prefers-reduced-motion support (instant display, no transforms)
 */
export function SplitHeading({
  lines,
  children,
  as: Component = "h2",
  delay = 90,
  lineStagger = 80,
  duration = 750,
  immediate = false,
  className = "",
  style,
}: SplitHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const [isVisible, setIsVisible] = useState(immediate);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver trigger
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

  // Extract lines from lines prop or children
  const parsedLines: string[] = React.useMemo(() => {
    if (lines && lines.length > 0) return lines;

    if (typeof children === "string") {
      return children.split("\n").filter(Boolean);
    }

    // If children is an array or contains React elements (like <br />)
    const result: string[] = [];
    React.Children.forEach(children, (child) => {
      if (typeof child === "string" && child.trim()) {
        result.push(child.trim());
      } else if (React.isValidElement(child) && child.type === "br") {
        // Line break separator
      } else if (child) {
        result.push(String(child).trim());
      }
    });

    return result.length > 0 ? result : [String(children ?? "")];
  }, [lines, children]);

  const fullText = parsedLines.join(" ");

  // Reduced motion: render clean without split transforms
  if (prefersReducedMotion) {
    return (
      <Component ref={containerRef} className={className} style={style}>
        {parsedLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < parsedLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef}
      className={className}
      style={style}
      aria-label={fullText}
    >
      {/* Screen reader only text so assistive tech reads the heading as a coherent sentence */}
      <span className="sr-only">{fullText}</span>

      {/* Visual split lines with editorial overflow-hidden mask */}
      <span aria-hidden="true" className="block">
        {parsedLines.map((line, idx) => {
          const lineDelay = delay + idx * lineStagger;

          return (
            <span
              key={idx}
              className="block overflow-hidden py-[0.04em] -my-[0.04em]"
            >
              <span
                className="block will-change-[transform,opacity]"
                style={{
                  transform: isVisible ? "translateY(0%)" : "translateY(100%)",
                  opacity: isVisible ? 1 : 0,
                  transition: `transform ${duration}ms ${EASING}, opacity ${duration}ms ${EASING}`,
                  transitionDelay: isVisible ? `${lineDelay}ms` : "0ms",
                }}
              >
                {line}
              </span>
            </span>
          );
        })}
      </span>
    </Component>
  );
}
