"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

type StoryItem = {
  key: string;
  name: string;
  age: number;
  city: string;
  tagKey: string;
  tagParams?: Record<string, any>;
  tagColor: string;
  initial: string;
  avatarBg: string;
};

const STORIES: StoryItem[] = [
  {
    key: "rahul",
    name: "Rahul S.",
    age: 22,
    city: "Delhi",
    tagKey: "recovered",
    tagColor: "#16a34a",
    initial: "R",
    avatarBg: "#1e3a5f",
  },
  {
    key: "arjun",
    name: "Arjun M.",
    age: 19,
    city: "Mumbai",
    tagKey: "yearsFree",
    tagParams: { years: 2 },
    tagColor: "#0891b2",
    initial: "A",
    avatarBg: "#7c3aed",
  },
  {
    key: "vikram",
    name: "Vikram T.",
    age: 24,
    city: "Bangalore",
    tagKey: "savedRelationship",
    tagColor: "#c0392b",
    initial: "V",
    avatarBg: "#065f46",
  },
  {
    key: "saurabh",
    name: "Saurabh K.",
    age: 21,
    city: "Hyderabad",
    tagKey: "careerSaved",
    tagColor: "#b45309",
    initial: "S",
    avatarBg: "#9f1239",
  },
  {
    key: "karthik",
    name: "Karthik R.",
    age: 23,
    city: "Chennai",
    tagKey: "beatDepression",
    tagColor: "#6d28d9",
    initial: "K",
    avatarBg: "#1e40af",
  },
  {
    key: "rohit",
    name: "Rohit P.",
    age: 20,
    city: "Pune",
    tagKey: "backOnTrack",
    tagColor: "#16a34a",
    initial: "R",
    avatarBg: "#b45309",
  },
  {
    key: "ankit",
    name: "Ankit G.",
    age: 18,
    city: "Jaipur",
    tagKey: "socialAnxietyGone",
    tagColor: "#0891b2",
    initial: "A",
    avatarBg: "#374151",
  },
  {
    key: "dev",
    name: "Dev B.",
    age: 25,
    city: "Kolkata",
    tagKey: "yearsFree",
    tagParams: { years: 3 },
    tagColor: "#16a34a",
    initial: "D",
    avatarBg: "#0f766e",
  },
  {
    key: "nikhil",
    name: "Nikhil J.",
    age: 22,
    city: "Chandigarh",
    tagKey: "healthRestored",
    tagColor: "#c0392b",
    initial: "N",
    avatarBg: "#7c2d12",
  },
  {
    key: "prashant",
    name: "Prashant Y.",
    age: 21,
    city: "Lucknow",
    tagKey: "familyRebuilt",
    tagColor: "#b45309",
    initial: "P",
    avatarBg: "#be123c",
  },
];

/* Fan photo data — replace src values with real male photos */
const FAN = [
  { src: "/image/image1.gif", rotate: -14, ty: 10, zIndex: 1 },
  { src: "/image/image2.gif", rotate: -7,  ty: 5,  zIndex: 2 },
  { src: "/image/image3.gif", rotate:  0,  ty: 0,  zIndex: 5 },
  { src: "/image/image4.gif", rotate:  7,  ty: 5,  zIndex: 2 },
  { src: "/image/image2.gif", rotate: 14,  ty: 10, zIndex: 1 },
];

const ACCENT_COLORS = ["#c0392b", "#1e3a5f", "#065f46", "#7c3aed", "#b45309"];

const translateCity = (city: string, locale: string) => {
  if (locale !== "hi") return city;
  const map: Record<string, string> = {
    "Delhi": "दिल्ली",
    "Mumbai": "मुंबई",
    "Bangalore": "बेंगलुरु",
    "Hyderabad": "हैदराबाद",
    "Chennai": "चेन्नई",
    "Pune": "पुणे",
    "Jaipur": "जयपुर",
    "Kolkata": "कोलकाता",
    "Chandigarh": "चंडीगढ़",
    "Lucknow": "लखनऊ",
  };
  return map[city] || city;
};

const translateName = (name: string, locale: string) => {
  if (locale !== "hi") return name;
  const map: Record<string, string> = {
    "Rahul S.": "राहुल एस.",
    "Arjun M.": "अर्जुन एम.",
    "Vikram T.": "विक्रम टी.",
    "Saurabh K.": "सौरभ के.",
    "Karthik R.": "कार्तिक आर.",
    "Rohit P.": "रोहित पी.",
    "Ankit G.": "अंकित जी.",
    "Dev B.": "देव बी.",
    "Nikhil J.": "निखिल जे.",
    "Prashant Y.": "प्रशांत वाई.",
  };
  return map[name] || name;
};

