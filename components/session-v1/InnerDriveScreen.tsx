"use client";

import { playZenTone } from "./audio";

interface InnerDriveScreenProps {
  onContinue: () => void;
  onBack?: () => void;
}

export default function InnerDriveScreen({
  onContinue,
  onBack,
}: InnerDriveScreenProps) {
  const handleContinueClick = () => {
    playZenTone();
    onContinue();
  };

  return (
    <div className="relative flex flex-col justify-between h-full w-full select-none animate-fadeIn overflow-hidden bg-[#211da3]">
      {/* ── FULL-BLEED BACKGROUND IMAGE: /image/email-replace-screen.jpg ── */}
      <img
        src="/image/email-replace-screen.jpg"
        alt="Find your inner drive"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none z-0"
        loading="eager"
      />

      {/* ── HIDDEN ACCESSIBILITY BACK BUTTON ── */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-hidden="true"
          className="hidden"
        />
      )}

      {/* Spacer pushing button down to the bottom area */}
      <div className="flex-1 pointer-events-none" />

      {/* ── BOTTOM ACTION BUTTON (#ff9a0d, white text, Continue) ── */}
      <div className="w-full flex flex-col items-center justify-end px-6 pb-6 sm:pb-8 pt-2 z-20 text-center">
        <button
          type="button"
          onClick={handleContinueClick}
          id="inner-drive-continue-btn"
          className="w-full max-w-[280px] sm:max-w-[300px] py-3.5 sm:py-4 px-6 rounded-2xl bg-[#ff9a0d] text-white font-bold text-[16px] sm:text-[17px] tracking-wide shadow-lg shadow-[#ff9a0d]/35 hover:bg-[#e88900] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
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
