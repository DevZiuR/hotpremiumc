import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating dev-tools indicator (the circular badge rendered only
  // by `next dev`; it never ships to production builds).
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
