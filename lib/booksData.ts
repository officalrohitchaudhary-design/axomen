export type Book = {
  id: number;
  slug: string;
  title: string;
  author: string;
  authorBio: string;
  language: string;
  price: number;
  originalPrice: number;
  kindlePrice: number;
  kindleOriginalPrice: number;
  /** Default (English) cover image URL */
  coverUrl: string;
  /** Per-UI-language cover overrides. Keys are hyi-lang codes: "hi", "pa", "ta", etc. */
  covers?: Partial<Record<string, string>>;
  coverBg: string;
  description: string;
  longDescription: string;
  rating: number;
  reviews: number;
  badge?: string;
  pages: number;
  publisher: string;
  year: number;
  highlights: string[];
  tags: string[];
  /** Default (English) PDF URL */
  pdfUrl?: string;
  /** Per-UI-language PDF overrides. Keys are hyi-lang codes: "hi", "pa", "ta", etc. */
  pdfs?: Partial<Record<string, string>>;
};

/** Resolves the correct cover image for the active UI language.
 *  Falls back to coverUrl (English default) if no override exists. */
export function getBookCover(book: Book, uiLangCode: string): string {
  return book.covers?.[uiLangCode] || book.coverUrl;
}

/** Resolves the correct PDF for the active UI language.
 *  Falls back to pdfUrl (English default) if no override exists. */
export function getBookPdf(book: Book, uiLangCode: string): string | undefined {
  return book.pdfs?.[uiLangCode] || book.pdfUrl;
}

export const LANGUAGES = [
  { id: "all", label: "All Books", nativeLabel: "All", letter: "✦", iconBg: "#1a1a2e", iconColor: "#fbe400", accent: "#1a1a2e", cardBg: "#fbe400" },
  { id: "hindi", label: "हिन्दी", nativeLabel: "हिन्दी", letter: "ह", iconBg: "#c0392b", iconColor: "#fff", accent: "#c0392b", cardBg: "#fef2f2" },
  { id: "english", label: "English", nativeLabel: "English", letter: "E", iconBg: "#1e6b80", iconColor: "#fff", accent: "#1e6b80", cardBg: "#eff9fb" },
  { id: "tamil", label: "தமிழ்", nativeLabel: "தமிழ்", letter: "த", iconBg: "#7c3aed", iconColor: "#fff", accent: "#7c3aed", cardBg: "#f5f3ff" },
  { id: "telugu", label: "తెలుగు", nativeLabel: "తెలుగు", letter: "త", iconBg: "#b45309", iconColor: "#fff", accent: "#b45309", cardBg: "#fffbeb" },
  { id: "marathi", label: "मराठी", nativeLabel: "मराठी", letter: "म", iconBg: "#065f46", iconColor: "#fff", accent: "#065f46", cardBg: "#ecfdf5" },
];

