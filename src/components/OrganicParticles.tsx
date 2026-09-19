"use client";

import React, { useEffect, useRef } from "react";

interface FilamentDot {
  u: number;
  v: number;
  size: number;
  stagger: number;
  phase: number;
  freq: number;
  amp: number;
  swayFactor: number;
}

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  depth: number;
  progress: number; // 0 (root) to 1 (outermost canopy)
}

// 6 visual tiers:
// 0: ink low, 1: ink mid, 2: ink high, 3: slate low, 4: slate high, 5: accent
const INK_BUCKET_STYLES = [
  "rgba(16, 26, 43, 0.20)",
  "rgba(16, 26, 43, 0.36)",
  "rgba(16, 26, 43, 0.56)",
  "rgba(91, 100, 114, 0.16)",
  "rgba(91, 100, 114, 0.32)",
  "rgba(37, 99, 235, 0.42)",
];

// Luminous styling for dark/navy backgrounds
const NAVY_BUCKET_STYLES = [
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.32)",
  "rgba(255, 255, 255, 0.60)",
  "rgba(147, 197, 253, 0.22)",
  "rgba(147, 197, 253, 0.45)",
  "rgba(37, 99, 235, 0.70)",
];

/**
 * Procedurally generates an authentic, multi-tier fractal coral tree (Gorgonia / Sea Fan)
 * partitioned directly into static render buckets to ensure zero GC allocations during animation.
 */
