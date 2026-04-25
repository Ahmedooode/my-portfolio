import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import WorkGallery from "./components/WorkGallery";
import Footer from "./components/Footer";
import AboutIntro from "./components/AboutIntro";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <Navbar />
      <Hero />
      <AboutIntro />

      <WorkGallery />
      <Footer />

      {/* Custom Cursor (Optional static div for now) */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-stone-900 pointer-events-none z-[100] custom-cursor hidden lg:block"
        id="cursor"
      ></div>
    </main>
  );
}
