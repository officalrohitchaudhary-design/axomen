"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const EPISODES = [
  {
    id: "W5OQJbYPSY8",
    thumb: "https://i.ytimg.com/vi/W5OQJbYPSY8/hqdefault.jpg",
    title: "How Porn Destroys Your Confidence",
  },
  {
    id: "XXYNvwrVKdE",
    thumb: "https://i.ytimg.com/vi/XXYNvwrVKdE/hqdefault.jpg",
    title: "Rewiring Your Brain in 30 Days",
  },
  {
    id: "93kiDoq-i90",
    thumb: "https://i.ytimg.com/vi/93kiDoq-i90/hq720.jpg",
    title: "5 Signs You're Addicted To Porn",
  },
  {
    id: "5WnKqpsMAGM",
    thumb: "https://i.ytimg.com/vi/5WnKqpsMAGM/hqdefault.jpg",
    title: "Why Porn Destroys Relationships",
  },
  {
    id: "oTLZtdEujvI",
    thumb: "https://i.ytimg.com/vi/oTLZtdEujvI/hq720.jpg",
    title: "The 30-Day Porn Recovery Challenge",
  },
];

const TRACK = [...EPISODES, ...EPISODES];

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5 text-black group-hover:text-white transition-colors duration-200" aria-hidden>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function EpisodeCard({ id, thumb, title }: { id: string; thumb: string; title: string }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative shrink-0 w-[80vw] sm:w-[44vw] lg:w-[31vw] overflow-hidden rounded-xl bg-[#000000] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{ aspectRatio: "16/9" }}
      aria-label={title}
    >
      <Image
        src={thumb}
        alt={title}
        fill
        unoptimized
        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 44vw, 31vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white group-hover:bg-[#16aee2] shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <PlayIcon />
        </div>
      </div>

      <p
        className="absolute bottom-3 left-3 right-3 text-white text-[12px] sm:text-[13px] font-bold leading-snug line-clamp-2"
        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
      >
        {title}
      </p>

      <div className="absolute top-2.5 left-2.5">
        <span className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-white/10">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="#ff0000" aria-hidden>
            <path d="M23.8 7.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.3-1C17.6 3.6 12 3.6 12 3.6s-5.6 0-8.6.2c-.4.1-1.4.1-2.3 1-.7.7-.9 2.4-.9 2.4S0 9.1 0 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2 .9 2.5 1 1.8.2 7.4.2 7.4.2s5.6 0 8.6-.2c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.5 15.1V8.9l6.5 3.1-6.5 3.1z" />
          </svg>
          YouTube
        </span>
      </div>
    </a>
  );
}

export default function PodcastSection() {
  const t = useTranslations("podcast");

  return (
    <section className="w-full bg-[#f4f4f6] py-12 sm:py-16 overflow-hidden">

      <style>{`
        @keyframes podcast-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .podcast-track {
          animation: podcast-scroll 22s linear infinite;
        }
        .podcast-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h2
            className="text-[#0f0f0f] text-[clamp(1.4rem,3.5vw,2.4rem)] leading-[1.0] uppercase"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            <span className="text-[#16aee2]">{t("headingHighlight")}</span>
          </h2>
          <p
            className="text-[#0f0f0f]/50 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("subtitle")}
          </p>
        </div>
        <Link
          href="/podcast"
          className="inline-flex items-center gap-1.5 text-[#0f0f0f]/60 hover:text-[#16aee2] text-xs font-black uppercase tracking-[0.2em] transition-colors duration-200 shrink-0"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {t("viewAll")}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="w-full">
        <div className="podcast-track flex gap-4 w-max px-4 sm:px-6">
          {TRACK.map((ep, i) => (
            <EpisodeCard key={`${ep.id}-${i}`} id={ep.id} thumb={ep.thumb} title={ep.title} />
          ))}
        </div>
      </div>

    </section>
  );
}
