"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function VideoRecoverySection() {
  const locale = useLocale();
  const isHindi = locale === "hi";

  return (
    <section
      aria-label="Recovery Starts Today"
      className="w-full bg-[#fdfbf7] sm:bg-white pt-3 pb-3 sm:pt-6 sm:pb-6 px-3 sm:px-6 md:px-8"
    >
      {/* 
        Video Card Container:
        - Web view height: 400px (md:h-[400px])
        - Mobile view height: 448px (h-[448px])
        - Left & Right spacing: max-w-6xl mx-auto
        - Radius: 6px (rounded-[6px])
      */}
      <div className="relative w-full max-w-6xl mx-auto h-[448px] md:h-[400px] rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.18)] bg-[#000000] select-none">
        {/* Background Looping Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-[1.01]"
        >
          <source
            src="https://res.cloudinary.com/rehabpath/video/upload/c_fill,w_1512,ar_16:9/v1706031321/assets/recovery_home_hero.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Gradient Overlay (Pure black gradient from bottom for crystal-clear readability) */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 via-45% to-black/25 pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Overlay (Positioned bottom-left matching reference layout) */}
        <div className="relative z-10 flex flex-col justify-end p-5 xs:p-6 sm:p-8 md:p-10 h-full">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-xs text-[#e9e315] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3.5 border border-white/20 w-fit opacity-0">
            <span>India&apos;s Men&apos;s Sexual Health Platform</span>
            <span className="text-white/40">•</span>
            <span>Trusted by 1K+ Men</span>
          </div>

          {/* Headline - Communicating Men's Sexual Health + Porn & Masturbation focus */}
          <h1
            className="text-white text-[30px] xs:text-[28px] sm:text-[34px] md:text-[38px] leading-[1.2] tracking-tight mb-2 sm:mb-3 max-w-2xl drop-shadow-[0_3px_14px_rgba(0,0,0,0.7)] font-bold"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {isHindi ? (
              <>
                मेंस सेक्सुअल हेल्थ: <span className="font-light text-white/95">पोर्न और मास्टर्बेशन की आदतों से मुक्ति।</span>
              </>
            ) : (
              <>
                Men&apos;s Sexual Health Platform.{" "}
                <span className="block font-normal text-white/95 text-[18px] xs:text-[18px] sm:text-[18px] md:text-[24px] mt-0.5">
                  Confidential support for porn &amp; masturbation habits.
                </span>
              </>
            )}
          </h1>

          {/* Subtitle - Clarifying human-guided sessions & no judgment */}
          <p className="text-white/80 text-[13px] sm:text-[15px] max-w-xl mb-3 sm:mb-4 leading-relaxed font-normal opacity-0 absolute top-0">
            {isHindi
              ? "AxoMen पर 1-ऑन-1 पर्सनल रिकवरी सेशन्स के साथ अपनी आदतों पर फिर से नियंत्रण पाएं — बिना किसी शर्म या जजमेंट के।"
              : "Practical, human-guided 1-on-1 sessions to help you manage sexual urges and break compulsive habit loops. 100% confidential. No judgment."}
          </p>

          {/* ── Treatment CTA Banner (Single-line on mobile & desktop) ── */}
          <div className="w-full max-w-full md:max-w-xl mt-1 sm:mt-2 px-0">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-black/8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-200 px-3 sm:px-5 md:px-6 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
              {/* Left: Indicator Bar + Text */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
                <span
                  className="w-1 sm:w-1.5 h-5 sm:h-7 rounded-full bg-[#1a5bd9] shrink-0"
                  aria-hidden
                />
                <Link
                  href="/how-it-works"
                  className="text-[#292D32] hover:text-[#1a5bd9] text-[11px] xs:text-xs sm:text-[13.5px] font-semibold whitespace-nowrap truncate underline decoration-gray-300 underline-offset-4"
                >
                  See how it works
                </Link>
              </div>

              {/* Right: Primary Action Button */}
              <Link
                href="/booking"
                id="hero-explore-sessions-btn"
                className="shrink-0 inline-flex items-center gap-1.5 sm:gap-2 bg-[#1a5bd9] hover:bg-[#154bb3] active:scale-[0.97] text-white text-[11px] xs:text-[12px] sm:text-xs md:text-sm font-bold px-3 sm:px-4 md:px-5 py-2.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl shadow-[0_2px_12px_rgba(26,91,217,0.35)] hover:shadow-[0_4px_16px_rgba(26,91,217,0.5)] transition-all duration-200 whitespace-nowrap"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                <span>Start Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
