import React from "react";
import { Reveal } from "@/components/Reveal";

const complianceItems = [
  {
    number: "01",
    title: "TCPA Compliant",
    description:
      "All leads acquired with proper prior express written consent. Full audit trail maintained with timestamped records, compliance verification, and verifiable records across all consumer channels.",
    icon: "/media/tda-icon.png",
    linkText: "Explore TCPA Protocols",
    tag: "Audit Verified",
    accentType: "radar",
  },
  {
    number: "02",
    title: "Consent Documentation",
    description:
      "Consent forms, timestamps, and IP addresses available for every lead upon request. Complete audit-ready documentation maintained to satisfy regulatory requirements and institutional compliance teams.",
    icon: "/media/constent-icon.png",
    linkText: "Explore Documentation",
    tag: "Timestamped",
    accentType: "document",
  },
  {
    number: "03",
    title: "Data Security",
    description:
      "Enterprise-grade infrastructure. Sensitive consumer data encrypted at rest and in transit with rigorous access controls, zero data reselling, and SOC-standard operational protocols.",
    icon: "/media/data-icon.png",
    linkText: "Explore Data Security",
    tag: "AES-256 Encrypted",
    accentType: "security",
  },
  {
    number: "04",
    title: "Regulatory Transparency",
    description:
      "Clear source disclosure. Compliant acquisition practices built specifically for heavily regulated financial, insurance, and legal markets — transparent funnels with zero deceptive practices.",
    icon: "/media/regulatory-icon.png",
    linkText: "Explore Regulatory Standards",
    tag: "Full Disclosure",
    accentType: "regulatory",
  },
];

