"use client";

import { motion } from "framer-motion";
import LazyVideoCard from "./LazyVideoCard";

const KONCERTY = [
  {
    src: "/video/Liroy koncert Scyzoryk + Lninoo.mp4",
    label: "Scyzoryk / L Niño",
    sublabel: "Trasa 30 lat Alboom",
  },
  {
    src: "/video/Liroy koncert Autobiografia + Cicha noc + inne.mp4",
    label: "Autobiografia",
    sublabel: "Trasa 30 lat Alboom",
  },
  {
    src: "/video/Liroy koncert Impreza + Ślebooda.mp4",
    label: "Impreza / Śleboda",
    sublabel: "Trasa 30 lat Alboom",
  },
  {
    src: "/video/Liroy koncert Twoja córka + wariatka + Scooby dooya.mp4",
    label: "Twoja Córka",
    sublabel: "Trasa 30 lat Alboom",
  },
  {
    src: "/video/Liroy Ślebooda + to dopiero początek + Skaczcie do góry.mp4",
    label: "Śleboda / Skaczcie",
    sublabel: "Trasa 30 lat Alboom",
  },
];

export default function LiroyScena() {
  return (
    <section id="scena" className="bg-black py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-3">Live</p>
          <h2
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
          >
            NA SCENIE
          </h2>
          <div className="mt-4 w-16 h-px bg-[#C9A84C]" />
          <p className="text-white/30 text-sm mt-4 max-w-lg">
            30 lat Alboom — trasa po Polsce. Tysiące fanów, jedna legenda.
          </p>
        </motion.div>

        {/* Grid 2 + 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {KONCERTY.slice(0, 2).map((v) => (
            <LazyVideoCard key={v.src} {...v} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {KONCERTY.slice(2).map((v) => (
            <LazyVideoCard key={v.src} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}
