"use client";

import { motion } from "framer-motion";
import DropRoom from "@/components/DropRoom";

export default function ChapterDrop() {
  return (
    <section id="drop" className="relative min-h-screen bg-black overflow-hidden">
      {/* Subtle noise pattern via CSS gradient */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 pt-24 pb-16 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <h2
            className="font-bebas text-white leading-none tracking-wider"
            style={{
              fontSize: "clamp(52px, 12vw, 160px)",
              letterSpacing: "0.08em",
            }}
          >
            THE DROP ROOM
          </h2>
          <p className="text-white/30 text-xs tracking-[0.5em] uppercase mt-3">
            Limited drops. Streetwear. Muzyka.
          </p>
        </motion.div>

        {/* Embedded DropRoom */}
        <DropRoom />

        {/* Shop link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://shop.liroy.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/20 text-white/70 px-12 py-4 text-xs tracking-[0.4em] uppercase hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all duration-300 font-semibold"
          >
            WEJDŹ DO SKLEPU
          </a>
        </motion.div>
      </div>
    </section>
  );
}
