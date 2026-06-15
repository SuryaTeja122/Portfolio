import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaRocket,
  FaSearch,
  FaBolt,
  FaCode,
  FaBrain,
  FaDatabase,
  FaLeaf,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    phase: "First Build",
    year: "2023–2024",
    description: "Built my first real web project — an Online Quiz Application during an internship. It sparked my love for frontend development using HTML, CSS, and JavaScript, and showed me how code becomes a real product.",
    color: "#00F0FF",
    icon: FaRocket,
  },
  {
    phase: "Going Deeper with AI",
    year: "2024–2025",
    description: "Designed and deployed AgroChatBot — a multilingual, voice-enabled AI assistant for farmers using React.js, Flask, NLP, and TTS/STT APIs. This project taught me how to build AI-driven real-world solutions end to end.",
    color: "#B200FF",
    icon: FaSearch,
  },
  {
    phase: "Cloud & Agentic AI",
    year: "2025",
    description: "Completed an IBM Cloud internship where I built an Agentic AI Health Symptom Checker using IBM Watsonx, Granite LLMs, and LangGraph. Integrated WHO and CDC data for verified health insights — my most production-grade build yet.",
    color: "#00F0FF",
    icon: FaBolt,
  },
];

const facts = [
  { label: "Years Learning", value: "4+", subtext: "Engineering Journey" },
  { label: "Projects Built", value: "4", subtext: "From Ideas to Reality" },
  { label: "Technologies", value: "10+", subtext: "Always Learning More" },
  { label: "Certifications", value: "1+", subtext: "Proof of Growth" },
];

const focusAreas = [
  { icon: FaCode, title: "Frontend Development", desc: "Building interactive UIs with HTML, CSS, React.js, and modern web technologies" },
  { icon: FaBrain, title: "AI & NLP", desc: "Creating intelligent chatbots and AI-powered applications using LLMs and NLP" },
  { icon: FaDatabase, title: "Databases", desc: "Working with MySQL, Firebase, and Microsoft SQL for data-driven apps" },
  { icon: FaLeaf, title: "Python Development", desc: "Scripting, automation, Flask APIs, and AI integrations using Python" },
];

