import React from "react";
import { Reveal } from "@/components/Reveal";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const isDark = theme === "dark";
  const alignClasses = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <Reveal>
      <div className={`flex flex-col max-w-3xl ${alignClasses} ${className}`}>
        {eyebrow && (
          <p className={`font-sans text-[12px] uppercase tracking-[0.12em] ${isDark ? "text-neutral-400" : "text-slate"} mb-2 font-medium`}>
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-serif text-[clamp(38px,5vw,68px)] font-semibold tracking-[-0.025em] leading-[1.05] ${isDark ? "text-white" : "text-ink"
            } my-2 mb-3`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`font-sans text-[20px] font-normal leading-[1.6] max-w-[62ch] ${isDark ? "text-neutral-300" : "text-slate"
              } mb-10`}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
