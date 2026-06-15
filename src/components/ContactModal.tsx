import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPhone, FiMail } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[90vw] sm:max-w-md"
          >
            <div
              className="relative rounded-2xl border border-white/20 bg-linear-to-br from-black/80 to-black/60 backdrop-blur-xl p-6 sm:p-8 overflow-hidden"
              style={{
                boxShadow: `0 0 60px rgba(0, 240, 255, 0.15), inset 0 0 30px rgba(178, 0, 255, 0.08)`,
              }}
            >
              {/* Gradient background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00F0FF]/20 rounded-full blur-3xl pointer-events-none opacity-40" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#B200FF]/20 rounded-full blur-3xl pointer-events-none opacity-40" />

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:ring-offset-2 focus:ring-offset-black"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
              >
                <FiX size={20} className="text-white" />
              </motion.button>

              <div className="relative z-10">
                {/* Header */}
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Get In Touch
                </h2>
                <p className="text-white/60 text-sm mb-8">
                  Reach out to me directly
                </p>

                {/* Contact Items */}
                <div className="space-y-3 sm:space-y-4 mb-8">
                  {/* Phone */}
                  <motion.a
                    href="tel:+919182088595"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/10 hover:border-[#00F0FF]/50 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-2 sm:p-3 rounded-lg bg-[#00F0FF]/20 group-hover:bg-[#00F0FF]/30 transition-colors shrink-0">
                      <FiPhone size={18} className="text-[#00F0FF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-xs uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-white font-mono font-bold">
                        +91 9182088595
                      </p>
                    </div>
                    <span className="text-white/30 group-hover:text-[#00F0FF] transition-colors">
                      →
                    </span>
                  </motion.a>

                  {/* Email */}
                  <motion.a
                    href="mailto:suryabhiguva@gmail.com"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/10 hover:border-[#B200FF]/50 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-2 sm:p-3 rounded-lg bg-[#B200FF]/20 group-hover:bg-[#B200FF]/30 transition-colors shrink-0">
                      <FiMail size={18} className="text-[#B200FF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-xs uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-white font-mono font-bold text-sm break-all">
                        suryabhiguva@gmail.com
                      </p>
                    </div>
                    <span className="text-white/30 group-hover:text-[#B200FF] transition-colors">
                      →
                    </span>
                  </motion.a>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8" />

                {/* Social Links */}
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-4">
                    Connect With Me
                  </p>
                  <div className="flex gap-3">
                    <motion.a
                      href="https://www.linkedin.com/in/surya-bhiguva"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-lg border border-white/10 hover:border-[#0A66C2] bg-white/5 hover:bg-[#0A66C2]/10 transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedin size={18} className="text-[#0A66C2]" />
                      <span className="text-white text-sm font-mono">
                        LinkedIn
                      </span>
                    </motion.a>

                    <motion.a
                      href="https://github.com/SuryaTeja122"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-lg border border-white/10 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub size={18} className="text-white" />
                      <span className="text-white text-sm font-mono">
                        GitHub
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
