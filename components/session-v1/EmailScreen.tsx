"use client";

import { useState } from "react";
import { playZenTone } from "./audio";

interface EmailScreenProps {
  onSubmit: (email: string) => void;
  onBack: () => void;
  initialValue?: string;
}

export default function EmailScreen({ onSubmit, onBack, initialValue = "" }: EmailScreenProps) {
  const [email, setEmail] = useState(initialValue);
  const [error, setError] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    playZenTone();
    onSubmit(trimmed);
  };

  return (
    <div className="flex flex-col justify-between h-full w-full select-none animate-fadeIn px-6 pt-6 sm:pt-8 pb-6 overflow-hidden bg-[#f7f5ff]">
      {/* ── HIDDEN BACK BUTTON ── */}
      <button
        type="button"
        onClick={onBack}
        aria-hidden="true"
        className="hidden"
      />

      {/* ── HEADER & INPUT (matching reference UI) ── */}
      <div className="w-full flex-1 flex flex-col justify-center max-w-[340px] mx-auto px-1">
        <h1 className="text-[23px] sm:text-[26px] font-bold text-[#261C93] tracking-tight leading-[1.25]">
          Let&apos;s save your progress
        </h1>
        <p className="mt-2 text-[15px] sm:text-[16px] font-semibold text-[#261C93] leading-snug">
          Please enter your email
        </p>

        {/* Input Field */}
        <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="E-mail"
            autoFocus
            className="w-full bg-transparent border-b-2 border-purple-200/80 focus:border-[#3425b8] py-2 px-1 text-[18px] sm:text-[19px] text-[#261C93] placeholder-[#261C93]/35 outline-none transition-all duration-200"
          />
          {error && (
            <p className="mt-2 text-xs font-medium text-red-500 animate-fadeIn">{error}</p>
          )}
        </form>
      </div>

      {/* ── ACTION BUTTON: Continue → ── */}
      <div className="w-full flex-shrink-0 flex flex-col items-center pb-3 md:pb-5 z-20">
        <button
          type="button"
          onClick={() => handleSubmit()}
          id="email-submit-btn"
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#3425b8] text-white font-semibold text-[16px] sm:text-[17px] tracking-wide shadow-lg shadow-[#3425b8]/25 hover:bg-[#2b1e9e] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
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
