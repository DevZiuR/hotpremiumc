import React from "react";

interface CropMarkFrameProps {
  className?: string;
  showDashedBorder?: boolean;
  variant?: "light" | "dark";
}

export function CropMarkFrame({
  className = "",
  showDashedBorder = true,
  variant = "light",
}: CropMarkFrameProps) {
  const borderColor = variant === "dark" ? "border-white/15" : "border-[#12151B]/15";
  const markColor = variant === "dark" ? "text-white/60" : "text-[#12151B]/60";

  // 1px stroke, 16px-20px long arms with registration cross extension
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Subtle dashed perimeter border connecting the registration marks */}
      {showDashedBorder && (
        <div className={`absolute inset-0 border border-dashed ${borderColor}`} />
      )}

      {/* Top-Left Crop Mark */}
      <div className={`absolute -top-[6px] -left-[6px] w-5 h-5 ${markColor}`}>
        <svg
          viewBox="0 0 20 20"
          className="w-5 h-5 overflow-visible"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <line x1="0" y1="6" x2="20" y2="6" />
          <line x1="6" y1="0" x2="6" y2="20" />
        </svg>
      </div>

      {/* Top-Right Crop Mark */}
      <div className={`absolute -top-[6px] -right-[6px] w-5 h-5 ${markColor}`}>
        <svg
          viewBox="0 0 20 20"
          className="w-5 h-5 overflow-visible"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <line x1="0" y1="6" x2="20" y2="6" />
          <line x1="14" y1="0" x2="14" y2="20" />
        </svg>
      </div>

      {/* Bottom-Left Crop Mark */}
      <div className={`absolute -bottom-[6px] -left-[6px] w-5 h-5 ${markColor}`}>
        <svg
          viewBox="0 0 20 20"
          className="w-5 h-5 overflow-visible"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <line x1="0" y1="14" x2="20" y2="14" />
          <line x1="6" y1="0" x2="6" y2="20" />
        </svg>
      </div>

      {/* Bottom-Right Crop Mark */}
      <div className={`absolute -bottom-[6px] -right-[6px] w-5 h-5 ${markColor}`}>
        <svg
          viewBox="0 0 20 20"
          className="w-5 h-5 overflow-visible"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <line x1="0" y1="14" x2="20" y2="14" />
          <line x1="14" y1="0" x2="14" y2="20" />
        </svg>
      </div>
    </div>
  );
}
