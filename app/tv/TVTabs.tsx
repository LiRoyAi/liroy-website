"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import VideoGrid, { type VideoItem } from "@/components/VideoGrid";
import YouTubeCurated from "@/components/YouTubeCurated";

const SamplerScene3D = dynamic(() => import("@/components/sampler/SamplerScene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 border border-[#C9A84C]/10 rounded-xl">
      <span className="text-[#C9A84C]/30 text-[10px] tracking-[0.5em] uppercase font-mono">
        LOADING SAMPLER...
      </span>
    </div>
  ),
});

type Tab = "playlist" | "sampler";

const TABS: { id: Tab; label: string; sub: string }[] = [
  { id: "playlist", label: "PLAYLIST",  sub: "VIDEO · LIVE" },
  { id: "sampler",  label: "SAMPLER",   sub: "SP-1200 · BEAT" },
];

export default function TVTabs({
  videos,
  apiError,
}: {
  videos: VideoItem[];
  apiError: string | null;
}) {
  const [active, setActive] = useState<Tab>("playlist");

  return (
    <>
      {/* Tab bar */}
      <div className="w-full flex gap-1 mb-8 border-b border-[#1a1a1a]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className="relative flex flex-col items-start px-5 py-3 group transition-colors"
            style={{ background: "transparent" }}
          >
            <span
              className="text-xs tracking-[0.4em] uppercase font-mono font-bold transition-colors"
              style={{
                color: active === t.id ? "#C9A84C" : "#444",
                fontFamily: "'Barlow Condensed', monospace",
              }}
            >
              {t.label}
            </span>
            <span
              className="text-[9px] tracking-[0.3em] uppercase font-mono mt-0.5 transition-colors"
              style={{ color: active === t.id ? "#C9A84C60" : "#2a2a2a" }}
            >
              {t.sub}
            </span>
            {/* active underline */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px transition-all duration-200"
              style={{
                background: active === t.id ? "#C9A84C" : "transparent",
                boxShadow: active === t.id ? "0 0 8px #C9A84C" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active === "playlist" && (
        <>
          <YouTubeCurated />
          <VideoGrid videos={videos} />
          {apiError && (
            <div className="mt-8 w-full rounded-xl border border-red-900/40 bg-red-950/20 p-4">
              <p
                className="text-red-500 text-xs tracking-widest uppercase mb-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                Nie można załadować listy filmów
              </p>
              <p className="text-red-900 text-[11px] font-mono break-all">{apiError}</p>
            </div>
          )}
        </>
      )}

      {active === "sampler" && <SamplerScene3D />}
    </>
  );
}
