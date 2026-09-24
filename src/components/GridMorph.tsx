"use client";

import { useEffect, useRef } from "react";

type Props = {
  rest?: [number, number]; // resting focal point, as fractions of card width/height
  alpha?: number; // tint strength of the grid lines
  cell?: number; // cell size in px
  radius?: number; // radius (px) of the square-to-circle morph around the focal point
};

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const k = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + k, y);
  ctx.arcTo(x + w, y, x + w, y + h, k);
  ctx.arcTo(x + w, y + h, x, y + h, k);
  ctx.arcTo(x, y + h, x, y, k);
  ctx.arcTo(x, y, x + w, y, k);
  ctx.closePath();
}

export default function GridMorph({
  rest = [0.7, 0.3],
  alpha = 0.08,
  cell = 36,
  radius = 190,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0;
    let fx = 0, fy = 0, tx = 0, ty = 0;
    let intro = reduce ? 1 : 0;
    let started = reduce;
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000";
      const k = 1 - Math.pow(1 - intro, 3);
      const R = Math.max(radius * k, 0.001);
      const n = Math.max(1, Math.round(w / cell));
      const cs = w / n;
      const cols = n;
      const rows = Math.ceil(h / cs);
      const s = cs - 1.2;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * cs + cs / 2;
          const cy = r * cs + cs / 2;
          const t = Math.max(0, 1 - Math.hypot(cx - fx, cy - fy) / R);
          const e = t * t * (3 - 2 * t);
          rr(ctx, cx - s / 2, cy - s / 2, s, s, e * (s / 2));
        }
      }
      ctx.fill();
    };

    const step = () => {
      raf = 0;
      if (started && intro < 1) intro = Math.min(1, intro + 0.017);
      fx += (tx - fx) * 0.14;
      fy += (ty - fy) * 0.14;
      draw();
      if (intro < 1 || Math.abs(tx - fx) > 0.4 || Math.abs(ty - fy) > 0.4) {
        raf = requestAnimationFrame(step);
      }
    };
    const run = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    const resize = () => {
      const b = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = b.width;
      h = b.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tx = fx = rest[0] * w;
      ty = fy = rest[1] * h;
      draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(host);

    const move = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      tx = e.clientX - b.left;
      ty = e.clientY - b.top;
      run();
    };
    const leave = () => {
      tx = rest[0] * w;
      ty = rest[1] * h;
      run();
    };
    if (!reduce) {
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [rest, alpha, cell, radius]);

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
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 38%, transparent 72%)",
        maskImage: "linear-gradient(to bottom, #000 0%, #000 38%, transparent 72%)",
      }}
    />
  );
}
