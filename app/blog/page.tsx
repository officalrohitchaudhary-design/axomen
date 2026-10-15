import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getAllBlogs, buildCategoryMap, type Lang, DEFAULT_LANG } from "@/lib/blogApi";
import BlogListClient from "@/components/BlogListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Men's Sexual Health & Recovery Blog | AxoMen",
  description:
    "Explore evidence-informed articles, neurobiology guides, and practical tools on managing sexual urges, breaking unwanted porn loops, and compulsive masturbation habits.",
  alternates: {
    canonical: "https://axomen.com/blog",
    languages: {
      "en-IN": "https://axomen.com/blog",
      "hi-IN": "https://axomen.com/blog?lang=hi",
    },
  },
  openGraph: {
    title: "Men's Sexual Health & Habit Recovery Blog | AxoMen",
    description: "Science, stories, and habit management strategies for men across India.",
    url: "https://axomen.com/blog",
    type: "website",
  },
};

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { lang: rawLang } = await searchParams;
  const validLangs: Lang[] = ["en", "hi"];

  let lang: Lang;
  if (validLangs.includes(rawLang as Lang)) {
    lang = rawLang as Lang;
  } else {
    const cookieStore = await cookies();
    const cookieLang = cookieStore.get("hyi-lang")?.value;
    lang = validLangs.includes(cookieLang as Lang) ? (cookieLang as Lang) : DEFAULT_LANG;
  }
  const allBlogs = await getAllBlogs(lang);
  const categoryMap = buildCategoryMap(allBlogs);

  const featured = allBlogs[0];
  const rest = allBlogs.slice(1);

  if (!featured) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">No articles published yet.</p>
      </div>
    );
  }

  return (
    <BlogListClient featured={featured} posts={rest} categoryMap={categoryMap} lang={lang} />
  );
}
