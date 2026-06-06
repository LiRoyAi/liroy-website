"use client";

import { useRef, useEffect, Component, ReactNode, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useSceneStore } from "@/store/scene";

// ── Error boundary — isolates WebGL failures from the rest of the page ────────
interface EBState { hasError: boolean }
class HeroErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ── Shield mesh (static tarcza.png texture) ───────────────────────────────────
function ShieldPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { mouseX, mouseY, heroProgress } = useSceneStore();
  const texture = useTexture("/images/tarcza.png");

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Continuous Z rotation (shield spinning)
    meshRef.current.rotation.z += delta * 0.25;

    // Mouse parallax on X/Y tilt
    const targetRX = mouseY * 0.4;
    const targetRY = mouseX * 0.4;
    meshRef.current.rotation.x +=
      (targetRX - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.y +=
      (targetRY - meshRef.current.rotation.y) * 0.04;

    // Scroll: scale up + move towards camera
    const targetScale = 1 + heroProgress * 0.8;
    const currentScale = meshRef.current.scale.x;
    meshRef.current.scale.setScalar(
      currentScale + (targetScale - currentScale) * 0.06
    );
    meshRef.current.position.z = heroProgress * 1.5;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3.2, 3.2]} />
      <meshBasicMaterial
        map={texture}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── HeroCanvas ──────────────────────────────────────────────────────────────
export default function HeroCanvas({ className = "" }: { className?: string }) {
  const setMouse = useSceneStore((s) => s.setMouse);
  const setScroll = useSceneStore((s) => s.setScroll);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMouse(
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2
      );
    };
    const onScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScroll(window.scrollY, progress);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, [setMouse, setScroll]);

  return (
    <HeroErrorBoundary>
      <Canvas
        className={className}
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-4, -2, 2]} intensity={0.4} color="#C9A84C" />
        <Suspense fallback={null}>
          <ShieldPlane />
        </Suspense>
      </Canvas>
    </HeroErrorBoundary>
  );
}
