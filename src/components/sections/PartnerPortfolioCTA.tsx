"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SplitHeading } from "@/components/SplitHeading";

const baseControlClassName =
  "w-full min-h-[48px] bg-white/[0.04] rounded-sm py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-0 transition-[border-color,box-shadow] duration-200 text-base font-sans border";

const baseTextareaClassName = `${baseControlClassName} resize-none`;

const revenueOptions = [
  { label: "Under $250k", value: "Under $250k/year", key: "a" },
  { label: "$250k to $1M", value: "$250k – $1M/year", key: "b" },
  { label: "$1M to $5M", value: "$1M – $5M/year", key: "c" },
  { label: "$5M to $10M", value: "$5M – $10M/year", key: "d" },
  { label: "$10M+", value: "$10M+", key: "e" },
] as const;

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (!digits) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const validators = {
  name: (v: string) => v.trim().length >= 2,
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v.trim()),
  company: (v: string) => v.trim().length >= 2,
  phone: (v: string) => v.replace(/\D/g, "").length === 10,
  revenue: (v: string) => v.trim().length > 0,
  looking_for: (v: string) => v.trim().length >= 5,
  luxury_answer: () => true,
  offer: (v: string) => v.trim().length >= 5,
};

const errorMessages: Record<keyof typeof validators, string> = {
  name: "Please enter your full name.",
  email: "Please enter a valid email address.",
  company: "Please enter your company or business name.",
  phone: "Please enter a complete 10-digit phone number.",
  revenue: "Please select your business revenue range.",
  looking_for: "Please describe what lead supply you are seeking.",
  luxury_answer: "Please share what sets your company apart.",
  offer: "Please describe your proposed offer or terms.",
};

type FieldKey = keyof typeof validators;
type FieldStatus = "idle" | "valid" | "invalid";

function ValidCheckmark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute flex items-center text-emerald-400 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function ErrorNotice({ message }: { message: string }) {
  return (
    <p className="mt-1.5 text-[12px] text-rose-400 flex items-center gap-1.5 font-sans">
      <svg
        className="w-3.5 h-3.5 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span>{message}</span>
    </p>
  );
}

