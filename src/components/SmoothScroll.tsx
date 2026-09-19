"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Luxury editorial smooth scrolling configuration for both Desktop & Mobile:
    // • lerp: starts at 0.01, ramps to 0.022 — "cold start" easing makes the first scrolls ultra-premium
    // • wheelMultiplier: 0.65 — dramatically fewer pixels per notch; slow, deliberate coast
    // • syncTouch: true — enables Lenis smooth virtual scroll on touch/mobile devices
    // • syncTouchLerp: 0.035 — deeply cushioned touch deceleration after finger release
    // • touchInertiaExponent: 1.75 — velvety friction-based coasting for touch flings
    // • touchMultiplier: 1.1 — natural finger tracking without jerky jumps
    // • gestureOrientation: "vertical" — prevents vertical scroll hijacking horizontal gestures
    // • anchors: smooth 2.2s navigation for all on-page jump links with -90px header offset
    // • autoRaf: true — Lenis manages its internal animation loop with precision
    const LERP_START = 0.01;   // ultra-heavy on cold start
    const LERP_END   = 0.022;  // settled cruise lerp
    const RAMP_MS    = 1400;   // ramp duration in ms

    const lenis = new Lenis({
      lerp: LERP_START,
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

    // "Cold start" lerp ramp: triggers on first scroll, eases from 0.01 → 0.022 over 1.4s
    let rampInterval: ReturnType<typeof setInterval> | null = null;
    const startRamp = () => {
      if (rampInterval) return; // only run once
      const t0 = Date.now();
      rampInterval = setInterval(() => {
        const elapsed = Date.now() - t0;
        const progress = Math.min(elapsed / RAMP_MS, 1);
        // cubic-out easing: fast start, decelerates into target
        const eased = 1 - Math.pow(1 - progress, 3);
        (lenis.options as { lerp: number }).lerp = LERP_START + (LERP_END - LERP_START) * eased;
        if (progress >= 1 && rampInterval) {
          clearInterval(rampInterval);
          rampInterval = null;
        }
      }, 16);
    };
    lenis.on("scroll", startRamp);

    // Expose lenis instance globally for external triggers or debugging
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    console.log("[Lenis] initialized with premium slow scroll (desktop & mobile)", lenis);

    return () => {
      if (rampInterval) clearInterval(rampInterval);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
