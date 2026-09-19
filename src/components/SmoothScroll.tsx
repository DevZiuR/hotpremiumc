"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Luxury editorial smooth scrolling configuration for both Desktop & Mobile:
    // • lerp: 0.045 — deep, weighted deceleration curve for silky inertia on desktop
    // • wheelMultiplier: 0.9 — deliberate, measured distance per notch for a slower, premium coast
    // • syncTouch: true — enables Lenis smooth virtual scroll on touch/mobile devices
    // • syncTouchLerp: 0.06 — smooth, cushioned touch deceleration on mobile after finger release
    // • touchInertiaExponent: 1.75 — velvety friction-based coasting for touch flings
    // • touchMultiplier: 1.15 — responsive, natural 1:1 finger tracking without jerky jumps
    // • gestureOrientation: "vertical" — prevents vertical scroll hijacking horizontal gestures
    // • anchors: smooth 1.8s navigation for all on-page jump links with -90px header offset
    // • autoRaf: true — Lenis manages its internal animation loop with precision
    const lenis = new Lenis({
      lerp: 0.045,
      wheelMultiplier: 0.9,
      syncTouch: true,
      syncTouchLerp: 0.06,
      touchInertiaExponent: 1.75,
      touchMultiplier: 1.15,
      gestureOrientation: "vertical",
      smoothWheel: true,
      autoRaf: true,
      anchors: {
        offset: -90,
        duration: 1.8,
      },
      respectReducedMotion: false,
    });

    // Expose lenis instance globally for external triggers or debugging
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    console.log("[Lenis] initialized with premium slow scroll (desktop & mobile)", lenis);

    return () => {
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
