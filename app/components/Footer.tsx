"use client";

import React, { useState, useEffect } from "react";

export default function Footer() {
  // Dynamically calculate local time for Egypt
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const cairoTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Africa/Cairo",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
      setTime(cairoTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="w-full bg-[#1C1D20] text-white pt-20 md:pt-32 pb-8 px-6 md:px-16 overflow-hidden flex flex-col relative font-sans"
      id="contact"
    >
      <div className="max-w-[1440px] mx-auto w-full flex flex-col">
        {/* Main Heading Section */}
        <div className="flex flex-col gap-2 md:gap-4 relative z-10">
          <div className="flex items-center gap-4 md:gap-6">
            <img
              src="/your-avatar.jpg"
              alt="Ahmed"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full object-cover shrink-0"
            />
            <h1 className="text-[12vw] md:text-[8vw] font-medium tracking-tighter leading-none">
              Let&apos;s work
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-[12vw] md:text-[8vw] font-medium tracking-tighter leading-none">
              together
            </h1>
            {/* Subtle pointing arrow */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hidden md:block w-8 h-8 md:w-12 md:h-12 text-white mr-12"
            >
              <line x1="5" y1="19" x2="19" y2="5"></line>
              <polyline points="5 5 19 5 19 19"></polyline>
            </svg>
          </div>
        </div>

        {/* Divider and Blue Button */}
        <div className="relative mt-16 md:mt-24 mb-12 md:mb-16">
          {/* Horizontal Line */}
          <div className="w-full h-[1px] bg-white/20"></div>

          {/* Circular Button */}
          <a
            href="mailto:ahmedooode@gmail.com"
            className="absolute right-[2%] md:right-[15%] top-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 bg-[#455CE9] rounded-full flex items-center justify-center text-white text-xs md:text-sm lg:text-base cursor-pointer hover:scale-105 hover:bg-[#3b4ede] transition-all duration-300 z-20"
          >
            Get in touch
          </a>
        </div>

        {/* Contact Pills */}
        <div className="flex flex-col sm:flex-row gap-4 mb-24 md:mb-32 z-10">
          <a
            href="mailto:ahmedooode@gmail.com"
            className="px-6 py-4 md:px-8 md:py-4 rounded-full border border-white/20 text-xs md:text-sm hover:bg-[#455CE9] hover:border-[#455CE9] transition-colors inline-flex justify-center items-center w-full sm:w-fit"
          >
            ahmedooode@gmail.com
          </a>
          <a
            href="https://wa.me/201557891747"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-4 md:px-8 md:py-4 rounded-full border border-white/20 text-xs md:text-sm hover:bg-[#455CE9] hover:border-[#455CE9] transition-colors inline-flex justify-center items-center w-full sm:w-fit"
          >
            +20 155 789 1747
          </a>
        </div>

        {/* Bottom Footer Information */}
        <div className="grid grid-cols-2 md:flex md:flex-row justify-between items-start md:items-end text-white text-xs md:text-sm gap-8 font-medium">
          {/* Version Data */}
          <div className="flex flex-col gap-2">
            <span className="text-white/50 uppercase text-[10px] tracking-widest font-semibold mb-1">
              Version
            </span>
            <span>2026 © Edition</span>
          </div>

          {/* Local Time */}
          <div className="flex flex-col gap-2">
            <span className="text-white/50 uppercase text-[10px] tracking-widest font-semibold mb-1">
              Local Time
            </span>
            {/* Fallback to a static string if hydration hasn't run yet */}
            <span>{time || "Loading time..."}</span>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-2 col-span-2 md:col-span-1 md:text-right mt-4 md:mt-0">
            <span className="text-white/50 uppercase text-[10px] tracking-widest font-semibold mb-1 text-left md:text-right">
              Socials
            </span>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://www.linkedin.com/in/ahmedooode"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Ahmedooode"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity underline-offset-4 hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
