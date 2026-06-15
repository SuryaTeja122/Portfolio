import React, { useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Achievements from "./components/Achievements";
import Experience from "./components/Experience";
import Background3D from "./components/Background3D";
import ContactModal from "./components/ContactModal";

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const bgDimmerOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 0.85]);

  useEffect(() => {
    // Ensure all pinned spacer bounds calculate properly
    // once heavy 3D react-three-fiber components mount.
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div data-theme="dark" className="relative w-full font-sans overflow-x-hidden selection:bg-[#B200FF]/30 selection:text-white transition-colors duration-500 text-white bg-[#020202]">
        {/* 3D WebGL Background Layer */}
        <Background3D />

        {/* Dynamic Background Dimmer for Terminal Zone */}
        <motion.div
          style={{ opacity: bgDimmerOpacity }}
          className="fixed inset-0 z-5 pointer-events-none bg-[#020202]"
        />

        <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 md:pt-20 lg:pt-0 pointer-events-auto">
          <Navbar onOpenContact={() => setIsContactModalOpen(true)} />

          <main className="w-full px-4 sm:px-6 md:px-12 lg:px-24">
            <Hero />
            <About onOpenContact={() => setIsContactModalOpen(true)} />
            <Projects />
            <TechStack />
            <Achievements />
            <Experience onOpenContact={() => setIsContactModalOpen(true)} />
          </main>

          <footer className="w-full border-t border-white/5 py-4 sm:py-6 md:py-8 px-4 sm:px-6 flex flex-col items-center justify-center text-gray-500 font-mono text-[0.65rem] sm:text-xs tracking-widest relative z-10 pointer-events-auto">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 text-center">
              <span className="text-white font-extrabold italic text-lg sm:text-xl md:text-2xl tracking-wide">
                Thank You
              </span>
            </div>
            <p className="text-center wrap-break-word sm:break-normal">
              © 2025 B SURYA TEJA // ALL RIGHTS RESERVED
            </p>
          </footer>
        </div>

        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
    </ReactLenis>
  );
}

export default App;
