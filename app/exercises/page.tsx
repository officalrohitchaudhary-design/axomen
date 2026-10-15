import type { Metadata } from "next";
import ExercisesClient from "@/components/ExercisesClient";

export const metadata: Metadata = {
  title: "Urge Surfing & Breathing Tools | AxoMen India",
  description:
    "Interactive Urge Surfing guided breathing and somatic grounding techniques to help men manage intense sexual cravings and rebuild self-command.",
  alternates: {
    canonical: "https://axomen.com/exercises",
    languages: {
      "en-IN": "https://axomen.com/exercises",
      "hi-IN": "https://axomen.com/exercises?lang=hi",
    },
  },
  openGraph: {
    title: "Urge Surfing Exercises & Recovery Tools | AxoMen",
    description:
      "Interactive breathing and mindfulness exercises designed for men's sexual health and urge management.",
    url: "https://axomen.com/exercises",
    type: "website",
  },
};

export default function ExercisesPage() {
  return <ExercisesClient />;
}
