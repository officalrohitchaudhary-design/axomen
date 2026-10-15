"use client";

import type { Metadata } from "next";
import { useTranslations } from "next-intl";

const timeline = [
  {
    key: "2019",
    color: "#f59e0b",
  },
  {
    key: "2020",
    color: "#e11d48",
  },
  {
    key: "2021",
    color: "#059669",
  },
  {
    key: "today",
    color: "#27849d",
  },
];

const ACCENT_COLORS = ["#c0392b", "#1e3a5f", "#065f46", "#7c3aed", "#b45309"];

export default function AboutPage() {
  const t = useTranslations("aboutPage");

  const stats = [
    { num: t("stats.stat1Num"), label: t("stats.stat1Label") },
    { num: t("stats.stat2Num"), label: t("stats.stat2Label") },
    { num: t("stats.stat3Num"), label: t("stats.stat3Label") },
  ];

  return (
    <main className="w-full bg-white">

      {/* ── Hero ── */}
      <section className="w-full bg-[#1a1a2e] pt-16 pb-20 px-5 sm:px-8 overflow-hidden relative">
        {/* subtle dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />
        <div className="relative max-w-4xl mx-auto">
          <p
            className="text-[#fbe400] text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("hero.eyebrow")}
          </p>
          <h1
            className="text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.92] text-white uppercase"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("hero.titlePart1")}<br />
            <span className="text-[#fbe400]">{t("hero.titlePart2")}</span>
          </h1>
          <p
            className="mt-6 text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("hero.subtitle")}
          </p>

          {/* India stripe accent */}
          <div className="flex gap-1 mt-10">
            <span className="h-1 w-12 rounded-full bg-[#ff9933]" />
            <span className="h-1 w-12 rounded-full bg-white" />
            <span className="h-1 w-12 rounded-full bg-[#138808]" />
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section className="w-full bg-[#fbe400] px-5 sm:px-8 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-[clamp(1.2rem,3.5vw,2rem)] font-black text-[#1a1a2e] leading-snug"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("pullQuote.text")}
          </p>
          <p
            className="mt-3 text-[#1a1a2e]/50 text-xs sm:text-sm font-semibold uppercase tracking-widest"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("pullQuote.author")}
          </p>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="w-full px-5 sm:px-8 py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-[#1a1e2e]/40 text-xs font-black uppercase tracking-[0.3em] mb-12"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("journey.eyebrow")}
          </p>

          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="absolute left-[2.1rem] sm:left-[2.6rem] top-3 bottom-3 w-px bg-gray-100" aria-hidden />

            {timeline.map((item, i) => (
              <div key={i} className="relative flex gap-6 sm:gap-10 pb-14 last:pb-0">

                {/* Year bubble */}
                <div className="shrink-0 flex flex-col items-center gap-2 z-10">
                  <div
                    className="w-[4.2rem] sm:w-[5.2rem] h-[4.2rem] sm:h-[5.2rem] rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: item.color + "18", border: `2px solid ${item.color}30` }}
                  >
                    <span
                      className="text-sm sm:text-base font-black leading-none"
                      style={{
                        fontFamily: "var(--font-anton), Impact, sans-serif",
                        color: item.color,
                      }}
                    >
                      {t(`journey.timeline.${item.key}.year`)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3 sm:pt-4">
                  <p
                    className="text-xs font-black uppercase tracking-[0.22em] mb-2"
                    style={{ color: item.color, fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {t(`journey.timeline.${item.key}.label`)}
                  </p>
                  <p
                    className="text-[#374151] text-sm sm:text-[1.05rem] leading-[1.85]"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {t(`journey.timeline.${item.key}.content`)}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stat strip ── */}
      <section className="w-full bg-[#f9fafb] border-y border-gray-100 px-5 sm:px-8 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                className="text-[clamp(2rem,6vw,3.5rem)] leading-none text-[#1a1a2e]"
                style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
              >
                {s.num}
              </span>
              <p
                className="text-gray-400 text-xs sm:text-sm font-medium leading-snug"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="w-full px-5 sm:px-8 py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-1 mb-8">
            <span className="h-1 w-8 rounded-full bg-[#ff9933]" />
            <span className="h-1 w-8 rounded-full bg-white border border-gray-200" />
            <span className="h-1 w-8 rounded-full bg-[#138808]" />
          </div>
          <h2
            className="text-[clamp(1.8rem,5vw,3.5rem)] leading-[1.05] text-[#1a1a2e] uppercase mb-8"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("mission.title")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: t("mission.value1Title"),
                body: t("mission.value1Body"),
                accent: "#fbe400",
              },
              {
                title: t("mission.value2Title"),
                body: t("mission.value2Body"),
                accent: "#27849d",
              },
              {
                title: t("mission.value3Title"),
                body: t("mission.value3Body"),
                accent: "#ff9933",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-[#f9fafb] p-6 flex flex-col gap-3"
              >
                <span
                  className="inline-block h-1 w-10 rounded-full"
                  style={{ backgroundColor: v.accent }}
                />
                <h3
                  className="text-[#1a1a2e] text-lg font-black"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="w-full bg-[#1a1a2e] px-5 sm:px-8 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2
            className="text-[clamp(1.8rem,5vw,3.8rem)] leading-[0.95] text-white uppercase"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("bottomCta.titlePart1")}<br />
            <span className="text-[#fbe400]">{t("bottomCta.titlePart2")}</span>
          </h2>
          <p
            className="text-white/55 text-sm sm:text-base max-w-md leading-relaxed"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("bottomCta.subtitle")}
          </p>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#fbe400] hover:bg-[#f5d800] text-[#1a1a2e] font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("bottomCta.button")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

    </main>
  );
}
