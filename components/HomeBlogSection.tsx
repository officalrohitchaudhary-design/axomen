"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  getAllBlogs,
  buildCategoryMap,
  getCategoryMeta,
  estimateReadTime,
  formatDate,
  type SupaBlog,
  type Lang,
} from "@/lib/blogApi";

/* ── Star / Doc Icon ── */
function DocIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

/* ── Arrow Icon ── */
function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ── Clock Icon ── */
function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ── Skeleton Shimmer Loader ── */
function SkeletonCard() {
  return (
    <div className="shrink-0 w-[76vw] sm:w-[42vw] lg:w-[28vw] xl:w-[24vw] bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 animate-pulse">
      <div className="h-32 w-full bg-gray-100 rounded-xl" />
      <div className="h-3.5 w-1/4 bg-gray-150 rounded" style={{ backgroundColor: "#e5e7eb" }} />
      <div className="h-5 w-3/4 bg-gray-150 rounded" style={{ backgroundColor: "#e5e7eb" }} />
      <div className="h-3.5 w-full bg-gray-150 rounded" style={{ backgroundColor: "#e5e7eb" }} />
      <div className="h-3.5 w-2/3 bg-gray-150 rounded" style={{ backgroundColor: "#e5e7eb" }} />
      <div className="mt-auto h-3.5 w-1/2 bg-gray-150 rounded" style={{ backgroundColor: "#e5e7eb" }} />
    </div>
  );
}

/* ── Blog Card Component ── */
interface BlogCardProps {
  blog: SupaBlog;
  catMeta: { label: string; color: string; bg: string; gradient: string };
  locale: string;
}

function BlogCard({ blog, catMeta, locale }: BlogCardProps) {
  const readTime = estimateReadTime(blog.content);
  const t = useTranslations("homeBlogs");

  return (
    <Link
      href={`/blog/${blog.slug}${locale !== "en" ? `?lang=${locale}` : ""}`}
      className="group relative shrink-0 w-[76vw] sm:w-[42vw] lg:w-[28vw] xl:w-[24vw] bg-white rounded-2xl border border-gray-100 hover:border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      <div className="h-1 w-full shrink-0" style={{ background: catMeta.gradient }} />
      {/* Category Gradient Header Banner */}
      <div className="h-36 flex items-center justify-center relative overflow-hidden shrink-0" style={{ background: catMeta.gradient }}>
        {blog.featured_image ? (
          <Image
            src={blog.featured_image}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 76vw, (max-width: 1024px) 42vw, 28vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(circle at 50% 40%, rgba(251,228,0,0.4), transparent 60%)" }} />
            <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Category Pill */}
        <span
          className="text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full self-start"
          style={{ backgroundColor: catMeta.bg, color: catMeta.color }}
        >
          {catMeta.label}
        </span>

        {/* Title */}
        <h3
          className="text-[#000000] leading-snug group-hover:text-[#16aee2] transition-colors duration-200 line-clamp-2"
          style={{
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            fontSize: "clamp(0.92rem, 2vw, 1.05rem)",
            fontWeight: 800,
          }}
        >
          {blog.title}
        </h3>

        {/* Excerpt */}
        {blog.excerpt && (
          <p
            className="text-gray-400 text-[12.5px] leading-relaxed line-clamp-2"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {blog.excerpt}
          </p>
        )}

        {/* Meta Row (Read Time + Date) */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-semibold text-gray-400"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          <span className="flex items-center gap-1.5">
            <ClockIcon />
            {t("readTime", { minutes: readTime })}
          </span>
          <span>{formatDate(blog.published_at ?? blog.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}

export default function HomeBlogSection() {
  const locale = useLocale();
  const t = useTranslations("homeBlogs");
  const [blogs, setBlogs] = useState<SupaBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getAllBlogs(locale as Lang).then((data) => {
      if (active) {
        setBlogs(data.slice(0, 6)); // Display top 6 articles
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [locale]);

  // Hide component completely if there are no blogs published
  if (!loading && blogs.length === 0) return null;

  const categoryMap = buildCategoryMap(blogs);
  const TRACK = [...blogs, ...blogs, ...blogs]; // Tripled to create seamless infinite loop

  return (
    <section
      className="w-full overflow-hidden py-14 sm:py-18"
      style={{ background: "linear-gradient(to bottom, #0a1128 0%, #10214a 50%, #ffffff 100%)" }}
    >
      <style>{`
        @keyframes blogs-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .blogs-track {
          animation: blogs-scroll 35s linear infinite;
        }
        .blogs-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 flex items-end justify-between">
        <div className="flex flex-col gap-1.5">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#16aee2]"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            <DocIcon />
            {t("eyebrow")}
          </span>

          <h2
            className="text-white text-[clamp(1.6rem,4.5vw,2.8rem)] leading-[1.0] uppercase"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("heading")} <span className="text-[#e9e313]">{t("headingHighlight")}</span>
          </h2>
        </div>

        <Link
          href={locale !== "en" ? `/blog?lang=${locale}` : "/blog"}
          className="inline-flex items-center gap-1.5 text-white/80 hover:text-[#16aee2] text-xs font-black uppercase tracking-[0.2em] transition-colors duration-200 shrink-0"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {t("viewAll")}
          <ArrowIcon />
        </Link>
      </div>

      {/* Scrolling Track */}
      <div className="w-full overflow-hidden">
        {loading ? (
          <div className="flex gap-4 sm:gap-5 px-4 sm:px-6 w-max overflow-hidden">
            {[1, 2, 3, 4].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : (
          <div className="blogs-track flex gap-4 sm:gap-5 w-max px-4 sm:px-6">
            {TRACK.map((blog, i) => (
              <BlogCard
                key={`${blog.id}-${i}`}
                blog={blog}
                catMeta={getCategoryMeta(blog.category, categoryMap)}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
