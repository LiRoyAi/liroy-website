"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface VideoEntry {
  id: string;
  label: string;
  sublabel?: string;
}

const TELEDYSKI: VideoEntry[] = [
  { id: "3VvmcLFxro0", label: "Teledysk #1" },
  { id: "PH_5YoosihA", label: "Teledysk #2" },
  { id: "B3-7VM_UNFg", label: "Czas na Boom Bap!" },
  { id: "UWP4h8ZfkZA", label: "Kampania" },
  { id: "AsdPs3_ckOc", label: "Klasyk" },
  { id: "s5AjCMEWCTQ", label: "L7 — Trailer" },
];

const KONCERTY: VideoEntry[] = [
  { id: "j2uW8lTyL0Y", label: "Scyzoryk / L Niño", sublabel: "Trasa 30 lat Alboom" },
  { id: "URKfbeoEO4M", label: "Autobiografia", sublabel: "Trasa 30 lat Alboom" },
  { id: "V1bybztTLgM", label: "Impreza / Śleboda", sublabel: "Trasa 30 lat Alboom" },
  { id: "UNPQsjl042c", label: "Twoja Córka", sublabel: "Trasa 30 lat Alboom" },
];

const BACKSTAGE: VideoEntry[] = [
  { id: "bPWxSD8hPXA", label: "Backstage #1" },
  { id: "JlnJkzwyrsQ", label: "Backstage #2" },
  { id: "jlsYDbZnnmo", label: "Backstage #3" },
];

const TABS = [
  { id: "teledyski", label: "Teledyski", data: TELEDYSKI },
  { id: "koncerty", label: "Koncerty", data: KONCERTY },
  { id: "backstage", label: "Backstage", data: BACKSTAGE },
];

function YTCard({ video }: { video: VideoEntry }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-white/[0.07] bg-[#0a0a0a] group hover:border-[rgba(202,138,4,0.4)] transition-all duration-300"
      style={{ aspectRatio: "16/9" }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
          title={video.label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Odtwórz: ${video.label}`}
          className="absolute inset-0 w-full h-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={video.label}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors duration-300 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-black/40 flex items-center justify-center group-hover:border-[#ca8a04] transition-colors duration-300">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p
              className="text-white font-bold tracking-wider text-center px-4 drop-shadow-lg text-sm"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {video.label}
            </p>
            {video.sublabel && (
              <p className="text-white/40 text-[10px] tracking-widest -mt-2">
                {video.sublabel}
              </p>
            )}
          </div>
        </button>
      )}
    </div>
  );
}

export default function YouTubeCurated() {
  const [activeTab, setActiveTab] = useState("teledyski");
  const current = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="w-full mb-12">
      {/* Section label */}
      <div
        className="text-[10px] tracking-[0.5em] text-[#333] uppercase mb-5"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
      >
        WYBRANE KLIPY &mdash; {current.data.length} FILMÓW
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-white/[0.06]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-200 border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-[#ca8a04] text-[#ca8a04]"
                : "border-transparent text-[#444] hover:text-[#666]"
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {current.data.map((v) => (
          <YTCard key={v.id} video={v} />
        ))}
      </motion.div>
    </div>
  );
}
