import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join AxoMen — Men's Sexual Health & Recovery",
  description:
    "Join AxoMen's community of men overcoming unwanted porn and masturbation habits. Register today and get your confidential member ID.",
  alternates: {
    canonical: "https://axomen.com/join",
    languages: {
      "en-IN": "https://axomen.com/join",
      "hi-IN": "https://axomen.com/join?lang=hi",
    },
  },
  openGraph: {
    title: "Join AxoMen | Men's Sexual Health Community",
    description:
      "Start your recovery journey with confidential, non-judgmental guidance.",
    url: "https://axomen.com/join",
    type: "website",
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
