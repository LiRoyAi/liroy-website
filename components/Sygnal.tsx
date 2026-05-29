"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FLICKER_LINES = [
  "1982. Pierwszy sygnał.",
  "2015. Inny sygnał.",
  "2026. Nowy sygnał.",
];

function TvStatic() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="tv-static absolute inset-0 opacity-20"
        style={{ mixBlendMode: "screen" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />
    </div>
  );
}

export default function Sygnal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const [phase, setPhase] = useState<"static" | "flicker" | "clean">("static");
  const [flickerIdx, setFlickerIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase("flicker"), 600);
    const t2 = setTimeout(() => setPhase("clean"), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isInView]);

  useEffect(() => {
    if (phase !== "flicker") return;
    const id = setInterval(() => {
      setFlickerIdx((i) => (i + 1) % FLICKER_LINES.length);
    }, 1100);
    return () => clearInterval(id);
  }, [phase]);

  return (
    <section
      ref={ref}
      id="sygnal"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#000] overflow-hidden"
    >
      {/* TV static background */}
      <TvStatic />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {phase === "static" && (
            <motion.div
              key="static-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-32"
            />
          )}

          {phase === "flicker" && (
            <motion.div
              key="flicker-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={flickerIdx}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#f5f5f5] text-2xl sm:text-3xl md:text-4xl font-black tracking-widest flicker"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {FLICKER_LINES[flickerIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}

          {phase === "clean" && (
            <motion.div
              key="clean-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Main statement */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[#f5f5f5] text-4xl sm:text-5xl md:text-6xl font-black tracking-widest mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}
              >
                Jeszcze nie czas.
              </motion.p>

              {/* Gold underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                className="h-px bg-[#ca8a04] mb-12 mx-auto max-w-[200px]"
              />

              {/* Email signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <p
                  className="text-[#666] text-sm tracking-[0.2em] uppercase mb-6"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                >
                  Zostaw sygnał. Dowiesz się pierwszy.
                </p>

                {submitted ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#ca8a04] text-sm tracking-widest uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                  >
                    Sygnał odebrany.
                  </motion.p>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email) setSubmitted(true);
                    }}
                    className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
                  >
                    <label htmlFor="sygnal-email" className="sr-only">
                      Adres email
                    </label>
                    <input
                      id="sygnal-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twój@email.pl"
                      className="flex-1 bg-[#0f0f0f] border border-white/10 px-5 py-3 text-[#f5f5f5] text-sm placeholder:text-[#333] outline-none focus:border-[#ca8a04] transition-colors duration-200 sm:rounded-none"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    />
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#ca8a04] hover:bg-[#b07803] text-black font-black text-sm tracking-widest transition-colors duration-200 cursor-pointer uppercase"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      WYŚLIJ
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
