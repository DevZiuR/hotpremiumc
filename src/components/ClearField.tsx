"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const W = 620, CX = 310, CY = 200, A = 72, STEP = 16, COUNT = 20, SAMPLE = 4;

// Streamline of flow around a circle of radius A, faded out toward the left and right edges
function streamY(x: number, c: number) {
  const dx = x - CX;
  const s = c < 0 ? -1 : 1;
  const cc = Math.abs(c);
  let lo = Math.sqrt(Math.max(A * A - dx * dx, 0));
  let hi = lo + cc * 4 + 200;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    const g = mid * (1 - (A * A) / (dx * dx + mid * mid)) - cc;
    if (g < 0) lo = mid;
    else hi = mid;
  }
  const y = s * ((lo + hi) / 2);
  const w = Math.exp(-Math.pow(dx / 170, 4));
  return c + (y - c) * w;
}

const lines = Array.from({ length: COUNT }, (_, k) => {
  const c = (k - (COUNT - 1) / 2) * STEP;
  const rank = Math.abs(k - (COUNT - 1) / 2);
  let d = "";
  for (let x = 0; x <= W; x += SAMPLE) {
    d += `${x === 0 ? "M" : "L"}${x} ${(CY + streamY(x, c)).toFixed(1)} `;
  }
  return {
    d: d.trim(),
    opacity: (0.95 - rank * 0.04).toFixed(2),
    delay: Math.round((rank - 0.5) * 70),
  };
});

export default function ClearField({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("cf-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("cf-play");
          el.classList.add("cf-active");
        } else {
          el.classList.remove("cf-active");
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 620 400"
      role="img"
      aria-label="Regulatory transparency"
      style={{ color: "#E8EAEE" }}
    >
      <style>{`
        .cf-line { fill: none; stroke: currentColor; stroke-width: 3; stroke-dasharray: 1; }
        .cf-flow-pulse {
          fill: none;
          stroke: #60A5FA;
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-dasharray: 80 800;
          opacity: 0;
          filter: drop-shadow(0 0 6px rgba(96,165,250,0.85));
        }
        .cf-dot { fill: #3B82F6; transform-box: fill-box; transform-origin: center; filter: drop-shadow(0 0 6px rgba(59,130,246,.9)); }
        .cf-aura-ring {
          fill: none;
          stroke: #3B82F6;
          stroke-width: 2;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }

        .cf-armed:not(.cf-play) .cf-line { stroke-dashoffset: 1; }
        .cf-armed:not(.cf-play) .cf-dot { opacity: 0; transform: scale(0); }

        .cf-play .cf-line { animation: cf-draw 1.4s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d); }
        .cf-play .cf-dot { animation: cf-pop .5s cubic-bezier(.34,1.56,.64,1) 1.9s both; }

        /* Continuous idle loop once active and in viewport */
        .cf-play.cf-active .cf-flow-pulse {
          animation: cf-stream-motion 2.6s linear infinite;
          animation-delay: calc(2.4s + var(--dl));
        }
        .cf-play.cf-active .cf-dot {
          animation: cf-pop .5s cubic-bezier(.34,1.56,.64,1) 1.9s both, cf-dot-glow 2.8s ease-in-out infinite 2.4s;
        }
        .cf-play.cf-active .cf-aura-ring {
          animation: cf-aura-expand 3s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          animation-delay: 2.4s;
        }
        .cf-play.cf-active .cf-aura-ring.cf-r2 {
          animation-delay: 3.9s;
        }

        /* Pause idle loop when scrolled out of viewport */
        .cf-armed:not(.cf-active) * {
          animation-play-state: paused !important;
        }

        @keyframes cf-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes cf-pop { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }
        @keyframes cf-stream-motion {
          0% { stroke-dashoffset: 880; opacity: 0; }
          15% { opacity: 0.9; }
          85% { opacity: 0.9; }
          100% { stroke-dashoffset: -120; opacity: 0; }
        }
        @keyframes cf-dot-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(59,130,246,.9)); }
          50% { transform: scale(1.22); filter: drop-shadow(0 0 16px rgba(59,130,246,1)) drop-shadow(0 0 24px rgba(96,165,250,.6)); }
        }
        @keyframes cf-aura-expand {
          0% { transform: scale(0.6); opacity: 0.85; stroke-width: 2.5; }
          100% { transform: scale(3.4); opacity: 0; stroke-width: 0.5; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cf-armed:not(.cf-play) .cf-line { stroke-dashoffset: 0; }
          .cf-armed:not(.cf-play) .cf-dot { opacity: 1; transform: none; }
          .cf-play * { animation: none !important; }
          .cf-flow-pulse, .cf-aura-ring { display: none !important; }
        }
      `}</style>

      {lines.map((l, i) => (
        <path
          key={`l-${i}`}
          className="cf-line"
          pathLength={1}
          d={l.d}
          opacity={l.opacity}
          style={{ "--d": `${l.delay}ms` } as CSSProperties}
        />
      ))}
      {lines.map((l, i) => {
        const rank = Math.abs(i - (COUNT - 1) / 2);
        return (
          <path
            key={`p-${i}`}
            className="cf-flow-pulse"
            d={l.d}
            style={{ "--dl": `${rank * 90}ms` } as CSSProperties}
          />
        );
      })}

      <circle className="cf-aura-ring" cx={CX} cy={CY} r={18} />
      <circle className="cf-aura-ring cf-r2" cx={CX} cy={CY} r={18} />
      <circle className="cf-dot" cx={CX} cy={CY} r={8} />
    </svg>
  );
}
