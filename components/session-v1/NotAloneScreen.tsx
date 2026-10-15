"use client";

import { playZenTone } from "./audio";

interface NotAloneScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function NotAloneScreen({ onContinue, onBack }: NotAloneScreenProps) {
  const handleContinueClick = () => {
    playZenTone();
    onContinue();
  };

  return (
    <div className="flex flex-col justify-between h-full w-full select-none animate-fadeIn px-6 pt-7 sm:pt-9 pb-6 overflow-hidden bg-[#f7f5ff]">
      {/* ── HIDDEN BACK BUTTON ── */}
      <button
        type="button"
        onClick={onBack}
        aria-hidden="true"
        className="hidden"
      />

      {/* ── HEADER: TITLE ── */}
      <div className="w-full flex flex-col items-center text-center flex-shrink-0 mt-0">
        <h1 className="text-[26px] sm:text-[30px] font-bold text-[#261C93] tracking-tight leading-tight">
          You are not alone
        </h1>
      </div>

      {/* ── CENTER GRAPHIC (not-alone.png) ──
          Positioned absolute-center inside an overflow-hidden wrapper so the 517px artwork
          fills 270px-310px clearly instead of shrinking to 130px.
      ── */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center py-1 sm:py-2 overflow-hidden relative">
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src="/image/not-alone.png"
            alt="You are not alone"
            className="absolute w-[390px] sm:w-[440px] max-w-none h-auto object-contain left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none drop-shadow-sm transition-transform duration-300"
            loading="eager"
          />
        </div>
      </div>

      {/* ── BOTTOM TEXT & ACTION BUTTON ── */}
      <div className="w-full flex-shrink-0 flex flex-col items-center text-center pb-3 md:pb-5 z-20">
        <p className="text-[15px] sm:text-[16.5px] font-semibold text-[#261C93] leading-snug max-w-[340px] text-center mb-4 sm:mb-5">
          AxoMen has guided 1K+ men toward a healthier relationship with porn and masturbation through simple behavioral techniques.
        </p>

        <button
          type="button"
          onClick={handleContinueClick}
          id="not-alone-continue-btn"
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#3425B8] text-white font-semibold text-[16px] sm:text-[17px] tracking-wide shadow-lg shadow-[#3425B8]/25 hover:bg-[#2a1d9b] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
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
