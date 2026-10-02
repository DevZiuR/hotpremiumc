"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitHeading } from "@/components/SplitHeading";
import { Reveal } from "@/components/Reveal";

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

  useEffect(() => {
    const handleSelectIndustry = (event: Event) => {
      const customEvent = event as CustomEvent<{ index: number }>;
      const targetIndex = customEvent.detail?.index;
      if (typeof targetIndex === "number" && industriesData[targetIndex]) {
        setActiveIndex(targetIndex);
        setSelectedImageIndex(targetIndex);
        const section = document.getElementById("verticals");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("select-industry", handleSelectIndustry);
    return () => window.removeEventListener("select-industry", handleSelectIndustry);
  }, []);

  return (
    <section
      id="verticals"
      className="bg-black pt-[96px] pb-[96px] lg:pt-[96px] lg:pb-[120px] border-y border-white/10 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Eyebrow: 0ms */}
        {/*
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
              Industries We Serve
            </span>
          </div>
        </Reveal>
        */}

        {/* Heading: 90ms SplitHeading line reveal */}
        <SplitHeading
          as="h2"
          delay={90}
          lines={["Built for industries where", "every customer matters."]}
          className="font-serif section-h2 font-medium text-white tracking-[-0.025em] max-w-3xl mb-14 sm:mb-16 md:mb-20"
        />

        {/* ── Two-Column Layout (reference structure: flush visual panel + plain list) ── */}
        <div className="mx-auto w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5 lg:gap-0 items-stretch lg:overflow-hidden lg:rounded-2xl lg:border lg:border-[rgba(255,255,255,0.08)]">
          <div className="relative overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.08)] lg:overflow-visible lg:rounded-none lg:border-0">
            <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] lg:aspect-auto lg:h-full lg:min-h-[300px] overflow-hidden bg-[#f4f5f7]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={activeTitle}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Blend transition into the dark list */}
              <div aria-hidden="true" className="absolute inset-y-0 right-0 w-20 sm:w-28 lg:w-32 bg-gradient-to-l from-[#000000] via-[#000000]/55 to-transparent pointer-events-none" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 lg:hidden bg-gradient-to-t from-[#000000]/70 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* ── Right Column: Interactive Industry List ── */}
          <div className="bg-[#000000] border border-[rgba(255,255,255,0.08)] rounded-[20px] lg:rounded-none lg:border-y-0 lg:border-r-0 overflow-hidden flex flex-col">
            <div className="divide-y divide-[rgba(255,255,255,0.08)] flex flex-1 flex-col">
              {industriesData.map((item, index) => {
                const isSelected = activeIndex === index;

                return (
                  <div
                    key={item.title}
                    onClick={() => handleItemClick(index)}
                    className={`group flex-1 flex flex-col justify-center py-[18px] lg:py-3.5 cursor-pointer transition-colors duration-200 select-none px-6 sm:px-10 ${isSelected ? "bg-white/[0.07]" : "bg-transparent hover:bg-white/[0.04]"
                      }`}
                  >
                    {/* Item Header Row */}
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className="text-[24px] sm:text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.01em] text-white font-normal transition-all duration-200 group-hover:italic"
                      >
                        {item.title}
                      </h3>

                      {/* Active-row meta link (matches “View service” in reference) */}
                      {isSelected ? (
                        <span className="hidden sm:inline-flex items-center gap-2 shrink-0 text-[13px] font-medium text-[#a99bff]">
                          <span aria-hidden="true" className="text-white">↳</span>
                          <span>View service</span>
                        </span>
                      ) : null}
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
                          <div className="pt-4 pb-1 pr-1 sm:pr-6 font-sans">
                            {/* Summary description */}
                            <p className="text-[16px] sm:text-[17px] text-neutral-400 leading-[1.6] max-w-[62ch] mb-4">
                              {item.description}
                            </p>

                            {/* Sub-verticals tags */}
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
                              {item.subVerticals.map((sub, i) => (
                                <span
                                  key={i}
                                  className={`text-xs px-2.5 py-1 rounded-md transition-colors ${sub.startsWith("+")
                                    ? "bg-white/10 text-neutral-400 font-semibold font-mono"
                                    : "bg-white/[0.06] text-neutral-200 border border-white/10 font-medium"
                                    }`}
                                >
                                  {sub}
                                </span>
                              ))}
                            </div>

                            {/* View all link */}
                            <a
                              href={item.href}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white hover:underline transition-colors duration-200"
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
          </div>
        </div>

        {/* Transparent text-link CTA below the grid */}
        <div className="mx-auto w-full max-w-[1000px]">
          <Reveal delay={200} className="flex justify-end">
            <a
              href="#contact"
              className="group mt-7 sm:mt-9 inline-flex items-center gap-2 font-sans text-[14px] sm:text-[15px] font-semibold text-white underline decoration-white/30 underline-offset-[6px] hover:decoration-white/70 transition-colors duration-200 cursor-pointer"
            >
              <span>More industries</span>
              <svg
                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
