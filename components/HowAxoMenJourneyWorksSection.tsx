"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HowAxoMenJourneyWorksSection() {
  return (
    <section
      aria-label="How AxoMen journey works"
      className="w-full bg-white py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section Title (Exact matching style from Men's Health Concerns section) ── */}
        <h2
          className="font-extrabold sm:font-bold tracking-tight text-left"
          style={{
            fontSize: "20px",
            color: "#171725",
            lineHeight: "28px",
            marginBottom: "20px",
          }}
        >
          How AxoMen
          <br />
          journey works
        </h2>

        {/* ── Four Step Infographic Image ── */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl rounded-[24px] overflow-hidden border border-gray-200 hover:border-[#16aee2]/40 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[#fbfbfb] transition-colors duration-200">
            <Link
              href="/booking"
              aria-label="Start your recovery journey - Book your free session"
              className="block cursor-pointer group"
            >
              <Image
                src="/image/four-stepss.png"
                alt="How AxoMen journey works - 4 step recovery process"
                width={1024}
                height={1536}
                className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 768px"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
