"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const LETTERS = ["L", "I", "R", "O", "Y"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(202,138,4,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Red vignette bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(139,0,0,0.08) 0%, transparent 100%)",
        }}
      />

      {/* LIROY letters */}
      <div className="relative flex items-center gap-2 sm:gap-4 md:gap-6">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={letter + i}
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3 + i * 0.12,
            }}
            className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] font-black leading-none select-none text-[#f5f5f5]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              textShadow: "0 0 80px rgba(202,138,4,0.15)",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* 1982 — ∞ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="mt-4 text-[#ca8a04] text-sm sm:text-base tracking-[0.4em] font-semibold"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        1982 &mdash; &infin;
      </motion.div>

      {/* Main statement */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 text-center max-w-xl px-6 text-[#888] text-sm sm:text-base leading-relaxed tracking-wide"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, letterSpacing: "0.06em" }}
      >
        Jeden człowiek. Jedna misja.{" "}
        <span className="text-[#f5f5f5]">
          Polska scena nigdy już nie będzie taka sama.
        </span>
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[0.4em] text-[#444] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          PRZEWIŃ
        </span>
        <ChevronDown className="w-4 h-4 text-[#ca8a04] scroll-bounce" />
      </motion.div>
    </section>
  );
}
