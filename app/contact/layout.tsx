import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Confidential Support | AxoMen India",
  description:
    "Get in touch with AxoMen. Confidential inquiries, support session questions, and partnerships for men's sexual health and habit recovery.",
  alternates: {
    canonical: "https://axomen.com/contact",
    languages: {
      "en-IN": "https://axomen.com/contact",
      "hi-IN": "https://axomen.com/contact?lang=hi",
    },
  },
  openGraph: {
    title: "Contact AxoMen | Confidential Men's Sexual Health Support",
    description: "Reach our dedicated recovery guidance team confidentially.",
    url: "https://axomen.com/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
