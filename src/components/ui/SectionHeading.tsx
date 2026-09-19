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
          <p className={`font-sans !text-sm text-white uppercase tracking-widest ${isDark ? "text-neutral-400" : "text-slate"} mb-2 font-medium`}>
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-serif text-5xl font-semibold tracking-tight leading-tight ${isDark ? "text-white" : "text-ink"
            } leading-[1.08] my-2 mb-3`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`font-sans text-body font-normal leading-relaxed ${isDark ? "text-neutral-300" : "text-slate"
              } mb-10 max-w-2xl`}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
