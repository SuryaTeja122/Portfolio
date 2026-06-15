import { useEffect, useRef, useMemo, Suspense, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Points, Float } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AgroChatBot",
    role: "AI Chatbot for Farmers",
    desc: "Multilingual voice-enabled AI assistant for farmers using NLP and ML. Features real-time translation, intent detection, yield prediction, and image-based crop diagnosis.",
    tech: ["React.js", "Python", "Flask", "Node.js", "NLP", "TTS/STT"],
    year: "2025",
    color: "#00F0FF",
    github: "https://github.com/SuryaTeja122",
    live: "https://agri-chatbot-indol.vercel.app/",
  },
  {
    title: "Health Symptom Checker",
    role: "Agentic AI Health Assistant",
    desc: "IBM Cloud internship project — AI-powered health assistant using IBM Watsonx and Granite models. Implements LangGraph for agentic workflows, integrating WHO and CDC data sources.",
    tech: ["IBM Watsonx", "LangGraph", "Python", "NLP", "Cloud APIs"],
    year: "2025",
    color: "#B200FF",
    github: "https://github.com/SuryaTeja122",
    live: "",
  },
  {
    title: "Online Quiz App",
    role: "Interactive Learning Platform",
    desc: "Online Quiz Application built during internship. A fully interactive browser-based quiz platform with real-time scoring and a clean, responsive UI.",
    tech: ["HTML", "CSS", "JavaScript"],
    year: "2024",
    color: "#00F0FF",
    github: "https://github.com/SuryaTeja122/Online-Quiz-Application-Internship-Project",
    live: "https://suryateja122.github.io/Online-Quiz-Application-Internship-Project/",
  },
  {
    title: "Human Following Trolley",
    role: "IoT + Computer Vision",
    desc: "Smart shopping trolley that autonomously follows a user using OpenCV HSV color tracking on Raspberry Pi. Integrated with ultrasonic sensors for obstacle avoidance.",
    tech: ["Raspberry Pi", "OpenCV", "Python", "HC-SR04"],
    year: "2022",
    color: "#B200FF",
    github: "https://github.com/SuryaTeja122",
    live: "",
  },
];

