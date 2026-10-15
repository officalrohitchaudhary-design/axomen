"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const photos = [
  { src: "/image/image1.gif", alt: "Young India 1", rotate: "-rotate-3" },
  { src: "/image/image2.gif", alt: "Young India 2", rotate: "rotate-2" },
  { src: "/image/image3.gif", alt: "Young India 3", rotate: "-rotate-1" },
  { src: "/image/image4.gif", alt: "Young India 4", rotate: "rotate-3" },
];

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative w-full overflow-hidden bg-[#f2ece0] flex flex-col"

    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #c8b89a 1.2px, transparent 1.2px)`,
          backgroundSize: "28px 28px",
          opacity: 0.45,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-between sm:justify-center flex-1 h-full w-full px-3 py-2 sm:px-6 sm:py-4 md:px-8 md:pt-8 md:pb-6">

        {/* <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 px-2 sm:px-4 w-full justify-items-center items-center">
            {photos.map((photo, i) => (
              <div
                key={i}
                className={`${photo.rotate} transition-transform duration-300 hover:rotate-0 hover:scale-105 w-full flex justify-center`}
              >
                <div
                  className="bg-white shadow-[4px_4px_16px_rgba(0,0,0,0.15)] sm:shadow-[6px_6px_20px_rgba(0,0,0,0.18)] rounded-sm overflow-hidden w-full"
                  style={{
                    maxWidth: "var(--hero-card-max-w)",
                    maxHeight: "var(--hero-card-max-h)",
                  }}
                >
                  <div className="relative w-full aspect-[3/4]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      unoptimized
                      priority={i < 2}
                      loading="eager"
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 23vw, 260px"
                    />
                  </div>
                  <div className="h-3 sm:h-4 md:h-5 bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-end gap-2 sm:gap-3">
          <Link
            href="/session"
            prefetch={false}
            className="inline-block bg-[#c0392b] text-white px-4 sm:px-6 py-1.5 sm:py-2 uppercase tracking-wide -rotate-2 shadow-md transition-colors duration-200"
            style={{
              fontFamily: "var(--font-anton), Impact, sans-serif",
              fontSize: "clamp(0.8rem, 1.8vw, 1.25rem)",
            }}
          >
            {t("pornFreeIndia")}
          </Link>
          <Link
            href="/session"
            prefetch={false}
            className="inline-block  bg-[#e8632a] hover:bg-[#d4541e] text-white px-4 sm:px-6 py-1.5 sm:py-2 uppercase tracking-wide rotate-1 shadow-md"
            style={{
              fontFamily: "var(--font-anton), Impact, sans-serif",
              fontSize: "clamp(0.8rem, 1.8vw, 1.25rem)",
            }}
          >
            {t("joinNow")}

          </Link>
        </div> */}

        <div className="w-full mt-2 sm:mt-4 md:mt-6 px-3 sm:px-5 lg:px-10">
          <h1
            className="text-[clamp(2rem,5.5vw,7rem)] leading-[1.02] md:leading-[0.88] tracking-[-0.02em] uppercase text-center"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            <span className="text-[#c0392b] block mb-1 sm:mb-2 md:mb-3">{t("headlinePart1")}</span>
            <span className="text-[#0f0f0f] md:inline block"> {t("headlinePart2")}</span>
          </h1>

          {/* ── Treatment CTA Banner (Single-line on mobile & desktop) ── */}
          {/* <div className="w-full max-w-full md:max-w-2xl mx-auto mt-2 sm:mt-4 md:mt-6 px-0 mt-5">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-black/8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-200 px-3 sm:px-5 md:px-6 py-1.5 xs:py-2 sm:py-3 md:py-3.5 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">

              <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
                <span
                  className="w-1 sm:w-1.5 h-5 sm:h-7 rounded-full bg-[#134fc1] shrink-0"
                  aria-hidden
                />
                <p
                  className="text-[#1a1a2e] text-[11px] xs:text-xs sm:text-[15px] md:text-base font-bold whitespace-nowrap truncate leading-none"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {t("treatmentPrompt")}
                </p>
              </div>

              <Link
                href="/session"
                prefetch={false}
                className="shrink-0 inline-flex items-center gap-1.5 sm:gap-2 bg-[#134fc1] hover:bg-[#0e3da1] active:scale-[0.97] text-white text-[10.5px] xs:text-[11.5px] sm:text-xs md:text-sm font-bold px-2.5 sm:px-4 md:px-5 py-3 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap group"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                <span>{t("treatmentButton")}</span>

              </Link>

            </div>
          </div> */}
        </div>


      </div>
    </section>
  );
}
