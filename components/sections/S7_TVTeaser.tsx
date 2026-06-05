"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const FEATURED_YT = [
  { id: "fkyDHiXxXZI", label: "Skaczcie do góry (1997)" },
  { id: "nZ4h-1nihHw", label: "Moja Autobiografia VIDEO" },
  { id: "o7XS3H9_n24", label: "Scyzoryk EP — XXXI Rocznica" },
];

function YTThumb({ id, label }: { id: string; label: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-lg border border-white/10 cursor-pointer group hover:border-[#C9A84C]/40 transition-all duration-300"
      style={{ aspectRatio: "16/9" }}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={label}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors duration-300 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-black/40 flex items-center justify-center group-hover:border-[#C9A84C] transition-colors">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="font-bebas text-white tracking-wider text-sm px-4 text-center drop-shadow">
              {label}
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function S7_TVTeaser() {
  return (
    <section
      id="tv-teaser"
      className="relative bg-[#020202] py-24 px-6 md:px-16 overflow-hidden"
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-white/30 text-[10px] tracking-[0.5em] uppercase">
              Na żywo
            </span>
          </div>
          <h2
            className="font-bebas text-[#C9A84C] leading-none"
            style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
          >
            LIROY TV
          </h2>
          <p className="text-white/30 text-sm mt-2 tracking-widest uppercase">
            24/7 · Muzyka. Kultura. Bunt.
          </p>
          <div className="mt-4 w-16 h-px bg-[#C9A84C]" />
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {FEATURED_YT.map((v) => (
            <YTThumb key={v.id} id={v.id} label={v.label} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/tv"
            className="inline-block border border-[#C9A84C]/50 text-[#C9A84C] px-14 py-4 text-[11px] tracking-[0.4em] uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-bebas"
          >
            Otwórz LIROY TV — pełna lista →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
