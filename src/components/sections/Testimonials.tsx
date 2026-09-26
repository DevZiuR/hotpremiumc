"use client";

import React, { useRef, useState, useEffect } from "react";

// TODO: replace with real partner testimonials before launch
// All content, names, platforms, ratings, and avatar graphics in this file are strictly PLACEHOLDERS for development and layout testing.

interface TestimonialCardData {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  avatarUrl: string;
  isFeatured?: boolean;
}

// Placeholder fictional names, generic vertical-specific quotes, and distinct cartoon/notionist avatar styles
const PLACEHOLDER_TESTIMONIALS: TestimonialCardData[] = [
  {
    id: "t1",
    isFeatured: true, // Spans 2 columns on desktop/tablet to break up grid rhythm
    quote:
      "We were spending $40k/month on ads with mediocre results. HPC took over the media spend entirely and our booked calls tripled in 60 days. Best decision we made.",
    author: "Alex Morgan",
    role: "Equity Partner",
    initials: "AM",
    avatarUrl:
      "https://api.dicebear.com/7.x/notionists/svg?seed=Oliver&backgroundColor=b6e3f4",
  },
  {
    id: "t2",
    quote:
      "The no-retainer model was what sold me. They only earn when we earn. Six months in, our pipeline has never been fuller.",
    author: "Jordan Hayes",
    role: "Operations Lead",
    initials: "JH",
    avatarUrl:
      "https://api.dicebear.com/7.x/notionists/svg?seed=Sophia&backgroundColor=ffd5dc",
  },
  {
    id: "t3",
    quote:
      "As a personal injury firm we'd tried every lead vendor. HPC is different — the calls are exclusive, compliant, and pre-qualified.",
    author: "Taylor Reed",
    role: "Managing Partner",
    initials: "TR",
    avatarUrl:
      "https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=d1d4f9",
  },
  {
    id: "t4",
    quote:
      "Our Medicare Advantage agency scaled enrollment significantly in 90 days. The demand is real and my team isn't chasing cold lists.",
    author: "Morgan Blake",
    role: "Agency Director",
    initials: "MB",
    avatarUrl:
      "https://api.dicebear.com/7.x/notionists/svg?seed=Aria&backgroundColor=ffdfbf",
  },
  {
    id: "t5",
    quote:
      "Our roofing company was stuck for two seasons. HPC delivered verified homeowners ready to contract with our estimators.",
    author: "Cameron Vance",
    role: "General Contractor",
    initials: "CV",
    avatarUrl:
      "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=c0aede",
  },
  {
    id: "t6",
    quote:
      "The debt resolution space is compliance-heavy. HPC understood our legal and state-level compliance requirements from day one.",
    author: "Kendall Brooks",
    role: "Practice Lead",
    initials: "KB",
    avatarUrl:
      "https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=ffd5dc",
  },
  {
    id: "t7",
    isFeatured: true, // Spans 2 columns on desktop/tablet to break up grid rhythm
    quote:
      "No upfront retainer, no management fee — they put their own capital behind us. That total alignment changed our growth trajectory completely.",
    author: "Devon Price",
    role: "Founder & CEO",
    initials: "DP",
    avatarUrl:
      "https://api.dicebear.com/7.x/notionists/svg?seed=Dante&backgroundColor=b6e3f4",
  },
  {
    id: "t8",
    quote:
      "Our SBA lending brokerage doubled volume in four months. The verified applicants we receive are prepared and ready to execute.",
    author: "Quinn Parker",
    role: "Principal Broker",
    initials: "QP",
    avatarUrl:
      "https://api.dicebear.com/7.x/notionists/svg?seed=Chloe&backgroundColor=d1d4f9",
  },
];

