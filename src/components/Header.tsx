"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "INDUSTRIES", href: "#verticals" },
  { label: "FAQ", href: "#faq" },
];

const INDUSTRIES = [
  { title: "Legal", href: "#verticals" },
  { title: "Financial Services", href: "#verticals" },
  { title: "Insurance", href: "#verticals" },
  { title: "Home Services", href: "#verticals" },
  { title: "Medical & Health", href: "#verticals" },
  { title: "Enterprise & B2B", href: "#verticals" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Industries dropdown — hover opens, short grace period on leave so the
     panel can be crossed without snapping shut, outside click closes. */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
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
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  const toggleDropdown = (name: string) => {
    if (openMenu === name) setOpenMenu(null);
    else openDropdown(name);
  };

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    const handleResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
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
          onClick={() => setOpenMenu(null)}
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

      {/* ── Full-Width Sticky Header ─────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-[80] w-full h-16 md:h-[72px] flex items-center select-none transition-all duration-300 ease-in-out bg-black backdrop-blur-md border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div
          className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-5 sm:px-8 md:px-10 lg:px-14 border-x border-white/[0.08] transition-colors duration-300"
        >

          {/* Left — Logo + Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded"
          >
            <img
              src="https://hotpremiumcustomers.com/logo-mark.png"
              alt="Hot Premium Customers"
              className="h-8 md:h-9 w-auto object-contain shrink-0"
            />
            <span
              className="hidden md:block font-serif text-[18px] lg:text-[23px] font-normal tracking-[0.03em] leading-none uppercase transition-colors duration-300 text-white"
            >
              Hot Premium Customers
            </span>
          </Link>

          {/* Center — Nav Links (desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
            <Link
              href="#how-it-works"
              className="group relative text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 text-white/70 hover:text-white"
            >
              HOW IT WORKS
              {/* Underline — animates in from center on hover */}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-[#2563EB] rounded-full transition-all duration-250 ease-out group-hover:w-full"
              />
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
                className={`group relative flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 cursor-pointer ${
                  openMenu === "verticals"
                    ? "text-[#2563EB]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                INDUSTRIES
                <svg
                  aria-hidden="true"
                  className={`w-3 h-3 transition-transform duration-200 ease-out ${
                    openMenu === "verticals" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] bg-[#2563EB] rounded-full transition-all duration-250 ease-out ${
                    openMenu === "verticals" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>

              {/* Dropdown — dark panel, 480px, centered under the trigger */}
              <AnimatePresence>
                {openMenu === "verticals" && (
                  <motion.div
                    key="industries-menu"
                    role="menu"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                    onMouseEnter={() => openDropdown("verticals")}
                    onMouseLeave={scheduleClose}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[480px] max-w-[calc(100vw-48px)] z-[60]"
                  >
                    <div className="bg-[#111111] border border-white/10 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] p-3">
                      <div className="grid grid-cols-2 gap-1">
                        {INDUSTRIES.map((item) => (
                          <a
                            key={item.title}
                            role="menuitem"
                            href={item.href}
                            onClick={() => setOpenMenu(null)}
                            className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-white transition-colors duration-150 hover:text-[#2563EB] cursor-pointer"
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="#faq"
              className="group relative text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 text-white/70 hover:text-white"
            >
              FAQ
              {/* Underline — animates in from center on hover */}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-[#2563EB] rounded-full transition-all duration-250 ease-out group-hover:w-full"
              />
            </Link>
          </nav>

          {/* Right — Apply CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Desktop CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2.5 text-[13.5px] font-medium tracking-[0.01em] px-5 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer bg-white text-black hover:bg-neutral-100 shadow-[0_4px_16px_rgba(255,255,255,0.12)]"
            >
              {/* Google Meet 4-color icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path d="M29 24.5V16.5C29 14.8431 27.6569 13.5 26 13.5H8C6.34315 13.5 5 14.8431 5 16.5V31.5C5 33.1569 6.34315 34.5 8 34.5H26C27.6569 34.5 29 33.1569 29 31.5V24.5Z" fill="#00832d" />
                <path d="M29 19.5L37.899 12.6393C39.2312 11.6119 41.1667 12.562 41.1667 14.2464V33.7536C41.1667 35.438 39.2312 36.3881 37.899 35.3607L29 28.5V19.5Z" fill="#ffba00" />
                <path d="M29 24.5V16.5C29 14.8431 27.6569 13.5 26 13.5H16L29 24.5Z" fill="#2684fc" />
                <path d="M5 24.5L16 34.5H8C6.34315 34.5 5 33.1569 5 31.5V24.5Z" fill="#00ac47" />
                <path d="M5 16.5C5 14.8431 6.34315 13.5 8 13.5H16L5 22.5V16.5Z" fill="#ea4335" />
                <path d="M29 28.5L37.899 35.3607C39.2312 36.3881 41.1667 35.438 41.1667 33.7536V28.5L29 28.5Z" fill="#00832d" />
                <path d="M41.1667 19.5V14.2464C41.1667 12.562 39.2312 11.6119 37.899 12.6393L29 19.5H41.1667Z" fill="#ea4335" />
              </svg>
              <span>Apply now</span>
            </a>

            {/* Mobile CTA */}
            <a
              href="#contact"
              className="md:hidden inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.06em] h-8 px-3.5 rounded-full transition-colors duration-150 bg-white text-black hover:bg-neutral-100"
            >
              APPLY →
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded transition-colors focus:outline-none text-white/80 hover:text-white"
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
            className="fixed inset-0 z-[100] bg-white text-neutral-900 md:hidden overflow-y-auto"
          >
            <div className="flex min-h-full flex-col">
              {/* Top bar */}
              <div className="flex h-16 items-center justify-between border-b border-black/[0.08] px-5 sm:px-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <img src="https://hotpremiumcustomers.com/logo-mark.png" alt="" className="h-7 w-auto object-contain" />
                  <span className="font-serif text-[18px] font-normal uppercase text-[#0A0A0A]">
                    Hot Premium Customers
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation"
                  className="text-neutral-500 hover:text-black transition-colors p-1"
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
                {NAV_LINKS.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.26, ease: [0.32, 0.72, 0, 1] } } }}
                    className="group flex items-center justify-between border-b border-black/[0.06] py-4 font-sans text-[22px] font-medium tracking-[-0.02em] text-neutral-800 hover:text-black transition-colors duration-150 last:border-b-0"
                  >
                    <span className="capitalize">{item.label.charAt(0) + item.label.slice(1).toLowerCase()}</span>
                    <span aria-hidden="true" className="text-neutral-400 text-[18px] transition-all duration-200 group-hover:text-[#2563EB] group-hover:translate-x-0.5">→</span>
                  </motion.a>
                ))}
              </motion.nav>

              <div className="flex-1" />

              {/* CTA */}
              <div className="px-5 pb-8 sm:px-8">
                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  className="flex h-12 w-full items-center justify-between rounded-full bg-[#18181b] px-6 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-white hover:bg-black transition-colors duration-150 shadow-md"
                >
                  <span>Apply for partnership</span>
                  <span aria-hidden="true" className="text-white/70">→</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
