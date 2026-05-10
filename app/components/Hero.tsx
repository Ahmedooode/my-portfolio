"use client";

import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row bg-[#1C1D20] overflow-hidden pt-20 md:pt-0">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen overflow-hidden group">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5 }}
          alt="Ahmed - Full Stack Developer"
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
          src="/images/linked-in-image.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1C1D20] hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1D20] to-transparent md:hidden"></div>
      </div>

      {/* Right Side: Content & Contact Data */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 md:py-0 z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-12 h-[1px] bg-[#00daf3]"></span>
          <span className="text-[#00daf3] font-mono text-sm tracking-[0.2em] uppercase">
            Full-Stack Developer
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tighter"
        >
          Architecting Scalable <br />
          <span className="text-[#00daf3] italic">Digital Solutions.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed"
        >
          Based in Egypt. Focused on building high-performance applications.
          Available for new opportunities.
        </motion.p>

        {/* Action Buttons Linked to Contact Info */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-6 mb-12"
        >
          <a
            href="https://github.com/Ahmedooode"
            target="_blank"
            rel="noreferrer"
            className="bg-[#00daf3] text-[#00363d] font-bold px-8 py-4 rounded hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,218,243,0.3)]"
          >
            View My GitHub
          </a>
          <a
            href="mailto:ahmedooode@gmail.com"
            className="border border-gray-700 text-white px-8 py-4 rounded hover:bg-gray-800 transition-all duration-300"
          >
            Send Email
          </a>
        </motion.div>

        {/* Quick Social Links from Footer */}
        <motion.div
          variants={itemVariants}
          className="flex gap-8 border-t border-white/10 pt-8 items-center"
        >
          <a
            href="https://www.linkedin.com/in/ahmedooode"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-[#00daf3] transition-colors text-sm uppercase tracking-widest font-medium"
          >
            LinkedIn
          </a>
          <a
            href="https://wa.me/201557891747"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-[#00daf3] transition-colors text-sm uppercase tracking-widest font-medium"
          >
            WhatsApp
          </a>
          <div className="hidden lg:flex items-center gap-3 ml-auto text-[#00daf3]/60">
            <span className="material-symbols-outlined animate-spin-slow text-xl">
              language
            </span>
            <span className="text-xs font-mono uppercase tracking-tighter">
              Local Time: Egypt
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
