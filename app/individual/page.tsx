import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HowBookingWorksSection from "@/components/HowBookingWorksSection";
import HowAxoMenJourneyWorksSection from "@/components/HowAxoMenJourneyWorksSection";
import IndividualFAQSection from "@/components/IndividualFAQSection";

export const metadata: Metadata = {
  title: "Online Sex Counselling & Male Habit Recovery in India | AxoMen",
  description:
    "Confidential online sex counselling for male sexual problems, compulsive masturbation, and porn habits. 1-on-1 private recovery guidance. First session free.",
  keywords: [
    "Online Sex Counselling",
    "online sex counselling India",
    "online sex counselling male sexual problem",
    "male sexual problem counselling",
    "Online Masturbation Counselling",
    "Online Porn Counselling",
    "How to Stop Masturbation Addiction",
    "men's sexual health consultation",
  ],
  alternates: {
    canonical: "https://axomen.com/individual",
  },
  openGraph: {
    title: "Online Sex Counselling & Male Habit Recovery | AxoMen",
    description:
      "Private 1-on-1 recovery education sessions for men dealing with unwanted sexual habits. Get your first session free.",
    url: "https://axomen.com/individual",
    type: "website",
    images: [
      {
        url: "/image/axomen-logo.png",
        width: 1200,
        height: 630,
        alt: "AxoMen Online Sex Counselling for Men",
      },
    ],
  },
};

