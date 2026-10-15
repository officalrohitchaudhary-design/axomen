"use client";

import React from "react";

const ITEMS = [
  "No judgment",
  "100% private & confidential",
  "Backed by experts",
  "End-to-end support",
];

export default function FeaturesMarquee() {
  // 8 repetitions so the marquee is completely populated and continuous
  const itemsList = Array.from({ length: 8 }).flatMap(() => ITEMS);

  return (
    <section className="list-of-features w-full bg-white py-4 sm:py-5 overflow-hidden select-none border-b border-gray-100">
      <div className="features-overflow w-full overflow-hidden flex items-center">
        {/* ── Native Marquee tag running Right-to-Left ── */}
        {/* @ts-ignore */}
        <marquee
          direction="left"
          scrollamount="6"
          behavior="scroll"
          className="w-full flex items-center"
        >
          <div className="features-slide inline-flex items-center whitespace-nowrap">
            {itemsList.map((text, idx) => (
              <div
                key={idx}
                className="feature-item inline-flex items-center shrink-0"
              >
                <span
                  className="feature-text text-[20px] md:text-[24px] font-[600] text-[#000000] leading-[20px] whitespace-nowrap"
                  style={{
                    fontSize: "24px",
                    lineHeight: "20px",
                    color: "#000000",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {text}
                </span>
                <div
                  className="feature-dash shrink-0 ml-[16px] mr-[16px] md:ml-[49px] md:mr-[49px] w-[20px] md:w-[29px] h-[2px] bg-[#16aee2]"
                  style={{
                    height: "2px",
                    backgroundColor: "#16aee2",
                  }}
                />
              </div>
            ))}
          </div>
          {/* @ts-ignore */}
        </marquee>
      </div>
    </section>
  );
}
