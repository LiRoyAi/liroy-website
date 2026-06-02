"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  src: string;
  label: string;
  sublabel?: string;
  className?: string;
  aspectRatio?: string;
}

export default function LazyVideoCard({
  src,
  label,
  sublabel,
  className = "",
  aspectRatio = "aspect-video",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={toggle}
      className={`relative ${aspectRatio} bg-[#0d0d0d] overflow-hidden cursor-pointer group ${className}`}
    >
      {/* Video — only mount when in viewport */}
      {ready && !error && (
        <video
          ref={videoRef}
          src={src}
          preload="none"
          playsInline
          onError={() => setError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${
          playing ? "bg-transparent opacity-0 group-hover:opacity-100" : "bg-black/50 group-hover:bg-black/30"
        }`}
      >
        {!error ? (
          <>
            <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center mb-3 group-hover:border-[#C9A84C] transition-colors">
              {playing ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
            <p className="font-bebas text-white tracking-widest text-center px-4" style={{ fontSize: "clamp(14px, 2vw, 18px)" }}>
              {label}
            </p>
            {sublabel && (
              <p className="text-white/40 text-[10px] tracking-widest mt-1">{sublabel}</p>
            )}
          </>
        ) : (
          <div className="text-center px-4">
            <p className="font-bebas text-white/20 tracking-widest" style={{ fontSize: "clamp(14px, 2vw, 18px)" }}>
              {label}
            </p>
            <p className="text-white/15 text-[10px] mt-1 tracking-wider">Wkrótce dostępne</p>
          </div>
        )}
      </div>

      {/* Gold accent bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
