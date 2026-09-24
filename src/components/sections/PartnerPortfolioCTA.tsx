"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { CropMarkFrame } from "@/components/ui/CropMarkFrame";

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
      className="relative bg-[#020509] text-white py-[80px] lg:py-[140px]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 relative">
        {/* Crop-mark corner registration brackets */}
        <div className="absolute -inset-y-5 sm:-inset-y-8 inset-x-0 sm:inset-x-2 md:inset-x-6 pointer-events-none">
          <CropMarkFrame variant="dark" />
        </div>
        <Reveal duration={350}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Headline & Copy */}
            <div className="lg:col-span-5 lg:sticky lg:top-[120px] lg:self-start">
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="block flex-shrink-0" style={{ width: 12, height: 12, background: "#2457D6" }} aria-hidden="true" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  Let's Build What's Next
                </span>
              </div>

              <h2 className="font-serif text-[clamp(38px,5vw,68px)] font-normal leading-[1.05] tracking-[-0.025em] mb-4 text-white">
               Bring the offer. We fund the scale.
              </h2>
              <p className="text-[20px] text-neutral-400 leading-[1.6] max-w-[62ch]">
                Tell us about your business and growth goals. Our team will
                review your application and get back to you within 24 hours.
              </p>
            </div>

            {/* Right Column: Form Card */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-7 sm:space-y-9 bg-white/[0.03] rounded-2xl p-6 sm:p-8 md:p-10">
              {/* 1. Full name */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-400 mb-3"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  maxLength={120}
                  required
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-white/60 rounded-sm py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-0 transition-colors text-base font-sans"
                />
              </div>

              {/* 2. Work email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-400 mb-3"
                >
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  maxLength={255}
                  required
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-white/60 rounded-sm py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-0 transition-colors text-base font-sans"
                />
              </div>

              {/* 3. Company name */}
              <div>
                <label
                  htmlFor="company"
                  className="block font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-400 mb-3"
                >
                  Company *
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
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-white/60 rounded-sm py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-0 transition-colors text-base font-sans"
                />
              </div>

              {/* 4. Phone number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-400 mb-3"
                >
                  Phone *
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
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-white/60 rounded-sm py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-0 transition-colors text-base font-sans"
                />
              </div>

              {/* 5. What are you looking for? */}
              <div>
                <label
                  htmlFor="looking_for"
                  className="block font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-400 mb-3"
                >
                  What are you looking for? *
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
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-white/60 rounded-sm py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-0 transition-colors text-base font-sans resize-none"
                />
              </div>

              {/* 6. Partnership alignment */}
              <div>
                <label
                  htmlFor="luxury_answer"
                  className="block font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-400 mb-3"
                >
                  Why do you believe you&apos;d be a strong partner for us? *
                </label>
                <textarea
                  id="luxury_answer"
                  name="luxury_answer"
                  rows={2}
                  value={formData.luxury_answer}
                  onChange={handleChange}
                  placeholder="Tell us about your track record and what sets you apart"
                  maxLength={1000}
                  required
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-white/60 rounded-sm py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-0 transition-colors text-base font-sans resize-none"
                />
              </div>

              {/* 7. What is the offer that you have for us? */}
              <div>
                <label
                  htmlFor="offer"
                  className="block font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-500 mb-1.5"
                >
                  What is the offer that you have for us? *
                </label>
                <p className="text-[10px] sm:text-[11px] text-neutral-600 mb-3 leading-relaxed">
                  We review partnership offers carefully. Please include revenue
                  share terms, volume commitments, or other value propositions.
                </p>
                <textarea
                  id="offer"
                  name="offer"
                  rows={2}
                  value={formData.offer}
                  onChange={handleChange}
                  placeholder="Describe your offer"
                  maxLength={1000}
                  required
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-white/60 rounded-sm py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-0 transition-colors text-base font-sans resize-none"
                />
              </div>

              {/* SMS Consent Checkbox */}
              <div className="pt-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="sms-consent"
                    checked={smsConsent}
                    onChange={(e) => {
                      setSmsConsent(e.target.checked);
                      if (e.target.checked) setShowSmsError(false);
                    }}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-white focus:ring-0 focus:ring-offset-0 cursor-pointer accent-white shrink-0"
                  />
                  <label
                    htmlFor="sms-consent"
                    className="text-[12px] sm:text-[13px] leading-snug text-neutral-500 text-left cursor-pointer select-none"
                  >
                    By checking this box, I agree to receive SMS messages from
                    Hot Premium Customers. Message &amp; data rates may apply.
                    Reply STOP to opt out at any time. View our{" "}
                    <a
                      href="#privacy"
                      className="underline text-neutral-300 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
                {showSmsError && (
                  <p className="text-[12px] sm:text-[13px] text-red-500 font-medium pl-7 mt-2">
                    Please agree to receive SMS messages to continue.
                  </p>
                )}
              </div>

              {/* Submit Button & Disclaimer */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-8 rounded-lg bg-[#2563EB] text-white font-semibold text-sm sm:text-base hover:bg-[#1d4ed8] transition-all duration-200 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-3 group uppercase tracking-wide"
                >
                  <span>{submitted ? "Application Sent" : "Submit Application"}</span>
                  {!submitted && (
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  )}
                </button>

                <p className="text-[13px] text-neutral-600 text-center mt-5 leading-[1.6]">
                  By submitting, you agree to be contacted about lead supply
                  options. We never share your information.
                </p>

                {submitted && (
                  <p className="text-center text-sm text-[#2DD4BF] mt-4 font-medium">
                    Thank you! We have received your application and our team
                    will be in touch shortly.
                  </p>
                )}
              </div>
            </form>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Full-Width Bottom Stipple Wave Topography Accent */}
      <div className="w-full overflow-hidden mt-14 sm:mt-20 -mb-1 pointer-events-none select-none">
        <img
          src="/media/stipple-wave.png"
          alt=""
          className="w-full h-auto min-h-[60px] max-h-[160px] object-cover object-bottom opacity-50 invert"
        />
      </div>
    </section>
  );
}
