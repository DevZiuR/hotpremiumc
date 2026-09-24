"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const N = 19, MID = 9, CY = 440, STEP = 42, K = 0.22, X0 = 340, XG = 820;

const lines = Array.from({ length: N }, (_, i) => {
  const ys = (CY + (i - MID) * STEP).toFixed(2);
  const ye = (CY + (i - MID) * STEP * K).toFixed(2);
  return {
    d: `M0 ${ys} H${X0} C${X0 + 240} ${ys} ${XG - 240} ${ye} ${XG} ${ye}`,
    delay: Math.abs(i - MID) * 60,
  };
});

export default function TcpaFlow({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("tf-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("tf-play");
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
      viewBox="-20 30 1200 820"
      role="img"
      aria-label="Consent flow"
      style={{ color: "#E8EAEE" }}
    >
      <style>{`
        .tf-line { fill: none; stroke: currentColor; stroke-width: 6; opacity: .9; stroke-dasharray: 1; }
        .tf-gate { fill: none; stroke: currentColor; stroke-width: 6; }
        .tf-exit { fill: none; stroke: #3B82F6; stroke-width: 6; stroke-dasharray: 1; }
        .tf-dot { fill: #3B82F6; transform-box: fill-box; transform-origin: center; filter: drop-shadow(0 0 10px rgba(59,130,246,.8)); }

        .tf-armed:not(.tf-play) .tf-line,
        .tf-armed:not(.tf-play) .tf-exit { stroke-dashoffset: 1; }
        .tf-armed:not(.tf-play) .tf-gate { opacity: 0; }
        .tf-armed:not(.tf-play) .tf-dot { opacity: 0; transform: scale(0); }

        .tf-play .tf-line { animation: tf-draw 1.5s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d); }
        .tf-play .tf-gate { animation: tf-fade .5s ease-out 1.3s both; }
        .tf-play .tf-exit { animation: tf-draw .6s ease-out 1.6s both; }
        .tf-play .tf-dot { animation: tf-pop .5s cubic-bezier(.34,1.56,.64,1) 2.1s both; }

        @keyframes tf-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes tf-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tf-pop { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }

        @media (prefers-reduced-motion: reduce) {
          .tf-armed:not(.tf-play) .tf-line, .tf-armed:not(.tf-play) .tf-exit { stroke-dashoffset: 0; }
          .tf-armed:not(.tf-play) .tf-gate, .tf-armed:not(.tf-play) .tf-dot { opacity: 1; transform: none; }
          .tf-play * { animation: none; }
        }
      `}</style>

      {lines.map((l, i) => (
        <path
          key={i}
          className="tf-line"
          pathLength={1}
          d={l.d}
          style={{ "--d": `${l.delay}ms` } as CSSProperties}
        />
      ))}
      <line className="tf-gate" x1={XG} y1="340" x2={XG} y2="540" />
      <line className="tf-gate" x1={XG + 24} y1="340" x2={XG + 24} y2="540" />
      <line className="tf-exit" pathLength={1} x1={XG + 24} y1="440" x2="1120" y2="440" />
      <circle className="tf-dot" cx="1132" cy="440" r="20" />
    </svg>
  );
}
