import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BOOKS } from "@/lib/booksData";
import BookDetailClient from "@/components/BookDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) return { title: "Book Not Found" };

  return {
    title: `${book.title} by ${book.author}`,
    description: book.description,
    alternates: {
      canonical: `https://axomen.com/books/${slug}`,
      languages: {
        "en-IN": `https://axomen.com/books/${slug}`,
        "hi-IN": `https://axomen.com/books/${slug}?lang=hi`,
      },
    },
    openGraph: {
      title: `${book.title} | AxoMen Books`,
      description: book.description,
      url: `https://axomen.com/books/${slug}`,
      type: "website",
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.title,
    "author": {
      "@type": "Organization",
      "name": book.author,
      "url": "https://axomen.com"
    },
    "description": book.description,
    "numberOfPages": book.pages,
    "publisher": {
      "@type": "Organization",
      "name": book.publisher
    },
    "inLanguage": book.language === "hindi" ? "hi-IN" : "en-IN",
    "image": book.coverUrl ? `https://axomen.com${book.coverUrl}` : undefined,
    "bookFormat": "https://schema.org/EBook"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BookDetailClient slug={slug} />
    </>
  );
}