export function ComplianceStandards() {
  return (
    <section id="compliance" className="bg-black text-white py-16 sm:py-24 md:py-36 lg:py-48 border-b border-neutral-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* ── Left Column: Header & Overview ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              {/* Eyebrow with Brand Square */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <span className="block flex-shrink-0" style={{ width: 10, height: 10, background: "#F5A623" }} aria-hidden="true" />
                <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-400">
                  Operational Standards
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-white tracking-tight leading-[1.14] mb-4 sm:mb-6">
                Compliance &amp; Data Standards
              </h2>

              {/* Subtitle / Overview */}
              <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                In high-ticket industries, compliance is non-negotiable. Our lead
                acquisition meets the highest regulatory standards across every
                touchpoint.
              </p>
            </Reveal>
          </div>

          {/* ── Right Column: Cards (Wider Column Gap + Box 2 & 4 Pushed Right) ── */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-8 lg:gap-y-9 gap-x-6 sm:gap-x-10 lg:gap-x-14 xl:gap-x-16">
              {complianceItems.map((item, index) => {
                const isRightColumn = index % 2 === 1;
                return (
                  <Reveal
                    key={item.title}
                    delay={index * 90}
                    className={`h-full ${isRightColumn ? "lg:translate-x-6 xl:translate-x-8" : ""}`}
                  >
                  <div
                    className="group rounded-[22px] bg-[#f2f4ec] border border-black/[0.04] hover:border-[#F5A623]/30 p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 cursor-pointer h-full"
                  >
                    <div>
                      {/* Numbered Title at Top */}
                      <h3 className="font-sans text-[19px] sm:text-[21px] font-semibold text-[#12151b] tracking-tight mb-4 flex items-baseline">
                        <span className="font-normal text-neutral-400 mr-2 transition-colors duration-200 group-hover:text-[#F5A623]">
                          {item.number}
                        </span>
                        <span>{item.title}</span>
                      </h3>

                      {/* Middle Visual Illustration Stage */}
                      <div className="w-full h-[150px] sm:h-[160px] rounded-xl bg-white/70 border border-black/[0.04] group-hover:border-[#F5A623]/25 relative overflow-hidden flex items-center justify-center mb-5 group-hover:bg-white/95 transition-colors duration-200">
                        {/* Style definitions for glowing pulse and rotating orbital animation */}
                        <style>{`
                          @keyframes compliance-orbit-pulse {
                            0%, 100% {
                              opacity: 0.35;
                              filter: drop-shadow(0 0 3px rgba(37, 99, 235, 0.4));
                            }
                            50% {
                              opacity: 0.9;
                              filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.8)) drop-shadow(0 0 14px rgba(96, 165, 250, 0.5));
                            }
                          }
                          @keyframes compliance-orbit-spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                          }
                          .animate-compliance-pulse {
                            animation: compliance-orbit-pulse 3.5s ease-in-out infinite;
                          }
                          .animate-compliance-spin {
                            animation: compliance-orbit-spin 30s linear infinite;
                          }
                        `}</style>

                        {/* Subtle background technical grid */}
                        <svg
                          aria-hidden
                          className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                          viewBox="0 0 200 120"
                          preserveAspectRatio="none"
                        >
                          <line x1="20" y1="60" x2="180" y2="60" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="2 2" />
                          <line x1="100" y1="10" x2="100" y2="110" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="2 2" />
                        </svg>

                        {/* Soft subtle radial ambient glow - shifts to brass on hover */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-200"
                          style={{
                            background:
                              "radial-gradient(circle at 50% 50%, rgba(245, 166, 35, 0.18), transparent 70%)",
                          }}
                        />

                        {/* Foreground Icon & Framed Badge */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="relative w-14 h-14 flex items-center justify-center p-1.5">
                            {/* Glowing Animated Dashed Circular Rings & Rotating Glowing Dot around Icon */}
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 112 112"
                              className="absolute -inset-7 w-28 h-28 pointer-events-none overflow-visible"
                              fill="none"
                            >
                              <defs>
                                <filter id={`comp-glow-${index}`} x="-40%" y="-40%" width="180%" height="180%">
                                  <feGaussianBlur stdDeviation="2" result="blur" />
                                  <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                  </feMerge>
                                </filter>
                              </defs>

                              {/* Inner subtle reference circle */}
                              <circle
                                cx="56"
                                cy="56"
                                r="35"
                                stroke="#050811"
                                strokeWidth="0.75"
                                strokeDasharray="3 4"
                                strokeOpacity="0.25"
                              />

                              {/* Glowing Accent Underlay Pulse Ring */}
                              <circle
                                cx="56"
                                cy="56"
                                r="44"
                                stroke="#2563EB"
                                strokeWidth="1.75"
                                strokeDasharray="6 10"
                                className="animate-compliance-pulse"
                                style={{ animationDelay: `${index * -0.875}s` }}
                              />

                              {/* Dark High-Contrast Main Dashed Ring */}
                              <circle
                                cx="56"
                                cy="56"
                                r="44"
                                stroke="#050811"
                                strokeWidth="1.25"
                                strokeDasharray="3 4"
                                strokeOpacity="0.60"
                              />

                              {/* Slowly Rotating Orbital Chevrons & Glowing Beacons */}
                              <g
                                className="animate-compliance-spin"
                                style={{
                                  transformOrigin: "56px 56px",
                                  animationDuration: `${26 + index * 4}s`,
                                  animationDelay: `${index * -6.5}s`,
                                }}
                              >
                                {/* Orbital chevrons */}
                                <g stroke="#000000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.75">
                                  <path d="M-3 -2.5 L0 0 L-3 2.5" transform="translate(94.1, 78) rotate(120)" />
                                  <path d="M-3 -2.5 L0 0 L-3 2.5" transform="translate(17.9, 34) rotate(300)" />
                                </g>

                                {/* Primary glowing orbital satellite beacon */}
                                <circle cx="94.1" cy="78" r="3" fill="#2563EB" filter={`url(#comp-glow-${index})`} />

                                {/* Secondary glowing satellite beacon */}
                                <circle cx="17.9" cy="34" r="2.2" fill="#60A5FA" filter={`url(#comp-glow-${index})`} />
                              </g>
                            </svg>

                            <img
                              src={item.icon}
                              alt={item.title}
                              className="w-full h-full object-contain filter drop-shadow-sm"
                            />
                          </div>

                          {/* Technical status pill */}
                          <span className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-black/[0.06] group-hover:border-[#F5A623]/30 text-[10.5px] font-mono font-medium text-neutral-600 shadow-xs transition-colors duration-200">
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: "#F5A623" }} aria-hidden="true" />
                            {item.tag}
                          </span>
                        </div>
                      </div>

                      {/* Description Paragraph */}
                      <p className="font-sans text-[13px] sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal mb-6">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action Link with Arrow */}
                    <div className="pt-3 border-t border-black/[0.05]">
                      <span className="font-sans text-[13px] sm:text-[13.5px] font-medium text-[#12151b] group-hover:text-[#F5A623] transition-colors duration-200 flex items-center gap-1.5">
                        <span>{item.linkText}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
