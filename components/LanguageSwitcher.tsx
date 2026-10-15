"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/* ─────────────── Data ─────────────── */
const LANGS = [
  { code: "en", label: "English", native: "English", short: "EN" },
  { code: "hi", label: "Hindi", native: "हिंदी", short: "HI" },
];

interface Props {
  mobile?: boolean;
}

const BLOG_LANGS = new Set(["en", "hi"]);

export function IndiaFlag({ className = "w-[22px] h-[15px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`shrink-0 rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.3)] border border-black/20 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Saffron stripe */}
      <rect width="24" height="5.333" fill="#FF9933" />
      {/* White stripe */}
      <rect y="5.333" width="24" height="5.333" fill="#FFFFFF" />
      {/* Green stripe */}
      <rect y="10.667" width="24" height="5.333" fill="#138808" />
      {/* Ashoka Chakra */}
      <g transform="translate(12, 8)">
        <circle r="2.1" fill="none" stroke="#000080" strokeWidth="0.45" />
        <circle r="0.5" fill="#000080" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="0"
            y2="-2.0"
            stroke="#000080"
            strokeWidth="0.22"
            transform={`rotate(${(i * 360) / 24})`}
          />
        ))}
      </g>
    </svg>
  );
}

function ArrowDown({ open }: { open: boolean }) {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      className={`transition-transform duration-200 shrink-0 text-slate-500 ${open ? "-rotate-180" : ""}`}
      aria-hidden="true"
    >
      <polygon points="0,1 8,1 4,5.5" fill="currentColor" />
    </svg>
  );
}

