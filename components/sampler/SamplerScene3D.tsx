"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { getAnalyser } from "./audioEngine";
import { useSamplerStore } from "./store";
import * as audio from "./audioEngine";
import samplerConfig from "@/config/sampler-config";
import SamplerControls from "./SamplerControls";

// ─── Config / constants ───────────────────────────────────────────────────────

const { pads, tracks } = samplerConfig;

const PAD_SIZE = 1.6;
const PAD_HEIGHT = 0.44;
const PAD_PITCH = 2.04;

function padPos(id: number): THREE.Vector3 {
  const col = id % 4;
  const row = Math.floor(id / 4);
  return new THREE.Vector3(
    (col - 1.5) * PAD_PITCH,
    0.87,
    (row - 1.5) * PAD_PITCH + 2.2
  );
}

const ROW_HEX = ["#C9A84C", "#cc3333", "#33cc77", "#4477cc"];
const ROW_THREE = ROW_HEX.map((h) => new THREE.Color(h));

// EQ ring
const BAR_COUNT = 36; // fewer on same scene for perf
const RING_RADIUS = 2.8;
const EQ_OFFSET = new THREE.Vector3(0, 0.86, -2.5);

// Keyboard map: key → pad index
const KEY_PAD: Record<string, number> = {
  "1": 0, "2": 1, "3": 2, "4": 3,
  q: 4, w: 5, e: 6, r: 7,
  a: 8, s: 9, d: 10, f: 11,
  z: 12, x: 13, c: 14, v: 15,
};

// Pre-alloc for EQ useFrame
const _obj = new THREE.Object3D();
const _col = new THREE.Color();
const C_GOLD = new THREE.Color(0.788, 0.659, 0.298);
const C_AMBER = new THREE.Color(1.0, 0.42, 0.0);
const C_RED = new THREE.Color(0.8, 0.067, 0.067);
const C_DIM = new THREE.Color(0.07, 0.055, 0.02);

// ─── LED display (CanvasTexture) ──────────────────────────────────────────────

function LedDisplay() {
  const displayText = useSamplerStore((s) => s.displayText);
  const isRecording = useSamplerStore((s) => s.isRecording);
  const [blink, setBlink] = useState(true);
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  const texRef = useRef<THREE.CanvasTexture | null>(null);

  const texture = useMemo(() => {
    const cv = document.createElement("canvas");
    cv.width = 512;
    cv.height = 64;
    cvRef.current = cv;
    const t = new THREE.CanvasTexture(cv);
    texRef.current = t;
    return t;
  }, []);

  useEffect(() => () => { texture.dispose(); }, [texture]);

  useEffect(() => {
    if (!isRecording) { setBlink(true); return; }
    const id = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(id);
  }, [isRecording]);

  useEffect(() => {
    const cv = cvRef.current;
    const tex = texRef.current;
    if (!cv || !tex) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#000d00";
    ctx.fillRect(0, 0, 512, 64);
    if (blink) {
      ctx.shadowColor = "rgba(0,255,80,0.9)";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#00ff50";
      ctx.font = "bold 26px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText((displayText || "LIROY SP-1200").toUpperCase().slice(0, 22), 256, 34);
    }
    tex.needsUpdate = true;
  }, [displayText, blink]);

  return (
    <mesh position={[0, 0.63, -5.2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8.5, 1.1]} />
      <meshStandardMaterial
        map={texture}
        emissiveMap={texture}
        emissive={new THREE.Color(0, 0.7, 0.25)}
        emissiveIntensity={0.7}
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}

// ─── Chassis ──────────────────────────────────────────────────────────────────

const CHASSIS_GOLD = new THREE.Color(0.11, 0.09, 0.045);
const CHASSIS_MAT_PROPS = { metalness: 0.75, roughness: 0.4 };

function Chassis({ isRecording }: { isRecording: boolean }) {
  const recLightRef = useRef<THREE.PointLight>(null!);

  useFrame((_, delta) => {
    if (!recLightRef.current) return;
    const target = isRecording ? 2.0 : 0;
    recLightRef.current.intensity = THREE.MathUtils.lerp(
      recLightRef.current.intensity,
      target,
      delta * 6
    );
  });

  return (
    <group>
      {/* Main chassis body */}
      <RoundedBox
        args={[18, 1.2, 16]}
        radius={0.4}
        smoothness={3}
        position={[0, 0, 0]}
        receiveShadow
        castShadow
        raycast={() => {}}
      >
        <meshStandardMaterial
          color={CHASSIS_GOLD}
          {...CHASSIS_MAT_PROPS}
        />
      </RoundedBox>

      {/* Top face panel (slightly lighter) */}
      <mesh position={[0, 0.62, 0]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
        <planeGeometry args={[17.2, 15.2]} />
        <meshStandardMaterial
          color="#1a1508"
          metalness={0.6}
          roughness={0.55}
        />
      </mesh>

      {/* Gold bevel edge strip (front) */}
      <mesh position={[0, 0.3, 7.6]} rotation={[0.3, 0, 0]} raycast={() => {}}>
        <planeGeometry args={[17.8, 0.7]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.95}
          roughness={0.15}
          emissive="#C9A84C"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* LIROY brand plate */}
      <mesh position={[-5.5, 0.64, -5.6]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
        <planeGeometry args={[3.2, 0.6]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.9}
          roughness={0.2}
          emissive="#C9A84C"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* SP-1200 label plate */}
      <mesh position={[-5.5, 0.641, -4.85]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
        <planeGeometry args={[3.2, 0.35]} />
        <meshStandardMaterial
          color="#2a2010"
          metalness={0.5}
          roughness={0.7}
        />
      </mesh>

      {/* LED bezel rim */}
      <mesh position={[0, 0.638, -5.2]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
        <planeGeometry args={[9, 1.5]} />
        <meshStandardMaterial
          color="#0a0d08"
          metalness={0.4}
          roughness={0.9}
          emissive="#001800"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Corner screws */}
      {([ [-8.2, 0.64, -7.2], [8.2, 0.64, -7.2], [-8.2, 0.64, 7.2], [8.2, 0.64, 7.2] ] as const).map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
          <circleGeometry args={[0.22, 8]} />
          <meshStandardMaterial
            color="#2a2010"
            metalness={0.85}
            roughness={0.3}
            emissive="#C9A84C"
            emissiveIntensity={0.06}
          />
        </mesh>
      ))}

      {/* REC indicator light */}
      <pointLight ref={recLightRef} position={[7.5, 2, -6.5]} color="#cc1111" intensity={0} decay={2} />
    </group>
  );
}

