"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSamplerStore } from "./store";
import * as audio from "./audioEngine";
import samplerConfig from "@/config/sampler-config";
import SamplerCanvas from "./SamplerCanvas";
import SamplerControls from "./SamplerControls";

const { pads, tracks, currentCampaign: defaultCampaign } = samplerConfig;

// Row color accents: each row gets a distinct hue
const ROW_COLORS = [
  { idle: "#1a150a", active: "#C9A84C", border: "#C9A84C40", activeBorder: "#C9A84C" },
  { idle: "#120a0a", active: "#cc3333", border: "#cc333330", activeBorder: "#cc3333" },
  { idle: "#0a120a", active: "#33cc77", border: "#33cc7730", activeBorder: "#33cc77" },
  { idle: "#0a0a18", active: "#4477cc", border: "#4477cc30", activeBorder: "#4477cc" },
];

// Blink LED display
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
  const { activePads, displayText, isRecording, currentCampaign, triggerPad, releasePad, setDisplay } =
    useSamplerStore();
  const ledText = useLedBlink(displayText, isRecording);
  const [audioReady, setAudioReady] = useState(false);
  const [webAudioSupported] = useState(() => typeof window !== "undefined" && "AudioContext" in window);
  const pressedRef = useRef<Set<number>>(new Set());

  // Start background beat when campaign changes (only after first interaction)
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
        // First interaction — kick off beat
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
      {/* Machine shell */}
      <div
        className="relative rounded-xl overflow-hidden border border-[#C9A84C]/20"
        style={{
          background: "linear-gradient(180deg, #0f0e0a 0%, #080806 60%, #0a0908 100%)",
          boxShadow: "0 0 60px rgba(201,168,76,0.06), inset 0 1px 0 rgba(201,168,76,0.08)",
        }}
      >
        {/* ─── TOP STRIP: branding + LED ─── */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-[#C9A84C]/10"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: i === 0 ? "#C9A84C" : "#333" }}
                />
              ))}
            </div>
            <span className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase font-mono font-bold">
              LIROY
            </span>
            <span className="text-[#C9A84C]/30 text-[9px] tracking-[0.3em] uppercase font-mono">
              SP-1200
            </span>
          </div>

          {/* LED display */}
          <div
            className="flex-1 mx-6 px-4 py-1.5 rounded-sm"
            style={{
              background: "#000d00",
              border: "1px solid rgba(0,255,80,0.15)",
              boxShadow: "inset 0 0 12px rgba(0,255,80,0.05), 0 0 8px rgba(0,255,80,0.08)",
            }}
          >
            <span
              className="block text-center text-xs tracking-[0.35em] uppercase truncate"
              style={{ color: "#00ff50", textShadow: "0 0 8px rgba(0,255,80,0.8)", fontFamily: "'Courier New', monospace" }}
            >
              {ledText || " "}
            </span>
          </div>

          {/* Status dots */}
          <div className="flex gap-2 items-center">
            <div
              className={`w-2 h-2 rounded-full transition-colors ${audioReady ? "bg-[#C9A84C]" : "bg-[#333]"}`}
              title={audioReady ? "Audio active" : "Click a pad to start"}
            />
            <div
              className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-[#333]"}`}
              title="Recording"
            />
          </div>
        </div>

        {/* ─── VISUALIZER CANVAS ─── */}
        <div
          className="w-full border-b border-[#C9A84C]/08"
          style={{ height: "90px", background: "#000" }}
        >
          <SamplerCanvas />
        </div>

        {/* ─── PAD GRID 4×4 ─── */}
        <div className="p-4 md:p-5">
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {pads.map((pad) => {
              const row = Math.floor(pad.id / 4);
              const colors = ROW_COLORS[row];
              const isActive = activePads.includes(pad.id);

              return (
                <button
                  key={pad.id}
                  onMouseDown={() => handlePadDown(pad)}
                  onMouseUp={() => handlePadUp(pad.id)}
                  onMouseLeave={() => pressedRef.current.has(pad.id) && handlePadUp(pad.id)}
                  onTouchStart={(e) => { e.preventDefault(); handlePadDown(pad); }}
                  onTouchEnd={(e) => { e.preventDefault(); handlePadUp(pad.id); }}
                  className="relative flex flex-col items-center justify-end rounded-md overflow-hidden cursor-pointer transition-all duration-75 active:scale-95"
                  style={{
                    background: isActive
                      ? `radial-gradient(ellipse 80% 60% at 50% 30%, ${colors.active}22, ${colors.idle})`
                      : colors.idle,
                    border: `1px solid ${isActive ? colors.activeBorder : colors.border}`,
                    boxShadow: isActive
                      ? `0 0 20px ${colors.active}40, inset 0 0 12px ${colors.active}18`
                      : "inset 0 1px 0 rgba(255,255,255,0.03)",
                    paddingBottom: "8px",
                    paddingTop: "20px",
                    minHeight: "68px",
                  }}
                >
                  {/* Pad number */}
                  <span
                    className="absolute top-1.5 left-2 text-[9px] font-mono"
                    style={{ color: isActive ? colors.active : "#333" }}
                  >
                    {String(pad.id + 1).padStart(2, "0")}
                  </span>

                  {/* Active LED strip top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-75"
                    style={{
                      background: colors.active,
                      opacity: isActive ? 1 : 0,
                      boxShadow: `0 0 6px ${colors.active}`,
                    }}
                  />

                  {/* Label */}
                  <span
                    className="text-center leading-tight px-1"
                    style={{
                      fontSize: "clamp(7px, 1.1vw, 10px)",
                      color: isActive ? colors.active : "#555",
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

        {/* ─── CONTROLS BAR ─── */}
        <SamplerControls />

        {/* Bottom strip */}
        <div
          className="flex items-center justify-between px-5 py-2 border-t border-[#C9A84C]/08"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <span className="text-[#333] text-[8px] tracking-[0.4em] uppercase font-mono">
            {audioReady ? `BEAT: ${currentCampaign} · ${tracks[currentCampaign]?.bpm ?? "--"} BPM` : "CLICK A PAD TO START"}
          </span>
          <span className="text-[#333] text-[8px] tracking-[0.3em] font-mono">
            LIROY © 2025
          </span>
        </div>
      </div>
    </div>
  );
}
