"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function MicMesh() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Gentle sway
    groupRef.current.rotation.z = Math.sin(t * 0.7) * 0.12;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Handle */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.13, 0.16, 1.8, 32]} />
        <meshStandardMaterial color="#aaa" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Gold band at base of head */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.08, 32]} />
        <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.05} />
      </mesh>

      {/* Mesh grill (wireframe sphere) */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color="#888"
          metalness={0.7}
          roughness={0.3}
          wireframe
        />
      </mesh>

      {/* Inner mic capsule */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.33, 24, 24]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Gold torus rings */}
      {[-0.15, 0.15, 0.45].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.015, 12, 64]} />
          <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.05} />
        </mesh>
      ))}

      {/* Subtle glow point */}
      <pointLight position={[0, 0.5, 0.5]} intensity={0.6} color="#C9A84C" distance={3} />
    </group>
  );
}

export default function MicCanvas({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 5, 3]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#C9A84C" />
      <MicMesh />
    </Canvas>
  );
}
