import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

export const TechGarden = {
  Scene: function () {
    const mesh = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    // We add an interactive hover effect directly to the 3D mesh
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
      if (mesh.current) {
        mesh.current.rotation.x =
          state.clock.elapsedTime * (hovered ? 0.8 : 0.2);
        mesh.current.rotation.y =
          state.clock.elapsedTime * (hovered ? 1.0 : 0.3);

        // Scale pulse
        const targetScale = hovered ? 1.2 : 1;
        mesh.current.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale),
          0.1,
        );
      }
    });

    return (
      <group position={[viewport.width / 4, -viewport.height * 3, 0]}>
        <Icosahedron
          args={[1.5, 4]}
          ref={mesh}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={hovered ? "#B200FF" : "#00F0FF"}
            envMapIntensity={hovered ? 1 : 0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            roughness={0.1}
            distort={hovered ? 0.8 : 0.4}
            speed={hovered ? 5 : 2}
          />
        </Icosahedron>
      </group>
    );
  },

  HTML: function () {
    const stack = [
      "Next.js",
      "React 19",
      "Node.js",
      "TypeScript",
      "Firebase",
      "Gemini 2.5",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Three.js",
      "Tailwind v4",
    ];

    return (
      <section className="min-h-screen w-full flex flex-col justify-center px-10 md:px-20 pointer-events-auto relative z-20 mt-32">
        <h2 className="text-5xl md:text-7xl font-bold font-sans tracking-tight mb-8">
          The <span className="text-[#00F0FF] text-glow">Tech Garden</span>
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-lg font-light">
          Interact with the WebGL core on the right. Hover to disrupt the
          magnetic field.
        </p>
        <div className="flex flex-wrap gap-4 max-w-2xl">
          {stack.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 240, 255, 0.1)",
                color: "#00F0FF",
                borderColor: "#00F0FF",
              }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel px-6 py-4 relative overflow-hidden group cursor-pointer transition-colors duration-300 pointer-events-auto border-[#ffffff10]"
            >
              <span className="relative z-10 font-mono text-sm tracking-widest">
                {tech}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    );
  },
};