function CentralSpine() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3000;
  const positionsRef = useRef<Float32Array | null>(null);

  if (!positionsRef.current) {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const y = (i / particleCount) * 80 - 40;

      const radius = 2.5;
      const angle = y * 0.6;

      const isOuter = i % 2 === 0;
      const currentRadius = isOuter ? radius : radius * 0.3;
      const currentAngle = isOuter ? angle : angle + Math.PI;

      // eslint-disable-next-line
      const noiseX = (Math.random() - 0.5) * 0.8;
      // eslint-disable-next-line
      const noiseY = (Math.random() - 0.5) * 0.8;
      // eslint-disable-next-line
      const noiseZ = (Math.random() - 0.5) * 0.8;

      pos[i * 3] = Math.cos(currentAngle) * currentRadius + noiseX;
      pos[i * 3 + 1] = y + noiseY;
      pos[i * 3 + 2] = Math.sin(currentAngle) * currentRadius + noiseZ;
    }
    positionsRef.current = pos;
  }

  const positions = positionsRef.current;

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.2;
      pointsRef.current.position.y = (window.scrollY * 0.015) % 40;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#00F0FF"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Mars() {
  const marsRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const vecRef = useRef(new THREE.Vector3());
  const pointerPos = useRef(new THREE.Vector2());
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const marsColorMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#D84315";
    ctx.fillRect(0, 0, 2048, 1024);

    const imageData = ctx.getImageData(0, 0, 2048, 1024);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const index = i / 4;
      const x = (index % 2048) / 2048;
      const y = Math.floor(index / 2048) / 1024;

      let noise = 0;
      let amplitude = 1;
      let frequency = 1;
      let maxValue = 0;

      for (let octave = 0; octave < 6; octave++) {
        const sampleX = x * frequency * 8;
        const sampleY = y * frequency * 8;
        noise +=
          amplitude * Math.sin(sampleX * Math.PI) * Math.cos(sampleY * Math.PI);
        maxValue += amplitude;
        amplitude *= 0.5;
        frequency *= 2;
      }
      noise = noise / maxValue;

      const darkRegion =
        Math.sin(x * Math.PI * 3) * Math.cos(y * Math.PI * 1.5) > 0.3;
      const brightRegion =
        Math.sin((x - 0.7) * Math.PI * 4) * Math.cos((y - 0.3) * Math.PI * 3) >
        0.5;

      let r = 216,
        g = 67,
        b = 21;

      if (darkRegion) {
        r = Math.round(155 + noise * 70);
        g = Math.round(85 + noise * 45);
        b = Math.round(55 + noise * 35);
      } else if (brightRegion) {
        r = Math.round(235 + noise * 20);
        g = Math.round(125 + noise * 40);
        b = Math.round(80 + noise * 25);
      } else {
        r = Math.round(210 + noise * 40);
        g = Math.round(100 + noise * 40);
        b = Math.round(65 + noise * 25);
      }

      data[i] = Math.max(120, Math.min(255, r));
      data[i + 1] = Math.max(70, Math.min(255, g));
      data[i + 2] = Math.max(40, Math.min(255, b));
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }, []);

  const marsTextureRef = useRef<THREE.CanvasTexture | null>(null);

  if (!marsTextureRef.current) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#8080FF";
    ctx.fillRect(0, 0, 1024, 512);

    const features = [
      { x: 0.35, y: 0.5, size: 150 },
      { x: 0.75, y: 0.35, size: 180 },
      { x: 0.2, y: 0.2, size: 100 },
      { x: 0.85, y: 0.7, size: 80 },
    ];

    features.forEach((f) => {
      const x = f.x * 1024;
      const y = f.y * 512;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, f.size);
      gradient.addColorStop(0, "#FF7080");
      gradient.addColorStop(0.4, "#8080FF");
      gradient.addColorStop(1, "#80FF80");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, f.size, 0, Math.PI * 2);
      ctx.fill();
    });

    for (let i = 0; i < 400; i++) {
      // eslint-disable-next-line
      const x = Math.random() * 1024;
      // eslint-disable-next-line
      const y = Math.random() * 512;
      // eslint-disable-next-line
      const size = Math.random() * 40 + 10;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, "#FF8080");
      gradient.addColorStop(0.6, "#8080FF");
      gradient.addColorStop(1, "#8080CC");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    marsTextureRef.current = new THREE.CanvasTexture(canvas);
  }

  const marsNormalMap = marsTextureRef.current || new THREE.Texture();

  const marsShader = useMemo(
    () => ({
      uniforms: {
        color: { value: new THREE.Color("#E85D3A") },
        intensity: { value: 0.85 },
      },
      vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform vec3 color;
      uniform float intensity;
      varying vec3 vNormal;
      void main() {
        float rim = 1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
        float fresnel = pow(rim, 3.5);
        gl_FragColor = vec4(color * fresnel * intensity, fresnel * intensity);
      }
    `,
    }),
    [],
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pointerPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerPos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useFrame((_, delta) => {
    if (!marsRef.current) return;

    marsRef.current.getWorldPosition(vecRef.current);
    vecRef.current.project(camera);
    const dx = pointerPos.current.x - vecRef.current.x;
    const dy = pointerPos.current.y - vecRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const isHovered = distance < 0.4;

    marsRef.current.rotation.y += delta * 0.15;
    marsRef.current.rotation.x += delta * 0.05;

    // Responsive positioning - progressively center on smaller screens
    let targetXPos = 8; // Default position on large screens
    if (screenWidth < 1400) targetXPos = 6;
    if (screenWidth < 1200) targetXPos = 4;
    if (screenWidth < 1024) targetXPos = 2;
    if (screenWidth < 900) targetXPos = 0;
    if (screenWidth < 768) targetXPos = 0;

    marsRef.current.position.x = THREE.MathUtils.damp(
      marsRef.current.position.x,
      targetXPos,
      3,
      delta,
    );

    const targetScale = isHovered ? 1.12 : 1;
    marsRef.current.scale.setScalar(
      THREE.MathUtils.damp(marsRef.current.scale.x, targetScale, 4, delta),
    );
  });

  // Calculate initial position based on screen width
  let initialXPos = 8;
  if (screenWidth < 1400) initialXPos = 6;
  if (screenWidth < 1200) initialXPos = 4;
  if (screenWidth < 1024) initialXPos = 2;
  if (screenWidth < 900) initialXPos = 0;
  if (screenWidth < 768) initialXPos = 0;

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
      <group ref={marsRef} position={[initialXPos, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshStandardMaterial
            map={marsColorMap}
            normalMap={marsNormalMap}
            roughness={0.75}
            metalness={0}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshBasicMaterial
            color="#8B4513"
            opacity={0.2}
            transparent
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[2.4, 32, 32]} />
          <shaderMaterial
            args={[marsShader]}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SpineCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <CentralSpine />
          <Mars />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + projects.length * 200 + "%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isLeft = index % 2 === 0;
        const cardStartTime = index * 7;

        gsap.set(card, {
          x: isLeft ? "-35vw" : "35vw",
          y: "60vh",
          rotationX: 45,
          rotationY: isLeft ? 60 : -60,
          rotationZ: isLeft ? -15 : 15,
          scale: 0.1,
          opacity: 0,
          z: -1500,
          transformPerspective: 1200,
          transformOrigin: "50% 50%",
        });

        tl.to(
          card,
          {
            x: "0vw",
            y: "0vh",
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1.1,
            opacity: 1,
            z: 0,
            ease: "power2.inOut",
            duration: 3,
          },
          cardStartTime,
        )
          .to(
            card,
            {
              scale: 1.2,
              z: 50,
              duration: 1,
              ease: "none",
            },
            ">0",
          )
          .to(
            card,
            {
              x: isLeft ? "40vw" : "-40vw",
              y: "-80vh",
              rotationX: -45,
              rotationY: isLeft ? -60 : 60,
              rotationZ: isLeft ? 20 : -20,
              scale: 3,
              opacity: 0,
              z: 1000,
              ease: "power2.in",
              duration: 2.5,
            },
            ">",
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative h-screen w-full bg-transparent overflow-hidden perspective-1000 flex items-center justify-center pt-32"
      >
        <SpineCanvas />

        <div className="absolute top-12 sm:top-16 md:top-20 left-4 sm:left-8 z-20 pointer-events-none">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00F0FF] to-[#B200FF] tracking-tighter mix-blend-screen opacity-50">
            Projects
            <br />
      
          </h2>
        </div>

        <div className="relative w-full h-full flex items-center justify-center z-10">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              onClick={() => window.open((project as any).live || project.github, "_blank")}
              className="absolute w-[90vw] sm:w-125 md:w-137.5 h-auto sm:aspect-video rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-2 sm:p-6 md:p-8 flex flex-col justify-between transform-style-3d hover:border-white/50 transition-colors duration-500 overflow-hidden group cursor-pointer hover:scale-105 hover:shadow-xl max-w-[75vw] sm:max-w-none min-h-fit sm:min-h-0"
              style={{
                boxShadow: `0 0 60px ${project.color}20, inset 0 0 30px ${project.color}30`,
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 shrink-0">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-4 mb-2 sm:mb-6 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <span className="text-[10px] sm:text-xs text-[#00F0FF] font-mono tracking-[0.2em] uppercase">{project.role}</span>
                      {(project as any).live && <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-[#00F0FF] font-mono uppercase tracking-wider">Live ↗</span>}
                    </div>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight wrap-break-word">
                      {project.title}
                    </h3>
                  </div>
                  <div className="text-white/40 font-mono text-sm sm:text-xl font-light shrink-0">
                    {project.year}
                  </div>
                </div>
              </div>

              <div className="relative z-10 grow flex flex-col justify-end">
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-6 font-light line-clamp-2 sm:line-clamp-3">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 border border-white/10 bg-white/5 rounded-full text-[9px] sm:text-xs text-white/90 font-mono uppercase tracking-wider whitespace-nowrap"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
