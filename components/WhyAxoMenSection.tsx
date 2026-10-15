"use client";

import React from "react";
import Link from "next/link";

interface StatCardData {
  id: string;
  isStaggeredDown: boolean;
  number: string;
  unit?: string;
  description: string;
}

const STAT_CARDS: StatCardData[] = [
  {
    id: "experience",
    isStaggeredDown: true,
    number: "5+",
    unit: "Years",
    description: "Average experience in habit recovery guidance",
  },
  {
    id: "joined",
    isStaggeredDown: false,
    number: "1,000+",
    description: "Men joined us & received guidance at AxoMen",
  },
  {
    id: "improvement",
    isStaggeredDown: false,
    number: "97%",
    description: "Reported improvement in symptoms within 45 days",
  },
  {
    id: "techniques",
    isStaggeredDown: true,
    number: "30+",
    description: "Proven behavioral techniques & recovery tools",
  },
];

export default function WhyAxoMenSection() {
  return (
    <section
      aria-label="Why AxoMen was built"
      className="w-full bg-[#f4f6fa] pt-8 sm:pt-12 md:pt-16 pb-0 overflow-hidden select-none border-t border-b border-[#E3E8F0]"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        {/* ── Section Title: 20px, #292D32, tight line spacing ── */}
        <h2
          className="font-extrabold tracking-tight text-center max-w-2xl mx-auto"
          style={{
            fontSize: "20px",
            color: "#292D32",
            lineHeight: "26px",
          }}
        >
          Men&apos;s health concerns are real.
          <br />
          Most men never get the right help.
          <br />
          AxoMen was built to change that
        </h2>

        {/* ── Pill Button: Learn more about AxoMen ── */}
        <div className="flex justify-center mt-3.5 sm:mt-5 mb-6 sm:mb-8 md:mb-10">
          <Link
            href="/about"
            id="learn-more-axomen-btn"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-[#e9e315] hover:bg-[#d8d212] active:scale-[0.98] text-black text-[13px] sm:text-[15px] font-semibold tracking-wide transition-all duration-200 shadow-[0_2px_10px_rgba(233,227,21,0.3)] hover:shadow-[0_4px_16px_rgba(233,227,21,0.45)]"
          >
            Learn more about AxoMen
          </Link>
        </div>

        {/* ── 4 Stat Cards in Single Screen (No horizontal scroll, 4-col grid on all screens) ── */}
        <div className="w-full">
          <div className="grid grid-cols-4 items-end gap-1.5 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
            {STAT_CARDS.map((card) => {
              const isTall = !card.isStaggeredDown;

              return (
                <div
                  key={card.id}
                  className={`group bg-white rounded-t-[16px] sm:rounded-t-[22px] md:rounded-t-[28px] border border-[#E3E8F0] border-b-0 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(22,174,226,0.18)] hover:border-[#16aee2]/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center px-1 sm:px-2.5 md:px-4 pt-3.5 sm:pt-6 md:pt-8 w-full ${
                    isTall
                      ? "h-[250px] sm:h-[300px] md:h-[370px]"
                      : "h-[185px] sm:h-[230px] md:h-[285px]"
                  }`}
                >
                  {/* ── Metric Title: font-size 18px, font-weight 600, line-height 24px, color #292D32 ── */}
                  <div className="flex flex-col items-center justify-center">
                    <span
                      className="tracking-tight text-center"
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        color: "#292D32",
                      }}
                    >
                      {card.number}
                    </span>
                    {card.unit && (
                      <span
                        className="tracking-tight text-center"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          color: "#292D32",
                          marginTop: "1px",
                        }}
                      >
                        {card.unit}
                      </span>
                    )}
                  </div>

                  {/* ── Sub-paragraph: font-size 10px, very small line spacing ── */}
                  <p
                    className="text-center font-normal w-full"
                    style={{
                      fontSize: "10px",
                      lineHeight: "13px",
                      color: "#475467",
                      marginTop: card.unit ? "4px" : "6px",
                      wordBreak: "normal",
                      overflowWrap: "break-word",
                    }}
                  >
                    {card.description}
                  </p>

                  {/* Bottom whitespace pillar extending to baseline */}
                  <div className="flex-1 w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
