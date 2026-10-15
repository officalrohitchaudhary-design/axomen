"use client";

import { playZenTone } from "./audio";

interface DontWorryScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function DontWorryScreen({ onContinue, onBack }: DontWorryScreenProps) {
  const handleContinueClick = () => {
    playZenTone();
    onContinue();
  };

  return (
    <div className="flex flex-col justify-between h-full w-full select-none animate-fadeIn px-6 pt-7 sm:pt-9 pb-6 overflow-hidden bg-[#d7e0ff]">
      {/* ── HIDDEN BACK BUTTON ── */}
      <button
        type="button"
        onClick={onBack}
        aria-hidden="true"
        className="hidden"
      />

      {/* ── HEADER: TITLE ── */}
      <div className="w-full flex flex-col items-center text-center flex-shrink-0 mt-0">
        <h1 className="text-[26px] sm:text-[29px] font-bold text-[#000000] tracking-tight leading-tight">
          Don&apos;t worry
        </h1>
      </div>

      {/* ── CENTER ILLUSTRATION (dont-worry.png) ──
          Proportionally fits inside flex-1 min-h-0 so it NEVER causes scroll on any screen
      ── */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center py-2 sm:py-4 overflow-hidden relative">
        <div className="relative w-full h-full max-h-[360px] sm:max-h-[400px] flex items-center justify-center">
          <img
            src="/image/dont-worry.png"
            alt="Don't worry"
            className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none transition-transform duration-300 drop-shadow-sm"
            loading="eager"
          />
        </div>
      </div>

      {/* ── BOTTOM TEXT & ACTION BUTTON ── */}
      <div className="w-full flex-shrink-0 flex flex-col items-center text-center pb-3 md:pb-5 z-20">
        <p className="text-[15.5px] sm:text-[17px] font-semibold text-[#000000] leading-snug max-w-[340px] text-center mb-5 sm:mb-6">
          Having a brain that works differently can feel like having too many programs running on your computer.
        </p>

        <button
          type="button"
          onClick={handleContinueClick}
          id="dont-worry-continue-btn"
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#1a5bd9] text-white font-semibold text-[16px] sm:text-[17px] tracking-wide shadow-lg shadow-[#1a5bd9]/30 hover:bg-[#154cb3] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Continue</span>
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
