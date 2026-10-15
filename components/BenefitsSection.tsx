import React from "react";

interface BenefitsSectionProps {
  titleColor?: string;
}

export default function BenefitsSection({
  titleColor = "text-[#000000]",
}: BenefitsSectionProps) {
  const benefits = [
    {
      id: "convenience",
      text: "100% private sessions from the comfort of your home",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 text-[#16aee2] shrink-0"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "empathy",
      text: "Zero judgment, shame-free guidance tailored to your pace",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 text-[#16aee2] shrink-0"
          aria-hidden
        >
          <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
          <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8L15 13" />
          <path d="M19 4a2.5 2.5 0 0 0-3.5 0l-.5.5-.5-.5a2.5 2.5 0 1 0-3.5 3.5l4 4 4-4a2.5 2.5 0 0 0 0-3.5Z" />
        </svg>
      ),
    },
    {
      id: "roadmap",
      text: "Custom recovery roadmap with daily urge-control tools",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 text-[#16aee2] shrink-0"
          aria-hidden
        >
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 16h5v5" />
          <circle cx="12" cy="10" r="2.5" />
          <path d="M8 15a4 4 0 0 1 8 0" />
        </svg>
      ),
    },
    {
      id: "accessible",
      text: "Free first session with zero commitments or hidden fees",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 text-[#16aee2] shrink-0"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8.5 7.5h7" />
          <path d="M8.5 10.5h7" />
          <path d="M10 7.5v3c0 1.8 1.2 3 3 3" />
          <path d="M10.5 13.5L15 18" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="benefits-of-sessions"
      className="w-full bg-white pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading using the site's primary font family */}
        <h2
          className={`${titleColor} text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-8 sm:mb-10 md:mb-12`}
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          Benefits of <span className="text-[#16aee2]">Sessions</span>
        </h2>

        {/* 
          Cards Grid:
          - Mobile (< lg): Vertical stack of horizontal cards (icon left, text right) matching mobile screenshot
          - Desktop (>= lg): Single row of 4 cards (icon top, text below) matching web screenshot
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-[#f8f9fa] border border-gray-200/90 rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-row lg:flex-col items-center lg:items-start gap-4 sm:gap-5 lg:gap-4 min-h-[92px] sm:min-h-[100px] lg:min-h-[185px] transition-all duration-300 hover:-translate-y-1 hover:border-[#16aee2]/40 hover:bg-[#f0f9fd] hover:shadow-sm"
            >
              {/* Icon */}
              <div className="shrink-0 flex items-center justify-center">
                {benefit.icon}
              </div>

              {/* Short Benefit Text */}
              <p
                className="text-sm sm:text-base lg:text-[15px] font-semibold text-[#000000] leading-snug flex-1"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