export function PartnerPortfolioCTA() {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    revenue: "",
    looking_for: "",
    luxury_answer: "",
    offer: "",
  });

  const [fieldStatus, setFieldStatus] = useState<Record<FieldKey, FieldStatus>>({
    name: "idle",
    email: "idle",
    company: "idle",
    phone: "idle",
    revenue: "idle",
    looking_for: "idle",
    luxury_answer: "idle",
    offer: "idle",
  });

  const [smsConsent, setSmsConsent] = useState(false);
  const [showSmsError, setShowSmsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);
  const partialLeadSentRef = useRef(false);


  const getBorderClass = (status: FieldStatus) => {
    if (status === "valid") {
      return "border-emerald-500/80 focus:border-emerald-400 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.15)]";
    }
    if (status === "invalid") {
      return "border-rose-500/80 focus:border-rose-500 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.18)]";
    }
    return "border-white/10 focus:border-[#2563EB] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)]";
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const finalValue = name === "phone" ? formatPhone(value) : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // For revenue-pill selection, update validity immediately upon selection
    if (name === "revenue") {
      setFieldStatus((prev) => ({
        ...prev,
        revenue: finalValue ? "valid" : "invalid",
      }));
    } else if (fieldStatus[name as FieldKey] === "invalid") {
      // Clear invalid state on change so user can type freely without stuck error
      setFieldStatus((prev) => ({ ...prev, [name]: "idle" }));
    }
  };

  const handleBlur = (
    event: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name } = event.target;
    if (name in validators) {
      const key = name as FieldKey;
      const isValid = validators[key](formData[key]);
      setFieldStatus((prev) => ({
        ...prev,
        [key]: isValid ? "valid" : "invalid",
      }));
    }
  };

  const stepRequiredFields: FieldKey[][] = [
    ["name", "email", "phone"],
    ["company", "revenue"],
    ["looking_for"],
    ["offer"],
    [],
  ];

  const stepBodyClassName = "mt-8 border-t border-white/10 pt-8";

  const simulateLeadSubmission = async (
    status: "partial" | "complete",
    payload: Record<string, string>
  ) => {
    await new Promise((resolve) => setTimeout(resolve, status === "partial" ? 300 : 1100));
    return { status, fieldCount: Object.keys(payload).length };
  };

  const focusField = (key: FieldKey) => {
    const target =
      key === "revenue"
        ? document.querySelector('[data-revenue-option="a"]')
        : document.getElementById(key);
    (target as HTMLElement | null)?.focus();
  };

  const validateStepFields = (targetStep: number) => {
    const updates: Partial<Record<FieldKey, FieldStatus>> = {};
    let firstInvalidField: FieldKey | null = null;

    stepRequiredFields[targetStep].forEach((key) => {
      const isValid = validators[key](formData[key]);
      updates[key] = isValid ? "valid" : "invalid";
      if (!isValid && !firstInvalidField) firstInvalidField = key;
    });

    setFieldStatus((previous) => ({ ...previous, ...updates }));
    if (firstInvalidField) {
      focusField(firstInvalidField);
      return false;
    }
    return true;
  };

  const selectRevenue = (value: string) => {
    setFormData((previous) => ({ ...previous, revenue: value }));
    setFieldStatus((previous) => ({
      ...previous,
      revenue: value ? "valid" : "invalid",
    }));
  };

  const isCurrentStepValid =
    step === 4
      ? smsConsent
      : stepRequiredFields[step].every((key) => validators[key](formData[key]));

  const goNext = async () => {
    if (step >= 4 || isSubmitting) return;
    if (!validateStepFields(step)) return;

    if (step === 0 && !partialLeadSentRef.current) {
      partialLeadSentRef.current = true;
      await simulateLeadSubmission("partial", {
        status: "partial",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
    }
    setStep(step + 1);
  };

  const goBack = () => {
    setStep((previous) => Math.max(0, previous - 1));
  };

  const handleRevenueKeyDown = (event: React.KeyboardEvent) => {
    if (step !== 1) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("input, textarea, select, a, button")) return;
    const option = revenueOptions.find((item) => item.key === event.key.toLowerCase());
    if (option) {
      event.preventDefault();
      selectRevenue(option.value);
    }
  };

  const submitApplication = async () => {
    if (isSubmitting) return false;

    // Validate all required fields; the partner-background field is optional.
    const updatedStatus: Record<FieldKey, FieldStatus> = { ...fieldStatus };
    let hasError = false;
    let firstErrorField: FieldKey | null = null;

    (Object.keys(validators) as FieldKey[])
      .filter((key) => key !== "luxury_answer")
      .forEach((key) => {
        const isValid = validators[key](formData[key]);
        updatedStatus[key] = isValid ? "valid" : "invalid";
        if (!isValid) {
          hasError = true;
          if (!firstErrorField) firstErrorField = key;
        }
      });

    setFieldStatus(updatedStatus);

    if (!smsConsent) {
      setShowSmsError(true);
      hasError = true;
    } else {
      setShowSmsError(false);
    }

    if (hasError) {
      if (firstErrorField) {
        focusField(firstErrorField);
      }
      return false;
    }

    setIsSubmitting(true);
    // Simulate brief network request to prevent double submissions and provide realistic feedback
    await simulateLeadSubmission("complete", {
      status: "complete",
      smsConsent: "yes",
      ...formData,
    });
    setIsSubmitting(false);
    setSubmitted(true);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submitApplication();
  };

  const handleStepKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter") return;
    const target = event.target as HTMLElement | null;
    if (
      !target ||
      target.closest("textarea, button, a") ||
      (target instanceof HTMLInputElement && target.type === "checkbox")
    ) {
      return;
    }
    event.preventDefault();
    if (step >= 4) {
      void submitApplication();
    } else {
      void goNext();
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#09090b] text-white py-[80px] lg:py-[140px]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] lg:self-start">
            {/* Heading: SplitHeading line reveal */}
            <SplitHeading
              as="h2"
              delay={0}
              lines={["Bring the offer.", "We fund the scale."]}
                className="font-serif section-h2 font-normal tracking-[-0.025em] mb-4 text-white"
            />

            {/* Supporting copy */}
            <p className="font-sans text-[18px] sm:text-[20px] text-neutral-400 leading-[1.6] max-w-[62ch]">
              Tell us about your business and growth goals. Our team will
              review your application and get back to you within 24 hours.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.14] px-[14px] py-2 font-mono text-[12px] uppercase text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Reviewing applications, reply within 24h
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="application-success"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.1 : 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex min-h-[580px] flex-col items-center justify-center rounded-[24px] bg-[#0d1118] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] p-8 sm:p-14 text-center"
                  aria-live="polite"
                >
                  {/* Glowing Animated Circular Badge with Stroke Drawing */}
                  <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.22)]">
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      className="h-11 w-11 text-emerald-400 overflow-visible"
                      aria-hidden="true"
                    >
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(16,185,129,0.3)"
                        strokeWidth="2"
                      />
                      <motion.path
                        d="M20 33l8 8 17-19"
                        stroke="#10B981"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={
                          shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }
                        }
                        animate={{ pathLength: 1 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                duration: 0.65,
                                delay: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                              }
                        }
                      />
                    </svg>
                  </div>

                  <h3 className="font-serif text-[28px] sm:text-[34px] font-normal text-white leading-tight mb-3">
                    Application received.
                  </h3>
                  <p className="font-sans text-[17px] sm:text-[19px] text-neutral-300 leading-relaxed max-w-[42ch] mb-6">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Review team notified
                  </div>
                </motion.div>
              ) : (
                <form
                  key="application-form"
                  noValidate
                  onSubmit={handleSubmit}
                  onKeyDown={handleStepKeyDown}
                  className="space-y-8 bg-[#0d1118] rounded-[24px] p-6 sm:p-8 md:p-12 border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-1 gap-1.5" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={`application-step-${index + 1}`}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              index < step ? "bg-[#2563EB]" : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="ml-4 font-mono text-[12px] uppercase text-white/60">
                        Step {step + 1} of 5
                      </p>
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`application-step-content-${step}`}
                        initial={{
                          opacity: 0,
                          y: shouldReduceMotion ? 0 : 12,
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: shouldReduceMotion ? 0 : -12,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mt-8 flex min-h-[600px] flex-col"
                      >
                        {step === 0 && (
                          <div className={stepBodyClassName}>
                            <p className="font-mono text-[12px] uppercase text-white/45">
                              About you
                            </p>
                            <h3 className="mt-3 font-serif text-[28px] font-normal leading-[1.2] text-white">
                              How can we reach you?
                            </h3>
                            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-[14px] tracking-[0.06em] uppercase text-neutral-300 mb-3"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Smith"
                        maxLength={120}
                        required
                        className={`${baseControlClassName} ${getBorderClass(
                          fieldStatus.name
                        )} pr-10`}
                      />
                      {fieldStatus.name === "valid" && (
                        <ValidCheckmark className="inset-y-0 right-0 pr-3.5" />
                      )}
                    </div>
                    {fieldStatus.name === "invalid" && (
                      <ErrorNotice message={errorMessages.name} />
                    )}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-[14px] tracking-[0.06em] uppercase text-neutral-300 mb-3"
                    >
                      Work Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="john@company.com"
                        maxLength={255}
                        required
                        className={`${baseControlClassName} ${getBorderClass(
                          fieldStatus.email
                        )} pr-10`}
                      />
                      {fieldStatus.email === "valid" && (
                        <ValidCheckmark className="inset-y-0 right-0 pr-3.5" />
                      )}
                    </div>
                    {fieldStatus.email === "invalid" && (
                      <ErrorNotice message={errorMessages.email} />
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block font-mono text-[14px] tracking-[0.06em] uppercase text-neutral-300 mb-3"
                    >
                      Phone *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="(555) 123-4567"
                        maxLength={14}
                        required
                        className={`${baseControlClassName} ${getBorderClass(
                          fieldStatus.phone
                        )} pr-10`}
                      />
                      {fieldStatus.phone === "valid" && (
                        <ValidCheckmark className="inset-y-0 right-0 pr-3.5" />
                      )}
                    </div>
                    {fieldStatus.phone === "invalid" && (
                      <ErrorNotice message={errorMessages.phone} />
                    )}
                  </div>
                </div>
                          </div>
                        )}

                  {step === 1 && (
                          <div className={stepBodyClassName}>
                            <p className="font-mono text-[12px] uppercase text-white/45">
                              Your business
                            </p>
                      <h3 className="mt-3 font-serif text-[28px] font-normal leading-[1.2] text-white">
                        Tell us about your business.
                      </h3>
                      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block font-mono text-[14px] tracking-[0.06em] uppercase text-neutral-300 mb-3"
                    >
                      Company *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Company, LLC"
                        maxLength={150}
                        required
                        className={`${baseControlClassName} ${getBorderClass(
                          fieldStatus.company
                        )} pr-10`}
                      />
                      {fieldStatus.company === "valid" && (
                        <ValidCheckmark className="inset-y-0 right-0 pr-3.5" />
                      )}
                    </div>
                    {fieldStatus.company === "invalid" && (
                      <ErrorNotice message={errorMessages.company} />
                    )}
                  </div>


                    </div>

                  {/* Revenue Pills */}
                  <div className="mt-5">
                    <div className="relative mb-3 flex items-center justify-between gap-3">
                      <p
                        id="revenue-label"
                        className="block font-mono text-[14px] tracking-[0.06em] uppercase text-neutral-300"
                      >
                        Current annual revenue *
                      </p>
                      {fieldStatus.revenue === "valid" && (
                        <ValidCheckmark className="inset-y-0 right-0" />
                      )}
                    </div>
                    <div
                      id="revenue"
                      role="radiogroup"
                      aria-labelledby="revenue-label"
                      aria-required="true"
                      onKeyDown={handleRevenueKeyDown}
                      className="grid gap-3"
                    >
                      {revenueOptions.map((option) => {
                        const isSelected = formData.revenue === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            data-revenue-option={option.key}
                            onClick={() => selectRevenue(option.value)}
                            className={`flex min-h-[48px] w-full items-center gap-4 rounded-full border px-4 py-3 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                              isSelected
                                ? "border-[#2563EB] bg-[#2563EB]/15 text-white"
                                : "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25 hover:text-white"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[12px] uppercase ${
                                isSelected
                                  ? "border-[#2563EB] bg-[#2563EB] text-white"
                                  : "border-white/20 text-white/60"
                              }`}
                            >
                              {option.key.toUpperCase()}
                            </span>
                            <span className="text-[15px] font-medium">
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {fieldStatus.revenue === "invalid" && (
                      <ErrorNotice message={errorMessages.revenue} />
                    )}
                    </div>
                          </div>
                        )}

                  {step === 2 && (
                          <div className={stepBodyClassName}>
                            <p className="font-mono text-[12px] uppercase text-white/45">
                              The partnership
                            </p>
                      <h3 className="mt-3 font-serif text-[28px] font-normal leading-[1.2] text-white">
                        What are you looking for?
                      </h3>
                      <div className="mt-8 space-y-5">
                    <label
                      htmlFor="looking_for"
                      className="block font-mono text-[14px] tracking-[0.06em] uppercase text-neutral-300 mb-3"
                    >
                      What are you looking for? *
                    </label>
                    <div className="relative">
                      <textarea
                        id="looking_for"
                        name="looking_for"
                        rows={2}
                        value={formData.looking_for}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Exclusive MVA leads in Texas, ~50/month"
                        maxLength={1000}
                        required
                        className={`${baseTextareaClassName} ${getBorderClass(
                          fieldStatus.looking_for
                        )} pr-10`}
                      />
                      {fieldStatus.looking_for === "valid" && (
                        <ValidCheckmark className="top-3.5 right-3.5" />
                      )}
                    </div>
                    <div className="flex items-center justify-end mt-1.5">
                      <span className="text-[11px] font-mono text-neutral-600">
                        {formData.looking_for.length}/1000
                      </span>
                    </div>
                    {fieldStatus.looking_for === "invalid" && (
                      <ErrorNotice message={errorMessages.looking_for} />
                    )}
                  </div>
                          </div>
                        )}

                  {step === 3 && (
                          <div className={stepBodyClassName}>
                            <p className="font-mono text-[12px] uppercase text-white/45">
                              The partnership
                            </p>
                      <h3 className="mt-3 font-serif text-[28px] font-normal leading-[1.2] text-white">
                        What’s the offer you have for us?
                      </h3>
                      <div className="mt-8 space-y-5">

                  {/* What is the offer that you have for us? */}
                  <div>
                    <label
                      htmlFor="offer"
                      className="block font-mono text-[14px] tracking-[0.06em] uppercase text-neutral-300 mb-0"
                    >
                      WHAT&apos;S THE OFFER YOU HAVE FOR US? *
                    </label>
                    <p className="text-[13px] leading-[1.4] text-[rgba(255,255,255,0.55)] mt-[6px] mb-[10px]">
                      Include revenue share terms, volume commitments, or other
                      value propositions.
                    </p>
                    <div className="relative">
                      <textarea
                        id="offer"
                        name="offer"
                        rows={2}
                        value={formData.offer}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Describe your offer"
                        maxLength={1000}
                        required
                        className={`${baseTextareaClassName} ${getBorderClass(
                          fieldStatus.offer
                        )} pr-10`}
                      />
                      {fieldStatus.offer === "valid" && (
                        <ValidCheckmark className="top-3.5 right-3.5" />
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[12px] text-neutral-500 font-sans">
                        A few sentences is usually enough.
                      </span>
                      <span className="text-[11px] font-mono text-neutral-600">
                        {formData.offer.length}/1000
                      </span>
                    </div>
                    {fieldStatus.offer === "invalid" && (
                      <ErrorNotice message={errorMessages.offer} />
                    )}
                    </div>

                  {/* Why are you a strong partner? */}
                  <div>
                    <label
                      htmlFor="luxury_answer"
                      className="block font-mono text-[14px] tracking-[0.06em] uppercase text-neutral-300 mb-3"
                    >
                      Why are you a strong partner?{" "}
                      <span className="normal-case tracking-normal text-neutral-500">
                        (Optional)
                      </span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="luxury_answer"
                        name="luxury_answer"
                        rows={2}
                        value={formData.luxury_answer}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tell us about your track record and what sets you apart"
                        maxLength={1000}
                        className={`${baseTextareaClassName} ${getBorderClass(
                          fieldStatus.luxury_answer
                        )} pr-10`}
                      />
                      {fieldStatus.luxury_answer === "valid" &&
                        formData.luxury_answer.trim() !== "" && (
                          <ValidCheckmark className="top-3.5 right-3.5" />
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[12px] text-neutral-500 font-sans">
                        A few sentences is usually enough.
                      </span>
                      <span className="text-[11px] font-mono text-neutral-600">
                        {formData.luxury_answer.length}/1000
                      </span>
                    </div>
                    {fieldStatus.luxury_answer === "invalid" && (
                      <ErrorNotice message={errorMessages.luxury_answer} />
                    )}
                  </div>
                    </div>
                          </div>
                        )}

                  {step === 4 && (
                          <div className={stepBodyClassName}>
                            <p className="font-mono text-[12px] uppercase text-white/45">
                              Submit
                            </p>
                      <h3 className="mt-3 font-serif text-[28px] font-normal leading-[1.2] text-white">
                        Confirm and submit your application.
                      </h3>
                      <div className="mt-8 space-y-5">

                  {/* SMS Consent Checkbox */}
                  <div className="pt-2">
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
                      <p className="text-[12px] sm:text-[13px] text-rose-400 font-medium pl-7 mt-2 flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Please agree to receive SMS messages to continue.</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`group relative w-full overflow-hidden py-4 px-8 rounded-lg bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1d4ed8] transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-3 uppercase tracking-wide ${
                        isSubmitting ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      {!isSubmitting && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-y-8 -left-1/3 w-1/4 skew-x-[-20deg] bg-white/20 opacity-0 blur-sm transition-all duration-700 ease-out group-hover:translate-x-[500%] group-hover:opacity-100"
                        />
                      )}
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span className="relative z-10">Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Submit Application</span>
                          <span
                            aria-hidden="true"
                            className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </>
                      )}
                    </button>

                    <p className="text-[13px] text-[rgba(255,255,255,0.55)] text-center mt-5 leading-[1.6]">
                      By submitting, you agree to be contacted about your
                      application. We never share your information.
                    </p>
                    <p className="text-[13px] text-[rgba(255,255,255,0.55)] text-center mt-3 leading-[1.6]">
                      No retainer. No management fee.
                    </p>
                  </div>
                    </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    <div className="mt-auto pt-8">
                      <div className="flex flex-col gap-2 sm:flex-row-reverse sm:items-center sm:justify-between">
                        {step < 4 ? (
                          <button
                            type="button"
                            disabled={!isCurrentStepValid || isSubmitting}
                            onClick={() => void goNext()}
                            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] px-8 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                          >
                            Continue
                            <span aria-hidden="true">→</span>
                          </button>
                        ) : (
                          <span className="hidden sm:block" aria-hidden="true" />
                        )}
                        {step > 0 ? (
                          <button
                            type="button"
                            onClick={goBack}
                            className="inline-flex min-h-[48px] items-center justify-center px-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white sm:justify-start"
                          >
                            Back
                          </button>
                        ) : (
                          <span className="hidden sm:block" aria-hidden="true" />
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

