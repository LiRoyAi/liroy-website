"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";
import LazyVideoCard from "./LazyVideoCard";

// 3 YouTube backstage IDs + 1 lokalny plik (LIROY & ICE-T INTRO.mov — 202MB via LFS)
const CLIPS = [
  { type: "yt" as const, id: "bPWxSD8hPXA", label: "Wejście na scenę", sublabel: "Spotkanie z DJ-ami" },
  { type: "yt" as const, id: "JlnJkzwyrsQ", label: "Pod sceną / USA", sublabel: "Fani i koncert" },
  { type: "yt" as const, id: "jlsYDbZnnmo", label: "Przygotowania", sublabel: "Behind the scenes" },
  { type: "local" as const, src: "/video/LIROY & ICE-T INTRO.mov", label: "LIROY & ICE-T — Intro", sublabel: "Legenda spotyka legendę" },
];

export default function LiroyBackstage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(CLIPS.length - 1) * 80}vw`]);

  return (
    <section
      id="backstage"
      ref={targetRef}
      style={{ height: `${CLIPS.length * 80}vh` }}
      className="relative bg-[#040404]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Title */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-16 pt-16 pointer-events-none">
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-2">Behind the scenes</p>
          <h2
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(40px, 8vw, 100px)" }}
          >
            BACKSTAGE
          </h2>
        </div>

        {/* Desktop horizontal scroll */}
        <motion.div
          className="hidden md:flex h-full pt-36"
          style={{ x, width: `${CLIPS.length * 80}vw` }}
        >
          {CLIPS.map((clip, i) => (
            <div key={i} className="relative w-[80vw] h-full flex-shrink-0 px-3 pb-12 flex items-center">
              {clip.type === "yt" ? (
                <YouTubeEmbed
                  videoId={clip.id}
                  label={clip.label}
                  sublabel={clip.sublabel}
                  className="w-full"
                />
              ) : (
                <LazyVideoCard
                  src={clip.src}
                  label={clip.label}
                  sublabel={clip.sublabel}
                  className="w-full"
                  aspectRatio="aspect-video"
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Mobile vertical */}
        <div className="md:hidden pt-36 px-4 space-y-4 overflow-y-auto h-full pb-8">
          {CLIPS.map((clip, i) =>
            clip.type === "yt" ? (
              <YouTubeEmbed
                key={i}
                videoId={clip.id}
                label={clip.label}
                sublabel={clip.sublabel}
              />
            ) : (
              <LazyVideoCard
                key={i}
                src={clip.src}
                label={clip.label}
                sublabel={clip.sublabel}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
