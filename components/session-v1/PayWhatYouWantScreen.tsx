"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Script from "next/script";
import { playZenTone } from "./audio";

interface PayWhatYouWantScreenProps {
  onComplete: (tier: string) => void | Promise<void>;
  userInitial?: string;
  email?: string;
  name?: string;
  gender?: string;
  age?: string;
}

export default function PayWhatYouWantScreen({
  onComplete,
  userInitial = "R",
  email,
  name,
  gender,
  age,
}: PayWhatYouWantScreenProps) {
  // Default selected tier is Free as requested
  const [selectedTier, setSelectedTier] = useState<string>("Free");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const hasBookedRef = useRef<boolean>(false);
  const hasCompletedRef = useRef<boolean>(false);

  const tiers = [
    {
      id: "free",
      label: "Free",
      isFree: true,
      popular: false,
      disabled: false,
      helperText: "This free option ensures you can start your recovery journey with zero barriers.",
    },
    {
      id: "1999",
      label: "₹1,999",
      isFree: false,
      popular: false,
      disabled: true,
      helperText: "This option helps us cover our counselor guidance and platform maintenance.",
    },
    {
      id: "4000",
      label: "₹4,000",
      isFree: false,
      popular: false,
      disabled: true,
      helperText: "This option will help us support those who need to select the lowest trial prices",
    },
  ];

  const handleTierClick = (label: string, disabled?: boolean) => {
    if (disabled) return;
    playZenTone();
    setSelectedTier(label);
  };

  const finishBooking = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    try {
      onComplete(selectedTier);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  }, [onComplete, selectedTier]);

  const handleModalClose = useCallback(() => {
    if (hasBookedRef.current) {
      finishBooking();
    } else {
      // User closed the popup without completing a booking: stay on screen & re-enable button
      setIsSubmitting(false);
    }
  }, [finishBooking]);

  const handleBookingSuccess = useCallback(() => {
    hasBookedRef.current = true;
  }, []);

  useEffect(() => {
    // 1. Listen for iframe postMessage from Zyncro
    const handleMessage = (e: MessageEvent) => {
      const data = e.data;
      if (
        data === "zyncro:booking-confirmed" ||
        data?.type === "zyncro:booking-confirmed" ||
        data?.type === "zyncro:bookingSuccessful"
      ) {
        handleBookingSuccess();
      }
    };
    window.addEventListener("message", handleMessage);

    // 2. Listen to Zyncro SDK events if window.Zyncro exists
    const win = typeof window !== "undefined" ? (window as any) : null;
    if (win?.Zyncro?.on) {
      try {
        win.Zyncro.on("bookingSuccessful", handleBookingSuccess);
        win.Zyncro.on("modalClose", handleModalClose);
      } catch (err) {
        console.warn("[Zyncro] Event listener error:", err);
      }
    }

    // 3. Fallback: MutationObserver to detect when modal overlay is removed from DOM
    let modalWasOpen = false;
    const observer = new MutationObserver(() => {
      const modalEl = document.querySelector(".zyncro-modal-overlay");
      if (modalEl) {
        modalWasOpen = true;
      } else if (modalWasOpen) {
        modalWasOpen = false;
        setTimeout(() => {
          handleModalClose();
        }, 80);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("message", handleMessage);
      observer.disconnect();
      if (win?.Zyncro?.off) {
        try {
          win.Zyncro.off("bookingSuccessful", handleBookingSuccess);
          win.Zyncro.off("modalClose", handleModalClose);
        } catch { }
      }
    };
  }, [handleBookingSuccess, handleModalClose]);

  const handleSeeMyPlan = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    hasBookedRef.current = false;
    hasCompletedRef.current = false;
    playZenTone();

    // 1. Silently save/record the lead in background
    try {
      const saved = localStorage.getItem("hyi_session_v1_data");
      const parsed = saved ? JSON.parse(saved) : {};
      const leadData = {
        name: name || parsed.name || "Anonymous",
        email: email || parsed.email || "",
        gender: gender || parsed.answers?.["q_gender"] || "",
        age: age || parsed.answers?.["q_age"] || "",
        serviceType: parsed.serviceType || "individual",
        problemType: parsed.problemType || "porn",
        priceTier: selectedTier,
        answers: parsed.answers || {},
        submittedAt: new Date().toISOString(),
        bookingStatus: "pending",
      };
      localStorage.setItem("hyi_session_v1_lead", JSON.stringify(leadData));
      fetch("/api/session-v1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      }).catch(() => { });
    } catch { }

    // 2. Open the Zyncro booking modal popup
    const openPopup = (zyncroSdk: any) => {
      try {
        zyncroSdk.popup({
          url: "zyncro.in/axomen/booking",
          color: "#7c3aed",
          prefill: {
            name: name || "",
            email: email || "",
          },
          onBookingSuccessful: () => {
            handleBookingSuccess();
          },
          onClose: () => {
            handleModalClose();
          },
        });
      } catch (err) {
        console.error("[Zyncro] Error calling popup:", err);
        setIsSubmitting(false);
      }
    };

    if (typeof window !== "undefined") {
      const win = window as any;
      if (win.Zyncro && typeof win.Zyncro.popup === "function") {
        openPopup(win.Zyncro);
      } else {
        // Poll for Zyncro SDK to finish loading
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (win.Zyncro && typeof win.Zyncro.popup === "function") {
            clearInterval(interval);
            openPopup(win.Zyncro);
          } else if (attempts >= 15) {
            clearInterval(interval);
            const trigger = document.getElementById("zyncro-booking-trigger") as HTMLAnchorElement | null;
            if (trigger) {
              trigger.click();
            } else {
              setIsSubmitting(false);
              window.open("https://zyncro.in/axomen/booking", "_blank");
            }
          }
        }, 120);
      }
    }
  };

  const activeTierObj = tiers.find((t) => t.label === selectedTier) || tiers[0];

  return (
    <div className="flex flex-col justify-between h-full w-full select-none animate-fadeIn overflow-hidden bg-white relative">
      {/* ── TOP HEADER (Logo + User Profile) ── */}
      <div className="w-full flex items-center justify-between px-6 pt-4 sm:pt-5 flex-shrink-0 z-20">
        {/* Left: AxoMen Logo */}
        <img
          src="/image/axomen-logo.png"
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

      {/* ── CONTENT AREA (Headline, Subtitles, Pricing Cards, CTA) ── */}
      <div className="w-full flex-1 flex flex-col items-center px-5 sm:px-6 pt-2 sm:pt-3 z-10 pt-10">
        {/* Headline */}
        <h1 className="text-[26px] sm:text-[30px] font-black text-[#111827] tracking-tight text-center leading-tight mb-2">
          Pay what you want
        </h1>

        {/* Subtitle 1 */}
        <p className="mt-2 sm:mt-2.5 text-[13px] sm:text-[14px] font-medium text-[#4b5563] text-center leading-snug max-w-[340px]">
          Start with your first session completely free — you don’t need to pay anything.


        </p>

        {/* Subtitle 2 */}
        <p className="mt-1.5 text-[12px] sm:text-[12.5px] font-normal text-[#6b7280] text-center leading-snug max-w-[330px] mb-2">
          If you find the session helpful and like our approach, you can choose an amount you’re comfortable paying to continue.
        </p>

        {/* ── 3 PRICING CARDS (Free / ₹1,999 [Disabled] / ₹4,000 [Disabled]) ── */}
        <div className="w-full max-w-[340px] grid grid-cols-3 gap-2.5 sm:gap-3 mt-4 sm:mt-5 items-end">
          {tiers.map((t) => {
            const isSelected = selectedTier === t.label;

            // Disabled options (₹1,999 and ₹4,000)
            if (t.disabled) {
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full h-[80px] sm:h-[88px] rounded-[18px] sm:rounded-[20px] bg-[#f1f3f7] border border-gray-200/80 flex items-center justify-center px-1 opacity-50 cursor-not-allowed select-none shadow-none"
                >
                  <span className="text-[15px] sm:text-[17px] font-bold text-gray-400 tracking-tight">
                    {t.label}
                  </span>
                </button>
              );
            }

            if (isSelected) {
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTierClick(t.label, t.disabled)}
                  className="relative w-full h-[88px] sm:h-[96px] rounded-[18px] sm:rounded-[20px] bg-[#ffebde] border-2 border-[#ff6a04] flex flex-col items-center justify-center overflow-hidden shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
                >
                  {/* Amount */}
                  <div className="w-full flex-1 flex items-center justify-center px-1">
                    <span className="text-[17px] sm:text-[19px] font-bold text-[#ff6a04] tracking-tight">
                      {t.label}
                    </span>
                  </div>
                </button>
              );
            }

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleTierClick(t.label, t.disabled)}
                className="w-full h-[80px] sm:h-[88px] rounded-[18px] sm:rounded-[20px] bg-[#e1f1ff] border border-blue-100/80 flex items-center justify-center px-1 shadow-sm hover:bg-[#d5ebff] active:scale-95 transition-all duration-150 cursor-pointer"
              >
                <span className="text-[16px] sm:text-[18px] font-bold text-[#2f669c] tracking-tight">
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── HELPER TEXT & ORANGE CURVED ARROW ── */}
        <div className="w-full max-w-[340px] flex items-center justify-center gap-2 mt-3 sm:mt-3.5 min-h-[38px] px-2">
          <p className="text-[11.5px] sm:text-[12px] font-bold text-[#ff6f1b] leading-tight text-center flex-1">
            {activeTierObj.helperText}
          </p>
          <div className="flex-shrink-0 flex items-center justify-center">
            <svg
              width="31"
              height="29"
              viewBox="0 0 31 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto"
            >
              <path
                d="M1.69502 26.4129C-0.888864 23.9766 3.39056 24.5221 4.79171 24.7355C7.58772 25.1613 10.3132 24.1453 12.5464 22.4991C14.6408 20.955 16.1459 18.6739 17.1483 16.2715C17.5035 15.4196 18.5385 8.09818 18.2097 8.21583C17.4709 8.47804 15.9954 11.7994 15.4683 12.4842C14.6187 13.5885 12.1581 16.2659 10.4974 14.8563C9.17811 13.736 10.4308 12.2891 11.1327 11.3061C12.5315 9.34632 13.5837 7.29087 14.8509 5.25676C15.7192 3.86295 16.3077 1.58119 17.7729 0.77963C19.4255 -0.124989 19.8426 1.12772 20.7599 2.28957C21.7943 3.60029 22.7871 4.59716 24.2147 5.44561C25.0467 5.94018 25.9487 6.43999 26.8616 6.77672C27.7507 7.10424 29.0871 6.96165 29.8521 7.30691C31.2753 7.95049 31.1718 8.86536 29.4519 9.55548C27.5417 10.3216 25.1788 9.33114 23.4203 8.65725C21.1053 7.76969 22.1402 9.15186 22.2918 11.115C22.4777 13.5159 22.2013 15.6664 21.3735 17.9182C18.8561 24.7673 8.717 33.0336 1.69609 26.4139L1.69502 26.4129Z"
                fill="#FF6A04"
              />
            </svg>
          </div>
        </div>

        {/* ── PRIMARY ACTION BUTTON: Get Session Now ── */}
        <div className="w-full flex items-center justify-center mt-3 sm:mt-4">
          <button
            type="button"
            onClick={handleSeeMyPlan}
            disabled={isSubmitting}
            id="see-my-plan-btn"
            className="w-full max-w-[240px] py-3.5 px-6 rounded-2xl bg-[#ff6a04] text-white font-bold text-[16px] sm:text-[17px] tracking-wide shadow-lg shadow-[#ff6a04]/30 hover:bg-[#e85e00] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center disabled:opacity-85 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Opening Booking...</span>
              </>
            ) : (
              <span>Get Session Now</span>
            )}
          </button>
        </div>

        {/* Hidden Zyncro trigger anchor & script */}
        <a
          id="zyncro-booking-trigger"
          data-zyncro-popup=""
          data-zyncro-url="zyncro.in/axomen/booking"
          data-zyncro-color="#1a5bd9"
          data-zyncro-text="Book a call"
          data-zyncro-name={name || ""}
          data-zyncro-email={email || ""}
          href="#"
          className="hidden pointer-events-none"
          aria-hidden="true"
          tabIndex={-1}
        >
          Book a call
        </a>
        <Script src="https://zyncro.in/embed.js" strategy="afterInteractive" />
      </div>

      {/* ── BOTTOM LANDSCAPE IMAGE: pwyw-bg-mobile.webp (Strictly pinned at bottom) ── */}
      <div className="w-full relative mt-auto flex-shrink-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/image/pwyw-bg-mobile.webp"
          alt="Peaceful nature landscape"
          className="w-full h-auto max-h-[170px] sm:max-h-[195px] object-cover object-top"
          loading="eager"
        />
      </div>
    </div>
  );
}
