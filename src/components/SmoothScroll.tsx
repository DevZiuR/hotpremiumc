"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Luxury editorial smooth scrolling configuration:
    // • lerp: 0.03 — deep, syrupy deceleration curve with extended weighted inertia
    // • wheelMultiplier: 1.05 — natural, generous distance per scroll notch so the slow glide has travel to coast
    // • touchMultiplier: 1.5 — fluid gesture responsiveness
    // • smoothWheel: true — silky interpolation for mousewheel & trackpads
    // • anchors: smooth 1.8s navigation for all on-page jump links with -90px header offset
    // • respectReducedMotion: false — prevents Windows system-wide reduced motion from silently disabling smooth scroll
    const lenis = new Lenis({
      lerp: 0.03,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: false,
      anchors: {
        offset: -90,
        duration: 1.8,
      },
      respectReducedMotion: false,
    });

    console.log("[Lenis] initialized with premium slow scroll", lenis);

    // Manual rAF loop — full control over the animation tick
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
