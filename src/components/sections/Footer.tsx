import Link from "next/link";

interface LinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface LinkGroup {
  heading: string;
  links: LinkItem[];
}

const linkGroups: LinkGroup[] = [
  {
    heading: "Services",
    links: [
      { label: "Core Acquisition", href: "/#how-it-works" },
      { label: "Pay-Per-Call Programs", href: "/#how-it-works" },
      { label: "Centralized Tech & CRM", href: "/#how-it-works" },
      { label: "Dedicated Sales Teams", href: "/#how-it-works" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Legal", href: "/#verticals" },
      { label: "Financial Services", href: "/#verticals" },
      { label: "Insurance", href: "/#verticals" },
      { label: "Home Services", href: "/#verticals" },
      { label: "Medical & Health", href: "/#verticals" },
      { label: "Enterprise & B2B", href: "/#verticals" },
    ],
  },
  {
    heading: "Insights",
    links: [
      { label: "Compliance & Data Standards", href: "/#compliance" },
      { label: "TCPA Verification", href: "/#compliance" },
      // { label: "Case Studies", href: "/#case-studies" },
      { label: "Operator Equity Model", href: "/#how-it-works" },
    ],
  },
  {
    heading: "About Us",
    links: [
      { label: "About HPC", href: "/#about" },
      { label: "50-State Coverage", href: "/#verticals" },
      { label: "FAQ & Resources", href: "/#faq" },
      { label: "Apply for Partnership", href: "/#contact" },
    ],
  },
];

const LOGO_MARK = "https://hotpremiumcustomers.com/logo-mark.png";

export function Footer() {
  return (
    <footer className="relative bg-[#000000] text-white overflow-hidden border-t border-[rgba(255,255,255,0.08)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left — logo + short bio */}
            <div className="flex flex-col items-start lg:col-span-4">
              <img
                src={LOGO_MARK}
                alt="Hot Premium Customers"
                className="h-12 lg:h-16 w-auto object-contain shrink-0"
              />
              <p className="mt-5 font-sans text-[15px] leading-[1.7] text-[rgba(255,255,255,0.6)] max-w-[360px]">
                We put our ad budget, sales team, and technology behind
                operators with a proven offer.
              </p>
            </div>

            {/* Right — nav link columns (two columns on mobile) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:col-span-8">
              {linkGroups.map((group) => (
                <div key={group.heading} className="flex flex-col items-start">
                  <span className="font-serif text-[12px] sm:text-[13px] uppercase tracking-[0.1em] sm:tracking-[0.12em] text-[rgba(255,255,255,0.5)] sm:text-white/40 select-none mb-5 block leading-none">
                    {group.heading}
                  </span>
                  <ul className="flex flex-col gap-3.5 list-none p-0 m-0 w-full">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        {link.isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans text-[14px] leading-snug text-white/80 hover:text-[#C9A24B] transition-colors duration-200 inline-block py-3 sm:py-0"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="font-sans text-[14px] leading-snug text-white/80 hover:text-[#C9A24B] transition-colors duration-200 inline-block py-3 sm:py-0"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-12 sm:mt-14 border-t border-white/[0.08] pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/40">
            <span className="text-center sm:text-left [text-wrap:balance]">
              &copy; 2026 Hot Premium Customers LLC. All rights reserved.
            </span>
            <div className="flex items-center justify-center gap-6">
              <a href="#privacy" className="hover:text-[#C9A24B] transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-[#C9A24B] transition-colors duration-200">
                Terms
              </a>
            </div>
          </div>
      </div>
    </footer>
  );
}
