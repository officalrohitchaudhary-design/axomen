"use client";

import { useState } from "react";
import Image from "next/image";

interface FAQItem {
  id: number;
  category: "what-to-expect" | "getting-started" | "privacy";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    category: "what-to-expect",
    question: "Is online recovery coaching effective?",
    answer:
      "Yes. Working 1-on-1 with an empathetic recovery educator allows you to unpack your personal habit loops, identify root triggers (stress, loneliness, boredom), and install practical, day-by-day urge control tools that you can immediately apply in real life.",
  },
  {
    id: 2,
    category: "what-to-expect",
    question: "What should I expect during my free first session?",
    answer:
      "Your first session is a 100% judgment-free, confidential conversation. Your recovery educator will listen to your journey, understand your emotional triggers and daily routine, and help you map out your Day-1 action plan. You share only what you feel comfortable discussing.",
  },
  {
    id: 3,
    category: "what-to-expect",
    question: "How is this different from relying on willpower alone?",
    answer:
      "Compulsive porn use rewires dopamine reward pathways, making pure willpower unreliable. Our approach is science-backed: we help you understand the neurological cue-routine-reward loop, replace compulsive browsing with healthy dopamine alternatives, and install practical friction to prevent relapses.",
  },
  {
    id: 4,
    category: "getting-started",
    question: "How do I book and connect with my educator?",
    answer:
      "Simply click 'Book Free Session', choose whether you're seeking individual, couples, or teen recovery support, answer a few quick assessment questions, and our team will match you and coordinate your private session link within 24 hours.",
  },
  {
    id: 5,
    category: "getting-started",
    question: "What languages are sessions conducted in?",
    answer:
      "Our educators conduct sessions in English, Hindi, and Hinglish (conversational mix). You can choose the language you feel most comfortable speaking in when you submit your booking.",
  },
  {
    id: 6,
    category: "privacy",
    question: "How is my privacy and identity protected?",
    answer:
      "We treat your privacy as our highest priority. All sessions are 100% confidential. You are welcome to keep your camera off if you prefer audio-only, and your details are never shared with family, employers, or third parties. What you share stays strictly private.",
  },
  {
    id: 7,
    category: "privacy",
    question: "How much does a recovery session cost?",
    answer:
      "Your initial 1-on-1 recovery consultation is 100% free with zero hidden commitments. If you later choose ongoing weekly or monthly mentorship, flexible and affordable plans are available with student-friendly pricing.",
  },
];

type CategoryFilter = "all" | "what-to-expect" | "getting-started" | "privacy";

interface FAQSectionProps {
  themeColor?: string;
  activeBgColor?: string;
  borderColor?: string;
}

export default function IndividualFAQSection({
  themeColor = "text-[#000000]",
  activeBgColor = "bg-[#16aee2]",
  borderColor = "border-black/10",
}: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggleFAQ = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    activeCategory === "all"
      ? FAQ_DATA
      : FAQ_DATA.filter((faq) => faq.category === activeCategory);

  return (
    <section
      id="faq-section"
      className="w-full bg-[#f8f9fa] border-t border-gray-100 py-16 sm:py-20 md:py-24 px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Top Centered Illustration matching uploaded faq-img.png */}
        <div className="relative w-36 sm:w-44 h-28 sm:h-36 mx-auto mb-4 flex items-center justify-center">
          <Image
            src="/image/faq-img.png"
            alt="Any questions"
            width={176}
            height={144}
            className="w-36 sm:w-44 h-auto object-contain select-none"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>

        {/* Section Heading matching Talkspace editorial serif style */}
        <h2 className="text-[#000000] text-3xl sm:text-4xl md:5xl font-serif font-normal tracking-tight mb-3">
          Any questions?
        </h2>

        {/* Subtitle */}
        <p
          className="text-sm sm:text-base text-black/70 font-medium max-w-md mx-auto leading-relaxed mb-8 sm:mb-10"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          Find trust-worthy answers on all things recovery &amp; 1-on-1 sessions at AxoMen.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-12">
          {[
            { key: "what-to-expect" as const, label: "WHAT TO EXPECT" },
            { key: "getting-started" as const, label: "GETTING STARTED" },
            { key: "privacy" as const, label: "PRIVACY & COST" },
          ].map((pill) => {
            const isActive = activeCategory === pill.key;
            return (
              <button
                key={pill.key}
                type="button"
                onClick={() =>
                  setActiveCategory(activeCategory === pill.key ? "all" : pill.key)
                }
                className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${activeBgColor} text-white shadow-xs`
                    : `bg-transparent border ${borderColor} ${themeColor} hover:bg-black/5`
                }`}
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* 7 Questions Accordion List */}
        <div className={`text-left border-t ${borderColor}`}>
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`border-b ${borderColor} transition-colors`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <span className="text-lg sm:text-xl md:text-[22px] font-serif font-normal text-[#000000] group-hover:text-[#16aee2] transition-colors leading-snug">
                    {faq.question}
                  </span>

                  {/* Plus icon that rotates 45deg to an 'x' */}
                  <span
                    className={`w-6 h-6 flex items-center justify-center shrink-0 ${
                      isOpen ? "text-[#16aee2]" : "text-[#000000]"
                    } transition-all duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                {/* Collapsible Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "max-h-96 opacity-100 pb-5 sm:pb-6"
                      : "max-h-0 opacity-0 pb-0"
                  }`}
                >
                  <p
                    className="text-sm sm:text-base text-[#333333] font-medium leading-relaxed pr-4 sm:pr-8"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
