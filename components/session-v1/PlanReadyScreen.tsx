"use client";

import { playZenTone } from "./audio";

interface PlanReadyScreenProps {
  onContinue: () => void;
  onBack: () => void;
  answers?: Record<string, string>;
  problemType?: string | null;
}

export default function PlanReadyScreen({
  onContinue,
  onBack,
  answers = {},
  problemType,
}: PlanReadyScreenProps) {
  const handleContinueClick = () => {
    playZenTone();
    onContinue();
  };

  // Derive contextual trigger label if available
  const triggerAnswer = answers["q7"] || "Emotional urges & routine";
  const durationAnswer = answers["q4"] || "Long-term habit";

  return (
    <div className="flex flex-col justify-between h-full w-full select-none animate-fadeIn px-5 sm:px-6 pt-5 sm:pt-7 pb-5 sm:pb-6 overflow-hidden bg-[#f7f5ff]">
      {/* ── HIDDEN BACK BUTTON FOR ACCESSIBILITY ── */}
      <button
        type="button"
        onClick={onBack}
        aria-hidden="true"
        className="hidden"
      />

      {/* ── TOP HEADER (Badge, Title, Subtitle) ── */}
      <div className="w-full flex flex-col items-center text-center flex-shrink-0">
        {/* Animated Completion Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-[11.5px] sm:text-[12px] font-bold tracking-wide mb-2.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Profile Analyzed • 100% Ready</span>
        </div>

        {/* Headline */}
        <h1 className="text-[22px] sm:text-[25px] font-black text-[#1e1b4b] tracking-tight leading-tight">
          Your Recovery Plan is Ready
        </h1>

        {/* Subtitle */}
        <p className="mt-1.5 text-[13px] sm:text-[14px] font-medium text-[#4338ca] leading-snug max-w-[325px]">
          Based on your assessment, here is what our educator will focus on in your private session:
        </p>
      </div>

      {/* ── CENTER CARDS: 3 HIGHLIGHT PILLARS ── */}
      <div className="flex-1 min-h-0 w-full flex flex-col justify-center gap-2.5 sm:gap-3 py-3 overflow-y-auto no-scrollbar max-w-[360px] mx-auto">
        {/* Card 1: Trigger Disruption */}
        <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-indigo-100 shadow-[0_2px_12px_rgba(79,70,229,0.06)] hover:border-indigo-200 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 text-[18px]">
            🧠
          </div>
          <div className="flex-1 text-left min-w-0">
            <h2 className="text-[14px] sm:text-[14.5px] font-bold text-[#1e1b4b] leading-snug">
              Trigger Disruption Plan
            </h2>
            <p className="text-[12px] sm:text-[12.5px] text-[#4b5563] mt-0.5 leading-relaxed">
              Targeted behavioral techniques to break the automatic reflex ({triggerAnswer}).
            </p>
          </div>
        </div>

        {/* Card 2: 1-on-1 Confidential Guidance */}
        <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-indigo-100 shadow-[0_2px_12px_rgba(79,70,229,0.06)] hover:border-indigo-200 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0 text-[18px]">
            🔒
          </div>
          <div className="flex-1 text-left min-w-0">
            <h2 className="text-[14px] sm:text-[14.5px] font-bold text-[#1e1b4b] leading-snug">
              100% Confidential &amp; Safe
            </h2>
            <p className="text-[12px] sm:text-[12.5px] text-[#4b5563] mt-0.5 leading-relaxed">
              Private 1-on-1 call with a certified educator. Camera optional, zero judgment.
            </p>
          </div>
        </div>

        {/* Card 3: Science-Backed Reset */}
        <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-indigo-100 shadow-[0_2px_12px_rgba(79,70,229,0.06)] hover:border-indigo-200 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 text-[18px]">
            ⚡
          </div>
          <div className="flex-1 text-left min-w-0">
            <h2 className="text-[14px] sm:text-[14.5px] font-bold text-[#1e1b4b] leading-snug">
              Dopamine &amp; Focus Rewire
            </h2>
            <p className="text-[12px] sm:text-[12.5px] text-[#4b5563] mt-0.5 leading-relaxed">
              Restore deep concentration, confidence, and energy in your daily routine.
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ACTIONS & SOCIAL PROOF ── */}
      <div className="w-full flex-shrink-0 flex flex-col items-center text-center pt-1 z-20">
        {/* Social Proof Text */}
        <div className="flex items-center justify-center gap-1 text-[11.5px] sm:text-[12px] font-semibold text-[#4338ca] mb-3">
          <span className="text-[#f59e0b]">★★★★★</span>
          <span>Trusted by 1,000+ men across India</span>
        </div>

        {/* Primary CTA Button */}
        <button
          type="button"
          onClick={handleContinueClick}
          id="plan-ready-continue-btn"
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#1a5bd9] text-white font-bold text-[16px] sm:text-[17px] tracking-wide shadow-lg shadow-[#1a5bd9]/30 hover:bg-[#154cb3] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>View My Session Plan</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