function generateFractalCoral(): FilamentDot[][] {
  const segments: Segment[] = [];

  // Recursive branching function (preserves exact branch structure, bifurcations and curvature)
  function growLobe(
    x: number,
    y: number,
    angle: number,
    length: number,
    width: number,
    depth: number,
    maxDepth: number,
    parentProgress: number
  ) {
    const steps = depth <= 1 ? 8 : 5;
    let curX = x;
    let curY = y;
    let curAngle = angle;
    const stepDist = length / steps;

    for (let s = 1; s <= steps; s++) {
      const segT = s / steps;
      const overallProgress = parentProgress + (1 - parentProgress) * (segT * 0.25);

      // Organic natural curvature
      curAngle += Math.sin(segT * 3.14 + depth * 0.8) * (0.045 + depth * 0.015);

      const nextX = curX + Math.cos(curAngle) * stepDist * 1.15;
      const nextY = curY + Math.sin(curAngle) * stepDist * 0.9;

      const segWidth = Math.max(2.5, width * (1 - segT * 0.35));

      segments.push({
        x1: curX,
        y1: curY,
        x2: nextX,
        y2: nextY,
        width: segWidth,
        depth,
        progress: overallProgress,
      });

      curX = nextX;
      curY = nextY;
    }

    if (depth >= maxDepth) return;

    // Natural bifurcation (branching into 2 or 3 sub-limbs)
    const forkCount = depth < 2 ? 2 : (Math.random() < 0.65 ? 2 : 1);
    const spreadBase = 0.32 + Math.random() * 0.12;

    for (let f = 0; f < forkCount; f++) {
      const sign = f === 0 ? 1 : -1;
      const forkAngle = curAngle + sign * spreadBase + (Math.random() - 0.5) * 0.1;
      const nextLength = length * (0.72 + Math.random() * 0.12);
      const nextWidth = width * 0.74;

      growLobe(
        curX,
        curY,
        forkAngle,
        nextLength,
        nextWidth,
        depth + 1,
        maxDepth,
        parentProgress + 0.18
      );
    }
  }

  // 6 main root trunks emerging from edge (u = 0) spanning vertical angles
  const trunkConfigs = [
    { angle: -0.96, length: 0.22, width: 26, startV: 0.44 },
    { angle: -0.62, length: 0.25, width: 28, startV: 0.47 },
    { angle: -0.26, length: 0.28, width: 30, startV: 0.49 },
    { angle:  0.08, length: 0.28, width: 30, startV: 0.51 },
    { angle:  0.42, length: 0.25, width: 28, startV: 0.53 },
    { angle:  0.78, length: 0.22, width: 26, startV: 0.56 },
  ];

  trunkConfigs.forEach((t) => {
    growLobe(0.005, t.startV, t.angle, t.length, t.width, 0, 4, 0);
  });

  // Buckets: [inkLow, inkMid, inkHigh, slateLow, slateHigh, accent]
  const buckets: FilamentDot[][] = [[], [], [], [], [], []];

  segments.forEach((seg) => {
    const dx = seg.x2 - seg.x1;
    const dy = seg.y2 - seg.y1;
    const len = Math.hypot(dx, dy) || 1;
    const normX = -dy / len;
    const normY = dx / len;

    // Filament distribution — reduced density keeps lace texture but ~40% fewer dots
    const numFilaments = seg.depth === 0 ? 4 : seg.depth === 1 ? 3 : 2;
    const numSamples = Math.max(3, Math.round(len * 110));

    for (let f = 0; f < numFilaments; f++) {
      const lateralRatio = (f / (numFilaments - 1) - 0.5) * 2; // -1 to 1
      const isCore = Math.abs(lateralRatio) < 0.4;
      const offsetDist = (lateralRatio * seg.width * 0.45) / 380; // normalized UV offset

      for (let s = 0; s <= numSamples; s++) {
        const t = s / numSamples;
        const baseU = seg.x1 + dx * t;
        const baseV = seg.y1 + dy * t;

        // Structured stipple placement with subtle natural micro-jitter
        const jitter = (Math.random() - 0.5) * 0.002;
        const u = baseU + normX * offsetDist + jitter;
        const v = baseV + normY * offsetDist + jitter;

        // Stay within bounds
        if (u < 0.002 || u > 0.98 || v < 0.02 || v > 0.98) continue;

        // Compensate density smoothly via calibrated radius to maintain identical lace texture
        const size = isCore ? 0.92 + Math.random() * 0.35 : 0.72 + Math.random() * 0.3;

        // Base alpha: editorial ink/slate tones
        const baseAlpha = isCore
          ? 0.38 + Math.random() * 0.28
          : 0.18 + Math.random() * 0.22;

        const colorRoll = Math.random();
        const colorType = colorRoll < 0.09 ? "accent" : (colorRoll < 0.48 ? "slate" : "ink");

        let bucketIndex = 0;
        let finalSize = size;
        if (colorType === "accent") {
          bucketIndex = 5;
          finalSize = size * 1.05;
        } else if (colorType === "slate") {
          bucketIndex = baseAlpha > 0.28 ? 4 : 3;
        } else {
          bucketIndex = baseAlpha > 0.42 ? 2 : baseAlpha > 0.26 ? 1 : 0;
        }

        buckets[bucketIndex].push({
          u,
          v,
          size: finalSize,
          stagger: Math.min(0.95, Math.max(0, u * 0.9 + (Math.random() - 0.5) * 0.08)),
          phase: Math.random() * Math.PI * 2,
          freq: 0.25 + Math.random() * 0.3,
          amp: 1.2 + Math.random() * 2.8,
          swayFactor: Math.pow(seg.progress, 1.4),
        });
      }
    }
  });

  return buckets;
}

