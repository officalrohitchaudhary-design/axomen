"use client";

import { useState, useEffect } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import {
  LOCALES,
  DEFAULT_LOCALE,
  STORAGE_KEY,
  resolveLocale,
  type Locale,
} from "@/lib/i18n/config";
import enMessages from "@/messages/en.json";

const messageLoaders: Record<Locale, () => Promise<AbstractIntlMessages>> = {
  en: async () => enMessages as unknown as AbstractIntlMessages,
  hi: () => import("@/messages/hi.json").then((m) => m.default as unknown as AbstractIntlMessages),
  pa: () => import("@/messages/pa.json").then((m) => m.default as unknown as AbstractIntlMessages),
  bn: () => import("@/messages/bn.json").then((m) => m.default as unknown as AbstractIntlMessages),
  ta: () => import("@/messages/ta.json").then((m) => m.default as unknown as AbstractIntlMessages),
};

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [messages, setMessages] = useState<AbstractIntlMessages>(
    enMessages as AbstractIntlMessages
  );

  // Load locale from localStorage on mount
  useEffect(() => {
    const saved = resolveLocale(localStorage.getItem(STORAGE_KEY));
    if (saved === DEFAULT_LOCALE) return;
    setLocale(saved);
    messageLoaders[saved]().then(setMessages);
    document.documentElement.lang = saved;
  }, []);

  // Sync with LanguageSwitcher events
  useEffect(() => {
    const handler = (e: Event) => {
      const code = resolveLocale((e as CustomEvent<{ code: string }>).detail.code);
      setLocale(code);
      document.documentElement.lang = code;
      messageLoaders[code]().then(setMessages);
    };
    window.addEventListener("hyi:lang-picked", handler);
    return () => window.removeEventListener("hyi:lang-picked", handler);
  }, []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Kolkata">
      {children}
    </NextIntlClientProvider>
  );
}
