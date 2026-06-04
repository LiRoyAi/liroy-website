"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const TIMELINE = [
  { year: "1971", text: "Urodziny" },
  { year: "1982", text: "Pierwszy nagrany utwór Rap" },
  { year: "1992", text: 'Płyta "PM Cool Lee"' },
  { year: "1995", text: 'Debiutancki solowy "ALBOOM"' },
];

export default function S2_Biografia() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black flex items-center"
    >
      {/* Parallax background photo */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: photoY, scale: photoScale }}
      >
        <Image
          src="/images/Kielce-2.jpg"
          alt="Kielce — początki"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Giant 1982 — outline */}
      <div
        aria-hidden="true"
        className="absolute z-[1] right-[3vw] top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none font-bebas"
        style={{
          fontSize: "clamp(100px, 22vw, 380px)",
          WebkitTextStroke: "1.5px rgba(201,168,76,0.12)",
          color: "transparent",
        }}
      >
        1982
      </div>

      {/* Content */}
      <div className="relative z-10 px-[6vw] max-w-xl py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[#C9A84C] tracking-[0.5em] text-[10px] uppercase mb-8"
        >
          Kielce, Polska
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-bebas text-white leading-none mb-8"
          style={{ fontSize: "clamp(52px, 9vw, 120px)" }}
        >
          BIOGRAFIA
        </motion.h2>

        {/* Timeline */}
        <div className="flex flex-col gap-0">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex items-start gap-5 group"
            >
              {/* Vertical line + dot */}
              <div className="flex flex-col items-center pt-1">
                <div className="w-2 h-2 rounded-full bg-[#C9A84C] group-hover:scale-125 transition-transform" />
                {i < TIMELINE.length - 1 && (
                  <div className="w-px flex-1 bg-white/10 my-1 min-h-[32px]" />
                )}
              </div>
              {/* Text */}
              <div className="pb-8">
                <span className="font-bebas text-[#C9A84C] tracking-widest"
                  style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}>
                  {item.year}
                </span>
                <p className="text-white/60 text-sm leading-relaxed mt-0.5">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="/liroy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="inline-block mt-6 border border-[#C9A84C]/50 text-[#C9A84C] px-8 py-3 text-[10px] tracking-[0.4em] uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-bebas"
        >
          Pełna biografia →
        </motion.a>
      </div>
    </section>
  );
}
