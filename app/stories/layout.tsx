import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Recovery Stories & Reviews — AxoMen India",
  description:
    "Read verified recovery reviews and real stories of men across India who overcame unwanted porn and masturbation habits with AxoMen's guidance.",
  alternates: {
    canonical: "https://axomen.com/stories",
    languages: {
      "en-IN": "https://axomen.com/stories",
      "hi-IN": "https://axomen.com/stories?lang=hi",
    },
  },
  openGraph: {
    title: "Real Stories & Reviews | AxoMen",
    description:
      "Read real stories of transformation and habit recovery from men across India.",
    url: "https://axomen.com/stories",
    type: "website",
  },
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
