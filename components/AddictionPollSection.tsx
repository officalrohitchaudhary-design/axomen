"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function fmt(n: number) {
  return n.toLocaleString("en-IN");
}

export default function AddictionPollSection() {
  const t = useTranslations("addictionPoll");
  const [count, setCount] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voting, setVoting] = useState(false);
  const [justVoted, setJustVoted] = useState(false);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setVoted(!!localStorage.getItem("hyi-poll-voted"));
    fetch("/api/addiction-poll")
      .then((r) => r.json())
      .then((d) => {
        const target = d.count ?? 0;
        setCount(target);
        setReady(true);
        const from = Math.max(0, target - Math.round(target * 0.06));
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          setDisplayed(Math.round(from + (target - from) * ease));
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      })
      .catch(() => setReady(true));
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleVote = async () => {
    if (voted || voting) return;
    setVoting(true);
    try {
      const res = await fetch("/api/addiction-poll", { method: "POST" });
      const d = await res.json();
      const newCount = d.count ?? count + 1;
      setCount(newCount);
      setDisplayed(newCount);
      setVoted(true);
      setJustVoted(true);
      localStorage.setItem("hyi-poll-voted", "1");
    } finally {
      setVoting(false);
    }
  };

  return (
    <section id="addiction-poll" className="w-full bg-[#fafaf8] scroll-mt-28">
      {/* Yellow top accent stripe */}
      <div className="h-[3px] w-full bg-[#fbe400]" aria-hidden />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col items-center gap-8">

        {/* Row 1 — Heading */}
        <h2
          className="text-[#1a1a2e] leading-[0.92] uppercase whitespace-nowrap text-center"
          style={{
            fontFamily: "var(--font-anton), Impact, sans-serif",
            fontSize: "clamp(1.3rem, 3.8vw, 3.2rem)",
          }}
        >
          {t("headingPart1")}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{t("headingHighlight")}</span>
            <span
              className="absolute left-0 bottom-[6%] w-full h-[28%] bg-[#fbe400] -z-0 rounded-sm"
              aria-hidden
            />
          </span>
          {" "}{t("headingPart2")}
        </h2>


        {/* Row 3 — Sub + CTA */}
        <div className="flex flex-col items-center gap-4">
          <p
            className="text-[#1a1a2e]/50 text-sm leading-relaxed text-center max-w-[300px]"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("subtitle")}
          </p>

          {!voted ? (
            <button
              onClick={handleVote}
              disabled={voting}
              className="inline-flex items-center gap-2.5 bg-[#fbe400] hover:bg-[#f5d800] active:scale-[0.97] text-[#1a1a2e] font-black text-[12.5px] uppercase tracking-[0.16em] px-7 py-3.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbe400] focus-visible:ring-offset-2"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {voting ? t("voting") : t("button")}
              {!voting && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          ) : (
            <div className="flex items-start gap-3 border-l-[3px] border-[#fbe400] pl-3.5 py-1">
              <div className="flex flex-col gap-0.5">
                <p
                  className="text-[#1a1a2e] font-black text-sm"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {justVoted ? t("votedTitle") : t("votedAlready")}
                </p>
                <p
                  className="text-[#1a1a2e]/40 text-xs"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {t("votedSub")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Row 2 — Counter */}
        <div className="flex flex-col items-center border border-gray-200 bg-white px-10 sm:px-16 py-7 sm:py-9 gap-3">
          <span
            className="text-[10px] font-black tracking-[0.22em] uppercase text-[#1a1a2e]/30"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("counterLabel")}
          </span>
          <div
            className="tabular-nums text-[#1a1a2e] leading-none"
            style={{
              fontFamily: "var(--font-anton), Impact, sans-serif",
              fontSize: "clamp(3.2rem, 11vw, 5.5rem)",
            }}
            aria-live="polite"
          >
            {ready ? fmt(displayed) : <span className="opacity-20">——</span>}
          </div>
          <div className="h-px w-12 bg-[#fbe400]" aria-hidden />
          <p
            className="text-[#1a1a2e]/40 text-[11px] font-bold tracking-[0.1em] uppercase text-center"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("counterSub")}
          </p>
        </div>


      </div>

      {/* Bottom yellow stripe */}
      <div className="h-[3px] w-full bg-[#1a1a2e]/5" aria-hidden />
    </section>
  );
}
