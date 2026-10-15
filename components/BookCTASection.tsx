"use client";

import Image from "next/image";
import { BOOKS } from "@/lib/booksData";
import { useTranslations } from "next-intl";

const previewBooks = BOOKS.slice(0, 3);

export default function BookCTASection() {
  const t = useTranslations("bookCTASection");

  return (
    <section className="relative w-full overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-fixed"
        style={{ backgroundImage: "url('/image/parallax-banner-1.webp')" }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-12">

        {/* Left — text block */}
        <div className="flex flex-col gap-4 sm:max-w-[55%]">
          {/* Headline */}
          <h2
            className="text-[#0f0f0f] text-[clamp(1.6rem,4.5vw,3rem)] leading-[1.05] uppercase"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("headlinePart1")}{" "}
            <br className="hidden sm:block" />
            <span className="text-[#c0392b]">{t("headlinePart2")}</span>{" "}
            <br className="hidden sm:block" />
            <span className="text-[#8e76fe]">{t("headlinePart3")}</span>
          </h2>

          {/* Sub-text */}
          <p
            className="text-[#0f0f0f]/80 text-sm sm:text-[15px] leading-relaxed font-semibold max-w-md"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("subtitle")}
          </p>

          {/* Mini proof strip */}
          <div className="flex items-center gap-4 flex-wrap">
            {[t("tags.pages"), t("tags.science"), t("tags.languages")].map((tag) => (
              <span
                key={tag}
                className="text-[#0f0f0f]/60 text-[10px] font-black uppercase tracking-[0.2em] border border-[#0f0f0f]/30 px-2.5 py-1"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — 3 book covers */}
        <div className="flex items-end justify-center gap-3 sm:gap-4 shrink-0">
          {previewBooks.map((book, i) => {
            const rotations = ["-rotate-6", "rotate-0", "rotate-6"];
            const zIndexes = ["z-10", "z-20", "z-10"];
            const translateY = ["translate-y-4", "translate-y-0", "translate-y-4"];

            return (
              <div
                key={book.id}
                className={`relative ${rotations[i]} ${zIndexes[i]} ${translateY[i]} transition-transform duration-300 hover:rotate-0 hover:-translate-y-2 hover:z-30`}
                style={{
                  filter: "drop-shadow(4px 8px 16px rgba(0,0,0,0.28))",
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "clamp(80px, 12vw, 120px)",
                    aspectRatio: "2/3",
                    backgroundColor: book.coverBg,
                    border: "3px solid white",
                  }}
                >
                  {book.coverUrl ? (
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="120px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      <p
                        className="text-white text-[9px] font-bold text-center leading-tight line-clamp-3 px-1"
                        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                      >
                        {book.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
