"use client";

import { useEffect, useRef } from "react";
import { useSamplerStore } from "./store";
import * as audio from "./audioEngine";
import samplerConfig from "@/config/sampler-config";

const campaigns = Object.keys(samplerConfig.tracks);

// Shared vintage-metal button style
const metalBtn = (active = false, accent = "#C9A84C") =>
  ({
    background: active
      ? `linear-gradient(145deg, ${accent}18 0%, #0e0c07 100%)`
      : "linear-gradient(145deg, #1e1a0e 0%, #0c0b06 60%, #161208 100%)",
    border: `1px solid ${active ? accent : "rgba(201,168,76,0.28)"}`,
    borderRadius: "3px",
    boxShadow: active
      ? `0 1px 3px rgba(0,0,0,0.8), inset 0 1px 4px rgba(0,0,0,0.6), 0 0 10px ${accent}40`
      : `0 3px 7px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.6)`,
    color: active ? accent : "rgba(201,168,76,0.55)",
    transform: active ? "translateY(1px)" : "translateY(0)",
    transition: "all 0.06s ease",
    cursor: "pointer",
  } as React.CSSProperties);

export default function SamplerControls() {
  const {
    currentCampaign, setCampaign,
    isRecording, setRecording,
    volume, setVolume,
    beatVolume, setBeatVolume,
    setDisplay,
  } = useSamplerStore();

  const blobRef = useRef<Blob | null>(null);

  useEffect(() => { audio.setMasterVolume(volume); }, [volume]);
  useEffect(() => { audio.setBeatVolume(beatVolume); }, [beatVolume]);

  async function handleCampaignChange(name: string) {
    setCampaign(name);
    const track = samplerConfig.tracks[name];
    if (track) await audio.startBeat(track.beat);
  }

  async function handleRecord() {
    if (isRecording) {
      const blob = await audio.stopRecording();
      blobRef.current = blob;
      setRecording(false);
      setDisplay(blob ? "REC SAVED — DOWNLOAD" : "LIROY SP-1200");
    } else {
      audio.startRecording();
      setRecording(true);
    }
  }

  function handleDownload() {
    if (!blobRef.current) return;
    const url = URL.createObjectURL(blobRef.current);
    const a = document.createElement("a");
    a.href = url;
    a.download = `liroy-mix-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
    setDisplay("LIROY SP-1200");
  }

  return (
    <div
      className="flex flex-wrap items-center gap-3 px-4 py-3 border-t"
      style={{
        borderColor: "rgba(201,168,76,0.12)",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.25) 100%)",
      }}
    >
      {/* Campaign selector */}
      <div className="flex items-center gap-2">
        <span
          className="text-[8px] tracking-[0.45em] uppercase font-mono"
          style={{ color: "rgba(201,168,76,0.4)" }}
        >
          BEAT
        </span>
        <div className="relative">
          <select
            value={currentCampaign}
            onChange={(e) => handleCampaignChange(e.target.value)}
            style={{
              appearance: "none",
              background:
                "linear-gradient(145deg, #1e1a0e 0%, #0c0b06 100%)",
              border: "1px solid rgba(201,168,76,0.32)",
              borderRadius: "3px",
              color: "#C9A84C",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'Courier New', monospace",
              padding: "5px 22px 5px 10px",
              cursor: "pointer",
              outline: "none",
              boxShadow:
                "0 3px 7px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {campaigns.map((c) => (
              <option key={c} value={c}
                style={{ background: "#0e0c07", color: "#C9A84C" }}>
                {c}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 font-mono"
            style={{ color: "rgba(201,168,76,0.45)", fontSize: "7px" }}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Master volume */}
      <MetalKnob label="VOL" value={volume} onChange={setVolume} />

      {/* Beat volume */}
      <MetalKnob label="BEAT" value={beatVolume} onChange={setBeatVolume} />

      <div className="flex-1" />

      {/* Record button */}
      <button
        onClick={handleRecord}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[8px] tracking-[0.35em] uppercase font-mono"
        style={metalBtn(isRecording, "#cc1111")}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${isRecording ? "animate-pulse" : ""}`}
          style={{
            background: isRecording ? "#cc1111" : "rgba(201,168,76,0.45)",
            boxShadow: isRecording ? "0 0 4px #cc1111" : "none",
          }}
        />
        {isRecording ? "STOP" : "REC"}
      </button>

      {/* Download / Save */}
      <button
        onClick={handleDownload}
        disabled={!blobRef.current}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[8px] tracking-[0.35em] uppercase font-mono disabled:opacity-30 disabled:cursor-not-allowed"
        style={metalBtn(false)}
      >
        ↓ SAVE
      </button>
    </div>
  );
}

function MetalKnob({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[8px] tracking-[0.45em] uppercase font-mono"
        style={{ color: "rgba(201,168,76,0.4)" }}
      >
        {label}
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="cursor-pointer"
        style={{
          width: "72px",
          height: "2px",
          accentColor: "#C9A84C",
          background: `linear-gradient(90deg, #C9A84C ${value * 100}%, #2a2418 ${value * 100}%)`,
          borderRadius: "1px",
          outline: "none",
        }}
      />
      <span
        className="text-[8px] font-mono w-6 text-right"
        style={{ color: "rgba(201,168,76,0.35)" }}
      >
        {Math.round(value * 100)}
      </span>
    </div>
  );
}
