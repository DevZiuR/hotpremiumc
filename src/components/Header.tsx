"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "INDUSTRIES", href: "#verticals" },
  { label: "FAQ", href: "#faq" },
];

function GlobeIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

const INDUSTRIES_LIST = [
  {
    title: "Legal",
    href: "#verticals",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M5 7l-3 7a3.5 3.5 0 0 0 7 0L6 7" />
        <path d="M19 7l-3 7a3.5 3.5 0 0 0 7 0l-4-7" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    title: "Financial Services",
    href: "#verticals",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m2 7 10-5 10 5v2H2z" />
        <path d="M4 11v7" />
        <path d="M9 11v7" />
        <path d="M15 11v7" />
        <path d="M20 11v7" />
        <path d="M2 20h20" />
      </svg>
    ),
  },
  {
    title: "Insurance",
    href: "#verticals",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Home Services",
    href: "#verticals",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Medical & Health",
    href: "#verticals",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
        <path d="M3.22 12H7l2-3 3 6 2-3h3" />
      </svg>
    ),
  },
  {
    title: "Emerging Claims",
    href: "#verticals",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
        <path d="M16 16 20 20" />
        <path d="m19 13 2-2a2.83 2.83 0 0 0-4-4l-2 2" />
        <path d="m9 7 4 4" />
        <path d="m21 11-8-8" />
      </svg>
    ),
  },
  {
    title: "Enterprise & B2B",
    href: "#verticals",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
  },
  {
    title: "Pay Per Call",
    href: "#verticals",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

const REGIONS_LIST = [
  { title: "North America", href: "#global-coverage" },
  { title: "United Kingdom", href: "#global-coverage" },
  { title: "Western Europe", href: "#global-coverage" },
  { title: "The Nordics", href: "#global-coverage" },
  { title: "Australia & NZ", href: "#global-coverage" },
  { title: "50-State Coverage", href: "#global-coverage" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  /* Below 768px the pill is logo + hamburger only, so the CTA reappears here
     once the hero has scrolled away and there is room for it. */
  const [pastHero, setPastHero] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Track whether the hero has left the viewport, gating the mobile CTA. */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setPastHero(window.scrollY > window.innerHeight * 0.9);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Retire the pill once the footer's top edge reaches the header's band. */
  useEffect(() => {
    const el = headerRef.current;
    const footer = document.querySelector("footer");
    if (!el || !footer) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const base = window.innerWidth >= 640 ? 20 : 12;
      /* Announcement bar height is published as --announce-h; read it so the
         retire threshold still matches the nav's real position. */
      const announced = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--announce-h")
      );
      const topOffset = base + (Number.isFinite(announced) ? announced : 0);
      const threshold = topOffset + el.offsetHeight;
      const shouldHide = footer.getBoundingClientRect().top <= threshold;
      el.classList.toggle("opacity-0", shouldHide);
      el.classList.toggle("-translate-y-[130%]", shouldHide);
      el.classList.toggle("pointer-events-none", shouldHide);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Outside click closes dropdown */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setIsPinned(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openDropdown = (name: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(name);
  };

  const scheduleClose = () => {
    if (isPinned) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, 350);
  };

  const toggleDropdown = (name: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openMenu === name) {
      setOpenMenu(null);
      setIsPinned(false);
    } else {
      setOpenMenu(name);
      setIsPinned(true);
    }
  };

  /* Closes the mobile menu and collapses the Industries accordion together,
     so the panel always reopens from a clean state. */
  const closeMobileMenu = () => {
    setMobileIndustriesOpen(false);
    setMobileMenuOpen(false);
  };

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMobileMenu(); };
    const handleResize = () => { if (window.innerWidth >= 768) closeMobileMenu(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Backdrop — clicking anywhere outside closes the Industries menu */}
      {openMenu === "verticals" && (
        <button
          type="button"
          aria-label="Close industries menu"
          onClick={() => {
            setOpenMenu(null);
            setIsPinned(false);
          }}
          className="fixed inset-0 z-40 cursor-default"
          style={
            {
              background: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            } as React.CSSProperties
          }
        />
      )}

      {/* ── Floating Pill Header (reference structure) ─────────────────────── */}
      <header
        ref={headerRef}
        className="fixed left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-7xl select-none transition-[opacity,transform,top] duration-300 ease-out motion-reduce:transition-none top-[calc(var(--announce-h,0px)+0.75rem)] sm:top-[calc(var(--announce-h,0px)+0.875rem)]"
      >
        <div
          className="mx-auto flex items-center justify-between gap-4 rounded-[18px] border border-white/[0.1] bg-black/60 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.55)] px-4 py-2 sm:gap-6 sm:px-5 transition-colors duration-300"
        >

          {/* Left — Logo + Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-xl"
          >
            <img
              src="https://hotpremiumcustomers.com/logo-mark.png"
              alt="Hot Premium Customers"
              className="h-7 w-auto object-contain shrink-0"
            />
            <span
              className="hidden lg:block font-serif text-[22px] font-normal tracking-[0.01em] leading-none transition-colors duration-300 text-white"
            >
              Hot Premium Customers
            </span>
          </Link>

          {/* Center — Nav Links (desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-7 lg:gap-8">
            <Link
              href="#how-it-works"
              className="group relative whitespace-nowrap shrink-0 leading-none font-mono text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 text-white/70 hover:text-[#C9A24B] focus-visible:text-[#C9A24B] focus-visible:outline-none"
            >
              HOW IT WORKS
            </Link>

            {/* INDUSTRIES — dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => openDropdown("verticals")}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => toggleDropdown("verticals")}
                aria-expanded={openMenu === "verticals"}
                aria-haspopup="menu"
                className={`group relative flex items-center gap-1.5 whitespace-nowrap shrink-0 py-1 leading-none font-mono text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 cursor-pointer focus-visible:outline-none ${openMenu === "verticals"
                    ? "text-[#C9A24B]"
                    : "text-white/70 hover:text-[#C9A24B] focus-visible:text-[#C9A24B]"
                  }`}
              >
                INDUSTRIES
                <svg
                  aria-hidden="true"
                  className={`w-3 h-3 transition-all duration-200 ease-out ${openMenu === "verticals" ? "rotate-180" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown — dark panel matching reference image */}
              <AnimatePresence>
                {openMenu === "verticals" && (
                  <motion.div
                    key="industries-menu"
                    role="menu"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                    onMouseEnter={() => {
                      if (closeTimer.current) {
                        clearTimeout(closeTimer.current);
                        closeTimer.current = null;
                      }
                    }}
                    onMouseLeave={scheduleClose}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[700px] max-w-[calc(100vw-32px)] z-[60]"
                  >
                    {/* Invisible bridge over the gap to prevent premature mouseleave */}
                    <div className="absolute -top-3.5 inset-x-0 h-4 bg-transparent pointer-events-auto" />

                    <div className="bg-[#0b0b0e] border border-white/10 rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.7)] p-6 sm:p-7 select-none">
                      {/* Section 1: INDUSTRIES */}
                      <div>
                        <div className="text-[11px] font-mono sm:font-sans font-semibold uppercase tracking-[0.14em] text-white/40 mb-3.5">
                          Industries
                        </div>
                        <div className="grid grid-cols-3 gap-x-6 gap-y-3.5">
                          {INDUSTRIES_LIST.map((item, idx) => (
                            <a
                              key={item.title}
                              role="menuitem"
                              href={item.href}
                              onClick={() => {
                                setOpenMenu(null);
                                setIsPinned(false);
                                window.dispatchEvent(new CustomEvent("select-industry", { detail: { index: idx } }));
                              }}
                              className="group flex items-center gap-3 py-1.5 px-2.5 -mx-2.5 rounded-lg text-white/80 transition-colors duration-200 hover:text-[#C9A24B] hover:bg-[rgba(201,162,75,0.06)] focus-visible:text-[#C9A24B] focus-visible:bg-[rgba(201,162,75,0.06)] focus-visible:outline-none cursor-pointer"
                            >
                              <span className="text-white/70 transition-colors duration-200 group-hover:text-[#C9A24B] group-focus-visible:text-[#C9A24B] shrink-0">
                                {item.icon}
                              </span>
                              <span className="text-[14px] font-medium leading-snug">
                                {item.title}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-5 border-t border-white/[0.08]" />

                      {/* Section 2: REGIONS */}
                      <div>
                        <div className="text-[11px] font-mono sm:font-sans font-semibold uppercase tracking-[0.14em] text-white/40 mb-3.5">
                          Regions
                        </div>
                        <div className="grid grid-cols-3 gap-x-6 gap-y-3.5">
                          {REGIONS_LIST.map((item) => (
                            <a
                              key={item.title}
                              role="menuitem"
                              href={item.href}
                              onClick={() => {
                                setOpenMenu(null);
                                setIsPinned(false);
                              }}
                              className="group flex items-center gap-3 py-1.5 px-2.5 -mx-2.5 rounded-lg text-white/80 transition-colors duration-150 hover:text-white hover:bg-white/[0.04] cursor-pointer"
                            >
                              <span className="text-white/70 transition-colors duration-150 group-hover:text-white shrink-0">
                                <GlobeIcon />
                              </span>
                              <span className="text-[14px] font-medium leading-snug">
                                {item.title}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="#faq"
              className="group relative font-mono text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 text-white/70 hover:text-[#C9A24B] focus-visible:text-[#C9A24B] focus-visible:outline-none"
            >
              FAQ
            </Link>
          </nav>

          {/* Right — Availability CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop/tablet CTA. Below 768px it is hidden while the hero is on screen
                  (logo + hamburger only) and returns after the scroll. */}
              <a
              href="#contact"
              className={`inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 font-sans text-[13px] font-medium leading-none tracking-normal text-white cursor-pointer bg-[linear-gradient(to_bottom,#1C1C1F,#0A0A0B)] border border-[rgba(255,255,255,0.5)] hover:border-[rgba(255,255,255,0.7)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_0_12px_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(201,162,75,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_0_12px_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(201,162,75,0.2)] transition-all duration-200 hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24B] sm:px-5 sm:text-[14px] ${pastHero ? "md:inline-flex" : "max-md:hidden"}`}
            >
              Apply for Partnership
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors focus:outline-none text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24B]"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
                <span
                  className="block h-[1.5px] w-5 bg-current rounded-full origin-center transition-all duration-300"
                  style={{ transform: mobileMenuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
                />
                <span
                  className="block h-[1.5px] w-5 bg-current rounded-full transition-all duration-200"
                  style={{ opacity: mobileMenuOpen ? 0 : 1, transform: mobileMenuOpen ? "scaleX(0)" : "none" }}
                />
                <span
                  className="block h-[1.5px] w-5 bg-current rounded-full origin-center transition-all duration-300"
                  style={{ transform: mobileMenuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[100] bg-[#000000] text-white md:hidden overflow-y-auto"
          >
            <div className="flex min-h-full flex-col">
              {/* Top bar */}
              <div className="flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#000000] px-5 sm:px-8">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                  <img src="https://hotpremiumcustomers.com/logo-mark.png" alt="" className="h-7 w-auto object-contain" />
                  <span className="font-serif text-[18px] font-normal uppercase text-white">
                    Hot Premium Customers
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close navigation"
                  className="text-white hover:text-white/70 transition-colors p-1"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } } }}
                className="flex flex-col px-5 pt-2 pb-6 sm:px-8"
              >
                {NAV_LINKS.map((item) => {
                  const isIndustries = item.label === "INDUSTRIES";
                  const isExpanded = isIndustries && mobileIndustriesOpen;
                  const rowVariants = {
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.26, ease: [0.32, 0.72, 0, 1] as const },
                    },
                  };

                  return (
                    <div key={item.label} className="border-b border-white/[0.08] last:border-b-0">
                      {isIndustries ? (
                        <motion.button
                          type="button"
                          onClick={() => setMobileIndustriesOpen((v) => !v)}
                          aria-expanded={isExpanded}
                          aria-controls="mobile-industries-sublist"
                          variants={rowVariants}
                          className="group flex w-full min-h-[48px] items-center justify-between py-4 text-left font-sans text-[22px] font-medium tracking-[-0.02em] text-white active:text-[#C9A24B] transition-colors duration-150"
                        >
                          <span className="capitalize">Industries</span>
                          <svg
                            aria-hidden="true"
                            className={`h-5 w-5 shrink-0 text-white/50 transition-all duration-200 ${isExpanded ? "rotate-180 text-[#C9A24B]" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </motion.button>
                      ) : (
                        <motion.a
                          href={item.href}
                          onClick={closeMobileMenu}
                          variants={rowVariants}
                          className="group flex min-h-[48px] items-center justify-between py-4 font-sans text-[22px] font-medium tracking-[-0.02em] text-white active:text-[#C9A24B] transition-colors duration-150"
                        >
                          <span className="capitalize">{item.label.charAt(0) + item.label.slice(1).toLowerCase()}</span>
                          <span aria-hidden="true" className="text-white/50 text-[18px] transition-all duration-200 group-hover:translate-x-0.5 group-active:text-[#C9A24B]">→</span>
                        </motion.a>
                      )}

                      {/* Industries sub-list — grid-rows height transition for smooth expand */}
                      {isIndustries && (
                        <div
                          id="mobile-industries-sublist"
                          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                          <div className="overflow-hidden">
                            <div className="flex flex-col py-3 pb-4 space-y-5">
                              {/* Industries */}
                              <div>
                                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-white/40 block mb-2 px-2">
                                  Industries
                                </span>
                                <div className="flex flex-col gap-1">
                                  {INDUSTRIES_LIST.map((industry, idx) => (
                                    <a
                                      key={industry.title}
                                      href={industry.href}
                                      onClick={() => {
                                        closeMobileMenu();
                                        window.dispatchEvent(new CustomEvent("select-industry", { detail: { index: idx } }));
                                      }}
                                      className="group flex items-center gap-3 py-2 px-2.5 rounded-lg text-white/80 active:text-[#C9A24B] active:bg-[rgba(201,162,75,0.06)] transition-colors"
                                    >
                                      <span className="text-white/70 group-active:text-[#C9A24B]">{industry.icon}</span>
                                      <span className="text-[15px] font-medium">{industry.title}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>

                              {/* Regions */}
                              <div className="pt-3 border-t border-white/[0.08]">
                                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-white/40 block mb-2 px-2">
                                  Regions
                                </span>
                                <div className="flex flex-col gap-1">
                                  {REGIONS_LIST.map((reg) => (
                                    <a
                                      key={reg.title}
                                      href={reg.href}
                                      onClick={closeMobileMenu}
                                      className="flex items-center gap-3 py-2 px-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                                    >
                                      <span className="text-white/70"><GlobeIcon /></span>
                                      <span className="text-[15px] font-medium">{reg.title}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.nav>

              <div className="flex-1" />

              {/* CTA */}
              <div className="px-5 pb-8 sm:px-8">
                <motion.a
                  href="#contact"
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  className="flex h-12 w-full items-center justify-between rounded-full bg-[linear-gradient(to_bottom,#D9B25A,#BD9238)] border border-[rgba(255,255,255,0.35)] px-6 font-sans text-[14px] font-semibold tracking-normal text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_28px_rgba(201,162,75,0.3)] hover:bg-[#E3BE68] transition-all duration-200"
                >
                  <span>Apply for Partnership</span>
                  <span aria-hidden="true" className="text-black">→</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
