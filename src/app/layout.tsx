import type { Metadata } from "next";
import { Merriweather, Cabin } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/SmoothScroll";

// Merriweather — used for headlines and headings
const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

// Cabin — used for body text (400 weight base)
const cabin = Cabin({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-cabin",
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
    <html lang="en" className={`${merriweather.variable} ${cabin.variable} h-full antialiased`}>
      <body className="font-sans bg-white text-ink min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
