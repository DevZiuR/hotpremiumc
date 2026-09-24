"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const markets = [
  { name: "Canada", left: 28.9, top: 30.0, anchor: "L" },
  { name: "United States", left: 30.4, top: 35.7, anchor: "L" },
  { name: "UK", left: 50.0, top: 29.4, anchor: "T" },
  { name: "Western Europe", left: 51.5, top: 32.9, anchor: "B" },
  { name: "Nordics", left: 56.9, top: 25.8, anchor: "R" },
  { name: "Australia", left: 71.2, top: 67.1, anchor: "LB" },
  { name: "New Zealand", left: 74.2, top: 69.9, anchor: "R" },
];

export default function GlobalCoverageMap({ src = "/images/globe-v2.png" }: { src?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("gc-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("gc-play");
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="gc-card">
      <style>{`
        @property --gc-a { syntax: "<angle>"; initial-value: 0deg; inherits: false; }

        .gc-card {
          position: relative; width: 100%; aspect-ratio: 1 / 1;
          background: #ECEFF3; border-radius: 32px;
          border: 1px solid rgba(15,23,42,0.06);
          box-shadow: 0 0 70px -24px rgba(59,130,246,0.35);
        }
        .gc-armed:not(.gc-play) { opacity: 0; transform: translateY(14px) scale(.985); }
        .gc-play { animation: gc-card-in .9s cubic-bezier(.22,1,.36,1) both; }
        .gc-card::before, .gc-card::after {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1.5px; pointer-events: none;
          background: conic-gradient(from var(--gc-a), transparent 0deg, transparent 230deg, rgba(59,130,246,.15) 260deg, #3B82F6 320deg, #93C5FD 345deg, transparent 360deg);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          animation: gc-border 7s linear infinite;
        }
        .gc-card::after { filter: blur(10px); opacity: .6; }
        @keyframes gc-border { to { --gc-a: 360deg; } }

        .gc-globe { position: absolute; inset: 0; width: 100%; height: 100%; display: block; object-fit: contain; border-radius: inherit; }
        .gc-mk { position: absolute; width: 0; height: 0; }
        .gc-pill {
          position: absolute; left: 0; top: 0; white-space: nowrap;
          background: #0B0E12; color: #fff; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.09);
          font-size: 12px; line-height: 1; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
          padding: 6px 12px;
          box-shadow: 0 8px 24px rgba(2,6,23,.28), 0 0 18px rgba(59,130,246,.18), inset 0 0 16px rgba(59,130,246,.08);
        }
        .gc-a-L { transform: translate(calc(-100% - 10px), -50%); }
        .gc-a-R { transform: translate(12px, -50%); }
        .gc-a-T { transform: translate(-50%, calc(-100% - 12px)); }
        .gc-a-B { transform: translate(-50%, 14px); }
        .gc-a-LB { transform: translate(calc(-100% + 8px), 12px); }
        .gc-ring {
          position: absolute; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%;
          border: 1px solid #3B82F6; opacity: 0; pointer-events: none;
          filter: drop-shadow(0 0 5px rgba(59,130,246,.7));
        }
        @media (max-width: 640px) { .gc-pill { font-size: 9px; padding: 4px 8px; } }

        .gc-armed:not(.gc-play) .gc-globe { opacity: 0; transform: scale(.96); }
        .gc-armed:not(.gc-play) .gc-mk { opacity: 0; }

        .gc-play .gc-globe { animation: gc-globe .9s cubic-bezier(.22,1,.36,1) both; }
        .gc-play .gc-mk { animation: gc-rise .5s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d); }
        .gc-play .gc-pill { animation: gc-label-glow 2.8s ease-in-out infinite; animation-delay: var(--d); }
        .gc-play .gc-ring { animation: gc-ping 2.8s ease-out infinite; animation-delay: var(--r); }

        @keyframes gc-card-in { from { opacity: 0; transform: translateY(14px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes gc-globe { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes gc-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gc-label-glow {
          0%, 100% { box-shadow: 0 8px 24px rgba(2,6,23,.28), 0 0 12px rgba(59,130,246,.12), inset 0 0 14px rgba(59,130,246,.05); }
          50% { box-shadow: 0 10px 28px rgba(2,6,23,.35), 0 0 24px rgba(59,130,246,.34), 0 0 42px rgba(96,165,250,.16), inset 0 0 18px rgba(59,130,246,.1); }
        }
        @keyframes gc-ping { from { opacity: .8; transform: scale(.4); } to { opacity: 0; transform: scale(1.8); } }

        @media (prefers-reduced-motion: reduce) {
          .gc-card::before, .gc-card::after { animation: none; }
          .gc-armed:not(.gc-play), .gc-play { opacity: 1; transform: none; animation: none; }
          .gc-armed:not(.gc-play) .gc-globe, .gc-armed:not(.gc-play) .gc-mk { opacity: 1; transform: none; }
          .gc-play .gc-globe, .gc-play .gc-mk, .gc-play .gc-pill, .gc-play .gc-ring { animation: none; }
          .gc-ring { display: none; }
        }
      `}</style>

      <img className="gc-globe" src={src} alt="Globe showing our coverage markets" />

      {markets.map((m, i) => (
        <span
          key={`r-${m.name}`}
          className="gc-ring"
          style={{ left: `${m.left}%`, top: `${m.top}%`, "--r": `${1600 + i * 350}ms` } as CSSProperties}
        />
      ))}

      {markets.map((m, i) => (
        <span
          key={m.name}
          className="gc-mk"
          style={{ left: `${m.left}%`, top: `${m.top}%`, "--d": `${600 + i * 120}ms` } as CSSProperties}
        >
          <span className={`gc-pill gc-a-${m.anchor}`}>{m.name}</span>
        </span>
      ))}
    </div>
  );
}
