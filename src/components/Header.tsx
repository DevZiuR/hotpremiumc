"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredVerticalIdx, setHoveredVerticalIdx] = useState<number>(0);
  // Header is statically positioned with a black background and white text
  const scrolled = true;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenMenu(name);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 180);
  };

  const toggleDropdown = (name: string) => {
    if (openMenu === name) {
      setOpenMenu(null);
    } else {
      handleMouseEnter(name);
    }
  };

  const verticalsFeatured = [
    {
      title: "Legal",
      badge: "43 Verticals",
      highlightTitle: "Tax Relief Attorneys",
      highlightSubtitle: "Litigation & retained claimant acquisition",
      image: "/media/industry_legal.jpg",
      href: "#all-legal",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      title: "Financial Services",
      badge: "108 Verticals",
      highlightTitle: "IRS Debt Resolution Firms",
      highlightSubtitle: "Enrolled agents & wealth managers",
      image: "/media/industry_finance.jpg",
      href: "#all-financial",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Insurance",
      badge: "19 Verticals",
      highlightTitle: "Final Expense & Medicare",
      highlightSubtitle: "Pre-qualified seniors ready for policies",
      image: "/media/industry_insurance.jpg",
      href: "#all-insurance",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Home Services",
      badge: "27 Verticals",
      highlightTitle: "Roofing & HVAC Contractors",
      highlightSubtitle: "Power your crews with high-ticket pipeline",
      image: "/media/industry_home.jpg",
      href: "#all-home-services",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Medical & Health",
      badge: "24 Verticals",
      highlightTitle: "Rehab & Detox Facilities",
      highlightSubtitle: "Connecting patients at the moment of need",
      image: "/media/industry_medical.jpg",
      href: "#all-medical",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Emerging Claims",
      badge: "19 Verticals",
      highlightTitle: "Mass Tort Aggregation",
      highlightSubtitle: "Emerging high-velocity claimant actions",
      image: "/media/industry_claims.jpg",
      href: "#all-claims",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Enterprise & B2B",
      badge: "26 Verticals",
      highlightTitle: "Commercial Lending & SBA",
      highlightSubtitle: "Urgent corporate capital & credit",
      image: "/media/industry_enterprise.jpg",
      href: "#all-b2b",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      title: "Pay Per Call",
      badge: "34 Verticals",
      highlightTitle: "Live Inbound Call Routing",
      highlightSubtitle: "Inbound verified calls routed in real-time",
      image: "/media/industry_paypercall.jpg",
      href: "#all-ppc",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
  ];

  return (
    <header
      className="relative z-50 w-full select-none bg-black text-white sticky top-0 shadow-md"
    >
      {/* ── New Centered Top Bar with Subtle Glow & Ambient Shimmer ─────────────── */}
      <div
        className="relative text-xs sm:text-sm px-3 sm:px-6 lg:px-8 border-b text-white border-blue-600/30 py-2 sm:py-2.5 overflow-hidden select-none"
        style={{ backgroundColor: "#2563EB" }}
      >
        {/* Slow, subtle ambient background shimmer sweep */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="w-1/3 h-full absolute top-0 -skew-x-12 opacity-70"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
              animation: "topbar-shimmer-sweep 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="font-medium tracking-wide inline-flex items-center flex-wrap justify-center gap-x-2 gap-y-1 text-xs sm:text-sm">
            <span className="text-white/95">PROVEN OFFER? · WE FUND THE SCALE</span>
            <span className="text-white/60">&rarr;</span>
            <a
              href="#partner"
              className="relative inline-flex items-center font-semibold text-white group"
            >
              {/* Soft pulsing glow aura behind the link text */}
              <span
                className="absolute -inset-x-2.5 -inset-y-1 rounded-full pointer-events-none blur-[6px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.42) 0%, rgba(147,197,253,0.22) 60%, transparent 80%)",
                  animation: "cta-soft-pulse 4.5s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
              <span className="relative z-10 underline underline-offset-4 decoration-white/50 group-hover:decoration-white transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                APPLY
              </span>
            </a>
          </span>
        </div>

        <style>{`
          @keyframes topbar-shimmer-sweep {
            0% {
              transform: translateX(-160%);
            }
            45%, 100% {
              transform: translateX(360%);
            }
          }
          @keyframes cta-soft-pulse {
            0%, 100% {
              opacity: 0.35;
              transform: scale(0.96);
            }
            50% {
              opacity: 0.85;
              transform: scale(1.06);
            }
          }
        `}</style>
      </div>
      {/* ── New Centered Top Bar End ──────────────────────────────────────── */}
      {/* ── Top Blue Announcement Bar ───────────────────────────────────── */}
      <div className="hidden bg-black text-neutral-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          {/* Left: Trust & Coverage */}
          <div className="flex items-center flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-[12px] sm:text-[13px] font-normal tracking-wide">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <svg
                className="w-3.5 h-3.5 text-neutral-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>No cost per lead - Revenue share only</span>
            </div>


            {/* <div className="flex items-center gap-1.5 text-neutral-300">
              <svg
                className="w-3.5 h-3.5 text-neutral-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Coverage in all 50 states + DC</span>
            </div> */}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-5 text-[12px] sm:text-[13px] font-normal text-neutral-300">
            <a
              href="#suppliers"
              className="hover:text-white transition-colors flex items-center gap-1 group"
            >
              <span>Suppliers: sell leads to us</span>
              <span className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
            <span className="text-neutral-700 hidden sm:inline">|</span>
            <a
              href="#buyer-login"
              className="hover:text-white transition-colors font-medium"
            >
              Buyer Login
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ────────────────────────────────────────── */}
      <div className="relative bg-black border-b border-white/10">
        <div
          ref={dropdownRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6 h-18 sm:h-20"
        >
          {/* Brand Logo (Left Column) */}
          <div className="flex-1 flex items-center justify-start min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded min-w-0"
            >
              <img
                src="https://hotpremiumcustomers.com/logo-mark.png"
                alt="Hot Premium Customers Logo"
                className="w-auto object-contain h-8 sm:h-9 md:h-10 shrink-0"
              />
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[14px] sm:text-[17px] md:text-[19px] font-bold tracking-normal leading-tight uppercase text-white truncate">
                  Hot Premium Customers
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) - Centered with Generous Spacing */}
          <nav className="hidden xl:flex items-center justify-center gap-3.5 2xl:gap-6 shrink-0">
            {/* ── HOW IT WORKS ───────────────────────────────────── */}
            <Link
              href="#how-it-works"
              className="relative px-3 py-1.5 text-[13px] font-semibold uppercase tracking-[0.03em] text-white/70 hover:text-white transition-colors duration-150"
            >
              HOW IT WORKS
            </Link>

            {/* ── INDUSTRIES (Dropdown) ───────────────────────────────────── */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("verticals")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => toggleDropdown("verticals")}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold uppercase tracking-[0.03em] transition-colors duration-150 ${scrolled
                  ? openMenu === "verticals"
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                  : openMenu === "verticals"
                    ? "text-gray-950 bg-black/[0.04]"
                    : "text-gray-700 hover:text-gray-950 hover:bg-black/[0.03]"
                  }`}
              >
                <span className="relative py-0.5">
                  INDUSTRIES
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${scrolled ? "bg-white" : "bg-[#2563EB]"
                      } rounded-full transition-all duration-200 ease-out origin-left ${openMenu === "verticals"
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                  />
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${openMenu === "verticals"
                    ? "rotate-180 text-gray-950"
                    : scrolled
                      ? "text-white/50 group-hover:text-white"
                      : "text-gray-400 group-hover:text-gray-950"
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Mega Menu All Verticals */}
              {openMenu === "verticals" && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" } as React.CSSProperties}
                    onClick={() => setOpenMenu(null)}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[1040px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter("verticals")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-[#FAF9F5] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.18)] border border-neutral-300/80 p-6">
                    <div className="flex items-stretch gap-6">
                      {/* 1. Left Card (Dynamic Image + Partner with us Pill + Title) */}
                      {(() => {
                        const currentVert =
                          verticalsFeatured[hoveredVerticalIdx] || verticalsFeatured[0];
                        return (
                          <a
                            href={currentVert.href}
                            onClick={() => setOpenMenu(null)}
                            className="w-[240px] shrink-0 rounded-2xl overflow-hidden relative flex flex-col justify-between p-5 min-h-[340px] group shadow-md transition-all duration-300 border border-black/15 bg-black"
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={currentVert.image}
                                src={currentVert.image}
                                alt={currentVert.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </AnimatePresence>
                            {/* Deep rich black gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35" />

                            {/* Top pill badge & up-right arrow */}
                            <div className="relative z-10 flex items-center justify-between">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#2563EB] text-white text-[11px] font-extrabold tracking-tight shadow-xs">
                                Partner with us
                              </span>
                              <div className="w-7 h-7 rounded-full bg-black/80 backdrop-blur-xs flex items-center justify-center text-[#2563EB] border border-white/15 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 17L17 7M17 7H7M17 7V17"
                                  />
                                </svg>
                              </div>
                            </div>

                            {/* Bottom Card Content */}
                            <div className="relative z-10">
                              <div className="text-[#2563EB] mb-1.5 flex items-center gap-1.5">
                                <span className="inline-flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded border border-white/15">
                                </span>
                              </div>
                              <h4 className="font-serif text-[17.5px] font-bold text-white leading-tight">
                                {currentVert.title}
                              </h4>

                            </div>
                          </a>
                        );
                      })()}

                      {/* 2. Center 2-Column Grid (8 Vertical Items) */}
                      <div className="flex-1 grid grid-cols-2 gap-x-5 gap-y-2">
                        {verticalsFeatured.map((item, idx) => {
                          const isHovered = hoveredVerticalIdx === idx;
                          return (
                            <a
                              key={item.title}
                              href={item.href}
                              onMouseEnter={() => setHoveredVerticalIdx(idx)}
                              onClick={() => setOpenMenu(null)}
                              className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-150 group cursor-pointer ${isHovered ? "bg-black/5" : "hover:bg-black/5"
                                }`}
                            >
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 shadow-xs ${isHovered
                                  ? "bg-black text-white border border-[#2563EB]/70 scale-105 shadow-sm"
                                  : "bg-[#101A2B] text-white border border-[#101A2B]/40 group-hover:border-[#2563EB]/60 group-hover:scale-105"
                                  }`}
                              >
                                {item.icon}
                              </div>
                              <div className="min-w-0 flex-1 flex items-center justify-between gap-2 flex-nowrap">
                                <h4 className="text-[16px] font-bold text-black leading-tight truncate whitespace-nowrap">
                                  {item.title}
                                </h4>
                                <span className="text-[11px] font-medium uppercase tracking-wider bg-black/10 text-[#374151] px-1.5 py-0.5 rounded shrink-0">
                                  {item.badge}
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </div>

                      {/* 3. Right Column (Solid Black Featured Card + View All Link) */}
                      <div className="w-[220px] shrink-0 flex flex-col justify-between">
                        <a
                          href="#partner"
                          onClick={() => setOpenMenu(null)}
                          className="bg-[#2563EB] hover:bg-neutral-900 transition-all duration-200 rounded-2xl p-5 text-white flex flex-col justify-between h-[235px] relative overflow-hidden group shadow-md border border-black/10"
                        >
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#2563EB] text-white text-[11px] font-extrabold">
                              Featured
                            </span>
                            <div className="text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7 17L17 7M17 7H7M17 7V17"
                                />
                              </svg>
                            </div>
                          </div>

                          <div className="mt-auto pt-4">
                            <h3 className="font-serif text-[18.5px] font-bold !text-white leading-snug">
                              Bring the offer. We fund the scale.
                            </h3>
                            <a
                              href="#contact"
                              onClick={() => setOpenMenu(null)}
                              className="mt-4 inline-flex items-center gap-1.5 bg-white text-black text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
                            >
                              Apply for partnership <span>→</span>
                            </a>
                          </div>
                        </a>

                        {/* View All Industries link */}
                        <a
                          href="#all-industries"
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-black/5 transition-colors group cursor-pointer mt-2 justify-start"
                        >
                          <div className="text-[#2563EB] group-hover:translate-x-0.5 transition-transform mt-0.5 shrink-0">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-[15px] font-semibold text-[#2563EB] leading-tight">
                              View all industries
                            </h5>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>

            {/* ── FAQ ───────────────────────────────────── */}
            <Link
              href="#faq"
              className="relative px-3 py-1.5 text-[13px] font-semibold uppercase tracking-[0.03em] text-white/70 hover:text-white transition-colors duration-150"
            >
              FAQ
            </Link>
          </nav>

          {/* Right Action Elements (Right Column) */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4 min-w-0">

            {/* Hero-matching CTA via shared Button component - Solid Brand Blue */}
            <div className="hidden md:inline-flex">
              <a
                href="#contact"
                className="bg-[#2563EB] text-white text-[13px] font-semibold uppercase tracking-[0.03em] px-6 py-2.5 rounded-lg hover:bg-[#1D4ED8] transition-colors duration-150 shadow-sm hover:shadow-md"
              >
                APPLY →
              </a>
            </div>

            {/* Mobile APPLY button - always visible outside hamburger */}
            <div className="md:hidden">
              <a
                href="#contact"
                className="bg-[#2563EB] text-white text-[13px] font-semibold uppercase tracking-[0.03em] px-4 py-2 rounded-lg hover:bg-[#1D4ED8] transition-colors duration-150 shadow-sm hover:shadow-md"
              >
                APPLY →
              </a>
            </div>

            {/* Mobile Hamburger Toggle — animated morph */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-lg bg-black text-white hover:bg-neutral-800 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="flex flex-col justify-center items-center w-5 h-5 gap-[5px] relative">
                {/* Top bar */}
                <span
                  className="block h-[1.75px] w-5 bg-white rounded-full origin-center transition-all duration-300 ease-in-out"
                  style={{
                    transform: mobileMenuOpen
                      ? "translateY(6.75px) rotate(45deg)"
                      : "none",
                  }}
                />
                {/* Middle bar */}
                <span
                  className="block h-[1.75px] w-5 bg-white rounded-full transition-all duration-200 ease-in-out"
                  style={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    transform: mobileMenuOpen ? "scaleX(0)" : "none",
                  }}
                />
                {/* Bottom bar */}
                <span
                  className="block h-[1.75px] w-5 bg-white rounded-full origin-center transition-all duration-300 ease-in-out"
                  style={{
                    transform: mobileMenuOpen
                      ? "translateY(-6.75px) rotate(-45deg)"
                      : "none",
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile Navigation Drawer ───────────────────────────────── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-nav-drawer"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={`xl:hidden border-t overflow-hidden transition-colors duration-200 ${scrolled
                ? "border-white/10 bg-[#0c0c0c] text-white"
                : "border-gray-200 bg-white text-gray-900"
                } shadow-2xl`}
            >
              <div className="px-5 pt-3.5 pb-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
                {/* Mobile Nav Links */}
                <div className="space-y-0.5">
                  {/* ── HOW IT WORKS ───────────────────────────────────── */}
                  <Link
                    href="#how-it-works"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2.5 text-[15px] font-semibold uppercase tracking-[0.03em] transition-colors ${scrolled ? "text-white" : "text-gray-900"}`}
                  >
                    HOW IT WORKS
                  </Link>

                  {/* ── INDUSTRIES (Dropdown) ───────────────────────────────────── */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleDropdown("mobile-verticals")}
                      className={`w-full flex items-center justify-between py-2.5 text-[15px] font-semibold uppercase tracking-[0.03em] transition-colors ${scrolled ? "text-white" : "text-gray-900"
                        }`}
                    >
                      <span>INDUSTRIES</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${openMenu === "mobile-verticals" ? "rotate-180" : ""
                          } ${scrolled ? "text-white/60" : "text-gray-500"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openMenu === "mobile-verticals" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className={`overflow-hidden pl-2 pb-2 space-y-1.5 text-sm ${scrolled ? "text-neutral-300" : "text-gray-600"}`}
                        >
                          {verticalsFeatured.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${scrolled
                                ? "hover:bg-white/10 text-white/90"
                                : "hover:bg-neutral-100 text-neutral-800"
                                }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#101A2B] text-white border border-[#101A2B]/40 flex items-center justify-center shrink-0">
                                {item.icon}
                              </div>
                              <div className="min-w-0 flex-1 flex items-center justify-between gap-1.5">
                                <span className="font-semibold text-xs leading-tight truncate">
                                  {item.title}
                                </span>
                                <span className="text-[9px] px-1 py-0.5 rounded bg-black/10 text-black font-bold shrink-0">
                                  {item.badge}
                                </span>
                              </div>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── FAQ ───────────────────────────────────── */}
                  <Link
                    href="#faq"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2.5 text-[15px] font-semibold uppercase tracking-[0.03em] transition-colors ${scrolled ? "text-white" : "text-gray-900"}`}
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
