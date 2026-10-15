"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Gender = "male" | "female" | "other";
type Profession = "student" | "employed" | "unemployed" | "homemaker" | "freelancer" | "other";

function generateMemberId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "HYI-";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// ─── Gender SVG Icons ────────────────────────────────────────────────────────

function MaleIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="26" r="11" fill="#3b82f6" opacity="0.15" />
      <circle cx="28" cy="26" r="8" fill="#3b82f6" />
      <circle cx="28" cy="18" r="4.5" fill="#1d4ed8" />
      <path d="M19 42c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M40 12l7-7m0 0h-5m5 0v5" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="47" cy="5" r="1.5" fill="#93c5fd" />
    </svg>
  );
}

function FemaleIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="20" r="11" fill="#ec4899" opacity="0.15" />
      <circle cx="32" cy="20" r="8" fill="#ec4899" />
      <circle cx="32" cy="12" r="4.5" fill="#be185d" />
      <path d="M23 36c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" fill="none" />
      <line x1="32" y1="43" x2="32" y2="52" stroke="#f9a8d4" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="27" y1="48" x2="37" y2="48" stroke="#f9a8d4" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function OtherIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="24" r="11" fill="#8b5cf6" opacity="0.15" />
      <circle cx="32" cy="24" r="8" fill="#8b5cf6" />
      <circle cx="32" cy="16" r="4.5" fill="#6d28d9" />
      <path d="M23 40c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="22" cy="10" r="3" fill="#a78bfa" opacity="0.6" />
      <circle cx="42" cy="10" r="3" fill="#c4b5fd" opacity="0.6" />
      <path d="M22 10 Q32 4 42 10" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ─── Profession SVG Icons ─────────────────────────────────────────────────────

function StudentIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="22" width="32" height="16" rx="3" fill="#27849d" opacity="0.15" />
      <rect x="6" y="22" width="32" height="16" rx="3" stroke="#27849d" strokeWidth="2" fill="none" />
      <path d="M22 6L4 16l18 10 18-10L22 6z" fill="#27849d" />
      <path d="M36 16v10" stroke="#27849d" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="28" r="2" fill="#27849d" />
    </svg>
  );
}

function EmployedIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="18" width="36" height="22" rx="3" fill="#059669" opacity="0.15" />
      <rect x="4" y="18" width="36" height="22" rx="3" stroke="#059669" strokeWidth="2" fill="none" />
      <path d="M14 18v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="22" y1="26" x2="22" y2="32" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="28" x2="40" y2="28" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UnemployedIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" fill="#f97316" opacity="0.15" />
      <circle cx="20" cy="20" r="12" stroke="#f97316" strokeWidth="2" fill="none" />
      <line x1="29" y1="29" x2="38" y2="38" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="20" x2="25" y2="20" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HomemakerIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6L4 22h6v16h10v-10h4v10h10V22h6L22 6z" fill="#fbe400" opacity="0.3" />
      <path d="M22 6L4 22h6v16h10v-10h4v10h10V22h6L22 6z" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <rect x="18" y="28" width="8" height="10" rx="1" fill="#fde68a" />
    </svg>
  );
}

function FreelancerIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="12" width="36" height="24" rx="3" fill="#8b5cf6" opacity="0.15" />
      <rect x="4" y="12" width="36" height="24" rx="3" stroke="#8b5cf6" strokeWidth="2" fill="none" />
      <line x1="14" y1="36" x2="30" y2="36" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
      <rect x="14" y="18" width="16" height="10" rx="1.5" fill="#8b5cf6" opacity="0.3" />
      <line x1="16" y1="22" x2="28" y2="22" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="25" x2="24" y2="25" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function OtherProfIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="16" fill="#6b7280" opacity="0.1" />
      <circle cx="22" cy="22" r="16" stroke="#6b7280" strokeWidth="2" fill="none" />
      <circle cx="14" cy="22" r="2.5" fill="#6b7280" />
      <circle cx="22" cy="22" r="2.5" fill="#6b7280" />
      <circle cx="30" cy="22" r="2.5" fill="#6b7280" />
    </svg>
  );
}

