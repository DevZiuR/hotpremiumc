"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const ticks = Array.from({ length: 35 }, (_, i) => {
  const a = ((i + 1) * 10 - 90) * (Math.PI / 180);
  const c = Math.cos(a);
  const s = Math.sin(a);
  return {
    x1: (200 + 142 * c).toFixed(2),
    y1: (200 + 142 * s).toFixed(2),
    x2: (200 + 163 * c).toFixed(2),
    y2: (200 + 163 * s).toFixed(2),
    delay: 500 + i * 22,
  };
});

const rings: [number, number][] = [
  [170, 0.9],
  [135, 0.9],
  [90, 0.35],
  [45, 0.35],
];

export default function TimestampSeal({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("seal-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("seal-play");
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 400 400"
      role="img"
      aria-label="Timestamp seal"
      style={{ color: "#E8EAEE" }}
    >
      <style>{`
        .seal-ring { fill: none; stroke: currentColor; stroke-width: 3; stroke-dasharray: 1; }
        .seal-tick { stroke: currentColor; stroke-width: 3; opacity: .55; stroke-dasharray: 1; }
        .seal-blue { stroke: #3B82F6; stroke-width: 5; fill: none; }
        .seal-dot { fill: #3B82F6; }
        .seal-glow { filter: drop-shadow(0 0 5px rgba(59,130,246,.85)); }
        .seal-sweep { transform-box: view-box; transform-origin: 200px 200px; }
        .seal-center { transform-box: fill-box; transform-origin: center; }
        .seal-ripple { fill: none; stroke: #3B82F6; stroke-width: 1.5; vector-effect: non-scaling-stroke; opacity: 0; transform-box: view-box; transform-origin: 200px 200px; }

        .seal-armed:not(.seal-play) .seal-ring,
        .seal-armed:not(.seal-play) .seal-tick { stroke-dashoffset: 1; }
        .seal-armed:not(.seal-play) .seal-sweep { opacity: 0; }
        .seal-armed:not(.seal-play) .seal-center { opacity: 0; transform: scale(0); }

        .seal-play .seal-ring { animation: seal-draw 1.3s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d); }
        .seal-play .seal-tick { animation: seal-draw .45s ease-out both; animation-delay: var(--d); }
        .seal-play .seal-center { animation: seal-pop .5s cubic-bezier(.34,1.56,.64,1) 1.1s both; }
        .seal-play .seal-sweep {
          animation: seal-fade .3s ease-out 1.25s both, seal-sweep 1.9s cubic-bezier(.22,1,.36,1) 1.3s both;
        }
        .seal-play .seal-ripple { animation: seal-ripple 3.2s ease-out infinite; animation-delay: 3.2s; }
        .seal-play .seal-ripple.r2 { animation-delay: 4.8s; }

        @keyframes seal-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes seal-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes seal-pop { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }
        @keyframes seal-sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes seal-ripple { from { transform: scale(.1); opacity: .7; } to { transform: scale(1); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .seal-armed:not(.seal-play) .seal-ring,
          .seal-armed:not(.seal-play) .seal-tick { stroke-dashoffset: 0; }
          .seal-armed:not(.seal-play) .seal-sweep,
          .seal-armed:not(.seal-play) .seal-center { opacity: 1; transform: none; }
          .seal-play * { animation: none; }
        }
      `}</style>

      {rings.map(([r, o]) => (
        <circle key={r} className="seal-ring" cx="200" cy="200" r={r} opacity={o} pathLength={1} />
      ))}
      {ticks.map((t, i) => (
        <line key={i} className="seal-tick" x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} pathLength={1} style={{ "--d": `${t.delay}ms` } as CSSProperties} />
      ))}

      <circle className="seal-ripple" cx="200" cy="200" r="70" />
      <circle className="seal-ripple r2" cx="200" cy="200" r="70" />

      <g className="seal-sweep seal-glow">
        <line className="seal-blue" x1="200" y1="65" x2="200" y2="22" />
        <circle className="seal-dot" cx="200" cy="14" r="7" />
      </g>
      <circle className="seal-dot seal-glow seal-center" cx="200" cy="200" r="7" />
    </svg>
  );
}
