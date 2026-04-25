"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
// تصحيح: استيراد Link من 'next/link' وليس 'next/navigation'
import Link from "next/link";
import wujudImage from "../../public/images/wj-04.png";
import atmosphereImage from "../../public/images/Atmosphere-02.png";
import almaridImage from "../../public/images/al-marid-2.png";

const projects = [
  {
    id: "01",
    slug: "wujud",
    title: "Wujud",
    category: "Next.js • TypeScript • Prisma",
    arabic: "وجود — نظام إدارة",
    imgUrl: wujudImage.src,
  },
  {
    id: "02",
    slug: "atmosphere",
    title: "Atmosphere",
    category: "Next.js • Salla API • Tailwind",
    arabic: "أتموسفير — مقهى ومحمصة",
    imgUrl: atmosphereImage.src,
  },
  {
    id: "03",
    slug: "al-mar-id", // تأكد أن هذا الـ slug يطابق ما وضعناه في صفحة التفاصيل
    title: "Al Ma'rid",
    category: "Next.js • Tailwind",
    arabic: "المارد للسيارات — معرض سيارات",
    imgUrl: almaridImage.src,
  },
];

export default function WorkPage() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // إعدادات حركة الفأرة (Framer Motion)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <main className="relative min-h-screen bg-stone-100 text-stone-900 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header className="pt-48 pb-20 px-8 md:px-16 max-w-[1440px] mx-auto border-b border-stone-900/10">
        <h1 className="font-display-xl text-[80px] md:text-[120px] font-bold tracking-tighter leading-[0.9] uppercase">
          All Works<span className="text-stone-400">.</span>
        </h1>
      </header>

      {/* The Gallery List */}
      <section className="py-20 px-8 md:px-16 max-w-[1440px] mx-auto">
        <div
          className="relative divide-y divide-stone-900/10 border-y border-stone-900/10 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveProject(null)}
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              // التوجيه لصفحة التفاصيل الديناميكية
              href={`/work/${project.slug}`}
              className="group flex flex-col md:flex-row justify-between items-center py-16 fluid-motion hover:px-8 hover:bg-stone-200/30"
              onMouseEnter={() => setActiveProject(project.id)}
            >
              {/* Project Title & ID */}
              <div className="flex items-baseline gap-8 pointer-events-none">
                <span className="font-label-caps text-[12px] text-stone-400">
                  {project.id}
                </span>
                <h3 className="font-display-lg text-[60px] md:text-[80px] font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-4">
                  {project.title}
                </h3>
              </div>

              {/* Project Details (Tech & Arabic) */}
              <div className="text-right flex flex-col items-end gap-2 pointer-events-none group-hover:-translate-x-4 transition-transform duration-500 mt-4 md:mt-0">
                <span className="font-body-md text-[16px] tracking-wide text-stone-400">
                  {project.category}
                </span>
                <span className="font-body-lg text-[20px]">
                  {project.arabic}
                </span>
              </div>
            </Link>
          ))}

          {/* Floating Image Reveal Effect */}
          <motion.div
            className="fixed pointer-events-none z-50 w-[350px] h-[250px] md:w-[450px] md:h-[320px] overflow-hidden rounded-lg shadow-2xl hidden lg:block"
            style={{
              left: 0,
              top: 0,
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: activeProject ? 1 : 0,
              scale: activeProject ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {projects.map((project) => (
              <img
                key={project.id}
                src={project.imgUrl}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ease-in-out ${
                  activeProject === project.id ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
