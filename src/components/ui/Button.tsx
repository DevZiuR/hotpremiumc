import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "sharp-primary" | "sharp-outline";
  href?: string;
  showArrowBadge?: boolean;
  arrowBadgeColor?: string;
  showPixelArrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function PixelArrowIcon({ className = "w-4 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 15"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Stem dots */}
      <rect x="0" y="6.5" width="2" height="2" />
      <rect x="3.5" y="6.5" width="2" height="2" />
      <rect x="7" y="6.5" width="2" height="2" />
      <rect x="10.5" y="6.5" width="2" height="2" />
      <rect x="15" y="6.5" width="2" height="2" />

      {/* Chevron wings */}
      <rect x="8.5" y="0.5" width="2" height="2" />
      <rect x="11.5" y="2.5" width="2" height="2" />
      <rect x="13.5" y="4.5" width="2" height="2" />
      <rect x="13.5" y="8.5" width="2" height="2" />
      <rect x="11.5" y="10.5" width="2" height="2" />
      <rect x="8.5" y="12.5" width="2" height="2" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  href,
  showArrowBadge = false,
  arrowBadgeColor = "bg-navy",
  showPixelArrow = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isSharp = variant === "sharp-primary" || variant === "sharp-outline" || className.includes("rounded-none");

  const baseStyles = isSharp
    ? "group inline-flex items-center justify-center font-sans font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.99] cursor-pointer text-xs sm:text-[13px] rounded-none"
    : "group inline-flex items-center justify-center font-sans font-medium transition-all duration-300 active:scale-[0.98] cursor-pointer text-small";

  const variantStyles = {
    primary: isSharp
      ? "gap-2.5 px-7 py-3.5 bg-black text-white hover:bg-neutral-800 shadow-none border border-black"
      : showArrowBadge
        ? "justify-between gap-4 pl-6 pr-2 py-2 rounded-[22px] bg-ink text-white hover:bg-navy shadow-md hover:shadow-xl hover:-translate-y-0.5"
        : "px-6 py-3 rounded-[20px] bg-ink text-white hover:bg-navy shadow-sm hover:shadow-md hover:-translate-y-0.5",
    outline: isSharp
      ? "gap-2.5 px-8 py-3.5 border border-gray-200 bg-[#f4f5f7] text-black hover:bg-gray-50 hover:border-gray-300 shadow-none"
      : "gap-2.5 px-6 py-3 rounded-[20px] border border-line bg-white/80 backdrop-blur-md text- hover:bg-white hover:border-slate/40 shadow-2xs hover:shadow-sm",
    "sharp-primary":
      "gap-2.5 px-7 py-3.5 bg-black text-white hover:bg-neutral-800 shadow-none border border-black",
    "sharp-outline":
      "gap-2.5 px-8 py-3.5 border border-gray-200 bg-white text-black hover:bg-gray-50 hover:border-gray-300 shadow-none",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {showPixelArrow ? (
        <PixelArrowIcon className="w-4 h-3.5 shrink-0 text-white" />
      ) : null}
      <span className={isSharp ? "tracking-wider" : "tracking-tight"}>{children}</span>
      {showArrowBadge ? (
        <span
          className={`w-10 h-10 rounded-[14px] ${arrowBadgeColor} flex items-center justify-center text-ink shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 shadow-2xs`}
        >
          <svg
            className="w-4 h-4 text-ink"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.4}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      ) : variant === "outline" && !isSharp ? (
        <svg
          className="w-4 h-4 text-slate group-hover:text-ink group-hover:translate-x-0.5 transition-all duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      ) : null}
    </>
  );

  if (href) {
    const isInternal = href.startsWith("#") || href.startsWith("/");
    if (isInternal) {
      return (
        <a href={href} className={combinedClasses}>
          {content}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
