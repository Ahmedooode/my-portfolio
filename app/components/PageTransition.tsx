"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const transitionEase = [0.76, 0, 0.24, 1] as const;

const projectNames: Record<string, string> = {
  wujud: "Wujud",
  atmosphere: "Atmosphere",
  "al-marid": "Al Ma'rid",
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [curveHeight, setCurveHeight] = useState(300);

  // ✨ تم حل مشكلة (cascading renders) هنا
  useEffect(() => {
    const updateHeight = () => {
      setCurveHeight(window.innerWidth < 768 ? 150 : 300);
    };

    updateHeight(); // حساب مبدئي عند التحميل
    window.addEventListener("resize", updateHeight);

    // استخدام setTimeout لتأخير تغيير الحالة قليلاً وتجنب تحذير React
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => {
      window.removeEventListener("resize", updateHeight);
      clearTimeout(timer); // تنظيف الـ timer
    };
  }, []);

  const getPageName = (path: string) => {
    if (path === "/") return "Home";
    const segments = path.split("/").filter(Boolean);
    if (segments[0] === "work" && segments[1]) {
      const projectId = segments[1];
      return projectNames[projectId] || projectId.replace(/-/g, " ");
    }
    if (segments[0] === "work") return "Projects";
    return segments[0].replace(/-/g, " ");
  };

  const slideVariants: Variants = {
    initial: { y: "0dvh" },
    enter: {
      y: `calc(-100dvh - ${curveHeight}px)`,
      transition: { duration: 1.2, ease: transitionEase, delay: 1.4 },
    },
  };

  const curveVariants: Variants = {
    initial: { d: "M0 300 Q500 300 1000 300 L1000 0 L0 0 Z" },
    enter: {
      d: "M0 300 Q500 0 1000 300 L1000 0 L0 0 Z",
      transition: { duration: 1.2, ease: transitionEase, delay: 1.4 },
    },
  };

  // ✨ تم حل مشكلة TypeScript بإضافة (: any) لتجاوز تعارض أنواع مصفوفة الـ filter
  const textVariants: Variants = {
    initial: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    enter: {
      opacity: [0, 1, 1, 0],
      y: [40, 0, 0, -40],
      filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"],
      transition: {
        duration: 1.8,
        times: [0, 0.2, 0.8, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full bg-white dark:bg-black">
        {isMounted && (
          <motion.div
            className="fixed top-0 left-0 w-full h-[100dvh] pointer-events-none z-[9998] flex flex-col"
            variants={slideVariants}
            initial="initial"
            animate="enter"
            style={{ willChange: "transform" }}
          >
            {/* Background Layer */}
            <div className="relative w-full h-full bg-[#1C1D20] flex items-center justify-center">
              {/* Page Name Text */}
              <motion.p
                className="text-white text-3xl md:text-6xl capitalize font-medium tracking-widest whitespace-nowrap px-4 text-center"
                variants={textVariants}
                initial="initial"
                animate="enter"
              >
                {getPageName(pathname)}
              </motion.p>
            </div>

            {/* SVG Curve Layer */}
            <svg
              className="absolute left-0 top-full w-full pointer-events-none"
              style={{ height: `${curveHeight}px`, willChange: "transform" }}
              viewBox="0 0 1000 300"
              preserveAspectRatio="none"
            >
              <motion.path
                className="fill-[#1C1D20]"
                variants={curveVariants}
                initial="initial"
                animate="enter"
              />
            </svg>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: transitionEase }}
          className="relative z-0"
        >
          {children}
        </motion.main>
      </div>
    </AnimatePresence>
  );
}
