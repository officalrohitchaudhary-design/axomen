import HeroSection from "@/components/HeroSection";
import VideoRecoverySection from "@/components/VideoRecoverySection";
import FeaturesMarquee from "@/components/FeaturesMarquee";
import SupportedLanguagesSection from "@/components/SupportedLanguagesSection";
import MensHealthConcernsSection from "@/components/MensHealthConcernsSection";
import WhatSessionsWeOfferV1Section from "@/components/WhatSessionsWeOfferV1Section";
import WhyAxoMenSection from "@/components/WhyAxoMenSection";
import FindTreatmentSection from "@/components/FindTreatmentSection";
import AboutPlatformCTA from "@/components/AboutPlatformCTA";
import IssuesSection from "@/components/IssuesSection";
import WhatWeOfferSection from "@/components/WhatWeOfferSection";
import HabitLoopSection from "@/components/HabitLoopSection";
import QuoteSection from "@/components/QuoteSection";
import PornDrugSection from "@/components/PornDrugSection";
import BookCTASection from "@/components/BookCTASection";
import BooksGridSection from "@/components/BooksGridSection";
import PodcastSection from "@/components/PodcastSection";
import CampaignSection from "@/components/CampaignSection";
import StatCTA from "@/components/StatCTA";
import MemberPlatformSection from "@/components/MemberPlatformSection";
import EventsSection from "@/components/EventsSection";
import HomeBlogSection from "@/components/HomeBlogSection";
import AddictionPollSection from "@/components/AddictionPollSection";
import Image from "next/image";
import HowAxoMenJourneyWorksSection from "@/components/HowAxoMenJourneyWorksSection";
import HowBookingWorksSection from "@/components/HowBookingWorksSection";
import IndividualFAQSection from "@/components/IndividualFAQSection";
import BenefitsSection from "@/components/BenefitsSection";

export default function Home() {
  return (
    <>
      {/* <HeroSection /> */}
      <VideoRecoverySection />
      <FeaturesMarquee />
      <SupportedLanguagesSection />
      <MensHealthConcernsSection />
      {/* <FindTreatmentSection /> */}
      <WhatSessionsWeOfferV1Section />
      <WhyAxoMenSection />
      {/* <WhatWeOfferSection /> */}

      {/* <AboutPlatformCTA /> */}
      {/* <IssuesSection /> */}
      <HowAxoMenJourneyWorksSection />
      {/* <HowBookingWorksSection /> */}
      {/* <HabitLoopSection /> */}
      <BenefitsSection />
      <QuoteSection />
      <PornDrugSection />
      {/* <div className="w-full max-w-5xl mx-auto">
        <Image
          src="/image/awerness-cta.webp"
          alt="Book CTA"
          width={500}
          height={500}
          className="object-cover mx-auto"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 23vw, 260px"
        />
      </div> */}
      <StatCTA />
      <BooksGridSection />

      <PodcastSection />
      {/* <div className="w-full max-w-5xl mx-auto ">
        <Image
          src="/image/june.png"
          alt="Book CTA"
          width={500}
          height={500}
          unoptimized
          className="object-cover"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 23vw, 260px"
        />
      </div> */}
      {/* <EventsSection /> */}
      <HomeBlogSection />

      {/* <MemberPlatformSection /> */}
      {/* <div className="w-full max-w-5xl mx-auto">
        <a href="https://www.instagram.com/axomen/" target="_blank" rel="noopener noreferrer">
          <Image
            src="/image/share-cta.webp"
            alt="Book CTA"
            width={500}
            height={500}
            className="object-cover mx-auto"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 23vw, 260px"
          />
        </a>
      </div> */}
      {/* <CampaignSection /> */}
      {/* <AddictionPollSection /> */}
      <IndividualFAQSection />
    </>
  );
}
