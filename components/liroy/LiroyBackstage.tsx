"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LazyVideoCard from "./LazyVideoCard";

const CLIPS = [
  {
    src: "/video/Liroy przygotwania wbija na scenę + wita się z Djami.mp4",
    label: "Wejście na scenę",
    sublabel: "Spotkanie z DJ-ami",
  },
  {
    src: "/video/Liroy pod sceną + fani + koncert USA.mp4",
    label: "Pod sceną / USA",
    sublabel: "Fani i koncert",
  },
  {
    src: "/video/przed koncertem ujęcia + wejście na scenę.mp4",
    label: "Przed koncertem",
    sublabel: "Przygotowania",
  },
  {
    src: "/video/scena + przygotowania.mp4",
    label: "Scena",
    sublabel: "Behind the scenes",
  },
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
            <div key={i} className="relative w-[80vw] h-full flex-shrink-0 px-3 pb-12">
              <LazyVideoCard
                src={clip.src}
                label={clip.label}
                sublabel={clip.sublabel}
                className="h-full w-full"
                aspectRatio=""
              />
            </div>
          ))}
        </motion.div>

        {/* Mobile vertical */}
        <div className="md:hidden pt-36 px-4 space-y-4 overflow-y-auto h-full pb-8">
          {CLIPS.map((clip, i) => (
            <LazyVideoCard key={i} src={clip.src} label={clip.label} sublabel={clip.sublabel} />
          ))}
        </div>
      </div>
    </section>
  );
}
