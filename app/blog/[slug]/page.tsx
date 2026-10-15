import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
  getAllSlugs,
  getBlogBySlug,
  getAllBlogs,
  buildCategoryMap,
  getCategoryMeta,
  estimateReadTime,
  formatDate,
  type Lang,
  DEFAULT_LANG,
} from "@/lib/blogApi";
import BlogReadingProgress from "@/components/BlogReadingProgress";

export const revalidate = 60;

/* ── Static generation ──────────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ── SEO metadata ───────────────────────────────────────────────────── */
async function resolveLang(rawLang: string | undefined): Promise<Lang> {
  const validLangs: Lang[] = ["en", "hi"];
  if (validLangs.includes(rawLang as Lang)) return rawLang as Lang;
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("hyi-lang")?.value;
  return validLangs.includes(cookieLang as Lang) ? (cookieLang as Lang) : DEFAULT_LANG;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { lang: rawLang } = await searchParams;
  const lang = await resolveLang(rawLang);
  const post = await getBlogBySlug(slug, lang);
  if (!post) return { title: "Article Not Found" };

  const title = post.seo_title ?? post.title;
  const description = post.seo_description ?? post.excerpt ?? "";
  const ogImage = post.og_image ?? post.featured_image ?? undefined;

  return {
    title,
    description,
    alternates: {
      canonical: post.canonical_url ?? `https://axomen.com/blog/${post.slug}`,
      languages: {
        "en-IN": `https://axomen.com/blog/${post.slug}`,
        "hi-IN": `https://axomen.com/blog/${post.slug}?lang=hi`,
      },
    },
    robots: post.no_index ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: `https://axomen.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at ?? post.created_at,
      images: ogImage ? [{ url: ogImage }] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/* ── Related post card ──────────────────────────────────────────────── */
function RelatedCard({
  post,
  catMeta,
}: {
  post: Awaited<ReturnType<typeof getAllBlogs>>[number];
  catMeta: { label: string; color: string; bg: string; gradient: string };
}) {
  return (
    <Link
      href={`/blog/${post.slug}${post.lang && post.lang !== "en" ? `?lang=${post.lang}` : ""}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="h-1 w-full shrink-0" style={{ background: catMeta.gradient }} />
      <div
        className="h-32 flex items-center justify-center relative overflow-hidden shrink-0"
        style={{ background: catMeta.gradient }}
      >
        {post.featured_image ? (
          <Image src={post.featured_image} alt={post.title} fill className="object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 40%, rgba(251,228,0,0.5), transparent 65%)" }} />
            <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
          </>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full self-start mb-2" style={{ backgroundColor: catMeta.bg, color: catMeta.color }}>
          {catMeta.label}
        </span>
        <h4 className="text-[13px] font-bold text-[#1a1a2e] leading-snug line-clamp-2 group-hover:text-[#27849d] transition-colors duration-200 flex-1">
          {post.title}
        </h4>
        <p className="text-[12px] text-gray-400 mt-2">{estimateReadTime(post.content)} min read</p>
      </div>
    </Link>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang: rawLang } = await searchParams;
  const lang = await resolveLang(rawLang);

  const post = await getBlogBySlug(slug, lang);
  if (!post) notFound();

  const allBlogs = await getAllBlogs(lang);
  const categoryMap = buildCategoryMap(allBlogs);
  const cat = getCategoryMeta(post.category, categoryMap);
  const readTime = estimateReadTime(post.content);

  const related = allBlogs
    .filter((b) => b.slug !== post.slug && b.category === post.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.featured_image ? [post.featured_image] : [],
    "datePublished": post.published_at ?? post.created_at,
    "dateModified": post.published_at ?? post.created_at,
    "author": [{
      "@type": "Organization",
      "name": "AxoMen",
      "url": "https://axomen.com"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "AxoMen",
      "logo": {
        "@type": "ImageObject",
        "url": "https://axomen.com/image/axomen-logo.png"
      }
    },
    "description": post.excerpt ?? ""
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": lang === "hi" ? `${post.title} का मुख्य उद्देश्य क्या है?` : `What is the main takeaway of "${post.title}"?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": post.excerpt ?? post.title
        }
      },
      {
        "@type": "Question",
        "name": lang === "hi" ? "AxoMen क्या है?" : "What is AxoMen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === "hi"
            ? "AxoMen भारत का मेन्स सेक्सुअल हेल्थ प्लेटफॉर्म है, जो अनचाही पोर्न और मास्टर्बेशन की आदतों से उबरने के लिए गोपनीय, 1-ऑन-1 पर्सनल रिकवरी गाइडेंस प्रदान करता है।"
            : "AxoMen is India's dedicated men's sexual health platform providing confidential, human-guided recovery support for unwanted porn use, compulsive masturbation habits, and sexual urges."
        }
      },
      {
        "@type": "Question",
        "name": lang === "hi" ? "AxoMen पर रिकवरी के लिए क्या सपोर्ट उपलब्ध है?" : "What support is available on AxoMen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === "hi"
            ? "आप AxoMen पर 1-ऑन-1 गोपनीय सेशन्स, गाइडेड ब्रीदिंग टूल्स, रिकवरी बुक्स और साइंस-आधारित आदत प्रबंधन गाइड्स प्राप्त कर सकते हैं।"
            : "You can access confidential 1-on-1 human-guided recovery consultations, urge surfing tools, books, and science-backed habit recovery resources directly on AxoMen."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BlogReadingProgress />

      <article>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-10 lg:pb-16">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-2 text-[12px] text-gray-400 mb-8 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href={lang !== "en" ? `/blog?lang=${lang}` : "/blog"} className="hover:text-gray-600 transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-gray-700 font-medium line-clamp-1">{post.title}</span>
          </nav>

          {/* ── Category + meta ── */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full"
              style={{ backgroundColor: cat.bg, color: cat.color }}
            >
              {cat.label}
            </span>
            <span className="text-[13px] text-gray-400 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {readTime} min read
            </span>
            <span className="text-[13px] text-gray-400">{formatDate(post.published_at ?? post.created_at)}</span>
          </div>

          {/* ── Title ── */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1a1a2e] leading-[1.15] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* ── Author ── */}
          <div className="flex items-center gap-3 md:mb-10 md:pb-8 mb-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-[12px] font-bold text-[#fbe400] shrink-0">
              YI
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#1a1a2e] leading-none">YoungIndia Team</p>
              <p className="text-[12px] text-gray-400 mt-0.5">Editorial</p>
            </div>
          </div>

          {/* ── Featured image ── */}
          {post.featured_image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
              <Image src={post.featured_image} alt={post.title} fill className="object-contain" />
            </div>
          )}

          {/* ── TL;DR / Quick Summary ── */}
          {post.excerpt && (
            <div className="bg-[#fbe400]/8 border-2 border-dashed border-[#fbe400] p-6 rounded-2xl mb-8">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#1a1a2e] mb-2">
                ⚡ {lang === "hi" ? "त्वरित सारांश (TL;DR)" : "Quick Summary (TL;DR)"}
              </p>
              <p className="text-[15px] sm:text-[16px] text-gray-700 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* ── Body content ── */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* ── Tags ── */}
          {post.tags?.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-[12px] font-bold tracking-widest uppercase text-gray-400 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Share ── */}
          <div className="mt-8 p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-[#1a1a2e]">Found this helpful?</p>
              <p className="text-[13px] text-gray-500 mt-0.5">Share it with someone who might need it.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://axomen.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-xl bg-[#1a1a2e] text-white hover:bg-[#27849d] transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share
              </a>
              <Link
                href={lang !== "en" ? `/blog?lang=${lang}` : "/blog"}
                className="flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-xl bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                ← All articles
              </Link>
            </div>
          </div>

        </div>
      </article>

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[13px] font-bold tracking-widest uppercase text-gray-400 shrink-0">Related Articles</h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <RelatedCard key={p.slug} post={p} catMeta={getCategoryMeta(p.category, categoryMap)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
