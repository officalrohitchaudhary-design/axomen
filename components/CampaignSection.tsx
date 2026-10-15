import Image from "next/image";

export default function CampaignSection() {
  return (
    <section className="w-full">
      {/* Mobile image */}
      <Image
        src="/image/campaign-mobile.png"
        alt="AxoMen Campaign"
        width={864}
        height={1821}
        className="w-full h-auto block md:hidden"
        sizes="100vw"
        priority
      />
      {/* Desktop image */}
      <Image
        src="/image/campaign.png"
        alt="AxoMen Campaign"
        width={1774}
        height={887}
        className="w-full h-auto hidden md:block"
        sizes="100vw"
        priority
      />
    </section>
  );
}
