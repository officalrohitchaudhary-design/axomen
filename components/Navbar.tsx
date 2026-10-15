"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface SearchItem {
  title: string;
  desc: string;
  href: string;
  category: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  const desktopLinks = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Porn Support", href: "/services/porn-habit-support" },
    { label: "Masturbation Support", href: "/services/masturbation-habit-support" },
    { label: "Books", href: "/books" },
    { label: "Exercises", href: "/exercises" },
    { label: "FAQs", href: "/faqs" },
    { label: "Stories", href: "/stories" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  const drawerLinks = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Porn Habit Support", href: "/services/porn-habit-support" },
    { label: "Masturbation Habit Support", href: "/services/masturbation-habit-support" },
    { label: "Combined Support", href: "/services/porn-and-masturbation-support" },
    { label: "Books", href: "/books" },
    { label: "Exercises", href: "/exercises" },
    { label: "FAQs", href: "/faqs" },
    { label: "Real Stories", href: "/stories" },
    { label: "Recovery Blog", href: "/blog" },
    { label: "About AxoMen", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  const searchItems: SearchItem[] = [
    {
      title: "Book a Free Session",
      desc: "1-on-1 confidential recovery consultation with specialists",
      href: "/booking",
      category: "Consultation",
    },
    {
      title: "Masturbation Addiction Treatment in India",
      desc: "Confidential 1-on-1 habit recovery support and urge control guidance",
      href: "/services/masturbation-habit-support",
      category: "Services",
    },
    {
      title: "Online Porn Counselling",
      desc: "Confidential 1-on-1 habit recovery support for compulsive porn use",
      href: "/services/porn-habit-support",
      category: "Services",
    },
    {
      title: "Online Sex & Intimacy Counselling",
      desc: "Confidential guidance for couples to restore emotional connection",
      href: "/couples",
      category: "Couples",
    },
    {
      title: "Addiction Self-Assessment",
      desc: "Evaluate habit patterns and discover your recovery timeline",
      href: "/assessment",
      category: "Test",
    },
    {
      title: "Recovery Books & Frameworks",
      desc: "Structured guides to dismantle the compulsive habit loop",
      href: "/books",
      category: "Books",
    },
    {
      title: "AxoMen Podcast Episodes",
      desc: "Deep-dive conversations on neurobiology, mindset & freedom",
      href: "/podcast",
      category: "Podcast",
    },
    {
      title: "Urge Surfing & Breathing Tools",
      desc: "Immediate physical techniques to ride out intense urges",
      href: "/exercises",
      category: "Exercises",
    },
    {
      title: "Real Stories of Recovery",
      desc: "Inspiring transformations from men who broke free",
      href: "/stories",
      category: "Stories",
    },
    {
      title: "Science & Recovery Blog",
      desc: "Learn how porn impacts dopamine, memory, and relationships",
      href: "/blog",
      category: "Articles",
    },
    {
      title: "Join the Movement",
      desc: "Stand with thousands of youth reclaiming their focus & energy",
      href: "/join",
      category: "Movement",
    },
    {
      title: "Contact & Confidential Help",
      desc: "Reach out to our confidential support desk directly",
      href: "/contact",
      category: "Support",
    },
  ];

  const filteredSearchItems = searchQuery.trim()
    ? searchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : searchItems;

  const open = () => {
    setAnimating(true);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => setIsOpen(true)));
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setAnimating(false);
      document.body.style.overflow = "";
    }, 380);
  };

  const handleNav = (href: string) => {
    close();
    setTimeout(() => {
      if (href.startsWith("#")) {
        document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
      } else if (href === pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push(href);
      }
    }, 280);
  };

  // Keyboard escape & shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isOpen) close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isOpen]);

  // Listen for open-search event from TopBar or other components
  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  // Clean up overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Reset drawer and search when pathname changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setAnimating(false);
    setIsSearchOpen(false);
  }

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-[100] w-full select-none">
        {/* ── 2. Main Navbar Row ────────────────────────────────────────────── */}
        <div className="bg-white shadow-[0_1px_0_0_#e5e7eb]">
          <div className="w-[92%] max-w-[1400px] mx-auto flex items-center justify-between h-[64px] sm:h-[70px] lg:h-[76px] gap-3 sm:gap-4">
            {/* Logo */}
            <Link
              href="/"
              aria-label={t("logoAriaLabel")}
              className="flex items-center shrink-0 group py-2"
            >
              <Image
                src="/image/axomen-logo.png"
                alt="AxoMen — Men's Sexual Health Platform"
                width={100}
                height={100}
                className="h-10 sm:h-12 lg:h-14 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
                priority
              />
            </Link>

            {/* Desktop Nav Links (Hidden below lg) */}
            <nav
              className="hidden lg:flex flex-1 items-center justify-center gap-3.5 xl:gap-5 2xl:gap-7"
              aria-label={t("mainNavLabel")}
            >
              {desktopLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[11px] xl:text-[12px] 2xl:text-[12.5px] font-bold tracking-[0.08em] xl:tracking-[0.11em] uppercase pb-[2px] whitespace-nowrap transition-colors duration-200 ${isActive
                      ? "text-[#1a1a2e]"
                      : "text-[#1a1a2e]/70 hover:text-[#1a1a2e]"
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#16aee2] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side: 'GET A DEMO' style CTA Button + Burger Menu (Mobile & Web) */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0">
              {/* Mindbody 'GET A DEMO' Style Button */}
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-[#222222] hover:bg-[#383838] active:bg-[#111111] text-white text-[10.5px] sm:text-[11.5px] lg:text-[12.5px] font-extrabold uppercase tracking-[0.08em] sm:tracking-[0.12em] lg:tracking-[0.14em] px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-[2px] transition-colors duration-150 whitespace-nowrap shadow-xs"
              >
                Start Consultations
              </Link>

              {/* Mindbody 3-Line Gray Burger Icon */}
              <button
                type="button"
                aria-label={isOpen ? t("closeMenu") : t("openMenu")}
                onClick={isOpen ? close : open}
                className="flex flex-col justify-between items-center w-[25px] h-[17px] sm:w-[28px] sm:h-[19px] p-0 bg-transparent border-0 cursor-pointer select-none group transition-opacity hover:opacity-75 shrink-0"
              >
                <span className="w-full h-[2.5px] sm:h-[3px] bg-[#8e8e93] group-hover:bg-[#333333] rounded-full transition-colors duration-150" />
                <span className="w-full h-[2.5px] sm:h-[3px] bg-[#8e8e93] group-hover:bg-[#333333] rounded-full transition-colors duration-150" />
                <span className="w-full h-[2.5px] sm:h-[3px] bg-[#8e8e93] group-hover:bg-[#333333] rounded-full transition-colors duration-150" />
              </button>
            </div>

            {/* Language Switcher (Preserved for compatibility) */}
            <div className="hidden">
              <Suspense fallback={null}>
                <LanguageSwitcher />
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      {/* ── Slide-over Drawer / Mobile Menu (Unified & Responsive) ────────── */}
      {animating && (
        <div className="fixed inset-0 z-[200]">
          {/* Backdrop (clickable to close) */}
          <div
            onClick={close}
            className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
              }`}
          />

          {/* Drawer container (full-screen on mobile, right slide-panel on desktop) */}
          <div
            className={`fixed inset-y-0 right-0 w-full sm:max-w-[420px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out z-[201] ${isOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            {/* Drawer Top Bar */}
            <div className="w-[92%] mx-auto h-[64px] sm:h-[70px] flex items-center justify-between shrink-0 border-b border-black/[0.06]">
              <button
                aria-label={t("logoAriaLabel")}
                onClick={() => handleNav("/")}
                className="bg-transparent border-0 p-0 cursor-pointer shrink-0 flex items-center"
              >
                <Image
                  src="/image/axomen-logo.png"
                  alt="AxoMen — Men's Sexual Health Platform"
                  width={160}
                  height={45}
                  className="h-7 sm:h-8 w-auto"
                  priority
                />
              </button>

              <button
                onClick={close}
                aria-label={t("closeMenu")}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer select-none text-[#111]"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Quick CTA inside Drawer */}
            <div className="w-[92%] mx-auto pt-4 pb-2">
              <Link
                href="/booking"
                onClick={close}
                className="w-full flex items-center justify-center bg-[#222222] hover:bg-[#383838] active:bg-[#111111] text-white text-[12.5px] font-extrabold uppercase tracking-[0.14em] py-3 px-4 rounded-[2px] transition-colors shadow-xs"
              >
                Start Consultations
              </Link>
            </div>

            {/* Drawer Links */}
            <nav className="flex-1 flex flex-col justify-start w-[92%] mx-auto overflow-y-auto py-3">
              {drawerLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className={`font-sans font-bold text-left bg-transparent border-0 cursor-pointer p-0 py-3 leading-snug border-b border-black/[0.06] last:border-0 transition-colors ${isActive
                      ? "text-[#16aee2]"
                      : "text-[#111] hover:text-[#16aee2]"
                      }`}
                    style={{ fontSize: "16px" }}
                  >
                    <span className="flex items-center justify-between w-full">
                      <span>{link.label}</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 22 22"
                        fill="none"
                        className={`shrink-0 transition-opacity ${isActive
                          ? "opacity-90 text-[#16aee2]"
                          : "opacity-30"
                          }`}
                      >
                        <path
                          d="M5 17L17 5M17 5H8M17 5V14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Bottom Theme Banner */}
            <div className="bg-[#0a1128] border-t-2 border-[#16aee2] px-5 py-4 shrink-0">
              <p className="font-sans font-semibold text-[11px] text-[#e9e313] m-0 mb-1 uppercase tracking-widest">
                Break Your Porn habit Loop And Quit It
              </p>
              <p className="font-sans font-black text-[17px] text-white m-0 leading-tight">
                Break The Loop.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Search Modal (Triggered by Top Bar Sparkle Search Icon) ────────── */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[300] flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-[580px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-gray-100">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 shrink-0"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, books, podcasts, exercises..."
                className="flex-1 bg-transparent border-0 outline-none text-[14px] sm:text-[15px] text-gray-900 placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 text-xs px-1.5 py-0.5 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
                className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Results / Quick Navigation Links */}
            <div className="max-h-[360px] overflow-y-auto p-2 sm:p-3">
              {filteredSearchItems.length > 0 ? (
                <div className="space-y-1">
                  {filteredSearchItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => {
                        setIsSearchOpen(false);
                        router.push(item.href);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group cursor-pointer"
                    >
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[13.5px] sm:text-[14px] font-semibold text-gray-900 group-hover:text-[#16aee2] transition-colors">
                            {item.title}
                          </span>
                          <span className="text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[12px] text-gray-500 mt-0.5 truncate">
                          {item.desc}
                        </p>
                      </div>
                      <span className="text-gray-300 group-hover:text-[#16aee2] transition-colors text-sm">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-gray-500">
                  No results found for &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span>
                Press{" "}
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded font-mono text-[10px]">
                  ESC
                </kbd>{" "}
                to close
              </span>
              <span>AxoMen Navigation</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
