import type { Metadata } from "next";
import ZyncroBooking from "@/components/ZyncroBooking";

export const metadata: Metadata = {
  title: "Book a First Free Session | AxoMen",
  description: "Schedule your confidential 1-on-1 recovery consultation session with AxoMen.",
};

export default function BookingPage() {
  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-white py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <ZyncroBooking />
      </div>
    </div>
  );
}
