import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

export const VignetteGallery = {
  Scene: function () {
    const group = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    useFrame((state) => {
      // Rotation logic
      if (group.current) {
        group.current.rotation.y =
          Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
        group.current.rotation.x =
          Math.cos(state.clock.elapsedTime * 0.4) * 0.2;
      }
    });

    return (
      <group
        ref={group}
        position={[-viewport.width / 4, -viewport.height * 4.2, 0]}
      >
        <mesh>
          <torusGeometry args={[1.5, 0.5, 16, 100]} />
          <meshStandardMaterial
            color="#B200FF"
            wireframe={true}
            opacity={0.3}
            transparent
          />
        </mesh>
      </group>
    );
  },

  HTML: function () {
    return (
      <section className="h-screen w-full flex flex-col justify-center items-start sm:items-end px-4 sm:px-8 md:px-16 lg:px-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-sans tracking-tight mb-6 sm:mb-8">
          Mini <span className="text-[#B200FF]">Grid</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-sm font-light text-left sm:text-right">
          Experimental physics and visual algorithms.
        </p>
        <div className="flex flex-col gap-4 sm:gap-6 max-w-sm pointer-events-auto w-full sm:w-auto">
          {[
            "AI Vector Visualizer",
            "Particle Fluid Physics",
            "Dark Matter Void Shader",
          ].map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ x: -10, borderColor: "rgba(178, 0, 255, 0.5)" }}
              className="glass-panel p-4 sm:p-6 flex flex-col group transition-all duration-300 border-[#ffffff10] cursor-pointer"
            >
              <h4 className="text-base sm:text-lg md:text-xl font-bold font-mono tracking-widest group-hover:text-[#B200FF] transition-colors">
                {project}
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 font-sans">
                A glimpse into raw mathematical performance
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  },
};
