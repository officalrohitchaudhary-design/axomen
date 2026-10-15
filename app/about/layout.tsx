import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AxoMen — Men's Sexual Health Platform India",
  description:
    "Learn about AxoMen, India's dedicated men's sexual health platform. Discover our mission to provide confidential, human-guided recovery support for unwanted porn and masturbation habits.",
  alternates: {
    canonical: "https://axomen.com/about",
    languages: {
      "en-IN": "https://axomen.com/about",
      "hi-IN": "https://axomen.com/about?lang=hi",
    },
  },
  openGraph: {
    title: "About AxoMen | Men's Sexual Health Support",
    description:
      "Our mission is to help Indian men overcome unwanted sexual habits and compulsive urge patterns through confidential, non-judgmental guidance.",
    url: "https://axomen.com/about",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
