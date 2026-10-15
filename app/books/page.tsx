import type { Metadata } from "next";
import BooksClient from "@/components/BooksClient";
import BookCTASection from "@/components/BookCTASection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Books & Recovery Frameworks | AxoMen India",
  description:
    "Evidence-informed books and recovery frameworks to help men overcome compulsive porn and masturbation habits and build self-command. Available in multiple Indian languages.",
  alternates: { canonical: "https://axomen.com/books" },
  openGraph: {
    title: "Books & Resources | AxoMen",
    description:
      "Structured books and guides for men's sexual health and habit recovery.",
    url: "https://axomen.com/books",
    type: "website",
  },
};

export default function BooksPage() {
  return (
    <div>
      {/* <BookCTASection /> */}
      {/* <div className="w-full">
        <Image
          src="/image/book-cta.webp"
          alt="Book CTA"
          width={1920}
          height={1080}
          className="w-full h-auto block"
          sizes="100vw"
        />
      </div> */}
      <BooksClient />
    </div>
  );
}
