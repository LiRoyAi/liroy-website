"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { getAnalyser } from "./audioEngine";
import { useSamplerStore } from "./store";

const BAR_COUNT = 48;
const RING_RADIUS = 4.2;

// Pre-allocated colors (avoid GC churn in useFrame)
const GOLD = new THREE.Color(0.788, 0.659, 0.298);
const AMBER = new THREE.Color(1.0, 0.42, 0.0);
const RED_HOT = new THREE.Color(0.8, 0.067, 0.067);
const DIM = new THREE.Color(0.07, 0.055, 0.02);

const _obj = new THREE.Object3D();
const _col = new THREE.Color();

// ─── EQ bars using InstancedMesh ──────────────────────────────────────────────
function EqBars({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const activePads = useSamplerStore((s) => s.activePads);
  const freqData = useMemo(() => new Uint8Array(128), []);
  const pulseRef = useRef(0);
  const prevCountRef = useRef(0);

  const geo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        metalness: 0.75,
        roughness: 0.28,
        emissive: new THREE.Color(0.08, 0.04, 0.0),
        emissiveIntensity: 1,
      }),
    []
  );

  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat]
  );

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();

    // Detect new pad press → kick pulse
    if (activePads.length > prevCountRef.current) pulseRef.current = 1.0;
    prevCountRef.current = activePads.length;
    pulseRef.current = Math.max(0, pulseRef.current - delta * 3.5);

    const analyser = getAnalyser();
    let hasAudio = false;
    if (analyser) {
      analyser.getByteFrequencyData(freqData);
      hasAudio = freqData.some((v) => v > 4);
    }

    for (let i = 0; i < BAR_COUNT; i++) {
      const angle = (i / BAR_COUNT) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * RING_RADIUS;
      const z = Math.sin(angle) * RING_RADIUS;

      let height: number;
      let norm: number;

      if (hasAudio) {
        const bin = Math.floor((i / BAR_COUNT) * freqData.length * 0.7);
        norm = freqData[bin] / 255;
        height = norm * 5.5 + 0.12 + pulseRef.current * 1.2;
        norm = Math.min(1, norm + pulseRef.current * 0.3);
      } else if (reduced) {
        norm = 0.04 + pulseRef.current * 0.6;
        height = 0.12 + pulseRef.current * 1.5;
      } else {
        // Idle ambient sine wave
        norm =
          (Math.sin(i * 0.44 + t * 1.3) * 0.5 + 0.5) * 0.22 +
          pulseRef.current * 0.5;
        height = norm * 2.5 + 0.12;
      }

      _obj.position.set(x, height / 2, z);
      _obj.scale.set(0.3, height, 0.3);
      _obj.rotation.y = -angle;
      _obj.updateMatrix();
      mesh.setMatrixAt(i, _obj.matrix);

      // Color: dim → gold → amber → red based on amplitude
      if (norm < 0.35) {
        _col.lerpColors(DIM, GOLD, norm / 0.35);
      } else if (norm < 0.72) {
        _col.lerpColors(GOLD, AMBER, (norm - 0.35) / 0.37);
      } else {
        _col.lerpColors(AMBER, RED_HOT, (norm - 0.72) / 0.28);
      }
      mesh.setColorAt(i, _col);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geo, mat, BAR_COUNT]}
      frustumCulled={false}
    />
  );
}

// ─── Dark reflective floor ─────────────────────────────────────────────────────
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <MeshReflectorMaterial
        blur={[300, 80]}
        resolution={512}
        mixBlur={1}
        mixStrength={10}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#060606"
        metalness={0.4}
        mirror={0}
      />
    </mesh>
  );
}

// ─── Gentle camera drift ───────────────────────────────────────────────────────
function CameraRig({ reduced }: { reduced: boolean }) {
  useFrame(({ camera, clock }) => {
    if (reduced) return;
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.11) * 2.2;
    camera.position.y = 5 + Math.sin(t * 0.07) * 0.8;
    camera.lookAt(0, 0.5, 0);
  });
  return null;
}

// ─── Public component ──────────────────────────────────────────────────────────
export default function SamplerVisualizer3D() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 5, 13], fov: 50, near: 0.1, far: 100 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[0, 0, 0]} />
      <fog attach="fog" args={["#000000", 12, 28]} />
      <ambientLight intensity={0.06} />
      <pointLight position={[0, 9, 0]} color="#C9A84C" intensity={5} decay={2} />
      <pointLight position={[6, 4, 6]} color="#ff8c00" intensity={1.8} decay={2} />
      <pointLight position={[-6, 4, -6]} color="#8b3a00" intensity={1.2} decay={2} />
      <EqBars reduced={reduced} />
      <Floor />
      <CameraRig reduced={reduced} />
    </Canvas>
  );
}
