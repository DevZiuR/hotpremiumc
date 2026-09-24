"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const LAYERS = 8;
const layers = Array.from({ length: LAYERS }, (_, i) => {
  const side = 340 * (1 - i * 0.115);
  return {
    x: (200 - side / 2).toFixed(2),
    size: side.toFixed(2),
    rx: (side * 0.07).toFixed(2),
    angle: i * 6.5,
    opacity: (0.95 - i * 0.07).toFixed(2),
    delay: i * 110,
  };
});

export default function DataVault({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("vault-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("vault-play");
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
      aria-label="Data security vault"
      style={{ color: "#E8EAEE" }}
    >
      <style>{`
        .vault-layer {
          fill: none; stroke: currentColor; stroke-width: 3; stroke-dasharray: 1;
          transform-box: view-box; transform-origin: 200px 200px;
          transform: rotate(var(--a));
        }
        .vault-dot { fill: #3B82F6; transform-box: fill-box; transform-origin: center; filter: drop-shadow(0 0 6px rgba(59,130,246,.9)); }

        .vault-armed:not(.vault-play) .vault-layer { stroke-dashoffset: 1; }
        .vault-armed:not(.vault-play) .vault-dot { opacity: 0; transform: scale(0); }

        .vault-play .vault-layer {
          animation: vault-draw 1.1s cubic-bezier(.22,1,.36,1) both, vault-twist 1.5s cubic-bezier(.22,1,.36,1) both;
          animation-delay: var(--d);
        }
        .vault-play .vault-dot { animation: vault-pop .5s cubic-bezier(.34,1.56,.64,1) 2s both; }

        @keyframes vault-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes vault-twist { from { transform: rotate(0deg); } to { transform: rotate(var(--a)); } }
        @keyframes vault-pop { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }

        @media (prefers-reduced-motion: reduce) {
          .vault-armed:not(.vault-play) .vault-layer { stroke-dashoffset: 0; }
          .vault-armed:not(.vault-play) .vault-dot { opacity: 1; transform: none; }
          .vault-play * { animation: none; }
        }
      `}</style>

      {layers.map((l, i) => (
        <rect
          key={i}
          className="vault-layer"
          pathLength={1}
          x={l.x}
          y={l.x}
          width={l.size}
          height={l.size}
          rx={l.rx}
          opacity={l.opacity}
          style={{ "--a": `${l.angle}deg`, "--d": `${l.delay}ms` } as CSSProperties}
        />
      ))}

      <circle className="vault-dot" cx="200" cy="200" r="8" />
    </svg>
  );
}
