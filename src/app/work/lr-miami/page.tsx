import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "1 — Case Study | ZIUR Studio",
  description:
    "How ZIUR Studio built a full-stack custom platform for h1, an exotic car rental and VIP experience brand in Miami, FL.",
  openGraph: {
    title: "LR Miami Case Study — ZIUR Studio",
    description:
      "Full-stack Next.js + Supabase build, dynamic fleet architecture, and location SEO for a premium Miami exotic car brand.",
    url: "https://ziurstudio.com/work/lr-miami",
  },
};

/* ─── Data ─────────────────────────────────────────────────────────────── */

const deliverables = [
  {
    icon: "⬡",
    title: "Custom Full-Stack Development",
    body: "Built from zero on Next.js and Supabase. No templates, no WordPress, no page builders — every line written to perform.",
  },
  {
    icon: "◈",
    title: "Dynamic Fleet Architecture",
    body: "Individual brand pages for every marque in the fleet: Lamborghini, Rolls-Royce, McLaren, Ferrari, Mercedes, Cadillac. Specs, pricing, and direct booking on each.",
  },
  {
    icon: "◎",
    title: "Location SEO Infrastructure",
    body: "Six dedicated location pages targeting high-intent Miami search terms. Miami Beach, South Beach, Brickell, Wynwood, Coconut Grove, Aventura.",
  },
  {
    icon: "⬕",
    title: "Conversion Flow Design",
    body: "WhatsApp triggers, click-to-call, and a real-time date-picker booking system powered by Supabase — designed to convert at every touchpoint.",
  },
];

const techStack = [
  "Next.js",
  "Supabase",
  "Vercel",
  "Tailwind CSS",
  "Google Ads",
  "GA4",
  "Google Tag Manager",
  "Schema Markup",
  "SEO",
  "WhatsApp API",
];

const metrics = [
  { value: "—", label: "Tracked Bookings" },
  { value: "—", label: "Organic Keywords Ranking" },
  { value: "—", label: "Google Ads Cost Per Lead" },
];

const mockPages = [
  { label: "Fleet Overview", color: "#1a1a2e" },
  { label: "Vehicle Detail", color: "#16213e" },
  { label: "Location Page", color: "#0f3460" },
  { label: "Yacht Charters", color: "#1a1a2e" },
];

