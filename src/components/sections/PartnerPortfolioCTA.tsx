"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";

export function PartnerPortfolioCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    looking_for: "",
    luxury_answer: "",
    offer: "",
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [showSmsError, setShowSmsError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsConsent) {
      setShowSmsError(true);
      return;
    }
    setShowSmsError(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#020509] text-white"
    >
      {/* ── 1. Prefooter background image with requested hue-rotate & saturate filter (darkened) ── */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-bottom opacity-5 z-0"
        style={{
          backgroundImage: "url('/media/prefooter-cta.png')",
          filter: "hue-rotate(-15deg) saturate(1.1)",
        }}
      />

      {/* ── 2. Layered ultra-deep navy gradient overlay for maximum contrast ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2, 5, 9, 0.97) 0%, rgba(2, 4, 8, 0.99) 50%, rgba(1, 3, 6, 1) 100%)",
        }}
      />

      {/* Background diagonal line accents matching hero figure design */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10 z-[2]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 0 L540 560" stroke="#2563EB" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M1440 0 L900 560" stroke="#2563EB" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-16 sm:pt-16 md:pt-20 pb-16 sm:pb-16">
        {/* Faster entrance transition (350ms) */}
        <Reveal duration={350}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-start">
            {/* ── Left Column: Eyebrow & Headline ── */}
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 mb-3.5 sm:mb-5">
                <span className="block flex-shrink-0" style={{ width: 10, height: 10, background: "#2563EB" }} aria-hidden="true" />
                <span className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-neutral-300">
                  Partnership Application
                </span>
              </div>
              <h2 className="font-serif text-[26px] sm:text-[38px] md:text-[50px] lg:text-[60px] font-normal text-white tracking-tight leading-[1.12]">
                Ready to take your business to the next level?
              </h2>
            </div>

            {/* ── Right Column: Clean Underline Form (Tightened Compact Spacing) ── */}
            <div className="lg:col-span-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* 1. Full name */}
                <div>
                  <label htmlFor="name" className="block text-[13.5px] sm:text-[14.5px] font-normal text-white/90 mb-1 tracking-normal">
                    Full name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    maxLength={120}
                    required
                    className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white py-1.5 sm:py-2 text-white placeholder:text-neutral-400/60 focus:outline-none focus:ring-0 transition-colors text-base font-sans rounded-none"
                  />
                </div>

                {/* 2. Work email */}
                <div>
                  <label htmlFor="email" className="block text-[13.5px] sm:text-[14.5px] font-normal text-white/90 mb-1 tracking-normal">
                    Work email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    maxLength={255}
                    required
                    className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white py-1.5 sm:py-2 text-white placeholder:text-neutral-400/60 focus:outline-none focus:ring-0 transition-colors text-base font-sans rounded-none"
                  />
                </div>

                {/* 3. Company name */}
                <div>
                  <label htmlFor="company" className="block text-[13.5px] sm:text-[14.5px] font-normal text-white/90 mb-1 tracking-normal">
                    Company name*
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company, LLC"
                    maxLength={150}
                    required
                    className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white py-1.5 sm:py-2 text-white placeholder:text-neutral-400/60 focus:outline-none focus:ring-0 transition-colors text-base font-sans rounded-none"
                  />
                </div>

                {/* 4. Phone number */}
                <div>
                  <label htmlFor="phone" className="block text-[13.5px] sm:text-[14.5px] font-normal text-white/90 mb-1 tracking-normal">
                    Phone number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    maxLength={30}
                    required
                    className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white py-1.5 sm:py-2 text-white placeholder:text-neutral-400/60 focus:outline-none focus:ring-0 transition-colors text-base font-sans rounded-none"
                  />
                </div>

                {/* 5. What are you looking for? */}
                <div>
                  <label htmlFor="looking_for" className="block text-[13.5px] sm:text-[14.5px] font-normal text-white/90 mb-1 tracking-normal">
                    What are you looking for?*
                  </label>
                  <textarea
                    id="looking_for"
                    name="looking_for"
                    rows={2}
                    value={formData.looking_for}
                    onChange={handleChange}
                    placeholder="e.g. Exclusive MVA leads in Texas, ~50/month"
                    maxLength={1000}
                    required
                    className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white py-1.5 sm:py-2 text-white placeholder:text-neutral-400/60 focus:outline-none focus:ring-0 transition-colors text-base font-sans rounded-none resize-none"
                  />
                </div>

                {/* 6. Respectfully, do you understand that it is a luxury and a privilege to work with us? */}
                <div>
                  <label htmlFor="luxury_answer" className="block text-[13.5px] sm:text-[14.5px] font-normal text-white/90 mb-1 tracking-normal">
                    Respectfully, do you understand that it is a luxury and a privilege to work with us?*
                  </label>
                  <textarea
                    id="luxury_answer"
                    name="luxury_answer"
                    rows={2}
                    value={formData.luxury_answer}
                    onChange={handleChange}
                    placeholder="Your answer"
                    maxLength={1000}
                    required
                    className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white py-1.5 sm:py-2 text-white placeholder:text-neutral-400/60 focus:outline-none focus:ring-0 transition-colors text-base font-sans rounded-none resize-none"
                  />
                </div>

                {/* 7. What is the offer that you have for us? */}
                <div>
                  <label htmlFor="offer" className="block text-[13.5px] sm:text-[14.5px] font-medium text-white mb-0.5 tracking-normal">
                    What is the offer that you have for us?*
                  </label>
                  <p className="text-xs text-neutral-300 mb-1 leading-relaxed font-normal">
                    Please understand it is very competitive, and we only pay attention to extremely generous offers.
                  </p>
                  <textarea
                    id="offer"
                    name="offer"
                    rows={2}
                    value={formData.offer}
                    onChange={handleChange}
                    placeholder="Your offer"
                    maxLength={1000}
                    required
                    className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white py-1.5 sm:py-2 text-white placeholder:text-neutral-400/60 focus:outline-none focus:ring-0 transition-colors text-base font-sans rounded-none resize-none"
                  />
                </div>

                {/* 8. SMS Consent Checkbox (Matching original copy exactly) */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="sms-consent"
                      checked={smsConsent}
                      onChange={(e) => {
                        setSmsConsent(e.target.checked);
                        if (e.target.checked) setShowSmsError(false);
                      }}
                      className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-[#2563EB] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#2563EB] shrink-0"
                    />
                    <label
                      htmlFor="sms-consent"
                      className="text-[12px] sm:text-[13px] leading-snug text-neutral-300 text-left cursor-pointer select-none"
                    >
                      By checking this box, I agree to receive SMS messages from Hot Premium Customers. Message &amp; data rates may apply. Reply STOP to opt out at any time. View our{" "}
                      <a
                        href="#privacy"
                        className="text-[#60A5FA] underline hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                  {showSmsError && (
                    <p className="text-[12px] sm:text-[13px] text-red-400 font-medium pl-7">
                      Please agree to receive SMS messages to continue.
                    </p>
                  )}
                </div>

                {/* Submit Pill Button & Disclaimer */}
                <div className="pt-2 sm:pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-8 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:bg-neutral-200 transition-all duration-200 active:scale-[0.99] shadow-xl cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span>{submitted ? "Message Sent!" : "Get My Leads"}</span>
                    {!submitted && (
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    )}
                  </button>

                  <p className="text-xs text-neutral-400 text-center mt-2.5">
                    By submitting, you agree to be contacted about lead supply options. We never share your information.
                  </p>

                  {submitted && (
                    <p className="text-center text-sm text-[#2DD4BF] mt-2.5 font-medium">
                      Thank you! We have received your application and our team will be in touch shortly.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Full-Width Bottom Stipple Wave Topography Accent (matching IndustriesWeServe) */}
      <div className="relative z-10 w-full overflow-hidden mt-4 sm:mt-6 -mb-1 pointer-events-none select-none">
        <img
          src="/media/stipple-wave.png"
          alt=""
          className="w-full h-auto min-h-[60px] max-h-[160px] object-cover object-bottom opacity-50 invert"
        />
      </div>
    </section>
  );
}
