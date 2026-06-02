"use client";

import { motion } from "framer-motion";

export default function LiroyKielce() {
  return (
    <section id="kielce" className="relative min-h-screen overflow-hidden bg-black flex items-center">
      {/* Drone video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.2)" }}
      >
        <source src="/video/dron Kielce jazda autem w nocy SADY.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* 1982 — giant outline */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bebas leading-none"
        style={{
          fontSize: "clamp(120px, 25vw, 400px)",
          WebkitTextStroke: "2px rgba(255,255,255,0.12)",
          color: "transparent",
          lineHeight: 0.85,
          paddingLeft: "4vw",
        }}
      >
        1982
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 py-24 flex flex-col md:flex-row items-center md:items-end justify-end">
        <motion.div
          className="max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-6">
            Kielce, Sady — Polska
          </p>
          <p
            className="text-white/75 leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.8vw, 21px)" }}
          >
            Zaczęło się na Sadach w Kielcach.
            <br />
            Zanim był internet, zanim był streaming —<br />
            było życie na ulicy i mikrofon.
          </p>
          <p
            className="font-bebas text-[#C9A84C] mt-5"
            style={{ fontSize: "clamp(24px, 4vw, 52px)", letterSpacing: "0.05em" }}
          >
            Od 1982.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              "Hip-hop przyszedł do Polski przez satelitę",
              "Zanim ktokolwiek wiedział co to rap",
              "PM Cool Lee — pierwsze alter ego",
            ].map((txt) => (
              <span key={txt} className="text-white/30 text-[11px] tracking-[0.2em] uppercase border-l-2 border-[#C9A84C]/30 pl-3">
                {txt}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
