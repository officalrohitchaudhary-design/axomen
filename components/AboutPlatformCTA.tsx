"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutPlatformCTA() {
  const t = useTranslations("aboutPlatformCta");

  return (
    <section className="w-full bg-white pt-20 pb-6 sm:pt-24 sm:pb-8 md:pt-28 md:pb-12 px-4 sm:px-6 lg:px-8">
      {/* 
        Our Mission Card:
        - Wide mobile-app squircle capsule
        - Soft pastel green (#9deab2)
        - Playful floating geometric white shapes (pluses, circles, diamonds)
        - 3D Mascot character peeking & gripping top-right border ("pakde hue")
        - Single <p> tag with all content together
      */}
      <div className="relative max-w-4xl lg:max-w-5xl mx-auto">
        {/* ── 3D Character Holding Top Right Border ("Pakde hue") ──────────────── */}
        <div className="absolute top-0 right-5 xs:right-7 sm:right-10 md:right-14 lg:right-16 -translate-y-[85.2%] z-20 pointer-events-none w-24 xs:w-28 sm:w-36 md:w-44 lg:w-48">
          <Image
            src="/image/our-mission.png"
            alt="Our Mission mascot"
            width={350}
            height={325}
            priority
            className="w-full h-auto drop-shadow-[0_8px_16px_rgba(10,53,40,0.16)] select-none"
          />
        </div>

        {/* ── The Green Squircle Card ────────────────────────────────────────── */}
        <div className="relative bg-[#9deab2] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] px-5 py-7 sm:px-10 sm:py-11 md:py-13 text-center shadow-[0_6px_28px_rgba(10,53,40,0.06)] border border-[#0a3528]/10 select-none">
          {/* Inner container to clip geometric decorative elements to the rounded corners */}
          <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden pointer-events-none">
            {/* Large White Plus */}
            <div className="absolute left-3 sm:left-6 top-6 sm:top-8 pointer-events-none opacity-90 z-0">
              <svg
                width="38"
                height="38"
                viewBox="0 0 44 44"
                fill="white"
                className="sm:w-11 sm:h-11"
                aria-hidden="true"
              >
                <path
                  d="M22 6C23.6569 6 25 7.34315 25 9V19H35C36.6569 19 38 20.3431 38 22C38 23.6569 36.6569 25 35 25H25V35C25 36.6569 23.6569 38 22 38C20.3431 38 19 36.6569 19 35V25H9C7.34315 25 6 23.6569 6 22C6 20.3431 7.34315 19 9 19H19V9C19 7.34315 20.3431 6 22 6Z"
                  fill="white"
                />
              </svg>
            </div>

            {/* Small floating diamond near top left */}
            <div
              className="absolute left-16 sm:left-24 top-4 sm:top-5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white/70 rotate-45 rounded-[2px] pointer-events-none z-0"
              aria-hidden="true"
            />

            {/* Soft white bubbles bottom-left */}
            <div className="absolute left-4 sm:left-8 bottom-3 sm:bottom-4 flex items-end gap-1.5 pointer-events-none z-0">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/80" />
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white/50 mb-1" />
            </div>

            {/* Large White Plus on right */}
            <div className="absolute right-3 sm:right-7 bottom-4 sm:bottom-6 pointer-events-none opacity-90 z-0">
              <svg
                width="34"
                height="34"
                viewBox="0 0 44 44"
                fill="white"
                className="sm:w-10 sm:h-10"
                aria-hidden="true"
              >
                <path
                  d="M22 6C23.6569 6 25 7.34315 25 9V19H35C36.6569 19 38 20.3431 38 22C38 23.6569 36.6569 25 35 25H25V35C25 36.6569 23.6569 38 22 38C20.3431 38 19 36.6569 19 35V25H9C7.34315 25 6 23.6569 6 22C6 20.3431 7.34315 19 9 19H19V9C19 7.34315 20.3431 6 22 6Z"
                  fill="white"
                />
              </svg>
            </div>

            {/* Tiny diamond bottom-right */}
            <div
              className="absolute right-16 sm:right-24 bottom-3 sm:bottom-4 w-3 h-3 bg-white/60 rotate-45 rounded-[1px] pointer-events-none z-0"
              aria-hidden="true"
            />
          </div>

          {/* ── Center Mission Content ───────────────────────────────────────── */}
          <div className="relative z-10 max-w-3xl mx-auto px-2 sm:px-6">
            {/* Mission Label */}
            <span
              className="inline-block text-[12px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#0a3528]/80 mb-2 sm:mb-3"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Our Mission
            </span>

            {/* Single <p> tag with all content together, 14px on mobile, first sentence font-semibold (600) */}
            <p
              className="text-[14px] sm:text-base md:text-[17px] font-normal leading-relaxed sm:leading-relaxed text-[#0a3528]"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              <span className="font-semibold">
                Founded with one clear intention: to help Indians who want to quit porn
                and masturbation habits but don’t know where to START.
              </span>{" "}
              Many young and middle-class Indians struggle in silence because of shame
              and fear. AxoMen makes it easier to talk, get guidance, and seek
              private recovery support. Because asking for help should never be shameful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
