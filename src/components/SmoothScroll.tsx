"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Premium smooth scrolling — lighter feel, consistent across the full page
    // • lerp: 0.07 — natural weighted deceleration without feeling sluggish
    // • wheelMultiplier: 0.85 — slightly fewer pixels per notch for a polished coast
    // • syncTouch: true — smooth virtual scroll on touch/mobile
    // • syncTouchLerp: 0.08 — responsive but cushioned touch deceleration
    // • touchInertiaExponent: 1.6 — gentle friction on flings
    // • touchMultiplier: 1.1 — natural 1:1 finger tracking
    const lenis = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 0.85,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchInertiaExponent: 1.6,
      touchMultiplier: 1.1,
      gestureOrientation: "vertical",
      smoothWheel: true,
      autoRaf: true,
      anchors: {
        offset: -90,
        duration: 1.6,
      },
      respectReducedMotion: false,
    });

    // Expose lenis instance globally for external triggers or debugging
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    console.log("[Lenis] initialized", lenis);

    return () => {
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
