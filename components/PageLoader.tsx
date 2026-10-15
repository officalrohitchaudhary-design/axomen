"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PageLoader() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fadeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    clearTimeout(hideTimer.current);
    clearTimeout(fadeTimer.current);
    setFading(false);
    setShow(true);
    hideTimer.current = setTimeout(() => {
      setFading(true);
      fadeTimer.current = setTimeout(() => setShow(false), 400);
    }, 650);
    return () => {
      clearTimeout(hideTimer.current);
      clearTimeout(fadeTimer.current);
    };
  }, [pathname]);

  useEffect(() => {
    const handler = () => {
      clearTimeout(hideTimer.current);
      clearTimeout(fadeTimer.current);
      setFading(false);
      setShow(true);
      hideTimer.current = setTimeout(() => {
        setFading(true);
        fadeTimer.current = setTimeout(() => setShow(false), 400);
      }, 800);
    };
    window.addEventListener("hyi:lang-picked", handler);
    return () => window.removeEventListener("hyi:lang-picked", handler);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}
    >
      <Image
        src="/image/axomen-logo.png"
        alt="AxoMen"
        width={350}
        height={100}
        className="loader-logo w-[150px] sm:w-[190px] lg:w-[230px] h-auto object-contain"
        priority
      />
    </div>
  );
}