/* ─── Grain overlay — pure SVG, no external image ──────────────────────── */
const GrainOverlay = () => (
  <svg
    aria-hidden
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noise-lr">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65"
        numOctaves="3"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise-lr)" />
  </svg>
);

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function LRMiamiCaseStudy() {
  return (
    <div className={`bg-[#0a0a0a] text-white min-h-screen`} style={{ fontFamily: "var(--font-geist, var(--font-host-grotesk), sans-serif)" }}>

      {/* ── Back nav ──────────────────────────────────────────────────────── */}
      <div className="fixed top-0 inset-x-0 z-50 px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-semibold"
        >
          <span aria-hidden>←</span> ZIUR Studio
        </Link>
        <a
          href="https://lrmiami.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-white/70 transition-colors duration-300 text-xs uppercase tracking-[0.2em]"
        >
          lrmiami.com ↗
        </a>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
        <GrainOverlay />

        {/* Background gradient */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: '#000000',
          }}
        />

        {/* Geometric accent lines */}
        < svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
        >
          <line x1="0" y1="0" x2="1440" y2="900" stroke="white" strokeWidth="1" />
          <line x1="1440" y1="0" x2="0" y2="900" stroke="white" strokeWidth="1" />
          <rect x="200" y="80" width="1040" height="740" stroke="white" strokeWidth="0.5" />
        </svg>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <Reveal immediate>
            <p className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/40 mb-10 border border-white/10 px-4 py-2 rounded-full">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#242124ff" }}
              />
              Case Study · 2026
            </p>
          </Reveal>

          {/* Logo lockup — wordmark style since no asset */}
          <Reveal delay={80} immediate>
            <div className="mb-6">
              <span
                className="font-semibold uppercase tracking-[0.35em]"
                style={{
                  fontSize: "clamp(3rem, 10vw, 7rem)",
                  letterSpacing: "0.18em",
                  background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                }}
              >
                LR Miami
              </span>
            </div>
          </Reveal>

          <Reveal delay={160} immediate>
            <p className="text-white/50 text-sm sm:text-base tracking-[0.12em] mb-14">
              Custom Full-Stack Development for a Premium Exotic Car Rentals &amp; VIP Experiences, based in Miami, FL.
            </p>
          </Reveal>

          {/* Stat chips */}
          {/*
          <Reveal delay={240} immediate>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "Full-Stack Custom Build",
                "Dynamic Fleet",
                "",
              ].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs uppercase tracking-[0.16em] font-medium"
                  style={{
                    borderColor: "rgba(38, 33, 38, 0.5)",
                    background: "rgba(107,15,110,0.08)",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: "#fbfbfbff" }}
                  />
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
          */}
        </div>

        {/* Scroll cue */}
        {/*
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
        */}
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. THE PROBLEM
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06] py-28 sm:py-36 overflow-hidden">
        <GrainOverlay />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(107,15,110,0.04) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            {/* Left — bold headline */}
            <Reveal>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/30 mb-6">
                  The Problem
                </p>
                <h2
                  className="font-semibold text-white leading-[1.05]"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", letterSpacing: "-0.02em" }}
                >
                  No site worthy of a{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #9d3fa0, #6B0F6E)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Lamborghini.
                  </span>
                </h2>
              </div>
            </Reveal>

            {/* Right — problem copy */}
            <Reveal delay={120}>
              <div className="space-y-5 text-white/55 leading-relaxed" style={{ fontSize: "1.0625rem" }}>
                <p>
                  LR Miami had no digital presence that matched the caliber of their fleet. No custom site, no SEO infrastructure, no location targeting — just a generic booking link that converted none of the high-intent traffic they were theoretically sitting on.
                </p>
                <p>
                  Competitors with objectively inferior fleets were outranking them on every Miami search term that mattered. Customers comparing five tabs chose the better-looking site. Not the better car.
                </p>
                <p>
                  There were no individual vehicle pages, no dedicated pages for each Miami neighbourhood they served, and no booking flow built to handle the psychology of a $2,000-per-day purchase decision.
                </p>

                {/* Problem pills */}
                <div className="pt-4 flex flex-wrap gap-2">
                  {[
                    "No SEO infrastructure",
                    "No vehicle pages",
                    "No location targeting",
                    "Generic booking flow",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[10px] tracking-widest text-center"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. WHAT WE BUILT
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 sm:py-36 border-t border-white/[0.06] overflow-hidden"
        style={{ background: "#0d0d0d" }}
      >
        <GrainOverlay />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-16 md:mb-20">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/30 mb-4">
                What We Built
              </p>
              <h2
                className="font-semibold text-white"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                The full system, built to last.
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-px bg-white/[0.05]">
            {deliverables.map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <div
                  className="group relative p-8 sm:p-10 lg:p-12 transition-colors duration-500 overflow-hidden"
                  style={{ background: "#0a0a0a" }}
                >
                  {/* Hover accent glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 60% 50% at 0% 100%, rgba(107,15,110,0.12) 0%, transparent 70%)",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="text-2xl mb-6 w-12 h-12 flex items-center justify-center rounded-xl border"
                      style={{
                        borderColor: "rgba(107,15,110,0.3)",
                        background: "rgba(107,15,110,0.07)",
                        color: "#9d3fa0",
                      }}
                    >
                      {card.icon}
                    </div>

                    <h3
                      className="font-semibold text-white mb-3"
                      style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-white/45 leading-relaxed text-sm">
                      {card.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. SITE PREVIEW — The Build
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-36 border-t border-white/[0.06] overflow-hidden">
        <GrainOverlay />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(107,15,110,0.1) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/30 mb-4">
                  The Build
                </p>
                <h2
                  className="font-semibold text-white"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
                >
                  Built to feel like the brand.
                </h2>
              </div>
              <a
                href="https://lrmiami.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest transition-all duration-300 self-start sm:self-auto"
                style={{
                  background: "rgba(27, 26, 27, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  color: "#ffffffff",
                }}
              >
                Visit lrmiami.com
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>

          {/* Main mockup browser frame */}
          <Reveal>
            <div
              className="rounded-xl overflow-hidden border mb-6"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "#111" }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: "#161616" }}
              >
                <div className="flex gap-1.5">
                  {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                  ))}
                </div>
                <div
                  className="flex-1 mx-4 px-3 py-1 rounded-md text-[11px] text-white/25 tracking-wide"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  lrmiami.com
                </div>
              </div>

              {/* Screenshot placeholder — dark luxury aesthetic with LR Miami branding */}
              <div
                className="relative w-full flex flex-col items-center justify-center overflow-hidden"
                style={{
                  minHeight: "480px",
                  background: "linear-gradient(160deg, #0a0608 0%, #110a12 40%, #0a0a0a 100%)",
                }}
              >
                {/* Fake nav */}
                <div
                  className="absolute top-0 inset-x-0 flex items-center justify-between px-8 py-5 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/80">LR MIAMI</span>
                  <div className="hidden sm:flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
                    {["Fleet", "Yachts", "Locations", "Book Now"].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                </div>

                {/* Fake hero content */}
                <div className="text-center px-6 py-16">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">Miami&apos;s Premier Fleet</p>
                  <div
                    className="font-bold uppercase mb-4"
                    style={{
                      fontSize: "clamp(2rem, 6vw, 4rem)",
                      letterSpacing: "-0.02em",
                      background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.35))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Drive the Extraordinary
                  </div>
                  <p className="text-white/30 text-sm mb-8 max-w-sm mx-auto tracking-wide">
                    Lamborghini · Rolls-Royce · McLaren · Ferrari
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <div
                      className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold"
                      style={{ background: "#6B0F6E", color: "white" }}
                    >
                      Browse Fleet
                    </div>
                    <div
                      className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest"
                      style={{
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      Book Now
                    </div>
                  </div>
                </div>

                {/* Decorative gradient orbs */}
                <div
                  aria-hidden
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse, rgba(107,15,110,0.25) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
              </div>
            </div>
          </Reveal>

          {/* Horizontal scroll strip — additional page previews */}
          <Reveal>
            <div className="overflow-x-auto pb-3 -mx-6 px-6">
              <div className="flex gap-4" style={{ minWidth: "max-content" }}>
                {mockPages.map((page) => (
                  <div
                    key={page.label}
                    className="rounded-lg overflow-hidden border flex-shrink-0"
                    style={{
                      width: "220px",
                      height: "140px",
                      borderColor: "rgba(255,255,255,0.07)",
                      background: page.color,
                    }}
                  >
                    {/* Mini browser chrome */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-2 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.4)" }}
                    >
                      {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                        <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c, opacity: 0.5 }} />
                      ))}
                    </div>
                    <div className="flex flex-col items-center justify-center h-[104px] px-3">
                      <div className="w-10 h-0.5 rounded mb-2" style={{ background: "rgba(107,15,110,0.6)" }} />
                      <p className="text-[9px] uppercase tracking-widest text-white/30 text-center">{page.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-widest mt-3 text-center">
              Scroll to preview more pages →
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. TECH STACK
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 border-t border-white/[0.06] overflow-hidden"
        style={{ background: "#0d0d0d" }}
      >
        <GrainOverlay />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/25 whitespace-nowrap">
                Tech Stack
              </p>
              <div className="h-px flex-1 bg-white/[0.06] hidden sm:block" />
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-medium"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. RESULTS — Honest placeholder
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-36 border-t border-white/[0.06] overflow-hidden">
        <GrainOverlay />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(107,15,110,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="max-w-2xl mb-16 md:mb-20">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-6"
                style={{
                  background: "rgba(107,15,110,0.12)",
                  border: "1px solid rgba(107,15,110,0.3)",
                  color: "#9d3fa0",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#9d3fa0" }}
                />
                Active Engagement
              </div>
              <h2
                className="font-semibold text-white mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                Results Building.
              </h2>
              <p className="text-white/40 leading-relaxed" style={{ fontSize: "1.0625rem" }}>
                This is a live, ongoing engagement. Full performance metrics will be published at the 90-day mark. We don&apos;t guess. We wait for the data to tell the truth.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-px bg-white/[0.04]">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 100}>
                <div
                  className="p-8 sm:p-12 relative overflow-hidden"
                  style={{ background: "#0a0a0a" }}
                >
                  <div
                    className="font-bold mb-3 text-white/15"
                    style={{ fontSize: "clamp(3rem, 8vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    {m.value}
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
                    {m.label}
                  </p>
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0"
                    style={{
                      background: "linear-gradient(90deg, #6B0F6E, transparent)",
                      width: "40%",
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 text-[10px] text-white/20 uppercase tracking-[0.2em] text-center">
              Metrics published Q4 2026
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          7. NEXT CASE STUDY CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 sm:py-36 border-t border-white/[0.06] overflow-hidden"
        style={{ background: "#0d0d0d" }}
      >
        <GrainOverlay />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(107,15,110,0.14) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/25 mb-6">
              What&apos;s Next
            </p>
            <h2
              className="font-semibold text-white mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.015em" }}
            >
              Want Something Similar for your Business?
            </h2>
            <p className="text-white/40 mb-12 leading-relaxed" style={{ fontSize: "1.0625rem" }}>
              We&apos;ll audit your current digital position, identify exactly where you&apos;re bleeding bookings, and show you what a proper build looks like. No pitch. No fluff.
            </p>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-4 px-8 py-4 rounded-full font-semibold uppercase tracking-widest text-sm text-white transition-all duration-300 hover:gap-6"
              style={{
                background: "linear-gradient(135deg, #6B0F6E, #8f1592)",
                boxShadow: "0 0 40px rgba(107,15,110,0.3), 0 0 80px rgba(107,15,110,0.12)",
              }}
            >
              Get Your Free Audit
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Footer strip ──────────────────────────────────────────────────── */}
      <footer
        className="border-t py-8 px-6"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-white/25 hover:text-white/60 transition-colors duration-300 text-xs uppercase tracking-[0.2em]"
          >
            ← Back to ZIUR Studio
          </Link>
          <p className="text-[11px] text-white/20 uppercase tracking-[0.15em]">
            © {new Date().getFullYear()} ZIUR Studio
          </p>
          <a
            href="https://lrmiami.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 hover:text-white/60 transition-colors duration-300 text-xs uppercase tracking-[0.2em]"
          >
            lrmiami.com ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
