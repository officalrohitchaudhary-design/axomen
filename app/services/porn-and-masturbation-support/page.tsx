import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Combined Porn & Masturbation Recovery Support | AxoMen India",
  description:
    "Confidential, human-guided recovery support for men trapped in the dual porn and masturbation habit cycle. Practical urge surfing, neurobiology, and 1-on-1 sessions.",
  keywords: [
    "help with porn and masturbation habits",
    "how to manage sexual urges",
    "how to manage lustful thoughts",
    "help changing unwanted sexual habits",
    "repeated failed attempts to quit porn",
    "men's sexual health India",
    "dopamine rewire sexual health India",
    "compulsive sexual behaviour support",
    "quit porn and masturbation",
    "urge control techniques for men",
  ],
  alternates: {
    canonical: "https://axomen.com/services/porn-and-masturbation-support",
    languages: {
      "en-IN": "https://axomen.com/services/porn-and-masturbation-support",
      "hi-IN": "https://axomen.com/services/porn-and-masturbation-support?lang=hi",
    },
  },
  openGraph: {
    title: "Combined Porn & Masturbation Recovery Support | AxoMen",
    description:
      "Break free from the dual porn and masturbation loop with structured 1-on-1 human guidance. 100% confidential men's sexual health support.",
    url: "https://axomen.com/services/porn-and-masturbation-support",
    type: "website",
    images: [
      {
        url: "/image/axomen-logo.png",
        width: 1200,
        height: 630,
        alt: "AxoMen Combined Recovery Support",
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: "Why is the combined porn and masturbation cycle so hard to break?",
    a: "When digital pornography and masturbation are paired together repeatedly, they form a hyper-coupled feedback loop. Porn provides artificial novelty and spikes dopamine, while masturbation provides the physical neurochemical payoff (endorphins, oxytocin, prolactin). The brain links the two into an automated, almost involuntary ritual.",
  },
  {
    q: "How does AxoMen help decouple this habit pattern?",
    a: "We address the pattern through cognitive cue-disruption, environmental barrier design, and somatic urge surfing. In private 1-on-1 sessions, your recovery educator works with you to interrupt the loop at the very first trigger before the physical cascade becomes irresistible.",
  },
  {
    q: "I have tried quitting 10+ times and failed. Can AxoMen help?",
    a: "Repeated relapses are the standard experience when relying solely on willpower. Willpower is an exhaustible mental battery. Real change happens when you implement structured environmental friction, identify emotional triggers (stress, loneliness), and have an empathetic accountability guide.",
  },
  {
    q: "Are the consultations completely private?",
    a: "Yes. All sessions are 100% confidential. You can attend audio-only with your camera turned off, and your details are never shared with family, colleagues, or outside organisations.",
  },
];

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Combined Porn & Masturbation Recovery Support",
      serviceType: "Men's Sexual Health Habit Recovery Education",
      provider: {
        "@type": "MedicalOrganization",
        name: "AxoMen",
        url: "https://axomen.com",
      },
      areaServed: "India",
      description:
        "Comprehensive recovery education and 1-on-1 guidance for men seeking to overcome combined compulsive porn consumption and masturbation habits.",
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

export default function CombinedSupportPage() {
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
                  Combined Support
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
              Support for Combined Porn Use &amp; Compulsive Masturbation Habits
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8 font-normal">
              For most men, porn and masturbation are not isolated habits—they form an intertwined, high-dopamine cycle that triggers intrusive lustful thoughts, exhaustion, and chronic brain fog. AxoMen provides structured, human-guided recovery support to dismantle the dual habit loop.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 max-w-md">
              <Link
                href="/booking"
                id="book-combined-session-btn"
                className="inline-flex items-center justify-center bg-[#1a5bd9] hover:bg-[#154bb3] active:scale-[0.98] text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg transition-all text-center"
              >
                Book a Free 1-on-1 Consultation
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
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1a5bd9]">Dual Loop</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Decoupling Strategy</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0a1128]">45 Days</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Average Clarity Window</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1a5bd9]">100%</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Judgment-Free Care</p>
            </div>
          </div>
        </section>

        {/* ── How the Dual Loop Operates ── */}
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-12">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1a5bd9] mb-2">
                The Anatomy of the Cycle
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-[#0a1128] tracking-tight">
                Why one behavior immediately triggers the other
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a5bd9] flex items-center justify-center font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">The Digital Trigger</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A casual scroll on social media, late-night phone browsing, or emotional distress triggers an intense spike in dopamine anticipation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a5bd9] flex items-center justify-center font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Compulsive Consumption</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Porn site visits follow. The endless variety accelerates dopamine, shutting down the prefrontal cortex and compelling immediate masturbation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a5bd9] flex items-center justify-center font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">The Prolactin Crash</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  After climax, a sharp drop in dopamine combined with a surge in prolactin produces instant regret, numbness, and brain fog, setting the stage for future cravings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Breaking the Cycle with AxoMen ── */}
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9fc] border-t border-b border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1a5bd9] mb-2">
                A Structured Recovery Blueprint
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-[#0a1128] tracking-tight">
                Our evidence-informed approach to rewiring your habit circuitry
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">1. Decoupling Stimulus &amp; Action</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We introduce cognitive pause intervals between the visual cue and the physical response, breaking the automatic reflex loop.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">2. Urge Surfing &amp; Somatic Reset</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Master 3-minute somatic breath and nervous system reset techniques that dispel intense cravings without relying on willpower alone.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">3. Nighttime Friction Architecture</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Design airtight physical safeguards for your bedroom and smartphone during peak vulnerable hours between 11 PM and 2 AM.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">4. 1-on-1 Human Accountability</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Work directly with a compassionate recovery educator who understands Indian cultural context and helps you navigate real life triggers.
                </p>
              </div>
            </div>

            {/* Mid Page CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-[#0a1128] hover:bg-[#1a254d] active:scale-[0.98] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all shadow-md"
              >
                Schedule Your Confidential 1-on-1 Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1a5bd9] mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-[#0a1128] tracking-tight">
                Answers About Combined Habit Support
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
