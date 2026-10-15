import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Masturbation Addiction Treatment in India | Online Counselling — AxoMen",
  description:
    "Looking for masturbation addiction treatment in India? Learn how to stop masturbation addiction with online masturbation counselling. Get your first confidential 1-on-1 session free.",
  keywords: [
    "How to Stop Masturbation Addiction",
    "how to stop masturbation addiction",
    "Online Masturbation Counselling",
    "online masturbation counselling India",
    "Masturbation Addiction Treatment in India",
    "masturbation addiction treatment in India",
    "masturbation addiction treatment",
    "masturbation addiction doctor India",
    "masturbation addiction help India",
    "compulsive masturbation recovery India",
    "help with unwanted masturbation habits",
    "how to manage masturbation habits",
    "difficulty controlling masturbation",
    "masturbation habit support",
    "compulsive masturbation India",
    "overcome excessive masturbation",
    "how to reduce masturbation urges",
    "men's sexual health India",
    "sexual urge control coaching",
    "dopamine rewiring masturbation",
  ],
  alternates: {
    canonical: "https://axomen.com/services/masturbation-habit-support",
    languages: {
      "en-IN": "https://axomen.com/services/masturbation-habit-support",
      "hi-IN": "https://axomen.com/services/masturbation-habit-support?lang=hi",
    },
  },
  openGraph: {
    title: "Masturbation Addiction Treatment in India | Online Counselling | AxoMen",
    description:
      "Learn how to stop masturbation addiction with confidential online masturbation counselling in India. Rebuild self-discipline and vitality. First session free.",
    url: "https://axomen.com/services/masturbation-habit-support",
    type: "website",
    images: [
      {
        url: "/image/axomen-logo.png",
        width: 1200,
        height: 630,
        alt: "AxoMen Masturbation Addiction Treatment & Habit Support in India",
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: "How to stop masturbation addiction through online counselling?",
    a: "Stopping compulsive masturbation requires addressing the neurological cue-routine-reward loop rather than relying solely on willpower. Through AxoMen's online masturbation counselling, you work 1-on-1 with an empathetic educator to identify personal stress and boredom triggers, install somatic urge surfing techniques, and build lasting self-control. Your first session is completely free.",
  },
  {
    q: "Does AxoMen offer masturbation addiction treatment in India?",
    a: "Yes. AxoMen provides specialized, confidential masturbation addiction treatment and habit recovery guidance across India. Through structured 1-on-1 private sessions, our educators help men address the psychological and dopamine cues behind compulsive masturbation, install practical urge-surfing protocols, and build lasting self-mastery without moral shame.",
  },
  {
    q: "Is masturbation inherently bad or harmful?",
    a: "No. Masturbation is a natural biological function. However, when it becomes compulsive—used repeatedly as an automatic coping mechanism for stress, boredom, or negative emotions, or occurring multiple times daily accompanied by fatigue and loss of focus—it can negatively impact a man's vitality, relationships, and self-confidence.",
  },
  {
    q: "How does AxoMen help manage unwanted masturbation urges?",
    a: "We address the underlying habit cue rather than relying on self-blame or willpower. Through confidential 1-on-1 sessions, we help you identify boredom and stress triggers, practice somatic urge surfing, establish physical boundary protocols, and redirect sexual energy productively.",
  },
  {
    q: "What should I expect in a confidential session?",
    a: "A 100% judgment-free space with an empathetic recovery educator. You can keep your camera turned off. We listen to your history, understand what triggers your habit loop, and formulate a step-by-step daily routine to regain conscious control.",
  },
  {
    q: "Does this involve medications or clinical therapy?",
    a: "No. AxoMen provides behavioural habit education, lifestyle modifications, and structured personal guidance. We do not diagnose psychiatric disorders or prescribe clinical drugs. If you suffer from underlying clinical conditions, we encourage consulting a licensed doctor or specialist.",
  },
];

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Masturbation Addiction Treatment in India & Habit Support",
      serviceType: "Masturbation Addiction Treatment & Men's Sexual Health Habit Recovery Education",
      provider: {
        "@type": "MedicalOrganization",
        name: "AxoMen",
        url: "https://axomen.com",
      },
      areaServed: "India",
      description:
        "Structured, confidential masturbation addiction treatment and habit recovery guidance in India for men dealing with unwanted, excessive, or compulsive masturbation habits.",
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

export default function MasturbationHabitSupportPage() {
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
                  Masturbation Addiction Treatment in India
                </li>
              </ol>
            </nav>

            {/* Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#e9e315] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
              <span>Masturbation Addiction Treatment in India</span>
              <span>•</span>
              <span>Trusted by 1K+ Men</span>
            </div>

            {/* H1 Heading */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight leading-[1.18] text-white max-w-3xl mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Masturbation Addiction Treatment &amp; Habit Recovery Support in India
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8 font-normal">
              When masturbation turns from an occasional release into an automatic, compulsive addiction reacting to stress, loneliness, or boredom, it can drain your physical vitality, focus, and confidence. AxoMen provides India&apos;s trusted, confidential masturbation addiction treatment and habit support to help you break free and regain complete self-command.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 max-w-md">
              <Link
                href="/booking"
                id="book-masturbation-session-btn"
                className="inline-flex items-center justify-center bg-[#1a5bd9] hover:bg-[#154bb3] active:scale-[0.98] text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg transition-all text-center"
              >
                Book a Confidential Session
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
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Men Supported</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1a5bd9]">1-on-1</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Private Consultations</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0a1128]">30+</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Urge-Control Tools</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1a5bd9]">100%</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Confidential Care</p>
            </div>
          </div>
        </section>

        {/* ── Signs of Compulsive Masturbation Habits ── */}
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-12">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1a5bd9] mb-2">
                Common Experiences
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-[#0a1128] tracking-tight">
                When does an occasional habit become a compulsive pattern?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Stress &amp; Emotion Regulator</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Masturbating not because of genuine physical arousal, but as an escape from work stress, loneliness, anxiety, or insomnia.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Physical Fatigue &amp; Brain Fog</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Experiencing persistent low energy, difficulty focusing on studies or work, and feeling physically depleted the next morning.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Loss of Voluntary Control</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Repeatedly promising yourself that &ldquo;today is the last time,&rdquo; only to surrender to an urge within 24 to 48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Practical Framework for Change ── */}
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9fc] border-t border-b border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1a5bd9] mb-2">
                The AxoMen Method
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-[#0a1128] tracking-tight">
                How we guide you from habit exhaustion to disciplined vitality
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Urge Surfing Protocols</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Learn to witness intense physical urges without panicking. Urges are like ocean waves—they peak and subside within minutes if not fed by compulsive mental imagery.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Boundary Architecture</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Set practical friction around your bedroom, bathroom, and smartphone habits during late hours so you never face high urges in isolated environments.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Dopamine Re-anchoring</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Substitute compulsive release with active physical routines (strength training, breathwork, cold water exposure, deep creative work) to channel sexual vitality productively.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Non-Judgmental Accountability</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Discuss setbacks transparently without fear of condemnation. We evaluate every close call scientifically to strengthen your future defences.
                </p>
              </div>
            </div>

            {/* Mid Page CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-[#0a1128] hover:bg-[#1a254d] active:scale-[0.98] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all shadow-md"
              >
                Book Your 1-on-1 Consultation Today
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
                Answers About Masturbation Addiction Treatment &amp; Habit Support
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
