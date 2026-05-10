"use client";

import Navbar from "../components/Navbar";
import WorkGallery from "../components/WorkGallery";
import Footer from "../components/Footer";

export default function WorkPage() {
  return (
    <main className="bg-[#EAE8E4] min-h-screen">
      <Navbar />
      <div className="pt-32 md:pt-48">
        <div className="px-6 md:px-16 max-w-[1440px] mx-auto">
          <h1 className="text-[12vw] md:text-[8vw] font-medium tracking-tighter leading-none mb-12 uppercase">
            Projects
          </h1>
        </div>
        <WorkGallery />
      </div>
      <Footer />
    </main>
  );
}
