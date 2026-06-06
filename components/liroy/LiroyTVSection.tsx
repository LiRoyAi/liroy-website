"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";
import LazyVideoCard from "./LazyVideoCard";
import Link from "next/link";

// YouTube IDs dla teledysków
const TELEDYSKI_YT = [
  { id: "3VvmcLFxro0", label: "Teledysk #1" },
  { id: "PH_5YoosihA", label: "Teledysk #2" },
  { id: "B3-7VM_UNFg", label: "Czas na Boom Bap!" },
  { id: "UWP4h8ZfkZA", label: "Kampania" },
  { id: "AsdPs3_ckOc", label: "Klasyk" },
  { id: "s5AjCMEWCTQ", label: "L7 — Trailer" },
];

// YouTube BACKSTAGE IDs + nowe lokalne pliki w sesje
const SESJE_ITEMS: Array<
  | { type: "yt"; id: string; label: string }
  | { type: "local"; src: string; label: string }
> = [
  { type: "yt", id: "bPWxSD8hPXA", label: "Backstage #1" },
  { type: "yt", id: "JlnJkzwyrsQ", label: "Backstage #2" },
  { type: "yt", id: "jlsYDbZnnmo", label: "Backstage #3" },
  { type: "local", src: "/video/LIROY & ICE-T INTRO.mov", label: "LIROY & ICE-T — Intro" },
  { type: "yt", id: "nZ4h-1nihHw", label: "Moja Autobiografia VIDEO" },
  { type: "local", src: "/video/Ujęcie w Porshe z Marią.mp4", label: "Porsche" },
  { type: "local", src: "/video/ferrari 3.mov", label: "Ferrari" },
];

const HISTORIA_YT = [
  { id: "LNTA_jN8Jcw", label: "Pierwszy Występ w TV — Lalamido 1993" },
  { id: "OeOhjjz4Vwg", label: "Platynowa Płyta — PKiN 1995" },
];

const DRONY_LOCAL = [
  { src: "/video/dron Kielce jazda autem w nocy.mp4", label: "Kielce — Nocna jazda" },
  { src: "/video/dron-ulica-gory.mp4", label: "Kielce z góry" },
];

const TABS = [
  { id: "teledyski", label: "Teledyski" },
  { id: "sesje", label: "Sesje / Backstage" },
  { id: "historia", label: "Historia" },
  { id: "drony", label: "Drony / Kielce" },
];

export default function LiroyTVSection() {
  const [activeTab, setActiveTab] = useState("teledyski");

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

        {/* Tabs */}
        <div className="flex gap-1 mb-8 mt-10 border-b border-white/5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-[10px] tracking-[0.3em] uppercase font-semibold transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-[#C9A84C] text-[#C9A84C]"
                  : "border-transparent text-white/30 hover:text-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {activeTab === "teledyski" &&
            TELEDYSKI_YT.map((v) => (
              <YouTubeEmbed key={v.id} videoId={v.id} label={v.label} />
            ))}

          {activeTab === "sesje" &&
            SESJE_ITEMS.map((item, i) =>
              item.type === "yt" ? (
                <YouTubeEmbed key={i} videoId={item.id} label={item.label} />
              ) : (
                <LazyVideoCard key={i} src={item.src} label={item.label} />
              )
            )}

          {activeTab === "historia" &&
            HISTORIA_YT.map((v) => (
              <YouTubeEmbed key={v.id} videoId={v.id} label={v.label} />
            ))}

          {activeTab === "drony" &&
            DRONY_LOCAL.map((v) => (
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
