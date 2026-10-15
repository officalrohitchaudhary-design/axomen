"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function IssuesSection() {
  const t = useTranslations("issuesWeHelpWith");

  const sectionTitle = t.has("title") ? t("title") : "Issues We Help With";

  const issues = [
    {
      id: "porn-addiction",
      title: t.has("pornTitle") ? t("pornTitle") : "Porn addiction",
      subtitle: t.has("pornSub")
        ? t("pornSub")
        : "Break compulsive urges, clear brain fog & reset dopamine balance",
      href: "/session",
      bgColor: "bg-[#ffd5d2]",
      textColor: "text-[#4a121a]",
      linkHover: "group-hover:text-[#2a080f]",
      image: "/image/porn-issue-clean.png",
      imgAlt: "Porn addiction support",
    },
    {
      id: "masturbation-addiction",
      title: t.has("masturbationTitle")
        ? t("masturbationTitle")
        : "Masturbation addiction",
      subtitle: t.has("masturbationSub")
        ? t("masturbationSub")
        : "Overcome compulsive urges, restore energy & regain mental focus",
      href: "/session",
      bgColor: "bg-[#cde4fe]",
      textColor: "text-[#0c2847]",
      linkHover: "group-hover:text-[#051629]",
      image: "/image/issue-mast-clean.png",
      imgAlt: "Masturbation addiction support",
    },
    {
      id: "both-addiction",
      title: t.has("bothTitle")
        ? t("bothTitle")
        : "Porn + Masturbation addiction",
      subtitle: t.has("bothSub")
        ? t("bothSub")
        : "Dismantle the combined habit loop with structured behavioral care",
      href: "/session",
      bgColor: "bg-[#bbf2d0]",
      textColor: "text-[#08331d]",
      linkHover: "group-hover:text-[#031c0e]",
      image: "/image/issue-both-3d.png",
      imgAlt: "Porn and masturbation combined addiction support",
    },
  ];

  return (
    <section
      id="issues-we-help-with"
      className="w-full bg-[#f8faf9] py-12 sm:py-16 md:py-20 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading matching theme font */}
        <h2
          className="text-[#0f0f0f] text-center text-3xl sm:text-4xl md:text-[42px] font-black tracking-tight mb-8 sm:mb-10 md:mb-12"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {sectionTitle}
        </h2>

        {/* 
          Cards Grid:
          - Mobile (< md): Vertical stack of cards with image at bottom right
          - Desktop (>= md): 3-column row with image at bottom right
          - Matches "What We Offer" design pattern with colorful pastel backgrounds
        */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-3.5 sm:gap-4 md:gap-6">
          {issues.map((issue) => (
            <Link
              key={issue.id}
              href={issue.href}
              prefetch={false}
              className={`group relative ${issue.bgColor} ${issue.textColor} rounded-2xl md:rounded-[22px] p-5 sm:p-6 md:p-7 flex flex-col justify-between min-h-[150px] sm:min-h-[170px] md:min-h-[235px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.09)] active:scale-[0.99] overflow-hidden`}
            >
              {/* Text content on left with clearance for the bottom-right image */}
              <div className="relative z-10 flex flex-col justify-between flex-1 max-w-[62%] sm:max-w-[65%] md:max-w-[60%]">
                <div>
                  <h3
                    className="text-xl sm:text-2xl md:text-[23px] lg:text-[25px] font-extrabold md:font-black leading-tight tracking-tight"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {issue.title}
                  </h3>
                  <p
                    className="text-xs sm:text-[13px] md:text-[13.5px] font-semibold mt-1.5 sm:mt-2 opacity-90 leading-snug line-clamp-2 sm:line-clamp-none"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {issue.subtitle}
                  </p>
                </div>

                {/* Get started CTA link with chevron */}
                <div
                  className={`flex items-center gap-1.5 text-[13px] sm:text-[14px] md:text-[15px] font-extrabold whitespace-nowrap mt-4 sm:mt-5 md:mt-7 transition-colors ${issue.linkHover}`}
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  <span>{t.has("getStarted") ? t("getStarted") : "Get started"}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>

              {/* Character Image: Positioned at bottom-right corner */}
              <div className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 w-[125px] xs:w-[140px] sm:w-[160px] md:w-[165px] lg:w-[190px] h-[125px] xs:h-[140px] sm:h-[160px] md:h-[165px] lg:h-[190px] pointer-events-none z-0 flex items-end justify-end">
                <Image
                  src={issue.image}
                  alt={issue.imgAlt}
                  width={360}
                  height={360}
                  className="w-full h-full object-contain object-bottom-right group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
                  priority
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
