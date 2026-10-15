"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BOOKS, getBookCover, getBookPdf, type Book } from "@/lib/booksData";
import { useTranslations, useLocale } from "next-intl";

/* ── Star Rating ─────────────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="ml-1 text-xs font-bold text-[#0f0f0f]">{rating}</span>
      <span className="text-xs text-[#0f0f0f]/40 font-medium ml-0.5">({(Math.floor(Math.random() * 500) + 200).toLocaleString()})</span>
    </div>
  );
}

/* ── Edition Pill (Amazon-style) ─────────────────────────────────────── */
type EditionType = "kindle" | "physical";

function EditionPill({
  type, book, active, onClick,
}: { type: EditionType; book: Book; active: boolean; onClick: () => void }) {
  const isKindle = type === "kindle";
  const price = isKindle ? book.kindlePrice : book.price;
  const t = useTranslations("bookDetailPage");

  return (
    <button
      onClick={onClick}
      className="flex-1 text-left p-3 sm:p-4 border-2 rounded-none transition-all duration-150"
      style={{ borderColor: active ? "#0b3d78" : "#d1d5db", backgroundColor: active ? "#f0f6ff" : "#fff" }}
    >
      <p className="text-[11px] sm:text-xs font-black text-[#0f0f0f] uppercase tracking-wide"
        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
        {isKindle ? t("kindleEdition") : t("paperback")}
      </p>
      {isKindle ? (
        <div className="mt-1">
          <p className="text-xs font-bold text-[#0f0f0f]">
            <span className="text-[#e47911] italic font-bold text-[11px]">{t("bookPdf")}</span>
          </p>
          <p className="text-[10px] text-[#0f0f0f]/55 font-medium mt-0.5">{t("orToBuy", { price })}</p>
        </div>
      ) : (
        <p className="mt-1 text-xs font-bold text-[#0f0f0f]">₹{price}.00</p>
      )}
    </button>
  );
}

/* ── Spec Row ────────────────────────────────────────────────────────── */
function SpecItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b border-[#0f0f0f]/6 last:border-0">
      <span className="text-[#0f0f0f]/35 shrink-0">{icon}</span>
      <span className="text-[12px] text-[#0f0f0f]/50 font-semibold shrink-0 w-28"
        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
        {label}:
      </span>
      <span className="text-[12px] text-[#0f0f0f] font-semibold"
        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
        {value}
      </span>
    </div>
  );
}

/* ── Share Button ────────────────────────────────────────────────────── */
function ShareBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="w-8 h-8 rounded-full bg-[#0f0f0f] hover:bg-[#fbe400] flex items-center justify-center text-white hover:text-[#0f0f0f] transition-all duration-150">
      {children}
    </a>
  );
}

/* ── Related Mini Card ───────────────────────────────────────────────── */
function RelatedCard({ book }: { book: Book }) {
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
  const locale = useLocale();
  const coverUrl = getBookCover(book, locale);
  return (
    <Link href={`/books/${book.slug}`}
      className="group flex flex-col gap-2.5 hover:opacity-90 transition-opacity">
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-100"
        style={{ backgroundColor: book.coverBg }}>
        {coverUrl ? (
          <Image src={coverUrl} alt={book.title} fill unoptimized className="object-cover" sizes="160px" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <p className="text-white text-[9px] font-bold text-center leading-tight line-clamp-3"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{book.title}</p>
          </div>
        )}
        {discount > 0 && (
          <span className="absolute top-1.5 left-1.5 bg-[#fbe400] text-[#0f0f0f] text-[8px] font-black px-1.5 py-0.5">
            -{discount}%
          </span>
        )}
      </div>
      <div>
        <p className="text-[12px] font-black text-[#0f0f0f] leading-snug line-clamp-2 group-hover:text-[#c0392b] transition-colors"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{book.title}</p>
        <p className="text-[11px] text-[#0f0f0f]/40 font-semibold mt-0.5 truncate"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{book.author}</p>
        {/* <p className="text-[12px] font-black text-[#0f0f0f] mt-1"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          ₹{book.price}
          <span className="text-[10px] text-[#0f0f0f]/30 font-medium line-through ml-1">₹{book.originalPrice}</span>
        </p> */}
      </div>
    </Link>
  );
}

