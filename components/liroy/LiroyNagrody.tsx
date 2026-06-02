"use client";

import { motion } from "framer-motion";

const FRYDERYKI = [
  { rok: "1995", kategoria: "Album roku — Muzyka taneczna", album: "Alboom" },
  { rok: "1995", kategoria: "Album roku — Muzyka alternatywna", album: "Alboom" },
  { rok: "1997", kategoria: "Album roku — Rap & Hip-Hop", album: "L" },
  { rok: "2000", kategoria: "Album roku — Rap & Hip-Hop", album: "Dzień Szaka-L'a" },
];

const WYRÓZNIENIA = [
  { label: "Ice-T", opis: 'Nazwał go "OG of Poland" — Sopot, lipiec 1995' },
  { label: "Malcolm McLaren", opis: "Współpraca w Londynie — luty 1996" },
  { label: "Detroit Free Press", opis: "Artykuł poświęcony Liroyowi — maj 1996" },
  { label: "Rekordzista", opis: "Sprzedał najwięcej płyt spośród wszystkich polskich raperów (stan 2020)" },
];

export default function LiroyNagrody() {
  return (
    <section id="nagrody" className="bg-black py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-3">Awards</p>
          <h2
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
          >
            NAGRODY
          </h2>
          <div className="mt-4 w-16 h-px bg-[#C9A84C]" />
        </motion.div>

        {/* Fryderyki */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {FRYDERYKI.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative border border-[#C9A84C]/30 bg-[#0a0a0a] p-6 hover:border-[#C9A84C] transition-all duration-300"
            >
              <div className="text-4xl mb-4">🏆</div>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-2">Fryderyk {f.rok}</p>
              <h3 className="text-white text-sm font-semibold leading-relaxed mb-2">{f.kategoria}</h3>
              <p className="text-white/30 text-[11px] tracking-widest font-bebas">{f.album}</p>

              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A84C]/40" />
            </motion.div>
          ))}
        </div>

        {/* Wyróżnienia */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-8">Wyróżnienia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WYRÓZNIENIA.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 p-5 border border-white/5 hover:border-white/10 transition-colors bg-[#080808]"
              >
                <div className="w-px bg-[#C9A84C]/40 flex-shrink-0" />
                <div>
                  <p className="font-bebas text-[#C9A84C] tracking-wider mb-1" style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}>
                    {w.label}
                  </p>
                  <p className="text-white/40 text-sm">{w.opis}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
