"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const TEAL = "#009EC7";
const YELLOW = "#FFE135";
const BG = "#0c1829";

export default function MemberPlatformSection() {
  const t = useTranslations("memberPlatform");

  return (
    <section className="w-full relative overflow-hidden" style={{ background: BG }}>
      <div className="relative max-w-2xl mx-auto px-5 sm:px-10 py-12 sm:py-18 flex flex-col items-center text-center">
        <h2
          className="uppercase leading-tight mb-5 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(1.1rem, 4vw, 2.4rem)",
            letterSpacing: "0.04em",
            color: "#ffffff",
          }}
        >
          <span style={{ color: YELLOW }}>{t("headingHighlight1")}</span>{" "}
          {t("headingMiddle")}{" "}
          <span style={{ color: TEAL }}>{t("headingHighlight2")}</span>
        </h2>

        <Link
          href="/join"
          className="group inline-flex items-center gap-3 text-white font-extrabold uppercase tracking-[0.08em] px-10 py-[15px] rounded-sm transition-all duration-200 active:scale-[0.97]"
          style={{
            fontSize: "clamp(12.5px, 2vw, 13.5px)",
            background: TEAL,
            boxShadow: `0 8px 40px ${TEAL}44, 0 2px 10px ${TEAL}28`,
          }}
        >
          {t("cta")}
          <svg
            className="group-hover:translate-x-1 transition-transform duration-200 shrink-0"
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div
        aria-hidden
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${TEAL}55 0%, ${YELLOW}55 100%)` }}
      />
    </section>
  );
}