// ─── Single pad mesh ──────────────────────────────────────────────────────────

function PadMesh({
  pad,
  onDown,
  onUp,
}: {
  pad: (typeof pads)[number];
  onDown: (pad: (typeof pads)[number]) => void;
  onUp: (id: number) => void;
}) {
  const isActive = useSamplerStore((s) => s.activePads.includes(pad.id));
  const row = Math.floor(pad.id / 4);
  const rowColor = ROW_THREE[row];
  const base = padPos(pad.id);
  const groupRef = useRef<THREE.Group>(null!);
  const faceMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const frameMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const isActiveRef = useRef(false);
  isActiveRef.current = isActive;

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const active = isActiveRef.current;
    g.position.y = THREE.MathUtils.lerp(g.position.y, active ? base.y - 0.1 : base.y, delta * 20);
    if (faceMatRef.current) {
      faceMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        faceMatRef.current.emissiveIntensity, active ? 0.55 : 0.0, delta * 16
      );
    }
    if (frameMatRef.current) {
      frameMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        frameMatRef.current.emissiveIntensity, active ? 0.45 : 0.06, delta * 14
      );
    }
  });

  return (
    <group ref={groupRef} position={[base.x, base.y, base.z]}>
      {/* Gold frame (outer, non-interactive) */}
      <RoundedBox
        args={[PAD_SIZE + 0.14, PAD_HEIGHT, PAD_SIZE + 0.14]}
        radius={0.12}
        smoothness={2}
        position={[0, -0.01, 0]}
        raycast={() => {}}
      >
        <meshStandardMaterial
          ref={frameMatRef}
          color={rowColor}
          metalness={0.92}
          roughness={0.18}
          emissive={rowColor}
          emissiveIntensity={0.06}
        />
      </RoundedBox>

      {/* Pad face (interactive) */}
      <RoundedBox
        args={[PAD_SIZE, PAD_HEIGHT + 0.06, PAD_SIZE]}
        radius={0.09}
        smoothness={2}
        position={[0, 0.02, 0]}
        onPointerDown={(e) => { e.stopPropagation(); onDown(pad); }}
        onPointerUp={(e) => { e.stopPropagation(); onUp(pad.id); }}
        onPointerLeave={(e) => { e.stopPropagation(); onUp(pad.id); }}
        castShadow
      >
        <meshStandardMaterial
          ref={faceMatRef}
          color="#161208"
          metalness={0.6}
          roughness={0.4}
          emissive={rowColor}
          emissiveIntensity={0.0}
        />
      </RoundedBox>

      {/* Pad number indicator (small emissive dot) */}
      <mesh position={[-PAD_SIZE / 2 + 0.2, PAD_HEIGHT / 2 + 0.04, -PAD_SIZE / 2 + 0.2]} raycast={() => {}}>
        <circleGeometry args={[0.06, 6]} />
        <meshStandardMaterial
          color={rowColor}
          emissive={rowColor}
          emissiveIntensity={isActive ? 1.5 : 0.3}
          metalness={0}
          roughness={1}
        />
      </mesh>
    </group>
  );
}

