"use client";

import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1], // Smooth cubic-bezier constant with your overall design
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row bg-[#1C1D20] overflow-hidden pt-20 md:pt-0">
      {/* Left Side: Image with sophisticated masking */}
      <div className="w-full md:w-1/2 relative min-h-[60vh] md:min-h-screen overflow-hidden group">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
          alt="Ahmed - Full Stack Developer"
          className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
          src="/images/linked-in-image.png"
        />
        {/* Gradient overlays to blend with the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1C1D20] hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1D20] via-transparent to-transparent md:hidden"></div>
      </div>

      {/* Right Side: Content & Branding */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-12 md:py-0 z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mb-8"
        >
          <span className="w-10 h-[1px] bg-[#455CE9]"></span>
          <span className="text-[#455CE9] font-medium text-xs md:text-sm tracking-[0.3em] uppercase">
            Full-Stack Developer
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-[12vw] md:text-[6vw] font-medium text-white mb-10 leading-[0.9] tracking-tighter"
        >
          Architecting <br />
          <span className="text-[#455CE9] italic">Digital Solutions.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-white/50 text-lg md:text-xl max-w-md mb-12 leading-relaxed font-light"
        >
          Based in Egypt. Dedicated to building high-performance applications
          with seamless user experiences.
        </motion.p>

        {/* Action Buttons: Matching Footer Pill Style */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a
            href="https://github.com/Ahmedooode"
            target="_blank"
            rel="noreferrer"
            className="bg-[#455CE9] text-white px-10 py-5 rounded-full font-medium hover:bg-[#3b4ede] transition-all duration-300 text-sm md:text-base"
          >
            Explore My Work
          </a>
          <a
            href="mailto:ahmedooode@gmail.com"
            className="border border-white/20 text-white px-10 py-5 rounded-full hover:bg-white hover:text-[#1C1D20] transition-all duration-300 text-sm md:text-base"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Social & Location: Bottom bar mirroring Footer structure */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between border-t border-white/10 pt-10"
        >
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/ahmedooode"
              target="_blank"
              rel="noreferrer"
              className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold"
            >
              LinkedIn
            </a>
            <a
              href="https://wa.me/201557891747"
              target="_blank"
              rel="noreferrer"
              className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold"
            >
              WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-2 text-white/30">
            <span className="w-2 h-2 rounded-full bg-[#455CE9] animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Egypt Time
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
