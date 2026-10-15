import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BenefitsSection from "@/components/BenefitsSection";
import HowBookingWorksSection from "@/components/HowBookingWorksSection";
import IndividualFAQSection from "@/components/IndividualFAQSection";

export const metadata: Metadata = {
  title: "Couples Recovery & Intimacy Program | AxoMen",
  description:
    "Confidential guidance for couples affected by compulsive sexual habits and porn use. Rebuild emotional intimacy, trust, and mutual understanding.",
  alternates: {
    canonical: "https://axomen.com/couples",
  },
};

export default function CouplesPage() {
  const highlights = [
    {
      title: "Rebuilding Broken Trust",
      desc: "Compassionate guidance to address betrayal trauma and begin transparent emotional repair.",
    },
    {
      title: "Addressing Porn-Induced Intimacy Issues",
      desc: "Scientific education on how porn alters desire, erectile performance, and physical connection.",
    },
    {
      title: "Safe, Neutral Communication Space",
      desc: "Structured conversations with a neutral recovery advocate without blame or shame.",
    },
    {
      title: "Joint Recovery & Boundary Planning",
      desc: "Constructive digital boundaries and bonding habits to safeguard your relationship together.",
    },
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* ── VERY FIRST SECTION: Talkspace-style Split Banner (Sky Blue + single.jpg) ── */}
      <section
        id="couples-hero"
        className="w-full bg-[#bde0fe] overflow-hidden md:h-[440px] lg:h-[480px] flex flex-col md:flex-row items-stretch"
      >
        {/* Left: Text & Buttons */}
        <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col justify-center px-5 sm:px-10 md:px-12 lg:px-16 py-10 sm:py-14 md:py-0">
          <div className="max-w-xl">
            {/* Main Heading */}
            <h1
              className="text-[#0e2942] text-3xl sm:text-4xl lg:text-[42px] font-black leading-[1.14] tracking-tight mb-3.5 sm:mb-4"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Online recovery for couples
            </h1>

            {/* Subtitle description */}
            <p
              className="text-[#0e2942]/85 text-sm sm:text-base lg:text-[15.5px] leading-relaxed mb-6 sm:mb-8 font-medium"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              A private, compassionate space where you and your partner can heal from
              betrayal trauma, address intimacy struggles, and rebuild authentic trust
              together with expert recovery guidance.
            </p>

            {/* Buttons: Book a Session & Give Free Assessment Test */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-[#0e2942] hover:bg-[#081b2c] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg text-center"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Book Free Session
              </Link>
              {/* 
              <Link
                href="/porn-addiction-test"
                className="inline-flex items-center justify-center bg-transparent hover:bg-[#0e2942]/10 active:scale-[0.98] border-2 border-[#0e2942] text-[#0e2942] font-extrabold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 text-center"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Give Free Assessment Test
              </Link> */}
            </div>

            {/* Trust Badges */}
            <div className="mt-5 flex items-center gap-3 text-[#0e2942]/80 text-[11px] sm:text-xs font-semibold">
              <span className="inline-flex items-center gap-1">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                100% Confidential
              </span>
              <span>•</span>
              <span>Zero Judgment</span>
              <span>•</span>
              <span>Trusted Platform</span>
            </div>
          </div>
        </div>

        {/* Right: single.jpg image (Hidden in mobile view, visible in web view) */}
        <div className="hidden md:block md:w-1/2 lg:w-[45%] relative h-full min-h-[440px] overflow-hidden">
          <Image
            src="/image/single.jpg"
            alt="Couples recovery session member"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 0vw, 50vw"
            priority
          />

          {/* Bottom badge overlay matching Talkspace member badge in screenshot */}
          <div className="absolute bottom-5 right-5 flex items-center gap-2 pointer-events-none">
            <span
              className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-white text-[10px] font-black uppercase tracking-wider shadow"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Member
            </span>
            <span
              className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-white text-[10px] font-black uppercase tracking-wider shadow"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              AxoMen
            </span>
          </div>
        </div>
      </section>

      {/* ── BENEFITS OF SESSIONS SECTION ── */}
      <BenefitsSection titleColor="text-[#0e2942]" />

      {/* ── HOW TO BOOK A SESSION SECTION ── */}
      <HowBookingWorksSection />



      {/* ── ANY QUESTIONS? FAQ SECTION ── */}
      <IndividualFAQSection
        themeColor="text-[#0e2942]"
        activeBgColor="bg-[#0e2942]"
        borderColor="border-[#0e2942]/25"
      />
    </main>
  );
}
