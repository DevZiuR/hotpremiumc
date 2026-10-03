import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
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

// Instrument Sans — clean geometric sans for body, nav, buttons, labels
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Free Exclusive Annuity Leads on Revenue Share | Hot Premium Customers",
  description: "Exclusive, Highly Responsive & Easy To Close Leads",
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
    <html lang="en" className={`${instrumentSerif.variable} ${instrumentSans.variable} h-full antialiased`}>
      <body className="font-sans bg-[#000000] text-ink min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
