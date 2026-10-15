import type { Metadata } from "next";
import PodcastClient from "@/components/PodcastClient";

export const metadata: Metadata = {
  title: "Podcast — Men's Sexual Health, Mindset & Habits | AxoMen",
  description:
    "Listen and watch AxoMen podcast episodes on men's sexual health, neurobiology, dopamine detox, overcoming unwanted porn habits, and rebuilding self-discipline.",
  alternates: { canonical: "https://axomen.com/podcast" },
  openGraph: {
    title: "Podcast | AxoMen",
    description: "Conversations on men's sexual health, habit recovery, and personal discipline.",
    url: "https://axomen.com/podcast",
    type: "website",
  },
};

export default function PodcastPage() {
  return <PodcastClient />;
}
