import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

export function Background() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-4, 2, -10]}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial color="#B200FF" wireframe opacity={0.3} transparent />
        </mesh>
        <mesh position={[4, -2, -15]}>
          <octahedronGeometry args={[3, 0]} />
          <meshStandardMaterial color="#00F0FF" wireframe opacity={0.15} transparent />
        </mesh>
      </Float>
    </group>
  );
}