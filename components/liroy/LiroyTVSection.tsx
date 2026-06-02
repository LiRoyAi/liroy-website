"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LazyVideoCard from "./LazyVideoCard";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "teledyski",
    label: "Teledyski",
    videos: [
      { src: "/video/Scyzoryk XXXI LAT VID.mov", label: "Scyzoryk — XXXI LAT" },
      { src: "/video/Klasyk v2.mp4", label: "Klasyk" },
      { src: "/video/LiROY - Czas na Boom Bap!.mp4", label: "Czas na Boom Bap!" },
      { src: '/video/Liroy⧸Metrowy⧸Skorup ＂Kampania＂ Wersja HD.mp4', label: "Kampania" },
      { src: "/video/FINAL.mp4", label: "L7 — Trailer" },
    ],
  },
  {
    id: "sesje",
    label: "Sesje / Backstage",
    videos: [
      { src: "/video/Sesja - My Robimy To Tak! (id).mov", label: "My Robimy To Tak — Sesja" },
      { src: "/video/baza zbożowa płyty pamiątki etc.mp4", label: "Baza zbożowa — za kulisami" },
      { src: "/video/Ujęcie w Porshe z Marią.mp4", label: "Porsche" },
      { src: "/video/ferrari 3.mov", label: "Ferrari" },
    ],
  },
  {
    id: "drony",
    label: "Drony / Kielce",
    videos: [
      { src: "/video/dron Kielce jazda autem w nocy.mp4", label: "Kielce — Nocna jazda" },
      { src: "/video/dron ulica z góry kilka sek.mp4", label: "Kielce z góry" },
    ],
  },
];

export default function LiroyTVSection() {
  const [activeCategory, setActiveCategory] = useState("teledyski");
  const current = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section id="liroy-tv" className="bg-[#030303] py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-3">Video</p>
          <h2
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
          >
            LIROY TV
          </h2>
          <p className="text-white/30 text-sm mt-2">
            Teledyski, wywiady, backstage — wszystko w jednym miejscu.
          </p>
          <div className="mt-4 w-16 h-px bg-[#C9A84C]" />
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-1 mb-8 mt-10 border-b border-white/5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-3 text-[10px] tracking-[0.3em] uppercase font-semibold transition-all duration-200 border-b-2 -mb-px ${
                activeCategory === cat.id
                  ? "border-[#C9A84C] text-[#C9A84C]"
                  : "border-transparent text-white/30 hover:text-white/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {current.videos.map((v) => (
            <LazyVideoCard key={v.src} src={v.src} label={v.label} />
          ))}
        </motion.div>

        {/* Link to /tv */}
        <div className="mt-12 text-center">
          <Link
            href="/tv"
            className="inline-block border border-[#C9A84C]/50 text-[#C9A84C] px-12 py-4 text-[11px] tracking-[0.4em] uppercase font-semibold hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
          >
            Otwórz LIROY TV →
          </Link>
        </div>
      </div>
    </section>
  );
}
