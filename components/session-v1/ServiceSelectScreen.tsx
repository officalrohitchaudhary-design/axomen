"use client";

import { ServiceType } from "./types";
import { playZenTone } from "./audio";

interface ServiceSelectScreenProps {
  onSelect: (type: ServiceType) => void;
  onBack: () => void;
}

export default function ServiceSelectScreen({ onSelect, onBack }: ServiceSelectScreenProps) {
  const handleCardClick = (type: ServiceType) => {
    playZenTone();
    onSelect(type);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full select-none animate-fadeIn px-5 py-4 overflow-hidden gap-4 sm:gap-5">
      {/* ── HIDDEN BACK BUTTON ── */}
      <button
        type="button"
        onClick={onBack}
        aria-hidden="true"
        className="hidden"
      />

      {/* ── HEADER: TITLE & SUBHEADING (Centered with controlled margins matching reference UI) ── */}
      <div className="w-full flex flex-col items-center text-center px-2 flex-shrink-0">
        <h1 className="text-[23px] sm:text-[27px] font-bold text-[#000000] tracking-tight leading-[1.2] max-w-[320px]">
          What type of service are you looking?
        </h1>
        <p className="mt-2 mb-6 text-[16px] sm:text-[14px] font-normal text-black leading-snug max-w-[290px]">
          Personalized porn recovery guidance and habit insights for a healthier life.
        </p>
      </div>

      {/* ── SERVICE CARDS (Centered grouping, balanced gaps) ── */}
      <div className="w-full flex flex-col items-center justify-center gap-3 sm:gap-3.5 max-w-[330px] flex-shrink-0">
        {/* Row 1: Individual & Teen */}
        <div className="flex items-center justify-center gap-3 sm:gap-3.5 w-full">
          {/* Card 1: Individual */}
          <button
            type="button"
            onClick={() => handleCardClick("individual")}
            className="flex-1 max-w-[155px] h-[145px] sm:h-[155px] bg-white rounded-[26px] sm:rounded-[28px] overflow-hidden flex flex-col justify-between shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(24,174,226,0.22)] hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-200 cursor-pointer group border border-gray-100 hover:border-[#18aee2]/50 text-left"
          >
            {/* Top Photo Area */}
            <div className="w-full flex-1 relative flex items-end justify-center pt-2 px-1 overflow-hidden bg-white">
              {/* For 18+ tag */}
              <span className="absolute top-2 right-2.5 text-[9.5px] sm:text-[10px] font-bold text-black bg-[#e9e315] px-1.5 py-0.5 rounded-full border border-[#d5cf0c] tracking-tight">
                For 18+
              </span>
              <img
                src="/image/service-single.png"
                alt="Individual recovery service"
                className="w-full h-full max-h-[105px] object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>
            {/* Bottom Cyan Banner with White Text */}
            <div className="w-full bg-[#18aee2] group-hover:bg-[#149fcb] py-2 sm:py-2.5 text-center flex-shrink-0 transition-colors duration-200">
              <span className="text-white font-semibold text-[15px] sm:text-[16px] tracking-wide">
                Individual
              </span>
            </div>
          </button>

          {/* Card 2: Teen */}
          <button
            type="button"
            onClick={() => handleCardClick("teen")}
            className="flex-1 max-w-[155px] h-[145px] sm:h-[155px] bg-white rounded-[26px] sm:rounded-[28px] overflow-hidden flex flex-col justify-between shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(24,174,226,0.22)] hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-200 cursor-pointer group border border-gray-100 hover:border-[#18aee2]/50 text-left"
          >
            {/* Top Photo Area */}
            <div className="w-full flex-1 relative flex items-end justify-center pt-2 px-1 overflow-hidden bg-white">
              <img
                src="/image/service-teen-card.png"
                alt="Teen recovery guidance"
                className="w-full h-full max-h-[105px] object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>
            {/* Bottom Cyan Banner with White Text */}
            <div className="w-full bg-[#18aee2] group-hover:bg-[#149fcb] py-2 sm:py-2.5 text-center flex-shrink-0 transition-colors duration-200">
              <span className="text-white font-semibold text-[15px] sm:text-[16px] tracking-wide">
                Teen
              </span>
            </div>
          </button>
        </div>

        {/* Row 2: Couples (Centered) */}
        <div className="flex items-center justify-center w-full">
          <button
            type="button"
            onClick={() => handleCardClick("couples")}
            className="w-full max-w-[155px] h-[145px] sm:h-[155px] bg-white rounded-[26px] sm:rounded-[28px] overflow-hidden flex flex-col justify-between shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(24,174,226,0.22)] hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-200 cursor-pointer group border border-gray-100 hover:border-[#18aee2]/50 text-left"
          >
            {/* Top Photo Area */}
            <div className="w-full flex-1 relative flex items-end justify-center pt-2 px-1 overflow-hidden bg-white">
              <img
                src="/image/service-couple.png"
                alt="Couples recovery support"
                className="w-full h-full max-h-[105px] object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>
            {/* Bottom Cyan Banner with White Text */}
            <div className="w-full bg-[#18aee2] group-hover:bg-[#149fcb] py-2 sm:py-2.5 text-center flex-shrink-0 transition-colors duration-200">
              <span className="text-white font-semibold text-[15px] sm:text-[16px] tracking-wide">
                Couples
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ── TERMS & PRIVACY CARD (Centered with balanced spacing below cards) ── */}
      <div className="w-full max-w-[330px] flex-shrink-0">
        <div className="w-full bg-white rounded-[18px] sm:rounded-[20px] px-4 py-3 sm:py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 text-center">
          <p className="text-[10.5px] sm:text-[11px] leading-[1.45] text-black font-normal">
            By continuing you agree with the{" "}
            <span className="text-[#18aee2] font-semibold">Terms of Use and Service</span>,{" "}
            <span className="text-[#18aee2] font-semibold">Privacy Policy</span>,{" "}
            <span className="text-[#18aee2] font-semibold">Subscription Policy</span> and{" "}
            <span className="text-[#18aee2] font-semibold">Cookie Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
