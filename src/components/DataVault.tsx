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
          el.classList.add("vault-active");
        } else {
          el.classList.remove("vault-active");
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
        .vault-shield-ring {
          fill: none;
          stroke: #3B82F6;
          stroke-width: 2;
          opacity: 0;
          transform-box: view-box;
          transform-origin: 200px 200px;
        }

        .vault-armed:not(.vault-play) .vault-layer { stroke-dashoffset: 1; }
        .vault-armed:not(.vault-play) .vault-dot { opacity: 0; transform: scale(0); }

        .vault-play .vault-layer {
          animation: vault-draw 1.1s cubic-bezier(.22,1,.36,1) both, vault-twist 1.5s cubic-bezier(.22,1,.36,1) both;
          animation-delay: var(--d);
        }
        .vault-play .vault-dot { animation: vault-pop .5s cubic-bezier(.34,1.56,.64,1) 2s both; }

        /* Continuous idle loop once active and on screen */
        .vault-play.vault-active .vault-layer {
          animation:
            vault-draw 1.1s cubic-bezier(.22,1,.36,1) both,
            vault-twist 1.5s cubic-bezier(.22,1,.36,1) both,
            vault-breathe 4.8s ease-in-out infinite;
          animation-delay: var(--d), var(--d), calc(2.5s + var(--dl));
        }
        .vault-play.vault-active .vault-dot {
          animation: vault-pop .5s cubic-bezier(.34,1.56,.64,1) 2s both, vault-core-pulse 2.8s ease-in-out infinite 2.5s;
        }
        .vault-play.vault-active .vault-shield-ring {
          animation: vault-shield 3.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          animation-delay: 2.6s;
        }
        .vault-play.vault-active .vault-shield-ring.v-r2 {
          animation-delay: 4.2s;
        }

        /* Pause idle loop when scrolled out of viewport */
        .vault-armed:not(.vault-active) * {
          animation-play-state: paused !important;
        }

        @keyframes vault-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes vault-twist { from { transform: rotate(0deg); } to { transform: rotate(var(--a)); } }
        @keyframes vault-pop { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }
        @keyframes vault-breathe {
          0%, 100% { transform: rotate(var(--a)); }
          50% { transform: rotate(calc(var(--a) + var(--da))); }
        }
        @keyframes vault-core-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(59,130,246,.9)); }
          50% { transform: scale(1.2); filter: drop-shadow(0 0 16px rgba(59,130,246,1)) drop-shadow(0 0 24px rgba(96,165,250,.6)); }
        }
        @keyframes vault-shield {
          0% { transform: scale(0.8); opacity: 0.85; stroke-width: 2.5; }
          100% { transform: scale(3.5); opacity: 0; stroke-width: 0.5; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vault-armed:not(.vault-play) .vault-layer { stroke-dashoffset: 0; }
          .vault-armed:not(.vault-play) .vault-dot { opacity: 1; transform: none; }
          .vault-play * { animation: none !important; }
          .vault-shield-ring { display: none !important; }
        }
      `}</style>

      {layers.map((l, i) => {
        const deltaAngle = `${(i % 2 === 0 ? 1 : -1) * (2 + i * 0.45)}deg`;
        return (
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
            style={
              {
                "--a": `${l.angle}deg`,
                "--da": deltaAngle,
                "--d": `${l.delay}ms`,
                "--dl": `${i * 120}ms`,
              } as CSSProperties
            }
          />
        );
      })}

      <circle className="vault-shield-ring" cx="200" cy="200" r="16" />
      <circle className="vault-shield-ring v-r2" cx="200" cy="200" r="16" />
      <circle className="vault-dot" cx="200" cy="200" r="8" />
    </svg>
  );
}
