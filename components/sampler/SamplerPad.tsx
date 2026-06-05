"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSamplerStore } from "./store";
import * as audio from "./audioEngine";
import samplerConfig from "@/config/sampler-config";
import SamplerControls from "./SamplerControls";

const SamplerVisualizer3D = dynamic(() => import("./SamplerVisualizer3D"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "#000" }}
    >
      <span
        className="text-[9px] tracking-[0.5em] uppercase font-mono"
        style={{ color: "rgba(201,168,76,0.2)" }}
      >
        DISPLAY
      </span>
    </div>
  ),
});

const { pads, tracks } = samplerConfig;

const ROW_COLORS = [
  { idle: "#1a150a", active: "#C9A84C", border: "rgba(201,168,76,0.4)", activeBorder: "#C9A84C" },
  { idle: "#120a0a", active: "#cc3333", border: "rgba(204,51,51,0.3)",  activeBorder: "#cc3333" },
  { idle: "#0a120a", active: "#33cc77", border: "rgba(51,204,119,0.3)", activeBorder: "#33cc77" },
  { idle: "#0a0a18", active: "#4477cc", border: "rgba(68,119,204,0.3)", activeBorder: "#4477cc" },
];

const SCREW_POSITIONS = [
  "top-2.5 left-2.5",
  "top-2.5 right-2.5",
  "bottom-2.5 left-2.5",
  "bottom-2.5 right-2.5",
];

function useLedBlink(text: string, isRecording: boolean) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!isRecording) { setVisible(true); return; }
    const id = setInterval(() => setVisible((v) => !v), 500);
    return () => clearInterval(id);
  }, [isRecording]);
  return visible ? text : "";
}

