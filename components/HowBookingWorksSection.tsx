"use client";

import { useState } from "react";
import Image from "next/image";

interface StepItem {
  id: number;
  title: string;
  description: string;
  backdropColor: string;
  phoneMockup: React.ReactNode;
}

export default function HowBookingWorksSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: StepItem[] = [
    {
      id: 1,
      title: "Choose your session",
      description:
        "Click on Book Free Session and choose your session type — Individual, Couples, or Teen.",
      backdropColor: "bg-[#dcefe9]",
      phoneMockup: (
        <div className="w-[195px] sm:w-[205px] h-[395px] sm:h-[415px] border-[3px] border-[#0a3528] rounded-[36px] bg-white overflow-hidden shadow-lg flex flex-col relative select-none">
          {/* Status Bar */}
          <div className="pt-2 px-4 pb-1 flex items-center justify-between text-[#0a3528] font-bold text-[9px] bg-white shrink-0 z-10 border-b border-gray-100">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg width="10" height="8" viewBox="0 0 12 10" fill="currentColor">
                <rect x="0" y="6" width="2" height="4" rx="0.5" />
                <rect x="3" y="4" width="2" height="6" rx="0.5" />
                <rect x="6" y="2" width="2" height="8" rx="0.5" />
                <rect x="9" y="0" width="2" height="10" rx="0.5" />
              </svg>
              <svg width="10" height="8" viewBox="0 0 12 10" fill="currentColor">
                <path d="M6 2C8.2 2 10.1 2.9 11.5 4.3L6 10L0.5 4.3C1.9 2.9 3.8 2 6 2Z" />
              </svg>
              <div className="w-4 h-2 border border-[#0a3528] rounded-xs p-0.5 flex items-center">
                <div className="w-2.5 h-full bg-[#0a3528] rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Screen Image: session-screen.png (object-contain so no sides are cut off) */}
          <div className="relative flex-1 w-full bg-white overflow-hidden flex items-start justify-center">
            <Image
              src="/image/session-screen.png"
              alt="Choose your recovery session"
              fill
              className="object-contain object-top"
              sizes="210px"
              priority
            />
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Take free assessment",
      description:
        "Answer a few private questions online and submit your details so our team can prepare your session.",
      backdropColor: "bg-[#e8f575]",
      phoneMockup: (
        <div className="w-[195px] sm:w-[205px] h-[395px] sm:h-[415px] border-[3px] border-[#0a3528] rounded-[36px] bg-white overflow-hidden shadow-lg flex flex-col relative select-none">
          {/* Status Bar */}
          <div className="pt-2 px-4 pb-1 flex items-center justify-between text-[#0a3528] font-bold text-[9px] bg-white shrink-0 z-10 border-b border-gray-100">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg width="10" height="8" viewBox="0 0 12 10" fill="currentColor">
                <rect x="0" y="6" width="2" height="4" rx="0.5" />
                <rect x="3" y="4" width="2" height="6" rx="0.5" />
                <rect x="6" y="2" width="2" height="8" rx="0.5" />
                <rect x="9" y="0" width="2" height="10" rx="0.5" />
              </svg>
              <svg width="10" height="8" viewBox="0 0 12 10" fill="currentColor">
                <path d="M6 2C8.2 2 10.1 2.9 11.5 4.3L6 10L0.5 4.3C1.9 2.9 3.8 2 6 2Z" />
              </svg>
              <div className="w-4 h-2 border border-[#0a3528] rounded-xs p-0.5 flex items-center">
                <div className="w-2.5 h-full bg-[#0a3528] rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Screen Image: session-screen2.png (object-contain so no sides are cut off) */}
          <div className="relative flex-1 w-full bg-white overflow-hidden flex items-start justify-center">
            <Image
              src="/image/session-screen2.png"
              alt="Take free assessment"
              fill
              className="object-contain object-top"
              sizes="210px"
              priority
            />
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Start Session",
      description:
        "Communicate with your therapist through live sessions, messaging, or both.",
      backdropColor: "bg-[#8ce1ac]",
      phoneMockup: (
        <div className="relative flex justify-center select-none">
          <Image
            src="/image/video-call.png"
            alt="Live 1-on-1 recovery video session"
            width={205}
            height={440}
            className="w-[195px] sm:w-[205px] h-auto object-contain drop-shadow-md select-none"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>
      ),
    },
  ];

  return (
    <section
      id="how-to-book-session"
      className="w-full bg-[#fbf7e2] py-14 sm:py-18 md:py-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading matching the serif style in the reference image */}
        <h2 className="text-[#0a3528] text-center text-3xl sm:text-4xl md:text-[44px] font-serif font-normal tracking-tight mb-10 sm:mb-14 md:mb-16">
          Here’s how it works
        </h2>

        {/* ── DESKTOP VIEW (>= lg): All 3 steps side-by-side matching web screenshot ── */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              {/* Stepped Colored Backdrop & Phone Mockup Container */}
              <div className="relative w-[280px] sm:w-[310px] h-[410px] sm:h-[430px] flex items-end justify-center mb-6 sm:mb-8">
                {/* Main backdrop block */}
                <div
                  className={`absolute inset-x-3.5 bottom-0 h-[320px] sm:h-[345px] rounded-t-3xl ${step.backdropColor}`}
                />
                {/* Stepped side wings matching screenshot pedestal */}
                <div
                  className={`absolute left-0 bottom-0 w-4 h-5 rounded-tl-lg ${step.backdropColor}`}
                />
                <div
                  className={`absolute right-0 bottom-0 w-4 h-5 rounded-tr-lg ${step.backdropColor}`}
                />
                <div
                  className={`absolute inset-x-0 bottom-0 h-5 ${step.backdropColor}`}
                />

                {/* Centered Phone Mockup resting cleanly above the bottom edge */}
                <div className="relative z-10 mb-1 sm:mb-1.5">{step.phoneMockup}</div>
              </div>

              {/* Step Title & Description with ample clear spacing */}
              <div className="max-w-[310px] text-center px-2">
                <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-[#0a3528] tracking-tight mb-2.5">
                  {step.title}
                </h3>
                <p
                  className="text-xs sm:text-sm text-[#0a3528]/85 font-medium leading-relaxed"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── MOBILE VIEW (< lg): Carousel with dots matching mobile screenshot ── */}
        <div className="block lg:hidden max-w-md mx-auto">
          {/* Active Card */}
          <div className="flex flex-col items-center text-center">
            {/* Stepped Colored Backdrop & Phone Mockup Container */}
            <div className="relative w-[280px] sm:w-[310px] h-[410px] sm:h-[430px] flex items-end justify-center mb-6">
              {/* Main backdrop block */}
              <div
                className={`absolute inset-x-3.5 bottom-0 h-[320px] sm:h-[345px] rounded-t-3xl ${steps[activeStep].backdropColor} transition-colors duration-300`}
              />
              {/* Stepped side wings */}
              <div
                className={`absolute left-0 bottom-0 w-4 h-5 rounded-tl-lg ${steps[activeStep].backdropColor} transition-colors duration-300`}
              />
              <div
                className={`absolute right-0 bottom-0 w-4 h-5 rounded-tr-lg ${steps[activeStep].backdropColor} transition-colors duration-300`}
              />
              <div
                className={`absolute inset-x-0 bottom-0 h-5 ${steps[activeStep].backdropColor} transition-colors duration-300`}
              />

              {/* Centered Phone Mockup resting cleanly above the bottom edge */}
              <div className="relative z-10 mb-1 sm:mb-1.5 transition-all duration-300">
                {steps[activeStep].phoneMockup}
              </div>
            </div>

            {/* Step Title & Description with ample clear spacing */}
            <div className="max-w-[300px] min-h-[90px] px-2">
              <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-[#0a3528] tracking-tight mb-2">
                {steps[activeStep].title}
              </h3>
              <p
                className="text-xs sm:text-sm text-[#0a3528]/85 font-medium leading-relaxed"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {steps[activeStep].description}
              </p>
            </div>
          </div>

          {/* Pagination Carousel Dots matching mobile screenshot (○ ○ ●) */}
          <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                aria-label={`Go to step ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${activeStep === idx
                  ? "w-3 h-3 bg-[#0a3528]"
                  : "w-2.5 h-2.5 bg-transparent border-2 border-[#0a3528]/60 hover:border-[#0a3528]"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
