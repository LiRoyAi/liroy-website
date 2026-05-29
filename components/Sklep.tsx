"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    name: "KOSZULKA L7",
    category: "Odzież",
    color: "from-[#1a1508] to-[#0a0a08]",
    accent: "#ca8a04",
    label: "L7",
  },
  {
    name: "CZAPKA",
    category: "Akcesoria",
    color: "from-[#0a0808] to-[#080808]",
    accent: "#8b0000",
    label: "L",
  },
  {
    name: "WINYL L7",
    category: "Muzyka",
    color: "from-[#111108] to-[#0a0a08]",
    accent: "#ca8a04",
    label: "◉",
  },
  {
    name: "BILETY",
    category: "Koncerty",
    color: "from-[#08100a] to-[#080808]",
    accent: "#2d6a2d",
    label: "▶",
  },
];

export default function Sklep() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sklep" ref={ref} className="bg-[#080808] py-32 px-6 md:px-16 lg:px-24">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <span
          className="text-[10px] tracking-[0.5em] text-[#444] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          SKLEP
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-[#f5f5f5] mb-16"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "-0.02em",
          lineHeight: 0.9,
        }}
      >
        OFICJALNE MERCH
      </motion.h2>

      {/* Products grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {products.map((p, i) => (
          <motion.a
            key={p.name}
            href="https://shop.liroy.pl"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6, borderColor: p.accent }}
            className="group relative rounded-xl border border-white/[0.07] overflow-hidden aspect-[3/4] flex flex-col justify-between p-5 transition-all duration-300 cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${p.color.replace("from-", "").replace(" to-", ", ")})` }}
          >
            {/* Placeholder visual */}
            <div className="flex-1 flex items-center justify-center">
              <span
                className="select-none opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 8vw, 5rem)",
                  color: p.accent,
                  lineHeight: 1,
                }}
              >
                {p.label}
              </span>
            </div>

            {/* Info */}
            <div>
              <div
                className="text-[9px] tracking-widest uppercase mb-1 transition-colors duration-200"
                style={{ color: p.accent, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                {p.category}
              </div>
              <div
                className="text-[#f5f5f5] text-base font-black tracking-wide"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {p.name}
              </div>
            </div>

            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: `radial-gradient(ellipse at center, ${p.accent}15 0%, transparent 70%)` }}
            >
              <ArrowUpRight
                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                style={{ color: p.accent }}
              />
            </div>
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center"
      >
        <a
          href="https://shop.liroy.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 border border-[#ca8a04] text-[#ca8a04] hover:bg-[#ca8a04] hover:text-black font-black tracking-[0.2em] text-sm transition-all duration-300 cursor-pointer uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          WEJDŹ DO SKLEPU
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
}
