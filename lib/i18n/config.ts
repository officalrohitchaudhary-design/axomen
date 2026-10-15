export const LOCALES = ["en", "hi", "pa", "bn", "ta"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const STORAGE_KEY = "hyi-lang";

export const LOCALE_META: Record<
  Locale,
  { label: string; native: string; short: string }
> = {
  en: { label: "English", native: "English",  short: "EN" },
  hi: { label: "Hindi",   native: "हिंदी",    short: "HI" },
  pa: { label: "Punjabi", native: "ਪੰਜਾਬੀ",  short: "ਪੰ" },
  bn: { label: "Bengali", native: "বাংলা",    short: "বা" },
  ta: { label: "Tamil",   native: "தமிழ்",   short: "த"  },
};

export function resolveLocale(code: string | null | undefined): Locale {
  return code && (LOCALES as readonly string[]).includes(code)
    ? (code as Locale)
    : DEFAULT_LOCALE;
}
