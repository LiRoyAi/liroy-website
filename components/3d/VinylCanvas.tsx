"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Single vinyl disc ──────────────────────────────────────────────────────
interface VinylProps {
  albumSrc: string;
  position: [number, number, number];
  rotationY: number;
  speed: number;
  scale?: number;
}

function Vinyl({ albumSrc, position, rotationY, speed, scale = 1 }: VinylProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const albumTex = useTexture(albumSrc);

  useFrame((state, delta) => {
    // Spin on disc's own Z axis
    groupRef.current.rotation.z -= delta * speed;
    // Gentle float
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.06;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0.15, rotationY, 0]}
      scale={scale}
    >
      {/* Outer vinyl grooves — dark ring */}
      <mesh>
        <ringGeometry args={[0.6, 1.22, 128]} />
        <meshStandardMaterial
          color="#0d0d0d"
          metalness={0.85}
          roughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Vinyl body */}
      <mesh>
        <circleGeometry args={[1.22, 128]} />
        <meshStandardMaterial
          color="#181818"
          metalness={0.7}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Album art label */}
      <mesh position={[0, 0, 0.002]}>
        <circleGeometry args={[0.58, 64]} />
        <meshStandardMaterial map={albumTex} side={THREE.DoubleSide} />
      </mesh>

      {/* Center hole */}
      <mesh position={[0, 0, 0.003]}>
        <circleGeometry args={[0.06, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* Groove highlight ring (gold shimmer) */}
      <mesh position={[0, 0, -0.001]}>
        <ringGeometry args={[1.18, 1.22, 64]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={1}
          roughness={0}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ── Scene contents ─────────────────────────────────────────────────────────
const ALBUMS = [
  {
    src: "/images/L.jpg",
    position: [-3.8, 0, -0.8] as [number, number, number],
    rotY: 0.32,
    speed: 0.55,
    scale: 0.80,
  },
  {
    src: "/images/grandpaparapa.jpg",
    position: [-1.5, 0, -0.4] as [number, number, number],
    rotY: 0.18,
    speed: 0.65,
    scale: 0.87,
  },
  {
    src: "/images/L7_LP_Front_Cover.png",
    position: [0.7, 0, 0] as [number, number, number],
    rotY: -0.05,
    speed: 1.0,
    scale: 1.08,
  },
  {
    src: "/images/l-nino.jpg",
    position: [3.1, 0, -0.5] as [number, number, number],
    rotY: -0.28,
    speed: 0.75,
    scale: 0.85,
  },
];

function VinylScene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 6, 4]} intensity={2} color="#fff5e0" />
      <pointLight position={[-4, 0, 2]} intensity={0.5} color="#C9A84C" />
      <pointLight position={[4, 0, 2]} intensity={0.5} color="#C9A84C" />
      <Suspense fallback={null}>
        {ALBUMS.map((a, i) => (
          <Vinyl
            key={i}
            albumSrc={a.src}
            position={a.position}
            rotationY={a.rotY}
            speed={a.speed}
            scale={a.scale}
          />
        ))}
      </Suspense>
    </>
  );
}

// ── VinylCanvas ──────────────────────────────────────────────────────────────
export default function VinylCanvas({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 5], fov: 58 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <VinylScene />
    </Canvas>
  );
}
