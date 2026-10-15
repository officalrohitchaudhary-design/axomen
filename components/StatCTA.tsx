"use client";

import { useTranslations } from "next-intl";

export default function StatCTA() {
  const t = useTranslations("statCta");

  return (
    <section className="w-full bg-[#16aee2] py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-12">

        <div className="flex flex-col items-center text-center gap-4">
          <h2
            className="text-white text-[clamp(1.5rem,5.5vw,3.75rem)] leading-[1.05] uppercase sm:whitespace-nowrap"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("heading")}{" "}
            <span className="relative inline-block">
              {t("headingHighlight")}
              <span
                className="absolute -bottom-1 left-0 w-full h-[4px] rounded-full bg-[#e9e313]"
                aria-hidden
              />
            </span>
          </h2>

          <p
            className="text-white/95 text-sm sm:text-lg max-w-lg leading-relaxed"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("subtitleIntro")}{" "}
            <span className="text-[#0a1128] font-extrabold bg-[#e9e313] px-1.5 py-0.5 rounded-sm">{t("subtitleBigger")}</span>. {t("subtitleIntro")}{" "}
            <span className="text-[#0a1128] font-extrabold bg-[#e9e313] px-1.5 py-0.5 rounded-sm">{t("subtitleGrowing")}</span>. {t("subtitleIntro")}{" "}
            <span className="text-white font-bold">{t("subtitleAffecting")}</span> {t("subtitleSuffix")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">

          <div className="relative overflow-hidden rounded-2xl border border-black/30 bg-[#0a1128] p-4 sm:p-7 flex flex-col gap-3 sm:gap-4 shadow-2xl">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-[#16aee2] flex items-center justify-center shrink-0 shadow-sm">
              <svg width="17" height="17" className="sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            </div>

            <div className="flex items-end leading-none">
              <span
                className="text-white text-[clamp(1.8rem,6.5vw,5rem)] leading-none"
                style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
              >
                883.34
              </span>
              <span
                className="text-[#e9e313] text-[clamp(1.8rem,6.5vw,5rem)] leading-none"
                style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
              >
                M
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <p
                className="text-white font-bold text-xs sm:text-base leading-snug"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("stat1Label")}
              </p>
              <p
                className="text-white/60 font-semibold text-xs sm:text-sm"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("stat1Sub")}
              </p>
            </div>

            <span
              className="self-start hidden sm:inline-flex items-center gap-2 border border-white/20 text-white/60 text-[0.6rem] uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {t("stat1Tag")}
            </span>

            <div className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-10 bg-white blur-3xl" aria-hidden />
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-black/30 bg-[#0a1128] p-4 sm:p-7 flex flex-col gap-3 sm:gap-4 shadow-2xl">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-[#16aee2] flex items-center justify-center shrink-0 shadow-sm">
              <svg width="17" height="17" className="sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>

            <div className="flex items-baseline leading-none gap-1">
              <span
                className="text-white text-[clamp(1.8rem,6.5vw,5rem)] leading-none"
                style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
              >
                3
              </span>
              <span
                className="text-[#e9e313] text-[clamp(1rem,3vw,2.5rem)] leading-none font-bold"
                style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
              >
                RD
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <p
                className="text-white font-bold text-xs sm:text-base leading-snug"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("stat2Label")}
              </p>
              <p
                className="text-white/60 font-semibold text-xs sm:text-sm"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("stat2Sub")}
              </p>
            </div>

            <span
              className="self-start hidden sm:inline-flex items-center gap-2 border border-white/20 text-white/60 text-[0.6rem] uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {t("stat2Tag")}
            </span>

            <div className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-10 bg-white blur-3xl" aria-hidden />
          </div>

        </div>

      </div>
    </section>
  );
}
