"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CropMarkFrame } from "@/components/ui/CropMarkFrame";

const features = [
  { title: "Licensed-Region Targeting", description: "Only deliver leads where you're licensed or able to serve." },
  { title: "High-Density Markets", description: "Concentrate on metros with the highest concentration of qualified buyers." },
  { title: "Postal-Code Precision", description: "Define your exact territory down to the zip or postal code level." },
];

export function GlobalCoverage() {
  return (
    <section id="global-coverage" className="relative bg-white py-16 sm:py-24 md:py-28 border-b border-gray-200/80 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Crop-mark corner registration brackets */}
        <div className="absolute -inset-y-5 sm:-inset-y-8 inset-x-0 sm:inset-x-2 md:inset-x-6 pointer-events-none">
          <CropMarkFrame />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-16 items-center">

          {/* ── Left Column: Text + Features ── */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <Reveal>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <span className="flex items-center">
                  <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2563eb" }} aria-hidden="true" />
                </span>
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-black">
                  GLOBAL COVERAGE
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[65px] font-normal text-black tracking-tight sm:tracking-normal leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-5">
                The regions we're scaling with licensed, high-ticket demand
              </h2>

              {/* Description */}
              <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed max-w-md font-normal">
                North America, the UK, Western Europe, Australia and New Zealand. We build every campaign around the markets you're actually licensed to serve, down to the region.
              </p>
            </Reveal>
          </div>

          {/* ── Right Column: Coverage image (Full Size with #f4f5f7 bg) ── */}
          <div className="relative w-full lg:col-span-7 flex items-center justify-center lg:justify-end">
            <Reveal delay={150} className="w-full">
              <div className="relative w-full max-w-3xl lg:max-w-none rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden bg-[#f4f5f7] border border-neutral-200/70 py-8 sm:py-10 lg:py-12 px-0 sm:px-4 flex items-center justify-center">
                <div className="relative w-full flex items-center justify-center scale-[1.28] sm:scale-105 lg:scale-115 origin-center transition-transform duration-500">
                  <Image
                    src="/media/global-coverage-v3.png"
                    alt="Global coverage map"
                    width={1536}
                    height={1024}
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="w-full h-auto object-contain block"
                  />

                  {/* Glowing Animated Dashed Circular Rings around the globe */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 1536 1024"
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
                    fill="none"
                  >
                    <defs>
                      <filter id="orbit-glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <style>{`
                      @keyframes orbit-pulse-glow {
                        0%, 100% {
                          opacity: 0.3;
                          filter: drop-shadow(0 0 4px rgba(37, 99, 235, 0.4));
                        }
                        50% {
                          opacity: 0.85;
                          filter: drop-shadow(0 0 10px rgba(37, 99, 235, 0.8)) drop-shadow(0 0 18px rgba(96, 165, 250, 0.5));
                        }
                      }
                      @keyframes orbit-spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                      }
                      .animate-orbit-pulse {
                        animation: orbit-pulse-glow 3.5s ease-in-out infinite;
                      }
                      .animate-orbit-spin {
                        transform-origin: 762px 537px;
                        animation: orbit-spin 45s linear infinite;
                      }
                    `}</style>

                    {/* ── Glowing Accent Underlay Rings ── */}
                    <circle
                      cx="762"
                      cy="537"
                      r="496"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeDasharray="8 16"
                      className="animate-orbit-pulse"
                      style={{ animationDelay: "-1.75s" }}
                    />
                    <circle
                      cx="762"
                      cy="537"
                      r="524"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeDasharray="12 20"
                      className="animate-orbit-pulse"
                    />

                    {/* ── Dark High-Contrast Main Rings (Crisp & Darker) ── */}
                    {/* Inner dark dashed ring */}
                    <circle
                      cx="762"
                      cy="537"
                      r="496"
                      stroke="#050811"
                      strokeWidth="1.75"
                      strokeDasharray="4 6"
                      strokeOpacity="0.70"
                    />

                    {/* Outer dark dashed circular ring */}
                    <circle
                      cx="762"
                      cy="537"
                      r="524"
                      stroke="#050811"
                      strokeWidth="2"
                      strokeDasharray="6 7"
                      strokeOpacity="0.85"
                    />

                    {/* ── Slowly Rotating Orbital Chevrons & Glowing Beacons ── */}
                    <g className="animate-orbit-spin">
                      {/* 4 dark chevrons */}
                      <g stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.90">
                        <path d="M-5 -4.5 L0 0 L-5 4.5" transform="translate(1024, 83) rotate(30)" />
                        <path d="M-5 -4.5 L0 0 L-5 4.5" transform="translate(1216, 799) rotate(120)" />
                        <path d="M-5 -4.5 L0 0 L-5 4.5" transform="translate(500, 991) rotate(210)" />
                        <path d="M-5 -4.5 L0 0 L-5 4.5" transform="translate(308, 275) rotate(300)" />
                      </g>

                      {/* Glowing orbital satellite beacons */}
                      <circle cx="1024" cy="83" r="3.5" fill="#2563EB" filter="url(#orbit-glow-blue)" />
                      <circle cx="500" cy="991" r="3.5" fill="#2563EB" filter="url(#orbit-glow-blue)" />
                      <circle cx="1216" cy="799" r="2.5" fill="#60A5FA" filter="url(#orbit-glow-blue)" />
                      <circle cx="308" cy="275" r="2.5" fill="#60A5FA" filter="url(#orbit-glow-blue)" />
                    </g>
                  </svg>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
