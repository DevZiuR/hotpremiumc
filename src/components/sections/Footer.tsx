"use client";

import React from "react";
import Link from "next/link";

interface LinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface LinkGroup {
  heading: string;
  links: LinkItem[];
}

const linkGroups: LinkGroup[] = [
  {
    heading: "Services",
    links: [
      { label: "Core Acquisition", href: "/#how-it-works" },
      { label: "Pay-Per-Call Programs", href: "/#how-it-works" },
      { label: "Centralized Tech & CRM", href: "/#how-it-works" },
      { label: "Dedicated Sales Teams", href: "/#how-it-works" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Legal", href: "/#verticals" },
      { label: "Financial Services", href: "/#verticals" },
      { label: "Insurance", href: "/#verticals" },
      { label: "Home Services", href: "/#verticals" },
      { label: "Medical & Health", href: "/#verticals" },
      { label: "Enterprise & B2B", href: "/#verticals" },
    ],
  },
  {
    heading: "Insights",
    links: [
      { label: "Compliance & Data Standards", href: "/#compliance" },
      { label: "TCPA Verification", href: "/#compliance" },
      // { label: "Case Studies", href: "/#case-studies" },
      { label: "Operator Equity Model", href: "/#how-it-works" },
    ],
  },
  {
    heading: "About Us",
    links: [
      { label: "About HPC", href: "/#about" },
      { label: "50-State Coverage", href: "/#verticals" },
      { label: "FAQ & Resources", href: "/#faq" },
      { label: "Apply for Partnership", href: "/#contact" },
    ],
  },
];

const LOGO_MARK = "https://hotpremiumcustomers.com/logo-mark.png";

/* Wordmark line 1 — the mark at the cap height of the label (0.72em, measured
   off Instrument Serif) sitting on the text baseline, 0.2em gap. Shared by the
   mobile and desktop wordmarks so the lockup scales identically on both. */
function WordmarkRow({ label }: { label: string }) {
  return (
    <span className="flex items-baseline gap-[0.2em] whitespace-nowrap">
      <img src={LOGO_MARK} alt="" className="w-[0.72em] h-[0.72em] object-contain shrink-0" />
      <span>{label}</span>
    </span>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-x-hidden">

      {/* ── Navigation Grid ──────────────────────────────────────────────────── */}
      <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-14 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 lg:gap-16">
          {linkGroups.map((group) => (
            <div key={group.heading} className="flex flex-col items-start">
              {/* Instrument Serif heading — no border radius, no pill */}
              <span className="font-serif text-[13px] uppercase tracking-[0.12em] text-white/40 select-none mb-5 block">
                {group.heading}
              </span>

              {/* Links */}
              <ul className="flex flex-col gap-[12px] list-none p-0 m-0">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[16px] leading-snug text-white/85 hover:text-white transition-colors duration-200 inline-block"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-sans text-[14px] leading-snug text-white/85 hover:text-white transition-colors duration-200 inline-block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Giant Wordmark ───────────────────────────────────────────────────────
           Inset rather than full-bleed: px-[4vw] on mobile (px-[2vw] from md up)
           so the mark never touches an edge. Two lines at 1.0 leading => the box
           is 2em tall.
           Desktop is 13.5vw: line 1 = mark (0.72em) + gap (0.2em) + "HOT
           PREMIUM" (4.902em in Instrument Serif at -0.03em tracking) = 5.822em
           => 78.6vw, comfortably inside the 96vw content box. "CUSTOMERS"
           (4.154em) spans ~56vw.
           Mobile is 15vw / 15.7vw from sm: the same 5.822em at 15.7vw = 91.4vw
           against 92vw of available width (15vw at the narrowest => 87.3vw),
           so line 1 fits whole with ~4vw to spare per side.
           Both lines share that one size and stay centered.
      ───────────────────────────────────────────────────────────────────────── */}
      <div
        className="w-full select-none h-[2em] text-[15vw] sm:text-[15.7vw] md:text-[13.5vw] px-[4vw] md:px-[2vw] flex items-start justify-center"
      >
        {/* Desktop: two lines, centered */}
        <div className="hidden md:flex flex-col items-center font-serif font-normal uppercase leading-[1] tracking-[-0.03em] text-white">
          <WordmarkRow label="HOT PREMIUM" />
          <span className="whitespace-nowrap">CUSTOMERS</span>
        </div>

        {/* Mobile: two lines, centered */}
        <div className="flex md:hidden flex-col items-center font-serif font-normal uppercase leading-[1] tracking-[-0.03em] text-white">
          <WordmarkRow label="HOT PREMIUM" />
          <span className="whitespace-nowrap">CUSTOMERS</span>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10 w-full">
        <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-white/30">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <span>&copy; 2026 Hot Premium Customers LLC. All rights reserved.</span>
          </div>

          {/* Right: Legal Links */}
          <div className="flex items-center justify-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors duration-150">
              Privacy Policy
            </a>
            <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
            <a href="#cookies" className="hover:text-white transition-colors duration-150">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
