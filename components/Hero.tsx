"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const LETTERS = ["L", "I", "R", "O", "Y"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background photo — full bleed, no frame */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt="Liroy na scenie"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "50% 15%", filter: "brightness(0.55)" }}
          sizes="100vw"
        />
        {/* Top vignette — fades from dark so navbar area is readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #080808 0%, transparent 18%)",
          }}
        />
        {/* Bottom fade — bleeds seamlessly into Historia below */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 55%, rgba(8,8,8,0.7) 80%, #080808 100%)",
          }}
        />
      </div>

      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(202,138,4,0.06) 0%, transparent 70%)",
        }}
      />

      {/* LIROY letters */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-4 md:gap-6">
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
              textShadow: "0 4px 40px rgba(0,0,0,0.8), 0 0 80px rgba(202,138,4,0.12)",
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
        className="relative z-10 mt-4 text-[#ca8a04] text-sm sm:text-base tracking-[0.4em] font-semibold"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        1982 &mdash; &infin;
      </motion.div>

      {/* Main statement */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-6 text-center max-w-xl px-6 text-[#aaa] text-sm sm:text-base leading-relaxed"
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
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[0.4em] text-[#555] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          PRZEWIŃ
        </span>
        <ChevronDown className="w-4 h-4 text-[#ca8a04] scroll-bounce" />
      </motion.div>
    </section>
  );
}
