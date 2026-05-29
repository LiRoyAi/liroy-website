"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Play } from "lucide-react";

export default function LiroyTV() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tv" ref={ref} className="relative bg-[#020202] py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Red glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,0,0,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span
            className="text-[10px] tracking-[0.5em] text-[#444] uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            KANAŁ
          </span>
        </motion.div>

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-[#ca8a04] mb-2"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3rem, 10vw, 8rem)",
            letterSpacing: "0.05em",
            lineHeight: 0.9,
          }}
        >
          LIROY TV
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[#555] text-sm tracking-[0.25em] uppercase mb-12"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          24/7. Muzyka. Kultura. Sygnał.
        </motion.p>

        {/* TV Static Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.07] mb-10 scanlines cursor-pointer group"
          onClick={() => window.location.href = "/tv"}
        >
          {/* Static background */}
          <div className="tv-static absolute inset-0 opacity-40" />

          {/* Red tint overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(139,0,0,0.1)" }}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)",
            }}
          />

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#ca8a04] flex items-center justify-center group-hover:bg-[#ca8a04] transition-all duration-300"
              style={{ boxShadow: "0 0 40px rgba(202,138,4,0.3)" }}
            >
              <Play
                className="w-6 h-6 sm:w-8 sm:h-8 text-[#ca8a04] group-hover:text-black transition-colors duration-300"
                fill="currentColor"
              />
            </div>
            <span
              className="mt-4 text-[#ca8a04] text-xs tracking-[0.4em] uppercase group-hover:text-[#fbbf24] transition-colors duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
            >
              OGLĄDAJ TERAZ
            </span>
          </div>

          {/* Channel indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span
              className="text-[#888] text-[10px] tracking-widest uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
            >
              NA ŻYWO
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <Link
            href="/tv"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#8b0000] hover:bg-[#a00000] text-[#f5f5f5] font-black tracking-[0.2em] text-sm transition-all duration-300 cursor-pointer uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            OGLĄDAJ
            <Play className="w-4 h-4" fill="currentColor" />
          </Link>
          <p className="text-[#444] text-xs tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Bez reklam. Bez kompromisów.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
