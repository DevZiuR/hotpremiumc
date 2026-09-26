"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { VisualReveal } from "@/components/VisualReveal";

const industriesData = [
  {
    num: "01",
    tag: "LEGAL",
    title: "Legal",
    verticalCount: "43 verticals",
    subVerticals: [
      "Tax Relief Attorneys",
      "Personal Injury Lawyers",
      "Motor Vehicle Accident Lawyers",
      "+40 more",
    ],
    description:
      "Tax relief attorneys, specialized litigation practices, and high-ticket service operators scaling high-intent claimant volume with audit-ready documentation.",
    image: "/media/industry_legal.jpg",
    href: "#contact",
  },
  {
    num: "02",
    tag: "FINANCIAL SERVICES",
    title: "Financial services",
    verticalCount: "108 verticals",
    subVerticals: [
      "Tax Relief Firms",
      "IRS Debt Resolution Firms",
      "Enrolled Agent Firms",
      "+105 more",
    ],
    description:
      "IRS debt resolution firms, enrolled agent practices, and wealth managers converting financial distress into high-value client relationships with proprietary inbound funnels.",
    image: "/media/industry_finance.jpg",
    href: "#contact",
  },
  {
    num: "03",
    tag: "INSURANCE",
    title: "Insurance",
    verticalCount: "19 verticals",
    subVerticals: [
      "Final Expense Insurance",
      "Medicare Advantage Agencies",
      "Medicare Supplement Firms",
      "+16 more",
    ],
    description:
      "Final expense, Medicare Advantage, and annuity agencies reaching pre-qualified senior buyers before competitors do with zero upfront ad cost.",
    image: "/media/industry_insurance.jpg",
    href: "#contact",
  },
  {
    num: "04",
    tag: "HOME SERVICES",
    title: "Home services",
    verticalCount: "27 verticals",
    subVerticals: [
      "Roofing Replacement",
      "Commercial Roofing",
      "Siding Replacement",
      "+24 more",
    ],
    description:
      "Roofing, siding, windows, and HVAC contractors filling their pipeline with verified homeowners ready to execute high-ticket residential and commercial projects.",
    image: "/media/industry_home.jpg",
    href: "#contact",
  },
  {
    num: "05",
    tag: "MEDICAL & HEALTH",
    title: "Medical & health",
    verticalCount: "24 verticals",
    subVerticals: [
      "Rehab Centers",
      "Addiction Treatment Centers",
      "Inpatient Detox Centers",
      "+21 more",
    ],
    description:
      "Rehab centers, addiction treatment facilities, and inpatient detox programs connecting with patients and families at the exact moment of readiness.",
    image: "/media/industry_medical.jpg",
    href: "#contact",
  },
  {
    num: "06",
    tag: "EMERGING CLAIMS",
    title: "Emerging claims",
    verticalCount: "19 verticals",
    subVerticals: [
      "Roblox Child Abuse Legal Claims",
      "Online Child Exploitation Claims",
      "Data Privacy Violation Claims",
      "+16 more",
    ],
    description:
      "Data privacy violations, online exploitation claims, and emerging multi-district mass tort actions where speed, compliance verification, and timing are critical.",
    image: "/media/industry_claims.jpg",
    href: "#contact",
  },
  {
    num: "07",
    tag: "ENTERPRISE & B2B",
    title: "Enterprise & B2B",
    verticalCount: "26 verticals",
    subVerticals: [
      "Commercial Lending Brokers",
      "SBA Loan Brokers",
      "Merchant Cash Advance Firms",
      "+23 more",
    ],
    description:
      "Commercial lenders, SBA brokers, and merchant cash advance firms targeting verified business owners with urgent capital and expansion needs.",
    image: "/media/industry_enterprise.jpg",
    href: "#contact",
  },
  {
    num: "08",
    tag: "PAY PER CALL",
    title: "Pay per call",
    verticalCount: "34 verticals",
    subVerticals: [
      "Legal Pay Per Call",
      "Personal Injury Pay Per Call",
      "Auto Accident Pay Per Call",
      "+31 more",
    ],
    description:
      "Live inbound call programs and real-time routing infrastructure that connects high-intent inbound callers directly into your sales team in seconds.",
    image: "/media/industry_paypercall.jpg",
    href: "#contact",
  },
];

