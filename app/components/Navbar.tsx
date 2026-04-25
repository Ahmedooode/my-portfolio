"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion variants for the side panel
  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.77, 0, 0.175, 1], // Cubic Bezier for smooth out
      },
    },
    open: {
      x: "0%",
      transition: {
        duration: 0.5,
        ease: [0.77, 0, 0.175, 1], // Cubic Bezier for smooth in
      },
    },
  };

  const linkData = [
    { name: "Home", href: "/" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* --- 1. TOP NAVBAR & FLOATING BUTTON --- */}
      <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        {/* Top Navbar Content (Visible at top, hidden on scroll) */}
        <div
          className={`absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-6 md:py-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isScrolled || isOpen
              ? "opacity-0 -translate-y-4 pointer-events-none"
              : "opacity-100 translate-y-0 pointer-events-auto"
          }`}
        >
          {/* Left: Logo / Name */}
          <div className="font-['Epilogue'] text-[16px] md:text-[18px] font-medium tracking-wide text-white">
            © Code by Ahmed
          </div>

          {/* Right: Nav Links */}
          <div className="font-['Epilogue'] font-medium text-[16px] text-white">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-12">
              <Link
                href="/work"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                Work
              </Link>
              <Link
                href="#about"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                Contact
              </Link>
            </div>

            {/* Mobile "Menu" Text - Opens the side panel */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden hover:opacity-70 transition-opacity duration-300"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Floating Burger Button (Hidden at top, visible on scroll) */}
        <button
          onClick={() => setIsOpen(true)}
          className={`absolute top-4 md:top-8 right-4 md:right-16 w-[60px] h-[60px] md:w-[75px] md:h-[75px] bg-[#1C1D20] text-white rounded-full flex flex-col items-center justify-center space-y-1.5 md:space-y-2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 pointer-events-auto shadow-lg origin-center ${
            isScrolled && !isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-0 pointer-events-none"
          }`}
          aria-label="Menu"
        >
          <span className="w-5 md:w-6 h-[1.5px] bg-white block transition-all"></span>
          <span className="w-5 md:w-6 h-[1.5px] bg-white block transition-all"></span>
        </button>
      </nav>

      {/* --- 2. SIDE NAVIGATION PANEL --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed inset-y-0 right-0 z-[60] bg-stone-900 text-stone-100 flex flex-col h-screen overflow-y-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Width is 100% on mobile, 40% on large screens */}
            <div className="w-full lg:w-[40vw] h-full flex flex-col p-8 md:p-12 lg:p-20 relative flex-grow">
              {/* Close Button (Blue Circle) */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 lg:top-12 lg:right-12 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-light hover:scale-105 transition-all cursor-pointer z-[70]"
                aria-label="Close menu"
              >
                &times;
              </button>

              {/* Panel Body Content */}
              <div className="flex-grow flex flex-col pt-24 md:pt-20">
                <span className="font-label-caps text-[12px] font-semibold tracking-widest text-stone-400 block mb-8 md:mb-12 uppercase">
                  NAVIGATION
                </span>

                {/* Main Nav Links */}
                <ul className="flex flex-col space-y-4 md:space-y-6 flex-grow mb-12 md:mb-16">
                  {linkData.map((link) => (
                    <li key={link.name} className="relative group">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)} // Close menu on click
                        className="relative inline-flex items-center gap-6 md:gap-12 font-display-xl text-[50px] md:text-[80px] lg:text-[100px] font-semibold tracking-tighter hover:text-stone-400 transition-colors leading-none"
                      >
                        {link.name}
                        {/* Dot indicator (Active/Hover state) */}
                        <span
                          className={`w-4 h-4 md:w-6 md:h-6 rounded-full bg-stone-100 transition-opacity ${
                            link.name === "Home"
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="w-full h-[1px] bg-stone-100/10 mb-8 md:mb-12"></div>

                {/* SOCIALS */}
                <div className="flex flex-col gap-6 md:gap-8 pb-8">
                  <span className="font-label-caps text-[12px] font-semibold tracking-widest text-stone-400 block uppercase">
                    SOCIALS
                  </span>
                  <div className="flex flex-wrap gap-6 md:gap-8 font-label-caps text-[10px] md:text-[12px] font-semibold tracking-widest uppercase">
                    <a
                      href="https://www.linkedin.com/in/ahmedooode"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/Ahmedooode"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      GitHub
                    </a>
                    <a href="#" className="hover:opacity-70 transition-opacity">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* --- 3. BACKDROP OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
