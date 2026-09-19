"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in ms before the animation starts once the element is in view */
  delay?: number;
  /** Transition duration in ms, defaults to 500ms */
  duration?: number;
  /** If true, the element animates in immediately on mount (use for above-the-fold hero content) */
  immediate?: boolean;
  /** Additional className to pass to the wrapper div */
  className?: string;
  /** Inline styles to pass to the wrapper div */
  style?: CSSProperties;
}

export function Reveal({
  children,
  delay = 0,
  duration = 500,
  immediate = false,
  className = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
      {
        // Start triggering slightly before the element enters the viewport
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={[
        // Fast, subtle transition: ease-out (opacity 0 to 1, translateY 20px to 0)
        "transition-[opacity,transform] ease-out will-change-[opacity,transform]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * SectionReveal — wraps an entire section's children list and applies
 * staggered Reveal animations with 80-100ms delay increments automatically.
 * Use this instead of manually setting delay={i * 90} on each child.
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
