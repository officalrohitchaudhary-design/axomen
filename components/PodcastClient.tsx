"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const EPISODES = [
  {
    id: "W5OQJbYPSY8",
    thumb: "https://i.ytimg.com/vi/W5OQJbYPSY8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCO9asjBLTsuFJJfxoNgoOv1Upuyg",
  },
  {
    id: "XXYNvwrVKdE",
    thumb: "https://i.ytimg.com/vi/XXYNvwrVKdE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCfs8mxNJUPfwApQhDPibEerreVwg",
  },

  {
    id: "93kiDoq-i90",
    thumb: "https://i.ytimg.com/vi/93kiDoq-i90/hq720.jpg",
  },
  {
    id: "5WnKqpsMAGM",
    thumb: "https://i.ytimg.com/vi/5WnKqpsMAGM/hqdefault.jpg",
  },
  {
    id: "oTLZtdEujvI",
    thumb: "https://i.ytimg.com/vi/oTLZtdEujvI/hq720.jpg",
  },
];

function PlayIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="#1a1a2e"
      className="translate-x-0.5"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function PodcastCard({ id, thumb }: { id: string; thumb?: string }) {
  const thumbnail = thumb ?? `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.20)] hover:-translate-y-2 transition-all duration-300 bg-[#d0d8e0]"
      style={{ aspectRatio: "16/9", minHeight: "200px" }}
    >
      {/* Thumbnail */}
      <Image
        src={thumbnail}
        alt="Podcast episode"
        fill
        unoptimized
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, 34vw"
      />

      {/* Gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 group-hover:bg-[#fbe400] shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <PlayIcon />
        </div>
      </div>

      {/* YouTube badge */}
      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg viewBox="0 0 90 20" width="54" height="12" fill="none">
          <rect width="90" height="20" rx="4" fill="#ff0000" />
          <text x="8" y="14" fill="white" fontSize="11" fontFamily="Arial" fontWeight="bold">
            YouTube
          </text>
        </svg>
      </div>
    </a>
  );
}

export default function PodcastClient() {
  const t = useTranslations("podcastPage");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#edf1f5" }}>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Section header */}
        <div className="mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#fbe400] text-[#1a1a2e] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a1a2e">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="white" />
            </svg>
            {t("watchLearn")}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1a1a2e] uppercase tracking-tight leading-none">
            {t("title")}
          </h1>
          <div className="flex h-[5px] w-28 mt-4 rounded-full overflow-hidden">
            {["#fbe400", "#27849d", "#e8632a", "#8b5cf6"].map((c, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7">
          {EPISODES.map((ep) => (
            <PodcastCard key={ep.id} id={ep.id} thumb={ep.thumb} />
          ))}
        </div>

      </div>
    </div>
  );
}
