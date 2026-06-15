import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  const earthRef = useRef<THREE.Group>(null);

  const earthColorMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    // Ocean blue base
    ctx.fillStyle = "#1A5276";
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

      const landRegion =
        Math.sin(x * Math.PI * 3) * Math.cos(y * Math.PI * 1.5) > 0.2;
      const forestRegion =
        Math.sin((x - 0.7) * Math.PI * 4) * Math.cos((y - 0.3) * Math.PI * 3) >
        0.4;

      let r = 26,
        g = 82,
        b = 118;

      if (landRegion) {
        // Land colors
        r = Math.round(139 + noise * 80);
        g = Math.round(139 + noise * 60);
        b = Math.round(80 + noise * 40);
      } else if (forestRegion) {
        // Forest colors
        r = Math.round(100 + noise * 60);
        g = Math.round(150 + noise * 80);
        b = Math.round(80 + noise * 40);
      } else {
        // Ocean colors
        r = Math.round(26 + noise * 40);
        g = Math.round(82 + noise * 80);
        b = Math.round(118 + noise * 60);
      }

      data[i] = Math.max(10, Math.min(255, r));
      data[i + 1] = Math.max(10, Math.min(255, g));
      data[i + 2] = Math.max(10, Math.min(255, b));
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }, []);

  const earthNormalMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#8080FF";
    ctx.fillRect(0, 0, 1024, 512);

    const features = [
      { x: 0.3, y: 0.4, size: 120 },
      { x: 0.7, y: 0.6, size: 150 },
      { x: 0.15, y: 0.7, size: 100 },
      { x: 0.85, y: 0.3, size: 90 },
    ];

    features.forEach((f) => {
      const x = f.x * 1024;
      const y = f.y * 512;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, f.size);
      gradient.addColorStop(0, "#00F0FF");
      gradient.addColorStop(0.4, "#8080FF");
      gradient.addColorStop(1, "#B200FF");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, f.size, 0, Math.PI * 2);
      ctx.fill();
    });

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const earthShader = useMemo(
    () => ({
      uniforms: {
        color: { value: new THREE.Color("#00F0FF") },
        intensity: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 color;
        uniform float intensity;

        void main() {
          float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
          fresnel = pow(1.0 - abs(fresnel), 2.0);
          vec3 glowColor = mix(vec3(0.0, 1.0, 1.0), vec3(0.7, 0.0, 1.0), fresnel);
          gl_FragColor = vec4(glowColor, fresnel * intensity);
        }
      `,
    }),
    [],
  );

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0003;
      earthRef.current.rotation.x += 0.00008;
    }
  });

  return (
    <Float speed={0.75} rotationIntensity={0.4} floatIntensity={1}>
      <group ref={earthRef}>
        {/* Main Earth sphere */}
        <mesh>
          <sphereGeometry args={[1.8, 128, 128]} />
          <meshStandardMaterial
            map={earthColorMap}
            normalMap={earthNormalMap}
            roughness={0.75}
            metalness={0.1}
          />
        </mesh>

        {/* Atmosphere layer 1 */}
        <mesh>
          <sphereGeometry args={[1.85, 64, 64]} />
          <meshBasicMaterial
            color="#00F0FF"
            opacity={0.12}
            transparent
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Atmosphere layer 2 */}
        <mesh>
          <sphereGeometry args={[1.92, 32, 32]} />
          <meshBasicMaterial
            color="#B200FF"
            opacity={0.08}
            transparent
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Shader-based corona */}
        <mesh>
          <sphereGeometry args={[2.0, 32, 32]} />
          <shaderMaterial
            args={[earthShader]}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function EarthVisualization() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#B200FF" />
        <Earth />
      </Canvas>
    </div>
  );
}