export const BOOKS: Book[] = [
  {
    id: 1,
    slug: "What-Is-Porn-Really",
    title: "What Is Porn Really?",
    author: "AxoMen Editorial",
    authorBio: "AxoMen Editorial team produces evidence-informed books on habit neuroscience, urge control, and men's sexual health recovery.",
    language: "english",
    price: 1099,
    originalPrice: 499,
    kindlePrice: 199,
    kindleOriginalPrice: 249,
    coverUrl: "/image/books/book1-en.webp",
    covers: {
      hi: "/image/books/book1-hi.webp",
    },
    pdfUrl: "/image/books/whatisporn-english.pdf",
    pdfs: {
      hi: "/image/books/whatisporn-hindi.pdf",
    },
    coverBg: "#1a1a2e",
    description: "Build unbreakable habits and reclaim control of your life through the science of self-discipline.",
    longDescription: "The Power of Discipline is a practical, no-nonsense guide for anyone who wants to build a better life through consistent self-control. This book breaks down the neuroscience of habit formation, explains why willpower depletes, and gives you proven frameworks to stay disciplined even when motivation disappears. Perfect for young Indians battling addiction, procrastination, or lack of focus.",
    rating: 4.8,
    reviews: 1240,
    badge: "Bestseller",
    pages: 22,
    publisher: "AxoMen Press",
    year: 2026,
    highlights: [
      "Neuroscience behind self-discipline & habit loops",
      "5-step framework to build lasting daily routines",
      "How to break the dopamine trap of digital addiction",
      "Real case studies from young Indians",
      "30-day discipline challenge included",
    ],
    tags: ["Self-Help", "Habits", "Discipline", "Mental Health"],
  },
  {
    id: 2,
    slug: "Your-Brain-on-Porn",
    title: "Your Brain on Porn",
    author: "AxoMen",
    authorBio: "Brian Tracy is one of the world's top business speakers and personal development authors. With over 80 books published, his work has transformed millions of lives globally.",
    language: "english",
    price: 1099,
    originalPrice: 1099,
    kindlePrice: 199,
    kindleOriginalPrice: 199,
    coverUrl: "/image/books/brainonporn-en.webp",
    covers: {
      hi: "/image/books/brainonporn-hi.webp",
    },
    pdfUrl: "/image/books/brainonporn-en.pdf",
    pdfs: {
      hi: "/image/books/brainonporn-hi.pdf",
    },
    coverBg: "#27849d",
    description: "Practical skills every young person needs to build a successful, addiction-free life.",
    longDescription: "In a rapidly changing world, the skills that matter most are not taught in school. This book reveals 10 essential life skills — from emotional regulation and focus to communication and resilience — that will set you apart. Written with India's youth in mind, it connects modern science with real-world application to help you break free from bad habits and build the life you deserve.",
    rating: 4.7,
    reviews: 980,
    badge: "Top Pick",
    pages: 28,
    publisher: "AxoMen Press",
    year: 2026,
    highlights: [
      // "10 skills not taught in school but critical for success",
      // "Emotional regulation techniques for young adults",
      // "How to rewire your brain away from instant gratification",
      // "Communication and confidence-building exercises",
      // "Action plans at the end of each chapter",
    ],
    tags: ["Skills", "Self-Help", "Youth", "Success"],
  },
  {
    id: 3,
    slug: "slient-killer",
    title: "Silent Killer",
    author: "AxoMen",
    authorBio: "Brian Tracy is one of the world's top business speakers and personal development authors. With over 80 books published, his work has transformed millions of lives globally.",
    language: "english",
    price: 1099,
    originalPrice: 1099,
    kindlePrice: 199,
    kindleOriginalPrice: 199,
    coverUrl: "/image/books/slientkiller-en.webp",
    covers: {
      hi: "/image/books/slientkiller-hi.webp",
    },
    pdfUrl: "/image/books/slientkiller-en.pdf",
    pdfs: {
      hi: "/image/books/slientkiller-hi.pdf",
    },
    coverBg: "#27849d",
    description: "Practical skills every young person needs to build a successful, addiction-free life.",
    longDescription: "In a rapidly changing world, the skills that matter most are not taught in school. This book reveals 10 essential life skills — from emotional regulation and focus to communication and resilience — that will set you apart. Written with India's youth in mind, it connects modern science with real-world application to help you break free from bad habits and build the life you deserve.",
    rating: 4.7,
    reviews: 980,
    badge: "Top Pick",
    pages: 28,
    publisher: "AxoMen Press",
    year: 2026,
    highlights: [
      // "10 skills not taught in school but critical for success",
      // "Emotional regulation techniques for young adults",
      // "How to rewire your brain away from instant gratification",
      // "Communication and confidence-building exercises",
      // "Action plans at the end of each chapter",
    ],
    tags: ["Skills", "Self-Help", "Youth", "Success"],
  },
  {
    id: 4,
    slug: "why-failed",
    title: "Why You Fail Every Time",
    author: "AxoMen",
    authorBio: "Brian Tracy is one of the world's top business speakers and personal development authors. With over 80 books published, his work has transformed millions of lives globally.",
    language: "english",
    price: 1099,
    originalPrice: 1099,
    kindlePrice: 199,
    kindleOriginalPrice: 199,
    coverUrl: "/image/books/failbook-en.webp",
    covers: {
      hi: "/image/books/failbook-hi.webp",
    },
    pdfUrl: "/image/books/whyyoufailed_english.pdf",
    pdfs: {
      hi: "/image/books/whyyoufailed_hindi.pdf",
    },
    coverBg: "#27849d",
    description: "Practical skills every young person needs to build a successful, addiction-free life.",
    longDescription: "In a rapidly changing world, the skills that matter most are not taught in school. This book reveals 10 essential life skills — from emotional regulation and focus to communication and resilience — that will set you apart. Written with India's youth in mind, it connects modern science with real-world application to help you break free from bad habits and build the life you deserve.",
    rating: 4.7,
    reviews: 980,
    badge: "Top Pick",
    pages: 28,
    publisher: "AxoMen Press",
    year: 2026,
    highlights: [],
    tags: ["Skills", "Self-Help", "Youth", "Success"],
  },
  {
    id: 5,
    slug: "out-of-control",
    title: "Out of Control",
    author: "AxoMen",
    authorBio: "AxoMen is India's dedicated men's sexual health platform providing confidential recovery education and habit management.",
    language: "english",
    price: 1099,
    originalPrice: 1099,
    kindlePrice: 199,
    kindleOriginalPrice: 199,
    coverUrl: "/image/books/outofcontrol-en.webp",
    covers: {
      hi: "/image/books/outofcontrol-hi.webp",
    },
    pdfUrl: "/image/books/outofcontrol_English.pdf",
    pdfs: {
      hi: "/image/books/outofcontrol_Hindi.pdf",
    },
    coverBg: "#c0392b",
    description: "Understand why you feel out of control and discover the path back to a focused, free life.",
    longDescription: "Out of Control dives deep into the psychology of compulsive behaviour — why young men lose control over their urges, what brain science says about it, and how to systematically reclaim your focus and freedom. A raw, honest guide written for young India.",
    rating: 4.8,
    reviews: 860,
    pages: 28,
    publisher: "AxoMen Press",
    year: 2026,
    highlights: [],
    tags: ["Self-Help", "Recovery", "Mental Health", "Youth"],
  },
  {
    id: 6,
    slug: "quit-naturally",
    title: "Quit Naturally",
    author: "AxoMen",
    authorBio: "AxoMen is India's dedicated men's sexual health platform providing confidential recovery education and habit management.",
    language: "english",
    price: 1099,
    originalPrice: 1099,
    kindlePrice: 199,
    kindleOriginalPrice: 199,
    coverUrl: "/image/books/quit-en.webp",
    covers: {
      hi: "/image/books/quit-hi.webp",
    },
    pdfUrl: "/image/books/quit-English.pdf",
    pdfs: {
      hi: "/image/books/quit-Hindi.pdf",
    },
    coverBg: "#1a1a2e",
    description: "A step-by-step natural approach to quitting porn addiction — no willpower tricks, just science.",
    longDescription: "Quit Naturally presents a science-backed, shame-free method for breaking free from porn addiction. Based on neuroplasticity research and real recovery journeys from young Indians, this book gives you a realistic, sustainable path to quitting — naturally and permanently.",
    rating: 4.9,
    reviews: 1020,
    badge: "New",
    pages: 32,
    publisher: "AxoMen Press",
    year: 2026,
    highlights: [],
    tags: ["Recovery", "Self-Help", "Habit", "Freedom"],
  },
];
