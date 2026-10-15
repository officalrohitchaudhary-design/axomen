"use client";

import { V1Question } from "./questionData";
import { playZenTone } from "./audio";

interface QuestionScreenProps {
  question: V1Question;
  onSelect: (option: string) => void;
  onBack: () => void;
  progressPercent?: number;
}

export default function QuestionScreen({
  question,
  onSelect,
  onBack,
  progressPercent = 35,
}: QuestionScreenProps) {
  const handleOptionClick = (option: string) => {
    playZenTone();
    onSelect(option);
  };

  // Clamp progress percentage between 12% and 95%
  const validProgress = Math.max(12, Math.min(95, progressPercent));

  return (
    <div className="flex flex-col justify-start h-full w-full select-none px-5 sm:px-6 pb-6 overflow-hidden bg-[#f6f5ff]">
      {/* ── HIDDEN BACK BUTTON (preserved in DOM) ── */}
      <button
        type="button"
        onClick={onBack}
        aria-hidden="true"
        className="hidden"
      />

      {/* ── TOP HEADER: Centered AxoMen Logo (Stationary, never moves) ── */}
      <div className="w-full flex items-center justify-center pt-3.5 sm:pt-4 flex-shrink-0">
        <img
          src="/image/new-logo.png"
          alt="AxoMen"
          className="h-8 sm:h-9 w-auto object-contain select-none"
          loading="eager"
        />
      </div>

      {/* ── SLEEK LINEAR PROGRESS BAR (Stationary position, smooth width transition) ── */}
      <div className="w-full mt-3.5 sm:mt-4 flex-shrink-0">
        <div className="w-full h-[3px] bg-[#ebebf6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#18aee2] rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${validProgress}%` }}
          />
        </div>
      </div>

      {/* ── QUESTION CONTENT CONTAINER (Animated smoothly on question change) ── */}
      <div
        key={question.id}
        className="w-full flex flex-col flex-1 min-h-0 animate-questionEnter"
      >
        {/* ── QUESTION TITLE (Left-Aligned, Bold Black, Fixed Consistent Footprint) ── */}
        <div className="w-full flex flex-col items-start justify-center text-left flex-shrink-0 mt-7 sm:mt-9 mb-5 sm:mb-6 px-1 min-h-[54px] sm:min-h-[58px]">
          <h1 className="text-[20px] font-extrabold text-[#111827] tracking-tight leading-[1.3]">
            {question.title}
          </h1>
        </div>

        {/* ── OPTIONS LIST (Equal, Consistent 62px-68px Height Across Every Single Question) ── */}
        <div className="w-full flex flex-col gap-3 sm:gap-3.5 flex-1 min-h-0 justify-start">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleOptionClick(opt)}
              className="w-full h-[62px] sm:h-[68px] px-6 bg-white text-[#1f242e] font-bold text-[15px] text-left transition-all duration-150 cursor-pointer flex items-center rounded-[18px] sm:rounded-[20px] border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.025)] hover:border-[#18aee2]/40 hover:shadow-[0_4px_12px_rgba(24,174,226,0.08)] active:scale-[0.985] active:bg-[#f0f9fd]"
            >
              <span className="tracking-tight leading-tight text-[15px]">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
