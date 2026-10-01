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

export function Footer() {
  return (
    <footer className="relative bg-[#09090b] text-white overflow-x-hidden overflow-hidden">

      {/* ── Navigation Grid ────────────────────────────────────────────────────
           4 columns at every breakpoint: a 2-col grid would force both rows to
           share the tallest column's height, staggering the second row's
           headings (measured 302px on a 390px viewport) because Industries
           carries 6 links against Insights' 3. Keeping all four in a single
           row means every heading sits on one shared top baseline no matter
           how many links a column holds. items-start + fixed heading height
           lock the first link row to the same offset across all four.
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14 pt-20 sm:pt-24 lg:pt-28 pb-5 sm:pb-6 lg:pb-7 border-t border-white/10">
        <div className="grid grid-cols-4 items-start gap-4 sm:gap-6 lg:gap-10 xl:gap-14">
          {linkGroups.map((group) => (
            <div key={group.heading} className="flex flex-col items-start">
              {/* Instrument Serif heading — no border radius, no pill */}
              <span className="font-serif text-[10px] sm:text-[12px] lg:text-[13px] uppercase tracking-[0.12em] text-white/40 select-none mb-4 sm:mb-5 block h-[14px] sm:h-[16px] lg:h-[18px] leading-none">
                {group.heading}
              </span>

              {/* Links */}
              <ul className="flex flex-col gap-[10px] sm:gap-[12px] list-none p-0 m-0 w-full">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[13px] sm:text-[14px] leading-snug text-white/85 hover:text-white transition-colors duration-200 inline-block"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-sans text-[13px] sm:text-[14px] leading-snug text-white/85 hover:text-white transition-colors duration-200 inline-block"
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

      {/* ── Giant Wordmark + Blue Ribbon Stage ─────────────────────────────────
           The ribbon (right-weighted figure, clean black on its left) sits
           behind the wordmark; the stage clips the wordmark's second line so
           its lowest letters are cut by the fold and pick up the ribbon's glow.
           Inset rather than full-bleed: px-[4vw] on mobile (px-[2vw] from md up)
           so the mark never touches an edge. Two lines at 1.0 leading => the
           wordmark box is 2em; the stage is 1.85em, cropping the bottom ~0.15em,
           then pb-[0.5em] adds breathing room before the section ends.
           Desktop is 12.6vw: line 1 = mark (0.72em) + gap (0.2em) + "HOT
           PREMIUM" (4.902em in Instrument Serif at -0.03em tracking) = 5.822em
           => 73.4vw, comfortably inside the 96vw content box. "CUSTOMERS"
           (4.154em) spans ~52vw, so its right end reaches the ribbon's glow.
           Mobile is 14vw / 14.4vw from sm: the same 5.822em at 14.4vw = 83.8vw
           against 92vw of available width (14vw at the narrowest => 81.5vw),
           so line 1 fits whole with ~10vw to spare per side.
      ───────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full select-none text-[14vw] sm:text-[14.4vw] md:text-[12.6vw] h-[1.88em] pb-[0.15em] overflow-hidden"
      >
        {/* Ribbon — sits behind the wordmark (explicit z-0 vs the wordmark's
            z-20) and is nudged down + right together so its glow backs the
            lower-right of the letters instead of cutting across them.
            object-position 100%/88% drops the visible window onto the ribbon's
            lower body, and the increased over-scale plus negative bottom offset
            push that mass below the wordmark's baseline. */}
        <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/media/Blue_Ribbon_Wave.png"
            alt=""
            className="absolute inset-x-0 bottom-[-16%] h-[124%] w-full object-cover object-[100%_88%]"
            draggable={false}
          />
          {/* Fade the ribbon's top edge into the black above it, and soften the
              bottom cut now that the legal bar sits below the stage */}
          <div className="absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-[#09090b] via-[#09090b]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-[#09090b] to-transparent" />
        </div>

        {/* Wordmark — two lines, centered, second line cropped at the fold */}
        <div className="relative z-20 h-full flex items-start justify-center px-[4vw] md:px-[2vw]">
          {/* Desktop: two lines, centered */}
          <div className="hidden md:flex flex-col items-center font-serif font-normal uppercase leading-[1] tracking-[-0.03em] text-white">
            <span className="whitespace-nowrap">HOT PREMIUM</span>
            <span className="whitespace-nowrap">CUSTOMERS</span>
          </div>

          {/* Mobile: two lines, centered */}
          <div className="flex md:hidden flex-col items-center font-serif font-normal uppercase leading-[1] tracking-[-0.03em] text-white">
            <span className="whitespace-nowrap">HOT PREMIUM</span>
            <span className="whitespace-nowrap">CUSTOMERS</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar — final element on the page ── */}
      <div className="border-t border-white/10 w-full">
        <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-white/30">
          {/* Left: Logo mark + Copyright */}
          <div className="text-center md:text-left flex items-center justify-center md:justify-start gap-2.5">
            <img
              src={LOGO_MARK}
              alt="Hot Premium Customers"
              className="h-4 w-auto object-contain shrink-0"
            />
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