function GlobeIcon({ size = 20, className = "text-[#1a1a2e]" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function LanguageSwitcher({ mobile = false }: Props) {
  const [selected, setSelected] = useState("en");
  const [dropOpen, setDropOpen] = useState(false);
  const [sheetMounted, setSheetMounted] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dropRef = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === selected) || LANGS[0];

  useEffect(() => {
    setMounted(true);
    const urlLang = searchParams.get("lang");
    if (urlLang && LANGS.find((l) => l.code === urlLang)) {
      setSelected(urlLang);
      localStorage.setItem("hyi-lang", urlLang);
    } else {
      const saved = localStorage.getItem("hyi-lang");
      if (saved && LANGS.find((l) => l.code === saved)) setSelected(saved);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!dropOpen) return;
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [dropOpen]);

  useEffect(() => {
    if (sheetMounted) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetMounted]);

  const pick = (code: string) => {
    setSelected(code);
    localStorage.setItem("hyi-lang", code);
    document.cookie = `hyi-lang=${code}; path=/; max-age=${365 * 24 * 3600}; SameSite=Lax`;
    setDropOpen(false);
    closeSheet();
    window.dispatchEvent(new CustomEvent("hyi:lang-picked", { detail: { code } }));

    if (pathname.startsWith("/blog")) {
      const params = new URLSearchParams(searchParams.toString());
      if (BLOG_LANGS.has(code) && code !== "en") {
        params.set("lang", code);
      } else {
        params.delete("lang");
      }
      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ""}`);
    }
  };

  const openSheet = () => {
    setSheetMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setSheetVisible(true)));
  };

  const closeSheet = () => {
    setSheetVisible(false);
    setTimeout(() => setSheetMounted(false), 380);
  };

  /* ════════ MOBILE TRIGGER (Navbar Icon Design) + ORIGINAL BOTTOM SHEET ════════ */
  if (mobile) {
    return (
      <>
        <button
          id="lang-switcher-mobile"
          onClick={openSheet}
          aria-label="Select language"
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0f172a] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-slate-200/90 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134FC1]"
        >
          <IndiaFlag className="w-[18px] h-[12px]" />
          <span
            className="text-[12px] font-extrabold tracking-wide text-[#0f172a]"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {current.short}
          </span>
          <ArrowDown open={sheetMounted} />
        </button>

        {mounted &&
          sheetMounted &&
          createPortal(
            <BottomSheet
              visible={sheetVisible}
              selected={selected}
              onPick={pick}
              onClose={closeSheet}
            />,
            document.body
          )}
      </>
    );
  }

  /* ════════ DESKTOP TRIGGER + DROPDOWN ════════ */
  return (
    <div ref={dropRef} className="relative h-full flex items-center px-4 border-l border-gray-100">
      <button
        id="lang-switcher-desktop"
        onClick={() => setDropOpen((v) => !v)}
        aria-expanded={dropOpen}
        aria-label="Select language"
        className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0f172a] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-sm hover:border-slate-300 border border-slate-200/90 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134FC1]"
      >
        <IndiaFlag className="w-[20px] h-[13.5px]" />

        <span
          className="text-[12.5px] font-extrabold tracking-wide text-[#0f172a]"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {current.short}
        </span>

        <ArrowDown open={dropOpen} />
      </button>

      {/* Desktop Dropdown */}
      <div
        style={{
          opacity: dropOpen ? 1 : 0,
          transform: dropOpen ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)",
          pointerEvents: dropOpen ? "auto" : "none",
          transition: "opacity 0.16s ease, transform 0.16s ease",
        }}
        className="absolute right-4 top-[calc(100%+6px)] w-48 bg-white border border-gray-100 shadow-xl overflow-hidden z-50 origin-top-right rounded-xl"
      >
        {/* Header */}
        <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
          <GlobeIcon size={12} className="text-[#1a1a2e]/40" />
          <p
            className="text-[10px] font-black tracking-[0.2em] uppercase text-[#1a1a2e]/40"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            Language
          </p>
        </div>

        {/* Options */}
        <div>
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => pick(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors duration-150 cursor-pointer ${
                selected === lang.code
                  ? "bg-[#134fc1] text-[#fff]"
                  : "text-[#1a1a2e]/70 hover:bg-gray-50 hover:text-[#1a1a2e]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <IndiaFlag className="w-[20px] h-[13.5px]" />
                <span className="flex flex-col items-start leading-tight">
                  <span
                    className="text-[13.5px] font-bold"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {lang.native}
                  </span>
                  <span
                    className="text-[10px] font-semibold tracking-[0.1em] uppercase opacity-60"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {lang.label} ({lang.short})
                  </span>
                </span>
              </span>

              {selected === lang.code && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════ Bottom Sheet (mobile view popup - preserved exactly as original) ════════ */
function BottomSheet({
  visible,
  selected,
  onPick,
  onClose,
}: {
  visible: boolean;
  selected: string;
  onPick: (c: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9998] flex flex-col justify-end">
      <div
        onClick={onClose}
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />

      <div
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.38s cubic-bezier(0.32,0.72,0,1)",
        }}
        className="relative bg-white rounded-t-3xl pt-3 pb-8 shadow-2xl z-10"
      >
        {/* Handle */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Title */}
        <div className="flex items-center gap-2.5 px-6 mb-5">
          <GlobeIcon size={18} className="text-[#1a1a2e]" />
          <h2
            className="text-[15px] font-black tracking-[0.1em] uppercase text-[#1a1a2e]"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Language
          </h2>
        </div>

        {/* Options */}
        <div className="px-4 flex flex-col gap-2">
          {LANGS.map((lang) => {
            const active = selected === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onPick(lang.code)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-150 cursor-pointer ${
                  active
                    ? "bg-[#134fc1] border-[1.5px] border-[#e5d000]"
                    : "bg-gray-50 border-[1.5px] border-transparent hover:bg-gray-100"
                }`}
              >
                <span className="flex flex-col items-start leading-tight">
                  <span
                    className={`text-[16px] font-extrabold ${active ? "text-[#fff]" : "text-[#1a1a2e]/70"}`}
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {lang.native}
                  </span>
                  <span
                    className={`text-[11px] font-semibold tracking-[0.1em] uppercase ${
                      active ? "text-[#fff]" : "text-[#1a1a2e]/60"
                    }`}
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {lang.label}
                  </span>
                </span>

                {active && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