export default function About({ onOpenContact }: { onOpenContact?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".journey-card").forEach((card, index: number) => {
        gsap.from(card as HTMLElement, { opacity: 0, y: 60, rotation: -5, duration: 0.8, delay: index * 0.2, ease: "power3.out", scrollTrigger: { trigger: card as HTMLElement, start: "top 80%", once: true } });
      });
      gsap.utils.toArray(".fact-card").forEach((card, index: number) => {
        gsap.from(card as HTMLElement, { opacity: 0, scale: 0.8, duration: 0.8, delay: index * 0.15, ease: "back.out", scrollTrigger: { trigger: card as HTMLElement, start: "top 85%", once: true } });
      });
      const textLines = textRef.current?.querySelectorAll(".text-line");
      if (textLines) {
        textLines.forEach((line: Element, index: number) => {
          gsap.from(line, { opacity: 0, x: -40, duration: 0.6, delay: index * 0.1, ease: "power3.out", scrollTrigger: { trigger: line, start: "top 90%", once: true } });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative w-full bg-transparent overflow-hidden z-10 py-20 md:py-32">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B200FF]/10 rounded-full blur-3xl pointer-events-none opacity-20 -z-10" />
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none opacity-20 -z-10" />
      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <span className="text-[#00F0FF] font-mono text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 block uppercase">// About Me</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00F0FF] to-[#B200FF] tracking-tight mb-4">Turning Ideas Into Code</h2>
          <p className="text-white/60 font-light max-w-2xl text-sm sm:text-base">A B.Tech CSE (IoT) graduate passionate about AI, chatbot development, and frontend engineering.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-16 sm:mb-20">
          <motion.div style={{ opacity, y }} className="flex flex-col justify-center" ref={textRef}>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {[
                "I'm a B.Tech CSE (IoT) graduate from Presidency University, Bangalore, passionate about frontend development, AI, and building products that solve real problems. My journey began with web development and grew into building intelligent, voice-enabled AI applications.",
                "I developed AgroChatBot, a multilingual voice-enabled AI assistant for farmers — built with React.js, Flask, Node.js, and NLP. It delivers real-time translation, intent detection, and smart crop recommendations to help farmers make informed decisions.",
                "During my IBM Cloud internship, I built an Agentic AI Health Symptom Checker using IBM Watsonx and Granite LLMs with LangGraph for agentic workflows. Integrated WHO and CDC data sources for reliable, verified health guidance.",
                "I'm always building, always learning — and open to connecting with fellow developers, AI enthusiasts, and innovators. Let's create something impactful together!",
              ].map((text, index) => (
                <p key={index} className="text-line text-white/70 leading-relaxed text-sm sm:text-base md:text-lg font-light">{text}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10">
              <motion.a href="https://www.linkedin.com/in/surya-bhiguva" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-[#00F0FF] text-[#00F0FF] font-mono text-sm uppercase tracking-wider hover:bg-[#00F0FF] hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Connect on LinkedIn</motion.a>
              <motion.button onClick={onOpenContact}
                className="px-6 py-3 rounded-lg border border-[#B200FF] text-[#B200FF] font-mono text-sm uppercase tracking-wider hover:bg-[#B200FF] hover:text-white transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Get In Touch</motion.button>
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div key={index} className="journey-card group relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-4 sm:p-5 md:p-6 hover:border-white/50 transition-all duration-500 overflow-hidden"
                  style={{ boxShadow: `0 0 40px ${step.color}15, inset 0 0 20px ${step.color}10` }} whileHover={{ y: -5 }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${step.color}20, transparent)` }} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-1 flex items-center gap-2 sm:gap-3">
                          <IconComponent className="text-base sm:text-lg md:text-xl" />{step.phase}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono text-white/60">{step.year}</p>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed text-xs sm:text-sm">{step.description}</p>
                    <div className="mt-4 h-1 w-12 rounded-full" style={{ backgroundColor: step.color }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div className="mt-16 sm:mt-20 md:mt-32" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, margin: "-100px" }}>
          <div className="mb-8 sm:mb-10 md:mb-12 text-center">
            <span className="text-[#B200FF] font-mono text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 block uppercase">// Quick Facts</span>
            <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00F0FF] to-[#B200FF] tracking-tight">By The Numbers</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-0">
            {facts.map((fact, index) => (
              <motion.div key={index} className="fact-card relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-3 sm:p-4 md:p-6 text-center hover:border-white/50 transition-all duration-500 group"
                style={{ boxShadow: `0 0 40px ${index % 2 === 0 ? "#00F0FF" : "#B200FF"}15, inset 0 0 20px ${index % 2 === 0 ? "#00F0FF" : "#B200FF"}10` }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `linear-gradient(135deg, ${index % 2 === 0 ? "#00F0FF" : "#B200FF"}20, transparent)` }} />
                <div className="relative z-10">
                  <motion.p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1 sm:mb-2" whileHover={{ scale: 1.1 }}>{fact.value}</motion.p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-wider text-white/60 mb-0.5 sm:mb-1 leading-tight">{fact.label}</p>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-white/40 leading-tight">{fact.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-16 sm:mt-20 md:mt-32 relative rounded-2xl border border-white/20 bg-linear-to-br from-black/50 to-black/30 backdrop-blur-xl p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, margin: "-100px" }}
          style={{ boxShadow: `0 0 60px rgba(0, 240, 255, 0.1), inset 0 0 30px rgba(178, 0, 255, 0.05)` }}>
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00F0FF]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B200FF]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          <div className="relative z-10 text-center">
            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00F0FF] to-[#B200FF] mb-4 sm:mb-6">Core Focus Right Now</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8 mt-6 sm:mt-8">
              {focusAreas.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div key={index} className="flex gap-3 sm:gap-4" whileHover={{ x: 10 }}>
                    <IconComponent className="text-2xl sm:text-3xl text-[#00F0FF] shrink-0" />
                    <div className="text-left">
                      <h4 className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
