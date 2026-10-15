"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCleanRoute =
    pathname === "/get-session" ||
    pathname.startsWith("/get-session/") ||
    pathname === "/session" ||
    pathname.startsWith("/session/") ||
    pathname === "/assessment" ||
    pathname.startsWith("/assessment/") ||
    pathname === "/porn-addiction-test" ||
    pathname.startsWith("/porn-addiction-test/");

  if (isCleanRoute) {
    const isSessionFlow =
      pathname === "/get-session" ||
      pathname.startsWith("/get-session/");
    return (
      <main className={`flex-1 w-full ${isSessionFlow ? "h-[100dvh] max-h-[100dvh] overflow-hidden" : "min-h-screen"} bg-white`}>
        {children}
      </main>
    );
  }

  return (
    <>
      {/* <MarqueeBanner /> */}
      <TopBar />
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
