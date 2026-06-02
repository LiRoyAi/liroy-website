"use client";

import { motion } from "framer-motion";

export default function LiroyParliament() {
  return (
    <section id="parlament" className="bg-[#020202] py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-3">Sejm RP VIII kadencja</p>
          <h2
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
          >
            SKUTECZNY POSEŁ
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-white/30 text-sm tracking-[0.3em] uppercase mb-16"
        >
          2015–2019 · Sejm RP VIII kadencja
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* KARTA 1 — Ustawa Liroya — wyróżniona złotem */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative border-2 border-[#C9A84C] bg-[#0d0a00] p-8 overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(201,168,76,0.08), inset 0 0 60px rgba(201,168,76,0.03)" }}
          >
            {/* BG accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[#C9A84C] text-[9px] tracking-[0.6em] uppercase mb-6">Ustawa · Legislacja · 2017</p>
              <h3
                className="font-bebas text-[#C9A84C] leading-none mb-6"
                style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
              >
                USTAWA LIROYA
              </h3>
              <div className="w-full h-px bg-[#C9A84C]/20 mb-6" />
              <p className="text-white/70 text-sm leading-relaxed">
                Autor i główny architekt legalizacji medycznej marihuany w Polsce.
                Złożył projekt ustawy w lutym 2016, przeprowadził przez Sejm
                jednogłośnie przy rządach PiS.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mt-3">
                Ustawa podpisana przez Prezydenta{" "}
                <span className="text-[#C9A84C]">20 października 2017</span>.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Przewodniczący Parlamentarnego Zespołu ds. Marihuany Medycznej",
                  "Zrealizował wszystkie obietnice wyborcze w pierwszych 2 latach kadencji",
                ].map((txt) => (
                  <div key={txt} className="flex items-start gap-3">
                    <span className="text-[#C9A84C] mt-1 flex-shrink-0">▸</span>
                    <p className="text-white/50 text-xs leading-relaxed">{txt}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* KARTA 2 — Kierowcy */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="border border-white/10 bg-[#080808] p-8 hover:border-white/20 transition-colors"
          >
            <p className="text-[#C9A84C] text-[9px] tracking-[0.6em] uppercase mb-6">Legislacja · Transport</p>
            <h3
              className="font-bebas text-white leading-none mb-6"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              PAKIET TRZECH ZMIAN DLA KIEROWCÓW
            </h3>
            <div className="w-full h-px bg-white/10 mb-6" />
            <div className="space-y-5">
              {[
                "Czasowa rejestracja pojazdów dla firm i jednostek badawczych",
                "Legalizacja nietypowych wymiarów tablic rejestracyjnych",
                "Rejestracja flotowa — jeden numer dla wielu pojazdów w firmie",
                "Postulat tablic przypisanych do pojazdu na stałe — koniec z ukrytym podatkiem przy sprzedaży auta",
              ].map((txt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#C9A84C]/60 text-xs mt-0.5 flex-shrink-0 font-bebas">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-white/50 text-sm leading-relaxed">{txt}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* KARTA 3 — Komisje */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="border border-white/10 bg-[#080808] p-8 hover:border-white/20 transition-colors"
          >
            <p className="text-[#C9A84C] text-[9px] tracking-[0.6em] uppercase mb-6">Działalność · Komisje</p>
            <h3
              className="font-bebas text-white leading-none mb-6"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              KOMISJE I DZIAŁALNOŚĆ
            </h3>
            <div className="w-full h-px bg-white/10 mb-6" />
            <div className="space-y-4">
              {[
                { label: "Komisja kultury i środków przekazu", highlight: false },
                { label: "Komisja cyfryzacji, innowacyjności i nowoczesnych technologii", highlight: false },
                { label: "Założyciel i prezes Stowarzyszenia Skuteczni (2017)", highlight: false },
                { label: "Uznany za jedną z największych niespodzianek VIII kadencji Sejmu", highlight: true },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#C9A84C]/40 mt-1 flex-shrink-0">▸</span>
                  <p className={`text-sm leading-relaxed ${item.highlight ? "text-white/80" : "text-white/40"}`}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
