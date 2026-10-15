"use client";


import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  SupaBlog,
  CategoryMeta,
  getCategoryMeta,
} from "@/lib/blogApi";

/* ── Category SVG icons (no-image fallback) ─────────────────────────── */
const CategoryIcon = ({ cat }: { cat: string }) => {
  const props = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (cat?.toLowerCase().includes("brain") || cat?.toLowerCase().includes("science"))
    return (
      <svg {...props}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z" />
      </svg>
    );
  if (cat?.toLowerCase().includes("recover") || cat?.toLowerCase().includes("tip"))
    return (
      <svg {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    );
  if (cat?.toLowerCase().includes("stor"))
    return (
      <svg {...props}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  if (cat?.toLowerCase().includes("mental") || cat?.toLowerCase().includes("health"))
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    );
  return (
    <svg {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
};

/* ── Divider class helper ────────────────────────────────────────────── */
/*
 * mobile  (1-col): border-bottom as row separator, no left borders
 * sm      (2-col): border-left on column 2, no bottom border
 * lg      (3-col): border-left on columns 2-3
 * xl      (4-col): border-left on columns 2-4
 */
function dividerClass(index: number): string {
  const smBorder = index % 2 === 0 ? "sm:border-l-0" : "sm:border-l border-black";
  const lgBorder = index % 3 === 0 ? "lg:border-l-0" : "lg:border-l border-black";
  const xlBorder = index % 4 === 0 ? "xl:border-l-0" : "xl:border-l border-black";
  return ["border-black border-b sm:border-b-0", smBorder, lgBorder, xlBorder].join(" ");
}

/* ── Post Card ───────────────────────────────────────────────────────── */
function PostCard({
  post,
  catMeta,
  isFeatured = false,
  lang = "en",
}: {
  post: SupaBlog;
  catMeta: CategoryMeta;
  isFeatured?: boolean;
  lang?: string;
}) {
  const t = useTranslations("blogListPage");

  const categoryLabel = (post.category ?? "BLOG POST").toUpperCase();

  return (
    <Link
      href={`/blog/${post.slug}${post.lang && post.lang !== "en" ? `?lang=${post.lang}` : ""}`}
      className="group block px-2 pt-0 pb-10 sm:px-3 sm:pt-0 sm:pb-16 max-w-[328px] mx-auto"
      aria-label={`Read: ${post.title}`}
    >
      {/* ── Image — Max 288 × 288 responsive aspect-square ── */}
      <div className="relative overflow-hidden w-full max-w-[288px] aspect-square bg-gray-50 mx-auto shrink-0">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            sizes="288px"
            className="object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: catMeta.gradient }}
          >
            <span style={{ color: "rgba(255,255,255,0.9)" }}>
              <CategoryIcon cat={post.category ?? ""} />
            </span>
          </div>
        )}
        {isFeatured && (
          <span className="absolute top-3 left-3 bg-[#fbe400] text-[#1a1a2e] text-[10px] font-black tracking-wider uppercase px-2.5 py-1 z-10 font-sans">
            {t("featured")}
          </span>
        )}
      </div>

      {/* ── Category label ── */}
      <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-gray-500 mt-5 mb-3 font-sans">
        {categoryLabel}
      </p>

      {/* ── Title — same font as main page blog section ── */}
      <h3
        className="text-[20px] font-extrabold text-[#1a1a2e] leading-[1.25] line-clamp-3 group-hover:text-[#27849d] transition-colors duration-200"
        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
      >
        {post.title}
      </h3>
    </Link>
  );
}

/* ── Main BlogListClient ─────────────────────────────────────────────── */
interface Props {
  featured: SupaBlog;
  posts: SupaBlog[];
  categoryMap: Record<string, CategoryMeta>;
  lang?: string;
}

export default function BlogListClient({ featured, posts, categoryMap, lang = "en" }: Props) {
  const allPosts = [featured, ...posts];
  const t = useTranslations("blogListPage");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[20px]">
          {allPosts.map((post, index) => (
            <div key={post.slug} className={dividerClass(index)}>
              <PostCard
                post={post}
                catMeta={getCategoryMeta(post.category, categoryMap)}
                isFeatured={post.slug === featured.slug}
                lang={lang}
              />
            </div>
          ))}
        </div>

        {/* ── Newsletter CTA ── */}
        <div className="mt-16 rounded-3xl overflow-hidden bg-white/25 backdrop-blur-sm">
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                {t("title")}
              </h3>
              {/* <p className="text-gray-700 text-[15px]">
                {t("subtitle")}
              </p> */}
            </div>
            {/* <Link
              href="/app"
              className="shrink-0 inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#0d0d1a] text-white font-bold text-[14px] px-6 py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-px active:translate-y-0"
            >
              {t("button")}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link> */}
          </div>
        </div>

      </div>
    </div>
  );
}
