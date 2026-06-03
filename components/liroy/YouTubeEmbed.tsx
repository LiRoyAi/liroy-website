"use client";

import { useState } from "react";

interface Props {
  videoId: string;
  label: string;
  sublabel?: string;
  className?: string;
}

export default function YouTubeEmbed({ videoId, label, sublabel, className = "" }: Props) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-white/8 bg-[#0d0d0d] group ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Odtwórz: ${label}`}
          className="absolute inset-0 w-full h-full cursor-pointer"
        >
          {/* Thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={label}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors duration-300 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-white/50 bg-black/40 flex items-center justify-center mb-3 group-hover:border-[#C9A84C] transition-colors duration-300">
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p
              className="font-bebas text-white tracking-widest text-center px-4 drop-shadow-lg"
              style={{ fontSize: "clamp(14px, 2vw, 18px)" }}
            >
              {label}
            </p>
            {sublabel && (
              <p className="text-white/40 text-[10px] tracking-widest mt-1">{sublabel}</p>
            )}
          </div>

          {/* Gold bottom line on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      )}
    </div>
  );
}
