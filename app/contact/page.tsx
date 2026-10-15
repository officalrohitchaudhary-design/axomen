"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* Top accent */}
      <div className="h-1 w-full bg-[#fbe400]" />

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-16 sm:py-24">
        <div className="w-full max-w-lg">

          {/* Heading */}
          <p
            className="text-[#1a1a2e]/35 text-xs font-black uppercase tracking-[0.3em] mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="text-[clamp(2rem,7vw,3.8rem)] leading-[0.92] uppercase text-[#1a1a2e] mb-2"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            {t("title")}
          </h1>
          <p
            className="text-gray-400 text-sm sm:text-base mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("subtitle")}
          </p>

          {sent ? (
            /* Success state */
            <div className="rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] px-7 py-10 flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#059669] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2
                className="text-[#1a1a2e] text-xl font-black"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("successTitle")}
              </h2>
              <p
                className="text-gray-500 text-sm leading-relaxed max-w-xs"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("successText", { email: email })}
              </p>
              <button
                onClick={() => { setSent(false); setEmail(""); setMessage(""); }}
                className="mt-2 text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("sendAnother")}
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-widest text-[#1a1a2e]/50"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {t("emailLabel")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 bg-[#f9fafb] rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#1a1a2e] focus:bg-white transition-all duration-200"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-bold uppercase tracking-widest text-[#1a1a2e]/50"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {t("messageLabel")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder={t("messagePlaceholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-200 bg-[#f9fafb] rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#1a1a2e] focus:bg-white transition-all duration-200 resize-none"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a1a2e] hover:bg-[#252540] disabled:opacity-60 text-white font-bold text-sm py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                    </svg>
                    {t("sending")}
                  </>
                ) : (
                  <>
                    {t("sendMessage")}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

            </form>
          )}

          {/* Alt contact */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#fbe400] flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <p
                className="text-[0.65rem] font-bold uppercase tracking-widest text-gray-400"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {t("orEmailDirect")}
              </p>
              <a
                href="mailto:support@axomen.com"
                className="text-sm font-semibold text-[#1a1a2e] hover:text-[#27849d] transition-colors"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                support@axomen.com
              </a>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}
