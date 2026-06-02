"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ALBUMS = [
  { rok: "1993", tytul: "East On Da Mic", uwagi: "jako PM Cool Lee", img: null },
  { rok: "1995", tytul: "Alboom", uwagi: "500 000+ egz. · Pierwsza platyna hip-hop w Polsce", img: null, featured: true },
  { rok: "1997", tytul: "Bafangoo! Część 1", uwagi: "", img: null },
  { rok: "1999", tytul: "Dzień Szaka-L'a", uwagi: "Fryderyk 2000", img: null },
  { rok: "2006", tytul: "L", uwagi: "Fryderyk 1998", img: null },
  { rok: "2008", tytul: "L Niño vol. 1", uwagi: "", img: "/images/l-nino.jpg" },
  { rok: "2025", tytul: "L7", uwagi: "Nowy rozdział", img: "/images/l7-logo.png", featured: true },
];

const KOMPILACJE = [
  { rok: "2000", tytul: "10 (Best of)", img: null },
  { rok: "2010", tytul: "Grandpaparapa — Powrót Króla", img: "/images/grandpaparapa.jpg" },
];

function AlbumCard({
  rok,
  tytul,
  uwagi,
  img,
  featured,
  index,
}: {
  rok: string;
  tytul: string;
  uwagi?: string;
  img: string | null;
  featured?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className={`group relative flex flex-col overflow-hidden cursor-default transition-all duration-400
        ${featured
          ? "border border-[#C9A84C]/40 hover:border-[#C9A84C] shadow-[0_0_30px_rgba(201,168,76,0.05)] hover:shadow-[0_0_50px_rgba(201,168,76,0.15)]"
          : "border border-white/8 hover:border-[#C9A84C]/40"
        }
        hover:scale-[1.03] rounded-lg bg-[#0d0d0d]`}
    >
      {/* Cover */}
      <div className="relative aspect-square bg-[#111]">
        {img ? (
          <Image
            src={img}
            alt={tytul}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-bebas text-[#C9A84C]/20 leading-none" style={{ fontSize: "clamp(28px, 5vw, 56px)" }}>
              {rok}
            </span>
            <div className="mt-2 w-12 h-px bg-[#C9A84C]/20" />
          </div>
        )}
        {featured && (
          <div className="absolute top-2 right-2 bg-[#C9A84C] text-black text-[9px] font-bold tracking-[0.2em] px-2 py-1 uppercase">
            Ikona
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1">
        <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase mb-1">{rok}</p>
        <p className="font-bebas text-white leading-tight tracking-wide" style={{ fontSize: "clamp(14px, 1.8vw, 18px)" }}>
          {tytul}
        </p>
        {uwagi && (
          <p className="text-white/30 text-[10px] mt-1 leading-relaxed">{uwagi}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function LiroyDyskografia() {
  return (
    <section id="dyskografia" className="bg-black py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-3">Discography</p>
          <h2
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
          >
            DYSKOGRAFIA
          </h2>
          <div className="mt-4 w-16 h-px bg-[#C9A84C]" />
        </motion.div>

        {/* Albumy studyjne */}
        <h3 className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-8">Albumy studyjne</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
          {ALBUMS.map((a, i) => (
            <AlbumCard key={a.tytul} {...a} index={i} />
          ))}
        </div>

        {/* Kompilacje */}
        <h3 className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-8">Kompilacje</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-md">
          {KOMPILACJE.map((a, i) => (
            <AlbumCard key={a.tytul} {...a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
