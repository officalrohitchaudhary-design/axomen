"use client";

import { playZenTone } from "./audio";

interface SplashScreenProps {
  onContinue: () => void;
}

export default function SplashScreen({ onContinue }: SplashScreenProps) {
  const handleContinueClick = () => {
    playZenTone();
    onContinue();
  };

  return (
    <div className="relative w-full h-full bg-[#f7f5ff] select-none animate-fadeIn overflow-hidden flex flex-col justify-between">
      {/* ── TOP GRAPHIC AREA (screen-one.png) ──
          w-full and h-auto ensures 100% of the artwork width is perfectly visible with zero side clipping
      ── */}
      <img
        src="/image/screen-one.png"
        alt="The Science of a Better You"
        className="absolute top-0 left-0 w-full h-auto object-contain select-none pointer-events-none"
        loading="eager"
      />

      {/* Spacer to push content down into the bottom area */}
      <div className="flex-1 pointer-events-none" />

      {/* ── BOTTOM TEXT & ACTION BUTTON (Positioned over the bottom empty area of screen-one.png) ── */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-6 pb-6 sm:pb-8 flex-shrink-0">
        {/* Main heading */}
        <h1 className="text-[21px] sm:text-[23px] font-bold text-[#000000] tracking-tight leading-snug">
          Join 1k+ over india people
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-[13.5px] sm:text-[14.5px] font-medium text-[#222222] leading-relaxed max-w-[310px]">
          Who transformed their lives using science-backed behavior change techniques
        </p>

        {/* Primary Action Button (no arrow) */}
        <button
          type="button"
          onClick={handleContinueClick}
          id="continue-button"
          className="mt-4 sm:mt-5 w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#1a5bd9] text-white font-semibold text-[16px] sm:text-[17px] tracking-wide shadow-lg shadow-[#1a5bd9]/30 hover:bg-[#154cb3] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
