"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// Component to handle fallback placeholders if GIFs don't exist yet
function ExerciseImage({ src, alt, color }: { src: string; alt: string; color: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full aspect-[16/11] flex items-center justify-center text-center p-4 relative group"
        style={{ backgroundColor: `${color}0c` }}
      >
        <div
          className="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1.2px, transparent 1.2px)",
            backgroundSize: "16px 16px"
          }}
        />
        <div className="flex flex-col items-center gap-2 z-10">
          <svg className="transition-transform duration-300 group-hover:scale-105" style={{ color }} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
            Visual Guide
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/11] overflow-hidden bg-gray-50">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

// Visual Cues & Icons
function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function ClockIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FlameIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

type BreathingPhase = "breathe-in" | "hold-in" | "breathe-out" | "hold-out";

interface ExerciseItem {
  id: string;
  type: "breathing" | "yoga" | "grounding";
  titleKey: string;
  descKey: string;
  accent: string;
  gifSrc: string;
  durationLabel: string;
  durationSec: number;
  willpowerLabel: string;
  steps: string[];
  tips: string[];
  durations?: { label: string; sec: number }[];
  youtubeId?: string;
}

function formatSeconds(sec: number) {
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function ExercisesClient() {
  const t = useTranslations("exercises");

  // Page states
  const [conqueredCount, setConqueredCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "breathing" | "yoga" | "grounding">("all");

  // Common Interactive Modal states (Image 2 detail layout)
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);

  // Box Breathing Active States
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingRounds, setBreathingRounds] = useState(8);
  const [currentRound, setCurrentRound] = useState(1);
  const [breathingPhase, setBreathingPhase] = useState<BreathingPhase>("breathe-in");
  const [phaseSeconds, setPhaseSeconds] = useState(4);
  const [showBreathingSuccess, setShowBreathingSuccess] = useState(false);

  // Yoga & Breathing Hold Active States
  const [holdSessionActive, setHoldSessionActive] = useState(false);
  const [holdSecondsLeft, setHoldSecondsLeft] = useState(60);
  const [selectedDurationSec, setSelectedDurationSec] = useState(60);
  const [showHoldSuccess, setShowHoldSuccess] = useState(false);

  // Sensory Grounding Checklist States
  const [showGroundingModal, setShowGroundingModal] = useState(false);
  const [groundingSteps, setGroundingSteps] = useState([
    { id: 1, category: "5 Things You Can See", desc: "Look around and name 5 items in the room (e.g. table, picture, lamp).", checked: false },
    { id: 2, category: "4 Things You Can Feel", desc: "Pay attention to 4 physical sensations (e.g. feet on floor, cloth texture, breeze).", checked: false },
    { id: 3, category: "3 Things You Can Hear", desc: "Listen for 3 distinct sounds (e.g. fan humming, bird chirping, distant car).", checked: false },
    { id: 4, category: "2 Things You Can Smell", desc: "Identify 2 smells around you, or recall pleasant scents (e.g. coffee, soap).", checked: false },
    { id: 5, category: "1 Thing You Can Taste", desc: "Focus on 1 taste in your mouth, or take a sip of water mindfully.", checked: false },
  ]);

  // Lifestyle tips checklist state
  const [lifestyleChecklist, setLifestyleChecklist] = useState([
    { id: "walk", text: "30–45 mins walking or exercise", checked: false },
    { id: "sleep", text: "Good sleep (7–9 hours)", checked: false },
    { id: "social", text: "Less social media scrolling", checked: false },
    { id: "phone", text: "Phone away from bed at night", checked: false },
    { id: "busy", text: "Stay busy with studies/work/hobbies", checked: false }
  ]);

  // All Exercises Data Structured for Card Grid (Image 1 style)
  const EXERCISES: ExerciseItem[] = [
    {
      id: "urge_surfing",
      type: "breathing",
      titleKey: "breathingCircleTitle",
      descKey: "breathingCircleDesc",
      accent: "#2563eb",
      gifSrc: "/image/exercises/urge_surfing.gif",
      durationLabel: "1–3 Mins",
      durationSec: 120,
      willpowerLabel: "+20 Focus",
      steps: [
        "Sit comfortably in a quiet room, close your eyes and focus on your breath.",
        "Inhale slowly for 4 seconds, feeling your lungs fill with clean energy.",
        "Hold your breath at the top for 4 seconds, staying calm and still.",
        "Exhale slowly for 4 seconds, letting all mental pressure dissolve.",
        "Hold empty at the bottom for 4 seconds before the next breath."
      ],
      tips: [
        "Stops auto-pilot craving states instantly.",
        "Calms the nervous system directly.",
        "Builds strong neural connections."
      ],
      durations: [
        { label: "1 Min", sec: 60 },
        { label: "2 Mins", sec: 120 },
        { label: "3 Mins", sec: 180 }
      ],
      youtubeId: "1kt-m6vw_Js"
    },
    {
      id: "balasana",
      type: "yoga",
      titleKey: "yogaBalasanaTitle",
      descKey: "yogaBalasanaDesc",
      accent: "#FAA23A",
      gifSrc: "/image/exercises/balasana.gif",
      durationLabel: "1–3 Mins",
      durationSec: 120,
      willpowerLabel: "Calming",
      steps: [
        "Kneel on the floor, touch your big toes together and sit back on your heels.",
        "Exhale, fold your torso forward and lay it down between your thighs.",
        "Extend your arms forward with palms down, resting your forehead flat on the floor.",
        "Relax shoulders completely and focus on slow, deep diaphragmatic breathing."
      ],
      tips: [
        "Calms the nervous system directly.",
        "Reduces stress, restlessness, and anxiety.",
        "Highly effective to disrupt strong, immediate urges."
      ],
      durations: [
        { label: "1 Min", sec: 60 },
        { label: "2 Mins", sec: 120 },
        { label: "3 Mins", sec: 180 }
      ],
      youtubeId: "xGVQzPfW5y8"
    },
    {
      id: "bhujangasana",
      type: "yoga",
      titleKey: "yogaCobraTitle",
      descKey: "yogaCobraDesc",
      accent: "#e8632a",
      gifSrc: "/image/exercises/bhujangasana.gif",
      durationLabel: "30 Secs",
      durationSec: 30,
      willpowerLabel: "Energy",
      steps: [
        "Lie flat on your stomach, place hands flat on the floor under your shoulders.",
        "Keep elbows tucked close to your torso. Press tops of feet into the floor.",
        "Inhale and lift your chest off the floor, keeping your lower abdomen grounded.",
        "Roll shoulders back, chest open, holding the stretch comfortably."
      ],
      tips: [
        "Improves physical energy levels.",
        "Reduces mental fatigue.",
        "Encourages better posture and confidence."
      ],
      durations: [
        { label: "20 Secs", sec: 20 },
        { label: "30 Secs", sec: 30 },
        { label: "60 Secs", sec: 60 }
      ],
      youtubeId: "F6V_3LUYp5U"
    },
    {
      id: "vrikshasana",
      type: "yoga",
      titleKey: "yogaTreeTitle",
      descKey: "yogaTreeDesc",
      accent: "#059669",
      gifSrc: "/image/exercises/vrikshasana.gif",
      durationLabel: "1–2 Mins",
      durationSec: 60,
      willpowerLabel: "Focus",
      steps: [
        "Stand straight, place hands at your sides. Find a focal point in front of you.",
        "Shift weight to your left foot. Bend your right knee, placing the foot on the left inner thigh (avoid knee).",
        "Bring hands to prayer position at your chest, or extend them overhead.",
        "Hold balance, breathing slowly. Then switch sides and repeat."
      ],
      tips: [
        "Improves overall concentration.",
        "Builds mental discipline.",
        "Trains the mind to stay focused and avoid distractions."
      ],
      durations: [
        { label: "30s / Leg", sec: 60 },
        { label: "60s / Leg", sec: 120 }
      ],
      youtubeId: "FuKBRfvLGj8"
    },
    {
      id: "anulomvilom",
      type: "yoga",
      titleKey: "anulomVilomTitle",
      descKey: "anulomVilomDesc",
      accent: "#7c3aed",
      gifSrc: "/image/exercises/anulom_vilom.gif",
      durationLabel: "5 Mins",
      durationSec: 300,
      willpowerLabel: "Control",
      steps: [
        "Sit comfortably cross-legged with a straight spine and closed eyes.",
        "Close your right nostril with your thumb; inhale deeply through the left nostril.",
        "Close the left nostril with your ring finger; release the right and exhale completely.",
        "Inhale through the right nostril; close it, and exhale through the left nostril."
      ],
      tips: [
        "Calms racing and obsessive thoughts.",
        "Reduces stress-driven urges.",
        "Improves emotional control and focus."
      ],
      durations: [
        { label: "2 Mins", sec: 120 },
        { label: "5 Mins", sec: 300 },
        { label: "10 Mins", sec: 600 }
      ],
      youtubeId: "dQNBIjQHuvI"
    },
    {
      id: "bhramari",
      type: "yoga",
      titleKey: "bhramariTitle",
      descKey: "bhramariDesc",
      accent: "#ec4899",
      gifSrc: "/image/exercises/bhramari.gif",
      durationLabel: "2 Mins",
      durationSec: 120,
      willpowerLabel: "Relax",
      steps: [
        "Sit straight, close eyes. Place thumbs on your ears to block sound.",
        "Place index fingers on forehead, and middle/ring fingers lightly over closed eyes.",
        "Inhale deeply through the nose.",
        "Exhale slowly, making a smooth, deep humming bee sound 'Mmmmmm' in your throat."
      ],
      tips: [
        "Quickly relaxes and settles the mind.",
        "Reduces anxiety and restlessness.",
        "Extremely helpful to perform before sleep."
      ],
      durations: [
        { label: "2 Mins", sec: 120 },
        { label: "5 Mins", sec: 300 }
      ],
      youtubeId: "VtHw7rq7-Y8"
    }
  ];

  // Read streak counter from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("hyi-exercises-conquered");
    if (saved) {
      setConqueredCount(parseInt(saved, 10));
    }
  }, []);

  // Increment conquered counter
  const incrementConquered = () => {
    const newVal = conqueredCount + 1;
    setConqueredCount(newVal);
    localStorage.setItem("hyi-exercises-conquered", newVal.toString());
  };

  // Box Breathing Session Timer (Urge Surfing)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (breathingActive) {
      interval = setInterval(() => {
        setPhaseSeconds((prev) => {
          if (prev <= 1) {
            setBreathingPhase((currPhase) => {
              switch (currPhase) {
                case "breathe-in":
                  return "hold-in";
                case "hold-in":
                  return "breathe-out";
                case "breathe-out":
                  return "hold-out";
                case "hold-out":
                  if (currentRound >= breathingRounds) {
                    setBreathingActive(false);
                    setShowBreathingSuccess(true);
                    incrementConquered();
                    return "breathe-in";
                  } else {
                    setCurrentRound((r) => r + 1);
                    return "breathe-in";
                  }
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [breathingActive, currentRound, breathingRounds]);

  // Yoga Hold Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (holdSessionActive) {
      interval = setInterval(() => {
        setHoldSecondsLeft((prev) => {
          if (prev <= 1) {
            setHoldSessionActive(false);
            setShowHoldSuccess(true);
            incrementConquered();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [holdSessionActive]);

  const startBreathingSession = () => {
    setCurrentRound(1);
    setBreathingPhase("breathe-in");
    setPhaseSeconds(4);
    setBreathingActive(true);
    setShowBreathingSuccess(false);
  };

  const stopBreathingSession = () => {
    setBreathingActive(false);
    setShowBreathingSuccess(false);
  };

  const startYogaSession = () => {
    setHoldSecondsLeft(selectedDurationSec);
    setHoldSessionActive(true);
    setShowHoldSuccess(false);
  };

  const stopYogaSession = () => {
    setHoldSessionActive(false);
    setShowHoldSuccess(false);
  };

  const getPhaseText = (phase: BreathingPhase) => {
    switch (phase) {
      case "breathe-in":
        return t("breatheIn");
      case "hold-in":
      case "hold-out":
        return t("hold");
      case "breathe-out":
        return t("breatheOut");
    }
  };

  const getPhaseBg = (phase: BreathingPhase) => {
    switch (phase) {
      case "breathe-in":
        return "bg-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.6)]";
      case "hold-in":
        return "bg-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.7)]";
      case "breathe-out":
        return "bg-teal-600 shadow-[0_0_40px_rgba(13,148,136,0.6)]";
      case "hold-out":
        return "bg-gray-600 shadow-[0_0_30px_rgba(75,85,99,0.4)]";
    }
  };

  // Reset Grounding Steps
  const resetGrounding = () => {
    setGroundingSteps((steps) => steps.map((s) => ({ ...s, checked: false })));
    setShowGroundingModal(true);
  };

  const toggleGroundingStep = (id: number) => {
    setGroundingSteps((steps) =>
      steps.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const allGroundingChecked = groundingSteps.every((s) => s.checked);

  const completeGrounding = () => {
    setShowGroundingModal(false);
    incrementConquered();
  };

  // Handle lifestyle checkoffs
  const toggleLifestyle = (id: string) => {
    setLifestyleChecklist(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const handleOpenDetails = (ex: ExerciseItem) => {
    setSelectedExercise(ex);
    if (ex.durations && ex.durations.length > 0) {
      setSelectedDurationSec(ex.durations[0].sec);
    } else {
      setSelectedDurationSec(ex.durationSec);
    }
    setShowDetailModal(true);
    setShowHoldSuccess(false);
    setShowBreathingSuccess(false);
    setHoldSessionActive(false);
    setBreathingActive(false);
  };

  const handleDirectPlay = (ex: ExerciseItem) => {
    setSelectedExercise(ex);
    if (ex.durations && ex.durations.length > 0) {
      setSelectedDurationSec(ex.durations[0].sec);
    } else {
      setSelectedDurationSec(ex.durationSec);
    }
    setShowDetailModal(true);
    setShowHoldSuccess(false);
    setShowBreathingSuccess(false);

    // Automatically trigger the session directly
    setTimeout(() => {
      if (ex.id === "urge_surfing") {
        setBreathingRounds(8);
        setCurrentRound(1);
        setBreathingPhase("breathe-in");
        setPhaseSeconds(4);
        setBreathingActive(true);
      } else {
        setHoldSecondsLeft(ex.durationSec);
        setHoldSessionActive(true);
      }
    }, 150);
  };

  // Filter exercises
  const filteredExercises = EXERCISES.filter((ex) => {
    if (activeTab === "all") return true;
    return ex.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#fafaf8] pb-20">
      {/* Breathing ring scaling styles */}
      <style>{`
        @keyframes breathe-pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.22); opacity: 0.45; }
        }
        .breathe-ring {
          animation: breathe-pulse 5.2s ease-in-out infinite;
        }
      `}</style>

      {/* Premium Gradient Banner Section (Upgrade/Banner Shape matching Image 1) */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div
          className="w-full rounded-[2rem] p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-150 shadow-[0_15px_35px_rgba(0,0,0,0.03)]"
          style={{ background: "linear-gradient(135deg, #76c0fe 0%, #c4e4ff 100%)" }}
        >
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #000 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px"
            }}
            aria-hidden
          />

          <div className="relative z-10 flex flex-col gap-3 max-w-lg text-center md:text-left items-center md:items-start">
            <span
              className="inline-flex items-center gap-1.5 bg-[#1a1a2e] text-[#fbe400] text-[9px] font-black uppercase tracking-[0.08em] px-3.5 py-1.5 rounded-full"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              <InfoIcon />
              {t("badge")}
            </span>

            <h1
              className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.08] font-black text-[#1a1a2e] uppercase"
              style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
            >
              {t("title")}
            </h1>

            <p
              className="text-[#1a1a2e]/80 text-xs sm:text-sm leading-relaxed font-semibold"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {t("subtitle")}
            </p>
          </div>

          {/* Decorative brain rewiring vector graphic */}
          <div className="relative shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 z-10 hidden sm:flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#1a1a2e]" fill="currentColor">
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" className="opacity-20 animate-spin" style={{ animationDuration: "60s" }} />
              <path d="M70,95 c0,-20 15,-35 30,-35 s30,15 30,35 c0,10 -5,17 -13,22 c-4,2 -7,5 -7,10 v5 h-20 v-5 c0,-5 -3,-8 -7,-10 c-8,-5 -13,-12 -13,-22 z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <circle cx="100" cy="147" r="10" />
              <path d="M100,50 L100,35 M135,62 L146,51 M150,95 L165,95 M135,128 L146,139 M65,62 L54,51 M50,95 L35,95 M65,128 L54,139" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              <circle cx="100" cy="95" r="8" fill="#fbe400" />
            </svg>
          </div>
        </div>
      </section>

      {/* Exercises List Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 flex flex-col gap-6">

        {/* Tab list with See All link matching Image 1 */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2
            className="text-xl sm:text-2xl font-black text-[#1a1a2e]"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            TODAY&apos;S BEST FIT
          </h2>

          <button
            onClick={() => setActiveTab("all")}
            className="text-xs font-black uppercase text-[#2563eb] hover:text-blue-800 transition-colors underline tracking-wider"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            See All ({EXERCISES.length})
          </button>
        </div>

        {/* Tab filter pill row */}
        <div className="flex flex-wrap gap-1.5">
          {(["all", "breathing", "yoga"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-[10.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${activeTab === tab
                  ? "bg-[#1a1a2e] text-[#fbe400] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                  : "bg-white text-gray-500 border border-gray-150 hover:bg-gray-50"
                }`}
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              {tab === "all" ? "All Exercises" : tab === "breathing" ? "Breathing & Control" : "Daily Yoga Poses"}
            </button>
          ))}
        </div>

        {/* Exercise Card Grid (Precisely matching the rounded UI design layout of Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

          {/* Exercise Cards */}
          {filteredExercises.map((ex) => (
            <div
              key={ex.id}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 p-3.5 flex flex-col justify-between gap-3 group"
            >
              {/* Visual Demo YouTube Short or Fallback Image/GIF block */}
              <div className="w-full aspect-[1.1] rounded-[1.6rem] overflow-hidden flex items-center justify-center relative select-none bg-black">
                {ex.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ex.youtubeId}?autoplay=0&mute=1&rel=0&modestbranding=1`}
                    title={t(ex.titleKey as Parameters<typeof t>[0])}
                    className="h-full aspect-[9/16] mx-auto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <ExerciseImage src={ex.gifSrc} alt={t(ex.titleKey as Parameters<typeof t>[0])} color={ex.accent} />
                )}
              </div>

              {/* Title centered */}
              <h3
                className="text-center text-[#1a1a2e] font-black text-xs sm:text-[14px] leading-tight px-1 uppercase tracking-tight"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t(ex.titleKey as Parameters<typeof t>[0])}
              </h3>

              {/* Bottom Controls row (Details button + circle black play button) */}
              <div className="flex items-center justify-between gap-1.5 pt-1 mt-auto">
                <button
                  onClick={() => handleOpenDetails(ex)}
                  className="flex-1 bg-slate-100 text-[#1a1a2e] text-[10px] font-black uppercase tracking-wider py-2.5 px-3 rounded-full hover:bg-slate-200 active:scale-95 transition-all text-center cursor-pointer"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Details
                </button>

                <button
                  onClick={() => handleDirectPlay(ex)}
                  className="w-9 h-9 rounded-full bg-[#1a1a2e] text-white flex items-center justify-center hover:bg-black active:scale-90 shadow-md transition-all shrink-0 cursor-pointer"
                  aria-label="Start exercise immediately"
                >
                  <PlayIcon />
                </button>
              </div>
            </div>
          ))}

          {/* Special Card for Grounding Checklist */}
          {(activeTab === "all" || activeTab === "grounding") && (
            <div
              className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 p-3.5 flex flex-col justify-between gap-3 group"
            >
              <div className="w-full aspect-[1.1] rounded-[1.6rem] overflow-hidden flex items-center justify-center relative select-none">
                <ExerciseImage src="/image/exercises/grounding.gif" alt="Sensory Grounding" color="#059669" />
              </div>

              <h3
                className="text-center text-[#1a1a2e] font-black text-xs sm:text-[14px] leading-tight px-1 uppercase tracking-tight"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("groundingTitle")}
              </h3>

              <div className="flex items-center justify-between gap-1.5 pt-1 mt-auto">
                <button
                  onClick={resetGrounding}
                  className="flex-1 bg-slate-100 text-[#1a1a2e] text-[10px] font-black uppercase tracking-wider py-2.5 px-3 rounded-full hover:bg-slate-200 active:scale-95 transition-all text-center cursor-pointer"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Checklist
                </button>

                <button
                  onClick={resetGrounding}
                  className="w-9 h-9 rounded-full bg-[#1a1a2e] text-white flex items-center justify-center hover:bg-black active:scale-90 shadow-md transition-all shrink-0 cursor-pointer"
                  aria-label="Start grounding"
                >
                  <PlayIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DETAIL MODAL (Matching Image 2: Large image, frosted bottom card, stats grids, pill button) */}
      {showDetailModal && selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1a1a2e]/90 backdrop-blur-md overflow-y-auto">
          <div
            className="w-full sm:max-w-md bg-white border-0 sm:border border-gray-200 rounded-none sm:rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden min-h-screen sm:min-h-0 sm:h-[85vh] max-h-screen"
          >
            {/* Close button top right */}
            <button
              onClick={() => {
                stopYogaSession();
                stopBreathingSession();
                setShowDetailModal(false);
              }}
              className="absolute top-4 right-4 z-40 w-9 h-9 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md hover:bg-white border border-gray-200 font-bold cursor-pointer text-sm text-[#1a1a2e]"
            >
              ✕
            </button>

            {/* PRE-SESSION DETAIL PANEL */}
            {!holdSessionActive && !breathingActive && !showHoldSuccess && !showBreathingSuccess && (
              <>
                {/* Visual Header - YouTube video directly embedded matching the mockup style */}
                <div
                  className="w-full h-[38vh] sm:h-[320px] relative flex items-center justify-center select-none bg-black"
                >
                  {selectedExercise.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedExercise.youtubeId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
                      title={t(selectedExercise.titleKey as Parameters<typeof t>[0])}
                      className="h-full aspect-[9/16] mx-auto"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    /* Visual animation loader inside backdrop */
                    <div className="absolute inset-0 flex items-center justify-center p-6 opacity-85">
                      <ExerciseImage src={selectedExercise.gifSrc} alt={t(selectedExercise.titleKey as Parameters<typeof t>[0])} color={selectedExercise.accent} />
                    </div>
                  )}
                </div>

                {/* Overlaid Bottom Card Content (Frosted glass effect matching Image 2) */}
                <div className="flex-1 bg-white/95 backdrop-blur-lg rounded-t-[2.5rem] -mt-10 relative z-10 px-6 pt-7 pb-6 flex flex-col justify-between gap-5 border-t border-gray-100 shadow-[0_-15px_40px_rgba(0,0,0,0.03)] overflow-y-auto">

                  {/* Description Box */}
                  <div className="flex flex-col gap-2.5">
                    <span
                      className="text-[9px] font-black text-white px-3 py-1 rounded-full self-start uppercase tracking-widest"
                      style={{ backgroundColor: selectedExercise.accent }}
                    >
                      {selectedExercise.type === "breathing" ? "Breathing Guide" : "Yoga Exercise"}
                    </span>

                    <h3
                      className="text-2xl font-black text-[#1a1a2e] uppercase leading-none mt-1 tracking-tight"
                      style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
                    >
                      {t(selectedExercise.titleKey as Parameters<typeof t>[0])}
                    </h3>

                    <p className="text-gray-500 text-xs leading-relaxed font-semibold">
                      {t(selectedExercise.descKey as Parameters<typeof t>[0])}
                    </p>
                  </div>

                  {/* Pose detailed steps summary */}
                  <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-3xl flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase text-[#1a1a2e] tracking-wider">Instructions:</span>
                    <ol className="list-decimal pl-4 text-[11px] text-gray-600 space-y-1">
                      {selectedExercise.steps.map((st, idx) => (
                        <li key={idx} className="leading-snug">{st}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Two Stats Cards Side-by-Side (Matching Image 2) */}
                  <div className="flex gap-4">

                    {/* Stat Card 1: Duration Selector */}
                    <div className="bg-slate-50/50 p-4 rounded-3xl border border-gray-100 flex flex-col items-center gap-1.5 flex-1 select-none">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                        <ClockIcon color={selectedExercise.accent} />
                      </div>

                      {selectedExercise.durations && selectedExercise.durations.length > 0 ? (
                        <select
                          value={selectedDurationSec}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setSelectedDurationSec(val);
                            setBreathingRounds(val / 15);
                          }}
                          className="bg-transparent border-0 text-center font-black text-[13px] text-[#1a1a2e] focus:outline-none focus:ring-0 cursor-pointer"
                        >
                          {selectedExercise.durations.map((dur) => (
                            <option key={dur.sec} value={dur.sec}>{dur.label}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-black text-[13px] text-[#1a1a2e]">
                          {selectedExercise.durationLabel}
                        </span>
                      )}

                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                        Duration
                      </span>
                    </div>

                    {/* Stat Card 2: Willpower rating */}
                    <div className="bg-slate-50/50 p-4 rounded-3xl border border-gray-100 flex flex-col items-center gap-1.5 flex-1 select-none">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                        <FlameIcon color={selectedExercise.accent} />
                      </div>

                      <span className="font-black text-[13px] text-[#1a1a2e]">
                        {selectedExercise.willpowerLabel}
                      </span>

                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                        Willpower
                      </span>
                    </div>

                  </div>

                  {/* Massive black pill button (Matching Image 2) */}
                  <button
                    onClick={() => {
                      if (selectedExercise.type === "breathing") {
                        const roundsCount = selectedDurationSec / 15;
                        setBreathingRounds(roundsCount > 1 ? Math.round(roundsCount) : 8);
                        startBreathingSession();
                      } else {
                        startYogaSession();
                      }
                    }}
                    className="w-full bg-black hover:bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-4 rounded-full cursor-pointer shadow-md active:scale-[0.98] transition-all text-center mt-2"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    Start Now
                  </button>
                </div>
              </>
            )}

            {/* ACTIVE SESSION SCREENS: Breathing & Yoga holds inside modal container */}
            {breathingActive && (
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-8 bg-[#1a1a2e] text-white">
                <div className="text-center flex flex-col gap-1.5">
                  <span className="text-[9px] font-black uppercase tracking-[0.22em] text-blue-400">
                    Box Breathing Urge Surfing
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-300">
                    Round {currentRound} of {breathingRounds}
                  </span>
                </div>

                {/* Animated breathing circle */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <div
                    className={`absolute rounded-full w-36 h-36 flex items-center justify-center transition-all duration-[1000ms] ${getPhaseBg(
                      breathingPhase
                    )} ${breathingPhase === "breathe-in" || breathingPhase === "hold-in"
                        ? "scale-[1.4] md:scale-[1.5]"
                        : "scale-[0.85]"
                      }`}
                  >
                    <div className="flex flex-col items-center justify-center text-white text-center select-none">
                      <span className="text-[10px] font-black uppercase tracking-wider opacity-75">
                        {getPhaseText(breathingPhase)}
                      </span>
                      <span className="font-black text-3xl leading-none mt-1" style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}>
                        {phaseSeconds}
                      </span>
                    </div>
                  </div>
                  <div className="absolute rounded-full w-[220px] h-[220px] border-2 border-dashed border-white/20 pointer-events-none" />
                </div>

                <div className="h-12 text-center px-4">
                  <p className="text-gray-400 text-xs leading-relaxed italic">
                    {breathingPhase === "breathe-in" && "Inhale clean strength slowly... let your belly rise."}
                    {breathingPhase === "hold-in" && "Hold still. Stand firm as the urge peak subsides."}
                    {breathingPhase === "breathe-out" && "Exhale the craving. Push the digital loop away."}
                    {breathingPhase === "hold-out" && "Pure silence. You are master of your choices."}
                  </p>
                </div>

                <button
                  onClick={stopBreathingSession}
                  className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30 bg-transparent hover:bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Active Yoga Hold Session */}
            {holdSessionActive && (
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-8 bg-[#1a1a2e] text-white">
                <div className="text-center flex flex-col gap-1.5">
                  <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: selectedExercise.accent }}>
                    Guided Hold Posture
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-300">
                    Hold Steady
                  </span>
                </div>

                {/* Animated progress circle */}
                <div className="relative w-56 h-56 flex items-center justify-center">
                  <div className="breathe-ring absolute w-[190px] h-[190px] rounded-full border-4 border-dashed pointer-events-none" style={{ borderColor: selectedExercise.accent }} />

                  <div
                    className="absolute rounded-full w-36 h-36 flex flex-col items-center justify-center text-white border border-white/20 shadow-lg"
                    style={{ backgroundColor: selectedExercise.accent }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-85">Timer</span>
                    <span className="text-3xl font-black leading-none mt-1" style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}>
                      {formatSeconds(holdSecondsLeft)}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-3xl w-full max-w-sm text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                    Guideline
                  </span>
                  <p className="text-white text-xs font-bold leading-relaxed">
                    {selectedExercise.id === "vrikshasana" && holdSecondsLeft > selectedDurationSec / 2
                      ? "Balance on Left leg. Direct focus inward."
                      : selectedExercise.id === "vrikshasana"
                        ? "Switch to Right leg now! Maintain discipline."
                        : "Hold the posture. Sync your breathing with the pulsing outer ring."
                    }
                  </p>
                </div>

                <button
                  onClick={stopYogaSession}
                  className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30 bg-transparent hover:bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* SUCCESS PANEL (Breathing) */}
            {showBreathingSuccess && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-6 bg-white">
                <div className="w-16 h-16 rounded-full bg-[#059669] flex items-center justify-center text-white border border-[#0f0f0f]/10 text-2xl font-bold animate-bounce shadow-lg">
                  ✓
                </div>

                <h3 className="text-2xl font-black text-[#059669] uppercase tracking-tight" style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}>
                  Urge Surfed!
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs font-semibold">
                  {t("completedSub")}
                </p>

                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full bg-black hover:bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-4 rounded-full cursor-pointer shadow-md active:scale-95 transition-all text-center"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Complete Session
                </button>
              </div>
            )}

            {/* SUCCESS PANEL (Yoga) */}
            {showHoldSuccess && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-6 bg-white">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-bounce shadow-lg"
                  style={{ backgroundColor: selectedExercise.accent }}
                >
                  ✓
                </div>

                <h3
                  className="text-2xl font-black uppercase tracking-tight"
                  style={{ color: selectedExercise.accent, fontFamily: "var(--font-anton), Impact, sans-serif" }}
                >
                  Pose Conquered!
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs font-semibold">
                  You completed the hold session successfully. Your prefrontal neural pathways are growing stronger!
                </p>

                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full bg-black hover:bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-4 rounded-full cursor-pointer shadow-md active:scale-95 transition-all text-center"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Complete Session
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODAL 3: Sensory Grounding Checklist */}
      {showGroundingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1a2e]/95 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-md bg-white border border-gray-150 shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-[2rem] p-6 md:p-8 relative my-auto">

            <button
              onClick={() => setShowGroundingModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full bg-slate-50 hover:bg-slate-100 font-bold cursor-pointer text-xs text-gray-500"
            >
              ✕
            </button>

            <div className="flex flex-col gap-5 pt-2">
              <span className="bg-[#059669] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full self-start">
                Sensory Grounding
              </span>

              <h3 className="text-2xl font-black text-[#1a1a2e] leading-none" style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}>
                5-4-3-2-1 GROUNDING
              </h3>

              <p className="text-gray-500 text-xs leading-relaxed font-semibold">
                Disconnect from screens and reconnect with your immediate surroundings. Perform these sensory check-ins:
              </p>

              <div className="flex flex-col gap-2.5">
                {groundingSteps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => toggleGroundingStep(step.id)}
                    className={`p-3 border rounded-2xl transition-all flex items-start gap-3 select-none cursor-pointer ${step.checked
                        ? "bg-emerald-50/50 border-emerald-500/30"
                        : "bg-slate-50/70 border-slate-100 hover:bg-slate-100/50"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={step.checked}
                      onChange={() => { }}
                      className="mt-0.5 h-4 w-4 rounded-full border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer pointer-events-none"
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${step.checked ? "text-emerald-800" : "text-[#1a1a2e]"
                        }`}>
                        {step.category}
                      </span>
                      <span className={`text-[10.5px] leading-snug ${step.checked ? "text-emerald-700/80 line-through opacity-70" : "text-gray-500"
                        }`}>
                        {step.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {allGroundingChecked ? (
                <button
                  onClick={completeGrounding}
                  className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-widest py-3.5 mt-2 cursor-pointer shadow-md rounded-full"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Complete Session
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest py-3.5 mt-2 cursor-not-allowed rounded-full text-center"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Complete all steps
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
