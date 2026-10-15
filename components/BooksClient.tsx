"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BOOKS, getBookCover, type Book } from "@/lib/booksData";
import { useTranslations } from "next-intl";

/* ── Helpers ─────────────────────────────────────────────────────────── */

function useUiLang() {
  const [uiLang, setUiLang] = useState("en");

  useEffect(() => {
    setUiLang(localStorage.getItem("hyi-lang") ?? "en");

    const handler = (e: Event) => {
      setUiLang((e as CustomEvent<{ code: string }>).detail.code);
    };
    window.addEventListener("hyi:lang-picked", handler);
    return () => window.removeEventListener("hyi:lang-picked", handler);
  }, []);

  return uiLang;
}

/* ── Star Rating ─────────────────────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-[11px] font-semibold text-gray-500 ml-0.5">{rating}</span>
    </div>
  );
}

/* ── Book Card ───────────────────────────────────────────────────────── */

function BookCard({ book, uiLang }: { book: Book; uiLang: string }) {
  const coverUrl = getBookCover(book, uiLang);
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <Link
      href={`/books/${book.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover */}
      <div
        className="relative w-full aspect-[2/3] overflow-hidden"
        style={{ backgroundColor: book.coverBg }}
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={book.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 47vw, (max-width: 1024px) 30vw, 22vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="w-16 h-20 sm:w-20 sm:h-26 bg-white/15 rounded-lg flex items-center justify-center mb-3 shadow-inner">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <line x1="12" y1="6" x2="16" y2="6" />
                <line x1="12" y1="10" x2="16" y2="10" />
                <line x1="12" y1="14" x2="16" y2="14" />
              </svg>
            </div>
            <p
              className="text-white/90 text-xs text-center font-bold leading-snug px-2 line-clamp-2"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {book.title}
            </p>
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-2.5 right-2.5 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            -{discount}%
          </span>
        )}

        {/* Shelf badge */}
        {book.badge && (
          <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-6 pb-2 px-3">
            <span className="inline-block bg-[#fbe400] text-[#1a1a2e] text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
              {book.badge}
            </span>
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-3 sm:p-4 flex-1">
        <div>
          <h3
            className="font-bold text-[#1a1a2e] text-sm sm:text-[15px] leading-snug line-clamp-2 group-hover:text-[#27849d] transition-colors"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {book.title}
          </h3>
          <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5 truncate">{book.author}</p>
        </div>

        <StarRating rating={book.rating} />

        {/* <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2 hidden sm:block">
          {book.description}
        </p> */}

        {/* Price row */}
        {/* <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-[#1a1a2e] font-extrabold text-base sm:text-lg"
              style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
            >
              ₹{book.price}
            </span>
            <span className="text-gray-400 text-xs line-through">₹{book.originalPrice}</span>
          </div>
        </div> */}

        {/* Buy button */}
        {/* <button
          className="w-full bg-[#1a1a2e] hover:bg-[#fbe400] text-white hover:text-[#1a1a2e] text-xs font-bold tracking-wide uppercase py-2.5 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 mt-1"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/books/${book.slug}`;
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Buy Now
        </button> */}
      </div>
    </Link>
  );
}

/* ── Main Client Component ───────────────────────────────────────────── */

export default function BooksClient() {
  const uiLang = useUiLang();
  const t = useTranslations("booksPage");

  return (
    <div className="min-h-screen bg-[#f8f7f4]">

      {/* ── Books Grid ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-14">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2
              className="text-[#1a1a2e] text-xl sm:text-2xl font-extrabold"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {t("allBooks")}
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              {t("booksAvailable", { count: BOOKS.length })}
            </p>
          </div>

          {/* Sort pill (cosmetic) */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-500 shadow-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            {t("bestsellersFirst")}
          </div>
        </div>

        {/* Grid: 2 cols mobile, 3 cols md, 4 cols lg */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {BOOKS.map((book) => (
            <BookCard key={book.id} book={book} uiLang={uiLang} />
          ))}
        </div>
      </section>


    </div>
  );
}
