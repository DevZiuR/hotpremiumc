import type { Metadata } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/SmoothScroll";

// Instrument Serif — editorial serif for headlines
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

// Geist — clean, modern sans-serif for body, nav, buttons, labels
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Hot Premium Customers | We Fund Your Growth. You Keep Running the Business.",
  description:
    "Hot Premium Customers is a performance-based growth partner — we put our ad budget, sales team, and technology behind proven operators at no retainer or management fee. We only win when your revenue grows.",
  keywords: [
    "growth capital",
    "customer acquisition",
    "performance marketing",
    "equity partnership",
    "lead generation",
    "media buying",
    "operator model",
    "revenue growth",
  ],
  authors: [{ name: "Hot Premium Customers" }],
  creator: "ZIUR Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Hot Premium Customers | Performance-Based Growth Partnership",
    description:
      "We fund 100% of media spend, creative, and customer acquisition for proven operators — no retainer, no management fee. We only make money when your revenue grows.",
    siteName: "Hot Premium Customers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hot Premium Customers | We Fund Your Growth",
    description:
      "Performance-based growth partnership. We put our ad budget and sales team behind proven operators — zero upfront cost.",
    creator: "@hotpremiumcustomers",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-icon.png" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${geist.variable} h-full antialiased`}>
      <body className="font-sans bg-white text-ink min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