export function IndustriesWeServe() {
  // No industry expanded by default on initial load (matching reference)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Default photo is /media/industries.png; switches to industry-specific photo when selected
  const activeImage =
    selectedImageIndex !== null
      ? industriesData[selectedImageIndex].image
      : "/media/industries.png";

  const activeTitle =
    selectedImageIndex !== null
      ? industriesData[selectedImageIndex].title
      : "Industries We Serve";

  const handleItemClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setSelectedImageIndex(null);
    } else {
      setActiveIndex(index);
      setSelectedImageIndex(index);
    }
  };

  return (
    <section
      id="verticals"
      className="bg-[#f4f5f7] pt-[90px] pb-[20px] lg:pt-[140px] lg:pb-[0px] border-y border-neutral-300/70 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Eyebrow: 0ms */}
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
              Industries We Serve
            </span>
          </div>
        </Reveal>

        {/* Heading: 90ms SplitHeading line reveal */}
        <SplitHeading
          as="h2"
          delay={90}
          lines={["Built for industries where", "every customer matters."]}
          className="font-serif text-[clamp(38px,5vw,60px)] font-medium text-black tracking-[-0.025em] leading-[1.05] max-w-3xl mb-8 sm:mb-12 md:mb-16"
        />

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-start">
          {/* ── Left Column: Interactive Photo Card with VisualReveal at 270ms ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <VisualReveal delay={270} className="rounded-2xl shadow-md border border-neutral-300/80">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] lg:aspect-square rounded-2xl overflow-hidden bg-[#f4f5f7] group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={activeTitle}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </VisualReveal>
          </div>

          {/* ── Right Column: Interactive Industry List at 270ms ── */}
          <div className="lg:col-span-7">
            <Reveal delay={270}>
              <div className="bg-black rounded-2xl border border-neutral-800 p-1.5 sm:p-3 divide-y divide-neutral-800/80 shadow-xl">
                {industriesData.map((item, index) => {
                  const isSelected = activeIndex === index;

                  return (
                    <div
                      key={item.title}
                      onClick={() => handleItemClick(index)}
                      className={`py-3.5 sm:py-5 cursor-pointer group transition-colors duration-200 select-none px-3 sm:px-5 rounded-xl ${isSelected ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                        }`}
                    >
                      {/* Item Header Row */}
                      <div className="flex items-center justify-between gap-1">
                        <h3
                          className={`text-[30px] leading-[1.1] transition-colors duration-200 font-semibold ${isSelected
                            ? "text-[#3B82F6] font-bold"
                            : "text-neutral-300 font-normal group-hover:text-[#3B82F6]"
                            }`}
                        >
                          {item.title}
                        </h3>

                        {/* Small Indicator Arrow */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-neutral-400 group-hover:text-[#3B82F6] group-hover:translate-x-1 ${isSelected ? "rotate-90 text-[#3B82F6] font-bold" : ""
                            }`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Paragraph & Sub-Verticals Revealed On Click */}
                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 pb-1 pr-1 sm:pr-6 font-sans">
                              {/* Summary description */}
                              <p className="text-[17px] text-neutral-400 leading-[1.6] max-w-[62ch] mb-3">
                                {item.description}
                              </p>

                              {/* Sub-verticals tags */}
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3.5">
                                {item.subVerticals.map((sub, i) => (
                                  <span
                                    key={i}
                                    className={`text-xs px-2.5 py-1 rounded-md transition-colors ${sub.startsWith("+")
                                      ? "bg-neutral-800 text-neutral-400 font-semibold font-mono"
                                      : "bg-neutral-900 text-neutral-200 border border-neutral-800 font-medium"
                                      }`}
                                  >
                                    {sub}
                                  </span>
                                ))}
                              </div>

                              {/* View all link */}
                              <a
                                href={item.href}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black hover:underline transition-colors duration-200"
                              >
                                <span>View all {item.verticalCount}</span>
                                <span>→</span>
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Bottom "See all industries" Pill Button */}
              <div className="mt-8 pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#2563EB] hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm active:scale-95 w-full sm:w-auto text-center justify-center uppercase"
                >
                  <span>See all industries</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Full-Width Bottom Stipple Wave Topography Accent */}
      <div className="w-full overflow-hidden mt-14 sm:mt-20 -mb-1 pointer-events-none select-none">
        <img
          src="/media/stipple-wave.png"
          alt=""
          className="w-full h-auto min-h-[60px] max-h-[160px] object-cover object-bottom opacity-85"
        />
      </div>
    </section>
  );
}
