"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredVerticalIdx, setHoveredVerticalIdx] = useState<number | null>(null);
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

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1280) setMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

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
    <>

      {openMenu === "verticals" && (
        <button
          type="button"
          aria-label="Close industries menu"
          onClick={() => setOpenMenu(null)}
          className="fixed inset-0 z-40 cursor-default"
          style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" } as React.CSSProperties}
        />
      )}

      {/* ── Main Navigation Bar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full select-none bg-black text-white shadow-md">
      <div className="relative bg-black border-b border-white/10">
        <div
          ref={dropdownRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6 h-14 sm:h-20"
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
              <div className="hidden sm:flex flex-col justify-center min-w-0">
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
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[1040px] z-[60] animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter("verticals")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-[#FAF9F5] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.18)] border border-neutral-300/80 p-6">
                    <div className="flex items-stretch gap-6">
                      {/* 1. Left Card — pure image, no overlays, gentle hover zoom */}
                      {(() => {
                        const currentVert = hoveredVerticalIdx !== null ? verticalsFeatured[hoveredVerticalIdx] : null;
                        const imgSrc = currentVert ? currentVert.image : "/media/industries.png";
                        const imgAlt = currentVert ? currentVert.title : "Industries we serve";
                        const cardHref = currentVert ? currentVert.href : "#verticals";
                        return (
                          <a
                            href={cardHref}
                            onClick={() => setOpenMenu(null)}
                            className="w-[240px] shrink-0 rounded-2xl overflow-hidden relative min-h-[340px] group shadow-md border border-black/10 bg-black block"
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={imgSrc}
                                src={imgSrc}
                                alt={imgAlt}
                                initial={{ opacity: 0, scale: 1.04 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="absolute inset-0 w-full h-full object-cover transition-[transform,filter] duration-[450ms] ease-out group-hover:scale-[1.03] group-hover:brightness-110"
                              />
                            </AnimatePresence>
                          </a>
                        );
                      })()}

                      {/* 2. Center 2-Column Grid (8 Vertical Items) */}
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                        {verticalsFeatured.map((item, idx) => {
                          const isHovered = hoveredVerticalIdx === idx;
                          return (
                            <a
                              key={item.title}
                              href={item.href}
                              onMouseEnter={() => setHoveredVerticalIdx(idx)}
                              onMouseLeave={() => setHoveredVerticalIdx(null)}
                              onClick={() => setOpenMenu(null)}
                              className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-150 group cursor-pointer ${isHovered ? "bg-black/5" : "hover:bg-black/5"
                                }`}
                            >
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 border border-neutral-700/50 ${isHovered
                                  ? "bg-neutral-900 text-white border-[#2563EB]/60 scale-105 shadow-sm"
                                  : "bg-neutral-900 text-neutral-300 group-hover:border-[#2563EB]/50 group-hover:text-white group-hover:scale-105"
                                  }`}
                              >
                                {item.icon}
                              </div>
                              <h4 className="text-[15px] font-semibold text-neutral-800 leading-tight truncate whitespace-nowrap">
                                {item.title}
                              </h4>
                            </a>
                          );
                        })}
                        </div>
                        {/* View all industries — sits directly beneath the grid */}
                        <a
                          href="#all-industries"
                          onClick={() => setOpenMenu(null)}
                          className="mt-3 flex items-center gap-2 text-[14px] font-semibold text-[#2563EB] transition-colors group cursor-pointer hover:text-[#1D4ED8]"
                        >
                          <span>View all industries</span>
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </a>
                      </div>

                      {/* 3. Right Column — clean Featured Card */}
                      <div className="w-[220px] shrink-0 flex flex-col">
                        <a
                          href="#partner"
                          onClick={() => setOpenMenu(null)}
                          className="bg-[#2563EB] hover:bg-neutral-900 transition-all duration-300 rounded-2xl text-white flex flex-col justify-end h-full min-h-[340px] relative overflow-hidden group shadow-md border border-black/10 p-6"
                        >
                          <h3 className="font-serif text-[26px] font-bold text-white leading-[1.1] mb-6">
                            Bring the offer.<br />We fund the scale.
                          </h3>
                          {/* Use button instead of <a> to avoid invalid <a> inside <a> nesting (hydration error) */}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpenMenu(null); window.location.hash = "contact"; }}
                            className="inline-flex w-full items-center justify-between gap-4 whitespace-nowrap rounded-lg bg-white px-4 py-3 text-[13px] font-semibold leading-[1.2] text-black transition-colors hover:bg-neutral-100"
                          >
                            <span>Apply for partnership</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
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
                className="bg-[#2563EB] text-white text-[12px] font-semibold uppercase tracking-[0.03em] h-9 px-4 rounded-lg hover:bg-[#1D4ED8] transition-colors duration-150 shadow-sm hover:shadow-md flex items-center"
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

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-nav-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 z-[100] overflow-y-auto bg-[#09090b] text-white xl:hidden"
            >
              <div className="relative flex min-h-full flex-col">
                {/* Top bar — logo + close */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] px-5 sm:px-8">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Hot Premium Customers home"
                    className="flex items-center"
                  >
                    <img
                      src="https://hotpremiumcustomers.com/logo-mark.png"
                      alt=""
                      className="h-7 w-auto object-contain"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation"
                    className="flex h-8 w-8 items-center justify-center text-white/50 hover:text-white transition-colors duration-150"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                {/* Nav links */}
                <motion.nav
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
                  }}
                  className="flex flex-col px-5 pt-2 pb-6 sm:px-8"
                >
                  {[
                    { label: "How it works", href: "#how-it-works" },
                    { label: "Industries", href: "#verticals" },
                    { label: "FAQ", href: "#faq" },
                  ].map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] } },
                      }}
                      className="group flex items-center justify-between border-b border-white/[0.07] py-4 font-sans text-[26px] font-medium tracking-[-0.02em] text-white/90 transition-colors duration-150 last:border-b-0 hover:text-white"
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className="text-[18px] text-white/25 transition-all duration-200 group-hover:text-[#2563EB] group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </motion.a>
                  ))}
                </motion.nav>

                {/* Spacer */}
                <div className="flex-1" />

                {/* CTA */}
                <div className="px-5 pb-8 sm:px-8">
                  <motion.a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.18 }}
                    className="flex h-11 w-full items-center justify-between rounded-lg bg-[#2563EB] px-5 font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-[#1D4ED8]"
                  >
                    <span>Apply for partnership</span>
                    <span aria-hidden="true" className="text-white/70">→</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </header>
    </>
  );
}
