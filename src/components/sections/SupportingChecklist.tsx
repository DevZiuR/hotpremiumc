import React from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const criteria = [
  {
    title: "Proven product-market fit",
    description: "You already have a working, converting offer with validated demand and strong unit economics.",
  },
  {
    title: "Fulfillment & capacity headroom",
    description: "Your team and operations are capable of handling 2x to 5x delivery volume without degrading quality.",
  },
  {
    title: "High-ticket or strong LTV",
    description: "Your business model supports high average contract values or consistent recurring client retention.",
  },
  {
    title: "Long-term alignment",
    description: "You want a true strategic equity partner invested in building enterprise value, not a transactional vendor.",
  },
];

export function SupportingChecklist() {
  return (
    <section className="bg-white py-[80px] lg:py-[140px] border-b border-line/70">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeading
          eyebrow="Selection Criteria"
          title="Who we partner with"
          description="Because our capital is directly at risk on media and infrastructure, we are selective. We look for operators who meet four core fundamentals:"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {criteria.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <div className="h-full border border-line bg-[#fcfbf9] p-8 flex items-start gap-4 transition-all duration-200 hover:border-slate/40">
                <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-[30px] font-semibold leading-[1.1] text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[17px] text-slate leading-[1.6] max-w-[62ch] font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-14 text-center">
            <Button variant="primary" href="#contact" showArrowBadge>
              Apply for Partnership
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
