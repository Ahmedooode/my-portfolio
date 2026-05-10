"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation"; // نحتاج هذا لمعرفة الصفحة الحالية

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // الحصول على المسار الحالي

  // التحقق مما إذا كانت الصفحة هي الرئيسية
  const isHomePage = pathname === "/";

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

  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
    },
    open: {
      x: "0%",
      transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
    },
  };

  const linkData = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  // تحديد لون النص بناءً على الصفحة
  // إذا كانت الصفحة الرئيسية -> أبيض | إذا كانت صفحة أخرى -> أسود الداكن
  const textColorClass = isHomePage ? "text-white" : "text-[#1C1D20]";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div
          className={`absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-6 md:py-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isScrolled || isOpen
              ? "opacity-0 -translate-y-4 pointer-events-none"
              : "opacity-100 translate-y-0 pointer-events-auto"
          } ${textColorClass}`} // تطبيق اللون الديناميكي هنا
        >
          {/* Left: Logo / Name */}
          <div className="font-['Epilogue'] text-[16px] md:text-[18px] font-medium tracking-wide">
            © Code by Ahmed
          </div>

          {/* Right: Nav Links */}
          <div className="font-['Epilogue'] font-medium text-[16px]">
            <div className="hidden md:flex items-center space-x-12">
              <Link
                href="/work"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                Work
              </Link>
              <Link
                href="/#about"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                Contact
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden hover:opacity-70 transition-opacity duration-300"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Floating Burger Button (اللون دائماً داكن ليظهر بوضوح فوق أي خلفية عند السكرول) */}
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

      {/* --- SIDE PANEL & BACKDROP (تبقى كما هي لأن خلفيتها غامقة دائماً) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed inset-y-0 right-0 z-[60] bg-[#1C1D20] text-stone-100 flex flex-col h-screen overflow-y-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="w-full lg:w-[40vw] h-full flex flex-col p-8 md:p-12 lg:p-20 relative flex-grow">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 lg:top-12 lg:right-12 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#455CE9] rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-light hover:scale-105 transition-all cursor-pointer z-[70]"
              >
                &times;
              </button>
              <div className="flex-grow flex flex-col pt-24 md:pt-20">
                <span className="font-label-caps text-[12px] font-semibold tracking-widest text-stone-400 block mb-8 md:mb-12 uppercase border-b border-white/10 pb-2">
                  NAVIGATION
                </span>
                <ul className="flex flex-col space-y-4 md:space-y-6 flex-grow mb-12">
                  {linkData.map((link) => (
                    <li key={link.name} className="relative group">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="relative inline-flex items-center gap-6 md:gap-12 font-display-xl text-[40px] md:text-[60px] lg:text-[80px] font-semibold tracking-tighter hover:text-stone-400 transition-colors leading-none uppercase"
                      >
                        {link.name}
                        <span
                          className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#455CE9] transition-opacity ${pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
