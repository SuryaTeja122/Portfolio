import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    id: 1,
    title: "HP LIFE Internship",
    issuer: "HP LIFE",
    date: "2025",
    description: "Completed the HP LIFE internship program, gaining hands-on experience in professional skills and technology applications in real-world business scenarios.",
    pdf: "/cert_hp_internship.pdf",
    credentialId: "",
    color: "#00F0FF",
  },
  {
    id: 2,
    title: "IBM SkillsBuild – AI",
    issuer: "IBM SkillsBuild",
    date: "2025",
    description: "Earned the IBM SkillsBuild AI Certificate, demonstrating proficiency in artificial intelligence fundamentals, machine learning concepts, and IBM Watsonx tools.",
    pdf: "/cert_ibm_ai.pdf",
    credentialId: "",
    color: "#B200FF",
  },
  {
    id: 3,
    title: "IBM SkillsBuild – Employability",
    issuer: "IBM SkillsBuild",
    date: "2025",
    description: "Completed IBM SkillsBuild Employability program, building professional skills in communication, problem-solving, and workplace readiness.",
    pdf: "/cert_ibm_employability.pdf",
    credentialId: "",
    color: "#00F0FF",
  },
  {
    id: 4,
    title: "Frontend Web Development",
    issuer: "Internship Certificate",
    date: "2024",
    description: "Completed a Frontend Web Development internship, building responsive and interactive web applications using HTML, CSS, and JavaScript.",
    pdf: "/cert_frontend_webdev.pdf",
    credentialId: "",
    color: "#B200FF",
  },
  {
    id: 5,
    title: "Python Course",
    issuer: "Pyspiders",
    date: "2024",
    description: "Successfully completed Python programming course at Pyspiders, covering core Python concepts, data structures, and practical application development.",
    pdf: "/cert_pyspiders.pdf",
    credentialId: "",
    color: "#00F0FF",
  },
  {
    id: 6,
    title: "Deloitte Job Simulation",
    issuer: "Deloitte",
    date: "2025",
    description: "Completed Deloitte's virtual job simulation, gaining practical exposure to consulting workflows, data analysis, and professional problem-solving.",
    pdf: "/cert_deloitte.pdf",
    credentialId: "",
    color: "#B200FF",
  },
  {
    id: 7,
    title: "Goldman Sachs Job Simulation",
    issuer: "Goldman Sachs",
    date: "2023",
    description: "Completed Goldman Sachs virtual job simulation, exploring financial analysis, software engineering concepts, and password security practices.",
    pdf: "/cert_goldman.pdf",
    credentialId: "",
    color: "#00F0FF",
  },
  {
    id: 8,
    title: "TCS ESG Job Simulation",
    issuer: "Tata Consultancy Services",
    date: "2023",
    description: "Completed TCS ESG (Environmental, Social, Governance) virtual job simulation, exploring sustainability practices and corporate responsibility in technology.",
    pdf: "/cert_tcs.pdf",
    credentialId: "",
    color: "#B200FF",
  },
  {
  id: 9,
  title: "TCS iON Career Edge – Generative AI Essentials",
  issuer: "Tata Consultancy Services (TCS iON)",
  date: "Jun 2026",
  description: "Completed TCS iON Career Edge course covering Foundations of AI & ML, Fundamentals of Generative AI, Prompt Engineering, Responsible AI, and Real-world Implementation.",
  pdf: "TCS_ION_Course.pdf",
  credentialId: "8773-27647617-1016",
  color: "#00F0FF",
},
];

type Achievement = typeof achievements[0];

function CertModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        <motion.div
          className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/20 bg-[#0a0a0a] overflow-hidden shadow-2xl flex flex-col"
          style={{ maxHeight: "90vh", boxShadow: `0 0 60px ${achievement.color}30` }}
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0"
            style={{ background: `linear-gradient(135deg, ${achievement.color}15, transparent)` }}>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{achievement.title}</h3>
              <p className="text-white/50 font-mono text-xs mt-0.5">{achievement.issuer} · {achievement.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <a href={achievement.pdf} download
                className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all duration-200 hover:scale-105"
                style={{ borderColor: achievement.color, color: achievement.color }}>
                ⬇ Download
              </a>
              <button onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden" style={{ minHeight: "65vh" }}>
            <iframe
              src={`${achievement.pdf}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full"
              style={{ minHeight: "65vh", border: "none", background: "#fff" }}
              title={achievement.title}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Achievement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".achievement-card").forEach((card, index: number) => {
        gsap.from(card as HTMLElement, {
          opacity: 0, y: 50, scale: 0.9, duration: 0.5,
          delay: index * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: card as HTMLElement, start: "top 85%", once: true },
        });
      });
    }, containerRef);
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={containerRef} id="achievements" className="relative w-full bg-transparent overflow-hidden z-10 py-20 md:py-32">
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 mb-16 md:mb-20">
        <span className="text-[#B200FF] font-mono text-sm tracking-widest mb-4 block uppercase">// Achievements & Certifications</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00F0FF] to-[#B200FF] tracking-tight mb-4">
          Recognition & Growth
        </h2>
        <p className="text-white/60 font-light max-w-2xl">
          Certifications and achievements that showcase my commitment to continuous learning and professional development.
        </p>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1200px]:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="achievement-card group relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-white/50 transition-all duration-300 cursor-pointer hover:shadow-xl h-full flex flex-col"
              style={{ boxShadow: `0 0 40px ${achievement.color}15, inset 0 0 20px ${achievement.color}10` }}
              onClick={() => setSelected(achievement)}
            >
              {/* PDF Preview on top - iframe thumbnail */}
              <div className="relative w-full h-36 sm:h-40 md:h-44 overflow-hidden bg-white shrink-0">
                <iframe
                  src={`${achievement.pdf}#toolbar=0&navpanes=0&scrollbar=0&zoom=75`}
                  className="w-full h-full pointer-events-none"
                  style={{ border: "none", transform: "scale(1)", transformOrigin: "top left" }}
                  title={`${achievement.title} preview`}
                  loading="lazy"
                />
                {/* Overlay to intercept clicks and show date badge */}
                <div className="absolute inset-0" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                  <p className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">{achievement.date}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6 relative z-10 flex flex-col grow">
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 flex flex-col grow">
                  <h3 className="text-lg sm:text-lg md:text-xl font-black text-white tracking-tight mb-2">{achievement.title}</h3>
                  <p className="text-sm text-white/70 font-mono mb-3">{achievement.issuer}</p>
                  <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-3 grow">{achievement.description}</p>
                  {achievement.credentialId && (
                    <p className="text-xs text-white/50 font-mono mb-4 break-all">ID: {achievement.credentialId}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider mt-auto">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: achievement.color }} />
                    <span className="text-white/80 group-hover:text-white transition-colors">View Certificate</span>
                    <span className="text-white/50 group-hover:text-white/80 transition-colors">→</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${achievement.color}20, transparent)` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#B200FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />

      {selected && <CertModal achievement={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
