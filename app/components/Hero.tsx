"use client";

import { motion, Variants } from "framer-motion";

export default function Hero() {
  // إعدادات ظهور الجملة بالكامل (الحاوية)
  const sentence: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // الفارق الزمني بين ظهور كل كلمة
      },
    },
  };

  // إعدادات ظهور كل كلمة على حدة
  const letter: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <main className="relative min-h-screen flex flex-col pt-32 px-6 md:px-16 overflow-hidden bg-zinc-500">
      {/* Location Box (Responsive: visible on mobile, scaled down, shifted top) */}
      <div className="absolute left-0 top-[20%] md:top-1/2 -translate-y-1/2 flex items-center gap-4 md:gap-8 bg-[#1C1D20] text-white py-4 md:py-8 pl-6 md:pl-22 pr-3 md:pr-3 rounded-r-full z-20 shadow-lg origin-left scale-75 sm:scale-90 md:scale-100 transition-transform">
        {/* Text Box */}
        <div className="flex flex-col font-['Epilogue'] text-[16px] md:text-[20px] font-bold leading-[1.1] tracking-wide">
          <span className="opacity-90">Located</span>
          <span className="opacity-90">in</span>
          <span className="font-medium whitespace-nowrap">Saudi Arabia</span>
        </div>

        {/* Globe Icon Container */}
        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#999D9E] rounded-full flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-white text-[24px] md:text-[35px]"
            style={{
              fontVariationSettings: "'FILL' 0, 'wght' 300",
              animation: "spin3D 6s linear infinite",
            }}
          >
            language
          </span>
        </div>

        {/* Inline style for the 3D rotation effect */}
        <style>{`
          @keyframes spin3D {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
        `}</style>
      </div>

      {/* Right Side Title (Staggered Animation) */}
      {/* Adjusted positioning to prevent overlap on mobile */}
      <motion.div
        variants={sentence}
        initial="hidden"
        animate="visible"
        className="absolute right-6 md:right-32 top-[55%] md:top-[45%] -translate-y-1/2 flex flex-col items-start z-10 text-white"
      >
        <motion.span
          variants={letter}
          className="material-symbols-outlined text-white mb-4 md:mb-6 text-2xl md:text-3xl font-light"
        >
          south_east
        </motion.span>

        {/* Fluid typography on mobile, fixed on desktop */}
        <h2 className="text-[11vw] sm:text-[8vw] md:text-[55px] font-['Epilogue'] tracking-tight leading-[1.1] font-medium">
          {"Full Stack Developer".split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={letter}
              className="inline-block mr-2 md:mr-3"
            >
              {word}
              {/* إضافة سطر جديد بعد كلمة Stack ليتناسب مع التصميم */}
              {word === "Stack" && <br />}
            </motion.span>
          ))}
        </h2>
      </motion.div>

      {/* Massive Floating Typography (Skill Banner / Marquee) */}
      <div className="w-full pb-8 md:pb-16 overflow-hidden mt-auto relative z-10">
        <div className="marquee-container flex whitespace-nowrap">
          {/* Make sure the container extends correctly for the animation */}
          <div className="marquee-content animate-marquee inline-block">
            {/* Responsive text sizes */}
            <h1 className="font-display-xl text-5xl md:text-7xl lg:text-[120px] font-bold uppercase pr-8 md:pr-16 text-white">
              Next.js — Tailwind CSS — Prisma — TypeScript — UI/UX Strategy —
              system design — Nest.js Microservice — React.js — Tailwind CSS —
              Prisma — TypeScript — UI/UX Strategy — Visual Identity — Adobe
              Creative Suite
            </h1>
          </div>
        </div>

        {/* CSS for Marquee smooth infinite scroll */}
        <style>{`
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); } 
            /* Adjust the -50% to -100% depending on if you duplicate the text for a seamless loop */
          }
        `}</style>
      </div>
    </main>
  );
}
