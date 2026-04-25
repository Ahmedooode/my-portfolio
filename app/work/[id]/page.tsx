"use client";

import { useParams, notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";

// قاعدة بيانات المشاريع (تأكد من وجود المسارات الحقيقية للصور)
const projectsData = {
  wujud: {
    title: "Wujud",
    arabicTitle: "وجود",
    description:
      "نظام إدارة حضور وانصراف متكامل يعتمد على التقنيات الجيوفيزيائية (Geofencing) لضمان دقة البيانات وتحسين إنتاجية الموظفين.",
    role: "Full Stack Developer & UI/UX Designer",
    tech: ["Next.js", "TypeScript", "Prisma", "Clerk", "Tailwind CSS"],
    challenge:
      "كان التحدي الأكبر هو إنشاء نظام دقيق لا يمكن التلاعب به في تسجيل الحضور، مع توفير لوحة تحكم سهلة الاستخدام لأربعة مستويات من الصلاحيات.",
    solution:
      "تم استخدام تقنيات الموقع الجغرافي المتقدمة مع واجهة مستخدم بسيطة تركز على السرعة والكفاءة، وبناء قاعدة بيانات متينة باستخدام Prisma.",
    liveUrl: "https://wujud-lime.vercel.app/ar",
    githubUrl: "https://github.com/Ahmedooode/wujud.git",
    imgUrl: "/images/wj-01.png",
    gallery: ["/images/wj-04.png", "/images/wj-02.png", "/images/wj-03.png"],
  },
  atmosphere: {
    title: "Atmosphere",
    arabicTitle: "أتموسفير",
    description:
      "منصة إلكترونية متكاملة لمقهى ومحمصة أتموسفير، تهدف لتقديم تجربة شراء سلسة تليق بعشاق القهوة المختصة.",
    role: "Lead Developer",
    tech: ["Next.js", "Salla API", "Tailwind CSS", "Framer Motion"],
    challenge:
      "الربط مع Salla API بشكل متزامن مع الحفاظ على سرعة تصفح عالية وتجربة مستخدم بصرية مميزة.",
    solution:
      "استخدام Server-side Rendering لتحسين الأداء وتطبيق تأثيرات حركية ناعمة تعكس هوية العلامة التجارية الهادئة.",
    liveUrl: "https://atmosphere-cafe.vercel.app/ar",
    githubUrl: "https://github.com/Ahmedooode",
    imgUrl: "/images/Atmosphere-01.png",
    gallery: [
      "/images/Atmosphere-02.png",
      "/images/Atmosphere-03.png",
      "/images/Atmosphere-04.png",
    ],
  },
  "al-marid": {
    title: "Al Ma'rid",
    arabicTitle: "المارد للسيارات",
    description:
      "موقع إلكتروني متطور لمعرض سيارات يتيح عرض وإدارة المخزون بطريقة عصرية وسهلة.",
    role: "Full Stack Developer",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    challenge:
      "عرض عدد كبير من الصور والمواصفات لكل سيارة دون التأثير على وقت تحميل الصفحة.",
    solution:
      "تحسين الصور ديناميكياً واستخدام واجهات مستخدم تعتمد على البطاقات المنظمة لسهولة التصفح.",
    liveUrl: "https://al-marid-cars.vercel.app/",
    githubUrl: "https://github.com/Ahmedooode/al-marid-cars",
    imgUrl: "/images/al-marid-2.png",
    gallery: [
      "/images/al-marid-1.png",
      "/images/al-marid-3.png",
      "/images/al-marid-4.png",
    ],
  },
};

export default function ProjectDetails() {
  const params = useParams();
  const id = params.id as string;
  const project = projectsData[id as keyof typeof projectsData];

  // حساب المشروع التالي
  const projectKeys = Object.keys(projectsData);
  const currentIndex = projectKeys.indexOf(id);
  const nextIndex = (currentIndex + 1) % projectKeys.length;
  const nextProjectId = projectKeys[nextIndex];
  const nextProject = projectsData[nextProjectId as keyof typeof projectsData];

  // إعداد Parallax للصورة الرئيسية (Hero)
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroImageY = useTransform(heroScroll, [0, 1], ["-15%", "15%"]);

  // حالة الوقت المباشر للفوتر
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!project) return notFound();

  // إعدادات حركة الظهور المكشوف (Clip Path Reveal) للصور في Gallery
  const revealVariants = {
    hidden: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
    visible: {
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
      transition: { duration: 1, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <main className="bg-[#EAE8E4] min-h-screen text-[#1C1D20] font-sans selection:bg-[#1C1D20] selection:text-white flex flex-col relative overflow-x-hidden">
      <Navbar />

      <div className="flex-grow">
        {/* --- Hero Section --- */}
        <header className="pt-40 md:pt-52 px-6 md:px-16 max-w-[1440px] mx-auto flex flex-col justify-end min-h-[60vh] pb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16"
          >
            <h1 className="text-[15vw] md:text-[12vw] font-medium tracking-tighter leading-[0.85] uppercase break-words flex-grow">
              {project.title}
            </h1>
            <div className="flex flex-col items-start md:items-end gap-2 pb-2 md:pb-6 shrink-0">
              <span className="font-label-caps text-[12px] font-semibold tracking-widest text-[#1C1D20]/50 uppercase">
                Project Name
              </span>
              <p className="text-xl md:text-3xl font-medium whitespace-nowrap">
                {project.arabicTitle}
              </p>
            </div>
          </motion.div>
        </header>

        {/* --- Main Parallax Image --- */}
        <section
          className="px-6 md:px-16 max-w-[1440px] mx-auto mb-24 md:mb-40"
          ref={heroRef}
        >
          <motion.div
            variants={revealVariants}
            initial="hidden"
            animate="visible"
            className="aspect-square md:aspect-[21/9] w-full bg-stone-300 overflow-hidden relative rounded-xl shadow-inner shadow-black/5"
          >
            <motion.img
              style={{ y: heroImageY, scale: 1.1 }}
              src={project.imgUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* --- Meta Data --- */}
        <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32 border-b border-[#1C1D20]/10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="font-label-caps text-[12px] font-semibold tracking-widest text-[#1C1D20]/50 uppercase">
                Role & Services
              </span>
              <p className="text-lg md:text-xl font-medium">{project.role}</p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3">
              <span className="font-label-caps text-[12px] font-semibold tracking-widest text-[#1C1D20]/50 uppercase">
                Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 bg-[#1C1D20]/5 rounded-full text-sm font-medium border border-[#1C1D20]/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row gap-4 md:justify-end items-start mt-6 md:mt-0">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-[#455CE9] text-white rounded-full text-sm font-semibold hover:bg-[#3b4ede] hover:scale-105 transition-all duration-300 flex-1 sm:flex-none text-center"
              >
                Live Site
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-transparent border border-[#1C1D20] text-[#1C1D20] rounded-full text-sm font-semibold hover:bg-[#1C1D20] hover:text-white transition-all duration-300 flex-1 sm:flex-none text-center"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        </section>

        {/* --- Details --- */}
        <section className="px-6 md:px-16 max-w-[1000px] mx-auto pb-32 md:pb-40 flex flex-col gap-24">
          <div className="flex flex-col gap-6 md:gap-10">
            <h3 className="text-[12px] font-semibold tracking-widest text-[#1C1D20]/50 uppercase">
              01. Overview
            </h3>
            <p
              className="text-2xl md:text-4xl leading-[1.4] font-medium text-justify"
              dir="rtl"
            >
              {project.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 border-t border-[#1C1D20]/10 pt-16">
            <div className="flex flex-col gap-6">
              <h4 className="text-[12px] font-semibold tracking-widest text-[#1C1D20]/50 uppercase">
                02. The Challenge
              </h4>
              <p
                className="text-lg md:text-xl leading-relaxed text-[#1C1D20]/80 text-justify"
                dir="rtl"
              >
                {project.challenge}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="text-[12px] font-semibold tracking-widest text-[#1C1D20]/50 uppercase">
                03. The Solution
              </h4>
              <p
                className="text-lg md:text-xl leading-relaxed text-[#1C1D20]/80 text-justify"
                dir="rtl"
              >
                {project.solution}
              </p>
            </div>
          </div>
        </section>

        {/* --- 2. التحسين الجذري لقسم Gallery: صور مستقلة، Parallax داخلي، وحركة ظهور مكشوفة --- */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="px-6 md:px-16 max-w-[1440px] mx-auto pb-40 md:pb-56">
            {/* تم إلغاء Grid واستخدام flex column لتكون كل صورة وحدها */}
            <div className="flex flex-col gap-12 md:gap-20">
              {project.gallery.map((img, index) => (
                <GalleryItem
                  key={index}
                  img={img}
                  title={project.title}
                  index={index}
                  revealVariants={revealVariants}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* --- قسم المشروع التالي (Next Case) بدل الفوتر --- */}
      <section className="w-full bg-[#1C1D20] text-white pt-24 md:pt-40 pb-8 px-6 md:px-16 flex flex-col relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center">
          <span className="font-label-caps text-[12px] font-semibold tracking-widest text-white/50 mb-6 md:mb-10 uppercase">
            Next case
          </span>
          <Link
            href={`/work/${nextProjectId}`}
            className="group relative text-center cursor-pointer"
          >
            <h2 className="text-[15vw] md:text-[10vw] font-medium tracking-tighter leading-none hover:opacity-70 transition-opacity duration-300 break-words">
              {nextProject.title}
            </h2>
          </Link>
          <div className="relative mt-16 md:mt-32 mb-16 md:mb-24 w-full flex justify-center items-center">
            <div className="absolute w-full h-[1px] bg-white/10 left-0"></div>
            <Link
              href="/work"
              className="relative z-10 px-8 md:px-10 py-4 border border-white/20 rounded-full bg-[#1C1D20] text-white text-xs md:text-sm font-medium hover:bg-white hover:text-[#1C1D20] transition-colors duration-300"
            >
              All work
            </Link>
          </div>
          <div className="w-full grid grid-cols-2 md:flex md:flex-row justify-between items-start md:items-end text-white text-xs md:text-sm gap-8 font-medium">
            <div className="flex flex-col gap-2">
              <span className="text-white/50 uppercase text-[10px] tracking-widest font-semibold mb-1">
                Version
              </span>
              <span>2026 © Edition</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/50 uppercase text-[10px] tracking-widest font-semibold mb-1">
                Local Time
              </span>
              <span>{time || "Loading time..."}</span>
            </div>
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
      </section>
    </main>
  );
}

// مكون فرعي لعرض كل صورة في Gallery مع Parallax و Reveal منفصل
const GalleryItem = ({
  img,
  title,
  index,
  revealVariants,
}: {
  img: string;
  title: string;
  index: number;
  revealVariants: any;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax داخلي للصورة (تتحرك قليلاً داخل الحاوية عند التمرير)
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0% -10% 0%" }} // يبدأ التأثير عند اقتراب الصورة من منتصف الشاشة
      className="w-full overflow-hidden bg-stone-300 rounded-xl aspect-[4/3] md:aspect-[21/9] relative shadow-lg shadow-black/5"
    >
      <motion.img
        src={img}
        alt={`${title} screenshot ${index + 1}`}
        style={{ y, scale: 1.1 }} // scale لتوفير مساحة للحركة الداخلية
        className="absolute inset-0 w-full h-full object-cover hover:scale-[1.12] transition-transform duration-1000 ease-out"
      />
    </motion.div>
  );
};
