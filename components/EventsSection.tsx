"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const EVENT_META = [
  { id: 1, day: "15", month: "JUN", year: "2026", accent: "#FAA23A" },
  { id: 2, day: "22", month: "JUN", year: "2026", accent: "#e8632a" },
  { id: 3, day: "05", month: "JUL", year: "2026", accent: "#c0392b" },
  { id: 4, day: "12", month: "JUL", year: "2026", accent: "#009EC7" },
  { id: 5, day: "20", month: "JUL", year: "2026", accent: "#FAA23A" },
  { id: 6, day: "03", month: "AUG", year: "2026", accent: "#c0392b" },
] as const;

function CalendarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

interface EventCardProps {
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  type: string;
  accent: string;
}

function EventCard({ day, month, year, title, location, type, accent }: EventCardProps) {
  return (
    <div className="group relative shrink-0 w-[72vw] sm:w-[38vw] lg:w-[26vw] xl:w-[22vw] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.13)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="h-1 w-full" style={{ background: accent }} />

      <div className="p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex flex-col items-center justify-center rounded-xl px-3 py-2 min-w-[52px]"
            style={{ background: `${accent}18` }}
          >
            <span
              className="leading-none font-black"
              style={{
                fontFamily: "var(--font-anton), Impact, sans-serif",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                color: accent,
              }}
            >
              {day}
            </span>
            <span
              className="text-[10px] font-black uppercase tracking-[0.14em] mt-0.5"
              style={{ color: accent, fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {month}
            </span>
            <span
              className="text-[9px] font-semibold tracking-wide mt-0.5"
              style={{ color: `${accent}99`, fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {year}
            </span>
          </div>

          <span
            className="inline-block text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
            style={{
              background: `${accent}15`,
              color: accent,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {type}
          </span>
        </div>

        <h3
          className="text-[#0f0f0f] leading-snug"
          style={{
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            fontSize: "clamp(0.88rem, 2vw, 1.05rem)",
            fontWeight: 700,
          }}
        >
          {title}
        </h3>

        <div className="mt-auto pt-1">
          <span
            className="inline-flex items-center gap-1.5 text-[#0f0f0f]/50 text-[11px] font-semibold truncate"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            <PinIcon />
            {location}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function EventsSection() {
  const t = useTranslations("events");

  const events = EVENT_META.map((meta) => ({
    ...meta,
    title:    t(`event${meta.id}Title`    as Parameters<typeof t>[0]),
    location: t(`event${meta.id}Location` as Parameters<typeof t>[0]),
    type:     t(`event${meta.id}Type`     as Parameters<typeof t>[0]),
  }));

  const TRACK = [...events, ...events, ...events];

  return (
    <section
      className="w-full overflow-hidden py-12 sm:py-16"
      style={{ background: "linear-gradient(to bottom, #FAA23A, #ffffff)" }}
    >
      <style>{`
        @keyframes events-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .events-track {
          animation: events-scroll 30s linear infinite;
        }
        .events-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 flex items-end justify-between">
        <div className="flex flex-col gap-1.5">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            <CalendarIcon />
            {t("eyebrow")}
          </span>

          <h2
            className="text-white text-[clamp(1.6rem,4.5vw,2.8rem)] leading-[1.0] uppercase"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("heading")} <span className="text-[#0f0f0f]">{t("headingHighlight")}</span>
          </h2>
        </div>

        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors duration-200 shrink-0"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {t("viewAll")}
          <ArrowIcon />
        </Link>
      </div>

      <div className="w-full overflow-hidden">
        <div className="events-track flex gap-4 sm:gap-5 w-max px-4 sm:px-6">
          {TRACK.map((ev, i) => (
            <EventCard key={`${ev.id}-${i}`} {...ev} />
          ))}
        </div>
      </div>
    </section>
  );
}
