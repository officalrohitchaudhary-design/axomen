"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { BOOKS, getBookCover } from "@/lib/booksData";

const books = BOOKS.slice(0, 4);

export default function BooksGridSection() {
  const t = useTranslations("books");
  const uiLang = useLocale();

  return (
    <section className="w-full bg-[#f4f1ec] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        <div className="flex items-end justify-between">
          <h2
            className="text-[#0f0f0f] text-[clamp(1.4rem,3.5vw,2.4rem)] leading-[1.05] uppercase"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("heading")} <span className="text-[#16aee2]">{t("headingHighlight")}</span>
          </h2>
          <Link
            href="/books"
            className="inline-flex items-center gap-1.5 text-[#0f0f0f]/50 hover:text-[#16aee2] text-xs font-black uppercase tracking-[0.2em] transition-colors duration-200"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("viewAll")}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {books.map((book) => {
            const coverUrl = getBookCover(book, uiLang);
            return (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className="group flex flex-col gap-3"
              >
                <div className="relative w-full aspect-[2/3] overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  {book.badge && (
                    <span
                      className="absolute top-2 left-2 z-10 bg-[#e9e313] text-[#0a1128] text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 shadow-sm"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                    >
                      {book.badge}
                    </span>
                  )}
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={book.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      sizes="(max-width: 640px) 45vw, 25vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4"
                      style={{ backgroundColor: book.coverBg }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" aria-hidden>
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      <p
                        className="text-white text-[11px] font-bold text-center leading-snug line-clamp-4"
                        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                      >
                        {book.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <p
                    className="text-[#0f0f0f] text-sm font-black leading-snug line-clamp-2 group-hover:text-[#16aee2] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {book.title}
                  </p>
                  <p
                    className="text-[#0f0f0f]/45 text-[11px] font-semibold truncate"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {book.author}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 border border-[#0f0f0f]/20 hover:border-[#16aee2] hover:bg-[#16aee2] hover:text-white text-[#0f0f0f]/80 text-xs font-black uppercase tracking-[0.2em] px-6 py-3 transition-all duration-200"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("viewMore")}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
