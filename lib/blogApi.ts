import { supabase } from "./supabaseClient";

export type Lang = "en" | "hi";
export const DEFAULT_LANG: Lang = "en";

export interface SupaBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  no_index: boolean;
  lang: Lang;
}

export interface CategoryMeta {
  label: string;
  color: string;
  bg: string;
  gradient: string;
}

const PALETTE: CategoryMeta[] = [
  { label: "", color: "#0284c7", bg: "#e0f2fe", gradient: "linear-gradient(135deg, #0c2340 0%, #0369a1 100%)" },
  { label: "", color: "#059669", bg: "#d1fae5", gradient: "linear-gradient(135deg, #052e16 0%, #047857 100%)" },
  { label: "", color: "#7c3aed", bg: "#ede9fe", gradient: "linear-gradient(135deg, #1e0a40 0%, #6d28d9 100%)" },
  { label: "", color: "#db2777", bg: "#fce7f3", gradient: "linear-gradient(135deg, #2d0a20 0%, #be185d 100%)" },
  { label: "", color: "#d97706", bg: "#fef3c7", gradient: "linear-gradient(135deg, #2d1a00 0%, #b45309 100%)" },
  { label: "", color: "#0891b2", bg: "#cffafe", gradient: "linear-gradient(135deg, #0a2030 0%, #0e7490 100%)" },
  { label: "", color: "#65a30d", bg: "#ecfccb", gradient: "linear-gradient(135deg, #1a2e05 0%, #4d7c0f 100%)" },
];

export function buildCategoryMap(blogs: SupaBlog[]): Record<string, CategoryMeta> {
  const seen = new Set<string>();
  const map: Record<string, CategoryMeta> = {};
  let i = 0;
  for (const blog of blogs) {
    const cat = blog.category || "General";
    if (!seen.has(cat)) {
      seen.add(cat);
      map[cat] = { ...PALETTE[i % PALETTE.length], label: cat };
      i++;
    }
  }
  return map;
}

export function getCategoryMeta(category: string | null, map: Record<string, CategoryMeta>): CategoryMeta {
  const cat = category || "General";
  return map[cat] ?? { label: cat, color: "#6b7280", bg: "#f3f4f6", gradient: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)" };
}

export function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function pickTranslation(translations: any[], lang: Lang): any {
  return (
    translations.find((t) => t.lang === lang) ??
    translations.find((t) => t.lang === DEFAULT_LANG) ??
    {}
  );
}

export async function getAllBlogs(lang: Lang = DEFAULT_LANG): Promise<SupaBlog[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("id, slug, category, tags, published_at, created_at, featured_image, og_image, canonical_url, no_index, blog_translations(lang, title, excerpt, content, seo_title, seo_description)")
    .eq("status", "active")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error.message);
    return [];
  }

  return (data ?? []).map((b: any) => {
    const t = pickTranslation(b.blog_translations ?? [], lang);
    return {
      id: b.id, slug: b.slug, category: b.category, tags: b.tags,
      published_at: b.published_at, created_at: b.created_at,
      featured_image: b.featured_image, og_image: b.og_image,
      canonical_url: b.canonical_url, no_index: b.no_index,
      lang,
      title: t.title ?? "",
      excerpt: t.excerpt ?? null,
      content: t.content ?? "",
      seo_title: t.seo_title ?? null,
      seo_description: t.seo_description ?? null,
    };
  });
}

export async function getBlogBySlug(slug: string, lang: Lang = DEFAULT_LANG): Promise<SupaBlog | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*, blog_translations(*)")
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error || !data) return null;

  const t = pickTranslation(data.blog_translations ?? [], lang);
  return {
    id: data.id, slug: data.slug, category: data.category, tags: data.tags,
    published_at: data.published_at, created_at: data.created_at,
    featured_image: data.featured_image, og_image: data.og_image,
    canonical_url: data.canonical_url, no_index: data.no_index,
    lang,
    title: t.title ?? "",
    excerpt: t.excerpt ?? null,
    content: t.content ?? "",
    seo_title: t.seo_title ?? null,
    seo_description: t.seo_description ?? null,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const { data } = await supabase.from("blogs").select("slug").eq("status", "active");
  return (data ?? []).map((d) => d.slug);
}