// ─── EQ ring (InstancedMesh) ──────────────────────────────────────────────────

function EqRing({ reduced, isMobile }: { reduced: boolean; isMobile: boolean }) {
  const count = isMobile ? 24 : BAR_COUNT;
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
        emissive: new THREE.Color(0.06, 0.03, 0),
        emissiveIntensity: 1,
      }),
    []
  );

  useEffect(
    () => () => { geo.dispose(); mat.dispose(); },
    [geo, mat]
  );

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    if (activePads.length > prevCountRef.current) pulseRef.current = 1.0;
    prevCountRef.current = activePads.length;
    pulseRef.current = Math.max(0, pulseRef.current - delta * 3.5);

    const analyser = getAnalyser();
    let hasAudio = false;
    if (analyser) {
      analyser.getByteFrequencyData(freqData);
      hasAudio = freqData.some((v) => v > 4);
    }

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const x = EQ_OFFSET.x + Math.cos(angle) * RING_RADIUS;
      const z = EQ_OFFSET.z + Math.sin(angle) * RING_RADIUS;

      let height: number;
      let norm: number;

      if (hasAudio) {
        const bin = Math.floor((i / count) * freqData.length * 0.7);
        norm = freqData[bin] / 255;
        height = norm * 4.5 + 0.12 + pulseRef.current * 1.2;
        norm = Math.min(1, norm + pulseRef.current * 0.3);
      } else if (reduced) {
        norm = 0.04 + pulseRef.current * 0.6;
        height = 0.12 + pulseRef.current * 1.2;
      } else {
        norm = (Math.sin(i * 0.44 + t * 1.3) * 0.5 + 0.5) * 0.2 + pulseRef.current * 0.5;
        height = norm * 2.2 + 0.12;
      }

      _obj.position.set(x, EQ_OFFSET.y + height / 2, z);
      _obj.scale.set(0.28, height, 0.28);
      _obj.rotation.y = -angle;
      _obj.updateMatrix();
      mesh.setMatrixAt(i, _obj.matrix);

      if (norm < 0.35) _col.lerpColors(C_DIM, C_GOLD, norm / 0.35);
      else if (norm < 0.72) _col.lerpColors(C_GOLD, C_AMBER, (norm - 0.35) / 0.37);
      else _col.lerpColors(C_AMBER, C_RED, (norm - 0.72) / 0.28);
      mesh.setColorAt(i, _col);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geo, mat, count]}
      frustumCulled={false}
    />
  );
}

// ─── Floor ────────────────────────────────────────────────────────────────────

function Floor({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#050505" metalness={0.3} roughness={1} />
      </mesh>
    );
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 80]}
        resolution={512}
        mixBlur={1}
        mixStrength={8}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#060606"
        metalness={0.35}
        mirror={0}
      />
    </mesh>
  );
}

// ─── Camera rig (mouse parallax on desktop, top-down on mobile) ───────────────

function CameraRig({ isMobile, reduced }: { isMobile: boolean; reduced: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 22, 8);
    } else {
      camera.position.set(0, 16, 18);
    }
    camera.lookAt(0, 0.5, 0);
  }, [isMobile, camera]);

  useFrame(({ pointer }) => {
    if (reduced || isMobile) return;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.8, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 16 + pointer.y * 1.2, 0.04);
    camera.lookAt(0, 0.5, 0);
  });

  return null;
}

// ─── Full scene content (inside Canvas) ──────────────────────────────────────

