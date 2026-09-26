"use client";

import { useEffect, useRef, useState } from "react";
import { geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import landTopologyData from "world-atlas/land-110m.json";

type Market = {
  name: string;
  coordinates: [number, number];
  background: string;
  foreground: string;
  offset?: [number, number];
};

type Point = [number, number];

type LabelLayout = {
  market: Market;
  center: Point;
  width: number;
  height: number;
  opacity: number;
  entrance: number;
  active: boolean;
};

const markets: Market[] = [
  { name: "United States", coordinates: [-98, 39], background: "#2563EB", foreground: "#ffffff" },
  { name: "Canada", coordinates: [-98, 56], background: "#2563EB", foreground: "#ffffff" },
  { name: "UK", coordinates: [-2, 54], background: "#2563EB", foreground: "#ffffff", offset: [-20, -20] },
  { name: "Western Europe", coordinates: [2, 46], background: "#2563EB", foreground: "#ffffff", offset: [20, 20] },
  { name: "Nordics", coordinates: [15, 63], background: "#2563EB", foreground: "#ffffff" },
  { name: "Australia", coordinates: [134, -26], background: "#2563EB", foreground: "#ffffff" },
  { name: "New Zealand", coordinates: [172, -42], background: "#2563EB", foreground: "#ffffff" },
];

const topology = landTopologyData as unknown as Topology;
const land = feature(topology, topology.objects.land);
const DRAG_CUE_SESSION_KEY = "ziur-globe-drag-cue-dismissed";

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function normalizeLongitude(longitude: number) {
  return (longitude + 540) % 360 - 180;
}

function shortestLongitudeDelta(from: number, to: number) {
  return normalizeLongitude(to - from);
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function angularDistance(
  longitudeA: number,
  latitudeA: number,
  longitudeB: number,
  latitudeB: number
) {
  const toRadians = Math.PI / 180;
  const latitudeARadians = latitudeA * toRadians;
  const latitudeBRadians = latitudeB * toRadians;
  const deltaLatitude = (latitudeB - latitudeA) * toRadians;
  const deltaLongitude = (longitudeB - longitudeA) * toRadians;
  const haversine =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(latitudeARadians) *
    Math.cos(latitudeBRadians) *
    Math.sin(deltaLongitude / 2) ** 2;

  return (Math.acos(clamp(1 - 2 * haversine, -1, 1)) * 180) / Math.PI;
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function rectanglesOverlap(
  first: { left: number; right: number; top: number; bottom: number },
  second: { left: number; right: number; top: number; bottom: number },
  gap: number
) {
  return (
    first.left < second.right + gap &&
    first.right > second.left - gap &&
    first.top < second.bottom + gap &&
    first.bottom > second.top - gap
  );
}

export default function GlobalCoverageMap({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nudgePlayedRef = useRef(false);
  const [activeMarketIndex, setActiveMarketIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !context) return;

    const cue = host.querySelector<HTMLElement>("[data-drag-cue]");
    let cueDismissed = false;
    try {
      cueDismissed = window.sessionStorage.getItem(DRAG_CUE_SESSION_KEY) === "1";
    } catch {
      cueDismissed = false;
    }
    if (cueDismissed) cue?.classList.add("gc-cue-dismissed");

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let centerLongitude = -30;
    let centerLatitude = 20;
    let hovered = false;
    let dragging = false;
    let activePointerId: number | null = null;
    let previousPointerX = 0;
    let visible = false;
    let animationFrame = 0;
    let previousTime = 0;
    let orbitElapsed = 0;
    let introElapsed = 0;
    let resumeDelay = 0;
    let tourIndex = 0;
    let tourPhase: "move" | "hold" = "move";
    let tourElapsed = 0;
    let moveFromLongitude = -30;
    let moveFromLatitude = 20;
    let moveToLongitude = -98;
    let moveToLatitude = 39;
    let nudgeActive = false;
    let nudgeElapsed = 0;
    let nudgeOffset = 0;
    let hasDragged = false;
    let rimGlowOpacity = 0.475;
    let glowFrame = 0;
    let cueTimer = 0;

    const projection = geoOrthographic()
      .clipAngle(90)
      .precision(0.4)
      .rotate([30, -20, 15]);
    const path = geoPath(projection, context);

    const beginTourMove = (index: number) => {
      const target = markets[index].coordinates;
      const longitudeDelta = shortestLongitudeDelta(centerLongitude, target[0]);
      tourIndex = index;
      tourPhase = "move";
      tourElapsed = 0;
      moveFromLongitude = centerLongitude;
      moveFromLatitude = centerLatitude;
      moveToLongitude = centerLongitude + longitudeDelta;
      moveToLatitude = target[1];
      setActiveMarketIndex(-1);
    };

    const settleTourMove = () => {
      centerLongitude = normalizeLongitude(moveToLongitude);
      centerLatitude = moveToLatitude;
      tourPhase = "hold";
      tourElapsed = 0;
      setActiveMarketIndex(tourIndex);
    };

    const advanceTour = (delta: number) => {
      tourElapsed += delta;

      if (tourPhase === "move") {
        const progress = clamp(tourElapsed / 1.4);
        const eased = easeInOutCubic(progress);
        centerLongitude =
          moveFromLongitude + (moveToLongitude - moveFromLongitude) * eased;
        centerLatitude =
          moveFromLatitude + (moveToLatitude - moveFromLatitude) * eased;
        if (progress >= 1) settleTourMove();
        return;
      }

      // During hold phase: maintain continuous ambient rotation drift so the globe stays in continuous motion
      centerLongitude = normalizeLongitude(centerLongitude - delta * 3.5);

      if (tourElapsed >= 2.2) {
        beginTourMove((tourIndex + 1) % markets.length);
      }
    };

    const measurePill = (market: Market) => {
      context.font = "600 12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      return {
        width: context.measureText(market.name).width + 28,
        height: 30,
      };
    };

    const drawRoundedPill = (layout: LabelLayout) => {
      const entranceScale = 0.9 + layout.entrance * 0.1;
      const activeScale = layout.active ? 1.08 : 1;
      const scale = entranceScale * activeScale;

      context.save();
      context.translate(layout.center[0], layout.center[1]);
      context.scale(scale, scale);
      context.globalAlpha = layout.opacity;
      context.filter = layout.active ? "brightness(1.14)" : "none";
      context.shadowColor = layout.active
        ? "rgba(59,130,246,0.28)"
        : hovered
          ? "rgba(59,130,246,0.22)"
          : "rgba(0,0,0,0.5)";
      context.shadowBlur = layout.active ? 26 : hovered ? 28 : 20;
      context.shadowOffsetY = 6;
      roundedRect(
        context,
        -layout.width / 2,
        -layout.height / 2,
        layout.width,
        layout.height,
        layout.height / 2
      );
      context.fillStyle = layout.market.background;
      context.fill();
      context.shadowColor = "transparent";
      context.shadowBlur = 0;
      context.shadowOffsetY = 0;
      context.fillStyle = layout.market.foreground;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(layout.market.name, 0, 0.5);
      context.restore();
    };

    const draw = () => {
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const globeRadius = Math.min(width, height) * 0.46;
      const rimBrightness = clamp(rimGlowOpacity + (hovered ? 0.12 : 0), 0, 0.8);

      projection
        .translate([centerX, centerY])
        .scale(globeRadius)
        .rotate([-centerLongitude - nudgeOffset, -centerLatitude, 15]);

      context.save();
      context.beginPath();
      path({ type: "Sphere" });
      context.fillStyle = "#000000";
      context.fill();
      context.strokeStyle = "#000000";
      context.lineWidth = 1;
      context.stroke();

      context.save();
      context.beginPath();
      path({ type: "Sphere" });
      context.globalAlpha = rimBrightness;
      context.shadowColor = "rgba(37,99,235,0.35)";
      context.shadowBlur = 24;
      context.strokeStyle = "rgba(37,99,235,0.35)";
      context.lineWidth = 1.5;
      context.stroke();
      context.restore();

      context.beginPath();
      path(land);
      context.fillStyle = "#2a2a2a";
      context.fill();
      context.restore();

      const invertedCenter = projection.invert?.([centerX, centerY]) ?? [
        centerLongitude,
        centerLatitude,
      ];
      const visibleLongitude = invertedCenter[0];
      const visibleLatitude = invertedCenter[1];
      const pendingLayouts: LabelLayout[] = [];

      for (let index = 0; index < markets.length; index += 1) {
        const market = markets[index];
        const distance = angularDistance(
          visibleLongitude,
          visibleLatitude,
          market.coordinates[0],
          market.coordinates[1]
        );
        if (distance >= 90) continue;

        const point = projection(market.coordinates);
        if (!point) continue;

        const size = measurePill(market);
        const offset = market.offset ?? [0, 0];
        pendingLayouts.push({
          market,
          center: [point[0] + offset[0], point[1] + offset[1]],
          width: size.width,
          height: size.height,
          opacity:
            clamp((90 - distance) / 15) *
            (reducedMotion ? 1 : clamp((introElapsed - index * 0.07) / 0.4)),
          entrance: reducedMotion
            ? 1
            : clamp((introElapsed - index * 0.07) / 0.4),
          active: !reducedMotion && tourPhase === "hold" && tourIndex === index,
        });
      }

      const placedLayouts: LabelLayout[] = [];
      const collisionDirections: Point[] = [
        [0, 36],
        [0, -36],
        [36, 0],
        [-36, 0],
        [36, 36],
        [-36, -36],
        [36, -36],
        [-36, 36],
      ];

      for (const layout of pendingLayouts) {
        const collisionWidth = layout.width * 1.08;
        const collisionHeight = layout.height * 1.08;
        let resolvedCenter = layout.center;

        const fitsCanvas = (candidate: Point) =>
          candidate[0] - collisionWidth / 2 >= 8 &&
          candidate[0] + collisionWidth / 2 <= width - 8 &&
          candidate[1] - collisionHeight / 2 >= 8 &&
          candidate[1] + collisionHeight / 2 <= height - 8;

        const overlapsPlaced = (candidate: Point) => {
          const rect = {
            left: candidate[0] - collisionWidth / 2,
            right: candidate[0] + collisionWidth / 2,
            top: candidate[1] - collisionHeight / 2,
            bottom: candidate[1] + collisionHeight / 2,
          };
          return placedLayouts.some((placed) =>
            rectanglesOverlap(
              rect,
              {
                left: placed.center[0] - (placed.width * 1.08) / 2,
                right: placed.center[0] + (placed.width * 1.08) / 2,
                top: placed.center[1] - (placed.height * 1.08) / 2,
                bottom: placed.center[1] + (placed.height * 1.08) / 2,
              },
              8
            )
          );
        };

        if (!fitsCanvas(resolvedCenter) || overlapsPlaced(resolvedCenter)) {
          let found = false;
          for (let pass = 0; pass < 3 && !found; pass += 1) {
            for (const direction of collisionDirections) {
              const candidate: Point = [
                layout.center[0] + direction[0] * (pass + 1),
                layout.center[1] + direction[1] * (pass + 1),
              ];
              if (fitsCanvas(candidate) && !overlapsPlaced(candidate)) {
                resolvedCenter = candidate;
                found = true;
                break;
              }
            }
          }
        }

        placedLayouts.push({ ...layout, center: resolvedCenter });
      }

      for (const layout of placedLayouts) drawRoundedPill(layout);
    };

    const frame = (time: number) => {
      animationFrame = 0;
      if (!visible || document.hidden || reducedMotion || dragging) return;

      if (!previousTime) previousTime = time;
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      if (resumeDelay > 0) {
        resumeDelay = Math.max(0, resumeDelay - delta);
        // Keep ambient drift during resume delay so it remains continuous
        centerLongitude = normalizeLongitude(centerLongitude - delta * 2.5);
        draw();
        animationFrame = window.requestAnimationFrame(frame);
        return;
      }

      if (nudgeActive) {
        nudgeElapsed += delta;
        const cycleProgress = (nudgeElapsed % 1.6) / 1.6;
        const travel = cycleProgress < 0.5
          ? easeInOutCubic(cycleProgress * 2)
          : 1 - easeInOutCubic((cycleProgress - 0.5) * 2);
        nudgeOffset = 14 * travel;
        if (nudgeElapsed >= 3.2) {
          nudgeActive = false;
          nudgeOffset = 0;
        }
      } else {
        advanceTour(delta);
      }

      rimGlowOpacity =
        (hasDragged ? 0.35 : 0.475) +
        (hasDragged ? 0.12 : 0.225) * Math.sin((orbitElapsed / 2.6) * Math.PI * 2);

      orbitElapsed = (orbitElapsed + delta) % 60;
      introElapsed = Math.min(1.2, introElapsed + delta);
      draw();
      animationFrame = window.requestAnimationFrame(frame);
    };

    const syncAnimation = () => {
      if (reducedMotion) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        previousTime = 0;
        draw();
        return;
      }

      if (visible && !document.hidden) {
        if (!animationFrame) {
          previousTime = 0;
          animationFrame = window.requestAnimationFrame(frame);
        }
      } else if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        previousTime = 0;
      }
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      draw();
      syncAnimation();
    };

    const startGlowFade = () => {
      if (hasDragged) return;
      hasDragged = true;
      if (reducedMotion) {
        rimGlowOpacity = 0.15;
        draw();
        return;
      }
      const startOpacity = rimGlowOpacity;
      const startTime = performance.now();
      const fade = (time: number) => {
        glowFrame = 0;
        const progress = clamp((time - startTime) / 600);
        rimGlowOpacity =
          startOpacity + (0.15 - startOpacity) * easeInOutCubic(progress);
        draw();
        if (progress < 1) glowFrame = window.requestAnimationFrame(fade);
      };
      glowFrame = window.requestAnimationFrame(fade);
    };

    const dismissCue = () => {
      if (cueDismissed) return;
      cueDismissed = true;
      if (cueTimer) window.clearTimeout(cueTimer);
      cueTimer = 0;
      cue?.classList.remove("gc-cue-visible");
      cue?.classList.add("gc-cue-dismissed");
      try {
        window.sessionStorage.setItem(DRAG_CUE_SESSION_KEY, "1");
      } catch {
        cueDismissed = true;
      }
    };

    const enter = () => {
      hovered = true;
      canvas.style.cursor = "grab";
      draw();
      syncAnimation();
    };

    const leave = () => {
      hovered = false;
      if (!dragging) canvas.style.cursor = "grab";
      draw();
      syncAnimation();
    };

    const pointerDown = (event: PointerEvent) => {
      dismissCue();
      startGlowFade();
      dragging = true;
      hovered = true;
      activePointerId = event.pointerId;
      previousPointerX = event.clientX;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Safe fallback
      }
      canvas.style.cursor = "grabbing";
      setActiveMarketIndex(-1);
      syncAnimation();
    };

    const pointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== activePointerId) return;
      if (event.cancelable) {
        event.preventDefault();
      }
      const deltaX = event.clientX - previousPointerX;
      previousPointerX = event.clientX;
      centerLongitude = normalizeLongitude(centerLongitude - deltaX * 0.28);
      draw();
    };

    const pointerUp = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      dragging = false;
      activePointerId = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      if (event.pointerType !== "mouse") hovered = false;
      canvas.style.cursor = "grab";

      if (tourPhase === "move") {
        const target = markets[tourIndex].coordinates;
        moveFromLongitude = centerLongitude;
        moveFromLatitude = centerLatitude;
        moveToLongitude =
          centerLongitude + shortestLongitudeDelta(centerLongitude, target[0]);
        moveToLatitude = target[1];
        tourElapsed = 0;
      } else {
        tourElapsed = 0;
      }
      resumeDelay = 0.8;
      syncAnimation();
    };

    const keyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      dismissCue();
      nudgeActive = false;
      nudgeOffset = 0;
      const direction = event.key === "ArrowLeft" ? -10 : 10;
      centerLongitude = normalizeLongitude(centerLongitude + direction);
      setActiveMarketIndex(-1);

      if (!reducedMotion) {
        if (tourPhase === "move") {
          const target = markets[tourIndex].coordinates;
          moveFromLongitude = centerLongitude;
          moveFromLatitude = centerLatitude;
          moveToLongitude =
            centerLongitude + shortestLongitudeDelta(centerLongitude, target[0]);
          moveToLatitude = target[1];
          tourElapsed = 0;
        }
        resumeDelay = 3;
        syncAnimation();
      }
      draw();
    };

    const jumpToMarket = (index: number) => {
      const target = markets[index].coordinates;
      if (reducedMotion) {
        centerLongitude = target[0];
        centerLatitude = target[1];
        setActiveMarketIndex(index);
        draw();
        return;
      }
      resumeDelay = 0;
      beginTourMove(index);
      syncAnimation();
    };

    const progressButtons = Array.from(
      host.querySelectorAll<HTMLButtonElement>("[data-market-index]")
    );
    const buttonHandlers = progressButtons.map((button) => {
      const handler = () => jumpToMarket(Number(button.dataset.marketIndex));
      button.addEventListener("click", handler);
      return { button, handler };
    });

    const visibilityChange = () => syncAnimation();

    const reducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        centerLongitude = -30;
        centerLatitude = 20;
        orbitElapsed = 0;
        introElapsed = 1.2;
        setActiveMarketIndex(-1);
      } else {
        resumeDelay = 0;
      }
      syncAnimation();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !nudgePlayedRef.current) {
          nudgePlayedRef.current = true;
          if (!reducedMotion) {
            nudgeActive = true;
            nudgeElapsed = 0;
            nudgeOffset = 0;
            resumeDelay = 0;
          }
          if (!cueDismissed) {
            cueTimer = window.setTimeout(() => {
              cue?.classList.add("gc-cue-visible");
            }, 800);
          }
        }
        syncAnimation();
      },
      { threshold: 0.15 }
    );
    intersectionObserver.observe(host);

    const touchMove = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }
    };

    canvas.addEventListener("pointerenter", enter);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    canvas.addEventListener("touchstart", dismissCue, { passive: true });
    canvas.addEventListener("touchmove", touchMove, { passive: false });
    canvas.addEventListener("keydown", keyDown);
    document.addEventListener("visibilitychange", visibilityChange);
    reducedMotionQuery.addEventListener("change", reducedMotionChange);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (glowFrame) window.cancelAnimationFrame(glowFrame);
      if (cueTimer) window.clearTimeout(cueTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointerenter", enter);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("touchstart", dismissCue);
      canvas.removeEventListener("touchmove", touchMove);
      canvas.removeEventListener("keydown", keyDown);
      document.removeEventListener("visibilitychange", visibilityChange);
      reducedMotionQuery.removeEventListener("change", reducedMotionChange);
    };
  }, []);

  return (
    <div className={`gc-card ${className}`}>
      <style>{`
        .gc-card {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 32px;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.06);
          touch-action: none;
        }
        .gc-stage {
          position: absolute;
          inset: 0;
          touch-action: none;
        }
        .gc-stage canvas {
          display: block;
          width: 100%;
          height: 100%;
          touch-action: none;
          cursor: grab;
        }
        .gc-stage canvas:focus-visible {
          outline: 2px solid rgba(255,255,255,0.7);
          outline-offset: -5px;
        }
        .gc-drag-cue {
          position: absolute;
          left: 50%;
          bottom: 24px;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.8);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translateX(-50%) translateY(4px);
          transition: opacity 800ms ease, transform 800ms ease;
        }
        .gc-drag-cue.gc-cue-visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .gc-drag-cue.gc-cue-dismissed {
          opacity: 0;
          transition-duration: 300ms;
        }
        .gc-cue-arrow {
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
        }
        .gc-cue-arrow-left { animation: gc-cue-left 1.8s ease-in-out infinite; }
        .gc-cue-arrow-right { animation: gc-cue-right 1.8s ease-in-out infinite; }
        @keyframes gc-cue-left {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-3px); }
        }
        @keyframes gc-cue-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gc-cue-arrow-left, .gc-cue-arrow-right { animation: none; }
        }
      `}</style>

      <div className="gc-stage">
        <canvas
          ref={canvasRef}
          role="img"
          tabIndex={0}
          aria-label="Interactive globe, drag to rotate"
          style={{ touchAction: "none" }}
        />
      </div>

      <div className="gc-drag-cue" data-drag-cue>
        <svg
          className="gc-cue-arrow gc-cue-arrow-left"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 5L6 9l4 4M6 5l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Drag to explore</span>
        <svg
          className="gc-cue-arrow gc-cue-arrow-right"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 5l4 4-4 4M12 5l-4 4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
