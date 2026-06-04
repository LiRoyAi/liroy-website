"use client";

import { useEffect, useRef } from "react";
import { useSamplerStore } from "./store";
import * as audio from "./audioEngine";
import samplerConfig from "@/config/sampler-config";

const campaigns = Object.keys(samplerConfig.tracks);

export default function SamplerControls() {
  const {
    currentCampaign, setCampaign,
    isRecording, setRecording,
    volume, setVolume,
    beatVolume, setBeatVolume,
    setDisplay,
  } = useSamplerStore();

  const blobRef = useRef<Blob | null>(null);

  // Sync volumes to audio engine
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
    <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-t border-[#C9A84C]/15">
      {/* Campaign selector */}
      <div className="flex items-center gap-2">
        <span className="text-[#C9A84C]/50 text-[9px] tracking-[0.4em] uppercase font-mono">
          BEAT
        </span>
        <div className="relative">
          <select
            value={currentCampaign}
            onChange={(e) => handleCampaignChange(e.target.value)}
            className="appearance-none bg-[#0d0d0a] border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-mono px-3 py-1.5 pr-6 cursor-pointer focus:outline-none focus:border-[#C9A84C]/60"
          >
            {campaigns.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[#C9A84C]/50 text-[8px]">▼</span>
        </div>
      </div>

      {/* Master volume */}
      <VolumeKnob label="VOL" value={volume} onChange={setVolume} />

      {/* Beat volume */}
      <VolumeKnob label="BEAT" value={beatVolume} onChange={setBeatVolume} />

      <div className="flex-1" />

      {/* Record */}
      <button
        onClick={handleRecord}
        className={`flex items-center gap-1.5 px-3 py-1.5 border text-[9px] tracking-[0.3em] uppercase font-mono transition-all ${
          isRecording
            ? "border-red-500 text-red-500 animate-pulse"
            : "border-[#C9A84C]/30 text-[#C9A84C]/70 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]"
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? "bg-red-500" : "bg-[#C9A84C]/50"}`} />
        {isRecording ? "STOP REC" : "REC"}
      </button>

      {/* Download */}
      <button
        onClick={handleDownload}
        disabled={!blobRef.current}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#C9A84C]/20 text-[#C9A84C]/40 text-[9px] tracking-[0.3em] uppercase font-mono hover:border-[#C9A84C]/50 hover:text-[#C9A84C]/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        ↓ SAVE
      </button>
    </div>
  );
}

function VolumeKnob({
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
      <span className="text-[#C9A84C]/50 text-[9px] tracking-[0.4em] uppercase font-mono">
        {label}
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-20 accent-[#C9A84C] cursor-pointer"
        style={{ height: "2px" }}
      />
      <span className="text-[#C9A84C]/40 text-[9px] font-mono w-6 text-right">
        {Math.round(value * 100)}
      </span>
    </div>
  );
}
