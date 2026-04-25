"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  // إعدادات اختيارية للتحكم في سلاسة الحركة
  const lenisOptions = {
    lerp: 0.1, // سرعة الاستجابة (كلما قل الرقم زادت النعومة)
    duration: 1.5, // مدة التمرير
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
