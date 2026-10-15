"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function WhatWeOfferSection() {
  const t = useTranslations("whatWeOffer");
  const locale = useLocale();
  const isHindi = locale === "hi";

  const offers = [
    {
      id: "individual",
      title: t("individualTitle"),
      subtitle: isHindi ? "18+ के लिए थेरेपी" : "Therapy for 18+",
      href: "/individual",
      image: "/image/single.jpg",
      alt: "Individual 1-on-1 Recovery Guidance",
    },
    {
      id: "teens",
      title: t("teensTitle"),
      subtitle: isHindi ? "13-17 वर्ष के लिए" : "For ages 13-17",
      href: "/teen",
      image: "/image/teen.avif",
      alt: "Teens & Youth Specialized Support",
    },
    {
      id: "couples",
      title: t("couplesTitle"),
      subtitle: isHindi ? "हमारे लिए थेरेपी" : "Therapy for us",
      href: "/couples",
      image: "/image/session-couple.avif",
      alt: "Couples Relationship Recovery Support",
    },
  ];

  return (
    <section
      id="what-we-offer"
      aria-label="What We Offer"
      className="w-full bg-[#cde4fe] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Perfectly Aligned */}
        <div className="mb-6 sm:mb-8 text-left">
          <h2
            className="text-[#000000] font-bold text-2xl sm:text-3xl md:text-[34px] leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-sm sm:text-base text-[#000000]/80 font-medium mt-1 sm:mt-1.5"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {isHindi
              ? "अपनी व्यक्तिगत ज़रूरतों के अनुसार सही गोपनीय सेशन प्रारूप चुनें"
              : "Personalized recovery session formats tailored to your exact journey"}
          </p>
        </div>

        {/* 
          Cards Container:
          - Both sides have equal margins aligned directly with the section title
          - Mobile: Smooth horizontal swipeable peek scroll
          - Desktop: Clean 3-column responsive grid
        */}
        <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 md:gap-7 overflow-x-auto pb-4 pt-1 sm:overflow-visible no-scrollbar snap-x snap-mandatory">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              href={offer.href}
              prefetch={false}
              title={`View ${offer.title} Sessions`}
              aria-label={`${offer.title} - ${offer.subtitle}`}
              className="group flex flex-col w-[265px] xs:w-[285px] shrink-0 sm:w-auto sm:shrink snap-start cursor-pointer active:scale-[0.98] transition-transform select-none touch-manipulation"
            >
              {/* Photo Box with Reduced, Clean Border Radius matching reference */}
              <div className="rounded-xl sm:rounded-2xl aspect-[4/3] bg-black/5 border border-black/10 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] relative overflow-hidden cursor-pointer">
                <Image
                  src={offer.image}
                  alt={offer.alt}
                  fill
                  className="object-cover object-center pointer-events-none select-none group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 285px, (max-width: 1024px) 33vw, 380px"
                />
              </div>

              {/* Card Meta Below Box - Full Area Clickable */}
              <div className="mt-3.5 sm:mt-4 text-left cursor-pointer">
                <h3
                  className="text-[19px] sm:text-[21px] font-bold text-[#000000] group-hover:text-black/80 transition-colors leading-snug tracking-tight"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {offer.title}
                </h3>
                <p
                  className="text-[14px] sm:text-[15px] text-[#000000]/75 font-normal mt-0.5"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {offer.subtitle}
                </p>

                {/* Clean, Premium CTA Button */}
                <div className="mt-3 sm:mt-3.5">
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#000000] text-white text-[13px] sm:text-[14px] font-semibold shadow-sm group-hover:bg-slate-800 transition-all duration-200 cursor-pointer"
                    style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                  >
                    <span>{t("getStarted")}</span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 pointer-events-none"
                      aria-hidden
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
