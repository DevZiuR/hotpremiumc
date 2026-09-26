"use client";

import { useEffect, useRef } from "react";

type Props = {
  spacing?: number;
  size?: number;
  period?: number;
  baseOpacity?: number;
  maskImage?: string;
};

export default function DotField({
  spacing = 26,
  size = 1.6,
  period = 8,
  baseOpacity = 0.09,
  maskImage,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, maxR = 1;
    let raf = 0;
    let visible = false;
    const t0 = performance.now();

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = (now - t0) / 1000;
      const cols = Math.floor(w / spacing);
      const rows = Math.floor(h / spacing);
      const ox = (w - (cols - 1) * spacing) / 2;
      const oy = (h - (rows - 1) * spacing) / 2;
      const r1 = (((t / period) % 1) * (maxR + 200)) - 100;
      const r2 = ((((t / period) + 0.5) % 1) * (maxR + 200)) - 100;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ox + c * spacing;
          const y = oy + r * spacing;
          const d = Math.hypot(x - w / 2, y - h / 2);
          const a = Math.exp(-Math.pow((d - r1) / 110, 2));
          const b = Math.exp(-Math.pow((d - r2) / 110, 2));
          const k = reduce ? 0 : Math.min(1, a + b);
          ctx.fillStyle = k > 0.02
            ? `rgba(${Math.round(255 - 196 * k)},${Math.round(255 - 125 * k)},${Math.round(255 - 9 * k)},${(baseOpacity + 0.5 * k).toFixed(3)})`
            : `rgba(255,255,255,${baseOpacity})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const b = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = b.width;
      h = b.height;
      maxR = Math.hypot(w / 2, h / 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [spacing, size, period, baseOpacity]);

  const defaultMask =
    "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.04) 40%, rgba(0, 0, 0, 0.7) 75%, #000 95%)";
  const effectiveMask = maskImage || defaultMask;

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        WebkitMaskImage: effectiveMask,
        maskImage: effectiveMask,
      }}
    />
  );
}
