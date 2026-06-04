"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Static poster while 3D loads */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/L7_LP_Front_Cover.png"
        alt="LIROY"
        className="w-[min(40vw,300px)] h-auto opacity-50"
      />
    </div>
  ),
});

export default function S1_Hero3D() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(30,20,0,0.9) 0%, #000 70%)",
        }}
      />

      {/* 3D Canvas (transparent bg, gradient visible through) */}
      <HeroCanvas className="absolute inset-0 w-full h-full" />

      {/* Top left wordmark */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-8 left-8 z-10"
      >
        <span
          className="font-bebas tracking-[0.25em] text-white/90"
          style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}
        >
          LIROY
        </span>
        <span className="block text-[#C9A84C] tracking-[0.6em] text-[8px] uppercase">
          Oficjalna strona
        </span>
      </motion.div>

      {/* Bottom center content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 flex flex-col items-center gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-bebas text-white text-center leading-none"
          style={{ fontSize: "clamp(64px, 15vw, 180px)", letterSpacing: "0.08em" }}
        >
          LIROY
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-[#C9A84C] tracking-[0.5em] text-[10px] uppercase"
        >
          Legenda · Bunt · Przyszłość
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex gap-4 items-center"
        >
          <Link
            href="/liroy"
            className="border border-[#C9A84C]/60 text-[#C9A84C] px-8 py-3 text-[10px] tracking-[0.35em] uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-bebas"
          >
            Biografia
          </Link>
          <Link
            href="/tv"
            className="border border-white/20 text-white/60 px-8 py-3 text-[10px] tracking-[0.35em] uppercase hover:border-white/60 hover:text-white transition-all duration-300 font-bebas"
          >
            LIROY TV
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ opacity: [0.6, 0.1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/30 tracking-[0.5em] text-[8px] uppercase">
            scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-[1]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </section>
  );
}
