import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { BOOKS } from "@/lib/booksData";

const BASE = "https://axomen.com";

const staticRoutes: MetadataRoute.Sitemap = [
  // Primary Core & Service Routes
  { url: BASE,                                             lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
  { url: `${BASE}/services/porn-habit-support`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.95 },
  { url: `${BASE}/services/masturbation-habit-support`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.95 },
  { url: `${BASE}/services/porn-and-masturbation-support`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.95 },
  { url: `${BASE}/how-it-works`,                           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/faqs`,                                   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
  { url: `${BASE}/booking`,                                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/get-session`,                            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/about`,                                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/blog`,                                   lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
  { url: `${BASE}/books`,                                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/podcast`,                                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/exercises`,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/stories`,                                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
  { url: `${BASE}/contact`,                                lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },

  // Hindi Alternate Routes
  { url: `${BASE}/?lang=hi`,                                             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/services/porn-habit-support?lang=hi`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
  { url: `${BASE}/services/masturbation-habit-support?lang=hi`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
  { url: `${BASE}/services/porn-and-masturbation-support?lang=hi`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
  { url: `${BASE}/how-it-works?lang=hi`,                           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/faqs?lang=hi`,                                   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/about?lang=hi`,                                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/blog?lang=hi`,                                   lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
  { url: `${BASE}/books?lang=hi`,                                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
  { url: `${BASE}/podcast?lang=hi`,                                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
  { url: `${BASE}/exercises?lang=hi`,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
  { url: `${BASE}/stories?lang=hi`,                                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
  { url: `${BASE}/contact?lang=hi`,                                lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
];

export const revalidate = 3600; // regenerate sitemap every 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogRoutes: MetadataRoute.Sitemap = [];

  const bookRoutes: MetadataRoute.Sitemap = BOOKS.flatMap((b) => [
    {
      url: `${BASE}/books/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE}/books/${b.slug}?lang=hi`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]);

  try {
    // Use a fresh supabase client here (no cache:no-store override)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data } = await supabase
      .from("blogs")
      .select("slug, published_at, no_index")
      .eq("status", "active");

    blogRoutes = (data ?? [])
      .filter((b) => b.slug && !b.no_index)
      .flatMap((b) => [
        {
          url: `${BASE}/blog/${b.slug}`,
          lastModified: b.published_at ? new Date(b.published_at) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
        {
          url: `${BASE}/blog/${b.slug}?lang=hi`,
          lastModified: b.published_at ? new Date(b.published_at) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
      ]);
  } catch {
    // silently return static routes if DB unreachable
  }

  return [...staticRoutes, ...blogRoutes, ...bookRoutes];
}
