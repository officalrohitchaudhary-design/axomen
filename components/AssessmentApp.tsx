"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  INITIAL_HELP_QUESTION,
  SECTION_1_QUESTIONS,
  SECTION_2_QUESTIONS,
  SECTION_3_QUESTIONS,
  AssessmentQuestion,
  AssessmentResultAnalysis,
  evaluateAssessmentResults,
} from "@/lib/assessmentData";

type LanguageMode = "both" | "en" | "hi";

export default function AssessmentApp() {
  const router = useRouter();

  // Screen State: "initial" (Q0) | "questions" (Q1..19) | "calculating" | "result"
  const [screen, setScreen] = useState<"initial" | "questions" | "calculating" | "result">("initial");

  // Language display preference: default is both (English + Hindi)
  const [langMode, setLangMode] = useState<LanguageMode>("both");

  // Initial question selections (multi-select)
  const [initialSelections, setInitialSelections] = useState<string[]>([]);

  // Active section determined from initial choices
  const [activeSectionId, setActiveSectionId] = useState<"s1" | "s2" | "s3">("s3");

  // Current question index in the active section (0 to 18)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Stored answers: { [questionId: number]: optionId }
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Flag to prevent double-tapping during auto-advance
  const [isAdvancing, setIsAdvancing] = useState<boolean>(false);

  // Computed results
  const [analysis, setAnalysis] = useState<AssessmentResultAnalysis | null>(null);

  // Card slide animation state
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Scroll to top of card on question change
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentIndex, screen]);

  // Determine active question set
  const activeQuestions: AssessmentQuestion[] =
    activeSectionId === "s1"
      ? SECTION_1_QUESTIONS
      : activeSectionId === "s2"
      ? SECTION_2_QUESTIONS
      : SECTION_3_QUESTIONS;

  const currentQ: AssessmentQuestion = activeQuestions[currentIndex] || activeQuestions[0];
  const totalQuestions = activeQuestions.length; // 19

  // ── Initial Question Logic ──────────────────────────────────────────────────
  const toggleInitialSelection = (id: string) => {
    if (id === "both") {
      setInitialSelections(["both", "porn", "masturbation"]);
      return;
    }
    if (id === "not_sure") {
      setInitialSelections(["not_sure"]);
      return;
    }

    setInitialSelections((prev) => {
      let next = prev.filter((item) => item !== "not_sure");
      if (next.includes(id)) {
        next = next.filter((item) => item !== id && item !== "both");
      } else {
        next = [...next, id];
      }

      if (next.includes("porn") && next.includes("masturbation")) {
        if (!next.includes("both")) next.push("both");
      }
      return next;
    });
  };

  const startAssessment = () => {
    if (initialSelections.length === 0) return;

    // Branching rules:
    // If "both" or both porn+masturbation or "not_sure" -> Section 3 (Porn + Masturbation)
    // If only porn -> Section 1
    // If only masturbation -> Section 2
    let section: "s1" | "s2" | "s3" = "s3";
    if (initialSelections.includes("both") || (initialSelections.includes("porn") && initialSelections.includes("masturbation"))) {
      section = "s3";
    } else if (initialSelections.includes("not_sure")) {
      section = "s3";
    } else if (initialSelections.includes("porn")) {
      section = "s1";
    } else if (initialSelections.includes("masturbation")) {
      section = "s2";
    }

    setActiveSectionId(section);
    setCurrentIndex(0);
    setAnswers({});
    setScreen("questions");
    setSlideDirection("forward");
  };

  // ── Single Option Selection with Auto-Advance ──────────────────────────────
  const handleSelectOption = (optionId: string) => {
    if (isAdvancing) return;

    // Record answer
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));

    setIsAdvancing(true);

    // Auto-advance after 300ms smooth visual feedback
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setSlideDirection("forward");
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200);
        setCurrentIndex((prev) => prev + 1);
        setIsAdvancing(false);
      } else {
        // Last question answered -> transition to calculation
        finishAssessment({
          ...answers,
          [currentQ.id]: optionId,
        });
      }
    }, 320);
  };

  // ── Back Navigation ─────────────────────────────────────────────────────────
  const handleGoBack = () => {
    if (isAdvancing) return;

    if (screen === "result") {
      setScreen("questions");
      setCurrentIndex(totalQuestions - 1);
      return;
    }

    if (screen === "questions") {
      if (currentIndex > 0) {
        setSlideDirection("backward");
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200);
        setCurrentIndex((prev) => prev - 1);
      } else {
        // First question of section -> back to initial selection
        setScreen("initial");
      }
      return;
    }

    if (screen === "initial") {
      router.push("/");
    }
  };

  // ── Assessment Completion ───────────────────────────────────────────────────
  const finishAssessment = (finalAnswers: Record<number, string>) => {
    setScreen("calculating");
    const evaluated = evaluateAssessmentResults(activeSectionId, finalAnswers);
    setAnalysis(evaluated);

    // Smooth 1s calculating animation for premium clinical feel
    setTimeout(() => {
      setScreen("result");
      setIsAdvancing(false);
    }, 1100);
  };

  // Restart assessment
  const handleRestart = () => {
    setScreen("initial");
    setInitialSelections([]);
    setAnswers({});
    setCurrentIndex(0);
    setAnalysis(null);
    setIsAdvancing(false);
  };

  // Progress percentage
  const progressPercent =
    screen === "initial"
      ? 5
      : screen === "result"
      ? 100
      : Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Category title display helper
  const sectionBadgeEn =
    activeSectionId === "s1"
      ? "Porn Assessment"
      : activeSectionId === "s2"
      ? "Masturbation Assessment"
      : "Porn & Masturbation Dual Assessment";

  const sectionBadgeHi =
    activeSectionId === "s1"
      ? "पोर्न मूल्यांकन"
      : activeSectionId === "s2"
      ? "हस्तमैथुन मूल्यांकन"
      : "पोर्न व हस्तमैथुन संयुक्त मूल्यांकन";

  return (
    <div className="min-h-screen bg-slate-100 sm:py-8 sm:px-4 flex items-center justify-center font-sans antialiased selection:bg-[#134fc1] selection:text-white">
      {/* Mobile App Canvas Container */}
      <div
        ref={cardRef}
        className="w-full max-w-md sm:max-w-lg min-h-screen sm:min-h-[720px] bg-white sm:rounded-[36px] sm:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] border-0 sm:border border-slate-200/80 flex flex-col justify-between overflow-hidden relative"
      >
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="flex items-center justify-between gap-3">
            {/* Back Button */}
            <button
              onClick={handleGoBack}
              disabled={isAdvancing}
              aria-label="Go to previous question"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 transition-all cursor-pointer disabled:opacity-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* App Center Brand / Category */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#134fc1]">
                AxoMen
              </span>
              <span className="text-[12px] font-semibold text-slate-500">
                {screen === "initial"
                  ? "Self-Assessment • आत्म-मूल्यांकन"
                  : screen === "questions"
                  ? `Question ${currentIndex + 1} of ${totalQuestions}`
                  : screen === "result"
                  ? "Assessment Result"
                  : "Analyzing..."}
              </span>
            </div>

            {/* Language Mode Toggle */}
            <div className="flex items-center bg-slate-100 rounded-full p-0.5 text-[11px] font-bold">
              <button
                onClick={() => setLangMode("both")}
                className={`px-2 py-1 rounded-full transition-all ${
                  langMode === "both" ? "bg-white text-[#134fc1] shadow-xs font-extrabold" : "text-slate-500 hover:text-slate-800"
                }`}
                title="English + Hindi"
              >
                EN+HI
              </button>
              <button
                onClick={() => setLangMode("en")}
                className={`px-2 py-1 rounded-full transition-all ${
                  langMode === "en" ? "bg-white text-[#134fc1] shadow-xs font-extrabold" : "text-slate-500 hover:text-slate-800"
                }`}
                title="English Only"
              >
                EN
              </button>
              <button
                onClick={() => setLangMode("hi")}
                className={`px-2 py-1 rounded-full transition-all ${
                  langMode === "hi" ? "bg-white text-[#134fc1] shadow-xs font-extrabold" : "text-slate-500 hover:text-slate-800"
                }`}
                title="हिन्दी Only"
              >
                हि
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#134fc1] to-[#27849d] h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </header>

        {/* ── Screen: Initial Help Question (Screen 0) ────────────────────────── */}
        {screen === "initial" && (
          <main className="flex-1 flex flex-col justify-between p-5 sm:p-7">
            <div className="space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#134fc1] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#134fc1] animate-pulse" />
                Step 1 of Assessment • चरण 1
              </div>

              {/* Question Title */}
              <div>
                {(langMode === "both" || langMode === "en") && (
                  <h1 className="text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {INITIAL_HELP_QUESTION.en}
                  </h1>
                )}
                {(langMode === "both" || langMode === "hi") && (
                  <p className="text-lg sm:text-xl font-bold text-slate-700 mt-1 leading-snug">
                    {INITIAL_HELP_QUESTION.hi}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
                  {langMode === "hi" ? INITIAL_HELP_QUESTION.subtitleHi : INITIAL_HELP_QUESTION.subtitleEn}
                </p>
              </div>

              {/* Multi-Select Options */}
              <div className="space-y-3 pt-2">
                {INITIAL_HELP_QUESTION.options.map((opt) => {
                  const isChecked = initialSelections.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleInitialSelection(opt.id)}
                      className={`group p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? "border-[#134fc1] bg-blue-50/70 shadow-xs ring-2 ring-[#134fc1]/20 scale-[1.01]"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Custom Checkbox */}
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? "bg-[#134fc1] border-[#134fc1] text-white"
                              : "border-slate-300 bg-white group-hover:border-slate-400"
                          }`}
                        >
                          {isChecked && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>

                        <div>
                          {(langMode === "both" || langMode === "en") && (
                            <div className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug">
                              {opt.en}
                            </div>
                          )}
                          {(langMode === "both" || langMode === "hi") && (
                            <div className="text-[13px] sm:text-[14px] font-semibold text-slate-600 mt-0.5 leading-snug">
                              {opt.hi}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-xs font-bold text-slate-400">
                        {isChecked ? (
                          <span className="text-[#134fc1] font-bold text-[11px] bg-white px-2 py-0.5 rounded-md shadow-xs">
                            Selected
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Helpful Clarification Note */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div className="space-y-0.5">
                  <span className="font-bold">You can select more than one option.</span>
                  <span className="block text-amber-800">
                    आप एक से अधिक विकल्प चुन सकते हैं। अगर दोनों समस्याएँ हैं तो दोनों चुनें।
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-6 pb-2">
              <button
                onClick={startAssessment}
                disabled={initialSelections.length === 0}
                className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  initialSelections.length > 0
                    ? "bg-[#134fc1] hover:bg-[#0e3b94] text-white active:scale-[0.98] shadow-blue-500/20"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>Continue Assessment • आगे बढ़ें</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </main>
        )}

        {/* ── Screen: Question Flow (1 Question Per Screen with Auto-Advance) ─── */}
        {screen === "questions" && (
          <main className="flex-1 flex flex-col justify-between p-5 sm:p-7">
            <div
              className={`space-y-4 transition-all duration-200 ${
                isAnimating
                  ? slideDirection === "forward"
                    ? "opacity-0 translate-x-3"
                    : "opacity-0 -translate-x-3"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {/* Category & Section Tag */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#134fc1] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#134fc1]" />
                  {langMode === "hi" ? sectionBadgeHi : sectionBadgeEn}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {currentQ.id} / {totalQuestions}
                </span>
              </div>

              {/* Question Text */}
              <div className="pt-1">
                {(langMode === "both" || langMode === "en") && (
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {currentQ.en}
                  </h2>
                )}
                {(langMode === "both" || langMode === "hi") && (
                  <p className="text-base sm:text-lg font-bold text-slate-600 mt-1.5 leading-relaxed">
                    {currentQ.hi}
                  </p>
                )}
              </div>

              {/* Option List with Instant Tap Feedback & Auto-Next */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((option, idx) => {
                  const isSelected = answers[currentQ.id] === option.id;
                  const letter = String.fromCharCode(65 + idx); // A, B, C, D...

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={isAdvancing}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full group p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "border-[#134fc1] bg-blue-50/80 shadow-xs ring-2 ring-[#134fc1]/25 scale-[1.01]"
                          : "border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Option Letter Indicator */}
                        <div
                          className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#134fc1] text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                        >
                          {letter}
                        </div>

                        <div className="min-w-0">
                          {(langMode === "both" || langMode === "en") && (
                            <div className="text-[14.5px] sm:text-[15.5px] font-bold text-slate-900 leading-snug">
                              {option.en}
                            </div>
                          )}
                          {(langMode === "both" || langMode === "hi") && (
                            <div className="text-[13px] sm:text-[13.5px] font-semibold text-slate-600 mt-0.5 leading-snug">
                              {option.hi}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Checkmark or Selection Pill */}
                      <div className="shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-[#134fc1] bg-[#134fc1] text-white scale-100"
                              : "border-slate-200 bg-white opacity-40 group-hover:opacity-75"
                          }`}
                        >
                          {isSelected ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Subtle Navigation Hint */}
            <div className="pt-6 pb-2 flex items-center justify-between text-xs text-slate-600 font-semibold border-t border-slate-100 mt-4">
              <button
                onClick={handleGoBack}
                className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-bold transition-colors cursor-pointer py-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span>Previous • पिछला सवाल</span>
              </button>

              <span className="flex items-center gap-1 text-[11px] text-slate-600 font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Auto-advances on click • ऑटो नेक्स्ट
              </span>
            </div>
          </main>
        )}

        {/* ── Screen: Calculating Transition ─────────────────────────────────── */}
        {screen === "calculating" && (
          <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-[#134fc1] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#134fc1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
            </div>

            <div className="space-y-2 max-w-xs">
              <h3 className="text-xl font-extrabold text-slate-900">
                Evaluating Your Assessment...
              </h3>
              <p className="text-sm font-semibold text-slate-600">
                आपके उत्तरों का विश्लेषण किया जा रहा है...
              </p>
              <p className="text-xs text-slate-400">
                Measuring control patterns, triggers, and life impact without judgment.
              </p>
            </div>
          </main>
        )}

        {/* ── Screen: Multi-Dimensional Results Dashboard ─────────────────────── */}
        {screen === "result" && analysis && (
          <main className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* Header / Reassurance Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-[#134fc1] text-white space-y-2.5 shadow-lg shadow-blue-900/15">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-bold text-white tracking-wide">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Assessment Complete • मूल्यांकन पूर्ण
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                Your Recovery & Habit Profile
              </h2>
              <p className="text-sm text-blue-100 font-medium leading-relaxed">
                आपकी रिकवरी और आदत का व्यक्तिगत विश्लेषण।
              </p>

              <div className="pt-1 text-xs text-blue-200/90 border-t border-white/10 mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>Frequency alone is not the problem. Focus is on control & life impact.</span>
              </div>
            </div>

            {/* ── 4 Dedicated Assessment Insight Dimensions ── */}
            <div className="space-y-4">
              {/* 1. Control Difficulty (नियंत्रण में कठिनाई) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        Control Difficulty
                      </h4>
                      <p className="text-xs font-bold text-slate-500">
                        नियंत्रण में कठिनाई
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      analysis.controlDifficulty.level === "Significant"
                        ? "bg-rose-100 text-rose-800"
                        : analysis.controlDifficulty.level === "High"
                        ? "bg-amber-100 text-amber-800"
                        : analysis.controlDifficulty.level === "Moderate"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {analysis.controlDifficulty.level} • {analysis.controlDifficulty.levelHi}
                  </span>
                </div>

                {/* Score Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>Baseline Control</span>
                    <span>{analysis.controlDifficulty.score}% Index</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        analysis.controlDifficulty.score > 60
                          ? "bg-rose-500"
                          : analysis.controlDifficulty.score > 35
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.max(15, analysis.controlDifficulty.score)}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                  {langMode === "hi"
                    ? analysis.controlDifficulty.descHi
                    : analysis.controlDifficulty.descEn}
                </p>

                {/* Key Detected Signals */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Patterns Observed • मुख्य लक्षण
                  </span>
                  {analysis.controlDifficulty.keySignalsEn.map((sig, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                      <span className="text-[#134fc1] font-bold">•</span>
                      <span>
                        {langMode === "hi"
                          ? analysis.controlDifficulty.keySignalsHi[i] || sig
                          : sig}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Habit Pattern (आदत का पैटर्न) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        Habit Pattern
                      </h4>
                      <p className="text-xs font-bold text-slate-500">
                        आदत का पैटर्न
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-800 text-right">
                    {langMode === "hi"
                      ? analysis.habitPattern.patternTypeHi
                      : analysis.habitPattern.patternTypeEn}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Primary Trigger • मुख्य ट्रिगर
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {langMode === "hi"
                        ? analysis.habitPattern.primaryTriggerHi
                        : analysis.habitPattern.primaryTriggerEn}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Routine Context • समय व स्थान
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {langMode === "hi"
                        ? analysis.habitPattern.routineContextHi
                        : analysis.habitPattern.routineContextEn}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                  {langMode === "hi"
                    ? analysis.habitPattern.analysisHi
                    : analysis.habitPattern.analysisEn}
                </p>
              </div>

              {/* 3. Life Impact (जीवन पर प्रभाव) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        Life Impact
                      </h4>
                      <p className="text-xs font-bold text-slate-500">
                        जीवन पर प्रभाव
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      analysis.lifeImpact.severity === "Severe"
                        ? "bg-rose-100 text-rose-800"
                        : analysis.lifeImpact.severity === "Substantial"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {analysis.lifeImpact.severity} • {analysis.lifeImpact.severityHi}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-amber-800 font-bold">Emotional Toll • भावनात्मक असर:</span>
                    <span className="text-amber-900 font-extrabold">
                      {langMode === "hi" ? analysis.lifeImpact.emotionalTollHi : analysis.lifeImpact.emotionalTollEn}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                  {langMode === "hi"
                    ? analysis.lifeImpact.analysisHi
                    : analysis.lifeImpact.analysisEn}
                </p>
              </div>

              {/* 4. User's Main Concern (उपयोगकर्ता की मुख्य समस्या) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border-2 border-[#134fc1]/30 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#134fc1] text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      Your Priority Focus
                    </h4>
                    <p className="text-xs font-bold text-slate-500">
                      उपयोगकर्ता की मुख्य समस्या व लक्ष्य
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-blue-100 shadow-xs">
                  <span className="text-[10px] font-bold text-[#134fc1] uppercase tracking-wider block">
                    What You Want To Change First • आपकी प्राथमिकता:
                  </span>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {langMode === "hi"
                      ? analysis.userMainConcern.chosenGoalHi
                      : analysis.userMainConcern.chosenGoalEn}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-slate-700">
                  <span className="font-bold text-[#134fc1] block">
                    Recommended Science-Backed Step:
                  </span>
                  <p className="font-medium leading-relaxed">
                    {langMode === "hi"
                      ? analysis.userMainConcern.recommendedFirstStepHi
                      : analysis.userMainConcern.recommendedFirstStepEn}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Action CTAs: Booking & Free Resources ── */}
            <div className="pt-2 space-y-3">
              <Link
                href="/session"
                className="w-full py-4 px-6 rounded-2xl bg-[#0a3528] hover:bg-[#06231a] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-center"
              >
                <span>Book a 1-on-1 Confidential Recovery Session</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/exercises"
                  className="py-3 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                  </svg>
                  <span>Free Exercises</span>
                </Link>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="py-3 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span>Retake Test</span>
                </button>
              </div>
            </div>

            {/* Confidentiality Footer */}
            <div className="pt-2 text-center text-[11px] text-slate-400 space-y-0.5 pb-4">
              <p>100% Anonymous & Private • Your responses are not shared with anyone.</p>
              <p>AxoMen — Men&apos;s sexual health & habit recovery platform</p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
