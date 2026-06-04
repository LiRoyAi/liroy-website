"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function S4_MuzykaL7() {
  return (
    <section
      id="muzyka"
      className="relative min-h-screen w-full overflow-hidden bg-black flex items-center"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      >
        <source src="/video/FINAL.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(10,8,0,0.8) 50%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 py-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left: Text */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-[#C9A84C] tracking-[0.6em] text-[10px] uppercase mb-6"
            >
              Nowa muzyka · 2025
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-bebas text-white leading-none"
              style={{ fontSize: "clamp(80px, 14vw, 180px)" }}
            >
              L7
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/50 max-w-md mt-4 leading-relaxed"
              style={{ fontSize: "clamp(13px, 1.5vw, 17px)" }}
            >
              Klasyczny boom bap spotyka nowoczesność. Album, którego nikt nie przewidział —
              a wszyscy potrzebowali.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-4 mt-8 flex-wrap"
            >
              <a
                href="https://open.spotify.com/artist/1YNJc03EgclUK2rnLX7tE5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1DB954] text-black font-bebas px-7 py-3 text-xs tracking-[0.3em] uppercase hover:brightness-110 transition-all"
              >
                Spotify
              </a>
              <a
                href="https://www.youtube.com/@liroyPolska"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF0000] text-white font-bebas px-7 py-3 text-xs tracking-[0.3em] uppercase hover:brightness-110 transition-all"
              >
                YouTube
              </a>
              <Link
                href="/drop"
                className="border border-white/20 text-white/70 font-bebas px-7 py-3 text-xs tracking-[0.3em] uppercase hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all"
              >
                Drop Room
              </Link>
            </motion.div>
          </div>

          {/* Right: Album art with 3D CSS perspective */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
            style={{ perspective: "800px" }}
          >
            <motion.div
              whileHover={{ rotateY: -8, rotateX: 4, scale: 1.03 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer"
            >
              <Image
                src="/images/L7.avif"
                alt="L7 — LIROY 2025"
                width={2400}
                height={1260}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
              {/* Shine effect */}
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)",
                }}
              />
              {/* Gold border glow */}
              <div className="absolute inset-0 rounded-lg ring-1 ring-[#C9A84C]/20 shadow-[0_0_60px_rgba(201,168,76,0.15)]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
