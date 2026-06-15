import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Random continuous shooting stars effect
function ShootingStars() {
  const count = 15;

  // Initialize star data once and store in ref to avoid re-renders
  const starsRef = useRef<Array<{
    pos: THREE.Vector3;
    speed: number;
    length: number;
    visible: boolean;
    timer: number;
  }> | null>(null);

  /* eslint-disable */
  if (!starsRef.current) {
    starsRef.current = Array.from({ length: count }).map(() => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 + 20,
        (Math.random() - 0.5) * -20 - 10,
      ),
      speed: Math.random() * 0.8 + 0.4,
      length: Math.random() * 3 + 1,
      visible: false,
      timer: Math.random() * 3,
    }));
  }
  /* eslint-enable */

  const linesRef = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => new THREE.BufferGeometry(), []);

  const positions = useMemo(() => new Float32Array(count * 6), [count]);

  useEffect(() => {
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [geometry, positions]);

  /* eslint-disable */
  useFrame((_, delta) => {
    if (!linesRef.current || !starsRef.current) return;

    const lines = starsRef.current;
    let needsUpdate = false;

    for (let i = 0; i < count; i++) {
      const star = lines[i];
      star.timer -= delta;

      if (star.timer <= 0 && !star.visible) {
        star.visible = true;
        star.pos.set(
          (Math.random() - 0.5) * 40 + 20,
          (Math.random() - 0.5) * 20 + 20,
          (Math.random() - 0.5) * -20 - 10,
        );
      }

      if (star.visible) {
        star.pos.x -= star.speed * delta * 80;
        star.pos.y -= star.speed * delta * 50;
        star.pos.z += star.speed * delta * 20;

        positions[i * 6] = star.pos.x;
        positions[i * 6 + 1] = star.pos.y;
        positions[i * 6 + 2] = star.pos.z;

        positions[i * 6 + 3] = star.pos.x + star.length * 1.5;
        positions[i * 6 + 4] = star.pos.y + star.length * 0.9;
        positions[i * 6 + 5] = star.pos.z - star.length * 0.3;
        needsUpdate = true;

        if (star.pos.y < -20 || star.pos.x < -40) {
          star.visible = false;
          star.timer = Math.random() * 3 + 1;
          positions[i * 6] = 9999;
          positions[i * 6 + 1] = 9999;
          positions[i * 6 + 3] = 9999;
          positions[i * 6 + 4] = 9999;
        }
      }
    }
    if (needsUpdate && geometry.attributes.position) {
      geometry.attributes.position.needsUpdate = true;
    }
  });
  /* eslint-enable */

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color="#00F0FF"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// 2. High-Fidelity Animated 3D Planet
function AnimatedPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [, setHovered] = useState(false);
  const { camera } = useThree();
  const vec = new THREE.Vector3();

  // Load high-res physical textures from public CDN
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
  ]);

  // Custom WebGL Shader for a beautiful cinematic atmosphere rim glow
  const atmosphereShader = useMemo(
    () => ({
      uniforms: {
        color: { value: new THREE.Color("#B200FF") }, // Purple glow
        intensity: { value: 1.2 },
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
        // Fresnel equation to only glow the edges
        float fresnel = pow(1.0 - max(dot(vNormal, vec3(0, 0, 1)), 0.0), 3.0);
        gl_FragColor = vec4(color * fresnel * intensity, fresnel * intensity);
      }
    `,
    }),
    [],
  );

  // Global pointer tracker
  const pointerPos = useRef(new THREE.Vector2());
  const currentSpinSpeed = useRef(0.05);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
    if (!groupRef.current || !cloudsRef.current) return;

    // Detect distance from cursor to 3D object center for hover state
    groupRef.current.getWorldPosition(vec);
    vec.project(camera);
    const dx = pointerPos.current.x - vec.x;
    const dy = pointerPos.current.y - vec.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If mouse is near the planet
    const isHovered = distance < 0.4;
    setHovered(isHovered);

    // Dynamic Hover Animations (Tilt and Speed up on hover)
    const targetSpinSpeed = isHovered ? 0.3 : 0.05;
    currentSpinSpeed.current = THREE.MathUtils.damp(
      currentSpinSpeed.current,
      targetSpinSpeed,
      4,
      delta,
    );

    const targetTiltX = isHovered ? -(pointerPos.current.y * 0.6) : 0;
    const targetTiltZ = isHovered ? pointerPos.current.x * -0.4 : 0;

    // Continuous Animation (Earth spin & Clouds moving independently)
    groupRef.current.rotation.y += delta * currentSpinSpeed.current;
    cloudsRef.current.rotation.y += delta * (currentSpinSpeed.current * 1.5);

    // Smoothly apply tilt towards mouse
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetTiltX,
      4,
      delta,
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetTiltZ,
      4,
      delta,
    );

    // Scroll Parallax mapping
    // Make the planet scroll up naturally out of view when scrolling down
    const targetYPos = window.scrollY * 0.018;
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetYPos,
      6,
      delta,
    );

    // Responsive X positioning - center the earth on smaller screens
    let targetXPos = 0;
    if (screenWidth < 1020) {
      targetXPos = 0; // Centered
    }
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetXPos,
      6,
      delta,
    );

    // Smooth Hover Scale Effect (Pops up with interactive feedback)
    const targetScale = isHovered ? 1.08 : 1;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta),
    );
  });

  // Responsive positioning based on screen width
  const initialXPos = screenWidth < 1020 ? 0 : 0;
  const initialZPos = screenWidth < 768 ? -3 : -4; // Bring closer on mobile

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <group ref={groupRef} position={[initialXPos, 0, initialZPos]}>
        {/* Core Planet with Realistic Textures */}
        <mesh>
          <sphereGeometry args={[2.2, 64, 64]} />
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            roughnessMap={specularMap}
            roughness={0.7}
            metalness={0.4}
          />
        </mesh>

        {/* Separated Volumetric Cloud Layer */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.53, 64, 64]} />
          <meshLambertMaterial
            map={cloudsMap}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            color="#00F0FF" // Tint clouds with tech cyan
          />
        </mesh>

        {/* Custom Shader Atmosphere Glow */}
        <mesh>
          <sphereGeometry args={[2.65, 64, 64]} />
          <shaderMaterial
            args={[atmosphereShader]}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      {/* High contrast directional lighting to make the planet cinematic */}
      <directionalLight position={[10, 5, 10]} intensity={3} color="#ffffff" />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={1.5}
        color="#B200FF"
      />

      {/* Deep Space */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={3}
        saturation={1}
        fade
        speed={0.5}
      />
      <ShootingStars />

      <Suspense fallback={null}>
        <AnimatedPlanet />
      </Suspense>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-1 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        eventSource={document.body}
        eventPrefix="client"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