export default function IndividualPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* ── VERY FIRST SECTION: Talkspace-style Split Banner (Mint Green + single.jpg) ── */}
      <section
        id="individual-hero"
        className="w-full bg-[#9ee4b8] overflow-hidden md:h-[440px] lg:h-[480px] flex flex-col md:flex-row items-stretch"
      >
        {/* Left: Text & Buttons */}
        <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col justify-center px-5 sm:px-10 md:px-12 lg:px-16 py-10 sm:py-14 md:py-0">
          <div className="max-w-xl">
            {/* Main Heading */}
            <h1
              className="text-[#0a3528] text-3xl sm:text-4xl lg:text-[42px]  leading-[1.14] tracking-tight mb-3.5 sm:mb-4 font-[600]"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Online Recovery Sessions For Individuals
            </h1>

            {/* Subtitle description */}
            <p
              className="text-[#0a3528]/85 text-sm sm:text-base lg:text-[15.5px] leading-relaxed mb-6 sm:mb-8 font-medium"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              <span className="text-black font-bold">Talk openly. No fear. No shame.</span>
              <br />
              A private session where you can freely talk about your porn habit and the problems you're facing.
              <br />
              Your recovery educator will listen, understand your habit loop, and guide you on how to manage your urges and take control of the habit yourself.

            </p>

            {/* Buttons: Book a Session & Give Free Assessment Test */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-[#0a3528] hover:bg-[#06231a] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg text-center"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Book Free Session
              </Link>
              {/* 
              <Link
                href="/porn-addiction-test"
                className="inline-flex items-center justify-center bg-transparent hover:bg-[#0a3528]/10 active:scale-[0.98] border-2 border-[#0a3528] text-[#0a3528] font-extrabold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 text-center"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Give Free Assessment Test
              </Link> */}
            </div>

            {/* Trust Badges */}
            {/* <div className="mt-5 flex items-center gap-3 text-[#0a3528]/80 text-[11px] sm:text-xs font-semibold">
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
            </div> */}
          </div>
        </div>

        {/* Right: single.jpg image (Hidden in mobile view, visible in web view) */}
        <div className="hidden md:block md:w-1/2 lg:w-[45%] relative h-full min-h-[440px] overflow-hidden">
          <Image
            src="/image/single.jpg"
            alt="Individual recovery session member"
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

      {/* ── BENEFITS OF SESSIONS SECTION (Talkspace-inspired clean card design) ── */}
      <section
        id="benefits-of-sessions"
        className="w-full bg-white pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Heading using the site's primary font family */}
          <h2
            className="text-[#0a3528] text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-8 sm:mb-10 md:mb-12"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            Benefits of Sessions
          </h2>

          {/* 
            Cards Grid:
            - Mobile (< lg): Vertical stack of horizontal cards (icon left, text right) matching mobile screenshot
            - Desktop (>= lg): Single row of 4 cards (icon top, text below) matching web screenshot
          */}
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
            {[
              {
                id: "convenience",
                text: "100% private sessions from the comfort of your home",
                icon: (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-[#0a3528] shrink-0"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
              },
              {
                id: "empathy",
                text: "Zero judgment, shame-free guidance tailored to your pace",
                icon: (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-[#0a3528] shrink-0"
                    aria-hidden
                  >
                    <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
                    <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8L15 13" />
                    <path d="M19 4a2.5 2.5 0 0 0-3.5 0l-.5.5-.5-.5a2.5 2.5 0 1 0-3.5 3.5l4 4 4-4a2.5 2.5 0 0 0 0-3.5Z" />
                  </svg>
                ),
              },
              {
                id: "roadmap",
                text: "Custom recovery roadmap with daily urge-control tools",
                icon: (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-[#0a3528] shrink-0"
                    aria-hidden
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                    <circle cx="12" cy="10" r="2.5" />
                    <path d="M8 15a4 4 0 0 1 8 0" />
                  </svg>
                ),
              },
              {
                id: "accessible",
                text: "Free first session with zero commitments or hidden fees",
                icon: (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-[#0a3528] shrink-0"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8.5 7.5h7" />
                    <path d="M8.5 10.5h7" />
                    <path d="M10 7.5v3c0 1.8 1.2 3 3 3" />
                    <path d="M10.5 13.5L15 18" />
                  </svg>
                ),
              },
            ].map((benefit) => (
              <div
                key={benefit.id}
                className="bg-[#e3f0eb] rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-row lg:flex-col items-center lg:items-start gap-4 sm:gap-5 lg:gap-4 min-h-[92px] sm:min-h-[100px] lg:min-h-[185px] transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
              >
                {/* Icon */}
                <div className="shrink-0 flex items-center justify-center">
                  {benefit.icon}
                </div>

                {/* Short Benefit Text */}
                <p
                  className="text-sm sm:text-base lg:text-[15px] font-semibold text-[#0a3528] leading-snug flex-1"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-STEP RECOVERY JOURNEY SECTION ── */}
      <HowAxoMenJourneyWorksSection />

      {/* ── HOW TO BOOK A SESSION SECTION (Talkspace-inspired 3-step phone mockup design) ── */}
      <HowBookingWorksSection />

      {/* ── 2ND SECTION: Sessions We Have (Clean Colored Cards matching What We Offer style) ── */}
      {/* <section
        id="sessions-we-have"
        className="w-full bg-white pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:py-20 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-[#0f0f0f] text-center text-3xl sm:text-4xl md:text-[42px] font-black tracking-tight mb-8 sm:mb-10 md:mb-12"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            Sessions We Have
          </h2>

       
          <div className="flex flex-col md:grid md:grid-cols-3 gap-3.5 sm:gap-4 md:gap-6">
            {[
              {
                id: "single",
                title: "Single Session",
                support: "1 private session",
                href: "/session?plan=single",
                bgColor: "bg-[#fed7aa]",
                textColor: "text-[#4a1d08]",
                linkHover: "group-hover:text-[#280c02]",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
              {
                id: "monthly",
                title: "Monthly Support",
                support: "2 sessions/month",
                href: "/session?plan=monthly",
                bgColor: "bg-[#e2d4f8]",
                textColor: "text-[#2d0f4d]",
                linkHover: "group-hover:text-[#19062e]",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                  </svg>
                ),
              },
              {
                id: "weekly",
                title: "Weekly Support",
                support: "4 sessions/month",
                href: "/session?plan=weekly",
                bgColor: "bg-[#fecdd3]",
                textColor: "text-[#521323]",
                linkHover: "group-hover:text-[#310712]",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
              },
            ].map((plan) => (
              <Link
                key={plan.id}
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${plan.bgColor} ${plan.textColor} rounded-2xl p-4 sm:p-6 md:p-8 flex flex-row md:flex-col justify-between items-center md:items-start min-h-[96px] sm:min-h-[110px] md:min-h-[210px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] active:scale-[0.99]`}
              >
                <div className="flex flex-row md:flex-col items-center md:items-start gap-3 sm:gap-3.5 md:gap-0 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-white/75 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-xs md:mb-5">
                    {plan.icon}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3
                      className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-black leading-tight tracking-tight truncate sm:overflow-visible"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                    >
                      {plan.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm md:text-[15px] font-bold mt-0.5 sm:mt-1 md:mt-1.5 opacity-90"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                    >
                      {plan.support}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1 text-xs sm:text-sm md:text-base font-extrabold whitespace-nowrap shrink-0 md:self-end md:mt-8 transition-colors ${plan.linkHover}`}
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  <span>Book session</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section> */}

      {/* ── ANY QUESTIONS? FAQ SECTION (Talkspace-inspired with faq-img.png & 7 curated questions) ── */}
      <IndividualFAQSection />
    </main>
  );
}
