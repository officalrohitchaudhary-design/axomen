"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocale } from "next-intl";
import {
  INITIAL_HELP_QUESTION,
  SECTION_1_QUESTIONS,
  SECTION_2_QUESTIONS,
  SECTION_3_QUESTIONS,
  AssessmentQuestion,
} from "@/lib/assessmentData";

// ── Types ───────────────────────────────────────────────────────────────────
type SessionType = "individual" | "teen" | "couples";

interface FreeSessionFormValues {
  name: string;
  phone: string;
}

const freeSessionSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Please enter your name")
    .max(50, "Name is too long")
    .required("Please enter your name"),
  phone: Yup.string()
    .trim()
    .matches(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit mobile number"
    )
    .required("Mobile number is required"),
});

export default function SessionBookingPage() {
  const router = useRouter();

  // Multi-step state:
  // Step 1: Service Type (individual / teen / couples)
  // Step 2: Assessment Flow (Initial Q0 -> Active Section Questions)
  // Step 3: Free Session Request Form (Name, Mobile, Language - Formik & Yup)
  // Step 4: Submission Confirmation & Thank You Screen
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [sessionType, setSessionType] = useState<SessionType | null>(null);

  // Step 2 sub-state: "help_type" (Q0) | "questions" (Q1..N)
  const [assessmentSubStep, setAssessmentSubStep] = useState<"help_type" | "questions">("help_type");

  // Initial question selections (multi-select)
  const [initialHelpSelections, setInitialHelpSelections] = useState<string[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<"s1" | "s2" | "s3">("s3");

  // Question navigation
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [openNotes, setOpenNotes] = useState<Record<number, string>>({});
  const [isAdvancing, setIsAdvancing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Active locale from navbar / global context
  const locale = useLocale();
  const isHindi = locale === "hi";

  // Half-screen bottom sheet modal for Free Session Request
  const [isSheetMounted, setIsSheetMounted] = useState<boolean>(false);
  const [isSheetVisible, setIsSheetVisible] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const openSheet = () => {
    setIsSheetMounted(true);
    setTimeout(() => {
      setIsSheetVisible(true);
    }, 20);
  };

  const closeSheet = () => {
    setIsSheetVisible(false);
    setTimeout(() => {
      setIsSheetMounted(false);
    }, 380);
  };

  // Prevent background scroll when bottom sheet is open
  useEffect(() => {
    if (isSheetMounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSheetMounted]);

  // Card slide transition
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [slideDir, setSlideDir] = useState<"next" | "prev">("next");

  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top on question or step change
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentQIndex, assessmentSubStep, step]);

  // Load saved progress or query params from URL
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const serviceParam = params.get("service") as SessionType | null;

        if (serviceParam && ["individual", "teen", "couples"].includes(serviceParam)) {
          setSessionType(serviceParam);
        }
      }

      const saved = localStorage.getItem("hyi_session_flow_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sessionType && !sessionType) setSessionType(parsed.sessionType);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.openNotes) setOpenNotes(parsed.openNotes);
        if (parsed.initialHelpSelections) setInitialHelpSelections(parsed.initialHelpSelections);
        if (parsed.activeSectionId) setActiveSectionId(parsed.activeSectionId);
      }
    } catch {
      // Ignore local storage errors
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "hyi_session_flow_data",
        JSON.stringify({
          sessionType,
          answers,
          openNotes,
          initialHelpSelections,
          activeSectionId,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore
    }
  }, [sessionType, answers, openNotes, initialHelpSelections, activeSectionId]);

  // Formik Hook for Free Session Request Form
  const formik = useFormik<FreeSessionFormValues>({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: freeSessionSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        localStorage.setItem(
          "hyi_free_session_lead",
          JSON.stringify({
            ...values,
            sessionType: sessionType || "individual",
            activeSectionId,
            answers,
            openNotes,
            submittedAt: new Date().toISOString(),
          })
        );
      } catch {
        // ignore
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
      setIsSubmitting(false);
      setFormSubmitted(true);
    },
  });

  // Active question list
  const activeQuestions: AssessmentQuestion[] =
    activeSectionId === "s1"
      ? SECTION_1_QUESTIONS
      : activeSectionId === "s2"
      ? SECTION_2_QUESTIONS
      : SECTION_3_QUESTIONS;

  const currentQuestion = activeQuestions[currentQIndex] || activeQuestions[0];
  const totalQuestions = activeQuestions.length;

  // ── Step 1: Select Session Type ─────────────────────────────────────────────
  const handleSelectType = (type: SessionType) => {
    setSessionType(type);
    setStep(2);
    setAssessmentSubStep("help_type");
  };

  // ── Step 2: Initial Q0 Multi-Select ─────────────────────────────────────────
  const toggleInitialHelp = (id: string) => {
    if (id === "both") {
      setInitialHelpSelections(["both", "porn", "masturbation"]);
      return;
    }
    if (id === "not_sure") {
      setInitialHelpSelections(["not_sure"]);
      return;
    }

    setInitialHelpSelections((prev) => {
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

  const startQuestions = () => {
    if (initialHelpSelections.length === 0) return;

    let section: "s1" | "s2" | "s3" = "s3";
    if (
      initialHelpSelections.includes("both") ||
      (initialHelpSelections.includes("porn") && initialHelpSelections.includes("masturbation"))
    ) {
      section = "s3";
    } else if (initialHelpSelections.includes("not_sure")) {
      section = "s3";
    } else if (initialHelpSelections.includes("porn")) {
      section = "s1";
    } else if (initialHelpSelections.includes("masturbation")) {
      section = "s2";
    }

    setActiveSectionId(section);
    setCurrentQIndex(0);
    setAnswers({});
    setAssessmentSubStep("questions");
    setSlideDir("next");
  };

  // ── Step 2: Single-Option Select with Auto-Advance ─────────────────────────
  const handleOptionSelect = (optionId: string) => {
    if (isAdvancing) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: optionId,
    };
    setAnswers(updatedAnswers);
    setIsAdvancing(true);

    // Auto-advance after 300ms visual selection feedback
    setTimeout(() => {
      if (currentQIndex < totalQuestions - 1) {
        setSlideDir("next");
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200);
        setCurrentQIndex((prev) => prev + 1);
        setIsAdvancing(false);
      } else {
        // Last question completed -> Open bottom sheet popup
        setIsAdvancing(false);
        openSheet();
      }
    }, 320);
  };

  // ── Back Navigation ─────────────────────────────────────────────────────────
  const handleBack = () => {
    if (isAdvancing || isSubmitting) return;

    if (isSheetMounted) {
      closeSheet();
      return;
    }

    if (step === 2) {
      if (assessmentSubStep === "questions") {
        if (currentQIndex > 0) {
          setSlideDir("prev");
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 200);
          setCurrentQIndex((prev) => prev - 1);
        } else {
          setAssessmentSubStep("help_type");
        }
        return;
      }

      if (assessmentSubStep === "help_type") {
        setStep(1);
        return;
      }
    }

    if (step === 1) {
      router.push("/");
    }
  };

  // Skip assessment directly to Free Session Sheet
  const handleSkipAssessment = () => {
    openSheet();
  };

  // Progress Calculation
  const progressPercentage =
    step === 1
      ? 10
      : isSheetMounted
      ? 100
      : assessmentSubStep === "help_type"
      ? 15
      : Math.round(15 + ((currentQIndex + 1) / totalQuestions) * 75);

  return (
    <div className="min-h-screen bg-white flex flex-col antialiased selection:bg-[#f97316] selection:text-white">
      {/* ── FULL-WIDTH TOP HEADER (Matching Reference UI Style) ── */}
      <header className="w-full bg-white sticky top-0 z-30 border-b border-gray-100">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Left: Back Arrow (←) */}
          <div className="w-10 flex items-center justify-start">
            <button
              type="button"
              onClick={handleBack}
              disabled={isAdvancing || isSubmitting}
              className="w-10 h-10 -ml-2 flex items-center justify-center text-[#111827] hover:text-black active:scale-95 transition-all cursor-pointer disabled:opacity-40"
              aria-label="Back"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              aria-label="AxoMen Home"
            >
              <Image
                src="/image/axomen-logo.png"
                alt="AxoMen — Men's Sexual Health Platform"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Balanced Spacer */}
          <div className="w-10 flex items-center justify-end" />
        </div>

        {/* Full-Width Smooth Orange Progress Bar Directly Below Header */}
        <div className="w-full h-[3px] bg-[#f1f5f9] relative overflow-hidden">
          <div
            className="h-full bg-[#f97316] transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* ── SEAMLESS FULL-PAGE CONTENT (Clean mobile form width) ── */}
      <div
        ref={contentRef}
        className="flex-1 w-full max-w-[500px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-between"
      >
        {/* ── STEP 1: SERVICE SELECTION ── */}
        {step === 1 && (
          <main className="flex-1 flex flex-col justify-between py-2 sm:py-4">
            <div>
              <h1 className="text-2xl sm:text-[27px] font-black text-[#1a1a1a] text-center tracking-tight leading-[1.2] mb-[40px]">
                What type of service are you looking for?
              </h1>

              {/* Cards List */}
              <div className="space-y-3.5 px-[15px] sm:px-[30px]">
                {/* 1. Individual */}
                <button
                  type="button"
                  onClick={() => handleSelectType("individual")}
                  className="w-full text-left bg-[#e2f1ec] hover:bg-[#d6eae3] active:scale-[0.99] rounded-2xl p-5 flex items-center justify-between gap-4 transition-all duration-200 group border border-[#c4e5db] shadow-2xs cursor-pointer"
                >
                  <div className="min-w-0 pr-1">
                    <h2 className="text-[20px] font-black text-[#113f34] tracking-tight mb-1">
                      Individual
                    </h2>
                    <p className="text-[14px] font-medium text-[#000000] leading-snug">
                      Individualized support from a recovery educator for ages 18+
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#0f493b] flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform">
                    <svg role="img" aria-label="Imperfect circle with a chat icon" width="47" viewBox="0 0 47 47">
                      <title>Imperfect circle with a chat icon</title>
                      <defs>
                        <path d="M8.301 5.176c10.338-7.453 26-7.06 33.82 2.504 4.236 5.181 5.318 11.693 4.066 18.985-1.104 6.425-4.899 11.8-9.21 15.513-9.409 8.102-23.732 4.551-31.552-5.013-7.82-9.565-7.461-24.536 2.876-31.989z" id="a"></path>
                      </defs>
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-302 -334) translate(302 334)">
                          <mask fill="#fff"><use></use></mask>
                          <use fill="#005C65"></use>
                        </g>
                        <path d="M8.494 20.367a7.238 7.238 0 01-.28 2.692c-.183.61.02 1.27.516 1.679a1.646 1.646 0 001.77.202c1.62-.804 3.775-2.201 5.084-4.348h1.074c5.694 0 10.31-4.542 10.31-10.145 0-5.602-4.616-10.144-10.31-10.144h-6.002C5.382.303.959 4.22.404 9.38c-.555 5.16 2.937 9.9 8.094 10.987h-.004zm2.158-18.36h6.02c4.738 0 8.578 3.779 8.578 8.44 0 4.662-3.84 8.441-8.578 8.441h-1.58a.868.868 0 00-.765.457c-1.022 1.912-2.899 3.183-4.385 3.963.333-1.237.4-2.529.198-3.793a.86.86 0 00-.731-.715c-4.44-.65-7.62-4.56-7.293-8.964.327-4.406 4.05-7.818 8.54-7.826l-.004-.004z" transform="translate(-302 -334) translate(302 334) translate(9.724 10.805)" fill="#FFF" fillRule="nonzero" stroke="#FFF" strokeWidth="0.5"></path>
                      </g>
                    </svg>
                  </div>
                </button>

                {/* 2. Teen */}
                <button
                  type="button"
                  onClick={() => handleSelectType("teen")}
                  className="w-full text-left bg-[#f2f9cf] hover:bg-[#eaf3bf] active:scale-[0.99] rounded-2xl p-5 flex items-center justify-between gap-4 transition-all duration-200 group border border-[#e1ecab] shadow-2xs cursor-pointer"
                >
                  <div className="min-w-0 pr-1">
                    <h2 className="text-[20px] font-black text-[#2a380e] tracking-tight mb-1">
                      Teen
                    </h2>
                    <p className="text-[14px] font-medium text-[#000] leading-snug">
                      Specialized support designed for youth ages 13-17
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#748525] flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform">
                    <svg role="img" aria-label="Imperfect circle with a chat icon" width="47" viewBox="0 0 47 47">
                      <title>Imperfect circle with a chat icon</title>
                      <defs>
                        <path d="M8.301 5.176c10.338-7.453 26-7.06 33.82 2.504 4.236 5.181 5.318 11.693 4.066 18.985-1.104 6.425-4.899 11.8-9.21 15.513-9.409 8.102-23.732 4.551-31.552-5.013-7.82-9.565-7.461-24.536 2.876-31.989z" id="a"></path>
                      </defs>
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-302 -334) translate(302 334)">
                          <mask fill="#fff"><use></use></mask>
                          <use fill="#9FBC2A"></use>
                        </g>
                        <path d="M8.494 20.367a7.238 7.238 0 01-.28 2.692c-.183.61.02 1.27.516 1.679a1.646 1.646 0 001.77.202c1.62-.804 3.775-2.201 5.084-4.348h1.074c5.694 0 10.31-4.542 10.31-10.145 0-5.602-4.616-10.144-10.31-10.144h-6.002C5.382.303.959 4.22.404 9.38c-.555 5.16 2.937 9.9 8.094 10.987h-.004zm2.158-18.36h6.02c4.738 0 8.578 3.779 8.578 8.44 0 4.662-3.84 8.441-8.578 8.441h-1.58a.868.868 0 00-.765.457c-1.022 1.912-2.899 3.183-4.385 3.963.333-1.237.4-2.529.198-3.793a.86.86 0 00-.731-.715c-4.44-.65-7.62-4.56-7.293-8.964.327-4.406 4.05-7.818 8.54-7.826l-.004-.004z" transform="translate(-302 -334) translate(302 334) translate(9.724 10.805)" fill="#FFF" fillRule="nonzero" stroke="#FFF" strokeWidth="0.5"></path>
                      </g>
                    </svg>
                  </div>
                </button>

                {/* 3. Couples */}
                <button
                  type="button"
                  onClick={() => handleSelectType("couples")}
                  className="w-full text-left bg-[#dfe7f4] hover:bg-[#d2dceb] active:scale-[0.99] rounded-2xl p-5 flex items-center justify-between gap-4 transition-all duration-200 group border border-[#c9d6e9] shadow-2xs cursor-pointer"
                >
                  <div className="min-w-0 pr-1">
                    <h2 className="text-[20px] font-black text-[#1d3356] tracking-tight mb-1">
                      Couples
                    </h2>
                    <p className="text-[14px] font-medium text-[#000000] leading-snug">
                      Relationship support to improve connection with your partner
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#21396a] flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform">
                    <svg role="img" aria-label="Imperfect circle with two people" width="47" viewBox="0 0 47 47">
                      <title>Imperfect circle with two people</title>
                      <defs>
                        <path d="M8.301 5.176c10.338-7.453 26-7.06 33.82 2.504 4.236 5.181 5.318 11.693 4.066 18.985-1.104 6.425-4.899 11.8-9.21 15.513-9.409 8.102-23.732 4.551-31.552-5.013-7.82-9.565-7.461-24.536 2.876-31.989z" id="a"></path>
                      </defs>
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-302 -682) translate(302 682)">
                          <mask fill="#fff"><use></use></mask>
                          <use fill="#1F4B95"></use>
                        </g>
                        <g transform="translate(-302 -682) translate(312 695)" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1599999">
                          <path d="M16.062 18.264v-2.006c0-2.216-1.816-4.013-4.055-4.013H4.909c-2.24 0-4.055 1.797-4.055 4.013v2.006"></path>
                          <ellipse cx="8.45806746" cy="4.84278265" rx="4.05555267" ry="4.01259134"></ellipse>
                          <path d="M25.413 16.396v-1.59c0-1.759-1.453-3.183-3.245-3.183H16.49c-1.385 0-2.005.415-2.005 1.037"></path>
                          <ellipse cx="19.3292017" cy="5.25787831" rx="3.24444214" ry="3.18240003"></ellipse>
                        </g>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-6 pb-2 text-center">
              <p className="text-xs text-gray-500 font-medium">
                100% Confidential &amp; Anonymous. Your privacy is guaranteed.
              </p>
            </div>
          </main>
        )}

        {/* ── STEP 2: ASSESSMENT SUB-STEP 1 (Initial Question Q0) ── */}
        {step === 2 && assessmentSubStep === "help_type" && (
          <main className="flex-1 flex flex-col justify-between py-2 sm:py-4">
            <div className="space-y-6">
              {/* Centered Circle Avatar Placeholder (Filled with warm amber color, no image yet) */}
              <div className="flex justify-center pt-1 sm:pt-3">
                <div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#f4a824] shadow-sm flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                  aria-hidden="true"
                />
              </div>

              <div className="text-left">
                <h2 className="text-[22px] sm:text-[25px] font-bold text-[#111827] tracking-tight leading-[1.28]">
                  {isHindi ? INITIAL_HELP_QUESTION.hi : INITIAL_HELP_QUESTION.en}
                </h2>
                <p className="text-sm text-slate-500 mt-1.5">
                  {isHindi ? INITIAL_HELP_QUESTION.subtitleHi : INITIAL_HELP_QUESTION.subtitleEn}
                </p>
              </div>

              {/* Multi-Select Options with Clean Checkbox Style */}
              <div className="space-y-4 sm:space-y-5 text-left">
                {INITIAL_HELP_QUESTION.options.map((opt) => {
                  const isChecked = initialHelpSelections.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleInitialHelp(opt.id)}
                      className="w-full group flex items-center gap-4 py-2.5 px-2 -mx-2 rounded-xl text-left hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer select-none"
                    >
                      <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                          isChecked
                            ? "border-[#f97316] bg-[#f97316] text-white"
                            : "border-[#94a3b8] bg-white group-hover:border-[#64748b]"
                        }`}
                      >
                        {isChecked && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>

                      <span
                        className={`text-[17px] sm:text-[18px] leading-snug transition-colors ${
                          isChecked
                            ? "text-[#0f172a] font-semibold"
                            : "text-[#1e293b] font-normal group-hover:text-[#0f172a]"
                        }`}
                      >
                        {isHindi ? opt.hi : opt.en}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 space-y-3">
              <button
                type="button"
                onClick={startQuestions}
                disabled={initialHelpSelections.length === 0}
                className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  initialHelpSelections.length > 0
                    ? "bg-[#f97316] hover:bg-[#ea580c] text-white active:scale-[0.99]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>{isHindi ? "आगे बढ़ें" : "Continue"}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleSkipAssessment}
                className="w-full py-2 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors text-center cursor-pointer"
              >
                {isHindi ? "मूल्यांकन छोड़ें और निःशुल्क सत्र का अनुरोध करें →" : "Skip assessment & request free session →"}
              </button>
            </div>
          </main>
        )}

        {/* ── STEP 2: ASSESSMENT SUB-STEP 2 (Questions 1..N Matching Reference UI) ── */}
        {step === 2 && assessmentSubStep === "questions" && currentQuestion && (
          <main className="flex-1 flex flex-col justify-between py-2 sm:py-4">
            <div
              className={`space-y-6 transition-all duration-200 ${
                isAnimating
                  ? slideDir === "next"
                    ? "opacity-0 translate-x-2"
                    : "opacity-0 -translate-x-2"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {/* Centered Circle Avatar Placeholder (Warm Amber color fill, no image yet) */}
              <div className="flex justify-center pt-1 sm:pt-3">
                <div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#f4a824] shadow-sm flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                  aria-hidden="true"
                />
              </div>

              {/* Question Text (Bold, Left-Aligned, High Contrast) */}
              <div className="text-left">
                <h2 className="text-[22px] sm:text-[25px] font-bold text-[#111827] tracking-tight leading-[1.28]">
                  {isHindi ? currentQuestion.hi : currentQuestion.en}
                </h2>
              </div>

              {/* Single Choice Radio Options matching Reference UI */}
              <div className="space-y-4 sm:space-y-5 text-left">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAdvancing}
                      onClick={() => handleOptionSelect(opt.id)}
                      className="w-full group flex items-center gap-4 py-2.5 px-2 -mx-2 rounded-xl text-left hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer select-none"
                    >
                      {/* Radio Circle */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? "border-[#f97316] bg-white ring-2 ring-[#f97316]/20"
                            : "border-[#94a3b8] bg-white group-hover:border-[#64748b]"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-[#f97316] animate-in zoom-in-75 duration-150" />
                        )}
                      </div>

                      {/* Option Label */}
                      <span
                        className={`text-[17px] sm:text-[18px] leading-snug transition-colors ${
                          isSelected
                            ? "text-[#0f172a] font-semibold"
                            : "text-[#1e293b] font-normal group-hover:text-[#0f172a]"
                        }`}
                      >
                        {isHindi ? opt.hi : opt.en}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Optional Helper Note / Follow-up */}
              {(currentQuestion.followUpEn || currentQuestion.openAnswerEn) && (
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5 text-left">
                  <p className="font-semibold text-slate-700 leading-snug">
                    {isHindi
                      ? currentQuestion.followUpHi || currentQuestion.openAnswerHi
                      : currentQuestion.followUpEn || currentQuestion.openAnswerEn}
                  </p>
                  <input
                    type="text"
                    placeholder={isHindi ? "यहाँ लिखें (वैकल्पिक)..." : "Type your answer (optional)..."}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#f97316] text-slate-800"
                    value={openNotes[currentQuestion.id] || ""}
                    onChange={(e) => setOpenNotes({ ...openNotes, [currentQuestion.id]: e.target.value })}
                  />
                </div>
              )}
            </div>

            {/* Bottom Actions: Clean Skip Link (No Language Toggle, No Category Title) */}
            <div className="pt-8 text-center">
              <button
                type="button"
                onClick={handleSkipAssessment}
                className="py-1 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors text-center cursor-pointer"
              >
                {isHindi ? "मूल्यांकन छोड़ें और निःशुल्क सत्र का अनुरोध करें →" : "Skip assessment & request free session →"}
              </button>
            </div>
          </main>
        )}

      </div>

      {/* ── HALF-SCREEN BOTTOM SHEET POPUP (Request Free Session) ── */}
      {isSheetMounted && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end items-center">
          {/* Backdrop overlay */}
          <div
            onClick={closeSheet}
            style={{
              opacity: isSheetVisible ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
            className="absolute inset-0 bg-black/50 backdrop-blur-[3px] cursor-pointer"
            aria-hidden="true"
          />

          {/* Bottom Sheet Drawer (Slides bottom to up with spring/cubic-bezier ease) */}
          <div
            style={{
              transform: isSheetVisible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)",
            }}
            className="relative w-full max-w-[500px] bg-white rounded-t-[28px] sm:rounded-t-[32px] px-5 sm:px-6 pt-3.5 pb-8 sm:pb-9 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-10 max-h-[92vh] overflow-y-auto"
          >
            {/* Top Drag Handle */}
            <div className="flex justify-center mb-3">
              <div className="w-12 h-1.5 rounded-full bg-slate-200" />
            </div>

            {!formSubmitted ? (
              <div>
                {/* Header with Assessment Completed Badge & Close Button */}
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{isHindi ? "मूल्यांकन संपन्न" : "Assessment Completed"}</span>
                  </span>
                  <button
                    type="button"
                    onClick={closeSheet}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <h3 className="text-xl sm:text-[23px] font-bold text-[#111827] tracking-tight leading-snug">
                  {isHindi ? "अपना निःशुल्क सत्र बुक करें" : "Request Your Free Session"}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                  {isHindi
                    ? "100% गोपनीय व सुरक्षित परामर्श। कृपया अपना नाम और मोबाइल नंबर साझा करें।"
                    : "100% confidential and judgment-free space. Please share your details."}
                </p>

                {/* Formik Compact Form: Name & Mobile Number */}
                <form onSubmit={formik.handleSubmit} className="space-y-3.5 mt-4" noValidate>
                  {/* Name Field */}
                  <div className="space-y-1 text-left">
                    <label htmlFor="sheet-name" className="block text-xs font-bold text-slate-700">
                      {isHindi ? "पूरा नाम" : "Full Name"} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <input
                        id="sheet-name"
                        name="name"
                        type="text"
                        placeholder={isHindi ? "अपना नाम लिखें (उदा. राहुल)" : "Enter your name (e.g. Rahul)"}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full pl-10 pr-4 py-3 text-sm bg-white border-2 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all outline-none ${
                          formik.touched.name && formik.errors.name
                            ? "border-rose-400 bg-rose-50/20 focus:border-rose-500"
                            : "border-slate-200 hover:border-slate-300 focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/10"
                        }`}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-xs font-semibold text-rose-500 mt-1">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number Field */}
                  <div className="space-y-1 text-left">
                    <label htmlFor="sheet-phone" className="block text-xs font-bold text-slate-700">
                      {isHindi ? "मोबाइल नंबर" : "Mobile Number"} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center gap-1 px-3 text-xs font-bold text-slate-700 bg-slate-100 border-2 border-r-0 border-slate-200 rounded-l-xl select-none">
                        <span className="text-sm">🇮🇳</span>
                        <span>+91</span>
                      </span>
                      <input
                        id="sheet-phone"
                        name="phone"
                        type="tel"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={formik.values.phone}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, "");
                          formik.setFieldValue("phone", digitsOnly);
                        }}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 text-sm bg-white border-2 rounded-r-xl text-slate-900 placeholder:text-slate-400 tracking-wider font-semibold transition-all outline-none ${
                          formik.touched.phone && formik.errors.phone
                            ? "border-rose-400 bg-rose-50/20 focus:border-rose-500"
                            : "border-slate-200 hover:border-slate-300 focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/10"
                        }`}
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-xs font-semibold text-rose-500 mt-1">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.99] text-white font-bold text-base py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isHindi ? "अनुरोध भेजा जा रहा है..." : "Submitting Request..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{isHindi ? "निःशुल्क सत्र का अनुरोध करें" : "Request Free Session"}</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center font-medium mt-2.5">
                      🔒 {isHindi ? "100% गोपनीय व सुरक्षित। कोई निर्णय नहीं।" : "100% Confidential & Anonymous. Zero Judgment."}
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Success / Confirmation State (Form hidden, 24-hour message shown) */
              <div className="py-2 text-center space-y-3.5 animate-in zoom-in-95 duration-250">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {isHindi ? "अनुरोध सफलतापूर्वक दर्ज" : "Request Submitted Successfully"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {isHindi ? `धन्यवाद, ${formik.values.name || "मित्र"}!` : `Thank You, ${formik.values.name || "Friend"}!`}
                  </h3>
                </div>

                {/* Main Notification Card (Specified by user) */}
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200/80 text-center space-y-1.5">
                  <p className="text-base font-bold text-[#ea580c] leading-snug">
                    Our team will contact you within 24 hours.
                  </p>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    Thank you for showing trust in us. Have a good day!
                  </p>
                </div>

                {/* Summary Details */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold text-[11px]">Applicant Name</span>
                    <span className="font-bold text-slate-800">{formik.values.name || "Client"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold text-[11px]">Mobile Number</span>
                    <span className="font-bold text-slate-800">+91 {formik.values.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold text-[11px]">Selected Service</span>
                    <span className="font-bold text-slate-800 capitalize">{sessionType || "Individual"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold text-[11px]">Callback Timeline</span>
                    <span className="text-emerald-600 font-bold">Within 24 Hours</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-2">
                  <Link
                    href="/"
                    className="w-full bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.99] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isHindi ? "होम पेज पर जाएँ" : "Back to Home"}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>

                  <Link
                    href="/blog"
                    className="w-full py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors text-center block"
                  >
                    {isHindi ? "रिकवरी लेख व अंतर्दृष्टि देखें →" : "Explore Recovery Articles & Insights →"}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
