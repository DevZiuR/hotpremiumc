"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredVerticalIdx, setHoveredVerticalIdx] = useState<number>(0);
  const [hoveredTopState, setHoveredTopState] = useState<string | null>(null);
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
      setHoveredTopState(null);
    }, 180);
  };

  const toggleDropdown = (name: string) => {
    if (openMenu === name) {
      setOpenMenu(null);
    } else {
      handleMouseEnter(name);
    }
  };

  // State data for States dropdown
  const topMarkets = [
    {
      name: "California",
      code: "CA",
      city: "Los Angeles",
      metro: "Los Angeles & SF Bay Area",
      image: "/media/cities/california.jpg",
      highlight: "#1 Inbound Volume",
      align: "left" as const,
    },
    {
      name: "Texas",
      code: "TX",
      city: "Dallas & Austin",
      metro: "DFW, Houston & Austin",
      image: "/media/cities/texas.jpg",
      highlight: "High Growth Market",
      align: "center" as const,
    },
    {
      name: "Florida",
      code: "FL",
      city: "Miami",
      metro: "Miami-Dade & Orlando",
      image: "/media/cities/florida.jpg",
      highlight: "Top Retirement Hub",
      align: "center" as const,
    },
    {
      name: "New York",
      code: "NY",
      city: "New York City",
      metro: "NYC Metro & Tri-State",
      image: "/media/cities/new-york.jpg",
      highlight: "High Asset Tier",
      align: "center" as const,
    },
    {
      name: "Georgia",
      code: "GA",
      city: "Atlanta",
      metro: "Greater Atlanta Metro",
      image: "/media/cities/georgia.jpg",
      highlight: "Rapid Volume Surge",
      align: "right" as const,
    },
    {
      name: "Illinois",
      code: "IL",
      city: "Chicago",
      metro: "Chicagoland & Cook County",
      image: "/media/cities/illinois.jpg",
      highlight: "Key Midwest Hub",
      align: "left" as const,
    },
    {
      name: "Pennsylvania",
      code: "PA",
      city: "Philadelphia",
      metro: "Philly & Pittsburgh",
      image: "/media/cities/pennsylvania.jpg",
      highlight: "Dense Metro Reach",
      align: "center" as const,
    },
    {
      name: "North Carolina",
      code: "NC",
      city: "Charlotte",
      metro: "Charlotte & Raleigh-Durham",
      image: "/media/cities/north-carolina.jpg",
      highlight: "Banking & Tech Hub",
      align: "center" as const,
    },
    {
      name: "Arizona",
      code: "AZ",
      city: "Phoenix",
      metro: "Phoenix & Scottsdale Valley",
      image: "/media/cities/arizona.jpg",
      highlight: "Top Senior Demographics",
      align: "right" as const,
    },
  ];

  const statesCol1 = [
    { code: "AL", name: "Alabama" },
    { code: "CA", name: "California" },
    { code: "FL", name: "Florida" },
    { code: "IL", name: "Illinois" },
    { code: "KY", name: "Kentucky" },
    { code: "MA", name: "Massachusetts" },
    { code: "MO", name: "Missouri" },
    { code: "NH", name: "New Hampshire" },
    { code: "NC", name: "North Carolina" },
    { code: "OR", name: "Oregon" },
    { code: "SD", name: "South Dakota" },
    { code: "VT", name: "Vermont" },
    { code: "WI", name: "Wisconsin" },
  ];

  const statesCol2 = [
    { code: "AK", name: "Alaska" },
    { code: "CO", name: "Colorado" },
    { code: "GA", name: "Georgia" },
    { code: "IN", name: "Indiana" },
    { code: "LA", name: "Louisiana" },
    { code: "MI", name: "Michigan" },
    { code: "MT", name: "Montana" },
    { code: "NJ", name: "New Jersey" },
    { code: "ND", name: "North Dakota" },
    { code: "PA", name: "Pennsylvania" },
    { code: "TN", name: "Tennessee" },
    { code: "VA", name: "Virginia" },
    { code: "WY", name: "Wyoming" },
  ];

  const statesCol3 = [
    { code: "AZ", name: "Arizona" },
    { code: "CT", name: "Connecticut" },
    { code: "HI", name: "Hawaii" },
    { code: "IA", name: "Iowa" },
    { code: "ME", name: "Maine" },
    { code: "MN", name: "Minnesota" },
    { code: "NE", name: "Nebraska" },
    { code: "NM", name: "New Mexico" },
    { code: "OH", name: "Ohio" },
    { code: "RI", name: "Rhode Island" },
    { code: "TX", name: "Texas" },
    { code: "WA", name: "Washington" },
    { code: "DC", name: "Washington D.C." },
  ];

  const statesCol4 = [
    { code: "AR", name: "Arkansas" },
    { code: "DE", name: "Delaware" },
    { code: "ID", name: "Idaho" },
    { code: "KS", name: "Kansas" },
    { code: "MD", name: "Maryland" },
    { code: "MS", name: "Mississippi" },
    { code: "NV", name: "Nevada" },
    { code: "NY", name: "New York" },
    { code: "OK", name: "Oklahoma" },
    { code: "SC", name: "South Carolina" },
    { code: "UT", name: "Utah" },
    { code: "WV", name: "West Virginia" },
  ];

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

  const leadProgramsFeatured = [
    {
      title: "Annuity Leads",
      subtitle: "Fixed & indexed retirement annuities",
      badge: "Top Seller",
      href: "#annuity-leads",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="8" cy="8" r="6" />
          <path d="M18 12c0 3.314-2.686 6-6 6a5.97 5.97 0 0 1-4-.98" />
        </svg>
      ),
    },
    {
      title: "Advisor Leads",
      subtitle: "High-net-worth investors seeking RIAs",
      badge: "$250K+",
      href: "#financial-advisor-leads",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "Home Services",
      subtitle: "Roofing, solar, HVAC & remodeling",
      badge: "High Ticket",
      href: "#home-services",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: "Legal & MVA",
      subtitle: "Police-reported motor vehicle accidents",
      badge: "Retainers",
      href: "#mva-leads",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      title: "Tax Relief Leads",
      subtitle: "Delinquent federal IRS debt resolution",
      badge: "IRS $10K+",
      href: "#tax-relief-leads",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Mass Tort & Claims",
      subtitle: "Validated multi-district litigation claims",
      badge: "Class Action",
      href: "#mass-tort",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const resourcesFeatured = [
    {
      title: "Conversion Blog",
      subtitle: "Acquisition playbooks & compliance insights",
      badge: "Insights",
      href: "#blog",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Playbooks & Guides",
      subtitle: "Market reports & lead conversion frameworks",
      badge: "Guides",
      href: "#guides",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Coverage by State",
      subtitle: "Geofenced volume across all 50 states + DC",
      badge: "Map",
      href: "#coverage-state",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Search 190+ Verticals",
      subtitle: "Browse niches, volume thresholds & pricing",
      badge: "Directory",
      href: "#search-verticals",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ];

  return (
    <header
      className="relative z-50 w-full select-none bg-[#f4f5f7] text-black shadow-xs"
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
            <span className="text-white/95">Want us to fund your growth?</span>
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
                Apply for Partnership
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
            {/* ── 1. Lead Programs ───────────────────────────────────── */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("lead-programs")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => toggleDropdown("lead-programs")}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[15px] font-medium transition-colors duration-150 ${scrolled
                  ? openMenu === "lead-programs"
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                  : openMenu === "lead-programs"
                    ? "text-gray-950 bg-black/[0.04]"
                    : "text-gray-700 hover:text-gray-950 hover:bg-black/[0.03]"
                  }`}
              >
                <span className="relative py-0.5">
                  Lead Programs
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${scrolled ? "bg-white" : "bg-[#2563EB]"
                      } rounded-full transition-all duration-200 ease-out origin-left ${openMenu === "lead-programs"
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                  />
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${openMenu === "lead-programs"
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

              {/* Dropdown #1: Lead Programs */}
              {openMenu === "lead-programs" && (
                <div
                  className="absolute top-full -left-6 pt-3 w-[660px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter("lead-programs")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-[#FAF9F5] rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.16)] border border-neutral-300/80 p-5">
                    {/* 2-Column Precision Grid of 6 Programs */}
                    <div className="grid grid-cols-2 gap-2">
                      {leadProgramsFeatured.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-black/5 transition-all duration-150 group cursor-pointer border border-transparent hover:border-black/10"
                        >
                          <div className="w-9 h-9 rounded-xl bg-[#101A2B] text-white border border-[#101A2B]/40 group-hover:border-[#2563EB]/60 group-hover:scale-105 transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                            {item.icon}
                          </div>
                          <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
                            <span className="text-[13.5px] font-bold text-black group-hover:text-black truncate">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-extrabold uppercase tracking-wider bg-black/10 text-black px-1.5 py-0.5 rounded shrink-0">
                              {item.badge}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* Delivery Specs Bar (No CTA card, zero marketing noise, purely essential specs) */}
                  </div>
                </div>
              )}
            </div>

            {/* ── 2. All Verticals ───────────────────────────────────── */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("verticals")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => toggleDropdown("verticals")}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[15px] font-medium transition-colors duration-150 ${scrolled
                  ? openMenu === "verticals"
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                  : openMenu === "verticals"
                    ? "text-gray-950 bg-black/[0.04]"
                    : "text-gray-700 hover:text-gray-950 hover:bg-black/[0.03]"
                  }`}
              >
                <span className="relative py-0.5">
                  All Verticals
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
                  className="absolute top-full -left-64 pt-3 w-[1040px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
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
                            <img
                              src={currentVert.image}
                              alt={currentVert.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                            />
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
                              <h4 className="text-[17.5px] font-extrabold text-white leading-tight">
                                {currentVert.highlightTitle}
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
                              <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
                                <h4 className="text-[13.5px] font-bold text-black leading-tight truncate">
                                  {item.title}
                                </h4>
                                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-black/10 text-black px-1.5 py-0.5 rounded shrink-0">
                                  {item.badge}
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </div>

                      {/* 3. Right Column (Solid Black Featured Card + Updates Link) */}
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
                            <h3 className="text-[18.5px] font-extrabold !text-white leading-snug group-hover:text-[#2563EB] transition-colors">
                              Simplify your tech stack, grow your profit
                            </h3>
                          </div>
                        </a>

                        {/* Product Updates link */}
                        <a
                          href="#blog"
                          onClick={() => setOpenMenu(null)}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 transition-colors group cursor-pointer mt-2"
                        >
                          <div className="text-black group-hover:scale-110 transition-transform mt-0.5 shrink-0">
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
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-[12.5px] font-extrabold text-black leading-tight">
                              Product updates
                            </h5>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── 3. States ──────────────────────────────────────────── */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("states")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => toggleDropdown("states")}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[15px] font-medium transition-colors duration-150 ${scrolled
                  ? openMenu === "states"
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                  : openMenu === "states"
                    ? "text-gray-950 bg-black/[0.04]"
                    : "text-gray-700 hover:text-gray-950 hover:bg-black/[0.03]"
                  }`}
              >
                <span className="relative py-0.5">
                  States
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${scrolled ? "bg-white" : "bg-[#2563EB]"
                      } rounded-full transition-all duration-200 ease-out origin-left ${openMenu === "states"
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                  />
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${openMenu === "states"
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

              {/* Dropdown #3: States */}
              {openMenu === "states" && (
                <div
                  className="absolute top-full -left-28 pt-3 w-[720px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter("states")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-[#FAF9F5] rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.16)] border border-neutral-300/80 p-5">
                    {/* Top High-Intent Markets */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                          Top High-Volume States
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 relative">
                        {topMarkets.map((market) => {
                          const isHovered = hoveredTopState === market.name;
                          return (
                            <div
                              key={market.name}
                              className="relative"
                              onMouseEnter={() => setHoveredTopState(market.name)}
                              onMouseLeave={() => setHoveredTopState(null)}
                            >
                              <a
                                href={`#state-${market.name.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => {
                                  setOpenMenu(null);
                                  setHoveredTopState(null);
                                }}
                                className={`px-3 py-1 border rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer select-none ${isHovered
                                  ? "bg-[#2563EB] text-white border-[#2563EB] scale-[1.03] shadow-md z-20"
                                  : "bg-white text-black hover:bg-[#2563EB] hover:text-white border-black/10"
                                  }`}
                              >
                                <span>{market.name}</span>
                              </a>

                              {/* City Image Hover Preview Card (Only for Top States) */}
                              <AnimatePresence>
                                {isHovered && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 7, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                                    className={`absolute top-full mt-2.5 z-50 pointer-events-none w-[240px] rounded-xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.35)] border border-neutral-700/80 bg-black ${market.align === "left"
                                      ? "left-0"
                                      : market.align === "right"
                                        ? "right-0"
                                        : "left-1/2 -translate-x-1/2"
                                      }`}
                                  >
                                    {/* Caret pointing up to hovered pill */}
                                    <div
                                      className={`absolute -top-1.5 w-3 h-3 bg-black border-t border-l border-neutral-700/80 rotate-45 z-10 ${market.align === "left"
                                        ? "left-6"
                                        : market.align === "right"
                                          ? "right-6"
                                          : "left-1/2 -translate-x-1/2"
                                        }`}
                                    />

                                    {/* Image & Top Bar Container */}
                                    <div className="relative h-[115px] w-full overflow-hidden">
                                      <img
                                        src={market.image}
                                        alt={`${market.city}, ${market.name}`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/10" />

                                      {/* Top Bar Overlay */}
                                      <div className="relative z-10 p-2.5 flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-xs">
                                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                                          <span>{market.code} Metro</span>
                                        </span>
                                        <span className="text-[9.5px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded bg-[#2563EB] text-white font-mono shadow-xs">
                                          {market.highlight}
                                        </span>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* All 50 States Directory */}
                    <div className="pt-3 border-t border-neutral-200/80">
                      <div className="max-h-[220px] overflow-y-auto pr-2 grid grid-cols-4 gap-x-4 gap-y-1 scrollbar-thin">
                        {[statesCol1, statesCol2, statesCol3, statesCol4].map((col, colIdx) => (
                          <div key={colIdx} className="space-y-1">
                            {col.map((item) => (
                              <a
                                key={item.code}
                                href={`#state-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => setOpenMenu(null)}
                                className="group flex items-center gap-2 text-xs py-1 px-1.5 rounded-md hover:bg-black/5 text-neutral-800 transition-colors"
                              >
                                <span className="text-[10px] font-mono font-bold text-neutral-700 group-hover:text-white bg-black/[0.06] group-hover:bg-black px-1.5 py-0.5 rounded transition-colors w-6 text-center">
                                  {item.code}
                                </span>
                                <span className="group-hover:text-black font-semibold text-[12px] truncate">
                                  {item.name}
                                </span>
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Specs Bar */}

                  </div>
                </div>
              )}
            </div>

            {/* ── 5. Resources ─────────────────────────────────────────── */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => toggleDropdown("resources")}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[15px] font-medium transition-colors duration-150 ${scrolled
                  ? openMenu === "resources"
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                  : openMenu === "resources"
                    ? "text-gray-950 bg-black/[0.04]"
                    : "text-gray-700 hover:text-gray-950 hover:bg-black/[0.03]"
                  }`}
              >
                <span className="relative py-0.5">
                  Resources
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${scrolled ? "bg-white" : "bg-[#2563EB]"
                      } rounded-full transition-all duration-200 ease-out origin-left ${openMenu === "resources"
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                  />
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${openMenu === "resources"
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

              {/* Dropdown #5: Resources */}
              {openMenu === "resources" && (
                <div
                  className="absolute top-full -left-20 pt-3 w-[620px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter("resources")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-[#FAF9F5] rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.16)] border border-neutral-300/80 p-5">
                    {/* 2-Column Grid of 4 Resources */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {resourcesFeatured.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-black/5 transition-all duration-150 group cursor-pointer border border-transparent hover:border-black/10"
                        >
                          <div className="w-9 h-9 rounded-xl bg-[#101A2B] text-white border border-[#101A2B]/40 group-hover:border-[#2563EB]/60 group-hover:scale-105 transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                            {item.icon}
                          </div>
                          <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
                            <span className="text-[13.5px] font-bold text-black group-hover:text-black truncate">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-extrabold uppercase tracking-wider bg-black/10 text-black px-1.5 py-0.5 rounded shrink-0">
                              {item.badge}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* Resources Footer Bar */}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Elements (Right Column) */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4 min-w-0">

            {/* Hero-matching CTA via shared Button component */}
            <div className="hidden md:inline-flex">
              <Button
                variant={scrolled ? "sharp-outline" : "sharp-primary"}
                href="#contact"
                className={`transition-all duration-300 ${scrolled
                  ? "!bg-white !text-black !border-white hover:!bg-neutral-200 shadow-md"
                  : ""
                  }`}
              >
                Apply for Partnership
              </Button>
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

        {/* ── Search Popup Bar ────────────────────────────────────────── */}
        {searchOpen && (
          <div
            className={`border-t px-4 py-3 shadow-inner transition-colors duration-300 ${scrolled
              ? "border-white/10 bg-[#121212] text-white backdrop-blur-md"
              : "border-gray-100 bg-gray-50/95 text-gray-900 backdrop-blur-md"
              }`}
          >
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <svg
                className={`w-5 h-5 shrink-0 ${scrolled ? "text-white/50" : "text-gray-400"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads, programs, verticals (e.g. Annuity, Florida, TCPA)..."
                className={`w-full bg-transparent border-none text-sm focus:outline-none focus:ring-0 ${scrolled
                  ? "text-white placeholder-white/40"
                  : "text-gray-900 placeholder-gray-400"
                  }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className={`text-xs font-medium px-2 py-1 rounded transition-colors ${scrolled
                  ? "text-white/70 hover:text-white bg-white/10"
                  : "text-gray-500 hover:text-gray-800 bg-gray-200/60"
                  }`}
              >
                ESC
              </button>
            </div>
          </div>
        )}

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
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleDropdown("mobile-lead-programs")}
                      className={`w-full flex items-center justify-between py-2.5 text-[15px] font-semibold transition-colors ${scrolled ? "text-white" : "text-gray-900"
                        }`}
                    >
                      <span>Lead Programs</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${openMenu === "mobile-lead-programs" ? "rotate-180" : ""
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
                      {openMenu === "mobile-lead-programs" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className={`overflow-hidden pl-2 pb-2 space-y-1.5 text-sm ${scrolled ? "text-neutral-300" : "text-gray-600"}`}
                        >
                          {leadProgramsFeatured.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${scrolled
                                ? "hover:bg-white/10 text-white/90"
                                : "hover:bg-neutral-100 text-neutral-800"
                                }`}
                            >
                              <div className="w-7 h-7 rounded-md bg-[#101A2B] text-white flex items-center justify-center shrink-0">
                                <div className="scale-75 origin-center">{item.icon}</div>
                              </div>
                              <div className="min-w-0 flex-1 flex items-center justify-between gap-1.5">
                                <span className="font-semibold text-xs truncate">{item.title}</span>
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

                  <div>
                    <button
                      type="button"
                      onClick={() => toggleDropdown("mobile-verticals")}
                      className={`w-full flex items-center justify-between py-2.5 text-[15px] font-semibold transition-colors ${scrolled ? "text-white" : "text-gray-900"
                        }`}
                    >
                      <span>All Verticals</span>
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

                  <div>
                    <button
                      type="button"
                      onClick={() => toggleDropdown("mobile-states")}
                      className={`w-full flex items-center justify-between py-2.5 text-[15px] font-semibold transition-colors ${scrolled ? "text-white" : "text-gray-900"
                        }`}
                    >
                      <span>States</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${openMenu === "mobile-states" ? "rotate-180" : ""
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
                      {openMenu === "mobile-states" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden pl-4 pb-2 space-y-2 text-sm"
                        >
                          <p className={`text-xs font-bold uppercase ${scrolled ? "text-neutral-400" : "text-gray-400"}`}>
                            Top Markets
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {topMarkets.map((m) => (
                              <span
                                key={m.name}
                                className={`px-2 py-0.5 rounded text-xs ${scrolled ? "bg-white/10 text-white" : "bg-gray-100 text-gray-700"
                                  }`}
                              >
                                {m.name}
                              </span>
                            ))}
                          </div>
                          <a
                            href="#nationwide-coverage"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-1 font-semibold ${scrolled ? "text-white hover:text-[#2563EB]" : "text-neutral-900"
                              }`}
                          >
                            Coverage in all 50 states + DC &rarr;
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => toggleDropdown("mobile-resources")}
                      className={`w-full flex items-center justify-between py-2.5 text-[15px] font-semibold transition-colors ${scrolled ? "text-white" : "text-gray-900"
                        }`}
                    >
                      <span>Resources</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${openMenu === "mobile-resources" ? "rotate-180" : ""
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
                      {openMenu === "mobile-resources" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className={`overflow-hidden pl-2 pb-2 space-y-1.5 text-sm ${scrolled ? "text-neutral-300" : "text-gray-600"}`}
                        >
                          {resourcesFeatured.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${scrolled
                                ? "hover:bg-white/10 text-white/90"
                                : "hover:bg-neutral-100 text-neutral-800"
                                }`}
                            >
                              <div className="w-7 h-7 rounded-md bg-[#101A2B] text-white border border-[#101A2B]/40 flex items-center justify-center shrink-0">
                                <div className="scale-75 origin-center">{item.icon}</div>
                              </div>
                              <div className="min-w-0 flex-1 flex items-center justify-between gap-1.5">
                                <span className="font-semibold text-xs truncate">{item.title}</span>
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
                </div>

                {/* Mobile Actions */}
                <div className={`pt-3 border-t ${scrolled ? "border-white/10" : "border-gray-100"}`}>
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center py-3.5 px-6 bg-black text-white font-semibold text-sm uppercase tracking-wider rounded-none hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    Apply for Partnership
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
