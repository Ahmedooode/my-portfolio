"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export default function Reveal({
  children,
  width = "fit-content",
  delay = 0.2,
}: RevealProps) {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 }, // يبدأ مخفياً ومنخفضاً للأسفل قليلاً
          visible: { opacity: 1, y: 0 }, // يظهر وينتقل لمكانه الطبيعي
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.23, 1, 0.32, 1], // نفس الـ easing المستخدم في Lenis للانسجام
        }}
        viewport={{ once: true }} // لكي تظهر الحركة مرة واحدة فقط ولا تتكرر في كل تمريرة
      >
        {children}
      </motion.div>
    </div>
  );
}
