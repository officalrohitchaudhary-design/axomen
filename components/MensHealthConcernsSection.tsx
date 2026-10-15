"use client";

import React from "react";
import Link from "next/link";

interface ConcernCardData {
  id: string;
  topTitle: string;
  topSubtitle: string;
  bottomTitle: string;
  bottomSubtitle: string;
  imgSrc: string;
  imgAlt: string;
  href: string;
}

const CONCERNS: ConcernCardData[] = [
  {
    id: "card-1",
    topTitle: "Compulsive",
    topSubtitle: "Masturbation",
    bottomTitle: "Regain Control",
    bottomSubtitle: "Over Sexual Habits",
    imgSrc: "https://qurex-s3.s3.ap-south-1.amazonaws.com/public/wellness/five.png",
    imgAlt: "Masturbation Addiction Treatment in India - AxoMen",
    href: "/services/masturbation-habit-support",
  },
  {
    id: "card-2",
    topTitle: "Compulsive",
    topSubtitle: "Porn",
    bottomTitle: "Regain Control",
    bottomSubtitle: "Over Sexual Habits",
    imgSrc: "https://qurex-s3.s3.ap-south-1.amazonaws.com/public/wellness/four.png",
    imgAlt: "Compulsive Porn Habit Support",
    href: "/services/porn-habit-support",
  },
  {
    id: "card-3",
    topTitle: "Compulsive",
    topSubtitle: "Masturbation + Porn",
    bottomTitle: "Regain Control",
    bottomSubtitle: "Over Sexual Habits",
    imgSrc: "https://qurex-s3.s3.ap-south-1.amazonaws.com/public/wellness/one.png",
    imgAlt: "Combined Porn and Masturbation Support",
    href: "/services/porn-and-masturbation-support",
  },
];

export default function MensHealthConcernsSection() {
  return (
    <section
      aria-label="Men's health concerns we help with"
      className="w-full bg-white py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section Title ── */}
        <h2
          className="font-extrabold sm:font-bold tracking-tight text-left"
          style={{
            fontSize: "20px",
            color: "#171725",
            lineHeight: "28px",
            marginBottom: "20px",
          }}
        >
          Men&apos;s health concerns
          <br />
          we help with
        </h2>

        {/* ── Card List Section (only this div has background #f1f2f5) ── */}
        <div
          className="conc-card-list-wrapper w-full rounded-[24px] p-4 sm:p-6 md:p-8"
          style={{ backgroundColor: "#f1f2f5" }}
        >
          {/* Layout:
              - Mobile: 2 cards in single row, 3rd card on next row left-aligned
              - Web: 3 cards in single row, equal width and height, aligned cleanly
          */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-3.5 sm:gap-6 justify-start items-start max-w-[340px] sm:max-w-none">
            {CONCERNS.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className="conc-card block hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                style={{
                  cursor: "pointer",
                  width: "156px",
                  height: "222px",
                  borderRadius: "20px",
                  backgroundColor: "#ffffff",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  flexShrink: 0,
                  textDecoration: "none",
                }}
              >
                {/* ── Card Background Photo ── */}
                <picture style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
                  <source
                    media="(max-width: 767px)"
                    srcSet={item.imgSrc}
                  />
                  <img
                    src={item.imgSrc}
                    alt={item.imgAlt}
                    loading="lazy"
                    draggable="false"
                    className="card-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  />
                </picture>

                {/* ── Top Label Content ── */}
                <p
                  className={`top-card-content top-${index + 1}`}
                  style={{
                    position: "relative",
                    zIndex: 2,
                    margin: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    padding: "13px 12px 0 0",

                  }}
                >
                  <img
                    alt=""
                    draggable="false"
                    className="label-rect label-rect--upper"
                    src="https://qurex-s3.s3.ap-south-1.amazonaws.com/public/wellness/upper_rect_mob.png"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "100%",
                      height: "auto",
                      objectFit: "fill",
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                      fontSize: "12px",
                      fontWeight: 700,
                      textAlign: "right",
                      lineHeight: 1.15,
                      color: "#292D32",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.topTitle}
                    <br className="mobile-line-break" />
                    {item.topSubtitle}
                  </span>
                </p>

                {/* ── Bottom Label Content ── */}
                <p
                  className="bottom-card-content"
                  style={{
                    position: "relative",
                    zIndex: 2,
                    margin: 0,
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    padding: "0 0 11px 11px",
                  }}
                >
                  <img
                    alt=""
                    draggable="false"
                    className="label-rect label-rect--lower"
                    src="https://qurex-s3.s3.ap-south-1.amazonaws.com/public/wellness/lower_rect_mob.png"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "auto",
                      objectFit: "fill",
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                      padding: "0 24px 0 0",
                      fontSize: "12px",
                      fontWeight: 600,
                      textAlign: "left",
                      lineHeight: 1.15,
                      color: "#292D32",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.bottomTitle}
                    <br className="mobile-line-break" />
                    {item.bottomSubtitle}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded CSS for standalone copy-paste compatibility without external dependencies */}
      <style jsx>{`
        .conc-card {
          cursor: pointer;
          width: 156px;
          height: 222px;
          border-radius: 20px;
          background-color: #ffffff;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .conc-card .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .conc-card .top-card-content {
          position: relative;
          z-index: 2;
          margin: 0;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 13px 12px 0 0;
        }
        .conc-card .top-card-content span {
          font-size: 12px;
          font-weight: 500;
          text-align: right;
          line-height: 1.15;
          color: #292D32;
        }
        .conc-card .bottom-card-content {
          position: relative;
          z-index: 2;
          margin: 0;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: 0 0 11px 11px;
        }
        .conc-card .bottom-card-content span {
          padding: 0 24px 0 0;
          font-size: 12px;
          font-weight: 600;
          text-align: left;
          line-height: 1.15;
          color: #292D32;
        }
        .conc-card .label-rect {
          position: absolute;
          pointer-events: none;
        }
        .conc-card .label-rect--upper {
          top: 0;
          right: 0;
          width: 100%;
          height: auto;
          z-index: 1;
        }
        .conc-card .label-rect--lower {
          bottom: 0;
          left: 0;
          width: 100%;
          height: auto;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
