"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

/* cubic-bezier(0.19, 1, 0.22, 1) — a very strong ease-out (the
   Vercel/Linear feel). Implemented as a Newton-Raphson solve for the x
   parameter, then evaluated on y, so it matches the CSS timing function
   exactly rather than approximating it with a hand-rolled polynomial. */
function cubicBezierEasing(x1: number, y1: number, x2: number, y2: number) {
  const A = (a: number, b: number) => 1 - 3 * b + 3 * a;
  const B = (a: number, b: number) => 3 * b - 6 * a;
  const C = (a: number) => 3 * a;
  const calc = (t: number, a: number, b: number) =>
    ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
  const slope = (t: number, a: number, b: number) =>
    3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);

  return (t: number): number => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    let guess = t;
    for (let i = 0; i < 8; i += 1) {
      const currentSlope = slope(guess, x1, x2);
      if (currentSlope === 0) break;
      guess -= (calc(guess, x1, x2) - t) / currentSlope;
    }
    return calc(guess, y1, y2);
  };
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reduced motion: no smoothing, no parallax. Native scrolling is left
    // completely untouched so behaviour matches the OS preference.
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: cubicBezierEasing(0.19, 1, 0.22, 1),
      smoothWheel: true,
      // Wheel/trackpad normalisation is built in as of Lenis 1.3: the wheel
      // handler unconditionally rescales every delta through
      // getDeltaMultiplier(), so line- and page-mode devices and trackpads all
      // resolve to one consistent per-notch distance. The old `normalizeWheel`
      // flag was removed in that version and is no longer a valid option.
      wheelMultiplier: 1,
      syncTouch: false,
      gestureOrientation: "vertical",
      autoRaf: false,
      // Anchor links (`#contact`, `/#verticals`, …) are intercepted and routed
      // through lenis.scrollTo so they animate instead of jumping, with a
      // negative offset clearing the fixed header pill.
      anchors: {
        offset: -90,
        duration: 1.15,
        easing: cubicBezierEasing(0.19, 1, 0.22, 1),
      },
    });

    /* Keep ScrollTrigger (and every IntersectionObserver-free reveal built on
       it) reading the *smoothed* position. Lenis normally writes to
       window.scrollTo, which ScrollTrigger only samples on native scroll
       events — so without this the triggers would lag a frame behind (or,
       with virtual scroll, never fire). Updating on every Lenis frame and
       keeping GSAP's own ticker in step makes them agree exactly. */
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    /* ── Scroll-linked ribbon parallax ────────────────────────────────────────
       The image travels with the page at 1.0 plus a counter-movement of
       (1 - speed) × the scroll distance, giving a net travel of exactly
       `speed` × distance. At 0.85 it drifts 15% slower than the content, so
       it recedes behind the page. The offset is computed from the trigger's
       real start/end scroll positions (not the element's height), so the ratio
       holds exactly at any viewport size. */
    const PARALLAX_SPEED = 0.85;

    gsap.utils.toArray<HTMLElement>("[data-lenis-parallax]").forEach((ribbon) => {
      const speed = Number(ribbon.dataset.lenisParallax) || PARALLAX_SPEED;
      const section = ribbon.closest("section, footer") || ribbon;

      gsap.set(ribbon, { y: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Scroll distance this element's section travels during the range.
          const travel = self.end - self.start;
          // Shift is centred on zero, so the image starts and ends level.
          const maxShift = (travel * (1 - speed)) / 2;
          const shift = (self.progress * 2 - 1) * maxShift;
          ribbon.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
        },
      });
    });

    /* Images and fonts settle after first paint; without this ScrollTrigger
       and Lenis both measure against pre-layout heights. */
    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh);
    const settle = window.setTimeout(refresh, 300);

    ScrollTrigger.refresh();

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(settle);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