function SceneContent({
  onPadDown,
  onPadUp,
  isMobile,
  reduced,
  isRecording,
}: {
  onPadDown: (pad: (typeof pads)[number]) => void;
  onPadUp: (id: number) => void;
  isMobile: boolean;
  reduced: boolean;
  isRecording: boolean;
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.07} />
      <spotLight
        position={[6, 18, 10]}
        angle={0.45}
        penumbra={0.6}
        intensity={4}
        color="#ffd070"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-9, 8, 5]} color="#C9A84C" intensity={2.5} decay={2} />
      <pointLight position={[9, 8, 5]} color="#8b5a00" intensity={1.5} decay={2} />
      <pointLight position={[0, 12, -2]} color="#ffffff" intensity={0.8} decay={2} />

      {/* Fog */}
      <fog attach="fog" args={["#000000", 20, 55]} />

      {/* Scene elements */}
      <Chassis isRecording={isRecording} />
      <LedDisplay />
      {pads.map((pad) => (
        <PadMesh key={pad.id} pad={pad} onDown={onPadDown} onUp={onPadUp} />
      ))}
      <EqRing reduced={reduced} isMobile={isMobile} />
      <Floor isMobile={isMobile} />
      <CameraRig isMobile={isMobile} reduced={reduced} />
    </>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function SamplerScene3D() {
  const { isRecording, currentCampaign, triggerPad, releasePad, setDisplay } =
    useSamplerStore();
  const [audioReady, setAudioReady] = useState(false);
  const [webAudioSupported] = useState(
    () => typeof window !== "undefined" && "AudioContext" in window
  );
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pressedRef = useRef<Set<number>>(new Set());
  const campaignRef = useRef<string>("");

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Start beat when campaign changes after first interaction
  useEffect(() => {
    if (!audioReady || campaignRef.current === currentCampaign) return;
    campaignRef.current = currentCampaign;
    const track = tracks[currentCampaign];
    if (track) audio.startBeat(track.beat);
  }, [audioReady, currentCampaign]);

  const handlePadDown = useCallback(
    async (pad: (typeof pads)[number]) => {
      if (pressedRef.current.has(pad.id)) return;
      pressedRef.current.add(pad.id);
      if (!audioReady) {
        setAudioReady(true);
        const track = tracks[currentCampaign];
        if (track) audio.startBeat(track.beat);
        campaignRef.current = currentCampaign;
      }
      triggerPad(pad.id, pad.label);
      await audio.triggerSample(pad.src);
    },
    [audioReady, currentCampaign, triggerPad]
  );

  const handlePadUp = useCallback(
    (id: number) => {
      pressedRef.current.delete(id);
      releasePad(id);
      setTimeout(() => {
        if (!useSamplerStore.getState().activePads.length) {
          setDisplay("LIROY SP-1200");
        }
      }, 600);
    },
    [releasePad, setDisplay]
  );

  // Keyboard listener (window-level, active while component is mounted)
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const padId = KEY_PAD[e.key.toLowerCase()];
      if (padId === undefined) return;
      handlePadDown(pads[padId]);
    };
    const onUp = (e: KeyboardEvent) => {
      const padId = KEY_PAD[e.key.toLowerCase()];
      if (padId === undefined) return;
      handlePadUp(padId);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [handlePadDown, handlePadUp]);

  if (!webAudioSupported) {
    return (
      <div className="flex items-center justify-center h-64 border border-[#C9A84C]/20 bg-[#080806]">
        <p className="text-[#C9A84C]/40 font-mono text-xs tracking-widest uppercase">
          Web Audio not supported in this browser
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full flex flex-col select-none"
      style={{ fontFamily: "'Barlow Condensed', 'Courier New', monospace" }}
    >
      {/* SR-only accessibility buttons */}
      <div className="sr-only" aria-label="SP-1200 Pad Grid">
        {pads.map((pad) => (
          <button
            key={pad.id}
            aria-label={`Pad ${pad.id + 1}: ${pad.label}`}
            onMouseDown={() => handlePadDown(pad)}
            onMouseUp={() => handlePadUp(pad.id)}
            onTouchStart={(e) => { e.preventDefault(); handlePadDown(pad); }}
            onTouchEnd={(e) => { e.preventDefault(); handlePadUp(pad.id); }}
          >
            {pad.label}
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div
        className="w-full rounded-t-xl overflow-hidden"
        style={{
          height: isMobile ? "calc(100vw * 0.85)" : "520px",
          maxHeight: "580px",
          background: "#000",
          border: "1px solid rgba(201,168,76,0.18)",
          borderBottom: "none",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(201,168,76,0.15)",
        }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 16, 18], fov: 42, near: 0.5, far: 100 }}
          gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
          shadows
        >
          <color attach="background" args={[0, 0, 0]} />
          <SceneContent
            onPadDown={handlePadDown}
            onPadUp={handlePadUp}
            isMobile={isMobile}
            reduced={reduced}
            isRecording={isRecording}
          />
        </Canvas>
      </div>

      {/* Controls (HTML, below canvas) */}
      <div
        className="rounded-b-xl overflow-hidden border border-[#C9A84C]/18"
        style={{
          borderTop: "1px solid rgba(201,168,76,0.1)",
          boxShadow: "0 15px 50px rgba(0,0,0,0.9)",
        }}
      >
        <SamplerControls />
      </div>

      {/* Keyboard hint */}
      <p
        className="text-center mt-2 text-[8px] tracking-[0.4em] uppercase font-mono"
        style={{ color: "rgba(201,168,76,0.2)" }}
      >
        {audioReady
          ? `BEAT: ${currentCampaign} · ${tracks[currentCampaign]?.bpm ?? "--"} BPM`
          : "TOUCH PADS OR USE KEYS: 1234 / QWER / ASDF / ZXCV"}
      </p>
    </div>
  );
}
