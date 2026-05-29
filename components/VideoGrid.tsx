"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export interface VideoItem {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

const PLAYLIST_ID = "PL1JRTA9pmLreGR10UG36dg6-C7BFQ9KFn";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function VideoGrid({ videos }: { videos: VideoItem[] }) {
  // Default to first video in playlist so the embed always has a concrete video
  const [activeId, setActiveId] = useState<string>(
    videos[0]?.videoId ?? ""
  );

  const activeVideo = videos.find((v) => v.videoId === activeId);

  // Use embed/{videoId}?list= — this is the reliable format.
  // videoseries?list= frequently renders blank on external domains.
  const embedSrc = activeId
    ? `https://www.youtube.com/embed/${activeId}?list=${PLAYLIST_ID}&rel=0&modestbranding=1`
    : `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0&modestbranding=1`;

  return (
    <div className="w-full">
      {/* Main player — always mounted, src updates in place */}
      <div className="w-full rounded-xl overflow-hidden border border-white/[0.07] mb-3 relative bg-[#0a0a0a]"
        style={{ paddingBottom: "56.25%" /* 16:9 */ }}
      >
        <iframe
          key={activeId}
          src={embedSrc}
          title={activeVideo?.title ?? "LIROY TV"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>

      {/* Active title */}
      {activeVideo && (
        <p
          className="text-[#666] text-sm mb-8 px-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
        >
          {activeVideo.title}
        </p>
      )}

      {/* Video grid */}
      {videos.length > 0 && (
        <div>
          <div
            className="text-[10px] tracking-[0.5em] text-[#333] uppercase mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            WSZYSTKIE FILMY &mdash; {videos.length} ODCINKÓW
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, i) => {
              const isActive = activeId === video.videoId;
              return (
                <motion.button
                  key={video.videoId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.6) }}
                  onClick={() => setActiveId(video.videoId)}
                  className={`group text-left rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:ring-offset-2 focus:ring-offset-[#020202] ${
                    isActive
                      ? "border-[#ca8a04] shadow-lg shadow-[rgba(202,138,4,0.15)]"
                      : "border-white/[0.07] hover:border-[rgba(202,138,4,0.4)]"
                  }`}
                  aria-label={`Odtwórz: ${video.title}`}
                >
                  {/* Thumbnail */}
                  <div className="relative bg-[#111] overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    {/* Play overlay */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-[rgba(202,138,4,0.2)]"
                          : "bg-black/40 group-hover:bg-black/20"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "border-[#ca8a04] bg-[#ca8a04]"
                            : "border-white/40 group-hover:border-[#ca8a04] group-hover:bg-[rgba(202,138,4,0.15)]"
                        }`}
                      >
                        <Play
                          className={`w-4 h-4 transition-colors duration-200 ${
                            isActive
                              ? "text-black"
                              : "text-white group-hover:text-[#ca8a04]"
                          }`}
                          fill="currentColor"
                        />
                      </div>
                    </div>

                    {/* Now playing badge */}
                    {isActive && (
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-[#ca8a04] px-2 py-1 rounded">
                        <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                        <span
                          className="text-black text-[9px] font-black tracking-widest"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          TERAZ
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 bg-[#0a0a0a]">
                    <h3
                      className={`text-sm font-bold leading-tight mb-1 transition-colors duration-200 line-clamp-2 ${
                        isActive
                          ? "text-[#ca8a04]"
                          : "text-[#f5f5f5] group-hover:text-[#ca8a04]"
                      }`}
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {video.title}
                    </h3>
                    <p
                      className="text-[#444] text-[10px] tracking-wide"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {formatDate(video.publishedAt)}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
