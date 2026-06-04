"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const albums = [
  { year: "1992", title: "East On Da Mic", note: "jako P.M. Cool Lee", featured: false, upcoming: false },
  { year: "1995", title: "Scyzoryk", note: "EP", featured: false, upcoming: false },
  { year: "1995", title: "Alboom", note: null, featured: false, upcoming: false },
  { year: "1996", title: "Bafangoo! część 1", note: null, featured: false, upcoming: false },
  { year: "1997", title: "L", note: null, featured: false, upcoming: false },
  { year: "1999", title: "Dzień Szaka-L'a", note: "Bafangoo, część 2.", featured: false, upcoming: false },
  { year: "2000", title: "10", note: "kompilacja", featured: false, upcoming: false },
  { year: "2001", title: "Bestseller", note: null, featured: false, upcoming: false },
  { year: "2006", title: "L Niño vol. 1", note: null, featured: false, upcoming: false },
  { year: "2007", title: "Grandpaparapa (Powrót króla)", note: "kompilacja", featured: false, upcoming: false },
  { year: "2025", title: "L7", note: "z DJ HWR", featured: true, upcoming: false },
  { year: "2026", title: "???", note: "NADCHODZI", featured: false, upcoming: true },
];

function AlbumRow({
  album,
  index,
}: {
  album: (typeof albums)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  if (album.featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
        className="relative flex items-center gap-6 md:gap-10 px-6 py-5 rounded-xl border border-[#ca8a04] bg-[#0f0e0b] group"
        style={{ boxShadow: "0 0 40px rgba(202,138,4,0.1), inset 0 0 30px rgba(202,138,4,0.04)" }}
      >
        {/* Gold pulse dot */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#ca8a04] animate-pulse" />
          <span
            className="text-[#ca8a04] tabular-nums"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              letterSpacing: "0.05em",
            }}
          >
            {album.year}
          </span>
        </div>

        <div className="w-px h-5 bg-[#ca8a04] flex-shrink-0" />

        <div className="flex-1 flex items-center gap-3 flex-wrap">
          <Image
            src="/images/L7_LP_Front_Cover.png"
            alt="L7"
            width={1600}
            height={1600}
            className="object-contain flex-shrink-0 h-8 w-auto"
          />
          {album.note && (
            <span
              className="text-[#888] text-sm"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, letterSpacing: "0.05em" }}
            >
              {album.note}
            </span>
          )}
        </div>

        <span
          className="flex-shrink-0 text-[9px] tracking-[0.3em] text-[#ca8a04] uppercase border border-[rgba(202,138,4,0.4)] px-2 py-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          NAJNOWSZY
        </span>
      </motion.div>
    );
  }

  if (album.upcoming) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
        className="flex items-center gap-6 md:gap-10 px-6 py-4 rounded-xl border border-[rgba(139,0,0,0.35)] bg-[#0a0808]"
      >
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#8b0000]" />
          <span
            className="text-[#555] tabular-nums italic"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              letterSpacing: "0.05em",
            }}
          >
            {album.year}
          </span>
        </div>

        <div className="w-px h-5 bg-[rgba(139,0,0,0.4)] flex-shrink-0" />

        <div className="flex-1 flex items-baseline gap-3 flex-wrap">
          <span
            className="text-[#444] italic"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
              letterSpacing: "-0.01em",
            }}
          >
            {album.title}
          </span>
        </div>

        <span
          className="flex-shrink-0 text-[9px] tracking-[0.3em] text-[#8b0000] uppercase border border-[rgba(139,0,0,0.4)] px-2 py-1 italic"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          NADCHODZI
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
      className="flex items-center gap-6 md:gap-10 py-4 border-b border-white/[0.05] group hover:border-white/[0.1] transition-colors duration-200"
    >
      <div className="flex-shrink-0 flex items-center gap-3 w-24">
        <div className="w-1 h-1 rounded-full bg-[#333] group-hover:bg-[#ca8a04] transition-colors duration-200" />
        <span
          className="text-[#444] tabular-nums group-hover:text-[#ca8a04] transition-colors duration-200"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            letterSpacing: "0.08em",
          }}
        >
          {album.year}
        </span>
      </div>

      <div className="flex-1 flex items-baseline gap-3 flex-wrap">
        <span
          className="text-[#bbb] group-hover:text-[#f5f5f5] transition-colors duration-200"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            letterSpacing: "-0.01em",
          }}
        >
          {album.title}
        </span>
        {album.note && (
          <span
            className="text-[#444] text-xs"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, letterSpacing: "0.06em" }}
          >
            {album.note}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Dyskografia() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="dyskografia" className="bg-[#080808] py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto">
        {/* Label + header */}
        <div ref={headerRef} className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.5em] text-[#444] uppercase block mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            DYSKOGRAFIA
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#f5f5f5]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
            }}
          >
            Ponad 30 lat muzyki.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#555] text-sm tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, letterSpacing: "0.05em" }}
          >
            {albums.length - 1} albumów. Jeden powrót.
          </motion.p>
        </div>

        {/* Album list */}
        <div className="flex flex-col gap-1">
          {albums.map((album, i) => (
            <AlbumRow key={`${album.year}-${album.title}`} album={album} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
