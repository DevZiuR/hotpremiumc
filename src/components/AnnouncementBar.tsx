"use client";

import React, { useEffect, useState } from "react";

const DISMISS_KEY = "hpc-announce-dismissed";

/**
 * Slim announcement bar pinned above the floating nav.
 *
 * Height is published to the document as `--announce-h` so the nav offset, the
 * in-flow spacer, and the hero's viewport math all read from a single source of
 * truth. That keeps the ribbon visible without scrolling and lets everything
 * ease back when the bar is dismissed.
 */
export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  /* Read storage after mount so server and client markup match on first paint. */
  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      /* Storage can be blocked in private modes — default to showing the bar. */
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    /* Matches the bar's own h-9 / sm:h-10 so every consumer stays in sync. */
    if (dismissed) {
      root.style.setProperty("--announce-h", "0px");
    } else {
      root.style.setProperty("--announce-h", "36px");
      if (window.matchMedia("(min-width: 640px)").matches) {
        root.style.setProperty("--announce-h", "40px");
      }
    }
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* Non-fatal: the bar still hides for this session's lifetime. */
    }
  };

  if (dismissed) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-[90] h-9 select-none overflow-hidden bg-[#000000] sm:h-10"
      style={{
        /* Faint warm wash — reads as light on black, not as a colored strip. */
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(201,162,75,0.09) 50%, rgba(0,0,0,0) 100%)",
      }}
      role="region"
      aria-label="Site announcement"
    >
      {/* Slow shimmer sweep. Decorative only — hidden from AT and from
          reduced-motion users via the global animation guard. */}
      <div
        aria-hidden="true"
        className="animate-announce-shimmer pointer-events-none absolute inset-y-0 w-1/3"
        style={{
          background:
            "linear-gradient(90deg, rgba(201,162,75,0) 0%, rgba(201,162,75,0.10) 50%, rgba(201,162,75,0) 100%)",
        }}
      />

      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-8 sm:px-14">
        {/* whitespace-nowrap keeps this to one line at every width. Mobile uses
            the short phrase; px-8 reserves the left inset and the close button
            sits in the right inset, so neither can overlap the link. */}
        <p className="min-w-0 whitespace-nowrap text-center font-sans text-[11.5px] leading-none tracking-[-0.005em] text-white/85 sm:text-[13.5px] sm:tracking-[0.01em]">
          <span className="hidden sm:inline">Exclusive territories, never shared or resold. </span>
          <span className="sm:hidden">Exclusive territories. </span>
          <a
            href="#contact"
            className="group/link inline-flex items-center gap-1 whitespace-nowrap font-semibold tracking-normal text-[#C9A24B] transition-colors duration-200 hover:text-[#D8B45C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24B]"
          >
            <span>Partner with us</span>
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </p>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          /* 40x40 tap target, optically centered on the bar's axis. */
          className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/40 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24B] sm:right-1"
        >
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Hairline along the bottom edge: transparent → gold → transparent. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(201,162,75,0) 0%, rgba(201,162,75,0.5) 50%, rgba(201,162,75,0) 100%)",
        }}
      />
    </div>
  );
}