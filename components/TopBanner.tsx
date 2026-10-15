"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function TopBanner() {
  const t = useTranslations("topBanner");

  return (
    <div className="h-[44px] flex items-stretch bg-[#1c1c1c] overflow-hidden">

      {/* ── Left: label — hidden on mobile ── */}
      <div className="hidden sm:flex items-center px-8 shrink-0 border-r border-white/10">
        <span
          className="text-white text-[12px] font-black tracking-[0.18em] uppercase whitespace-nowrap"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {t("movement")}
        </span>
      </div>

      {/* ── Middle: CTA ── */}
      <Link
        href="/join"
        className="flex flex-1 items-center gap-2 sm:gap-3 px-3 sm:px-8 group hover:bg-white/5 transition-colors duration-200 min-w-0"
      >
        {/* Play circle */}
        <span className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#fbe400] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 12 14" fill="#1a1a2e">
            <path d="M1 1l10 6-10 6V1z" />
          </svg>
        </span>

        {/* Text */}
        <span className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span
            className="text-[#fbe400] text-[10px] sm:text-[12.5px] font-black tracking-[0.12em] sm:tracking-[0.15em] uppercase whitespace-nowrap"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            {t("start")}
          </span>
          <span
            className="text-white text-[10px] sm:text-[12.5px] font-black tracking-[0.02em] sm:tracking-[0.1em] uppercase whitespace-nowrap"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            <span className="sm:hidden">{t("journeyMobile")}</span>
            <span className="hidden sm:inline">{t("journeyDesktop")}</span>
          </span>
        </span>
      </Link>

      {/* ── Right: Become a Member CTA ── */}
      <Link
        href="/join"
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-8 shrink-0 bg-[#fbe400] hover:bg-[#f5d800] transition-colors duration-200"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
        <span
          className="text-[#1a1a2e] text-[10px] sm:text-[13px] font-black tracking-[0.06em] sm:tracking-[0.08em] whitespace-nowrap"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          <span className="sm:hidden">{t("joinMobile")}</span>
          <span className="hidden sm:inline">{t("joinDesktop")}</span>
        </span>
      </Link>
    </div>
  );
}