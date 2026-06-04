"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DropRoom from "@/components/DropRoom";

export default function S6_Drop3D() {
  return (
    <section
      id="drop"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          perspective: "500px",
        }}
      />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-full h-full opacity-[0.06]"
          style={{
            background:
              "conic-gradient(from 225deg, #C9A84C, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 pt-24 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A84C] tracking-[0.6em] text-[10px] uppercase mb-4">
            Limited drops
          </p>
          <h2
            className="font-bebas text-white leading-none tracking-wider"
            style={{
              fontSize: "clamp(52px, 12vw, 160px)",
              letterSpacing: "0.08em",
            }}
          >
            THE DROP ROOM
          </h2>
          <p className="text-white/30 text-xs tracking-[0.5em] uppercase mt-3">
            Streetwear. Muzyka. Styl życia.
          </p>
          <div className="mt-4 mx-auto w-16 h-px bg-[#C9A84C]" />
        </motion.div>

        <DropRoom />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://shop.liroy.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/20 text-white/60 px-12 py-4 text-xs tracking-[0.4em] uppercase hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all duration-300 font-semibold"
          >
            WEJDŹ DO SKLEPU
          </a>
        </motion.div>
      </div>
    </section>
  );
}
