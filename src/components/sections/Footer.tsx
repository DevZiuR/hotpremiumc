"use client";

import React from "react";
import Link from "next/link";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "Core Acquisition", href: "/#lead-programs" },
      { label: "Pay-Per-Call Programs", href: "/#lead-programs" },
      { label: "Centralized Tech & CRM", href: "/#proven-model" },
      { label: "Dedicated Sales Teams", href: "/#proven-model" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Legal & Retainers", href: "/#verticals" },
      { label: "Financial & Tax Relief", href: "/#verticals" },
      { label: "Annuity & Insurance", href: "/#verticals" },
      { label: "Home Services", href: "/#verticals" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Compliance & Data Standards", href: "/#compliance" },
      { label: "TCPA Verification", href: "/#compliance" },
      { label: "Case Studies", href: "/work/lr-miami" },
      { label: "Operator Equity Model", href: "/#proven-model" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "About HPC", href: "/#about" },
      { label: "50-State Coverage", href: "/#global-coverage" },
      { label: "FAQ & Resources", href: "/#faq" },
      { label: "Apply for Partnership", href: "/#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-white pt-10 sm:pt-16 pb-8 font-sans border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* ── Top Section: 4 Simple Link Columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs sm:text-[13px] font-normal text-neutral-400 mb-3 sm:mb-4 tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[14px] text-white hover:text-neutral-300 transition-colors duration-150 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Section: Logo, Copyright & Arrowed Social Links ── */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-neutral-800/40 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          {/* Left: Brand Mark, Name & Legal — centered on mobile */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-2.5 mb-2.5 group">
              <img
                src="/logo-mark.png"
                alt="Hot Premium Customers"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-base sm:text-xl md:text-[25px] font-bold tracking-tight text-white uppercase">
                Hot Premium Customers
              </span>
            </Link>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-xs text-neutral-500">
              <span>&copy; {new Date().getFullYear()} Hot Premium Customers LLC. All Rights Reserved</span>
              <a href="#privacy" className="hover:text-neutral-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#cookies" className="hover:text-neutral-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Right: Social Links — centered on mobile */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6 md:gap-8">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-base md:text-[18px] font-medium text-white hover:text-neutral-200 transition-colors group"
            >
              <span>LinkedIn</span>
              <span className="text-[#F5A623] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-base md:text-[18px] font-medium text-white hover:text-neutral-200 transition-colors group"
            >
              <span>Instagram</span>
              <span className="text-[#F5A623] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <a
              href="https://x.com/max_av_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-base md:text-[18px] font-medium text-white hover:text-neutral-200 transition-colors group"
            >
              <span>X</span>
              <span className="text-[#F5A623] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