/* ── Main ────────────────────────────────────────────────────────────── */
export default function BookDetailClient({ slug }: { slug: string }) {
  const book = BOOKS.find((b) => b.slug === slug);
  const [edition, setEdition] = useState<EditionType>("kindle");
  const t = useTranslations("bookDetailPage");
  const locale = useLocale();

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <p className="text-xl font-bold text-gray-400">{t("notFound")}</p>
        <Link href="/books" className="text-sm text-[#0b3d78] font-semibold hover:underline">{t("backToBooks")}</Link>
      </div>
    );
  }

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
  const activePrice = edition === "kindle" ? book.kindlePrice : book.price;
  const activeOriginal = edition === "kindle" ? book.kindleOriginalPrice : book.originalPrice;
  const related = BOOKS.filter((b) => b.id !== book.id &&
    (b.language === book.language || b.tags?.some((t) => book.tags?.includes(t)))).slice(0, 4);

  const shareUrl = `https://axomen.com/books/${book.slug}`;
  const shareText = encodeURIComponent(`Check out "${book.title}" by ${book.author}`);

  const langLabel: Record<string, string> = {
    english: locale === "hi" ? "इंग्लिश" : "English",
    hindi: locale === "hi" ? "हिंदी" : "Hindi",
    tamil: locale === "hi" ? "तमिल" : "Tamil",
    telugu: locale === "hi" ? "तेलुगु" : "Telugu",
    marathi: locale === "hi" ? "मराठी" : "Marathi",
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="border-b border-[#0f0f0f]/8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-[#0f0f0f]/40 font-medium"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          <Link href="/" className="hover:text-[#0b3d78] transition-colors">{locale === "hi" ? "होम" : "Home"}</Link>
          <span>/</span>
          <Link href="/books" className="hover:text-[#0b3d78] transition-colors">{locale === "hi" ? "किताबें" : "Books"}</Link>
          <span>/</span>
          <span className="text-[#0f0f0f]/70 truncate max-w-[160px]">{book.title}</span>
        </div>
      </div>

      {/* ── Main product area ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* ── LEFT: Cover ── */}
          <div className="flex flex-col items-center lg:items-start gap-5 lg:w-[340px] shrink-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full">
              {/* Discount badge */}
              {discount > 0 && (
                <div className="absolute top-3 left-3 z-10 w-10 h-10 rounded-full bg-[#fbe400] flex items-center justify-center">
                  <span className="text-[#0f0f0f] text-[10px] font-black leading-none text-center">
                    -{discount}%
                  </span>
                </div>
              )}

              {/* Cover image */}
              <div className="relative w-full aspect-[2/3] bg-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
                style={{ backgroundColor: book.coverBg }}>
                {getBookCover(book, locale) ? (
                  <Image src={getBookCover(book, locale)} alt={book.title} fill unoptimized
                    className="object-cover" sizes="(max-width:1024px) 80vw, 340px" priority />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white"
                      strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <p className="text-white font-black text-lg text-center leading-snug"
                      style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}>{book.title}</p>
                    <p className="text-white/60 text-sm text-center"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{book.author}</p>
                  </div>
                )}
                {book.badge && (
                  <span className="absolute top-3 right-3 bg-[#fbe400] text-[#0f0f0f] text-[9px] font-black uppercase tracking-wider px-2.5 py-1">
                    {book.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {book.tags.map((tag) => (
                  <span key={tag}
                    className="text-[10px] font-semibold text-[#0f0f0f]/50 border border-[#0f0f0f]/15 px-2 py-0.5"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* Title + rating */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[#0f0f0f] text-[clamp(1.4rem,3.5vw,2.2rem)] leading-[1.1] font-black"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {book.title}
              </h1>
              <p className="text-[#0f0f0f]/55 text-sm font-semibold leading-snug"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {book.description}
              </p>
              <StarRating rating={book.rating} />
            </div>

            {/* Divider */}
            <div className="h-px bg-[#0f0f0f]/8" />

            {/* Price */}
            {/* <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-[#0f0f0f] text-3xl font-black"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  ₹{activePrice}.00
                </span>
                <span className="text-[#0f0f0f]/40 text-base line-through font-medium">
                  ₹{activeOriginal}.00
                </span>
              </div>
              <p className="text-[11px] text-[#0f0f0f]/40 font-medium"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {t("inclusiveTaxes")}
              </p>
            </div> */}

            {/* Edition selector */}
            {/* <div className="flex gap-0 border border-[#0f0f0f]/15">
              <EditionPill type="kindle" book={book} active={edition === "kindle"} onClick={() => setEdition("kindle")} />
              <div className="w-px bg-[#0f0f0f]/10" />
              <EditionPill type="physical" book={book} active={edition === "physical"} onClick={() => setEdition("physical")} />
            </div> */}

            {/* Buy button */}
            {edition === "kindle" && getBookPdf(book, locale) ? (
              <a
                href={getBookPdf(book, locale)}
                download
                className="w-full sm:w-auto sm:self-start bg-[#fbe400] hover:bg-[#f5d800] text-[#0f0f0f] font-black text-sm uppercase tracking-wide px-10 py-3.5 transition-colors duration-150 inline-block text-center"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {/* {t("downloadNow", { price: activePrice })} */}
                Download Now Free
              </a>
            ) : (
              <button
                className="w-full sm:w-auto sm:self-start bg-[#fbe400] hover:bg-[#f5d800] text-[#0f0f0f] font-black text-sm uppercase tracking-wide px-10 py-3.5 transition-colors duration-150"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("buyNow", { price: activePrice })}
              </button>
            )}

            {/* Stock status */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16a34a]" aria-hidden />
              <span className="text-[#16a34a] text-sm font-bold"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {t("inStock")}
              </span>
              {edition === "physical" && (
                <span className="text-[#0f0f0f]/40 text-xs font-medium ml-1">
                  {t("deliveryInfo")}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-[#0f0f0f]/8" />

            {/* Specs grid */}
            <div className="flex flex-col">
              <SpecItem
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>}
                label={t("specs.format")}
                value={edition === "kindle" ? "Kindle / PDF" : "Paperback"}
              />
              <SpecItem
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>}
                label={t("specs.pages")}
                value={`${book.pages}`}
              />
              <SpecItem
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h7M4 8h7M4 11h4" /><rect x="14" y="5" width="8" height="14" rx="1" /><path d="M7 5V3" /></svg>}
                label={t("specs.language")}
                value={langLabel[book.language] ?? book.language}
              />
              <SpecItem
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>}
                label={t("specs.publication")}
                value={book.publisher}
              />
              <SpecItem
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
                label={t("specs.year")}
                value={`${book.year}`}
              />
              <SpecItem
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>}
                label={t("specs.country")}
                value={locale === "hi" ? "भारत" : "India"}
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-[#0f0f0f]/8" />

            {/* Share row */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-black text-[#0f0f0f] uppercase tracking-[0.15em]"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {t("share")}
              </span>
              <div className="flex items-center gap-2">
                <ShareBtn href={`https://wa.me/?text=${shareText}%20${shareUrl}`} label="WhatsApp">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741 1.046 1.053-3.667-.235-.374a9.861 9.861 0 0 1-1.511-5.26C2.048 6.519 6.447 2.12 11.935 2.12a9.821 9.821 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.893 6.993c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                </ShareBtn>
                <ShareBtn href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} label="Facebook">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </ShareBtn>
                <ShareBtn href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} label="X (Twitter)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </ShareBtn>
                <ShareBtn href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`} label="Pinterest">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>
                </ShareBtn>
                <ShareBtn href={`https://reddit.com/submit?url=${shareUrl}&title=${shareText}`} label="Reddit">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>
                </ShareBtn>
                <ShareBtn href={`mailto:?subject=${shareText}&body=${shareUrl}`} label="Email">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </ShareBtn>
              </div>
            </div>
          </div>
        </div>

        {/* ── What You'll Learn ── */}
        <div className="mt-10 border-t border-[#0f0f0f]/8 pt-10">
          <h2 className="text-[#0f0f0f] text-lg font-black mb-5 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            {t("whatYoullLearn")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {book.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3 bg-[#f8f8f8] p-3.5">
                <span className="w-5 h-5 rounded-full bg-[#fbe400] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-[13px] text-[#0f0f0f]/70 font-semibold leading-relaxed"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── About the Author ── */}
        <div className="mt-8 border-t border-[#0f0f0f]/8 pt-8">
          <h2 className="text-[#0f0f0f] text-lg font-black mb-4 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            {t("aboutAuthor")}
          </h2>
          <div className="flex items-start gap-4 bg-[#f8f8f8] p-5">
            <div className="w-11 h-11 rounded-full bg-[#0f0f0f] flex items-center justify-center shrink-0">
              <span className="text-white text-base font-black"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {book.author[0]}
              </span>
            </div>
            <div>
              <p className="font-black text-[#0f0f0f] text-sm mb-1"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{book.author}</p>
              <p className="text-[#0f0f0f]/55 text-sm leading-relaxed font-medium"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{book.authorBio}</p>
            </div>
          </div>
        </div>

        {/* ── Related Books ── */}
        {related.length > 0 && (
          <div className="mt-10 border-t border-[#0f0f0f]/8 pt-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[#0f0f0f] text-lg font-black uppercase tracking-wide"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {t("youMightLike")}
              </h2>
              <Link href="/books"
                className="text-xs font-black text-[#0f0f0f]/40 hover:text-[#c0392b] uppercase tracking-[0.15em] transition-colors"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {t("viewAll")}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {related.map((b) => <RelatedCard key={b.id} book={b} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
