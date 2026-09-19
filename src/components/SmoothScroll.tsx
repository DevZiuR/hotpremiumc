"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Luxury editorial smooth scrolling configuration for both Desktop & Mobile:
    // • lerp: 0.022 — very heavy, weighted deceleration for ultra-premium inertia on desktop
    // • wheelMultiplier: 0.65 — dramatically fewer pixels per notch; slow, deliberate coast
    // • syncTouch: true — enables Lenis smooth virtual scroll on touch/mobile devices
    // • syncTouchLerp: 0.035 — deeply cushioned touch deceleration after finger release
    // • touchInertiaExponent: 1.75 — velvety friction-based coasting for touch flings
    // • touchMultiplier: 1.1 — natural finger tracking without jerky jumps
    // • gestureOrientation: "vertical" — prevents vertical scroll hijacking horizontal gestures
    // • anchors: smooth 2.2s navigation for all on-page jump links with -90px header offset
    // • autoRaf: true — Lenis manages its internal animation loop with precision
    const lenis = new Lenis({
      lerp: 0.022,
      wheelMultiplier: 0.65,
      syncTouch: true,
      syncTouchLerp: 0.035,
      touchInertiaExponent: 1.75,
      touchMultiplier: 1.1,
      gestureOrientation: "vertical",
      smoothWheel: true,
      autoRaf: true,
      anchors: {
        offset: -90,
        duration: 2.2,
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