export default function StoriesPage() {
  const t = useTranslations("storiesPage");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[#f4f1ec]">

      {/* ── Hero ── */}
      <div className="w-full bg-white pt-10 sm:pt-14 overflow-hidden">

        {/* Eyebrow */}
        <div className="text-center px-4 mb-2">
          <span
            className="inline-block text-[10px] font-black uppercase tracking-[0.32em] text-[#0f0f0f]/35"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("eyebrow")}
          </span>
        </div>

        {/* Giant title */}
        <h1
          className="text-center text-[#0f0f0f] uppercase leading-[0.88] tracking-[-0.02em] px-4"
          style={{
            fontFamily: "var(--font-anton), Impact, sans-serif",
            fontSize: "clamp(3.2rem, 14vw, 10.5rem)",
          }}
        >
          {t("titleMain")}<span className="text-[#c0392b]">:</span>{t("titleHighlight")}
        </h1>

        {/* Photo fan */}
        <div className="relative mt-8 sm:mt-10 flex items-end justify-center pb-0"
          style={{ height: "clamp(190px, 30vw, 340px)" }}
        >

          {/* Floating mention tags */}
          <span
            className="absolute left-[6%] sm:left-[12%] top-2 z-20 bg-[#0a84ff] text-white text-[11px] sm:text-[13px] font-black px-3 sm:px-4 py-1.5 rounded-full shadow-lg select-none"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {locale === "hi" ? "@दिल्ली" : "@delhi"}
          </span>
          <span
            className="absolute right-[6%] sm:right-[12%] top-6 z-20 bg-[#e5e5ea] text-[#1a1a2e] text-[11px] sm:text-[13px] font-black px-3 sm:px-4 py-1.5 rounded-full shadow-md select-none"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {locale === "hi" ? "@मुंबई" : "@mumbai"}
          </span>

          {/* Cards */}
          {FAN.map((photo, i) => (
            <div
              key={i}
              className="absolute bottom-0 left-1/2"
              style={{
                width: "clamp(80px, 12vw, 155px)",
                transform: `translateX(calc(-50% + ${(i - 2) * 14}vw)) rotate(${photo.rotate}deg) translateY(${photo.ty}px)`,
                transformOrigin: "bottom center",
                zIndex: photo.zIndex,
              }}
            >
              {/* Polaroid card */}
              <div className="bg-white shadow-[4px_8px_28px_rgba(0,0,0,0.18)] rounded-lg overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={photo.src}
                    alt="Real story"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 12vw, 155px"
                  />
                </div>
                <div className="h-3 sm:h-4 bg-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Sub-text */}
        <p
          className="text-center text-[#0f0f0f]/45 text-xs sm:text-sm font-semibold px-4 pt-5 pb-8"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {t("subtext")}
        </p>
      </div>

      {/* ── Accent bar ── */}
      <div className="flex h-1.5 w-full">
        {ACCENT_COLORS.map((c) => (
          <div key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* ── Stories grid ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {STORIES.map((s, i) => (
            <div
              key={i}
              className="bg-white flex flex-col gap-4 p-5 sm:p-6 border border-[#0f0f0f]/6 hover:border-[#0f0f0f]/15 transition-colors duration-200"
            >
              {/* Top row: avatar + name + tag */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-black text-base"
                    style={{
                      backgroundColor: s.avatarBg,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                    aria-hidden
                  >
                    {s.initial}
                  </div>
                  {/* Name + meta */}
                  <div>
                    <p
                      className="text-[#0f0f0f] font-black text-sm leading-none"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                    >
                      {translateName(s.name, locale)}
                    </p>
                    <p
                      className="text-[#0f0f0f]/40 text-[11px] font-semibold mt-0.5"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                    >
                      {s.age} {locale === "hi" ? "वर्ष" : "yrs"} · {translateCity(s.city, locale)}
                    </p>
                  </div>
                </div>

                {/* Tag */}
                <span
                  className="shrink-0 text-[9px] font-black uppercase tracking-[0.15em] px-2 py-1 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                    color: s.tagColor,
                    backgroundColor: s.tagColor + "18",
                  }}
                >
                  {t(`storyLabels.${s.tagKey}`, s.tagParams)}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#0f0f0f]/6" aria-hidden />

              {/* Story text */}
              <p
                className="text-[#0f0f0f]/75 text-sm leading-relaxed font-medium"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                <span
                  className="text-[2rem] leading-none float-left mr-1 -mt-1 font-black"
                  style={{ color: "#fbe400", fontFamily: "Georgia, serif" }}
                  aria-hidden
                >
                  "
                </span>
                {t(`storiesContent.${s.key}`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#0f0f0f]/10 pt-10">
          <p
            className="text-[#0f0f0f] font-black text-lg sm:text-xl uppercase text-center sm:text-left"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("ctaTitle")} <span className="text-[#c0392b]">{t("ctaHighlight")}</span>
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-[#0f0f0f] hover:bg-[#c0392b] text-white font-black text-sm uppercase tracking-wide px-8 py-3.5 transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("ctaButton")}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}
