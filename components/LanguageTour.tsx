"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

const TOUR_KEY = "hyi-tour-done";
const PAD = 10;

interface SpotRect { top: number; left: number; width: number; height: number }

export default function LanguageTour() {
  const [mounted, setMounted]   = useState(false);
  const [active, setActive]     = useState(false);
  const [visible, setVisible]   = useState(false);
  const [rect, setRect]         = useState<SpotRect | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dismissed               = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    localStorage.setItem(TOUR_KEY, "1");
    setVisible(false);
    setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
    }, 420);
  }, []);

  const measure = useCallback(() => {
    const mob = window.innerWidth < 1024;
    setIsMobile(mob);
    const id = mob ? "lang-switcher-mobile" : "lang-switcher-desktop";
    const el = document.getElementById(id);
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, []);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(TOUR_KEY)) return;
    setActive(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      measure();
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 350);
    return () => clearTimeout(t);
  }, [measure]);

  useEffect(() => {
    if (!active) return;
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("hyi:lang-picked", dismiss);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("hyi:lang-picked", dismiss);
    };
  }, [active, measure, dismiss]);

  if (!mounted || !active || !rect) return null;

  const sTop  = rect.top  - PAD;
  const sLeft = rect.left - PAD;
  const sW    = rect.width  + PAD * 2;
  const sH    = rect.height + PAD * 2;
  const dim   = { background: "rgba(6,6,16,0.82)", opacity: visible ? 1 : 0, transition: "opacity 0.38s ease" };
  const rightGap = Math.max(10, window.innerWidth - (sLeft + sW));

  return createPortal(
    <>
      {/* 4-panel overlay — punches a hole at the spotlight */}
      <div onClick={dismiss} className="fixed inset-x-0 top-0 z-[9990] cursor-default" style={{ ...dim, height: sTop }} />
      <div onClick={dismiss} className="fixed inset-x-0 z-[9990] cursor-default" style={{ ...dim, top: sTop + sH, bottom: 0 }} />
      <div onClick={dismiss} className="fixed left-0 z-[9990] cursor-default" style={{ ...dim, top: sTop, width: sLeft, height: sH }} />
      <div onClick={dismiss} className="fixed right-0 z-[9990] cursor-default" style={{ ...dim, top: sTop, left: sLeft + sW, height: sH }} />

      {/* Spotlight ring */}
      <div className="fixed pointer-events-none z-[9991] rounded-[14px]" style={{
        top: sTop, left: sLeft, width: sW, height: sH,
        border: "2.5px solid #fbe400",
        boxShadow: "0 0 0 4px rgba(251,228,0,0.14), 0 0 32px rgba(251,228,0,0.42)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.38s ease",
        animation: visible ? "hyi-ring 2.4s ease-in-out infinite" : "none",
      }} />

      {/* Tooltip — desktop: below button, right-aligned */}
      {!isMobile && (
        <div className="fixed z-[9992]" style={{
          top: sTop + sH + 12,
          right: rightGap,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.4s ease 0.12s, transform 0.4s ease 0.12s",
        }}>
          <DesktopTooltip onSkip={dismiss} />
        </div>
      )}

      {/* Tooltip — mobile: pinned bottom */}
      {isMobile && (
        <div className="fixed left-4 right-4 bottom-6 z-[9992]" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.4s ease 0.12s, transform 0.4s ease 0.12s",
        }}>
          <MobileTooltip onSkip={dismiss} />
        </div>
      )}

      <style>{`
        @keyframes hyi-ring {
          0%,100% { box-shadow: 0 0 0 4px rgba(251,228,0,0.14), 0 0 32px rgba(251,228,0,0.42); }
          50%      { box-shadow: 0 0 0 7px rgba(251,228,0,0.26), 0 0 56px rgba(251,228,0,0.65); }
        }
      `}</style>
    </>,
    document.body
  );
}

/* ── Desktop tooltip ── */
function DesktopTooltip({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="relative w-[288px]">
      {/* Arrow pointing UP — matches white card */}
      <div className="absolute -top-[9px] right-6">
        <svg width="18" height="10" viewBox="0 0 18 10"><path d="M9 0L18 10H0Z" fill="#ffffff" /></svg>
      </div>

      <Card>
        <div className="flex items-center gap-2.5 mb-2.5">
          <IconBadge />
          <div>
            <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#1a1a2e]/35">Step 1 of 1</p>
            <p className="text-[#1a1a2e] font-extrabold text-[14px] leading-tight">Choose Your Language</p>
          </div>
        </div>
        <p className="text-[#1a1a2e]/55 text-[12px] leading-[1.6] mb-3">
          Click the button above and pick your local language — read everything on this platform in your mother tongue.
        </p>
        <Badges />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1a1a2e]/[0.07]">
          <span className="flex items-center gap-1.5 text-[#1a1a2e]/60 text-[11px] font-bold">
            <ArrowUpIcon /> Click above to choose
          </span>
          <SkipBtn onSkip={onSkip} />
        </div>
      </Card>
    </div>
  );
}

/* ── Mobile tooltip ── */
function MobileTooltip({ onSkip }: { onSkip: () => void }) {
  return (
    <Card>
      <div className="flex items-start gap-2.5">
        <IconBadge />
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#1a1a2e]/35 mb-0.5">Step 1 of 1</p>
          <p className="text-[#1a1a2e] font-extrabold text-[14px] leading-tight">Choose Your Language</p>
          <p className="text-[#1a1a2e]/55 text-[11.5px] leading-[1.6] mt-1.5">
            Tap the language button at the top‑right to read in your local language.
          </p>
        </div>
        <SkipBtn onSkip={onSkip} />
      </div>
      <div className="mt-3">
        <Badges />
        <span className="flex items-center gap-1.5 text-[#1a1a2e]/60 text-[11px] font-bold mt-3">
          <ArrowUpIcon /> Tap the language button above
        </span>
      </div>
    </Card>
  );
}

/* ── Shared atoms ── */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{
      background: "#ffffff",
      border: "1px solid rgba(26,26,46,0.1)",
      boxShadow: "0 16px 48px rgba(26,26,46,0.14), 0 4px 12px rgba(26,26,46,0.08)",
    }}>
      {/* Theme-color top stripe: yellow + navy */}
      <div className="flex h-[3.5px]">
        <div className="flex-1 bg-[#fbe400]" />
        <div className="w-[40px] bg-[#1a1a2e]" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function IconBadge() {
  return (
    <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: "linear-gradient(135deg, #fbe400, #f5c800)" }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="#1a1a2e" aria-hidden="true">
        <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
    </span>
  );
}

function Badges() {
  const langs = ["हिंदी", "தமிழ்", "ਪੰਜਾਬੀ", "मराठी", "বাংলা"];
  return (
    <div className="flex flex-wrap gap-1">
      {langs.map((l) => (
        <span key={l}
          className="text-[10px] font-bold px-1.5 py-[2px] rounded-md bg-[#fbe400] text-[#1a1a2e]">
          {l}
        </span>
      ))}
      <span className="text-[10px] font-medium px-1.5 py-[2px] rounded-md bg-[#1a1a2e]/[0.06] text-[#1a1a2e]/40">
        +5 more
      </span>
    </div>
  );
}

function SkipBtn({ onSkip }: { onSkip: () => void }) {
  return (
    <button onClick={onSkip}
      className="shrink-0 text-[#1a1a2e]/30 text-[11px] font-medium hover:text-[#1a1a2e]/60 transition-colors focus:outline-none">
      Skip
    </button>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
