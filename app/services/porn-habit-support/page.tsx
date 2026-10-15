import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Porn Habit Support & Recovery Guidance | AxoMen India",
  description:
    "Confidential, human-guided support for men struggling with unwanted porn use. Understand dopamine loops, regain focus, and build practical urge-control habits.",
  keywords: [
    "how to quit porn",
    "help with porn habits",
    "how to stop watching porn",
    "compulsive porn use support",
    "online porn recovery support",
    "quit porn India",
    "porn addiction help India",
    "men's sexual health India",
    "dopamine detox porn",
    "urge surfing techniques",
  ],
  alternates: {
    canonical: "https://axomen.com/services/porn-habit-support",
    languages: {
      "en-IN": "https://axomen.com/services/porn-habit-support",
      "hi-IN": "https://axomen.com/services/porn-habit-support?lang=hi",
    },
  },
  openGraph: {
    title: "Porn Habit Support & Recovery Guidance | AxoMen",
    description:
      "Confidential 1-on-1 recovery education for men struggling with unwanted porn use. Rewire your habits with non-judgmental guidance.",
    url: "https://axomen.com/services/porn-habit-support",
    type: "website",
    images: [
      {
        url: "/image/axomen-logo.png",
        width: 1200,
        height: 630,
        alt: "AxoMen Porn Habit Support",
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: "Why does willpower alone keep failing after 3 to 7 days?",
    a: "Compulsive digital porn triggers massive surges of dopamine in the brain's reward center. When stress, fatigue, or boredom strike, your brain automatically seeks that dopamine surge. Trying to resist through sheer willpower without addressing the underlying cue-routine-reward loop creates cognitive fatigue and leads to relapse.",
  },
  {
    q: "How do 1-on-1 human-guided sessions work at AxoMen?",
    a: "In a confidential, 100% judgment-free session, your recovery educator helps you map out your specific triggers (late-night screen time, loneliness, workplace stress). Together, you build a practical day-by-day urge control plan using urge surfing and habit replacement tools.",
  },
  {
    q: "Will my identity and session remain confidential?",
    a: "Absolutely. Confidentiality is our founding principle. You are welcome to keep your camera turned off for an audio-only session, and your personal information is never recorded, published, or shared with third parties.",
  },
  {
    q: "Does AxoMen provide medical prescriptions or clinical diagnosis?",
    a: "No. AxoMen offers structured behavioural habit education, peer and educator guidance, and recovery lifestyle coaching. We do not provide clinical psychiatric diagnosis or medical prescriptions. For clinical medical conditions, we encourage consulting a certified healthcare professional.",
  },
];

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Porn Habit Support & Recovery Guidance",
      serviceType: "Men's Sexual Health Habit Recovery Education",
      provider: {
        "@type": "MedicalOrganization",
        name: "AxoMen",
        url: "https://axomen.com",
      },
      areaServed: "India",
      description:
        "Personalised, confidential 1-on-1 recovery education and urge management for men seeking to break unwanted porn habits.",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default function PornHabitSupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_DATA) }}
      />
      <main className="min-h-screen bg-white">
        {/* ── Breadcrumb & Hero Section ── */}
        <section className="w-full bg-[#0a1128] text-white pt-10 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2 text-xs sm:text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <span className="text-[#16aee2]">Men's Sexual Health</span>
                </li>
                <li>/</li>
                <li className="text-white font-medium" aria-current="page">
                  Porn Habit Support
                </li>
              </ol>
            </nav>

            {/* Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#e9e315] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
              <span>Men's Sexual Health Specialisation</span>
              <span>•</span>
              <span>Trusted by 1K+ Men</span>
            </div>

            {/* H1 Heading */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight leading-[1.18] text-white max-w-3xl mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Confidential Support for Unwanted Porn Use &amp; Habit Recovery
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8 font-normal">
              Struggling with repeated unsuccessful attempts to quit? You are not broken. Unwanted porn consumption is a powerful neurological habit loop. AxoMen provides practical, confidential, human-guided recovery sessions to help you regain mental clarity and self-control.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 max-w-md">
              <Link
                href="/booking"
                id="book-porn-session-btn"
                className="inline-flex items-center justify-center bg-[#1a5bd9] hover:bg-[#154bb3] active:scale-[0.98] text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg transition-all text-center"
              >
                Book a Free 1-on-1 Session
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all text-center"
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* ── Key Metrics Bar ── */}
        <section className="w-full bg-[#f4f6fa] border-b border-[#E3E8F0] py-6 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0a1128]">1,000+</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Men Guided in India</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1a5bd9]">100%</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Confidential &amp; Private</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0a1128]">97%</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Report Reduced Urges</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1a5bd9]">0%</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Judgment or Shame</p>
            </div>
          </div>
        </section>

        {/* ── Understanding the Problem: The Dopamine Loop ── */}
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-12">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1a5bd9] mb-2">
                Why Quitting Alone Feels Difficult
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-[#0a1128] tracking-tight">
                It is not a lack of morals. It is an engineered habit loop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a5bd9] flex items-center justify-center font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">The Hidden Trigger</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Triggers are rarely just lust. Most men turn to porn when experiencing fatigue, late-night boredom, loneliness, exam anxiety, or job frustration.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a5bd9] flex items-center justify-center font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Dopamine Desensitisation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Novelty and high stimulation overwhelm dopamine receptors. Over time, normal daily activities feel dull, increasing compulsive urges.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a5bd9] flex items-center justify-center font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">The Guilt &amp; Relapse Spiral</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  After viewing, guilt and brain fog take over. Trying to suppress thoughts without tools creates cognitive rebound, leading straight back to the habit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What AxoMen Provides ── */}
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9fc] border-t border-b border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1a5bd9] mb-2">
                Personalised Recovery Support
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-[#0a1128] tracking-tight">
                How our 1-on-1 human-guided sessions help you break the cycle
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Confidential Trigger Mapping
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Identify your specific high-risk hours, digital trigger environments, and emotional cues without judgment or embarrassment.
                  </p>
                </div>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Urge Surfing &amp; Somatic Tools
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Learn practical techniques to ride out intense urges within 3 to 10 minutes rather than fighting them or giving in.
                  </p>
                </div>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Digital Environmental Friction
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Build smart digital boundaries around late-night phone habits, bedroom device usage, and browsing routines.
                  </p>
                </div>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Structured 30 to 90 Day Blueprint
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A step-by-step roadmap designed for your daily routine, with milestone tracking and practical replacement habits.
                  </p>
                </div>
              </div>
            </div>

            {/* Mid Page CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-[#0a1128] hover:bg-[#1a254d] active:scale-[0.98] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all shadow-md"
              >
                Schedule Your Private 1-on-1 Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* ── Frequently Asked Questions ── */}
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1a5bd9] mb-2">
                Clear Answers
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-[#0a1128] tracking-tight">
                Frequently Asked Questions About Porn Habit Support
              </p>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-[#fafafa]"
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    {item.q}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Medical Disclaimer ── */}
        <section className="w-full py-6 px-4 bg-[#f4f6fa] border-t border-gray-200 text-center">
          <p className="max-w-3xl mx-auto text-xs text-gray-500 leading-relaxed">
            <strong>Medical Disclaimer:</strong> AxoMen provides structured behavioural recovery education, habit management frameworks, and confidential human-guided coaching. Our services are educational and supportive in nature and do not constitute clinical psychiatric diagnosis, medical prescription, or formal healthcare treatment.
          </p>
        </section>
      </main>
    </>
  );
}
