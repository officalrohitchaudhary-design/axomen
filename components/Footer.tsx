"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const servicesLinks: FooterLink[] = [
  { label: "Porn Habit Support", href: "/services/porn-habit-support" },
  { label: "Masturbation Habit Support", href: "/services/masturbation-habit-support" },
  { label: "Combined Recovery Support", href: "/services/porn-and-masturbation-support" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Urge Surfing Exercises", href: "/exercises" },
  { label: "Book a Session", href: "/booking" },
];

const checkOutLinks: FooterLink[] = [
  { label: "About AxoMen", href: "/about" },
  { label: "Recovery Books & Frameworks", href: "/books" },
  { label: "Frequently Asked Questions", href: "/faqs" },
  { label: "Reviews & Real Stories", href: "/stories" },
  { label: "Science & Recovery Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="w-full text-[#292D32] transition-colors"
      style={{ backgroundColor: "#f0f1f5", color: "#292D32" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-9 pb-8 sm:pt-14 sm:pb-10">
        {/* Main Grid: Left brand area + Right links area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-14 items-start">

          {/* Brand Info Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Logo */}
            <Link href="/" aria-label="AxoMen Home" className="inline-block">
              <Image
                src="/image/axomen-logo.png"
                alt="AxoMen — Men's Sexual Health Platform"
                width={200}
                height={52}
                className="h-9 sm:h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Description */}
            <p
              className="mt-4 text-[#292D32] leading-[1.62] font-normal max-w-lg"
              style={{ fontSize: "14px" }}
            >
              AxoMen is India&apos;s dedicated men&apos;s sexual health platform.
              We provide practical, confidential, and human-guided recovery education
              for men struggling with unwanted porn use, compulsive masturbation habits,
              and sexual urges. Trusted by 1,000+ men across India.
            </p>

            {/* Social Icons - Container divs prepared for user manual SVG paste */}
            <div className="flex items-center gap-7 mt-5 sm:mt-6">
              {/* LinkedIn Icon Div */}
              <div
                className="w-5 h-5 flex items-center justify-center text-[#292D32] hover:opacity-70 transition-opacity cursor-pointer"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                {/* Paste your LinkedIn SVG code here */}
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </div>

              {/* Instagram Icon Div */}
              <Link href="https://www.instagram.com/axomen.in/" target="_blank">
                <div
                  className="w-5 h-5 flex items-center justify-center text-[#292D32] hover:opacity-70 transition-opacity cursor-pointer"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  {/* Paste your Instagram SVG code here */}
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
              </Link>

              {/* Facebook Icon Div */}
              <div
                className="w-5 h-5 flex items-center justify-center text-[#292D32] hover:opacity-70 transition-opacity cursor-pointer"
                title="Facebook"
                aria-label="Facebook"
              >
                {/* Paste your Facebook SVG code here */}
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                </svg>
              </div>

              {/* X (formerly Twitter) Icon Div */}
              <div
                className="w-5 h-5 flex items-center justify-center text-[#292D32] hover:opacity-70 transition-opacity cursor-pointer"
                title="X"
                aria-label="X"
              >
                {/* Paste your X SVG code here */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            </div>

            {/* Super Founder Offer CTA Banner */}
            <div className="w-full max-w-[380px] mt-6">
              <div className="w-full rounded-[8px] overflow-hidden shadow-xs">
                <img
                  src="/image/footer-founder.png"
                  alt="As Featured on Bharat Ke SuperFounder"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Divider line visible on mobile matching the UI design */}
          <div className="w-full border-t border-[#d8dbe2] my-1 lg:hidden" />

          {/* Link Columns: 2 Columns side-by-side in Mobile & Web view */}
          <div className="lg:col-span-7 w-full lg:pl-6 xl:pl-12">
            <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:gap-14">

              {/* Column 1: Services */}
              <div>
                <h3 className="text-[#292D32] font-bold text-[16px] sm:text-[17px] tracking-tight mb-4">
                  Services
                </h3>
                <ul className="flex flex-col space-y-3 sm:space-y-3.5">
                  {servicesLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[#292D32] hover:text-[#eb1c22] transition-colors block"
                        style={{ fontSize: "13.6px", lineHeight: 1.45 }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Check out */}
              <div>
                <h3 className="text-[#292D32] font-bold text-[16px] sm:text-[17px] tracking-tight mb-4">
                  Check out
                </h3>
                <ul className="flex flex-col space-y-3 sm:space-y-3.5">
                  {checkOutLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[#292D32] hover:text-[#eb1c22] transition-colors block"
                        style={{ fontSize: "13.6px", lineHeight: 1.45 }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Navigation */}
        <div className="border-t border-[#d8dbe2] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#292D32]/70 text-[12.5px]">
          <p>© {new Date().getFullYear()} AxoMen. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#eb1c22] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-[#eb1c22] transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-[#eb1c22] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
