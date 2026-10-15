"use client";

import { useTranslations } from "next-intl";

export default function QuoteSection() {
  const t = useTranslations("quoteSection");

  return (
    <section
      id="life-quote"
      className="relative w-full overflow-hidden bg-white py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 "
    >
      {/* Subtle paper dot-matrix watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #0f0f0f 0.9px, transparent 0.9px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      {/* Large decorative quotation watermark */}
      <div
        className="absolute right-4 sm:right-12 -bottom-6 sm:-bottom-10 text-[140px] sm:text-[220px] font-serif font-black text-[#0f0f0f]/[0.03] select-none pointer-events-none leading-none"
        aria-hidden
      >
        ”
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-7">

        {/* Top badge with highlighter pen icon */}


        {/* Highlighted Quote like in a book with highlighter marker */}
        <blockquote className="max-w-3xl my-1 sm:my-2">
          <p
            className="text-xl sm:text-2xl md:text-[30px] lg:text-[34px] font-black leading-[1.5] sm:leading-[1.55] tracking-tight text-[#0a1128]"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            <mark
              className="inline text-[#0a1128] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-sm font-black"
              style={{
                backgroundColor: "#e9e313",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
                lineHeight: "1.6",
              }}
            >
              “{t("quotePart1")} {t("quoteHighlight")}”
            </mark>
          </p>
        </blockquote>

        {/* Clean divider */}
        <div className="flex items-center gap-2.5 w-32 justify-center" aria-hidden>
          <span className="h-[2px] w-8 bg-[#0a1128]/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#16aee2]" />
          <span className="h-[2px] w-8 bg-[#0a1128]/20" />
        </div>

        {/* Author Attribution */}
        <div className="flex items-center gap-3.5">
          <div
            className="w-10 h-10 rounded-full bg-[#0a1128] text-[#e9e313] font-black text-xs flex items-center justify-center border-2 border-[#16aee2] shadow-[2px_2px_0px_#0a1128] shrink-0"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            aria-hidden
          >
            AA
          </div>

          <div className="flex flex-col text-left">
            <cite
              className="not-italic text-[#0f0f0f] text-sm sm:text-base font-black uppercase tracking-wider"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {t("author")}
            </cite>
            <span
              className="text-[#0f0f0f]/60 text-[11px] sm:text-xs font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {t("authorSub")}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
