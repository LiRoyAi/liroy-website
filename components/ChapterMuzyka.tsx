"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ALBUMS = [
  {
    title: "L7",
    year: "2025",
    src: "/images/L7_LP_Front_Cover.png",
    bg: "#0a0a0a",
  },
  {
    title: "L NIÑO",
    year: "2023",
    src: "/images/l-nino.jpg",
    bg: "#080808",
  },
  {
    title: "GRANDPAPARAPA",
    year: "2022",
    src: "/images/grandpaparapa.jpg",
    bg: "#090909",
  },
];

export default function ChapterMuzyka() {
  return (
    <section id="muzyka" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/video/FINAL.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2
            className="font-bebas text-white leading-none mb-3"
            style={{ fontSize: "clamp(48px, 10vw, 140px)" }}
          >
            MUZYKA
          </h2>
          <p
            className="text-white/50"
            style={{ fontSize: "clamp(13px, 1.4vw, 17px)" }}
          >
            L7 — 2025. A to dopiero początek.
          </p>
        </motion.div>

        {/* Album cards */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full max-w-4xl">
          {ALBUMS.map((album, i) => (
            <motion.div
              key={album.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-80px" }}
              className="group relative"
            >
              <Link href="/drop">
                <div
                  className="relative w-56 h-56 md:w-64 md:h-64 rounded-lg overflow-hidden border border-white/10 cursor-pointer transition-all duration-500 group-hover:scale-105 group-hover:border-[#C9A84C]/40 group-hover:shadow-[0_0_40px_rgba(201,168,76,0.15)]"
                  style={{ background: album.bg }}
                >
                  <Image
                    src={album.src}
                    alt={album.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 224px, 256px"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-bebas text-white tracking-wider" style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
                    {album.title}
                  </p>
                  <p className="text-white/30 text-xs tracking-widest">{album.year}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <Link
            href="/drop"
            className="inline-block border border-[#C9A84C]/60 text-[#C9A84C] px-10 py-3 text-xs tracking-[0.35em] uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-semibold font-bebas"
            style={{ letterSpacing: "0.3em" }}
          >
            Słuchaj teraz
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
