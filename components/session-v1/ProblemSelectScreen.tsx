"use client";

import { ProblemType } from "./types";
import { playZenTone } from "./audio";

interface ProblemSelectScreenProps {
  onSelect: (type: ProblemType) => void;
  onBack: () => void;
  selectedProblem?: ProblemType | null;
}

export default function ProblemSelectScreen({
  onSelect,
  onBack,
  selectedProblem,
}: ProblemSelectScreenProps) {
  const options: { id: ProblemType; label: string }[] = [
    { id: "porn", label: "Porn addiction" },
    { id: "masturbation", label: "Masturbation addiction" },
    { id: "both", label: "Both problem I have" },
  ];

  const handleOptionClick = (id: ProblemType) => {
    playZenTone();
    onSelect(id);
  };

  return (
    <div className="flex flex-col justify-start h-full w-full select-none px-5 sm:px-6 pb-6 overflow-hidden bg-[#f7f7fc]">
      {/* ── HIDDEN BACK BUTTON ── */}
      <button
        type="button"
        onClick={onBack}
        aria-hidden="true"
        className="hidden"
      />

      {/* ── TOP HEADER: Centered AxoMen Logo (Stationary) ── */}
      <div className="w-full flex items-center justify-center pt-3.5 sm:pt-4 flex-shrink-0">
        <img
          src="/image/new-logo.png"
          alt="AxoMen"
          className="h-8 sm:h-9 w-auto object-contain select-none"
          loading="eager"
        />
      </div>

      {/* ── SLEEK LINEAR PROGRESS BAR (Stationary) ── */}
      <div className="w-full mt-3.5 sm:mt-4 flex-shrink-0">
        <div className="w-full h-[3px] bg-[#ebebf6] rounded-full overflow-hidden">
          <div className="h-full bg-[#18aee2] rounded-full w-[15%]" />
        </div>
      </div>

      {/* ── CONTENT CONTAINER (Smooth animated entrance) ── */}
      <div className="w-full flex flex-col flex-1 min-h-0 animate-questionEnter">
        {/* ── HEADER: TITLE & SUBHEADING (Left-aligned, Bold Black) ── */}
        <div className="w-full flex flex-col items-start text-left flex-shrink-0 mt-7 sm:mt-9 mb-5 sm:mb-6 px-1">
          <h1 className="text-[20px] font-extrabold text-[#000000] tracking-tight leading-[1.3]">
            Which problem you face?
          </h1>
          <p className="mt-1.5 text-[14px] sm:text-[15px] font-medium text-gray-500 leading-snug">
            Choose any one
          </p>
        </div>

        {/* ── OPTIONS LIST (Crisp White Cards on #f7f7fc canvas) ── */}
        <div className="w-full flex flex-col gap-3 sm:gap-3.5">
          {options.map((opt) => {
            const isSelected = selectedProblem === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleOptionClick(opt.id)}
                className={`w-full h-[64px] sm:h-[70px] px-6 rounded-[20px] bg-white text-left transition-all duration-150 cursor-pointer flex items-center justify-between border shadow-[0_2px_8px_rgba(0,0,0,0.025)] ${
                  isSelected
                    ? "border-[#18aee2] bg-[#f0f9fd] shadow-[0_4px_14px_rgba(24,174,226,0.18)]"
                    : "border-black/[0.06] hover:border-[#18aee2]/40 hover:shadow-[0_4px_12px_rgba(24,174,226,0.08)] active:scale-[0.985]"
                }`}
              >
                <span className="text-[15px] font-bold text-[#000000] tracking-tight">
                  {opt.label}
                </span>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#18aee2] mr-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
