"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function HabitLoopSection() {
  const t = useTranslations("habitLoop");
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no">("yes");


  return (
    <section
      id="habit-connection"
      className="relative w-full overflow-hidden py-10 sm:py-14 md:py-16 px-4 sm:px-6"
      style={{ backgroundColor: "#134fc1" }}
    >
      {/* Background dot-matrix pattern matching site aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.22) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      {/* Subtle depth lighting */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-900/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">

        {/* ── Heading block ── */}
        <div className="flex flex-col items-center text-center gap-2.5">
          {/* <span
            className="inline-flex items-center gap-2 bg-[#fbe400] text-[#0f0f0f] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.08em] px-3.5 py-1.5 border-2 border-[#0f0f0f] shadow-[3px_3px_0px_#0f0f0f]"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#c0392b] animate-pulse" />
            {t("badge")}
          </span> */}

          <h2
            className="text-white text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.94] uppercase tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("titlePart1")}{" "}
            <span className="text-[#fbe400] inline-block">{t("titlePart2")}</span>
          </h2>
        </div>

        {/* ── Interactive Question Card ── */}
        <div
          className="w-full bg-[#0a3591] border-2 border-[#0f0f0f] shadow-[6px_6px_0px_#0f0f0f] p-5 sm:p-6 md:p-7 flex flex-col items-center text-center gap-3.5"
        >
          <div className="flex items-center gap-2 text-[#fbe400] text-xs sm:text-sm font-black uppercase tracking-wider">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Ask Yourself</span>
          </div>

          <h3
            className="text-white text-xl sm:text-2xl md:text-3xl font-black leading-tight max-w-2xl"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("question")}
          </h3>

          <p
            className="text-white/80 text-xs sm:text-sm max-w-lg font-medium"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("questionPrompt")}
          </p>

          {/* Yes / No Selector Buttons */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full max-w-md pt-1">
            <button
              type="button"
              id="habit-poll-yes"
              onClick={() => setSelectedAnswer("yes")}
              className={`group relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 font-black text-base sm:text-lg uppercase tracking-wider transition-all duration-200 border-2 cursor-pointer ${selectedAnswer === "yes"
                ? "bg-[#fbe400] text-[#0f0f0f] border-[#0f0f0f] shadow-[5px_5px_0px_#0f0f0f] -translate-x-0.5 -translate-y-0.5 scale-[1.02]"
                : "bg-white/10 hover:bg-white/20 text-white border-white/40 hover:border-white shadow-none"
                }`}
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              aria-pressed={selectedAnswer === "yes"}
            >
              {selectedAnswer === "yes" && (
                <svg className="w-5 h-5 text-[#0f0f0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {t("yesLabel")}
            </button>

            <button
              type="button"
              id="habit-poll-no"
              onClick={() => setSelectedAnswer("no")}
              className={`group relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 font-black text-base sm:text-lg uppercase tracking-wider transition-all duration-200 border-2 cursor-pointer ${selectedAnswer === "no"
                ? "bg-white text-[#0f0f0f] border-[#0f0f0f] shadow-[5px_5px_0px_#0f0f0f] -translate-x-0.5 -translate-y-0.5 scale-[1.02]"
                : "bg-white/10 hover:bg-white/20 text-white border-white/40 hover:border-white shadow-none"
                }`}
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              aria-pressed={selectedAnswer === "no"}
            >
              {selectedAnswer === "no" && (
                <svg className="w-5 h-5 text-[#0f0f0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {t("noLabel")}
            </button>
          </div>
        </div>

        {/* ── Dynamic Breakdown Content (Answer-Based) ── */}
        <div className="flex flex-col gap-5 sm:gap-6 transition-all duration-300">

          {/* Badge indicator */}
          <div className="flex items-center gap-2.5">
            <span
              className={`px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-[#0f0f0f] shadow-[2px_2px_0px_#0f0f0f] ${selectedAnswer === "yes" ? "bg-[#fbe400] text-[#0f0f0f]" : "bg-white text-[#0f0f0f]"
                }`}
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {selectedAnswer === "yes" ? t("ifYouChoseYes") : t("ifYouChoseNo")}
            </span>
            <div className="h-[2px] flex-1 bg-white/20" aria-hidden />
          </div>

          {/* 1. Thought quote & neurological explanation card */}
          <div
            className="bg-white border-2 border-[#0f0f0f] shadow-[6px_6px_0px_#0f0f0f] p-4 sm:p-6 flex flex-col gap-4 text-[#0f0f0f]"
          >
            <div>
              <p
                className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0f0f0f]/50 mb-1"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {selectedAnswer === "yes" ? t("yesThinkLabel") : t("noThinkLabel")}
              </p>
              <div className="relative pl-3.5 border-l-4 border-[#134fc1] py-1 bg-blue-50/60 rounded-r-sm">
                <blockquote
                  className="text-base sm:text-xl md:text-2xl font-black text-[#0f0f0f] leading-snug italic"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {selectedAnswer === "yes" ? t("yesQuote") : t("noQuote")}
                </blockquote>
              </div>
            </div>

            <p
              className="text-sm sm:text-base md:text-[17px] leading-relaxed text-[#1a1a2e] font-semibold"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {selectedAnswer === "yes" ? (
                <>
                  If porn and masturbation become a regular habit that you can't control, they can

                  {" "}
                  <span className="bg-[#fbe400] px-1.5 py-0.5 font-black border border-[#0f0f0f]">
                    start affecting important parts of your life — your studies, career, job, goals, health, family, relationships, and  marriage.

                  </span>
                  The longer the habit continues, the harder it can feel to change.
                </>
              ) : (
                <>
                  {t("noExplanation")}
                </>
              )}
            </p>
          </div>

          {/* 2. Small Compact Real-Life Step Loop Diagram (Small Space Design) */}



        </div>

      </div>
    </section>
  );
}
