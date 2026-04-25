"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

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
      {/* 1. Global Header with Hamburger Toggle */}
      <header className="fixed top-0 right-0 p-6 md:p-8 z-50 pointer-events-none">
        <button
          onClick={toggleNav}
          className="w-16 h-16 rounded-full border border-stone-100/10 flex items-center justify-center cursor-pointer pointer-events-auto bg-stone-900/10 backdrop-blur-sm group hover:scale-105 hover:bg-stone-800 transition-all duration-300"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {/* A close/hamburger style toggle */}
          <div className="w-8 h-8 flex flex-col justify-center items-center gap-2 group-hover:gap-1.5 transition-all">
            <span
              className={`w-8 h-[2px] bg-white block rounded-full transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[10px]" : ""}`}
            ></span>
            <span
              className={`w-8 h-[2px] bg-white block rounded-full transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[10px]" : ""}`}
            ></span>
          </div>
        </button>
      </header>

      {/* 2. Side Navigation Panel (the component requested) */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed inset-y-0 right-0 z-40 bg-stone-900 text-stone-100 flex flex-col h-screen overflow-y-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Conditional width based on large screens */}
            <div className="w-full lg:w-[40%] h-full flex flex-col p-12 lg:p-20 relative flex-grow">
              {/* Close Button (top-right blue circle with 'X') - visible in image_1.png and image_2.png */}
              <button
                onClick={toggleNav}
                className="absolute top-12 right-12 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-light hover:scale-105 transition-all cursor-pointer z-50"
                aria-label="Close"
              >
                &times;
              </button>

              {/* Panel Body Content */}
              <div className="flex-grow flex flex-col pt-20">
                {/* 1. NAVIGATION Title */}
                <span className="font-label-caps text-[12px] font-semibold tracking-widest text-stone-400 block mb-12 uppercase">
                  NAVIGATION
                </span>

                {/* 2. Main Nav Links - image_1.png layout with large font and dot active indicator */}
                <ul className="flex flex-col space-y-4 lg:space-y-6 flex-grow mb-16">
                  {linkData.map((link) => (
                    <li key={link.name} className="relative group">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="relative inline-flex items-center gap-12 font-display-xl text-[60px] lg:text-[100px] font-semibold tracking-tighter hover:text-stone-400 transition-colors"
                      >
                        {link.name}
                        {/* Dot indicator for active item ('Home' active in image_1.png) */}
                        <span
                          className={`w-6 h-6 rounded-full bg-stone-100 transition-opacity ${link.name === "Home" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* 3. Divider - visible in all images */}
                <div className="w-full h-[1px] bg-stone-100/10 mb-12"></div>

                {/* 4. SOCIALS Title and Links (from image_0.png footer, also bottom of side panel in image_2.png) */}
                <div className="flex flex-col gap-8">
                  <span className="font-label-caps text-[12px] font-semibold tracking-widest text-stone-400 block uppercase">
                    SOCIALS
                  </span>
                  <div className="flex gap-8 font-label-caps text-[12px] font-semibold tracking-widest uppercase">
                    <a href="#" className="hover:opacity-70 transition-opacity">
                      Awwwards
                    </a>
                    <a href="#" className="hover:opacity-70 transition-opacity">
                      Instagram
                    </a>
                    <a href="#" className="hover:opacity-70 transition-opacity">
                      Twitter
                    </a>
                    <a href="#" className="hover:opacity-70 transition-opacity">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 3. Backdrop/Overlay for the panel */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={toggleNav}
        />
      )}
    </>
  );
}
