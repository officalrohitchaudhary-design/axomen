"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Zyncro?: {
      scan: (node?: HTMLElement | Document) => void;
    };
  }
}

export default function ZyncroBooking() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Zyncro?.scan) {
      window.Zyncro.scan();
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div
        data-zyncro-inline=""
        data-zyncro-url="zyncro.in/axomen/booking"
        data-zyncro-color="#1a5bd9"
        className="w-full"
      />
      <Script
        src="https://zyncro.in/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.Zyncro?.scan) {
            window.Zyncro.scan();
          }
        }}
      />
    </div>
  );
}
