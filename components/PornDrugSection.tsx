"use client";

import { useTranslations } from "next-intl";

function BrainIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6c-4 0-7 3-7 7 0 2 .7 3.7 1.8 5C12.7 19.4 11 21.8 11 24.5c0 3.6 2.9 6.5 6.5 6.5h5c3.6 0 6.5-2.9 6.5-6.5 0-2.7-1.7-5.1-3.8-5.5A7 7 0 0 0 27 13c0-4-3-7-7-7z" fill="#3b82f6" opacity="0.18" />
      <path d="M20 6c-4 0-7 3-7 7 0 2 .7 3.7 1.8 5C12.7 19.4 11 21.8 11 24.5c0 3.6 2.9 6.5 6.5 6.5h5c3.6 0 6.5-2.9 6.5-6.5 0-2.7-1.7-5.1-3.8-5.5A7 7 0 0 0 27 13c0-4-3-7-7-7z" stroke="#2563eb" strokeWidth="1.8" fill="none" />
      <path d="M17 20.5s1 2.5 3 2.5 3-2.5 3-2.5" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 6v4M15.5 8.5l2 2.5M24.5 8.5l-2 2.5" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="17" r="1.5" fill="#2563eb" />
      <circle cx="23" cy="17" r="1.5" fill="#2563eb" />
    </svg>
  );
}

function StudyIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 9L6 17l14 8 14-8-14-8z" fill="#059669" opacity="0.2" />
      <path d="M20 9L6 17l14 8 14-8-14-8z" stroke="#059669" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M10 21v7s4 4 10 4 10-4 10-4v-7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="32" y1="17" x2="32" y2="25" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="27" r="2" fill="#059669" />
    </svg>
  );
}

function CareerIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="8,30 16,20 22,25 32,12" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="26,12 32,12 32,18" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="8" y1="34" x2="32" y2="34" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="20" r="2.5" fill="#f97316" opacity="0.35" />
      <circle cx="22" cy="25" r="2.5" fill="#f97316" opacity="0.35" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 32s-12-7-12-16a8 8 0 0 1 12-6.9A8 8 0 0 1 32 16c0 9-12 16-12 16z" fill="#f43f5e" opacity="0.2" />
      <path d="M20 32s-12-7-12-16a8 8 0 0 1 12-6.9A8 8 0 0 1 32 16c0 9-12 16-12 16z" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M16 20l3 3 5-6" stroke="#f43f5e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FutureIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" fill="#8b5cf6" opacity="0.15" />
      <circle cx="20" cy="20" r="12" stroke="#7c3aed" strokeWidth="2" fill="none" />
      <polyline points="20,12 20,21 26,21" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M10 9l-2-3M30 9l2-3M20 8V5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const EFFECT_ICONS = [BrainIcon, StudyIcon, CareerIcon, HeartIcon, FutureIcon] as const;
const EFFECT_ACCENTS = ["#2563eb", "#059669", "#f97316", "#f43f5e", "#7c3aed"] as const;
const EFFECT_KEYS = ["brain", "studies", "career", "relationship", "future"] as const;

type EffectItem = {
  Icon: (typeof EFFECT_ICONS)[number];
  accent: string;
  label: string;
  impact: string;
  stat: string;
};

function EffectCard({ effect }: { effect: EffectItem }) {
  const IconComponent = effect.Icon;

  return (
    <div
      className="w-[270px] sm:w-[310px] md:w-[320px] min-h-[300px] sm:min-h-[340px] shrink-0 bg-white rounded-[4px] p-6 sm:p-7 flex flex-col justify-between border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:border-black/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 select-none"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-[4px] bg-black/[0.04] flex items-center justify-center shrink-0">
            <IconComponent />
          </div>
          <span
            className="text-[12px] sm:text-[13px] font-black uppercase tracking-[0.12em] text-black/60"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {effect.label}
          </span>
        </div>

        <p
          className="text-black text-[18px] sm:text-[20px] md:text-[21px] font-bold leading-snug"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {effect.impact}
        </p>
      </div>

      <div className="pt-6 mt-auto flex items-center justify-between">
        <span
          className="inline-flex items-center text-[13px] sm:text-[14px] font-black uppercase tracking-wider px-3 py-1.5 rounded-[4px] bg-black text-[#d6f04d]"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {effect.stat}
        </span>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: effect.accent }} />
      </div>
    </div>
  );
}

export default function PornDrugSection() {
  const t = useTranslations("pornDrug");

  const effects: EffectItem[] = EFFECT_KEYS.map((key, i) => ({
    Icon: EFFECT_ICONS[i],
    accent: EFFECT_ACCENTS[i],
    label: t(`${key}Label` as Parameters<typeof t>[0]),
    impact: t(`${key}Impact` as Parameters<typeof t>[0]),
    stat: t(`${key}Stat` as Parameters<typeof t>[0]),
  }));

  // Duplicate cards for seamless infinite right-to-left marquee loop
  const cardGroup = [...effects, ...effects];

  return (
    <section
      className="w-full relative overflow-hidden py-14 sm:py-20 bg-[#d6f04d] text-black"
    >
      {/* Subtle texture grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-4 sm:gap-5 mb-10 sm:mb-12">

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span
            className="text-[clamp(2.4rem,8vw,5.8rem)] leading-none uppercase font-[200]"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("equationLeft")}
          </span>
          <span
            className="text-[clamp(2rem,6vw,4.5rem)] leading-none font-[200]"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            =
          </span>
          <span
            className="text-[clamp(2.4rem,8vw,5.8rem)] leading-none uppercase text-black font-[200]"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("equationRight")}
          </span>
        </div>

        <p
          className="text-black/85 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-semibold"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {t("description")}
        </p>
      </div>

      {/* ── Marquee Cards Moving Right to Left ── */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient fades */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#d6f04d] to-transparent z-10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#d6f04d] to-transparent z-10"
          aria-hidden
        />

        <div className="porn-cards-track flex items-stretch gap-4 sm:gap-5 py-2 px-2">
          {cardGroup.map((e, i) => (
            <EffectCard key={`cards-a-${i}`} effect={e} />
          ))}
          {cardGroup.map((e, i) => (
            <EffectCard key={`cards-b-${i}`} effect={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