export function OrganicParticles({
  theme = "ink",
  side = "both",
}: {
  theme?: "ink" | "navy" | "light";
  side?: "both" | "left" | "right";
} = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Coral buckets start empty; populated off the critical path via requestIdleCallback
    // so they never block first paint / LCP.
    let leftBuckets: FilamentDot[][] = [[], [], [], [], [], []];
    let rightBuckets: FilamentDot[][] = [[], [], [], [], [], []];
    let coralReady = false;

    let animationFrameId: number;
    let isRunning = false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Entrance animation state
    const entranceDuration = 2200; // ms
    let startTime: number | null = null;
    let entranceComplete = false;

    // Mouse proximity tracking
    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;

    // Smooth hover intensities for left and right vein graphics (0 = rest, 1 = fully active)
    let hoverLeft = 0;
    let hoverRight = 0;

    // Cache canvas rect — updated on resize, NOT on every mousemove.
    let canvasRect = canvas.getBoundingClientRect();
    const refreshCanvasRect = () => { canvasRect = canvas.getBoundingClientRect(); };

    // Attach mousemove to window (passive) and mouseleave to canvas/window
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX - canvasRect.left;
      targetMouseY = e.clientY - canvasRect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    let figureWidth = 0;
    let figureHeight = 0;
    let figureTop = 0;

    const updateDimensions = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Clamp DPR cleanly: 1.5 on mobile to avoid fill-rate exhaustion, 2 on desktop
      const isMobile = width < 768;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const reachRatio = width < 768 ? 0.15 : width < 1200 ? 0.18 : 0.195;
      figureWidth = Math.min(width * reachRatio, 275);
      figureHeight = Math.min(height * 0.90, 660);
      figureTop = (height - figureHeight) * 0.5;
    };

    updateDimensions();
    refreshCanvasRect();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
      refreshCanvasRect();
    });
    resizeObserver.observe(container);

    // Also refresh on scroll (canvas top offset changes) — throttled via passive
    window.addEventListener("scroll", refreshCanvasRect, { passive: true });

    // Frame throttle: target 60fps during entrance/hover/mouse interaction, 30fps when completely idle.
    let lastFrameTime = 0;
    const IDLE_INTERVAL = 1000 / 30; // 30 fps
    const ACTIVE_INTERVAL = 0;       // unlimited (browser vsync ~60 fps)

    const render = (timestamp: number) => {
      if (!isRunning) return;

      // Nothing to draw yet — skip frame but keep the loop alive
      if (!coralReady) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Throttle frame rate when completely idle (entrance done, no hover, cursor away)
      const isHoverActive = hoverLeft > 0.005 || hoverRight > 0.005;
      const isMouseNear = targetMouseX > -5000;
      const interval = (!entranceComplete || isMouseNear || isHoverActive) ? ACTIVE_INTERVAL : IDLE_INTERVAL;
      if (interval > 0 && timestamp - lastFrameTime < interval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = timestamp;

      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Mouse smoothing — only lerp when cursor is actually near the canvas
      if (targetMouseX > -5000) {
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }

      const rawEntrance = Math.min(1, elapsed / entranceDuration);
      if (rawEntrance >= 1) entranceComplete = true;

      // Hover zone hit-testing for left and right vein figures
      // Reaches generously over the filament area so hover triggers naturally
      const hitMargin = Math.max(figureWidth + 70, width * 0.28);
      const isMouseInHeroY = mouseY >= figureTop - 60 && mouseY <= figureTop + figureHeight + 60;
      const isNearLeft = mouseX >= -60 && mouseX <= hitMargin && isMouseInHeroY;
      const isNearRight = mouseX >= width - hitMargin && mouseX <= width + 60 && isMouseInHeroY;

      // Slow, smooth lerp transition (takes ~0.65s to ramp in/out, preventing fast jumps)
      const targetHoverLeft = isNearLeft ? 1 : 0;
      const targetHoverRight = isNearRight ? 1 : 0;
      hoverLeft += (targetHoverLeft - hoverLeft) * 0.038;
      hoverRight += (targetHoverRight - hoverRight) * 0.038;

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      const timeSec = timestamp * 0.001;

      // Fast bounding-box check: physical cursor deflection when mouse is right over filaments
      const checkMouseLeft =
        mouseX > -90 &&
        mouseX < figureWidth + 90 &&
        mouseY > figureTop - 90 &&
        mouseY < figureTop + figureHeight + 90;

      const checkMouseRight =
        mouseX > width - figureWidth - 90 &&
        mouseX < width + 90 &&
        mouseY > figureTop - 90 &&
        mouseY < figureTop + figureHeight + 90;

      // Slow traveling wave parameters (period ~3.8s for smooth, majestic sweep)
      const waveSpeed = 0.26;
      const wavePosLeft = (timeSec * waveSpeed) % 1.0;
      const wavePosRight = (timeSec * waveSpeed + 0.5) % 1.0; // organic phase offset

      // Gentle breathing opacity pulse across strands during hover (~4.6s cycle)
      const pulseLeft = 1.0 + Math.sin(timeSec * 1.35) * (0.20 * hoverLeft);
      const pulseRight = 1.0 + Math.sin(timeSec * 1.35) * (0.20 * hoverRight);

      const styles =
        theme === "navy" || theme === "light"
          ? NAVY_BUCKET_STYLES
          : INK_BUCKET_STYLES;

      // ── 1. Base Strands: Left Figure ──
      if (side !== "right") {
        ctx.save();
        // Gentle opacity pulse across the left strands
        ctx.globalAlpha = Math.min(1.0, pulseLeft * (1.0 + 0.25 * hoverLeft));

        for (let b = 0; b < 6; b++) {
          const leftBatch = leftBuckets[b];
          const leftLen = leftBatch.length;
          if (leftLen === 0) continue;

          ctx.beginPath();
          ctx.fillStyle = styles[b];

          for (let i = 0; i < leftLen; i++) {
            const d = leftBatch[i];
            if (!entranceComplete) {
              const startT = d.stagger * 0.65;
              if ((rawEntrance - startT) / 0.35 <= 0) continue;
            }

            let worldX = d.u * figureWidth;
            let worldY = figureTop + d.v * figureHeight;

            if (d.swayFactor > 0.005) {
              worldX += Math.sin(timeSec * d.freq + d.phase) * (d.amp * d.swayFactor);
              worldY += Math.cos(timeSec * d.freq * 0.75 + d.phase) * (d.amp * 0.5 * d.swayFactor);
            }

            if (checkMouseLeft) {
              const dx = worldX - mouseX;
              if (Math.abs(dx) < 90) {
                const dy = worldY - mouseY;
                if (Math.abs(dy) < 90) {
                  const distSq = dx * dx + dy * dy;
                  if (distSq < 8100 && distSq > 1) {
                    const dist = Math.sqrt(distSq);
                    const force = (1 - dist / 90) * 8 * d.swayFactor;
                    worldX += (dx / dist) * force;
                    worldY += (dy / dist) * force;
                  }
                }
              }
            }

            // Subtle dot expansion along traveling wave
            let dotSize = d.size;
            if (hoverLeft > 0.01) {
              const waveDiff = (d.stagger - wavePosLeft + 1.0) % 1.0;
              if (waveDiff < 0.22) {
                const waveIntensity = Math.sin((waveDiff / 0.22) * Math.PI);
                dotSize += d.size * 0.28 * waveIntensity * hoverLeft;
              }
            }

            ctx.moveTo(worldX + dotSize, worldY);
            ctx.arc(worldX, worldY, dotSize, 0, Math.PI * 2);
          }
          ctx.fill();
        }
        ctx.restore();
      }

      // ── 2. Base Strands: Right Figure ──
      if (side !== "left") {
        ctx.save();
        // Gentle opacity pulse across the right strands
        ctx.globalAlpha = Math.min(1.0, pulseRight * (1.0 + 0.25 * hoverRight));

        for (let b = 0; b < 6; b++) {
          const rightBatch = rightBuckets[b];
          const rightLen = rightBatch.length;
          if (rightLen === 0) continue;

          ctx.beginPath();
          ctx.fillStyle = styles[b];

          for (let i = 0; i < rightLen; i++) {
            const d = rightBatch[i];
            if (!entranceComplete) {
              const startT = d.stagger * 0.65;
              if ((rawEntrance - startT) / 0.35 <= 0) continue;
            }

            let worldX = width - d.u * figureWidth;
            let worldY = figureTop + d.v * figureHeight;

            if (d.swayFactor > 0.005) {
              worldX -= Math.sin(timeSec * d.freq + d.phase) * (d.amp * d.swayFactor);
              worldY += Math.cos(timeSec * d.freq * 0.75 + d.phase) * (d.amp * 0.5 * d.swayFactor);
            }

            if (checkMouseRight) {
              const dx = worldX - mouseX;
              if (Math.abs(dx) < 90) {
                const dy = worldY - mouseY;
                if (Math.abs(dy) < 90) {
                  const distSq = dx * dx + dy * dy;
                  if (distSq < 8100 && distSq > 1) {
                    const dist = Math.sqrt(distSq);
                    const force = (1 - dist / 90) * 8 * d.swayFactor;
                    worldX += (dx / dist) * force;
                    worldY += (dy / dist) * force;
                  }
                }
              }
            }

            // Subtle dot expansion along traveling wave
            let dotSize = d.size;
            if (hoverRight > 0.01) {
              const waveDiff = (d.stagger - wavePosRight + 1.0) % 1.0;
              if (waveDiff < 0.22) {
                const waveIntensity = Math.sin((waveDiff / 0.22) * Math.PI);
                dotSize += d.size * 0.28 * waveIntensity * hoverRight;
              }
            }

            ctx.moveTo(worldX + dotSize, worldY);
            ctx.arc(worldX, worldY, dotSize, 0, Math.PI * 2);
          }
          ctx.fill();
        }
        ctx.restore();
      }

      // ── 3. Shimmer & Glow Travel Pass (Left) ──
      // On hover, animate a subtle luminous shimmer traveling smoothly along the lines
      if (hoverLeft > 0.01 && side !== "right") {
        ctx.save();
        ctx.shadowColor = theme === "navy" ? "rgba(147, 197, 253, 0.50)" : "rgba(37, 99, 235, 0.45)";
        ctx.shadowBlur = 7 * hoverLeft;
        ctx.fillStyle = theme === "navy"
          ? `rgba(224, 242, 254, ${0.72 * hoverLeft})`
          : `rgba(37, 99, 235, ${0.58 * hoverLeft})`;

        ctx.beginPath();
        for (let b = 0; b < 6; b++) {
          const batch = leftBuckets[b];
          const len = batch.length;
          for (let i = 0; i < len; i++) {
            const d = batch[i];
            if (!entranceComplete) {
              const startT = d.stagger * 0.65;
              if ((rawEntrance - startT) / 0.35 <= 0) continue;
            }

            const waveDiff = (d.stagger - wavePosLeft + 1.0) % 1.0;
            if (waveDiff < 0.20) {
              const waveIntensity = Math.sin((waveDiff / 0.20) * Math.PI);
              if (waveIntensity > 0.1) {
                let worldX = d.u * figureWidth;
                let worldY = figureTop + d.v * figureHeight;
                if (d.swayFactor > 0.005) {
                  worldX += Math.sin(timeSec * d.freq + d.phase) * (d.amp * d.swayFactor);
                  worldY += Math.cos(timeSec * d.freq * 0.75 + d.phase) * (d.amp * 0.5 * d.swayFactor);
                }
                if (checkMouseLeft) {
                  const dx = worldX - mouseX;
                  if (Math.abs(dx) < 90) {
                    const dy = worldY - mouseY;
                    if (Math.abs(dy) < 90) {
                      const distSq = dx * dx + dy * dy;
                      if (distSq < 8100 && distSq > 1) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / 90) * 8 * d.swayFactor;
                        worldX += (dx / dist) * force;
                        worldY += (dy / dist) * force;
                      }
                    }
                  }
                }
                const glowSize = d.size * (1 + 0.35 * waveIntensity);
                ctx.moveTo(worldX + glowSize, worldY);
                ctx.arc(worldX, worldY, glowSize, 0, Math.PI * 2);
              }
            }
          }
        }
        ctx.fill();
        ctx.restore();
      }

      // ── 4. Shimmer & Glow Travel Pass (Right) ──
      // On hover, animate a subtle luminous shimmer traveling smoothly along the lines
      if (hoverRight > 0.01 && side !== "left") {
        ctx.save();
        ctx.shadowColor = theme === "navy" ? "rgba(147, 197, 253, 0.50)" : "rgba(37, 99, 235, 0.45)";
        ctx.shadowBlur = 7 * hoverRight;
        ctx.fillStyle = theme === "navy"
          ? `rgba(224, 242, 254, ${0.72 * hoverRight})`
          : `rgba(37, 99, 235, ${0.58 * hoverRight})`;

        ctx.beginPath();
        for (let b = 0; b < 6; b++) {
          const batch = rightBuckets[b];
          const len = batch.length;
          for (let i = 0; i < len; i++) {
            const d = batch[i];
            if (!entranceComplete) {
              const startT = d.stagger * 0.65;
              if ((rawEntrance - startT) / 0.35 <= 0) continue;
            }

            const waveDiff = (d.stagger - wavePosRight + 1.0) % 1.0;
            if (waveDiff < 0.20) {
              const waveIntensity = Math.sin((waveDiff / 0.20) * Math.PI);
              if (waveIntensity > 0.1) {
                let worldX = width - d.u * figureWidth;
                let worldY = figureTop + d.v * figureHeight;
                if (d.swayFactor > 0.005) {
                  worldX -= Math.sin(timeSec * d.freq + d.phase) * (d.amp * d.swayFactor);
                  worldY += Math.cos(timeSec * d.freq * 0.75 + d.phase) * (d.amp * 0.5 * d.swayFactor);
                }
                if (checkMouseRight) {
                  const dx = worldX - mouseX;
                  if (Math.abs(dx) < 90) {
                    const dy = worldY - mouseY;
                    if (Math.abs(dy) < 90) {
                      const distSq = dx * dx + dy * dy;
                      if (distSq < 8100 && distSq > 1) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / 90) * 8 * d.swayFactor;
                        worldX += (dx / dist) * force;
                        worldY += (dy / dist) * force;
                      }
                    }
                  }
                }
                const glowSize = d.size * (1 + 0.35 * waveIntensity);
                ctx.moveTo(worldX + glowSize, worldY);
                ctx.arc(worldX, worldY, glowSize, 0, Math.PI * 2);
              }
            }
          }
        }
        ctx.fill();
        ctx.restore();
      }

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    // Pause loop completely when offscreen; resume only when visible
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    // Initial start — animation loop runs immediately but renders nothing until coral is ready
    startAnimation();

    // ── Defer heavy coral generation off the critical paint path ──────────────
    // requestIdleCallback fires only when the browser is idle (after LCP/FID).
    // Falls back to setTimeout(0) for Safari / older browsers.
    let idleCbId: number | ReturnType<typeof setTimeout>;
    const generateOffCriticalPath = () => {
      leftBuckets = generateFractalCoral();
      rightBuckets = generateFractalCoral();
      coralReady = true;
    };

    if (typeof window.requestIdleCallback === "function") {
      idleCbId = window.requestIdleCallback(generateOffCriticalPath, { timeout: 1000 });
    } else {
      idleCbId = setTimeout(generateOffCriticalPath, 0);
    }

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", refreshCanvasRect);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (typeof window.requestIdleCallback === "function") {
        window.cancelIdleCallback(idleCbId as number);
      } else {
        clearTimeout(idleCbId as ReturnType<typeof setTimeout>);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden w-full h-full select-none"
      style={{ contain: "layout style paint" }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none block w-full h-full"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}

