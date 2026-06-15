import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import {
  FiFileText,
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
} from "react-icons/fi";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const shouldPlayRef = useRef(false);

  const playlist = useMemo(
    () => [
      { name: "Cosmic Dreams", file: "audiopapkin-ambient-soundscapes-001-space-atmosphere-303246.mp3" },
      { name: "Stellar Voyage", file: "audiopapkin-ambient-soundscapes-003-space-atmosphere-303242.mp3" },
      { name: "Nebula Whispers", file: "audiopapkin-ambient-soundscapes-007-space-atmosphere-304974.mp3" },
      { name: "Infinite Horizons", file: "idoberg-space-chords-loop-310493.mp3" },
    ],
    [],
  );

  const nameLine1 = "B Surya Teja".split("");
  const nameLine2 = "".split("");

  const roleLine1 = "FRONTEND DEVELOPER".split("");
  const roleLine2 = "PYTHON DEVELOPER".split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
      tl.fromTo(".hero-subtitle", { y: 50, opacity: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }, { y: 0, opacity: 1, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.2, stagger: 0.2 }, 0.2)
        .fromTo(charRefs.current, { y: 150, opacity: 0, rotateX: -90, transformOrigin: "50% 50% -50" }, { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.02 }, "-=0.8")
        .fromTo(".resume-btn", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.0");
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const trackFile = playlist[currentTrackIndex]?.file;
      if (trackFile) {
        audioRef.current.src = `/${trackFile}`;
        audioRef.current.load();
        if (shouldPlayRef.current) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.then(() => { setIsPlaying(true); shouldPlayRef.current = false; }).catch(() => { setIsPlaying(true); shouldPlayRef.current = false; });
          }
        }
      }
    }
  }, [currentTrackIndex, playlist]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
      else {
        if (!audioRef.current.src) { audioRef.current.src = `/${playlist[currentTrackIndex].file}`; audioRef.current.load(); }
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) { playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(true)); }
        else setIsPlaying(true);
      }
    }
  };

  const handlePrevTrack = () => { setCurrentTrackIndex((currentTrackIndex - 1 + playlist.length) % playlist.length); shouldPlayRef.current = true; };
  const handleNextTrack = () => { setCurrentTrackIndex((currentTrackIndex + 1) % playlist.length); shouldPlayRef.current = true; };

  const renderChars = (chars: string[], colorClass: string) => (
    <div className="overflow-hidden flex flex-wrap">
      {chars.map((char, i) => (
        <span key={i} ref={(el) => { if (el) charRefs.current.push(el); }}
          className={`inline-block transform-style-3d text-transparent bg-clip-text ${colorClass}`}
          style={{ display: char === " " ? "inline" : "inline-block", width: char === " " ? "1rem" : "auto" }}>
          {char}
        </span>
      ))}
    </div>
  );

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-between py-20 md:py-32 lg:py-12 md:p-12 overflow-visible z-10 perspective-[2000px]">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4 sm:gap-6 md:gap-8 lg:gap-0 mt-auto mb-auto h-full absolute top-0 left-0 px-4 sm:px-6 md:px-8 lg:px-6 pointer-events-none">
        <div className="relative z-10 w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left mt-[26vh] lg:mt-0 pointer-events-auto pl-0">
          <h2 className="hero-subtitle text-[#a580ff] font-sans font-light text-sm lg:text-lg tracking-[0.05em] mb-1.5 sm:mb-2 inline-block">Hello! I'm</h2>
          <h1 className="text-[1.2rem] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.8rem] font-sans font-bold tracking-tight leading-snug drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] flex flex-col items-center lg:items-start">
            <div className="flex">{renderChars(nameLine1, "bg-gradient-to-b from-white to-gray-500")}</div>
            <div className="flex">{renderChars(nameLine2, "bg-gradient-to-b from-white to-gray-500")}</div>
          </h1>
        </div>
        <div className="relative z-10 w-full lg:w-auto flex-col items-center lg:items-end text-center lg:text-right mt-2 sm:mt-4 md:mt-5 lg:mt-0 pointer-events-auto pr-0 hidden lg:flex lg:translate-x-4 xl:translate-x-8">
          <h1 className="text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.8rem] font-sans font-bold tracking-tighter leading-none flex flex-col items-center lg:items-end">
            <div className="flex">{renderChars(roleLine1, "bg-gradient-to-r from-[#B200FF] to-[#00F0FF]")}</div>
            <div className="flex">{renderChars(roleLine2, "bg-gradient-to-r from-gray-300 to-gray-600 text-[0.65rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.4rem] mt-0.5 sm:mt-1 md:mt-2 tracking-normal")}</div>
          </h1>
        </div>
      </div>

      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 left-0 w-full flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 z-30 pointer-events-auto">
        <audio ref={audioRef} onEnded={() => { const nextIndex = (currentTrackIndex + 1) % playlist.length; setCurrentTrackIndex(nextIndex); shouldPlayRef.current = true; }} />
        <div className="lg:hidden text-center w-full">
          <h1 className="text-base font-sans font-bold tracking-tight leading-tight flex flex-col items-center gap-0.5">
            <div className="flex">{renderChars(roleLine1, "bg-gradient-to-r from-[#B200FF] to-[#00F0FF] text-base")}</div>
            <div className="flex">{renderChars(roleLine2, "bg-gradient-to-r from-gray-300 to-gray-600 text-xs tracking-normal")}</div>
          </h1>
        </div>
        <div className="flex flex-col gap-2.5 text-gray-400 font-sans text-xs tracking-widest bg-black/20 backdrop-blur-md px-5 md:px-6 py-2 rounded-full border border-white/10 shadow-[0_0_15px_rgba(0,240,255,0.1)] max-w-[95vw]">
          <div className="flex items-center gap-2.5 justify-center">
            <button onClick={handlePrevTrack} title="Previous Track" className="hover:text-[#00F0FF] transition-colors shrink-0"><FiSkipBack size={12} className="w-4 h-4" /></button>
            <button onClick={togglePlay} title={isPlaying ? "Pause" : "Play"} className="hover:text-white transition-colors shrink-0">
              {isPlaying ? <FiPause size={14} className="text-[#00F0FF] w-4.5 h-4.5" /> : <FiPlay size={14} className="text-[#a580ff] w-4.5 h-4.5" />}
            </button>
            <button onClick={handleNextTrack} title="Next Track" className="hover:text-[#00F0FF] transition-colors shrink-0"><FiSkipForward size={12} className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-px h-3 bg-white/20"></div>
            <span className="inline-block w-1 h-1 rounded-full bg-[#00F0FF] animate-pulse shrink-0"></span>
            <span className="truncate text-xs">{playlist[currentTrackIndex].name}</span>
          </div>
        </div>
        <a href="/resume.pdf" className="resume-btn flex items-center gap-2.5 text-gray-400 hover:text-white font-sans font-semibold text-xs sm:text-sm lg:text-base tracking-[0.15em] md:tracking-[0.2em] group transition-colors whitespace-nowrap">
          <span>RESUME</span>
          <FiFileText size={14} className="text-gray-400 group-hover:text-[#00F0FF] transition-colors shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>
    </section>
  );
}
