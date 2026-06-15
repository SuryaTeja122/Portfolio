import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Tech", href: "#tech" },
    { label: "Certifications", href: "#achievements" },
    { label: "Experience", href: "#experience" },
  ];

  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0.25, 0.75]);
  const blurValue = useTransform(scrollY, [0, 100], [6, 16]);
  const paddingY = useTransform(scrollY, [0, 100], [12, 8]); // reduced height

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "experience",
        "projects",
        "tech",
        "achievements",
      ];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 flex justify-between items-center transition-all duration-300"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(5, 5, 10, ${v})`),
        backdropFilter: useTransform(blurValue, (v) => `blur(${v}px)`),
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gradient bottom border - cyan to purple */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00F0FF] to-[#B200FF] opacity-60" />

      {/* Logo */}
      <motion.div
        className="flex items-center shrink-0"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <span className="font-black italic text-white text-2xl sm:text-3xl md:text-4xl tracking-tight select-none">
          ST
        </span>
      </motion.div>

      {/* Center Navigation - Desktop */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden min-[770px]:flex items-center gap-6 lg:gap-10 z-10">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);

          return (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative group text-[10px] lg:text-xs xl:text-sm font-sans font-extrabold tracking-wider text-gray-300 transition-all duration-300 uppercase"
              whileHover={{ y: -2 }}
            >
              <span className={`${isActive ? "text-[#00F0FF]" : ""}`}>
                {item.label}
              </span>

              {/* Bottom line indicator */}
              <motion.span
                className="absolute -bottom-1.5 left-0 h-0.5 bg-linear-to-r from-[#00F0FF] via-[#B200FF] to-[#00F0FF] rounded-full"
                animate={{
                  width: isActive ? "100%" : "0%",
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Hover line */}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-linear-to-r from-[#00F0FF] to-[#B200FF] rounded-full group-hover:w-full transition-all duration-400" />
            </motion.a>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="min-[770px]:hidden flex items-center z-50 mr-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <FiX size={24} className="text-white" />
        ) : (
          <FiMenu size={24} className="text-white" />
        )}
      </motion.button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 min-[770px]:hidden z-40"
          >
            <div className="flex flex-col items-start px-4 py-4 gap-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={handleNavClick}
                    className={`text-sm font-extrabold tracking-wider uppercase transition-colors ${
                      isActive
                        ? "text-[#00F0FF]"
                        : "text-gray-300 hover:text-white"
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
              <div className="border-t border-white/10 w-full pt-4 mt-2 flex flex-col gap-3">
                <motion.a
                  href="https://github.com/SuryaTeja122"
                  onClick={handleNavClick}
                  className="text-sm font-semibold text-gray-300 hover:text-[#00F0FF] transition-colors uppercase tracking-wider"
                  whileHover={{ x: 5 }}
                >
                  GitHub
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/surya-bhiguva"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="text-sm font-semibold text-gray-300 hover:text-[#00F0FF] transition-colors uppercase tracking-wider"
                  whileHover={{ x: 5 }}
                >
                  LinkedIn
                </motion.a>
                <motion.button
                  onClick={() => {
                    onOpenContact?.();
                    handleNavClick();
                  }}
                  className="text-sm font-semibold text-gray-300 hover:text-[#00F0FF] transition-colors uppercase tracking-wider text-left"
                  whileHover={{ x: 5 }}
                >
                  Contact
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Icons - Desktop */}
      <div className="hidden min-[770px]:flex items-center gap-6 lg:gap-10 z-10">
        <motion.a
          href="https://github.com/SuryaTeja122"
          className="text-gray-400 hover:text-[#00F0FF] transition-all duration-300"
          aria-label="GitHub"
          whileHover={{ scale: 1.1, y: -2 }}
        >
          <FiGithub size={19} />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/surya-bhiguva"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#00F0FF] transition-all duration-300"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.1, y: -2 }}
        >
          <FiLinkedin size={19} />
        </motion.a>
        <motion.button
          onClick={onOpenContact}
          className="text-gray-400 hover:text-[#00F0FF] transition-all duration-300 cursor-pointer"
          aria-label="Email"
          whileHover={{ scale: 1.1, y: -2 }}
        >
          <FiMail size={19} />
        </motion.button>
      </div>
    </motion.nav>
  );
}
