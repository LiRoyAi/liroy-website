"use client";

import { motion } from "framer-motion";

const FILMY = [
  { rok: "2000", tytul: "Bajland", rola: "Psychiatra" },
  { rok: "2002", tytul: "Miss mokrego podkoszulka", rola: "Aresztant" },
  { rok: "2006", tytul: "Niania (TVN)", rola: "Gościnnie — hydraulik / gwiazda" },
];

export default function LiroyFilmografia() {
  return (
    <section id="filmografia" className="bg-[#040404] py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-3">Acting</p>
          <h2
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
          >
            FILMOGRAFIA
          </h2>
          <div className="mt-4 w-16 h-px bg-[#C9A84C]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FILMY.map((film, i) => (
            <motion.div
              key={film.tytul}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="group border border-white/8 hover:border-[#C9A84C]/40 bg-[#0a0a0a] p-8 transition-all duration-300 hover:bg-[#0d0d0d]"
            >
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] mb-4 uppercase">{film.rok}</p>
              <h3
                className="font-bebas text-white leading-tight mb-3"
                style={{ fontSize: "clamp(20px, 3vw, 32px)" }}
              >
                {film.tytul}
              </h3>
              <div className="w-8 h-px bg-white/20 mb-3 group-hover:bg-[#C9A84C]/40 transition-colors" />
              <p className="text-white/40 text-sm tracking-wide">
                <span className="text-white/20 text-[10px] tracking-widest uppercase mr-2">Rola:</span>
                {film.rola}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
