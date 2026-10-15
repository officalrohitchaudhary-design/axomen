"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SessionServiceCard {
  id: string;
  title: string;
  badge?: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const SESSION_SERVICES: SessionServiceCard[] = [
  {
    id: "individual",
    title: "Individual",
    badge: "For 18+",
    imageSrc: "/image/service-single.png",
    imageAlt: "Individual consultation recovery service",
    href: "/booking",
  },
  {
    id: "teen",
    title: "Teen",
    badge: "13 - 17",
    imageSrc: "/image/service-teen-card.png",
    imageAlt: "Teen confidential recovery guidance",
    href: "/booking",
  },
  {
    id: "couples",
    title: "Couples",
    imageSrc: "/image/service-couple.png",
    imageAlt: "Couples relationship and habit recovery",
    href: "/booking",
  },
];

export default function WhatSessionsWeOfferV1Section() {
  return (
    <section
      aria-label="Who can get consultation sessions"
      className="w-full bg-white py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section Title (Two-line small heading matching Men's Health section) ── */}
        <h2
          className="font-extrabold sm:font-bold tracking-tight text-left"
          style={{
            fontSize: "20px",
            color: "#171725",
            lineHeight: "28px",
            marginBottom: "20px",
          }}
        >
          Who can get
          <br />
          consultation sessions
        </h2>

        {/* ── Card List Section (#f6f6f8 container) ── */}
        <div
          className="w-full rounded-[24px] p-4 sm:p-6 md:p-8"
          style={{ backgroundColor: "#f6f6f8" }}
        >
          {/* Layout:
              - Mobile: 2 cards in Row 1 (Individual, Teen), 1 card centered in Row 2 (Couples)
              - Desktop: Clean single row of 3 cards aligned side-by-side with equal dimensions
          */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-start gap-3.5 sm:gap-6 w-full max-w-[340px] sm:max-w-none mx-auto sm:mx-0">
            {/* Row 1 for Mobile / First 2 cards for Desktop */}
            <div className="flex items-center justify-center gap-3.5 sm:gap-6 w-full sm:w-auto">
              {SESSION_SERVICES.slice(0, 2).map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="session-card group block w-[152px] sm:w-[172px] md:w-[180px] h-[152px] sm:h-[172px] md:h-[180px] bg-white rounded-[26px] sm:rounded-[28px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(22,174,226,0.22)] hover:-translate-y-1 active:scale-[0.96] transition-all duration-200 border border-gray-200 hover:border-[#16aee2]/50 cursor-pointer flex-shrink-0"
                  style={{ textDecoration: "none" }}
                >
                  {/* Photo Box */}
                  <div className="w-full flex-1 relative flex items-end justify-center pt-2 px-1 overflow-hidden bg-white">
                    {item.badge && (
                      <span className="absolute top-2 right-2.5 text-[9.5px] sm:text-[10px] font-bold text-black bg-[#e9e315] px-2 py-0.5 rounded-full border border-[#d5cf0c] tracking-tight z-10 shadow-sm">
                        {item.badge}
                      </span>
                    )}
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="w-full h-full max-h-[105px] sm:max-h-[120px] md:max-h-[128px] object-contain object-bottom group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                      loading="lazy"
                    />
                  </div>
                  {/* Bottom Cyan Banner with White Text */}
                  <div className="w-full bg-[#18aee2] group-hover:bg-[#149fcb] py-2 sm:py-2.5 text-center flex-shrink-0 transition-colors duration-200">
                    <span className="text-white font-semibold text-[15px] sm:text-[16px] tracking-wide block">
                      {item.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Row 2 for Mobile (Centered) / 3rd card for Desktop */}
            <div className="flex items-center justify-center sm:block w-full sm:w-auto">
              {SESSION_SERVICES.slice(2).map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="session-card group block w-[152px] sm:w-[172px] md:w-[180px] h-[152px] sm:h-[172px] md:h-[180px] bg-white rounded-[26px] sm:rounded-[28px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(24,174,226,0.22)] hover:-translate-y-1 active:scale-[0.96] transition-all duration-200 border border-gray-200 hover:border-[#18aee2]/50 cursor-pointer flex-shrink-0"
                  style={{ textDecoration: "none" }}
                >
                  {/* Photo Box */}
                  <div className="w-full flex-1 relative flex items-end justify-center pt-2 px-1 overflow-hidden bg-white">
                    {item.badge && (
                      <span className="absolute top-2 right-2.5 text-[9.5px] sm:text-[10px] font-bold text-black bg-[#e9e315] px-2 py-0.5 rounded-full border border-[#d5cf0c] tracking-tight z-10 shadow-sm">
                        {item.badge}
                      </span>
                    )}
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="w-full h-full max-h-[105px] sm:max-h-[120px] md:max-h-[128px] object-contain object-bottom group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                      loading="lazy"
                    />
                  </div>
                  {/* Bottom Cyan Banner with White Text */}
                  <div className="w-full bg-[#18aee2] group-hover:bg-[#149fcb] py-2 sm:py-2.5 text-center flex-shrink-0 transition-colors duration-200">
                    <span className="text-white font-semibold text-[15px] sm:text-[16px] tracking-wide block">
                      {item.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
