import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "How It Works — 4-Step Recovery Process | AxoMen India",
  description:
    "Discover AxoMen's original 4-step recovery pathway: 1) Book a Private Session, 2) Understand Your Root Cause, 3) Get Your Personalised Plan, 4) Learn, Practise & Improve. 5 Indian languages supported.",
  keywords: [
    "how AxoMen works",
    "4 step recovery process India",
    "men's sexual health consultation process",
    "porn habit recovery steps",
    "masturbation habit coaching process",
    "understand root cause triggers",
    "personalised habit recovery plan",
    "AxoMen India how it works",
  ],
  alternates: {
    canonical: "https://axomen.com/how-it-works",
    languages: {
      "en-IN": "https://axomen.com/how-it-works",
      "hi-IN": "https://axomen.com/how-it-works?lang=hi",
    },
  },
  openGraph: {
    title: "How AxoMen Works — 4-Step Recovery Process",
    description:
      "Start with a private conversation. Discover root triggers. Get your personalised plan. Practise and improve with 1-on-1 human guidance.",
    url: "https://axomen.com/how-it-works",
    type: "website",
    images: [
      {
        url: "/image/four-stepss.png",
        width: 1024,
        height: 1536,
        alt: "How AxoMen Works - 4 Step Recovery Journey",
      },
    ],
  },
};

const FOUR_STEPS = [
  {
    stepNumber: "01",
    title: "Book a Private Session",
    tagline: "Start with a private conversation. No judgment, no pressure.",
    description:
      "Connect 1-on-1 with a compassionate recovery specialist over a secure, confidential audio or video link. You can keep your camera completely off. A safe, judgment-free space to speak openly about compulsive porn habits, masturbation cycles, and personal challenges.",
    badges: ["100% Private", "No Pressure", "Camera Optional"],
    checklist: [
      { label: "Confidential 1-on-1 link", detail: "Private link with zero public exposure" },
      { label: "Camera optional", detail: "Audio-only if you prefer full anonymity" },
      { label: "Zero judgment", detail: "No moral lectures or clinical shame" },
    ],
    accentColor: "#1a5bd9",
    bgSoft: "#f0f5ff",
  },
  {
    stepNumber: "02",
    title: "Understand Your Root Cause",
    tagline: "Discover triggers, emotions, and patterns behind your habits.",
    description:
      "Compulsive porn and masturbation use are rarely just about libido—they are learned neurological coping loops. We uncover what truly drives your urge spikes so you stop fighting an uphill battle with raw willpower alone.",
    badges: ["Root-Cause Discovery", "Triggers & Cues", "Dopamine Loop"],
    checklist: [
      { label: "Triggers", detail: "Late-night phone browsing, solitary weekends, unstructured time" },
      { label: "Emotions", detail: "Work stress, loneliness, fatigue, boredom, anxiety escapism" },
      { label: "Patterns", detail: "Compulsive autopilot cues and escalating sexual novelty seeking" },
    ],
    accentColor: "#0b7285",
    bgSoft: "#e6fcf5",
  },
  {
    stepNumber: "03",
    title: "Get Your Personalised Plan",
    tagline: "Learn practical ways to handle urges and change daily routines.",
    description:
      "No generic advice or restrictive porn blockers that simply get uninstalled. We design a realistic recovery roadmap built around your job, personal commitments, and everyday lifestyle in India.",
    badges: ["Personalised Plan", "Urge Tools", "Daily Routine"],
    checklist: [
      { label: "Better Habits", detail: "Healthy dopamine sources, fitness, and daily self-command" },
      { label: "Healthy Mind", detail: "Cognitive reframing, overcoming post-relapse guilt and shame" },
      { label: "Daily Routine", detail: "Nighttime device wind-down and high-risk friction routines" },
      { label: "Long Term Goals", detail: "Reclaimed focus, emotional clarity, and healthy sexual vitality" },
    ],
    accentColor: "#0a3528",
    bgSoft: "#edf7f3",
  },
  {
    stepNumber: "04",
    title: "Learn, Practise & Improve",
    tagline: "Practise what you learn, review your progress, and get support along the way.",
    description:
      "Sustainable freedom is a learned skill, not an overnight switch. As you test practical urge-surfing techniques in real life, you receive continuous human guidance to review triggers objectively and build long-term resilience.",
    badges: ["Ongoing Mentorship", "Progress Tracking", "Relapse Prevention"],
    checklist: [
      { label: "Track Progress", detail: "Monitor clean streaks, reduced cravings, and energy gains" },
      { label: "Stay Motivated", detail: "Constructive feedback and encouragement without punishment" },
      { label: "Get Support", detail: "Direct guidance whenever intense urges or stress triggers arise" },
    ],
    accentColor: "#099268",
    bgSoft: "#ebfbee",
  },
];

