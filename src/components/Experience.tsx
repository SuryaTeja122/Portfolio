import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Badge from "./Badge";
import { FaBriefcase, FaMapMarkerAlt, FaClock } from "react-icons/fa";

interface ExperienceProps {
  onOpenContact: () => void;
}

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    position: "Agentic AI Intern",
    company: "IBM Cloud",
    type: "Internship",
    duration: "July 2025",
    durationShort: "1 mo",
    location: "Remote",
    locationType: "Remote",
    color: "#00F0FF",
  },
  {
    id: 2,
    position: "Frontend Web Developer Intern",
    company: "IBM SkillsBuild",
    type: "Internship",
    duration: "August 2025 ",
    durationShort: "1 mo",
    location: "Remote",
    locationType: "Remote",
    color: "#B200FF",
  },
  {
    id: 3,
    position: "Employability Skills Intern",
    company: "IBM SkillsBuild",
    type: "Internship",
    duration: "November 2025",
    durationShort: "1 mo",
    location: "Remote",
    locationType: "Remote",
    color: "#00F0FF",
  },
  {
    id: 4,
    position: "Agile Project Management Intern",
    company: "HP LIFE",
    type: "Internship",
    duration: "March 2025",
    durationShort: "2 mo",
    location: "Remote",
    locationType: "Remote",
    color: "#B200FF",
  },
];

export default function Experience({ onOpenContact }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate experience cards on scroll
      gsap.utils.toArray(".experience-card").forEach((card, index: number) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 40, // Changed from x to y for a cleaner grid staggered reveal
          duration: 0.4,
          delay: index * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full bg-transparent overflow-hidden z-10 py-20 md:py-32"
    >
      {/* Background Gradient Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#B200FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />

      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <Badge label="Work Experience" variant="primary" />
          <span className="text-[#B200FF] font-mono text-sm tracking-widest mb-4 block uppercase mt-4">
            // Internships & Learning
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00F0FF] to-[#B200FF] tracking-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-white/60 font-light max-w-2xl">
            Building real-world experience through internships and hands-on
            learning at innovative organizations.
          </p>
        </div>

        {/* Experience Grid - Updated to CSS Grid */}
        <div className="grid grid-cols-1 min-[1000px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-6 xl:gap-8">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              className="experience-card group relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-4 sm:p-5 md:p-6 hover:border-white/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
              style={{
                boxShadow: `0 0 40px ${exp.color}15, inset 0 0 20px ${exp.color}10`,
              }}
              whileHover={{ y: -5 }}
            >
              {/* Hover Gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${exp.color}20, transparent)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col grow">
                <div className="flex flex-col gap-4">
                  {/* Left side - Position and Company */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FaBriefcase className="text-[#00F0FF]" size={16} />
                      <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight">
                        {exp.position}
                      </h3>
                    </div>
                    <p className="text-lg text-white/80 font-semibold mb-1">
                      {exp.company}
                    </p>
                    <p className="text-sm text-white/60 font-mono mb-4">
                      {exp.type}
                    </p>
                  </div>

                  {/* Duration Badge */}
                  <div className="flex items-start">
                    <div className="text-left">
                      <p className="text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                        Duration
                      </p>
                      <p className="text-sm font-mono font-bold text-[#00F0FF]">
                        {exp.durationShort}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom - Duration and Location (pushed to bottom using mt-auto) */}
                <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <FaClock size={14} className="text-white/40 shrink-0" />
                    <span className="text-sm text-white/60">
                      {exp.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt
                      size={14}
                      className="text-white/40 shrink-0"
                    />
                    <span className="text-sm text-white/60 line-clamp-1">
                      {exp.location}
                    </span>
                  </div>

                  {/* Remote Badge */}
                  <div className="inline-flex w-fit mt-2 px-3 py-1 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/50">
                    <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">
                      {exp.locationType}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy Quote Section */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/80 italic leading-relaxed mb-6">
            "Build things that matter. Every line of code is a step toward something bigger."
          </p>
          <p className="text-[#B200FF] font-light text-sm md:text-base tracking-wide">
            ~ Surya Teja
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/70 mb-6">
            Open to full-time opportunities and exciting projects!
          </p>
          <motion.button
            type="button"
            onClick={onOpenContact}
            className="inline-block px-8 py-3 rounded-lg border border-[#00F0FF] text-[#00F0FF] font-mono text-sm uppercase tracking-wider hover:bg-[#00F0FF] hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
