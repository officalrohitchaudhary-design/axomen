import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Anton, Syne, DM_Sans } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";
import PageLoader from "@/components/PageLoader";
import I18nProvider from "@/components/I18nProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a5bd9",
};

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://axomen.com/#organization",
      name: "AxoMen",
      alternateName: ["AxoMen India", "AxoMen Men's Sexual Health"],
      url: "https://axomen.com",
      logo: {
        "@type": "ImageObject",
        url: "https://axomen.com/image/axomen-logo.png",
      },
      description:
        "AxoMen is India's dedicated men's sexual health platform offering confidential, human-guided support for unwanted porn use, compulsive masturbation habits, and sexual urges.",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      knowsAbout: [
        "Men's Sexual Health",
        "Compulsive Sexual Behavior",
        "Pornography Habit Recovery",
        "Masturbation Addiction Treatment in India",
        "Masturbation Habit Support",
        "How to Stop Masturbation Addiction",
        "Online Masturbation Counselling",
        "Online Porn Counselling",
        "Online Sex Counselling",
        "Urge Surfing & Impulse Control",
        "Dopamine Desensitization & Brain Rewiring",
      ],
      sameAs: [
        "https://instagram.com/axomen",
        "https://twitter.com/axomen",
      ],
      medicalSpecialty: "SexualHealth",
    },
    {
      "@type": "WebSite",
      "@id": "https://axomen.com/#website",
      url: "https://axomen.com",
      name: "AxoMen",
      description: "Men's Sexual Health Platform | Confidential Support for Porn & Masturbation Habits",
      publisher: { "@id": "https://axomen.com/#organization" },
      inLanguage: ["en-IN", "hi-IN"],
      potentialAction: {
        "@type": "SearchAction",
        target: "https://axomen.com/blog?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://axomen.com/#webpage",
      url: "https://axomen.com",
      name: "AxoMen - Men's Sexual Health Platform | Trusted by 1K+ Men",
      about: [
        {
          "@type": "MedicalCondition",
          name: "Compulsive Sexual Behavior & Porn Dependency",
        },
        {
          "@type": "MedicalCondition",
          name: "Compulsive Masturbation Habits & Masturbation Addiction",
        },
      ],
      audience: {
        "@type": "MedicalAudience",
        audienceType: "Men in India seeking practical, confidential, non-judgmental sexual health guidance",
      },
      medicalAudience: "Patient",
      aspect: ["Overview", "Symptoms", "Self-care", "Education"],
      disclaimer:
        "AxoMen provides confidential recovery education, behavioural habit-management tools, and structured 1-on-1 human guidance. Our services do not provide clinical psychiatric diagnosis or medical prescription treatments. If you require medical evaluation, please consult a certified doctor or healthcare professional.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://axomen.com"),
  title: {
    default: "AxoMen - Men's Sexual Health Platform | Trusted by 1K+ Men",
    template: "%s | AxoMen — Men's Sexual Health",
  },
  description:
    "AxoMen is India's dedicated men's sexual health platform offering confidential masturbation addiction treatment in India, online sex & porn counselling, and habit recovery. First session free.",
  keywords: [
    // ── Brand Keywords ──────────────────────────────────────────
    "AxoMen",
    "AxoMen India",
    "AxoMen men's sexual health",
    "AxoMen reviews",
    "AxoMen recovery session",
    "AxoMen consultation",

    // ── Men's Sexual Health & Counselling Keywords ──────────────
    "men's sexual health India",
    "Online Sex Counselling",
    "online sex counselling India",
    "online sex counselling male sexual problem",
    "men's sexual health support",
    "online men's sexual health consultation",
    "men's sexual wellbeing",
    "men's sexual health guidance",
    "sexual wellness platform for men India",
    "confidential men's sexual health platform",
    "men sexual health coach India",

    // ── Porn-Related Support & Counselling Keywords ─────────────
    "Online Porn Counselling",
    "online porn counselling India",
    "how to quit porn",
    "help with porn habits",
    "how to stop watching porn",
    "compulsive porn use support",
    "online porn recovery support",
    "how to quit porn India",
    "porn addiction help India",
    "porn recovery coach India",
    "break porn habit loop",
    "porn dopamine detox",
    "rewire brain after porn",

    // ── Masturbation-Related Support & Counselling Keywords ─────
    "How to Stop Masturbation Addiction",
    "how to stop masturbation addiction",
    "Online Masturbation Counselling",
    "online masturbation counselling India",
    "Masturbation Addiction Treatment in India",
    "masturbation addiction treatment in India",
    "masturbation addiction treatment",
    "masturbation addiction help India",
    "help with unwanted masturbation habits",
    "how to manage masturbation habits",
    "difficulty controlling masturbation",
    "masturbation habit support",
    "stop compulsive masturbation India",
    "overcome excessive masturbation",
    "how to reduce masturbation urges",
    "masturbation habit recovery guidance",

    // ── Combined Concerns and Urges ─────────────────────────────
    "help with porn and masturbation habits",
    "how to manage sexual urges",
    "how to manage lustful thoughts",
    "help changing unwanted sexual habits",
    "repeated failed attempts to quit porn",
    "dopamine rewiring for sexual health",
    "urge surfing techniques for men",
    "confidential men's sexual wellness support",
  ],
  verification: {
    google: "7MbYoER0bE8f3vyhqynyTkejTaj6kMaFfyZoNY04m3c",
  },
  authors: [{ name: "AxoMen Editorial & Recovery Guidance Team" }],
  creator: "AxoMen",
  publisher: "AxoMen",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://axomen.com",
    siteName: "AxoMen",
    title: "AxoMen - Men's Sexual Health Platform | Trusted by 1K+ Men",
    description:
      "Confidential masturbation addiction treatment in India and human-guided support for men struggling with unwanted porn use, compulsive masturbation habits, and sexual urges. Trusted by 1,000+ men across India.",
    images: [
      {
        url: "/image/axomen-logo.png",
        width: 1200,
        height: 630,
        alt: "AxoMen — Men's Sexual Health Support Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AxoMen - Men's Sexual Health Platform | Trusted by 1K+ Men",
    description:
      "Confidential 1-on-1 support for men in India struggling with unwanted porn use, masturbation habits, and lust-related concerns.",
    images: ["/image/axomen-logo.png"],
    creator: "@axomen",
  },
  alternates: {
    canonical: "https://axomen.com",
    languages: {
      "en-IN": "https://axomen.com",
      "hi-IN": "https://axomen.com/?lang=hi",
    },
  },
  icons: {
    icon: [
      { url: "/image/favicon/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/image/favicon/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/image/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/image/favicon/favicon.ico",
    apple: [{ url: "/image/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${anton.variable} ${syne.variable} ${dmSans.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <I18nProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
          <PageLoader />
        </I18nProvider>
      </body>
    </html>
  );
}
