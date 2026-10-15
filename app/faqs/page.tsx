import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Men's Sexual Health & Recovery | AxoMen",
  description:
    "Get clear, expert answers on men's sexual health, how to stop masturbation addiction, online porn counselling, and urge surfing. Book your first session free at AxoMen.",
  keywords: [
    "How to Stop Masturbation Addiction",
    "Online Masturbation Counselling",
    "Online Porn Counselling",
    "Online Sex Counselling",
    "online sex counselling India",
    "Masturbation Addiction Treatment in India",
    "masturbation addiction treatment",
    "AxoMen FAQs",
    "men's sexual health questions India",
    "how to stop porn questions",
    "compulsive masturbation FAQ",
    "confidential recovery India",
    "urge surfing questions",
    "AxoMen reviews",
  ],
  alternates: {
    canonical: "https://axomen.com/faqs",
    languages: {
      "en-IN": "https://axomen.com/faqs",
      "hi-IN": "https://axomen.com/faqs?lang=hi",
    },
  },
  openGraph: {
    title: "Frequently Asked Questions | AxoMen",
    description:
      "Clear, honest answers to common questions about men's sexual health, porn habit recovery, and urge management.",
    url: "https://axomen.com/faqs",
    type: "website",
    images: [
      {
        url: "/image/axomen-logo.png",
        width: 1200,
        height: 630,
        alt: "AxoMen FAQs",
      },
    ],
  },
};

const FAQ_SECTIONS = [
  {
    category: "Men's Sexual Health & Habit Recovery",
    items: [
      {
        q: "What is AxoMen and how does it fit into Men's Sexual Health?",
        a: "AxoMen is a dedicated men's sexual health platform. While conventional healthcare often focuses primarily on clinical issues through medications, AxoMen specializes in the behavioural and neurological aspects of sexual health—specifically unwanted porn use, compulsive masturbation habits, and difficulty managing sexual urges.",
      },
      {
        q: "Why do willpower-only attempts usually fail?",
        a: "Pure willpower exhausts glucose and cognitive bandwidth in the prefrontal cortex. Unwanted porn and masturbation habits are deeply wired dopamine feedback loops. Without changing the emotional cue, routine, and environmental triggers, willpower inevitably buckles during moments of stress or tiredness.",
      },
      {
        q: "What is urge surfing?",
        a: "Urge surfing is an evidence-based somatic mindfulness technique where you observe a sexual urge as a physical wave without judging it, panicking, or immediately acting on it. Neurobiological research shows urges naturally crest and subside within 3 to 10 minutes if not fed by compulsive browsing.",
      },
    ],
  },
  {
    category: "Porn & Masturbation Habit Concerns",
    items: [
      {
        q: "Where can I find masturbation addiction treatment in India?",
        a: "AxoMen provides India's premier online, confidential masturbation addiction treatment and habit recovery platform. Through private 1-on-1 human-guided sessions, men across India learn evidence-based urge-control techniques, dopamine rebalancing, and practical behavioural tools to overcome compulsive habits.",
      },
      {
        q: "How do I know if my porn use has become compulsive?",
        a: "Key signs include spending excessive hours browsing multiple tabs, escalating to extreme categories to feel aroused, continuing despite feeling guilty, experiencing brain fog or poor academic/work performance, or having difficulty staying aroused with real partners.",
      },
      {
        q: "Can excessive masturbation cause physical and mental exhaustion?",
        a: "Yes. Compulsive masturbation accompanied by high-dopamine digital stimulation depletes neurochemicals (including dopamine and norepinephrine) while sharply elevating prolactin, leading to temporary sluggishness, lack of drive, and brain fog.",
      },
      {
        q: "How does AxoMen help with lust-related intrusive thoughts?",
        a: "We teach cognitive reframing, attention redirect protocols, and stimulus barrier construction. When your brain learns that an intrusive lustful thought does not mandate an immediate physical reaction, the frequency of such thoughts decreases dramatically.",
      },
    ],
  },
  {
    category: "Sessions & Confidentiality",
    items: [
      {
        q: "Are the sessions strictly confidential?",
        a: "Yes, 100%. What is discussed between you and your recovery educator is never recorded, shared, or publicized. You can keep your webcam turned off for complete anonymity if preferred.",
      },
      {
        q: "What languages are available for sessions?",
        a: "Sessions are primarily conducted in English, Hindi, and conversational Hinglish to ensure you can communicate openly and comfortably.",
      },
      {
        q: "Does AxoMen provide medical diagnosis or prescribe medicine?",
        a: "No. AxoMen offers structured behavioural habit education, peer support, and lifestyle coaching. We do not provide clinical psychiatric diagnosis or medical prescriptions. If you have medical concerns, we advise consulting a certified healthcare professional.",
      },
    ],
  },
];

const ALL_FAQS = FAQ_SECTIONS.flatMap((sec) => sec.items);

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: ALL_FAQS.map((item) => ({
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

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_DATA) }}
      />
      <main className="min-h-screen bg-white">
        {/* ── Hero Section ── */}
        <section className="w-full bg-[#0a1128] text-white pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#e9e315] text-xs font-bold uppercase tracking-wider mb-5 border border-white/15">
              <span>Knowledge Base &amp; FAQ</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Frequently Asked Questions on Men&apos;s Sexual Health &amp; Recovery
            </h1>

            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
              Find transparent, research-backed answers about unwanted porn habits, compulsive masturbation, urge surfing, and our confidential 1-on-1 human guidance sessions.
            </p>

            <Link
              href="/booking"
              id="faqs-hero-book-btn"
              className="inline-flex items-center justify-center bg-[#1a5bd9] hover:bg-[#154bb3] active:scale-[0.98] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Book a Free Confidential Session
            </Link>
          </div>
        </section>

        {/* ── FAQ Categories Accordion / Lists ── */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto space-y-16">
            {FAQ_SECTIONS.map((section, sIdx) => (
              <div key={sIdx}>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0a1128] border-b border-gray-200 pb-3 mb-6 tracking-tight">
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-[#fafafa] hover:border-gray-300 transition-all"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                        {item.q}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
