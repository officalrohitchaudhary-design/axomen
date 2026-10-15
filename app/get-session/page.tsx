"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import SplashScreen from "@/components/session-v1/SplashScreen";
import ServiceSelectScreen from "@/components/session-v1/ServiceSelectScreen";
import ProblemSelectScreen from "@/components/session-v1/ProblemSelectScreen";
import DontWorryScreen from "@/components/session-v1/DontWorryScreen";
import UnderstandImpactScreen from "@/components/session-v1/UnderstandImpactScreen";
import QuestionScreen from "@/components/session-v1/QuestionScreen";
import NotAloneScreen from "@/components/session-v1/NotAloneScreen";
import InnerDriveScreen from "@/components/session-v1/InnerDriveScreen";
import EmailScreen from "@/components/session-v1/EmailScreen";
import NameScreen from "@/components/session-v1/NameScreen";
import PlanReadyScreen from "@/components/session-v1/PlanReadyScreen";
import PayWhatYouWantScreen from "@/components/session-v1/PayWhatYouWantScreen";
import SuccessScreen from "@/components/session-v1/SuccessScreen";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION FLAGS
// Set to true if you ever want to re-enable Email and Name screens in the flow.
// (Currently hidden because Zyncro 3rd-party booking already collects name & email)
// ─────────────────────────────────────────────────────────────────────────────
export const ENABLE_CONTACT_SCREENS = false;
import {
  V1_QUESTIONS_PART_1,
  V1_QUESTIONS_PART_2,
  V1_QUESTION_9A,
  V1_QUESTIONS_PART_3,
  V1Question,
} from "@/components/session-v1/questionData";
import { SessionV1Step, ServiceType, ProblemType } from "@/components/session-v1/types";

