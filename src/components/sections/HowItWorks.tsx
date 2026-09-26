"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { n: "01", who: "You", title: "Apply", body: "Tell us about your business, your offer, and the volume you can handle." },
  { n: "02", who: "Both", title: "Vetting call", body: "We review your numbers, your close rate, and your capacity to fulfill." },
  { n: "03", who: "Both", title: "Agree the terms", body: "We settle the revenue share, the territory, and the volume together." },
  { n: "04", who: "Us", title: "We fund and launch", body: "We cover media, creative, and the sales infrastructure, then go live." },
  { n: "05", who: "Us", title: "Demand flows in", body: "Exclusive, compliant demand is delivered to you in real time." },
  { n: "06", who: "You", title: "You close, we share", body: "You close the business, and we take the agreed share of the revenue." },
];

export default function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.height = "100%";
      const frame = window.requestAnimationFrame(() => setActive(items.length - 1));
      return () => window.cancelAnimationFrame(frame);
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.55;
      const rect = list.getBoundingClientRect();
      fill.style.height = `${Math.min(Math.max(mid - rect.top, 0), rect.height)}px`;
      let a = -1;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top + 24 < mid) a = i;
      });
      setActive(a);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="how-it-works" className="hiw">
      <style>{`
        .hiw { background: #F3F4F6; color: #0B0E12; padding: 120px 24px; scroll-margin-top: 100px; }
        .hiw-wrap { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 5fr 7fr; gap: 64px; }
        .hiw-head { position: sticky; top: 120px; align-self: start; }
        .hiw-eyebrow { display: flex; align-items: center; gap: 10px; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: #6B7280; }
        .hiw-eyebrow i { width: 12px; height: 12px; background: #2563EB; display: block; }
        .hiw-serif { font-family: "Instrument Serif", Georgia, serif; font-weight: 400; }
        .hiw h2 { margin: 24px 0 20px; font-size: clamp(38px, 5vw, 64px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
        .hiw-sub { font-size: 18px; line-height: 1.6; color: #4B5563; max-width: 40ch; margin: 0 0 32px; }
        .hiw-cta { display: inline-flex; align-items: center; gap: 10px; background: #2563EB; color: #fff; padding: 16px 28px; border-radius: 10px; font-size: 14px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; text-decoration: none; transition: background .2s; }
        .hiw-cta:hover { background: #1D4ED8; }
        .hiw-cta span { transition: transform .2s; }
        .hiw-cta:hover span { transform: translateX(4px); }
        .hiw-note { margin-top: 14px; font-size: 13px; color: #6B7280; }

        .hiw-list { position: relative; list-style: none; margin: 0; padding: 0 0 0 56px; }
        .hiw-rail { position: absolute; left: 11px; top: 0; bottom: 0; width: 2px; background: #D1D5DB; }
        .hiw-fill { position: absolute; left: 0; top: 0; width: 100%; height: 0; background: #2563EB; }
        .hiw-item { position: relative; padding-bottom: 72px; opacity: .35; transition: opacity .45s ease; }
        .hiw-item:last-child { padding-bottom: 0; }
        .hiw-item.on { opacity: 1; }
        .hiw-dot { position: absolute; left: -52px; top: 8px; width: 16px; height: 16px; border-radius: 50%; background: #F3F4F6; border: 2px solid #D1D5DB; z-index: 1; transition: all .35s ease; }
        .hiw-item.on .hiw-dot { background: #2563EB; border-color: #2563EB; box-shadow: 0 0 0 6px rgba(37,99,235,.15); }
        .hiw-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .hiw-n { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; font-size: 13px; color: #9CA3AF; }
        .hiw-who { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; background: #E5E7EB; color: #4B5563; }
        .hiw-who.us { background: rgba(37,99,235,.12); color: #1D4ED8; }
        .hiw h3 { margin: 0 0 10px; font-size: 36px; line-height: 1.05; letter-spacing: -0.02em; }
        .hiw-item p { margin: 0; font-size: 17px; line-height: 1.6; color: #4B5563; max-width: 46ch; }

        @media (max-width: 900px) {
          .hiw { padding: 80px 20px; }
          .hiw-wrap { grid-template-columns: 1fr; gap: 48px; }
          .hiw-head { position: static; }
          .hiw h3 { font-size: 30px; }
        }
      `}</style>

      <div className="hiw-wrap">
        <div className="hiw-head">
          <div className="hiw-eyebrow"><i /> How it works</div>
          <h2 className="hiw-serif">Six steps from application to revenue.</h2>
        </div>

        <ol className="hiw-list" ref={listRef}>
          <div className="hiw-rail"><div className="hiw-fill" ref={fillRef} /></div>
          {steps.map((s, i) => (
            <li key={s.n} data-step className={`hiw-item${i <= active ? " on" : ""}`}>
              <span className="hiw-dot" />
              <div className="hiw-meta">
                <span className="hiw-n">{s.n}</span>
                <span className={`hiw-who${s.who === "Us" ? " us" : ""}`}>{s.who}</span>
              </div>
              <h3 className="hiw-serif">{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
