"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

const VinylCanvas = dynamic(() => import("@/components/3d/VinylCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

const ALBUMS = [
  { title: "GRANDPAPARAPA", year: "2022", desc: "Nostalgic boom bap" },
  { title: "L7", year: "2025", desc: "Powrót legendy" },
  { title: "L NIÑO", year: "2023", desc: "Dojrzały hip-hop" },
];

export default function S3_Dysk3D() {
  return (
    <section
      id="dyskografia"
      className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center py-24"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(20,14,0,0.8) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-4"
      >
        <p className="text-[#C9A84C] tracking-[0.6em] text-[10px] uppercase mb-4">
          Discography
        </p>
        <h2
          className="font-bebas text-white leading-none"
          style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
        >
          DYSKOGRAFIA
        </h2>
        <div className="mt-3 mx-auto w-16 h-px bg-[#C9A84C]" />
      </motion.div>

      {/* 3D Vinyl canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="w-full h-[45vh] md:h-[55vh] relative z-10"
      >
        <VinylCanvas className="w-full h-full" />
      </motion.div>

      {/* Album labels below vinyl */}
      <div className="relative z-10 flex gap-8 md:gap-16 justify-center mt-2">
        {ALBUMS.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p
              className="font-bebas text-white tracking-wider"
              style={{ fontSize: "clamp(14px, 1.8vw, 20px)" }}
            >
              {a.title}
            </p>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.3em]">{a.year}</p>
            <p className="text-white/30 text-[10px] mt-0.5">{a.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative z-10 mt-10"
      >
        <Link
          href="/drop"
          className="border border-[#C9A84C]/50 text-[#C9A84C] px-10 py-3 text-[10px] tracking-[0.4em] uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-bebas"
        >
          Słuchaj i kupuj →
        </Link>
      </motion.div>
    </section>
  );
}