// ─── Check Icon ────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const genders = [
  { id: "male" as Gender, color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe", Icon: MaleIcon },
  { id: "female" as Gender, color: "#ec4899", bg: "#fdf2f8", border: "#fbcfe8", Icon: FemaleIcon },
  { id: "other" as Gender, color: "#8b5cf6", bg: "#f5f3ff", border: "#ddd6fe", Icon: OtherIcon },
];

const professions = [
  { id: "student" as Profession, color: "#27849d", bg: "#f0f9ff", border: "#bae6fd", Icon: StudentIcon },
  { id: "employed" as Profession, color: "#059669", bg: "#f0fdf4", border: "#bbf7d0", Icon: EmployedIcon },
  { id: "unemployed" as Profession, color: "#f97316", bg: "#fff7ed", border: "#fed7aa", Icon: UnemployedIcon },
  { id: "homemaker" as Profession, color: "#d97706", bg: "#fffbeb", border: "#fde68a", Icon: HomemakerIcon },
  { id: "freelancer" as Profession, color: "#8b5cf6", bg: "#f5f3ff", border: "#ddd6fe", Icon: FreelancerIcon },
  { id: "other" as Profession, color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb", Icon: OtherProfIcon },
];

// ─── Step Progress Dots ────────────────────────────────────────────────────────

function StepDots({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="rounded-full transition-all duration-400"
          style={{
            width: step === n ? 28 : 8,
            height: 8,
            backgroundColor: step >= n ? "#1a1a2e" : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function JoinPage() {
  const t = useTranslations("joinPage");
  const [step, setStep] = useState<1 | 2 | 3 | "success">(1);
  const [gender, setGender] = useState<Gender | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState<Profession | null>(null);
  const [memberId] = useState(generateMemberId);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleGenderSelect(g: Gender) {
    setGender(g);
    setTimeout(() => setStep(2), 340);
  }

  function handleContinue() {
    if (!name.trim()) return;
    setStep(3);
  }

  async function handleSubmit() {
    if (!profession) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStep("success");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Success Screen ──────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-5 py-12 relative overflow-hidden" style={{ backgroundColor: "#76c0fe" }}>

        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top colorful stripe */}
        <div className="absolute top-0 left-0 right-0 flex h-[5px]">
          {["#1a1a2e", "#fbe400", "#27849d", "#f97316", "#8b5cf6", "#ec4899"].map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-md">

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">

            {/* Card top band */}
            <div className="bg-[#1a1a2e] px-7 pt-8 pb-7 text-center relative overflow-hidden">
              {/* subtle dot */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Badge */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#fbe400] mb-4 shadow-lg">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4l2.47 7.6H26l-6.47 4.7 2.47 7.6L16 19.2l-6 4.7 2.47-7.6L6 11.6h7.53L16 4z" fill="#1a1a2e" />
                </svg>
              </div>

              <p
                className="text-[#fbe400] text-[10px] font-black uppercase tracking-[0.35em] mb-2 relative"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("success.eyebrow")}
              </p>
              <h1
                className="text-[clamp(1.9rem,6vw,2.8rem)] leading-[0.95] text-white uppercase relative"
                style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
              >
                {t("success.titlePart1")}<br />
                <span className="text-[#fbe400]">{name.trim()}!</span>
              </h1>
            </div>

            {/* Card body */}
            <div className="px-7 py-6 flex flex-col gap-5">

              <p
                className="text-[#1a1a2e]/60 text-sm leading-relaxed text-center"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("success.subtitle")}
              </p>

              {/* Member ID block */}
              <div className="rounded-2xl border-2 border-dashed border-[#76c0fe]/60 bg-[#76c0fe]/10 px-5 py-4">
                <p
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a2e]/40 mb-2"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {t("success.memberIdLabel")}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="text-[clamp(1.4rem,5vw,2rem)] leading-none text-[#1a1a2e] tracking-[0.12em]"
                    style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
                  >
                    {memberId}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3.5 py-2 rounded-xl transition-all duration-200 shrink-0"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                      backgroundColor: copied ? "#059669" : "#1a1a2e",
                      color: "white",
                    }}
                  >
                    {copied ? <><CheckIcon /> {t("success.copied")}</> : <><CopyIcon /> {t("success.copy")}</>}
                  </button>
                </div>
              </div>

              {/* Details pills */}
              <div className="flex flex-wrap gap-2">
                {gender && (
                  <span
                    className="inline-flex items-center gap-1.5 bg-[#f1f5f9] text-[#1a1a2e] text-xs font-bold px-3 py-1.5 rounded-full capitalize"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" /></svg>
                    {t(`step1.${gender}`)}
                  </span>
                )}
                {age && (
                  <span
                    className="inline-flex items-center gap-1.5 bg-[#f1f5f9] text-[#1a1a2e] text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    {t("success.ageLabel", { age })}
                  </span>
                )}
                {profession && (
                  <span
                    className="inline-flex items-center gap-1.5 bg-[#f1f5f9] text-[#1a1a2e] text-xs font-bold px-3 py-1.5 rounded-full capitalize"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
                    {t(`step3.professions.${profession}`)}
                  </span>
                )}
              </div>

              {/* India stripe */}
              <div className="flex gap-1">
                <span className="h-[3px] flex-1 rounded-full bg-[#ff9933]" />
                <span className="h-[3px] flex-1 rounded-full bg-[#e5e7eb]" />
                <span className="h-[3px] flex-1 rounded-full bg-[#138808]" />
              </div>

              {/* CTA */}
              <a
                href="/blog"
                className="flex items-center justify-center gap-2 bg-[#fbe400] hover:bg-[#f5d800] text-[#1a1a2e] font-black text-sm py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wide"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("success.button")}
                <ArrowRightIcon />
              </a>

              <p
                className="text-center text-[11px] text-[#1a1a2e]/35 font-medium"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("success.footer")}
              </p>

            </div>
          </div>

        </div>
      </main>
    );
  }

  // ── Form Steps ──────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* Hero header */}
      <div className="bg-[#76c0fe] px-5 py-10 sm:py-14 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <p
            className="text-[#000] text-xs font-black uppercase tracking-[0.3em] mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="text-[clamp(2rem,7vw,4rem)] leading-[0.95] text-[#000] uppercase"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("titlePart1")} <span className="text-[#fbe400]">{t("titlePart2")}</span>
          </h1>
          <p
            className="mt-4 text-[#000] text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Form area */}
      <div className="flex-1 px-5 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">

          {/* Step dots */}
          <StepDots step={step as 1 | 2 | 3} />

          {/* ── Step 1: Gender ─────────────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <p
                className="text-[#1a1a2e]/35 text-xs font-black uppercase tracking-[0.3em] mb-2 text-center"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("step1.eyebrow")}
              </p>
              <h2
                className="text-[clamp(1.6rem,5vw,2.8rem)] leading-[1.05] text-[#1a1a2e] uppercase text-center mb-2"
                style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
              >
                {t("step1.title")}
              </h2>
              <p
                className="text-gray-400 text-sm text-center mb-10 leading-relaxed"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("step1.subtitle")}
              </p>

              {/* Gender cards */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {genders.map((g, i) => (
                  <button
                    key={g.id}
                    onClick={() => handleGenderSelect(g.id)}
                    className={`
                      flex flex-col items-center justify-center gap-3 p-6 sm:p-7 rounded-2xl border-2 transition-all duration-200
                      hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer
                      ${i === 2 ? "col-span-2 lg:col-span-1" : ""}
                      ${gender === g.id ? "scale-95 shadow-md" : ""}
                    `}
                    style={{
                      backgroundColor: g.bg,
                      borderColor: gender === g.id ? g.color : g.border,
                      boxShadow: gender === g.id ? `0 0 0 3px ${g.color}40` : undefined,
                    }}
                  >
                    <div className={i === 2 ? "lg:contents flex flex-col items-center" : "flex flex-col items-center gap-3"}>
                      <g.Icon />
                      <span
                        className="text-base font-black uppercase tracking-[0.08em]"
                        style={{ color: g.color, fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                      >
                        {t(`step1.${g.id}`)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: Name + Age ──────────────────────────────────────────── */}
          {step === 2 && (
            <div>
              <p
                className="text-[#1a1a2e]/35 text-xs font-black uppercase tracking-[0.3em] mb-2 text-center"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("step2.eyebrow")}
              </p>
              <h2
                className="text-[clamp(1.6rem,5vw,2.8rem)] leading-[1.05] text-[#1a1a2e] uppercase text-center mb-2"
                style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
              >
                {t("step2.title")}
              </h2>
              <p
                className="text-gray-400 text-sm text-center mb-10 leading-relaxed"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("step2.subtitle")}
              </p>

              <div className="flex flex-col gap-6 max-w-md mx-auto">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]/50 flex items-center gap-1.5"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {t("step2.nameLabel")}
                    <span className="text-[#ec4899] text-sm leading-none">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoFocus
                    required
                    placeholder={t("step2.namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) handleContinue(); }}
                    className="w-full border-2 border-gray-200 bg-[#f9fafb] rounded-xl px-4 py-4 text-[#1a1a2e] text-base placeholder:text-gray-300 focus:outline-none focus:border-[#1a1a2e] focus:bg-white transition-all duration-200"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  />
                </div>

                {/* Age */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="age"
                    className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]/50 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    {t("step2.ageLabel")}
                    <span
                      className="text-[10px] font-bold text-gray-300 normal-case tracking-normal"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                    >
                      {t("step2.ageOptional")}
                    </span>
                  </label>
                  <input
                    id="age"
                    type="number"
                    min={10}
                    max={60}
                    placeholder={t("step2.agePlaceholder")}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full border-2 border-gray-200 bg-[#f9fafb] rounded-xl px-4 py-4 text-[#1a1a2e] text-base placeholder:text-gray-300 focus:outline-none focus:border-[#1a1a2e] focus:bg-white transition-all duration-200"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  />
                </div>

                {/* Continue */}
                <button
                  onClick={handleContinue}
                  disabled={!name.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-[#252540] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 mt-2"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {t("step2.continueButton")}
                  <ArrowRightIcon />
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-gray-300 hover:text-gray-500 transition-colors text-center"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {t("step2.goBack")}
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Profession ─────────────────────────────────────────── */}
          {step === 3 && (
            <div>
              <p
                className="text-[#1a1a2e]/35 text-xs font-black uppercase tracking-[0.3em] mb-2 text-center"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("step3.eyebrow")}
              </p>
              <h2
                className="text-[clamp(1.6rem,5vw,2.8rem)] leading-[1.05] text-[#1a1a2e] uppercase text-center mb-2"
                style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
              >
                {t("step3.title")}
              </h2>
              <p
                className="text-gray-400 text-sm text-center mb-10 leading-relaxed"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("step3.subtitle")}
              </p>

              {/* Profession cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                {professions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProfession(p.id)}
                    className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 cursor-pointer text-center"
                    style={{
                      backgroundColor: profession === p.id ? p.bg : "#f9fafb",
                      borderColor: profession === p.id ? p.color : "#e5e7eb",
                      boxShadow: profession === p.id ? `0 0 0 3px ${p.color}30` : undefined,
                    }}
                  >
                    <p.Icon />
                    <span
                      className="text-sm font-black leading-tight"
                      style={{
                        color: profession === p.id ? p.color : "#1a1a2e",
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                      }}
                    >
                      {t(`step3.professions.${p.id}`)}
                    </span>
                    {profession === p.id && (
                      <span
                        className="flex items-center justify-center w-5 h-5 rounded-full"
                        style={{ backgroundColor: p.color, color: "white" }}
                      >
                        <CheckIcon />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Submit */}
              <div className="max-w-md mx-auto flex flex-col gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!profession || loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#fbe400] hover:bg-[#f5d800] disabled:opacity-40 disabled:cursor-not-allowed text-[#1a1a2e] font-black text-sm py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                      </svg>
                      {t("step3.joining")}
                    </>
                  ) : (
                    <>
                      {t("step3.submitButton")}
                      <ArrowRightIcon />
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-gray-300 hover:text-gray-500 transition-colors text-center"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {t("step3.goBack")}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="border-t border-gray-100 px-5 py-5">
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: "lock", label: t("trustLabels.private") },
            { icon: "heart", label: t("trustLabels.noJudgment") },
            { icon: "users", label: t("trustLabels.members") },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-lg bg-[#fbe400] flex items-center justify-center shrink-0"
              >
                {icon === "lock" && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
                {icon === "heart" && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a1a2e" stroke="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                )}
                {icon === "users" && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
              </span>
              <span
                className="text-xs font-bold text-gray-500"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
