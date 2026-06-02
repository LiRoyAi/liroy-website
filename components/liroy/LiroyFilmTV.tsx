"use client";

import { motion } from "framer-motion";

const TIMELINE = [
  {
    rok: "1996",
    tytul: "Kratka",
    opis: 'Reż. Paweł Łoziński. "Scoobidoo-Ya" i "Scyzoryk" na ścieżce dźwiękowej.',
  },
  {
    rok: "1997",
    tytul: "Kariera Arturo Ui",
    opis: "Muzyka do spektaklu Teatru Telewizji. Reż. Piotr Szulkin.",
  },
  {
    rok: "1998",
    tytul: "Ekstradycja 3",
    opis: '"Twoje Miasto" — z Grzegorzem Markowskim.',
  },
  {
    rok: "1999",
    tytul: 'Miodowe lata — odc. "Wiecznie młodzi"',
    opis: '"Scyzoryk" w popularnym serialu TVP.',
  },
  {
    rok: "1999",
    tytul: "Chłopaki nie płaczą",
    opis: "Kultowy film. Udział w soundtracku.",
  },
];

export default function LiroyFilmTV() {
  return (
    <section id="film-tv" className="bg-black py-24 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-3">Cinema & Television</p>
          <h2
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(40px, 8vw, 110px)" }}
          >
            MUZYKA FILMOWA & TV
          </h2>
          <div className="mt-4 w-16 h-px bg-[#C9A84C]" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-px bg-white/8" />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-8 md:gap-12"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Year */}
                <div className="flex-shrink-0 w-[60px] md:w-[80px] text-right">
                  <span className="font-bebas text-[#C9A84C]" style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
                    {item.rok}
                  </span>
                </div>

                {/* Dot */}
                <div className="flex-shrink-0 relative">
                  <div className="w-3 h-3 rounded-full border-2 border-[#C9A84C] bg-black mt-1" />
                </div>

                {/* Content */}
                <div className="pb-4">
                  <h3
                    className="font-bebas text-white tracking-wide"
                    style={{ fontSize: "clamp(18px, 2.5vw, 26px)" }}
                  >
                    {item.tytul}
                  </h3>
                  <p className="text-white/40 text-sm mt-1 leading-relaxed">{item.opis}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
