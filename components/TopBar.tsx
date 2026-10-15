"use client";

import Link from "next/link";

interface TopBarProps {
  onOpenSearch?: () => void;
}

export default function TopBar({ onOpenSearch }: TopBarProps) {
  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-search"));
    }
  };

  return (
    <div className="bg-[#242424] text-white border-b border-white/[0.08]">
      <div className="w-[92%] max-w-[1400px] mx-auto flex items-center justify-between h-[38px] sm:h-[42px]">
        {/* Left: Book a first free session link */}
        <Link
          href="/booking"
          className="group inline-flex items-center text-[11.5px] sm:text-[13px] text-white hover:text-white transition-opacity shrink-0"
        >
          <span className="text-white/85 font-normal hidden sm:inline mr-1.5">
            Need guidance?
          </span>
          <span className="text-[#5ce1b6] font-semibold group-hover:text-[#84f9d4] transition-colors underline-offset-4 group-hover:underline inline-flex items-center gap-1">
            <span>Book a free first private session</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
            >
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" />
            </svg>
          </span>
        </Link>

        {/* Right: Search icon with sparkle in rounded box */}
        <button
          type="button"
          onClick={handleSearchClick}
          aria-label="Search"
          className="w-[30px] h-[26px] sm:w-[34px] sm:h-[30px] border border-white/60 hover:border-white rounded-[4px] flex items-center justify-center bg-transparent hover:bg-white/10 transition-colors text-white cursor-pointer shrink-0"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-[17px] sm:h-[17px]"
          >
            {/* Search lens */}
            <circle cx="10" cy="10" r="6" />
            <line x1="14.5" y1="14.5" x2="20" y2="20" strokeWidth="2.5" />
            {/* Sparkle at upper-right */}
            <path
              d="M17.5 3L18 4.8L19.8 5.3L18 5.8L17.5 7.6L17 5.8L15.2 5.3L17 4.8Z"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