export default function SamplerPad() {
  const {
    activePads, displayText, isRecording, currentCampaign,
    triggerPad, releasePad, setDisplay,
  } = useSamplerStore();
  const ledText = useLedBlink(displayText, isRecording);
  const [audioReady, setAudioReady] = useState(false);
  const [webAudioSupported] = useState(
    () => typeof window !== "undefined" && "AudioContext" in window
  );
  const pressedRef = useRef<Set<number>>(new Set());
  const campaignRef = useRef<string>("");

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
      className="w-full select-none"
      style={{ fontFamily: "'Barlow Condensed', 'Courier New', monospace" }}
    >
      {/* ═══ CHASSIS ═══════════════════════════════════════════════════════════ */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px, transparent 2px,
              rgba(201,168,76,0.013) 2px, rgba(201,168,76,0.013) 3px
            ),
            linear-gradient(180deg,
              #2e2618 0%, #1f1a10 6%, #111009 40%, #0c0b07 70%, #161310 100%
            )
          `,
          border: "1px solid rgba(201,168,76,0.22)",
          boxShadow: `
            0 30px 90px rgba(0,0,0,0.97),
            0 8px 30px rgba(0,0,0,0.7),
            0 0 0 3px rgba(0,0,0,0.9),
            0 0 0 4px rgba(201,168,76,0.08),
            inset 0 1px 0 rgba(201,168,76,0.18),
            inset 0 -1px 0 rgba(0,0,0,0.95),
            inset 0 0 50px rgba(0,0,0,0.25)
          `,
        }}
      >
        {/* Corner screws */}
        {SCREW_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-3.5 h-3.5 rounded-full z-10 flex items-center justify-center`}
            style={{
              background: "radial-gradient(ellipse at 35% 30%, #3d3318, #1c160a, #0d0b06)",
              border: "1px solid rgba(201,168,76,0.22)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.9), inset 0 0.5px 0 rgba(255,255,255,0.06)",
            }}
          >
            <svg width="7" height="7" viewBox="0 0 8 8" style={{ opacity: 0.28 }}>
              <line x1="4" y1="1" x2="4" y2="7" stroke="#C9A84C" strokeWidth="1" />
              <line x1="1" y1="4" x2="7" y2="4" stroke="#C9A84C" strokeWidth="1" />
            </svg>
          </div>
        ))}

        {/* ─── TOP STRIP: brand + LED ─────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-[#C9A84C]/10"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i === 0 ? "#C9A84C" : "#2a2318",
                    boxShadow: i === 0 ? "0 0 4px #C9A84C80" : "none",
                  }}
                />
              ))}
            </div>
            <span className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase font-mono font-bold"
              style={{ textShadow: "0 0 10px rgba(201,168,76,0.4)" }}>
              LIROY
            </span>
            <span className="text-[#C9A84C]/30 text-[9px] tracking-[0.35em] uppercase font-mono">
              SP‑1200
            </span>
          </div>

          {/* LED display */}
          <div
            className="flex-1 mx-5 px-4 py-1.5 rounded-sm"
            style={{
              background: "#000d00",
              border: "1px solid rgba(0,255,80,0.15)",
              boxShadow:
                "inset 0 0 14px rgba(0,255,80,0.06), 0 0 10px rgba(0,255,80,0.08), inset 1px 0 0 rgba(0,255,80,0.04), inset -1px 0 0 rgba(0,255,80,0.04)",
            }}
          >
            <span
              className="block text-center text-xs tracking-[0.35em] uppercase truncate"
              style={{
                color: "#00ff50",
                textShadow: "0 0 8px rgba(0,255,80,0.9), 0 0 20px rgba(0,255,80,0.4)",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {ledText || " "}
            </span>
          </div>

          {/* Status dots */}
          <div className="flex gap-2 items-center">
            <div
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{
                background: audioReady ? "#C9A84C" : "#2a2318",
                boxShadow: audioReady ? "0 0 6px #C9A84C" : "none",
              }}
              title={audioReady ? "Audio active" : "Click a pad to start"}
            />
            <div
              className={`w-2 h-2 rounded-full ${isRecording ? "animate-pulse" : ""}`}
              style={{
                background: isRecording ? "#cc1111" : "#2a1010",
                boxShadow: isRecording ? "0 0 6px #cc1111" : "none",
              }}
              title="Recording"
            />
          </div>
        </div>

        {/* ─── 3D VISUALIZER SCREEN ──────────────────────────────────────────── */}
        <div
          className="w-full relative"
          style={{
            height: "220px",
            background: "#000",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.9), inset 0 -2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {/* Screen bezel inset */}
          <div
            className="absolute inset-1 overflow-hidden rounded-sm"
            style={{
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.7)",
            }}
          >
            <SamplerVisualizer3D />
          </div>
          {/* Screen label */}
          <div
            className="absolute bottom-2 right-3 text-[7px] tracking-[0.4em] uppercase font-mono"
            style={{ color: "rgba(201,168,76,0.18)", pointerEvents: "none" }}
          >
            EQ · 3D
          </div>
        </div>

        {/* ─── PAD SECTION LABEL ─────────────────────────────────────────────── */}
        <div
          className="px-5 pt-3 pb-1 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(201,168,76,0.06)" }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.12)" }} />
          <span className="text-[7px] tracking-[0.5em] uppercase font-mono"
            style={{ color: "rgba(201,168,76,0.3)" }}>
            PADS
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.12)" }} />
        </div>

        {/* ─── PAD GRID 4×4 ──────────────────────────────────────────────────── */}
        <div className="p-4 md:p-5">
          <div className="grid grid-cols-4 gap-2.5 md:gap-3">
            {pads.map((pad) => {
              const row = Math.floor(pad.id / 4);
              const colors = ROW_COLORS[row];
              const isActive = activePads.includes(pad.id);

              return (
                <button
                  key={pad.id}
                  onMouseDown={() => handlePadDown(pad)}
                  onMouseUp={() => handlePadUp(pad.id)}
                  onMouseLeave={() =>
                    pressedRef.current.has(pad.id) && handlePadUp(pad.id)
                  }
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handlePadDown(pad);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handlePadUp(pad.id);
                  }}
                  className="relative flex flex-col items-center justify-end overflow-hidden cursor-pointer"
                  style={{
                    background: isActive
                      ? `linear-gradient(145deg, ${colors.active}28 0%, ${colors.idle} 100%)`
                      : "linear-gradient(145deg, #211c0f 0%, #0e0c07 55%, #181309 100%)",
                    border: `1.5px solid ${isActive ? colors.activeBorder : colors.border}`,
                    borderRadius: "5px",
                    boxShadow: isActive
                      ? `
                          0 1px 4px rgba(0,0,0,0.85),
                          inset 0 2px 8px rgba(0,0,0,0.7),
                          0 0 16px ${colors.active}55,
                          inset 0 0 10px ${colors.active}18
                        `
                      : `
                          0 5px 12px rgba(0,0,0,0.88),
                          0 2px 4px rgba(0,0,0,0.6),
                          inset 0 1px 0 rgba(255,255,255,0.05),
                          inset 0 -2px 4px rgba(0,0,0,0.65),
                          inset 1px 0 0 rgba(255,255,255,0.025)
                        `,
                    transform: isActive
                      ? "translateY(2px) scale(0.985)"
                      : "translateY(0) scale(1)",
                    transition: "transform 0.06s ease, box-shadow 0.06s ease, background 0.06s ease",
                    paddingBottom: "8px",
                    paddingTop: "22px",
                    minHeight: "70px",
                  }}
                >
                  {/* Pad number */}
                  <span
                    className="absolute top-1.5 left-2 text-[8px] font-mono font-bold"
                    style={{
                      color: isActive ? colors.active : "#2e2a1e",
                      textShadow: isActive ? `0 0 5px ${colors.active}80` : "none",
                    }}
                  >
                    {String(pad.id + 1).padStart(2, "0")}
                  </span>

                  {/* Active LED strip at top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{
                      background: isActive
                        ? `linear-gradient(90deg, transparent, ${colors.active}, transparent)`
                        : "transparent",
                      boxShadow: isActive ? `0 0 8px ${colors.active}` : "none",
                      transition: "opacity 0.06s",
                    }}
                  />

                  {/* Gold accent line at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: isActive
                        ? colors.active
                        : "rgba(201,168,76,0.06)",
                    }}
                  />

                  {/* Label */}
                  <span
                    className="text-center leading-tight px-1"
                    style={{
                      fontSize: "clamp(7px, 1.1vw, 10px)",
                      color: isActive ? colors.active : "#4a4433",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      textShadow: isActive ? `0 0 6px ${colors.active}80` : "none",
                    }}
                  >
                    {pad.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── CONTROLS ──────────────────────────────────────────────────────── */}
        <SamplerControls />

        {/* ─── BOTTOM STRIP ──────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-2 border-t border-[#C9A84C]/08"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            {/* Ventilation slots */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-0.5 rounded-full"
                style={{ background: "rgba(201,168,76,0.08)" }}
              />
            ))}
          </div>
          <span
            className="text-[#333] text-[7px] tracking-[0.4em] uppercase font-mono"
            style={{ color: "rgba(201,168,76,0.18)" }}
          >
            {audioReady
              ? `BEAT: ${currentCampaign} · ${tracks[currentCampaign]?.bpm ?? "--"} BPM`
              : "CLICK A PAD TO START"}
          </span>
          <span
            className="text-[7px] tracking-[0.3em] font-mono"
            style={{ color: "rgba(201,168,76,0.12)" }}
          >
            LIROY © 2025
          </span>
        </div>
      </div>
    </div>
  );
}