export default function GetSessionPage() {
  const router = useRouter();

  // Screen & Assessment State
  const [step, setStep] = useState<SessionV1Step>("splash");
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<ProblemType | null>(null);

  // Question navigation
  const [activeQuestionId, setActiveQuestionId] = useState<string>("q1");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  // Sync state from URL parameter on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlStep = params.get("step") as SessionV1Step | null;
      const urlQ = params.get("q");

      if (urlStep) {
        setStep(urlStep);
      }
      if (urlQ) {
        setActiveQuestionId(urlQ);
      }

      // Check saved selection
      try {
        const saved = localStorage.getItem("hyi_session_v1_data");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.serviceType) setSelectedService(parsed.serviceType);
          if (parsed.problemType) setSelectedProblem(parsed.problemType);
          if (parsed.answers) setAnswers(parsed.answers);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.name) setName(parsed.name);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Handle browser back button: direct go to homepage from any screen
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Push an initial history entry so browser back button triggers popstate
      window.history.pushState({ sessionV1: true }, "", window.location.href);

      const handlePopState = () => {
        router.replace("/");
      };

      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [router]);

  // Screen blanking state for smooth in-place micro-transition (zero jerk)
  const [isScreenBlanking, setIsScreenBlanking] = useState<boolean>(false);

  // Update step and URL query without full reload (with gentle blank-then-show transition)
  const goToStep = (newStep: SessionV1Step, questionId?: string) => {
    setIsScreenBlanking(true);

    setTimeout(() => {
      setStep(newStep);
      if (questionId) setActiveQuestionId(questionId);

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (newStep === "splash") {
          url.searchParams.delete("step");
          url.searchParams.delete("q");
        } else {
          url.searchParams.set("step", newStep);
          if (newStep === "question" && questionId) {
            url.searchParams.set("q", questionId);
          } else {
            url.searchParams.delete("q");
          }
        }
        window.history.replaceState({ sessionV1: true }, "", url.toString());
      }

      // 50ms pause so the new screen is fully mounted before smoothly revealing in place
      setTimeout(() => {
        setIsScreenBlanking(false);
      }, 50);
    }, 160);
  };

  // Sync to localStorage
  const saveSessionProgress = (updates: Partial<{
    serviceType: ServiceType;
    problemType: ProblemType;
    answers: Record<string, string>;
    email: string;
    name: string;
  }>) => {
    try {
      const current = {
        serviceType: updates.serviceType || selectedService,
        problemType: updates.problemType || selectedProblem,
        answers: updates.answers || answers,
        email: updates.email !== undefined ? updates.email : email,
        name: updates.name !== undefined ? updates.name : name,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("hyi_session_v1_data", JSON.stringify(current));
    } catch {
      // ignore
    }
  };

  // ── Step 1: Splash ──
  const handleContinueFromSplash = () => {
    goToStep("service");
  };

  // ── Step 2: Service ──
  const handleBackToSplash = () => {
    goToStep("splash");
  };

  const handleSelectService = (type: ServiceType) => {
    setSelectedService(type);
    saveSessionProgress({ serviceType: type });
    goToStep("problem");
  };

  // ── Step 3: Problem ──
  const handleBackToService = () => {
    goToStep("service");
  };

  const handleSelectProblem = (type: ProblemType) => {
    setSelectedProblem(type);
    saveSessionProgress({ problemType: type });
    goToStep("dont-worry");
  };

  // ── Step 4: Don't Worry ──
  const handleBackToProblem = () => {
    goToStep("problem");
  };

  const handleContinueFromDontWorry = () => {
    goToStep("understand-impact");
  };

  // ── Step 5: Understand Impact ──
  const handleBackToDontWorry = () => {
    goToStep("dont-worry");
  };

  const handleStartQuestions = () => {
    goToStep("question", "q1");
  };

  // ── Step 6+: Questions Flow Handling ──
  const handleQuestionAnswer = (qId: string, answer: string) => {
    const updatedAnswers = { ...answers, [qId]: answer };
    setAnswers(updatedAnswers);
    saveSessionProgress({ answers: updatedAnswers });

    // Transition Logic with Intermissions & Progressive Questions
    if (qId === "q1") goToStep("question", "q2");
    else if (qId === "q2") goToStep("question", "q_gender"); // index 3 as requested
    else if (qId === "q_gender") goToStep("question", "q_age"); // index 4 as requested
    else if (qId === "q_age") goToStep("question", "q3");
    else if (qId === "q3") goToStep("question", "q4");
    else if (qId === "q4") goToStep("question", "q5");
    else if (qId === "q5") {
      // Halfway intermission: "You are not alone"
      goToStep("not-alone");
    } else if (qId === "q6") goToStep("question", "q7");
    else if (qId === "q7") goToStep("question", "q8");
    else if (qId === "q8") goToStep("question", "q9");
    else if (qId === "q9") {
      // If Yes -> Show progressive question Q9A; If No -> Proceed to Inner Drive screen (or email)
      if (answer === "Yes") {
        goToStep("question", "q9a");
      } else {
        if (ENABLE_CONTACT_SCREENS) {
          goToStep("email");
        } else {
          goToStep("inner-drive");
        }
      }
    } else if (qId === "q9a") {
      if (ENABLE_CONTACT_SCREENS) {
        goToStep("email");
      } else {
        goToStep("inner-drive");
      }
    } else if (qId === "q10") goToStep("question", "q11");
    else if (qId === "q11") goToStep("question", "q12");
    else if (qId === "q12") {
      if (ENABLE_CONTACT_SCREENS) {
        goToStep("name");
      } else {
        goToStep("pay-what-you-want");
      }
    }
  };

  // Back Navigation for Questions
  const handleQuestionBack = (currentQId: string) => {
    if (currentQId === "q1") goToStep("understand-impact");
    else if (currentQId === "q2") goToStep("question", "q1");
    else if (currentQId === "q_gender") goToStep("question", "q2");
    else if (currentQId === "q_age") goToStep("question", "q_gender");
    else if (currentQId === "q3") goToStep("question", "q_age");
    else if (currentQId === "q4") goToStep("question", "q3");
    else if (currentQId === "q5") goToStep("question", "q4");
    else if (currentQId === "q6") goToStep("not-alone");
    else if (currentQId === "q7") goToStep("question", "q6");
    else if (currentQId === "q8") goToStep("question", "q7");
    else if (currentQId === "q9") goToStep("question", "q8");
    else if (currentQId === "q9a") goToStep("question", "q9");
    else if (currentQId === "q10") {
      if (ENABLE_CONTACT_SCREENS) {
        goToStep("email");
      } else {
        goToStep("inner-drive");
      }
    }
    else if (currentQId === "q11") goToStep("question", "q10");
    else if (currentQId === "q12") goToStep("question", "q11");
  };

  // ── Intermission: Not Alone Screen ──
  const handleContinueFromNotAlone = () => {
    goToStep("question", "q6");
  };

  const handleBackFromNotAlone = () => {
    goToStep("question", "q5");
  };

  // ── Inner Drive Screen Handlers (Email screen replacement) ──
  const handleContinueFromInnerDrive = () => {
    goToStep("question", "q10");
  };

  const handleBackFromInnerDrive = () => {
    if (answers["q9"] === "Yes") {
      goToStep("question", "q9a");
    } else {
      goToStep("question", "q9");
    }
  };

  // ── Email Screen ──
  const handleEmailSubmit = (enteredEmail: string) => {
    setEmail(enteredEmail);
    saveSessionProgress({ email: enteredEmail });
    goToStep("question", "q10");
  };

  const handleBackFromEmail = () => {
    if (answers["q9"] === "Yes") {
      goToStep("question", "q9a");
    } else {
      goToStep("question", "q9");
    }
  };

  // ── Name Screen & Final Completion ──
  const handleNameSubmit = (enteredName: string) => {
    setName(enteredName);
    saveSessionProgress({ name: enteredName });

    try {
      localStorage.setItem(
        "hyi_session_v1_lead",
        JSON.stringify({
          serviceType: selectedService,
          problemType: selectedProblem,
          answers,
          email,
          name: enteredName,
          completedAt: new Date().toISOString(),
        })
      );
    } catch {
      // ignore
    }

    // Go to Pay What You Want screen
    goToStep("pay-what-you-want");
  };

  // ── Plan Ready Screen Handlers ──
  const handleContinueFromPlanReady = () => {
    goToStep("pay-what-you-want");
  };

  const handleBackFromPlanReady = () => {
    if (ENABLE_CONTACT_SCREENS) {
      goToStep("name");
    } else {
      goToStep("question", "q12");
    }
  };

  // ── Pay What You Want Final Handler ──
  const handleCompletePWYW = async (tier: string) => {
    // Gather all lead details from state with fallback to localStorage
    let currentEmail = email;
    let currentName = name;
    let currentAnswers = answers;
    let currentService = selectedService;
    let currentProblem = selectedProblem;

    try {
      const savedData = localStorage.getItem("hyi_session_v1_data");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (!currentEmail && parsed.email) currentEmail = parsed.email;
        if (!currentName && parsed.name) currentName = parsed.name;
        if (!currentService && parsed.serviceType) currentService = parsed.serviceType;
        if (!currentProblem && parsed.problemType) currentProblem = parsed.problemType;
        if (Object.keys(currentAnswers).length === 0 && parsed.answers) currentAnswers = parsed.answers;
      }
    } catch {
      // ignore
    }

    const gender = currentAnswers["q_gender"] || "";
    const age = currentAnswers["q_age"] || "";

    const leadData = {
      name: currentName || "Anonymous",
      email: currentEmail || "",
      gender,
      age,
      serviceType: currentService || "individual",
      problemType: currentProblem || "porn",
      priceTier: tier || "Free",
      answers: currentAnswers,
      submittedAt: new Date().toISOString(),
      bookingConfirmed: true,
    };

    // 1. Save complete lead object in localStorage
    try {
      localStorage.setItem("hyi_session_v1_lead", JSON.stringify(leadData));
    } catch {
      // ignore
    }

    // 2. Call server API to store in Supabase
    try {
      await fetch("/api/session-v1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
    } catch (err) {
      console.warn("[Session V1] Could not reach lead submission API:", err);
    }

    // 3. Proceed to Success Screen
    setTimeout(() => {
      goToStep("success");
    }, 300);
  };

  const handleBackFromName = () => {
    goToStep("question", "q12");
  };

  // Find active question object
  const allQuestionsMap: Record<string, V1Question> = {
    ...Object.fromEntries(V1_QUESTIONS_PART_1.map((q) => [q.id, q])),
    ...Object.fromEntries(V1_QUESTIONS_PART_2.map((q) => [q.id, q])),
    q9a: V1_QUESTION_9A,
    ...Object.fromEntries(V1_QUESTIONS_PART_3.map((q) => [q.id, q])),
  };
  const activeQuestion = allQuestionsMap[activeQuestionId] || V1_QUESTIONS_PART_1[0];

  // Calculate overall progress percentage (1 to 14)
  const questionOrderList = [
    "q1",
    "q2",
    "q_gender",
    "q_age",
    "q3",
    "q4",
    "q5",
    "q6",
    "q7",
    "q8",
    "q9",
    "q9a",
    "q10",
    "q11",
    "q12",
  ];
  const qIdx = questionOrderList.indexOf(activeQuestionId);
  const progressPercent = qIdx >= 0 ? Math.round(((qIdx + 1) / questionOrderList.length) * 100) : 10;

  // Determine current screen background color
  const isBlueThemeScreen = step === "dont-worry" || step === "understand-impact";
  const frameBgClass = isBlueThemeScreen
    ? "bg-[#d7e0ff]"
    : step === "question" || step === "problem"
    ? "bg-[#f7f7fc]"
    : step === "pay-what-you-want"
    ? "bg-white"
    : step === "inner-drive"
    ? "bg-[#211da3]"
    : "bg-[#f7f5ff]";

  return (
    <div className="w-full h-[100dvh] max-h-[100dvh] md:h-screen md:max-h-screen bg-transparent md:bg-[#ececf4] flex flex-col items-center md:justify-center md:p-4 select-none overflow-hidden">
      {/* ── DESKTOP AMBIENT BACKDROP ── */}
      <div className="fixed inset-0 pointer-events-none hidden md:block opacity-60">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      </div>

      {/* ── MOBILE DEVICE FRAME CONTAINER ──
          - On Desktop (md+): Authentic iPhone-style mobile frame with subtle bezel, shadow, and dynamic island
          - On Mobile (< md): Edge-to-edge full width & height (100dvh), zero borders, zero frame, zero scroll
      ── */}
      <div
        className={`relative w-full h-[100dvh] max-h-[100dvh] md:w-[390px] md:h-[844px] md:max-h-[92vh] ${frameBgClass} md:rounded-[46px] md:border-[7px] md:border-[#1a1a24] md:shadow-[0_25px_70px_rgba(20,20,35,0.28),0_10px_25px_rgba(20,20,35,0.18)] flex flex-col justify-between overflow-hidden transition-colors duration-300`}
        style={{
          height: "100dvh",
          maxHeight: "100dvh",
          overscrollBehavior: "none",
        }}
      >
        {/* Desktop Phone Mockup: Dynamic Island Notch */}
        <div className="hidden md:flex absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-24 h-4 bg-[#1a1a24] rounded-full items-center justify-end pr-2 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#111116] border border-[#2a2a35] mr-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#0d2338]" />
        </div>

        {/* ── RENDER ACTIVE SCREEN (Gentle blank-then-reveal in place, zero jerk) ── */}
        <div
          className={`w-full h-full flex flex-col justify-between transition-opacity duration-300 ease-out ${
            isScreenBlanking ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {step === "splash" ? (
            <SplashScreen onContinue={handleContinueFromSplash} />
          ) : step === "service" ? (
            <ServiceSelectScreen
              onSelect={handleSelectService}
              onBack={handleBackToSplash}
            />
          ) : step === "problem" ? (
            <ProblemSelectScreen
              onSelect={handleSelectProblem}
              onBack={handleBackToService}
              selectedProblem={selectedProblem}
            />
          ) : step === "dont-worry" ? (
            <DontWorryScreen
              onContinue={handleContinueFromDontWorry}
              onBack={handleBackToProblem}
            />
          ) : step === "understand-impact" ? (
            <UnderstandImpactScreen
              onContinue={handleStartQuestions}
              onBack={handleBackToDontWorry}
            />
          ) : step === "question" ? (
            <QuestionScreen
              question={activeQuestion}
              onSelect={(ans) => handleQuestionAnswer(activeQuestion.id, ans)}
              onBack={() => handleQuestionBack(activeQuestion.id)}
              progressPercent={progressPercent}
            />
          ) : step === "not-alone" ? (
            <NotAloneScreen
              onContinue={handleContinueFromNotAlone}
              onBack={handleBackFromNotAlone}
            />
          ) : step === "inner-drive" ? (
            <InnerDriveScreen
              onContinue={handleContinueFromInnerDrive}
              onBack={handleBackFromInnerDrive}
            />
          ) : step === "plan-ready" ? (
            <PlanReadyScreen
              onContinue={handleContinueFromPlanReady}
              onBack={handleBackFromPlanReady}
              answers={answers}
              problemType={selectedProblem}
            />
          ) : step === "email" ? (
            <EmailScreen
              onSubmit={handleEmailSubmit}
              onBack={handleBackFromEmail}
              initialValue={email}
            />
          ) : step === "name" ? (
            <NameScreen
              onSubmit={handleNameSubmit}
              onBack={handleBackFromName}
              initialValue={name}
            />
          ) : step === "pay-what-you-want" ? (
            <PayWhatYouWantScreen
              onComplete={handleCompletePWYW}
              userInitial={name ? name.charAt(0).toUpperCase() : "R"}
              email={email}
              name={name}
              gender={answers["q_gender"] || ""}
              age={answers["q_age"] || ""}
            />
          ) : (
            <SuccessScreen
              email={email}
              name={name}
              userInitial={name ? name.charAt(0).toUpperCase() : "R"}
              onHome={() => router.push("/")}
            />
          )}
        </div>

        {/* Desktop Phone Mockup: Home Indicator Pill */}
        <div className="hidden md:block absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 w-32 h-1 bg-black/20 rounded-full pointer-events-none" />
      </div>
      <Script src="https://zyncro.in/embed.js" strategy="afterInteractive" />
    </div>
  );
}