function StarIcon({ className = "w-[13px] h-[13px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} fill-current`}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function PlatformIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

interface TestimonialCardProps {
  item: TestimonialCardData;
  index: number;
  isInView: boolean;
  isMobileCarousel?: boolean;
  className?: string;
}

function TestimonialCard({
  item,
  index,
  isInView,
  isMobileCarousel = false,
  className = "",
}: TestimonialCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group relative flex flex-col justify-between bg-[#f2f4ec] border border-[#DCE3F1] rounded-[16px] p-5 sm:p-6 select-none shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${!isMobileCarousel
        ? item.isFeatured
          ? "md:col-span-2 lg:col-span-2"
          : "col-span-1"
        : "h-full min-h-[220px]"
        } ${!isMobileCarousel
          ? isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
          : "opacity-100 translate-y-0"
        } ${!isMobileCarousel ? "hover:-translate-y-1" : ""
        } ${className}`}
      style={
        !isMobileCarousel
          ? {
            transitionDuration: "450ms",
            transitionDelay: isInView ? `${index * 50}ms` : "0ms",
            transitionProperty: "opacity, transform, box-shadow",
          }
          : undefined
      }
    >
      {/* Top area: small black/dark gray stars & quote text */}
      <div>
        <div
          className="flex items-center gap-1 mb-3 sm:mb-4 text-[#0F172A]"
          aria-label="5 out of 5 stars"
        >
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-[13px] h-[13px] fill-[#0F172A]" />
          ))}
        </div>

        <p
          className={`font-sans font-normal leading-[1.55] text-[#0F172A] ${!isMobileCarousel && item.isFeatured
            ? "text-[16px] sm:text-[17px]"
            : "text-[15px]"
            }`}
        >
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Bottom area: 40px circular illustrated avatar + name + role */}
      <div className="flex items-center gap-3 pt-5 sm:pt-6 mt-auto">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/80 shadow-sm bg-white flex items-center justify-center">
          {!imgError ? (
            <img
              src={item.avatarUrl}
              alt={`${item.author} avatar`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="font-sans text-xs font-semibold text-[#1E293B]">
              {item.initials}
            </span>
          )}
        </div>
        <div>
          <span className="font-sans text-[14px] font-semibold text-[#0F172A] leading-tight block">
            {item.author}
          </span>
          {item.role && (
            <span className="font-sans text-[12px] text-[#64748B] font-normal leading-tight block mt-0.5">
              {item.role}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const ROW_1_TESTIMONIALS = PLACEHOLDER_TESTIMONIALS.slice(0, 4);
const ROW_2_TESTIMONIALS = PLACEHOLDER_TESTIMONIALS.slice(4, 8);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPausedRow1, setIsPausedRow1] = useState(false);
  const [isPausedRow2, setIsPausedRow2] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const row1TouchHandlers = {
    onTouchStart: () => setIsPausedRow1(true),
    onTouchEnd: () => setIsPausedRow1(false),
    onTouchCancel: () => setIsPausedRow1(false),
    onPointerDown: () => setIsPausedRow1(true),
    onPointerUp: () => setIsPausedRow1(false),
    onPointerCancel: () => setIsPausedRow1(false),
    onPointerLeave: () => setIsPausedRow1(false),
  };

  const row2TouchHandlers = {
    onTouchStart: () => setIsPausedRow2(true),
    onTouchEnd: () => setIsPausedRow2(false),
    onTouchCancel: () => setIsPausedRow2(false),
    onPointerDown: () => setIsPausedRow2(true),
    onPointerUp: () => setIsPausedRow2(false),
    onPointerCancel: () => setIsPausedRow2(false),
    onPointerLeave: () => setIsPausedRow2(false),
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-black text-white py-[80px] lg:py-[140px] overflow-hidden"
    >
      {/* Header Container */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-10 sm:mb-14 text-center relative z-10">
        <div
          className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {/* Two badge pills restored above the heading (generic/placeholder labeled) */}




          {/* Heading */}
          <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-normal text-white tracking-[-0.025em] leading-[1.08] text-center mx-auto max-w-4xl">
            They took the deal. Here&apos;s what happened.
          </h2>
        </div>
      </div>

      {/*
        Desktop / Tablet Grid (768px and above):
        Completely unchanged layout with 5 columns edge-to-edge
      */}
      <div className="hidden md:block w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {PLACEHOLDER_TESTIMONIALS.map((item, idx) => (
            <TestimonialCard
              key={item.id}
              item={item}
              index={idx}
              isInView={isVisible}
            />
          ))}
        </div>
      </div>

      {/*
        Mobile View (below 768px):
        2-Row Infinite Auto-Scrolling Carousel with opposite directions.
        Row 1: Right-to-Left
        Row 2: Left-to-Right
        Continuous autoplay with touch/hold to pause, resuming on release.
        Touch-pan-y allows normal vertical page scroll.
      */}
      <div className="block md:hidden relative z-10">
        {/* Normal Motion: Continuous CSS Keyframe Marquees */}
        <div
          className={`space-y-3 ${prefersReducedMotion ? "hidden" : "block motion-reduce:hidden"
            }`}
        >
          {/* Row 1: Right-to-Left */}
          <div
            className="w-full overflow-hidden"
            style={{ touchAction: "pan-y" }}
            {...row1TouchHandlers}
          >
            <div
              className={`flex items-stretch testimonials-track-left ${isPausedRow1 ? "testimonials-track-paused" : ""
                }`}
              style={{
                width: "max-content",
                willChange: "transform",
                animationPlayState: isPausedRow1 ? "paused" : "running",
              }}
            >
              {/* Group A (Original set) */}
              <div className="flex items-stretch gap-3 shrink-0 pr-3">
                {ROW_1_TESTIMONIALS.map((item, idx) => (
                  <div
                    key={`r1-a-${item.id}`}
                    className="shrink-0 flex flex-col"
                    style={{
                      width: "calc((100vw - 12px) / 1.15)",
                      touchAction: "pan-y",
                    }}
                  >
                    <TestimonialCard
                      item={item}
                      index={idx}
                      isInView={isVisible}
                      isMobileCarousel
                    />
                  </div>
                ))}
              </div>

              {/* Group B (Duplicate set for seamless infinite loop) */}
              <div
                className="flex items-stretch gap-3 shrink-0 pr-3"
                aria-hidden="true"
              >
                {ROW_1_TESTIMONIALS.map((item, idx) => (
                  <div
                    key={`r1-b-${item.id}`}
                    className="shrink-0 flex flex-col"
                    style={{
                      width: "calc((100vw - 12px) / 1.15)",
                      touchAction: "pan-y",
                    }}
                    tabIndex={-1}
                  >
                    <TestimonialCard
                      item={item}
                      index={idx}
                      isInView={isVisible}
                      isMobileCarousel
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Left-to-Right */}
          <div
            className="w-full overflow-hidden"
            style={{ touchAction: "pan-y" }}
            {...row2TouchHandlers}
          >
            <div
              className={`flex items-stretch testimonials-track-right ${isPausedRow2 ? "testimonials-track-paused" : ""
                }`}
              style={{
                width: "max-content",
                willChange: "transform",
                animationPlayState: isPausedRow2 ? "paused" : "running",
                animationDelay: "-10s",
              }}
            >
              {/* Group A (Original set) */}
              <div className="flex items-stretch gap-3 shrink-0 pr-3">
                {ROW_2_TESTIMONIALS.map((item, idx) => (
                  <div
                    key={`r2-a-${item.id}`}
                    className="shrink-0 flex flex-col"
                    style={{
                      width: "calc((100vw - 12px) / 1.15)",
                      touchAction: "pan-y",
                    }}
                  >
                    <TestimonialCard
                      item={item}
                      index={idx}
                      isInView={isVisible}
                      isMobileCarousel
                    />
                  </div>
                ))}
              </div>

              {/* Group B (Duplicate set for seamless infinite loop) */}
              <div
                className="flex items-stretch gap-3 shrink-0 pr-3"
                aria-hidden="true"
              >
                {ROW_2_TESTIMONIALS.map((item, idx) => (
                  <div
                    key={`r2-b-${item.id}`}
                    className="shrink-0 flex flex-col"
                    style={{
                      width: "calc((100vw - 12px) / 1.15)",
                      touchAction: "pan-y",
                    }}
                    tabIndex={-1}
                  >
                    <TestimonialCard
                      item={item}
                      index={idx}
                      isInView={isVisible}
                      isMobileCarousel
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fallback for prefers-reduced-motion: normal swipeable horizontal scroll snap carousel */}
        <div
          className={`space-y-3 ${prefersReducedMotion ? "block" : "hidden motion-reduce:block"
            }`}
        >
          {/* Reduced Motion Row 1 */}
          <div
            className="w-full overflow-x-auto snap-x snap-mandatory testimonials-scrollbar-none flex gap-3 px-4 py-1"
            style={{
              touchAction: "pan-x pan-y",
              WebkitOverflowScrolling: "touch",
            }}
            aria-label="Testimonials row 1"
          >
            {ROW_1_TESTIMONIALS.map((item, idx) => (
              <div
                key={`reduced-r1-${item.id}`}
                className="shrink-0 snap-start snap-always flex flex-col"
                style={{ width: "calc((100vw - 12px) / 1.15)" }}
              >
                <TestimonialCard
                  item={item}
                  index={idx}
                  isInView={isVisible}
                  isMobileCarousel
                />
              </div>
            ))}
          </div>

          {/* Reduced Motion Row 2 */}
          <div
            className="w-full overflow-x-auto snap-x snap-mandatory testimonials-scrollbar-none flex gap-3 px-4 py-1"
            style={{
              touchAction: "pan-x pan-y",
              WebkitOverflowScrolling: "touch",
            }}
            aria-label="Testimonials row 2"
          >
            {ROW_2_TESTIMONIALS.map((item, idx) => (
              <div
                key={`reduced-r2-${item.id}`}
                className="shrink-0 snap-start snap-always flex flex-col"
                style={{ width: "calc((100vw - 12px) / 1.15)" }}
              >
                <TestimonialCard
                  item={item}
                  index={idx}
                  isInView={isVisible}
                  isMobileCarousel
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
