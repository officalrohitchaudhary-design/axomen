"use client";

import { useRouter } from "next/navigation";
import { playZenTone } from "./audio";

interface SuccessScreenProps {
  email?: string;
  name?: string;
  userInitial?: string;
  onHome?: () => void;
}

export default function SuccessScreen({
  email = "",
  name = "",
  userInitial = "R",
  onHome,
}: SuccessScreenProps) {
  const router = useRouter();

  const handleGoHome = () => {
    playZenTone();
    if (onHome) {
      onHome();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="relative flex flex-col justify-between h-full w-full select-none animate-fadeIn overflow-hidden bg-white">
      {/* ── BACKGROUND IMAGE: success-screen.png (Strictly using public/image/success-screen.png) ── */}
      <img
        src="/image/success-screen.png"
        alt="Success background"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none z-0"
        loading="eager"
      />

      {/* ── TOP HEADER (Logo + User Profile) ── */}
      <div className="w-full flex items-center justify-between px-6 pt-4 sm:pt-5 flex-shrink-0 z-20">
        {/* Left: AxoMen Logo */}
        <img
          src="/image/new-logo.png"
          alt="AxoMen"
          className="h-7 sm:h-8 w-auto object-contain select-none"
          loading="eager"
        />

        {/* Right: User Initial + Avatar */}
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-bold text-[#1e1e24]">{userInitial}</span>
          <div className="w-6 h-6 rounded-full bg-[#8292a4] flex items-center justify-center text-white shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Spacer to push content down into the dark dome area */}
      <div className="flex-1 min-h-[48%] pointer-events-none" />

      {/* ── BOTTOM DOME CONTENT (Positioned over the dark blue/purple planet dome) ── */}
      <div className="w-full flex flex-col items-center justify-end px-6 pb-7 sm:pb-8 pt-2 z-20 text-center">
        {/* Success Check Badge */}
        {/* <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg mb-2">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div> */}

        {/* Top: Booking Confirmed */}
        <p className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-white/90 mb-1 drop-shadow-sm">
          Booking Confirmed
        </p>

        {/* Title: Thanks for trusting us */}
        <h1 className="text-[23px] sm:text-[26px] font-black text-white tracking-tight leading-tight mb-2 drop-shadow-sm">
          Thanks for trusting us{name ? `, ${name}` : ""}
        </h1>

        {/* Subtitle: Meeting link sent 10 minutes before on WhatsApp */}
        <p className="text-[13.5px] sm:text-[14.5px] font-medium text-white/90 leading-snug max-w-[320px] mb-3 drop-shadow-sm">
          Meeting link will be sent 10 minutes before on WhatsApp.
        </p>

        {/* Optional Email Pill */}
        {email && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-[12px] sm:text-[12.5px] font-medium backdrop-blur-sm mb-4 max-w-[280px] truncate">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 opacity-80"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="truncate">{email}</span>
          </div>
        )}

        {/* Action Button: Go to Homepage */}
        <div className="w-full flex items-center justify-center mt-1">
          <button
            type="button"
            onClick={handleGoHome}
            id="success-home-btn"
            className="w-full max-w-[250px] py-3.5 px-6 rounded-2xl bg-white text-[#2a2099] font-extrabold text-[15px] sm:text-[16px] tracking-wide shadow-xl shadow-black/20 hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
