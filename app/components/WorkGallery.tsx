"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import wujudImage from "../../public/images/wj-04.png";
import atmosphereImage from "../../public/images/Atmosphere-02.png";
import almaridImage from "../../public/images/al-marid-2.png";

// تم إضافة خاصية (slug) لكل مشروع لإنشاء الرابط الديناميكي
const projects = [
  {
    id: "01",
    title: "Wujud",
    slug: "wujud", // الرابط سيكون: /work/wujud
    category: "Next.js • TypeScript • Prisma • Clerk",
    arabic: "وجود — نظام إدارة",
    imgUrl: wujudImage.src,
  },
  {
    id: "02",
    title: "Atmosphere",
    slug: "atmosphere", // الرابط سيكون: /work/atmosphere
    category: "Next.js • Salla API • Tailwind • Framer Motion",
    arabic: "أتموسفير — مقهى ومحمصة",
    imgUrl: atmosphereImage.src,
  },
  {
    id: "03",
    title: "Al Ma'rid",
    slug: "al-marid", // الرابط سيكون: /work/al-marid
    category: "Next.js • Tailwind • Framer Motion",
    arabic: "المارد للسيارات — معرض سيارات",
    imgUrl: almaridImage.src,
  },
];

export default function WorkGallery() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // 1. Setup Motion Values to track the mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Apply a Spring physics config for that "heavy/fluid" drag effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3. Update coordinates whenever the mouse moves over the list container
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <main
      className="py-24 md:py-40 px-6 md:px-16 max-w-[1440px] mx-auto"
      id="work"
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-0">
        <div>
          <span className="font-label-caps text-[12px] font-semibold tracking-widest text-stone-400 block mb-2 md:mb-4 uppercase">
            SELECTED WORKS
          </span>
          <h2 className="font-headline-md text-4xl md:text-[48px] font-medium tracking-tight">
            Recent Projects
          </h2>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex bg-stone-200 p-1 rounded-full items-center self-start md:self-auto">
          <button
            onClick={() => setViewMode("list")}
            className={`px-6 py-2 rounded-full font-label-caps text-[12px] font-semibold uppercase transition-all duration-300 ${
              viewMode === "list"
                ? "bg-stone-100 shadow-sm text-stone-900"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-6 py-2 rounded-full font-label-caps text-[12px] font-semibold uppercase transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-stone-100 shadow-sm text-stone-900"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Conditional Rendering based on viewMode */}
      {viewMode === "list" ? (
        /* LIST VIEW */
        <div
          className="relative divide-y divide-stone-900/10 border-y border-stone-900/10 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveProject(null)}
        >
          {projects.map((project) => (
            // تم التغيير هنا إلى <Link> واستخدام href="/work/slug"
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-16 fluid-motion hover:px-0 md:hover:px-8 hover:bg-transparent md:hover:bg-stone-200/30 gap-0"
              onMouseEnter={() => setActiveProject(project.id)}
            >
              <div className="flex items-baseline gap-4 md:gap-8 pointer-events-none w-full md:w-auto">
                <span className="font-label-caps text-[12px] text-stone-400 shrink-0">
                  {project.id}
                </span>
                <h3 className="font-display-lg text-4xl sm:text-5xl md:text-[80px] font-semibold tracking-tight transition-transform duration-500 md:group-hover:translate-x-4">
                  {project.title}
                </h3>
              </div>

              <div className="md:text-right flex flex-col md:items-end gap-1 md:gap-2 pointer-events-none md:group-hover:-translate-x-4 transition-transform duration-500 pl-8 md:pl-0 mt-4 md:mt-0">
                <span className="font-body-md text-[13px] md:text-[16px] tracking-wide text-stone-400">
                  {project.category}
                </span>
                <span className="font-body-lg text-[16px] md:text-[20px]">
                  {project.arabic}
                </span>
              </div>
            </Link>
          ))}

          {/* Floating Image Reveal */}
          <motion.div
            className="fixed pointer-events-none z-50 w-[450px] h-[320px] overflow-hidden rounded-lg shadow-2xl hidden md:block"
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
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8">
          {projects.map((project) => (
            // تم التغيير هنا أيضاً إلى <Link>
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group flex flex-col gap-4 md:gap-6 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-stone-200">
                <img
                  src={project.imgUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-display-md text-2xl md:text-[28px] font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <span className="font-label-caps text-[12px] text-stone-400">
                    {project.id}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-body-md text-[13px] md:text-[14px] text-stone-500 leading-snug">
                    {project.category}
                  </span>
                  <span className="font-body-lg text-[15px] md:text-[16px] text-stone-900 mt-1">
                    {project.arabic}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Footer Button */}
      <div className="mt-16 md:mt-32 flex justify-center">
        <Link
          href="/work"
          className="group relative px-8 py-4 md:px-12 md:py-6 border border-stone-900 rounded-full font-label-caps text-[12px] font-semibold uppercase hover:bg-stone-900 hover:text-stone-100 transition-colors duration-300 text-center"
        >
          More Work
        </Link>
      </div>
    </main>
  );
}
