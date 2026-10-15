"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function FindTreatmentSection() {
  const locale = useLocale();
  const isHindi = locale === "hi";

  const items = [
    {
      id: "porn-addiction",
      title: isHindi ? "पोर्न की लत" : "Porn Addiction",
      label: isHindi ? "गोपनीय 1-on-1 परामर्श" : "Rehab Centers & 1-on-1 Care",
      href: "/session",
      image: "/image/issue-1.jpg",
      alt: "Porn Addiction Treatment",
    },
    {
      id: "masturbation-addiction",
      title: isHindi ? "हस्तमैथुन की लत" : "Masturbation Addiction",
      label: isHindi ? "आदत नियंत्रण व ऊर्जा बहाली" : "Habit Reset & Energy Restoration",
      href: "/session",
      image: "/image/issue-2.jpg",
      alt: "Masturbation Addiction Treatment in India",
    },
    {
      id: "both-addiction",
      title: isHindi ? "पोर्न + हस्तमैथुन" : "Porn + Masturbation",
      label: isHindi ? "संयुक्त आदत चक्र निवारण" : "Dual Loop Behavioral Program",
      href: "/session",
      image: "/image/issue-3.webp",
      alt: "Combined Addiction Treatment",
    },
  ];

  return (
    <section
      aria-label="Find Treatment & Support"
      className="w-full bg-[#eaf475] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-left">
          <h2
            className="text-[#000000] font-bold text-2xl sm:text-3xl md:text-[34px] leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {isHindi ? "उपचार व मार्गदर्शन खोजें" : "Find Treatment"}
          </h2>
          <p
            className="text-sm sm:text-base text-[#000000]/80 font-medium mt-1 sm:mt-1.5"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {isHindi
              ? "विशेषज्ञ रिकवरी प्रोग्राम व गोपनीय 1-on-1 सहायता"
              : "Browse specialized confidential recovery programs & 1-on-1 guidance"}
          </p>
        </div>

        {/* 
          Cards Container:
          - Both sides have equal margins aligned directly with the section title
          - Mobile: Smooth horizontal swipeable peek scroll
          - Desktop: Clean 3-column responsive grid
        */}
        <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 md:gap-7 overflow-x-auto pb-4 pt-1 sm:overflow-visible no-scrollbar snap-x snap-mandatory">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              prefetch={false}
              className="group flex flex-col w-[265px] xs:w-[285px] shrink-0 sm:w-auto sm:shrink snap-start cursor-pointer active:scale-[0.98] transition-transform"
            >
              {/* Photo Box with Reduced, Clean Border Radius matching reference */}
              <div className="rounded-xl sm:rounded-2xl aspect-[4/3] bg-black/5 border border-black/10 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] relative overflow-hidden cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  priority
                  className="object-cover object-center pointer-events-none select-none group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 285px, (max-width: 1024px) 33vw, 380px"
                />
              </div>

              {/* Card Meta Below Box - Aligned with Box & Title */}
              <div className="mt-3 sm:mt-3.5 text-left">
                <h3
                  className="text-[18px] sm:text-[20px] md:text-[21px] font-bold text-[#000000] group-hover:opacity-75 transition-opacity leading-snug tracking-tight"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[13px] sm:text-[14px] text-[#000000]/75 font-medium mt-0.5 sm:mt-1"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