const SUPPORTED_LANGUAGES = [
  { name: "English", native: "English", icon: "🌐" },
  { name: "Hindi", native: "अ हिंदी", icon: "🇮🇳" },
  { name: "Punjabi", native: "प ਪੰਜਾਬੀ", icon: "🇮🇳" },
  { name: "Marathi", native: "अ मराठी", icon: "🇮🇳" },
  { name: "Telugu", native: "అ తెలుగు", icon: "🇮🇳" },
];

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How AxoMen's 4-Step Recovery Process Works",
      description:
        "The original 4-step recovery pathway helping men in India overcome unwanted porn habits and compulsive masturbation with confidential human-guided support.",
      step: FOUR_STEPS.map((s, idx) => ({
        "@type": "HowToStep",
        position: idx + 1,
        name: s.title,
        text: `${s.tagline} ${s.description}`,
      })),
    },
    {
      "@type": "MedicalWebPage",
      url: "https://axomen.com/how-it-works",
      name: "How It Works: 4 Steps to Freedom | AxoMen",
      description:
        "Confidential 4-step process for men's sexual health: Book a Private Session, Understand Root Cause, Get Your Personalised Plan, Learn Practise & Improve.",
    },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_DATA) }}
      />
      <main className="min-h-screen bg-white">
        {/* ── Hero Section ── */}
        <section className="w-full bg-[#0a1128] text-white pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#e9e315] text-xs font-bold uppercase tracking-wider mb-5 border border-white/15">
              <span>Your Journey Starts Here • 4-Step Proven Pathway</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              How AxoMen Works: 4 Simple Steps to Regain Control
            </h1>

            <p className="text-white/85 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
              No shame. No moral lectures. Start with a private conversation, uncover your root triggers, follow a custom daily plan, and build lasting self-command.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                id="how-it-works-book-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1a5bd9] hover:bg-[#154bb3] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Book a Free Session
              </Link>
              <a
                href="#visual-infographic"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl transition-all"
              >
                View 4-Step Infographic ↓
              </a>
            </div>
          </div>
        </section>

        {/* ── 4 Detailed Steps ── */}
        <section className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-[#1a5bd9] font-bold text-xs uppercase tracking-widest">
                The Core Process
              </span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a1128] mt-2 mb-3 tracking-tight"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Our 4 Original Steps We Follow
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Structured, judgment-free education crafted to help you understand the habit loop and take permanent control of your sexual urges.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {FOUR_STEPS.map((s) => (
                <div
                  key={s.stepNumber}
                  className="p-6 sm:p-9 rounded-2xl sm:rounded-3xl border border-gray-200 bg-[#fafafa] hover:border-[#1a5bd9]/40 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Left: Step Number + Text */}
                    <div className="flex items-start gap-4 sm:gap-6 flex-1">
                      <span
                        className="text-3xl sm:text-4xl font-black font-mono leading-none shrink-0 px-3.5 py-2.5 rounded-2xl bg-white border border-gray-200 shadow-xs"
                        style={{ color: s.accentColor }}
                      >
                        {s.stepNumber}
                      </span>
                      <div>
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {s.badges.map((b) => (
                            <span
                              key={b}
                              className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-tight bg-white border border-gray-200 text-[#0a1128]"
                            >
                              {b}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3
                          className="text-xl sm:text-2xl font-bold text-[#0a1128] tracking-tight mb-1"
                          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                        >
                          {s.title}
                        </h3>

                        {/* Tagline from image */}
                        <p className="text-sm sm:text-base font-semibold text-[#1a5bd9] mb-3">
                          {s.tagline}
                        </p>

                        {/* Description */}
                        <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed max-w-2xl mb-5">
                          {s.description}
                        </p>

                        {/* Checklists from Image */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-gray-150">
                          {s.checklist.map((c) => (
                            <div
                              key={c.label}
                              className="flex items-start gap-2 bg-white p-3 rounded-xl border border-gray-100"
                            >
                              <span className="text-[#099268] font-bold text-sm shrink-0">✓</span>
                              <div className="text-xs">
                                <span className="font-bold text-[#0a1128] block">
                                  {c.label}
                                </span>
                                <span className="text-gray-500 block leading-tight mt-0.5">
                                  {c.detail}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Visual Infographic Section ── */}
            <div id="visual-infographic" className="mt-20 scroll-mt-24">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-[#1a5bd9] font-bold text-xs uppercase tracking-widest">
                  Visual Infographic
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-extrabold text-[#0a1128] mt-1 mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Your Journey Starts Here
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Better Habits. Brighter Future. See the complete visual blueprint of the 4 steps below.
                </p>
              </div>

              <div className="w-full max-w-3xl mx-auto rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white hover:border-[#1a5bd9]/40 transition-all p-3 sm:p-5">
                <Link
                  href="/booking"
                  className="block cursor-pointer group relative"
                  aria-label="Book your private session on AxoMen"
                >
                  <Image
                    src="/image/four-stepss.png"
                    alt="AxoMen 4-Step Recovery Journey: Book Private Session, Understand Root Cause, Personalised Plan, Learn Practise Improve"
                    width={1024}
                    height={1536}
                    className="w-full h-auto object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.008]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 768px"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-2xl flex items-end justify-center pb-6">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#0a1128] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      Click to Book Private Session →
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* ── 5 Languages Supported Section (From Bottom of Image) ── */}
            <div className="mt-16 p-6 sm:p-10 rounded-3xl bg-[#f0f5ff] border border-[#d0e0ff] text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#1a5bd9] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#d0e0ff] shadow-xs">
                <span>Inclusive Cultural Support</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#0a1128] mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                5 Languages Supported
              </h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-6">
                Talk freely in the language you are most comfortable with. Our recovery specialists understand Indian cultural nuances, family pressures, and personal privacy.
              </p>

              {/* Language Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto mb-8">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-xs hover:border-[#1a5bd9] transition-colors"
                  >
                    <span className="text-base">{lang.icon}</span>
                    <span className="text-sm font-bold text-[#0a1128]">
                      {lang.native}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-[#1a5bd9] hover:bg-[#154bb3] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all shadow-md"
              >
                Start Your Journey in Your Language
              </Link>
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
