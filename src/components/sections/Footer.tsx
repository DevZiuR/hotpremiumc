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
      { label: "Case Studies", href: "/#case-studies" },
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

export function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-x-hidden">

      {/* ── Navigation Grid ──────────────────────────────────────────────────── */}
      <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-28 border-t border-white/10">
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
           Full-bleed: no horizontal padding — truly edge-to-edge.
           overflow-x-hidden on <footer> catches any character overshoot.
           Height = 85% of the 0.85 line-height => 0.7225em on desktop;
           on mobile two lines so 1.57em.
      ───────────────────────────────────────────────────────────────────────── */}
      <div
        className="w-full select-none h-[1.57em] md:h-[0.7225em] text-[15vw] sm:text-[16vw] md:text-[10.5vw] flex items-start justify-center"
      >
        {/* Desktop: single line, centered */}
        <span className="hidden md:block whitespace-nowrap font-serif font-normal uppercase leading-[0.85] tracking-[-0.03em] text-white">
          HOT PREMIUM CUSTOMERS
        </span>

        {/* Mobile: two lines, centered */}
        <div className="flex md:hidden flex-col items-center font-serif font-normal uppercase leading-[0.85] tracking-[-0.03em] text-white">
          <span>HOT PREMIUM</span>
          <span>CUSTOMERS</span>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10 w-full">
        <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-white/30">
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
