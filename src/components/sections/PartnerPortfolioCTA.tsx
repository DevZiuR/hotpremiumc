"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import DotField from "@/components/DotField";

const formContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const controlClassName =
  "w-full bg-white/[0.04] border border-white/10 focus:border-[#2563EB] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] rounded-sm py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-0 transition-[border-color,box-shadow] duration-200 text-base font-sans";

const textareaClassName = `${controlClassName} resize-none`;

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
        <Reveal duration={350}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-[120px] lg:self-start">
              {/* 
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span
                  className="block flex-shrink-0"
                  style={{ width: 12, height: 12, background: "#2457D6" }}
                  aria-hidden="true"
                />
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  Let&apos;s Build What&apos;s Next
                </span>
              </div>
              */}

              <h2 className="font-serif text-[clamp(38px,5vw,68px)] font-normal leading-[1.05] tracking-[-0.025em] mb-4 text-white">
                Bring the offer. We fund the scale.
              </h2>
              <p className="text-[20px] text-neutral-400 leading-[1.6] max-w-[62ch]">
                Tell us about your business and growth goals. Our team will
                review your application and get back to you within 24 hours.
              </p>

              {/* 
              <div className="relative mt-8 h-[220px] w-full overflow-hidden xl:h-[260px]">
                <DotField />
            </div>
             */}
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="application-success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[620px] items-center justify-center rounded-2xl bg-white/[0.03] p-8 sm:p-12"
                    aria-live="polite"
                  >
                    <div className="max-w-sm text-center">
                      <div className="mx-auto h-16 w-16">
                        <svg
                          viewBox="0 0 64 64"
                          fill="none"
                          className="h-full w-full"
                          aria-hidden="true"
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="29"
                            stroke="rgba(37,99,235,0.35)"
                            strokeWidth="1.5"
                          />
                          <motion.path
                            d="M20 33l8 8 17-19"
                            stroke="#2563EB"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            pathLength={1}
                            strokeDasharray="1"
                            initial={{ strokeDashoffset: 1 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{
                              duration: 0.6,
                              delay: 0.12,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        </svg>
                      </div>
                      <p className="mt-7 text-[20px] leading-[1.5] text-white">
                        Application received. We&apos;ll get back to you within 24
                        hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="application-form"
                    onSubmit={handleSubmit}
                    variants={formContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-7 sm:space-y-8 !bg-transparent
                    rounded-2xl p-6 sm:p-8 md:p-12"
                  >
                    <motion.div variants={formFieldVariants}>
                      <label
                        htmlFor="name"
                        className="block font-mono text-[12px] tracking-[0.14em] uppercase text-neutral-300 mb-3"
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
                        className={controlClassName}
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label
                        htmlFor="email"
                        className="block font-mono text-[12px] tracking-[0.14em] uppercase text-neutral-300 mb-3"
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
                        className={controlClassName}
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label
                        htmlFor="company"
                        className="block font-mono text-[12px] tracking-[0.14em] uppercase text-neutral-300 mb-3"
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
                        className={controlClassName}
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label
                        htmlFor="phone"
                        className="block font-mono text-[12px] tracking-[0.14em] uppercase text-neutral-300 mb-3"
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
                        className={controlClassName}
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label
                        htmlFor="looking_for"
                        className="block font-mono text-[12px] tracking-[0.14em] uppercase text-neutral-300 mb-3"
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
                        className={textareaClassName}
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label
                        htmlFor="luxury_answer"
                        className="block font-mono text-[12px] tracking-[0.14em] uppercase text-neutral-300 mb-3"
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
                        className={textareaClassName}
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label
                        htmlFor="offer"
                        className="block font-mono text-[12px] tracking-[0.14em] uppercase text-neutral-300 mb-0"
                      >
                        WHAT&apos;S THE OFFER YOU HAVE FOR US? *
                      </label>
                      <p className="text-[13px] leading-[1.4] text-[#6B7280] mt-[6px] mb-[10px]">
                        Include revenue share terms, volume commitments, or other
                        value propositions.
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
                        className={textareaClassName}
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants} className="pt-2">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="sms-consent"
                          checked={smsConsent}
                          onChange={(event) => {
                            setSmsConsent(event.target.checked);
                            if (event.target.checked) setShowSmsError(false);
                          }}
                          className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-white focus:ring-0 focus:ring-offset-0 cursor-pointer accent-white shrink-0"
                        />
                        <label
                          htmlFor="sms-consent"
                          className="text-[12px] sm:text-[13px] leading-snug text-neutral-500 text-left cursor-pointer select-none"
                        >
                          By checking this box, I agree to receive SMS messages
                          from Hot Premium Customers. Message &amp; data rates
                          may apply. Reply STOP to opt out at any time. View our{" "}
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
                    </motion.div>

                    <motion.div variants={formFieldVariants} className="pt-4">
                      <button
                        type="submit"
                        className="group relative w-full overflow-hidden py-4 px-8 rounded-lg bg-[#2563EB] text-white font-semibold text-sm sm:text-sm hover:bg-[#1d4ed8] transition-all duration-200 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-3 uppercase tracking-wide"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-y-8 -left-1/3 w-1/4 skew-x-[-20deg] bg-white/20 opacity-0 blur-sm transition-all duration-700 ease-out group-hover:translate-x-[500%] group-hover:opacity-100"
                        />
                        <span className="relative z-10">Submit Application</span>
                        <span
                          aria-hidden="true"
                          className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </button>

                      <p className="text-[11px] text-neutral-600 text-center mt-5 leading-[1.6]">
                        By submitting, you agree to be contacted about lead supply
                        options. We never share your information.
                      </p>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div >

      <div className="w-full overflow-hidden mt-14 sm:mt-20 -mb-1 pointer-events-none select-none">
        <img
          src="/media/stipple-wave.png"
          alt=""
          className="w-full h-auto min-h-[60px] max-h-[160px] object-cover object-bottom opacity-50 invert"
        />
      </div>
    </section >
  );
}
